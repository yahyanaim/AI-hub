/**
 * Shared SEO helpers: title + description truncation and per-page BreadcrumbList.
 * Keeps Google SERP snippets within limits and gives AI engines clean trails.
 */

export function seoTitle(name: string, tagline: string, max = 60): string {
  const base = `${name} - ${tagline}`.replace(/\s+/g, ' ').trim()
  if (base.length <= max) return base
  return `${base.slice(0, max - 1).trimEnd()}…`
}

export function seoDescription(raw: string | undefined, fallback: string, max = 155): string {
  const clean = cleanText(raw ?? fallback)
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`
}

/**
 * Description with the item name prefixed.
 *
 * Two reasons for the `Name: ` prefix: (1) SERP snippets show the entity name
 * even when Google rewrites or truncates; (2) it guarantees every detail page
 * has a unique meta description even when seed records share one string
 * (36 tool records currently share "AI-powered email tool for …").
 *
 * The prefix counts against the budget, so snippets never overrun `max`.
 */
export function seoDescriptionWithName(name: string, raw: string | undefined, fallback: string, max = 155): string {
  const prefix = `${name}: `
  const body = cleanText(raw ?? fallback)
  const room = Math.max(40, max - prefix.length)
  if (body.length <= room) return `${prefix}${body}`
  const cut = body.slice(0, room)
  const lastSpace = cut.lastIndexOf(' ')
  return `${prefix}${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`
}

function cleanText(raw: string): string {
  return raw
    .replace(/[#_*`>\[\]()]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function breadcrumbJsonLd(baseUrl: string, trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${baseUrl}${t.path}`,
    })),
  }
}
