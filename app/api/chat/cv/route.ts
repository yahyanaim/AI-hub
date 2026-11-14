import { NextResponse } from 'next/server'
import { extractText, getDocumentProxy } from 'unpdf'
import { getBudgetConfig, isAiEmergencyDisabled } from '@/lib/server/budget-config'
import { recordActiveVisitor, recordAdminMetric } from '@/lib/server/admin-metrics'
import { checkExpensiveAiBotGuard } from '@/lib/server/bot-guard'
import { isChatLocked } from '@/lib/server/chat-lock'
import {
  acquireConcurrencyLease,
  atomicCheckAndIncr,
  commitCvMonthlyQuota,
  getCvMonthlyQuotaStatus,
  nextUtcMonthResetIso,
  refundCvMonthlyQuota,
  reserveCvMonthlyQuota,
  secondsUntilNextUtcMonth,
  utcMinuteKey,
} from '@/lib/server/quota'
import { attachVisitorCookie, resolveVisitorIdentity, VisitorSecretError, type VisitorIdentity } from '@/lib/server/visitor'

// Transient CV parser. The uploaded file is received in memory, converted to
// plain text, returned to the client, and immediately discarded — nothing is
// written to disk or any store. The chat API never sees the binary either.
const MAX_FILE_BYTES = 4 * 1024 * 1024 // 4MB (Vercel request body ceiling)
const MAX_MULTIPART_BYTES = 4_500_000
const MAX_TEXT_CHARS = 12_000

export async function GET(request: Request) {
  let identity: VisitorIdentity
  try {
    identity = resolveVisitorIdentity(request)
  } catch (err) {
    if (err instanceof VisitorSecretError) {
      return NextResponse.json(
        { error: 'CV service temporarily unavailable due to incomplete security configuration.' },
        { status: 503 }
      )
    }
    throw err
  }
  if (isAiEmergencyDisabled()) {
    const res = NextResponse.json(
      { error: 'CV processing is temporarily paused for maintenance.' },
      { status: 503 }
    )
    attachVisitorCookie(res, identity)
    return res
  }

  const statusRes = await getCvMonthlyQuotaStatus(identity)
  if (!statusRes.ok) {
    const res = NextResponse.json({ error: statusRes.error }, { status: 503 })
    attachVisitorCookie(res, identity)
    return res
  }

  const chatLocked = await isChatLocked()
  const res = NextResponse.json(
    { ...statusRes.status, chatLocked },
    { headers: { 'Cache-Control': 'no-store' } }
  )
  attachVisitorCookie(res, identity)
  return res
}

