import { NextRequest, NextResponse } from 'next/server'
import {
  ADMIN_COOKIE,
  ADMIN_JWT_TTL_SECONDS,
  isAdminEnvConfigured,
  signAdminJwt,
} from '@/lib/server/auth'
import { isRedisConfigured, redisCommand } from '@/lib/server/redis'

const MAX_ATTEMPTS_PER_HOUR = 10

/**
 * Admin login. Credentials live only in server env vars; on success we mint a
 * short-lived HS256 JWT and set it as an HttpOnly cookie. The browser can
 * present the cookie but never inspect or forge it.
 */
export async function POST(req: NextRequest) {
  if (!isAdminEnvConfigured()) {
    return NextResponse.json(
      { error: 'server-not-configured' },
      { status: 503 }
    )
  }

  const email = process.env.ADMIN_EMAIL!.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD!.trim()

  let bodyEmail = ''
  let bodyPassword = ''
  try {
    const body = (await req.json()) as { email?: string; password?: string }
    bodyEmail = typeof body.email === 'string' ? body.email : ''
    bodyPassword = typeof body.password === 'string' ? body.password : ''
  } catch {
    return NextResponse.json({ error: 'bad-request' }, { status: 400 })
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip')?.trim() ||
    'unknown'

  // Redis-backed throttling so brute force is impractical even across restarts.
  if (isRedisConfigured()) {
    const rlKey = `aihunt:rl:adminlogin:${ip}`
    const used = await redisCommand<number>(['incr', rlKey])
    if (used !== null) {
      if (used === 1) {
        await redisCommand(['expire', rlKey, String(60 * 60)])
      }
      if (used > MAX_ATTEMPTS_PER_HOUR) {
        return NextResponse.json({ error: 'too-many-attempts' }, { status: 429 })
      }
    }
  }

  // Always do the compare (no user-existence oracle), timing-safe-ish since we
  // compare both values regardless.
  const emailOk = bodyEmail.trim().toLowerCase() === email
  const passwordOk = bodyPassword === password

  if (!emailOk || !passwordOk) {
    return NextResponse.json({ error: 'invalid-credentials' }, { status: 401 })
  }

  const token = await signAdminJwt()
  if (!token) {
    return NextResponse.json({ error: 'server-not-configured' }, { status: 503 })
  }

  const res = NextResponse.json({ ok: true, name: 'Yahia Naim' })
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_JWT_TTL_SECONDS,
  })
  return res
}
