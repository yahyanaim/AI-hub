import 'server-only'
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import type { NextResponse } from 'next/server'
import { isFailClosedMode } from '@/lib/server/redis'

export const USER_COOKIE = 'aihunt_user'
export const USER_SESSION_MAX_AGE = 60 * 60 * 24 * 30 // 30 days
const MIN_SECRET_LENGTH = 32

const DEV_FALLBACK_SECRET = randomBytes(32).toString('hex')

export class UserSessionSecretError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserSessionSecretError'
  }
}

function getSessionSecret(): string {
  const candidate =
    process.env.AUTH_SECRET?.trim() ||
    process.env.VISITOR_HMAC_SECRET?.trim() ||
    ''
  if (candidate.length >= MIN_SECRET_LENGTH) {
    return candidate
  }
  if (isFailClosedMode()) {
    throw new UserSessionSecretError(
      `AUTH_SECRET or VISITOR_HMAC_SECRET must be at least ${MIN_SECRET_LENGTH} characters in fail-closed/production mode.`
    )
  }
  return DEV_FALLBACK_SECRET
}

function signPayload(payloadB64: string): string {
  return createHmac('sha256', getSessionSecret())
    .update(`usr:${payloadB64}`)
    .digest('hex')
    .slice(0, 32)
}

export function signUserSessionToken(username: string): string {
  const exp = Math.floor(Date.now() / 1000) + USER_SESSION_MAX_AGE
  const payloadB64 = Buffer.from(JSON.stringify({ u: username, exp }), 'utf8').toString('base64url')
  const sig = signPayload(payloadB64)
  return `${payloadB64}.${sig}`
}

export function verifyUserSessionToken(
  token: string
): { username: string; exp: number } | null {
  const dot = token.indexOf('.')
  if (dot <= 0) return null
  const payloadB64 = token.slice(0, dot)
  const sig = token.slice(dot + 1)
  if (!/^[A-Za-z0-9_-]+$/.test(payloadB64) || !/^[a-f0-9]{32}$/.test(sig)) {
    return null
  }
  const expected = signPayload(payloadB64)
  const a = Buffer.from(sig, 'utf8')
  const b = Buffer.from(expected, 'utf8')
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null

  try {
    const parsed = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8')) as {
      u?: unknown
      exp?: unknown
    }
    if (
      typeof parsed.u !== 'string' ||
      !/^[a-z0-9_]{2,32}$/.test(parsed.u) ||
      typeof parsed.exp !== 'number' ||
      parsed.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null
    }
    return { username: parsed.u, exp: parsed.exp }
  } catch {
    return null
  }
}

function parseCookieHeader(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null
  const parts = cookieHeader.split(';')
  for (const part of parts) {
    const eq = part.indexOf('=')
    if (eq === -1) continue
    if (part.slice(0, eq).trim() === name) {
      return decodeURIComponent(part.slice(eq + 1).trim())
    }
  }
  return null
}

export function getUserSessionFromRequest(request: Request): { username: string } | null {
  const raw = parseCookieHeader(request.headers.get('cookie'), USER_COOKIE)
  if (!raw) return null
  const verified = verifyUserSessionToken(raw)
  return verified ? { username: verified.username } : null
}

export function attachUserCookie(res: NextResponse | Response, username: string): void {
  const token = signUserSessionToken(username)
  const secure = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production'
  const parts = [
    `${USER_COOKIE}=${encodeURIComponent(token)}`,
    'Path=/',
    `Max-Age=${USER_SESSION_MAX_AGE}`,
    'HttpOnly',
    'SameSite=Lax',
  ]
  if (secure) parts.push('Secure')
  res.headers.append('Set-Cookie', parts.join('; '))
}

export function clearUserCookie(res: NextResponse | Response): void {
  const secure = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production'
  const parts = [
    `${USER_COOKIE}=`,
    'Path=/',
    'Max-Age=0',
    'HttpOnly',
    'SameSite=Lax',
  ]
  if (secure) parts.push('Secure')
  res.headers.append('Set-Cookie', parts.join('; '))
}
