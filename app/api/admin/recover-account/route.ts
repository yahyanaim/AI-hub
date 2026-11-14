import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromRequest } from '@/lib/server/auth'
import { checkRateLimit, getClientIp } from '@/lib/server/rate-limit'
import { isAdminRecoveryUsed, recoverAdminUserPassword } from '@/lib/server/user-auth'
import { attachUserCookie, UserSessionSecretError } from '@/lib/server/user-session'

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store' }

function isCrossSiteRequest(req: NextRequest): boolean {
  const fetchSite = req.headers.get('sec-fetch-site')
  if (fetchSite === 'cross-site') return true

  const origin = req.headers.get('origin')
  if (origin) {
    const expectedHost = req.headers.get('host') || req.nextUrl.host
    try {
      const originHost = new URL(origin).host
      if (expectedHost && originHost !== expectedHost) {
        return true
      }
    } catch {
      return true
    }
  }

  return false
}

export async function GET(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json(
      {
        error:
          'Admin authentication required. Please sign in via Admin login on /profile/yahianaim first.',
      },
      { status: 401, headers: NO_STORE_HEADERS }
    )
  }

  const used = await isAdminRecoveryUsed()
  return NextResponse.json({ used }, { headers: NO_STORE_HEADERS })
}

export async function POST(req: NextRequest) {
  if (isCrossSiteRequest(req)) {
    return NextResponse.json(
      { error: 'Cross-site recovery requests are not allowed.' },
      { status: 403, headers: NO_STORE_HEADERS }
    )
  }

  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json(
      {
        error:
          'Admin authentication required. Please sign in via Admin login on /profile/yahianaim first.',
      },
      { status: 401, headers: NO_STORE_HEADERS }
    )
  }

  const ip = getClientIp(req)
  const rateLimited = await checkRateLimit('adminrecover', ip, 5, 3600)
  if (rateLimited) {
    return NextResponse.json(
      { error: 'Too many recovery attempts. Please wait before trying again.' },
      { status: 429, headers: NO_STORE_HEADERS }
    )
  }

  let body: { password?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400, headers: NO_STORE_HEADERS })
  }

  const password = typeof body.password === 'string' ? body.password : ''
  const result = await recoverAdminUserPassword(password)
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error, code: result.code },
      { status: result.status, headers: NO_STORE_HEADERS }
    )
  }

  const res = NextResponse.json(
    { ok: true, user: result.user },
    { status: 200, headers: NO_STORE_HEADERS }
  )
  try {
    attachUserCookie(res, result.user.username)
  } catch (err) {
    if (err instanceof UserSessionSecretError) {
      return NextResponse.json({ error: err.message }, { status: 503, headers: NO_STORE_HEADERS })
    }
    throw err
  }
  return res
}
