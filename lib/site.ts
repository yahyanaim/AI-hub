// Canonical site URL for metadata/JSON-LD/sitemap.
// Override per environment with NEXT_PUBLIC_SITE_URL (e.g. preview deploys).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://aihubtools.vercel.app'