export async function POST(request: Request) {
  let identity: VisitorIdentity
  try {
    identity = resolveVisitorIdentity(request)
  } catch (err) {
    if (err instanceof VisitorSecretError) {
      return NextResponse.json(
        { error: 'CV service temporarily unavailable due to incomplete security configuration.' },
        { status: 503 }
      )
    }
    throw err
  }
  const respond = (
    body: unknown,
    status: number,
    extraHeaders?: Record<string, string>
  ) => {
    if (status === 403) void recordAdminMetric('bot_403')
    else if (status === 429) {
      void recordAdminMetric('rl_429')
      const msg = body && typeof body === 'object' && 'error' in body ? String((body as { error?: unknown }).error ?? '') : ''
      if (msg.includes('Monthly CV limit')) void recordAdminMetric('cv_blocked_429')
      if (msg.toLowerCase().includes('already processing')) void recordAdminMetric('conc_429')
    } else if (status === 503) {
      void recordAdminMetric('err_503')
    } else if (status === 200) {
      void recordAdminMetric('cv_ok')
      void recordActiveVisitor(identity.deviceHash)
    } else if (status === 400 || status === 415 || status === 422) {
      void recordAdminMetric('cv_refunded')
    }
    const res = NextResponse.json(body, { status, headers: extraHeaders })
    attachVisitorCookie(res, identity)
    return res
  }

  if (isAiEmergencyDisabled()) {
    return respond(
      { error: 'CV processing is temporarily paused for maintenance. Please try again later.' },
      503
    )
  }

  if (await isChatLocked()) {
    return respond(
      { error: 'AI chat is temporarily locked by the administrator.', chatLocked: true },
      423
    )
  }

  const bot = await checkExpensiveAiBotGuard(request, {
    maxContentLengthBytes: MAX_MULTIPART_BYTES,
    expectedAction: 'cv',
  })
  if (!bot.ok) {
    return respond({ error: bot.error }, bot.status)
  }

  const cfg = getBudgetConfig()
  const now = new Date()
  const minKey = utcMinuteKey(now)

  // Separate abuse guard so repeated malformed uploads are throttled even when
  // failed attempts refund the monthly CV quota.
  const abuseCheck = await atomicCheckAndIncr([
    {
      key: `aihunt:rl:cvabuse:${minKey}:ip:${identity.ipHash}`,
      limit: cfg.cvAbusePerMinuteLimit,
      ttlSeconds: 70,
    },
    {
      key: `aihunt:rl:cvabuse:${minKey}:dev:${identity.deviceHash}`,
      limit: cfg.cvAbusePerMinuteLimit,
      ttlSeconds: 70,
    },
  ])
  if (!abuseCheck.ok) {
    if (abuseCheck.unavailable) {
      return respond({ error: abuseCheck.error }, 503)
    }
    return respond(
      { error: 'Too many CV upload attempts. Please wait a minute.' },
      429,
      { 'Retry-After': String(abuseCheck.retryAfterSeconds) }
    )
  }

  const lease = await acquireConcurrencyLease([
    { key: `aihunt:conc:cv:ip:${identity.ipHash}`, limit: 1, ttlSeconds: 60 },
    { key: `aihunt:conc:cv:dev:${identity.deviceHash}`, limit: 1, ttlSeconds: 60 },
    { key: 'aihunt:conc:ai:global', limit: cfg.globalMaxConcurrent, ttlSeconds: 60 },
  ])
  if (!lease.ok) {
    if (lease.unavailable) {
      return respond({ error: lease.error }, 503)
    }
    return respond(
      { error: 'Another CV upload is already processing. Please wait a moment.' },
      429,
      { 'Retry-After': String(Math.min(15, lease.retryAfterSeconds)) }
    )
  }

  let reservationId: string | null = null
  try {
    const reservation = await reserveCvMonthlyQuota(identity, now)
    if (!reservation.ok) {
      if (reservation.unavailable) {
        return respond({ error: reservation.error }, 503)
      }
      const resetAt = nextUtcMonthResetIso(now)
      const retryAfter = secondsUntilNextUtcMonth(now)
      return respond(
        {
          error: 'Monthly CV limit reached. Try again next month.',
          quota: { limit: cfg.cvMonthlyLimit, remaining: 0, resetAt },
        },
        429,
        {
          'Retry-After': String(retryAfter),
          'X-Quota-Limit': String(cfg.cvMonthlyLimit),
          'X-Quota-Remaining': '0',
          'X-Quota-Reset': resetAt,
        }
      )
    }
    reservationId = reservation.reservationId

    const form = await request.formData().catch(() => null)
    const file = form?.get('file')
    if (!file || typeof file === 'string') {
      await refundCvMonthlyQuota(identity, reservationId, now)
      reservationId = null
      return respond({ error: 'No file received.' }, 400)
    }
    if (file.size > MAX_FILE_BYTES) {
      await refundCvMonthlyQuota(identity, reservationId, now)
      reservationId = null
      return respond({ error: 'File too large (max 4MB).' }, 400)
    }

    const name = (file as { name?: string }).name || 'cv'
    const lower = name.toLowerCase()
    let text = ''

    if (lower.endsWith('.txt') || lower.endsWith('.md')) {
      text = await (file as Blob).text()
    } else if (lower.endsWith('.pdf')) {
      const bytes = new Uint8Array(await (file as Blob).arrayBuffer())
      const header = String.fromCharCode(...bytes.slice(0, 5))
      if (header !== '%PDF-') {
        await refundCvMonthlyQuota(identity, reservationId, now)
        reservationId = null
        return respond(
          { error: 'Invalid PDF file. Please upload a genuine PDF document.' },
          415
        )
      }
      const pdf = await getDocumentProxy(bytes)
      const { text: extracted } = await extractText(pdf, { mergePages: true })
      text = Array.isArray(extracted) ? extracted.join('\n') : (extracted as string) ?? ''
    } else {
      await refundCvMonthlyQuota(identity, reservationId, now)
      reservationId = null
      return respond(
        { error: 'Unsupported format. Please attach a PDF or TXT file.' },
        415
      )
    }

    text = text.replace(/\u0000/g, ' ').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim()
    if (!text || text.replace(/\s/g, '').length < 40) {
      await refundCvMonthlyQuota(identity, reservationId, now)
      reservationId = null
      return respond(
        { error: "Couldn't read any text from this file — if it's a scan, please paste the text instead." },
        422
      )
    }
    if (text.length > MAX_TEXT_CHARS) text = text.slice(0, MAX_TEXT_CHARS)

    await commitCvMonthlyQuota(reservationId, identity)
    reservationId = null

    const remaining = Math.max(0, reservation.remaining ?? 0)
    const resetAt = nextUtcMonthResetIso(now)
    return respond(
      {
        name,
        chars: text.length,
        text,
        quota: {
          limit: cfg.cvMonthlyLimit,
          remaining,
          resetAt,
        },
      },
      200,
      {
        'X-Quota-Limit': String(cfg.cvMonthlyLimit),
        'X-Quota-Remaining': String(remaining),
        'X-Quota-Reset': resetAt,
      }
    )
  } catch (err) {
    if (reservationId) {
      await refundCvMonthlyQuota(identity, reservationId, now).catch(() => {})
    }
    console.error('[cv-parse]', err)
    return respond({ error: 'Failed to parse this file. Please try another PDF.' }, 500)
  } finally {
    await lease.release()
  }
}
