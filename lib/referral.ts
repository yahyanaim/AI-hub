/**
 * Shared/external-link arrival detection for the referral donation modal.
 * Pure functions (no DOM access) so the matrix below stays unit-testable.
 *
 * A visit counts as "arrived via a shared link" when EITHER:
 *  1. document.referrer exists and points to a DIFFERENT host
 *     (covers Facebook, WhatsApp Web, Telegram Web, Reddit, email web
 *     clients, blogs - anything the browser reports), OR
 *  2. the landing URL carries sharing/tracking params (utm_*, fbclid,
 *     gclid, ttclid, msclkid, ref) - covers in-app browsers and apps
 *     that strip the referrer but keep the link intact.
 *
 * Direct visits (no referrer, no params), same-host navigation, and
 * repeat views within a session never trigger.
 */

const TRACKING_PARAMS = new Set([
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'ref',
  'fbclid',
  'gclid',
  'ttclid',
  'msclkid',
])

function normalizeHost(host: string): string {
  return host.trim().toLowerCase().replace(/^www\./, '')
}

export function hasSharingParams(search: string): boolean {
  if (!search) return false
  // URLSearchParams tolerates a leading '?' or a raw query string.
  let params: URLSearchParams
  try {
    params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`)
  } catch {
    return false
  }
  for (const key of TRACKING_PARAMS) {
    if (params.has(key)) return true
  }
  return false
}

export function isExternalReferrer(referrer: string, currentHost: string): boolean {
  if (!referrer) return false
  try {
    const refHost = normalizeHost(new URL(referrer).hostname)
    if (!refHost) return false
    return refHost !== normalizeHost(currentHost)
  } catch {
    // Unparseable referrer (e.g. android-app://, empty) - not reliable evidence.
    return false
  }
}

/** Full decision: should the referral modal be eligible on this landing? */
export function shouldShowReferralModal(args: {
  referrer: string
  currentHost: string
  search: string
}): boolean {
  return (
    isExternalReferrer(args.referrer, args.currentHost) ||
    hasSharingParams(args.search)
  )
}

export const REFERRAL_MODAL_SESSION_KEY = 'ai-hunt-referral-donate-shown'
