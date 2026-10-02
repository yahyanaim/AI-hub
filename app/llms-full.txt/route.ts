import { SITE_URL } from '@/lib/site'
import { SEED_TOOLS, SEED_DEV_TOOLS, SEED_REPOS, SEED_COURSES, SEED_OFFERS } from '@/lib/seed'
import { isPaidGuide, isEduCollegePage, GUIDES_ENABLED } from '@/lib/guides'

export const dynamic = 'force-static'

/**
 * llms-full.txt — the complete catalogue in Markdown, following llms.txt's
 * "Optional" companion-file convention (see llmstxt.org).
 * One line per indexed page: `- [Name](url): tagline — category · pricing`.
 * Mirrors the sitemap exactly (no guides while GUIDES_ENABLED=false, no
 * redirect/noindex routes).
 */
export async function GET() {
  const base = SITE_URL
  const one = (name: string, url: string, tagline: string) =>
    `- [${sanitize(name)}](${url}): ${sanitize(tagline)}`

  const lines: string[] = ['# AI Hunt — full catalogue', '']
  lines.push('## AI tools', '')
  for (const t of [...SEED_TOOLS].sort((a, b) => b.upvotes - a.upvotes)) {
    lines.push(`${one(t.name, `${base}/tools/${t.category}/${t.slug}`, t.tagline)} — ${t.category} · ${t.pricing}`)
  }
  lines.push('', '## Dev tools', '')
  for (const t of [...SEED_DEV_TOOLS].sort((a, b) => b.upvotes - a.upvotes)) {
    lines.push(`${one(t.name, `${base}/dev-tools/${t.category}/${t.slug}`, t.tagline)} — ${t.category} · ${t.pricing}`)
  }
  lines.push('', '## Open-source repos & LLM tools', '')
  for (const r of [...SEED_REPOS].sort((a, b) => b.upvotes - a.upvotes)) {
    lines.push(`${one(r.name, `${base}/edittools/${r.slug}`, r.tagline)} — ${r.category} · ${r.pricing}`)
  }
  lines.push('', '## Courses', '')
  for (const c of [...SEED_COURSES].sort((a, b) => b.upvotes - a.upvotes)) {
    lines.push(`${one(c.name, `${base}/courses/${c.category}/${c.slug}`, c.tagline)} — ${c.category}`)
  }
  lines.push('', '## Offers & deals', '')
  const offers = (GUIDES_ENABLED ? SEED_OFFERS : SEED_OFFERS.filter((o) => !isPaidGuide(o)))
    .filter((o) => !isEduCollegePage(o))
  for (const o of [...offers].sort((a, b) => b.upvotes - a.upvotes)) {
    lines.push(`${one(o.name, `${base}/offers/${o.category}/${o.slug}`, o.tagline)} — ${o.category}`)
  }
  lines.push('')

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}

function sanitize(value: string): string {
  return value.replace(/[\r\n[\]]/g, ' ').replace(/\s+/g, ' ').trim()
}
