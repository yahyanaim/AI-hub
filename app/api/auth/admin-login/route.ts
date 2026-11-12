import { createHash, timingSafeEqual } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import {
  ADMIN_COOKIE,
  ADMIN_JWT_TTL_SECONDS,
  isAdminEnvConfigured,
  signAdminJwt,
} from '@/lib/server/auth'
import { checkRateLimit, getClientIp } from '@/lib/server/rate-limit'

const MAX_ATTEMPTS_PER_HOUR = 10

function safeEqual(a: string, b: string): boolean {
  const ha = createHash('sha256').update(a).digest()
  const hb = createHash('sha256').update(b).digest()
  return timingSafeEqual(ha, hb)
}

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

  const ip = getClientIp(req)
  if (await checkRateLimit('adminlogin', ip, MAX_ATTEMPTS_PER_HOUR, 60 * 60)) {
    return NextResponse.json({ error: 'too-many-attempts' }, { status: 429 })
  }

  // Constant-time comparison via SHA-256 digests so lengths/timings don't leak.
  const emailOk = safeEqual(bodyEmail.trim().toLowerCase(), email)
  const passwordOk = safeEqual(bodyPassword, password)

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
