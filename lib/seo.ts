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
  const clean = (raw ?? fallback).replace(/[#_*`>\[\]()]/g, '').replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`
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
