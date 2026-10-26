import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import type { NextRequest } from 'next/server'

export const ADMIN_COOKIE = 'aihunt_admin'
export const ADMIN_JWT_TTL_SECONDS = 60 * 60 * 12 // 12 hours

export type AdminClaims = {
  sub: 'yahia-naim'
  role: 'admin'
  name: 'Yahia Naim'
}

function getSecret(): Uint8Array | null {
  const secret = process.env.AUTH_SECRET?.trim()
  if (!secret || secret.length < 32) return null
  return new TextEncoder().encode(secret)
}

/**
 * Signs the admin session JWT server-side. The secret never leaves the
 * server, the cookie is HttpOnly, and nothing in the browser can forge a
 * valid signature — identity is only ever derived from verification.
 */
export async function signAdminJwt(): Promise<string | null> {
  const secret = getSecret()
  if (!secret) return null
  return new SignJWT({ role: 'admin', name: 'Yahia Naim' })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setSubject('yahia-naim')
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_JWT_TTL_SECONDS}s`)
    .sign(secret)
}

/**
 * Verifies signature + claims of an incoming admin JWT. Returns the claims
 * only if the token is genuinely signed by us and not expired.
 */
export async function verifyAdminJwt(
  token: string | undefined | null
): Promise<AdminClaims | null> {
  const secret = getSecret()
  if (!secret || !token) return null
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256'],
    })
    if (
      payload.sub !== 'yahia-naim' ||
      payload.role !== 'admin' ||
      payload.name !== 'Yahia Naim'
    ) {
      return null
    }
    return payload as AdminClaims
  } catch {
    return null
  }
}

export async function getAdminFromRequest(
  req: NextRequest
): Promise<AdminClaims | null> {
  return verifyAdminJwt(req.cookies.get(ADMIN_COOKIE)?.value)
}

export function isAdminEnvConfigured(): boolean {
  return Boolean(
    process.env.AUTH_SECRET?.trim() &&
      process.env.ADMIN_EMAIL?.trim() &&
      process.env.ADMIN_PASSWORD?.trim()
  )
}
