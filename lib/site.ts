// Canonical site URL for metadata/JSON-LD/sitemap.
// Override per environment with NEXT_PUBLIC_SITE_URL (e.g. preview deploys).
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '').trim()
  if (raw) {
    try {
      const u = new URL(raw)
      if (u.protocol === 'http:' || u.protocol === 'https:') return u.origin + u.pathname.replace(/\/+$/, '')
    } catch {
      // fall through to default
    }
  }
  return 'https://aihubtools.vercel.app'
}
export const SITE_URL = resolveSiteUrl()

// Resolve an item logo to an absolute og:image URL for link previews.
// Absolute URLs pass through, site-relative paths get the site origin,
// empty/missing logos fall back to the generic site banner.
export function resolveOgImage(logoUrl?: string): { src: string; isLogo: boolean } {
  const raw = logoUrl?.trim()
  if (raw) {
    if (/^https?:\/\//i.test(raw)) return { src: raw, isLogo: true }
    if (raw.startsWith('/')) return { src: `${SITE_URL}${raw}`, isLogo: true }
  }
  return { src: `${SITE_URL}/og.png`, isLogo: false }
}
