import { NextRequest, NextResponse } from 'next/server'
import { removeSubscription, saveSubscription } from '@/lib/server/push'
import { checkRateLimit, getClientIp } from '@/lib/server/rate-limit'

const MAX_TOSSES_PER_HOUR = 12

export async function POST(req: NextRequest) {
  let body: { subscription?: unknown }
  try {
    body = (await req.json()) as { subscription?: unknown }
  } catch {
    return NextResponse.json({ ok: false, reason: 'bad-request' }, { status: 400 })
  }

  const ip = getClientIp(req)
  if (await checkRateLimit('pushsub', ip, MAX_TOSSES_PER_HOUR, 60 * 60)) {
    return NextResponse.json({ ok: false, reason: 'rate-limited' }, { status: 429 })
  }

  const result = await saveSubscription(body.subscription)
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, reason: result.reason },
      { status: result.reason === 'redis-not-configured' ? 503 : 400 }
    )
  }
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    if (await checkRateLimit('pushunsub', ip, MAX_TOSSES_PER_HOUR, 60 * 60)) {
      return NextResponse.json({ ok: false, reason: 'rate-limited' }, { status: 429 })
    }
    const body = (await req.json()) as { endpoint?: string }
    if (typeof body.endpoint !== 'string' || !/^https:\/\//.test(body.endpoint)) {
      return NextResponse.json({ ok: false, reason: 'bad-request' }, { status: 400 })
    }
    await removeSubscription(body.endpoint)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, reason: 'bad-request' }, { status: 400 })
  }
}
