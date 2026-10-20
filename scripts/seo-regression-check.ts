/** Content/crawl regressions; optionally inspect raw HTML from a running build.
 * node --import tsx scripts/seo-regression-check.ts [http://127.0.0.1:3000]
 * Never calls an AI provider or changes production.
 */
import assert from 'node:assert/strict'
import sitemap from '../app/sitemap'
import robots from '../app/robots'
import { SITE_URL } from '../lib/site'
import { safeJsonLd } from '../lib/json-ld'
import { SEED_TOOLS, SEED_DEV_TOOLS, SEED_COURSES, SEED_OFFERS, SEED_REPOS } from '../lib/seed'
import { isPaidGuide, GUIDES_ENABLED } from '../lib/guides'
import { TOOL_CATEGORY_LABELS } from '../types'

async function main() {
  const entries = sitemap()
  assert.equal(new Set(entries.map(e => e.url)).size, entries.length, 'Unique sitemap URLs')
  for (const e of entries) {
    const u = new URL(e.url)
    assert.equal(u.origin, new URL(SITE_URL).origin)
    assert.equal(u.search, '')
    assert.equal(u.hash, '')
    if (e.lastModified) assert(!Number.isNaN(new Date(e.lastModified).getTime()))
    assert(!/^\/(search|profile|submit|api|skills)(\/|$)/.test(u.pathname))
    if (!GUIDES_ENABLED) assert(!u.pathname.startsWith('/guides'))
  }
  for (const path of ['', '/about', '/support', '/find-by-goal']) {
    assert.equal(entries.find(e => e.url === `${SITE_URL}${path}`)?.lastModified, undefined,
      `Do not invent modification dates for ${path || '/'}`)
  }
  const tool = SEED_TOOLS[0]
  assert(tool, 'Tool fixture exists')
  const original = tool.updatedAt
  try {
    tool.updatedAt = 'invalid-date'
    assert.equal(sitemap().find(e => e.url.endsWith(`/tools/${tool.category}/${tool.slug}`))?.lastModified,
      undefined, 'Invalid dates must not turn into fresh build timestamps')
  } finally { tool.updatedAt = original }
  const ruleSet = robots().rules
  const rules = Array.isArray(ruleSet) ? ruleSet : [ruleSet]
  for (const rule of rules) {
    const exclusions = Array.isArray(rule.disallow) ? rule.disallow : [rule.disallow]
    assert(!exclusions.some(p => p?.startsWith('/_next')), 'Rendering assets must be crawlable')
  }
  assert(robots().sitemap === `${SITE_URL}/sitemap.xml`)
  const malicious = { name: '</script><script>alert(1)</script>' }
  assert(!safeJsonLd(malicious).includes('<'))
  assert.deepEqual(JSON.parse(safeJsonLd(malicious)), malicious)
  console.log(`PASS: sitemap (${entries.length} URLs), real dates, robots and JSON-LD escaping`)

  const base = process.argv[2]?.replace(/\/$/, '')
  if (!base) return
  const offer = SEED_OFFERS.find(o => !isPaidGuide(o))!
  const routes = [
    '/', '/tools', '/dev-tools', '/edittools', '/courses', '/offers', '/about', '/support', '/find-by-goal',
    `/tools/${tool.category}/${tool.slug}`,
    `/dev-tools/${SEED_DEV_TOOLS[0]!.category}/${SEED_DEV_TOOLS[0]!.slug}`,
    `/courses/${SEED_COURSES[0]!.category}/${SEED_COURSES[0]!.slug}`,
    `/offers/${offer.category}/${offer.slug}`, `/edittools/${SEED_REPOS[0]!.slug}`,
    `/tools/${tool.category}`, `/dev-tools/${SEED_DEV_TOOLS[0]!.category}`,
    `/courses/${SEED_COURSES[0]!.category}`, `/offers/${offer.category}`,
  ]
  let home = ''
  for (const path of routes) {
    const response: Response = await fetch(`${base}${path}`)
    assert.equal(response.status, 200, path)
    const html = await response.text()
    assert(!/noindex/i.test(response.headers.get('x-robots-tag') ?? ''), path)
    const canonicals = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/g)]
    assert.equal(canonicals.length, 1, `${path} canonical count`)
    assert.equal(canonicals[0]![1], `${SITE_URL}${path === '/' ? '' : path}`, path)
    const title = /<title>(.*?)<\/title>/.exec(html)?.[1] ?? ''
    assert(title.length > 0)
    if (path === '/about' || path === '/support') assert.equal(title.split('AI Hunt').length - 1, 1)
    assert(html.includes('<h1'), `${path} SSR heading`)
    assert(html.includes('<html lang="en"'), path)
    const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
      .map(m => JSON.parse(m[1]!))
    assert.equal(schemas.filter(s => s['@type'] === 'WebSite').length, 1, `${path} WebSite`)
    assert.equal(schemas.filter(s => s['@type'] === 'Organization').length, 1, `${path} Organization`)
    const website = schemas.find(s => s['@type'] === 'WebSite')
    assert.equal(website.name, 'AI Hunt')
    assert.equal(website.alternateName, 'AI Hub Tools')
    assert.equal(website.inLanguage, 'en')
    assert.equal(website.publisher['@id'], `${SITE_URL}/#organization`)
    for (const schema of schemas.filter(s => s['@type'] === 'BreadcrumbList')) {
      for (const [i, item] of schema.itemListElement.entries()) {
        assert.equal(item.position, i + 1)
        assert.equal(new URL(item.item).origin, SITE_URL)
      }
    }
    if (path === '/') {
      home = html
      assert(schemas.some(s => s['@type'] === 'FAQPage'))
    }
    if (['/tools', '/dev-tools', '/edittools', '/courses', '/offers'].includes(path)) {
      assert(schemas.some(s => s['@type'] === 'CollectionPage'))
      assert(schemas.some(s => s['@type'] === 'BreadcrumbList'))
    }
  }
  for (const category of Object.keys(TOOL_CATEGORY_LABELS)) {
    assert(home.includes(`href="/tools?category=${category}"`), `Home category link ${category}`)
  }
  for (const path of ['/search', '/submit', '/profile/nova']) {
    const html = await (await fetch(`${base}${path}`)).text()
    assert(/<meta name="robots" content="noindex, follow"/.test(html), `${path} intentional noindex`)
  }
  const robotText = await (await fetch(`${base}/robots.txt`)).text()
  assert(!robotText.includes('Disallow: /_next/'))
  assert(robotText.includes('Disallow: /api/'))
  assert(robotText.includes('Disallow: /skills/'))
  const xml = await (await fetch(`${base}/sitemap.xml`)).text()
  const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1])
  assert.equal(locations.length, entries.length)
  assert.equal(new Set(locations).size, locations.length)
  for (const path of ['', '/about', '/support', '/find-by-goal']) {
    const url = `${SITE_URL}${path}`
    const block = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].find(m => m[1]!.includes(`<loc>${url}</loc>`))
    assert(block && !block[1]!.includes('<lastmod>'))
  }
  console.log(`PASS: raw HTTP metadata/JSON-LD on ${routes.length} pages, ${Object.keys(TOOL_CATEGORY_LABELS).length} category links, intentional noindex and XML sitemap`)
}
main().catch(error => { console.error(error); process.exitCode = 1 })
