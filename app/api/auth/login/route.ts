import { NextResponse } from 'next/server'
import { checkRateLimit, getClientIp } from '@/lib/server/rate-limit'
import { authenticateUser, registerUser } from '@/lib/server/user-auth'
import { attachUserCookie, UserSessionSecretError } from '@/lib/server/user-session'

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store' }
const MAX_AUTH_ATTEMPTS_PER_HOUR = 20

export async function POST(req: Request) {
  let body: { username?: unknown; password?: unknown; mode?: unknown } | null = null
  try {
    body = (await req.json()) as { username?: unknown; password?: unknown; mode?: unknown }
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400, headers: NO_STORE_HEADERS })
  }

  const username = typeof body?.username === 'string' ? body.username : ''
  const password = typeof body?.password === 'string' ? body.password : ''
  const mode = body?.mode === 'signup' ? 'signup' : 'login'

  const ip = getClientIp(req)
  if (await checkRateLimit('userauth', ip, MAX_AUTH_ATTEMPTS_PER_HOUR, 60 * 60)) {
    return NextResponse.json(
      { error: 'Too many authentication attempts. Please try again later.' },
      { status: 429, headers: NO_STORE_HEADERS }
    )
  }

  const result =
    mode === 'signup'
      ? await registerUser(username, password)
      : await authenticateUser(username, password)

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status, headers: NO_STORE_HEADERS }
    )
  }

  try {
    const res = NextResponse.json({ ok: true, user: result.user }, { headers: NO_STORE_HEADERS })
    attachUserCookie(res, result.user.username)
    return res
  } catch (err) {
    if (err instanceof UserSessionSecretError) {
      return NextResponse.json(
        { error: 'Authentication service temporarily unavailable.' },
        { status: 503, headers: NO_STORE_HEADERS }
      )
    }
    throw err
  }
}
