import { NextRequest, NextResponse } from 'next/server'
import { removeSubscription, saveSubscription } from '@/lib/server/push'
import { redisCommand, redisPipeline } from '@/lib/server/redis'

const MAX_TOSSES_PER_HOUR = 12

export async function POST(req: NextRequest) {
  let body: { subscription?: unknown }
  try {
    body = (await req.json()) as { subscription?: unknown }
  } catch {
    return NextResponse.json({ ok: false, reason: 'bad-request' }, { status: 400 })
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip')?.trim() ||
    'unknown'
  const rlKey = `aihunt:rl:pushsub:${ip}`

  const used = await redisCommand<number>(['incr', rlKey])
  if (used !== null) {
    if (used === 1) {
      await redisCommand(['expire', rlKey, String(60 * 60)])
    }
    if (used > MAX_TOSSES_PER_HOUR) {
      return NextResponse.json({ ok: false, reason: 'rate-limited' }, { status: 429 })
    }
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
    const body = (await req.json()) as { endpoint?: string }
    if (typeof body.endpoint !== 'string') {
      return NextResponse.json({ ok: false, reason: 'bad-request' }, { status: 400 })
    }
    await removeSubscription(body.endpoint)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, reason: 'bad-request' }, { status: 400 })
  }
}
