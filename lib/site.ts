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
