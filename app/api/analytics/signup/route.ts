import { NextRequest, NextResponse } from 'next/server'
import { redisCommand, redisPipeline, isRedisConfigured } from '@/lib/server/redis'

/**
 * Signup counter endpoint. Called fire-and-forget by the client when a new
 * account is created. Rate-limited per IP so reload scripts can't inflate the
 * number, and only the bare count is stored — no personal data.
 */
export async function POST(req: NextRequest) {
  if (!isRedisConfigured()) {
    // Silent no-op during local dev / before Upstash is wired up on Vercel.
    return NextResponse.json({ ok: false, reason: 'redis-not-configured' }, { status: 200 })
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip')?.trim() ||
    'unknown'
  const rlKey = `aihunt:rl:signup:${ip}`

  // SET ... NX EX — first call within the window counts, repeats are ignored.
  const results = await redisPipeline([
    ['set', rlKey, '1', 'EX', String(60 * 60), 'NX'],
    ['incr', 'aihunt:signups:count'],
  ])
  const setRes = results[0] as { result?: unknown; error?: string } | undefined
  const incrRes = results[1] as { result?: unknown; error?: string } | undefined

  // Only keep the increment when this call claimed the rate-limit slot
  // (SET NX returned OK). Repeats within the window decrement back.
  const claimed = setRes?.result === 'OK'
  if (!claimed) {
    await redisPipeline([
      ['decr', 'aihunt:signups:count'],
      ['expire', rlKey, String(60 * 60)],
    ])
    return NextResponse.json({ ok: true, counted: false })
  }

  if (!incrRes || incrRes.error || typeof incrRes.result !== 'number') {
    return NextResponse.json({ ok: false }, { status: 502 })
  }
  // The incremented value doubles as this member's sequential signup number
  // (verified badge for members 1-1000).
  return NextResponse.json({ ok: true, counted: true, count: incrRes.result })
}

// Keep the count unreadable via GET without an admin JWT.
export async function GET() {
  return NextResponse.json({ error: 'not-allowed' }, { status: 405 })
}
