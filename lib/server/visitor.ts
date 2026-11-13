import 'server-only'
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import type { NextResponse } from 'next/server'
import { isFailClosedMode } from '@/lib/server/redis'
import { getUserSessionFromRequest } from '@/lib/server/user-session'

export const VISITOR_COOKIE = 'aihunt_vid'
const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year
export const MIN_VISITOR_SECRET_LENGTH = 32

export class VisitorSecretError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'VisitorSecretError'
  }
}

// Process-local fallback secret ONLY for local dev/tests when not fail-closed.
const DEV_FALLBACK_SECRET = randomBytes(32).toString('hex')

export function getConfiguredVisitorSecret(): string | null {
  const candidate =
    process.env.VISITOR_HMAC_SECRET?.trim() ||
    process.env.AUTH_SECRET?.trim() ||
    ''
  if (candidate.length >= MIN_VISITOR_SECRET_LENGTH) {
    return candidate
  }
  return null
}

export function isVisitorSecretConfigured(): boolean {
  return getConfiguredVisitorSecret() !== null
}

function getHmacSecret(): string {
  const configured = getConfiguredVisitorSecret()
  if (configured) return configured
  if (isFailClosedMode()) {
    throw new VisitorSecretError(
      `VISITOR_HMAC_SECRET or AUTH_SECRET must be at least ${MIN_VISITOR_SECRET_LENGTH} characters in fail-closed/production mode.`
    )
  }
  return DEV_FALLBACK_SECRET
}

/**
 * Extract the best-effort client IP, preferring Vercel's non-spoofable
 * `x-vercel-forwarded-for` header before falling back to `x-forwarded-for`.
 */
export function getClientIp(request: Request): string {
  const vercelIp = request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()
  if (vercelIp) return vercelIp
  const fwd = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  if (fwd) return fwd
  return request.headers.get('x-real-ip')?.trim() || 'unknown'
}

/**
 * One-way HMAC-SHA256 digest truncated to 32 hex chars (128 bits) so raw IPs
 * and raw cookie tokens are never stored in Redis keys.
 */
export function hmacIdentifier(kind: 'ip' | 'dev' | 'usr', raw: string): string {
  return createHmac('sha256', getHmacSecret())
    .update(`${kind}:${raw}`)
    .digest('hex')
    .slice(0, 32)
}

function signVisitorId(id: string): string {
  const sig = createHmac('sha256', getHmacSecret())
    .update(`vid:${id}`)
    .digest('hex')
    .slice(0, 24)
  return `${id}.${sig}`
}

function verifySignedVisitorId(token: string): string | null {
  const dot = token.indexOf('.')
  if (dot <= 0) return null
  const id = token.slice(0, dot)
  const sig = token.slice(dot + 1)
  if (!/^[a-f0-9]{32}$/.test(id) || !/^[a-f0-9]{24}$/.test(sig)) return null
  const expected = signVisitorId(id).slice(dot + 1)
  const a = Buffer.from(sig, 'utf8')
  const b = Buffer.from(expected, 'utf8')
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  return id
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

export type VisitorIdentity = {
  ipHash: string
  deviceHash: string
  rawDeviceId: string
  cookieTokenToSet: string | null
  accountUsername?: string | null
}

/**
 * Resolve both IP-based and signed first-party cookie-based visitor hashes.
 * When a signed `aihunt_user` session cookie is present, `deviceHash` is keyed
 * to the authenticated account (`usr:<username>`) so quotas follow the account
 * across browsers and devices. Otherwise falls back to `aihunt_vid` (`dev`).
 */
export function resolveVisitorIdentity(request: Request): VisitorIdentity {
  const ip = getClientIp(request)
  const ipHash = hmacIdentifier('ip', ip)
  const userSession = getUserSessionFromRequest(request)

  const rawCookie = parseCookieHeader(request.headers.get('cookie'), VISITOR_COOKIE)
  const verifiedId = rawCookie ? verifySignedVisitorId(rawCookie) : null

  if (verifiedId) {
    return {
      ipHash,
      deviceHash: userSession
        ? hmacIdentifier('usr', userSession.username)
        : hmacIdentifier('dev', verifiedId),
      rawDeviceId: verifiedId,
      cookieTokenToSet: null,
      accountUsername: userSession?.username ?? null,
    }
  }

  const newId = randomBytes(16).toString('hex')
  const signedToken = signVisitorId(newId)
  return {
    ipHash,
    deviceHash: userSession
      ? hmacIdentifier('usr', userSession.username)
      : hmacIdentifier('dev', newId),
    rawDeviceId: newId,
    cookieTokenToSet: signedToken,
    accountUsername: userSession?.username ?? null,
  }
}

export function attachVisitorCookie(res: NextResponse | Response, identity: VisitorIdentity): void {
  if (!identity.cookieTokenToSet) return
  const secure = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production'
  const parts = [
    `${VISITOR_COOKIE}=${encodeURIComponent(identity.cookieTokenToSet)}`,
    'Path=/',
    `Max-Age=${VISITOR_COOKIE_MAX_AGE}`,
    'HttpOnly',
    'SameSite=Lax',
  ]
  if (secure) parts.push('Secure')
  res.headers.append('Set-Cookie', parts.join('; '))
}
