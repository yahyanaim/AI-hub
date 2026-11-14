import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromRequest } from '@/lib/server/auth'
import { checkRateLimit, getClientIp } from '@/lib/server/rate-limit'
import { authenticateUser, normalizeUsername, registerUser } from '@/lib/server/user-auth'
import { attachUserCookie, UserSessionSecretError } from '@/lib/server/user-session'
import {
  attachVisitorCookie,
  hmacIdentifier,
  resolveVisitorIdentity,
  VisitorSecretError,
  type VisitorIdentity,
} from '@/lib/server/visitor'

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store' }
const MAX_AUTH_ATTEMPTS_PER_HOUR = 20
const MAX_SIGNUPS_PER_IP_PER_DAY = 5

export async function POST(req: NextRequest) {
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

  let identity: VisitorIdentity
  try {
    identity = resolveVisitorIdentity(req)
  } catch (err) {
    if (err instanceof VisitorSecretError) {
      return NextResponse.json(
        { error: 'Authentication service temporarily unavailable.' },
        { status: 503, headers: NO_STORE_HEADERS }
      )
    }
    throw err
  }

  if (mode === 'signup') {
    if (await checkRateLimit('usersignup', ip, MAX_SIGNUPS_PER_IP_PER_DAY, 60 * 60 * 24)) {
      return NextResponse.json(
        { error: 'Too many accounts created from this network. Please sign in to your existing account.' },
        { status: 429, headers: NO_STORE_HEADERS }
      )
    }
  }

  const physicalDeviceHash = hmacIdentifier('dev', identity.rawDeviceId)
  const admin =
    mode === 'signup' && req.cookies ? await getAdminFromRequest(req) : null
  const bypassDeviceLimit = Boolean(admin && normalizeUsername(username) === 'yahianaim')

  const result =
    mode === 'signup'
      ? await registerUser(username, password, physicalDeviceHash, { bypassDeviceLimit })
      : await authenticateUser(username, password)

  if (!result.ok) {
    const errRes = NextResponse.json(
      result.code ? { error: result.error, code: result.code } : { error: result.error },
      { status: result.status, headers: NO_STORE_HEADERS }
    )
    attachVisitorCookie(errRes, identity)
    return errRes
  }

  try {
    const res = NextResponse.json({ ok: true, user: result.user }, { headers: NO_STORE_HEADERS })
    attachVisitorCookie(res, identity)
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
