// Prebuild: emits lib/legacy-redirects.json — slug → canonical category maps.
//
// Used by middleware.ts to return real 308 redirects for legacy one-segment
// URLs (/tools/<slug>, /dev-tools/<slug>, /courses/<slug>, /offers/<slug>,
// /categories/<cat>) instead of the HTTP 200 + meta-refresh pages that Next.js
// prerendering generates for redirect() calls.
//
// Run:  node scripts/gen-legacy-redirects.mjs
// CI:   `pnpm build` runs this automatically (see "prebuild" in package.json).
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { parseNamespaces } from './seed-parse.mjs'

const seedDir = new URL('../lib/seed/', import.meta.url)
const source = readdirSync(seedDir)
  .filter((f) => f.endsWith('.ts') && f !== 'index.ts' && f !== '_shared.ts')
  .sort()
  .map((f) => readFileSync(new URL(f, seedDir), 'utf8'))
  .join('\n')

const parsed = parseNamespaces(source)

const categoryOf = (text) => {
  const m = text.match(/\bcategory: '([^']+)'/)
  return m ? m[1] : null
}

// Legacy one-segment slugs for each section, e.g. tools: { chatgpt: 'other', … }
const tools = {}
const devtools = {}
const courses = {}
const offers = {}
for (const e of parsed.get('tools') ?? []) {
  const c = categoryOf(e.text)
  if (e.slug && c) tools[e.slug] = c
}
for (const e of parsed.get('devtools') ?? []) {
  const c = categoryOf(e.text)
  if (e.slug && c) devtools[e.slug] = c
}
for (const e of parsed.get('courses') ?? []) {
  const c = categoryOf(e.text)
  if (e.slug && c) courses[e.slug] = c
}
for (const e of parsed.get('offers') ?? []) {
  const c = categoryOf(e.text)
  if (e.slug && c) offers[e.slug] = c
}

// Legacy /categories/<cat> → section listing targets (mirrors
// app/categories/[category]/page.tsx CATEGORY_TO_TYPE).
const categories = {
  coding: '/tools', writing: '/tools', image: '/tools', video: '/tools',
  audio: '/tools', productivity: '/tools', research: '/tools', marketing: '/tools',
  data: '/tools', agents: '/tools', education: '/tools',
  ide: '/prompts', debugging: '/prompts', testing: '/prompts', 'ci-cd': '/prompts',
  monitoring: '/prompts', database: '/prompts', api: '/prompts', cli: '/prompts',
  containers: '/prompts', collaboration: '/prompts',
  llm: '/edittools', 'fine-tuning': '/edittools', tooling: '/edittools',
  datasets: '/edittools', evaluation: '/edittools', 'ui-frameworks': '/edittools',
  infrastructure: '/edittools', rag: '/edittools',
}

// Thin per-college EDU template pages consolidated into the master guide
// (audit §6.8). Master slug must match EDU_MASTER_SLUG in lib/guides.ts.
const EDU_MASTER_SLUG = 'how-to-get-us-community-college-edu'
const eduColleges = []
for (const e of parsed.get('offers') ?? []) {
  if (e.slug && e.slug !== EDU_MASTER_SLUG && e.text.includes("category: 'edu'")) {
    eduColleges.push(e.slug)
  }
}

const out = { tools, devtools, courses, offers, categories, eduColleges, eduMaster: EDU_MASTER_SLUG }

// Valid /tools/<category> hub slugs (real landing pages, audit §8). The
// middleware lets these through to the category page instead of treating
// them as legacy tool slugs.
const toolCategories = [...new Set(
  (parsed.get('tools') ?? []).map((e) => categoryOf(e.text)).filter(Boolean)
)]
out.toolCategories = toolCategories.sort()

// Valid category sets for the catalogue sections, used by middleware.ts to
// tell genuine hubs apart from unknown URLs (real 404s, audit §14).
// 'high-recommended' is a tag-based pseudo-category with a real route but no
// seed items, so it is added explicitly.
const uniqCats = (ns, extra = []) => [...new Set([
  ...(parsed.get(ns) ?? []).map((e) => categoryOf(e.text)).filter(Boolean),
  ...extra,
])].sort()
out.devCategories = uniqCats('devtools')
out.courseCategories = uniqCats('courses', ['high-recommended'])
out.offerCategories = uniqCats('offers')

// Repo slug → category map (edittools has no category routes; unknown slugs
// are real 404s).
const repos = {}
for (const e of parsed.get('repos') ?? []) {
  const c = categoryOf(e.text)
  if (e.slug && c) repos[e.slug] = c
}
out.repos = repos
const dest = new URL('../lib/legacy-redirects.json', import.meta.url)
writeFileSync(dest, JSON.stringify(out, null, 1) + '\n')

const counts = Object.fromEntries(Object.entries(out).map(([k, v]) => [k, Object.keys(v).length]))
console.log('legacy-redirects.json written:', JSON.stringify(counts))
