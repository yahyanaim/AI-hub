# SEO & GEO Audit — AI Hunt

**Repository:** `/Users/mac/ZCodeProject/ai-hunt`
**Audit date:** 2026-09-30
**Stack audited:** Next.js 14.2.35 (App Router), React 18, Tailwind, static seed data, deployed target = Vercel
**Scope:** Technical SEO, on-page SEO, structured data, crawl/index controls, GEO (Generative Engine Optimization — citation-readiness for ChatGPT / Claude / Perplexity / Gemini / Copilot)

---

## 1. How this audit was produced (reproducible)

Nothing here is guesswork. Evidence comes from the **production build** plus a **live crawl**.

```bash
# 1. Build was verified current (no source file newer than the build id)
cd ai-hunt && find app lib components -newer .next/BUILD_ID -type f   # → empty
cat .next/BUILD_ID                                                     # → KidcYfrxafyGkT2sbKW2L

# 2. Serve the real production build
pnpm build && npx next start -p 3999

# 3. Crawl all sitemap URLs (3,100) and record non-200s
curl -s localhost:3999/sitemap.xml | grep -o '<loc>[^<]*</loc>' | sed 's/<[^>]*>//g' \
  | sed 's|https://[^/]*||' > urls.txt
cat urls.txt | xargs -P 24 -I{} sh -c \
  'c=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3999{}"); [ "$c" != "200" ] && echo "$c {}"'

# 4. Render a page the way an AI crawler does (no JavaScript)
curl -s -A 'Mozilla/5.0 (compatible; GPTBot/1.2; +https://openai.com/gptbot)' \
  localhost:3999/tools | sed -e 's/<script.*?<\/script>//g' -e 's/<[^>]*>/ /g'

# 5. Duplicate title / description / H1 sweep over the prerendered HTML
python3 - <<'PY'   # (full script in §12.6)
# walks .next/server/app/**.html, counts <title>, <meta description>, <h1>
PY
```

**Raw results of the crawl:** 3,100 / 3,100 sitemap URLs returned **HTTP 200**. **Zero broken URLs, zero 404s, zero redirects inside the sitemap.** That is a genuinely clean crawl surface — most directories this size are not this clean.

---

## 2. TL;DR — scorecard

| Area | Grade | One-line verdict |
|---|---|---|
| Crawlability / index hygiene | **B+** | Sitemap + robots are correct and complete; but robots blocks pages that rely on `noindex`. |
| **Server-rendered content** | **D** | **Listing hub pages ship an empty body to non-JS crawlers, including no `<h1>`.** This is the single biggest problem. |
| Metadata (titles/descriptions/canonicals) | **B** | Canonicals on 100% of pages ✅, but ~1,270 pages share the layout's default description and 1,265 share the default title. |
| Structured data | **B−** | Rich schema coverage, but a **site-wide incorrect `BreadcrumbList`** is emitted on every page, and detail pages emit two conflicting ones. |
| Redirect handling | **D** | **1,292 legacy URLs return HTTP 200 + a 1-second `<meta http-equiv="refresh">`** instead of 301/308. |
| Performance (Core Web Vitals) | **D** | A **2.36 MB JS chunk of seed data** is downloaded by every visitor. |
| **GEO / AI answer-engine readiness** | **C+** | `llms.txt` + AI-bot allowances are real and rare wins. But AI crawlers **do not execute JS**, so they read the hub pages as empty — and `llms.txt` advertises a dead `/guides` section. |
| Content quality / E-E-A-T | **C** | No About/author/contact page; 26 near-duplicate `/offers/edu/*` template pages. |

### The five things to do first
1. **P0-1** Server-render the first page of items on `/tools`, `/courses`, `/offers`, `/edittools` + add a static `<h1>` (§5.1).
2. **P0-2** Turn the 1,292 legacy URLs into real 301/308 redirects — currently they are 200-status soft redirects (§5.2).
3. **P1-1** Stop shipping the 2.36 MB seed bundle to every visitor (§6.1).
4. **P1-2** Remove the incorrect site-wide `BreadcrumbList` from `app/layout.tsx` (§6.2).
5. **P1-3** Fix the `/guides` soft-404 and the dead `/guides` link inside `llms.txt` (§6.3).

---

## 3. Site inventory (what we are auditing)

### 3.1 Sitemap composition — 3,100 URLs

| URL pattern | Count | Rendered by |
|---|---|---|
| `/tools/<category>/<slug>` | 1,264 | `app/tools/[category]/[slug]/page.tsx` (SSR content ✅) |
| `/dev-tools/<category>/<slug>` | 814 | `app/dev-tools/[category]/[slug]/page.tsx` (SSR ✅) |
| `/edittools/<slug>` | 421 | `app/edittools/[slug]/page.tsx` (SSR ✅) |
| `/offers/<category>/<slug>` | 322 | `app/offers/[category]/[slug]/page.tsx` (SSR ✅) |
| `/courses/<category>/<slug>` | 191 | `app/courses/[category]/[slug]/page.tsx` (SSR ✅) |
| `/dev-tools/<category>` | 53 | `app/dev-tools/[category]/page.tsx` (listing ❌ empty) |
| `/courses/<category>` | 17 | `app/courses/[category]/page.tsx` (listing ❌ empty) |
| `/offers/<category>` | 11 | `app/offers/[category]/page.tsx` (listing ❌ empty) |
| `/`, `/tools`, `/dev-tools`, `/edittools`, `/courses`, `/offers`, `/support` | 7 | static |
| **Total** | **3,100** | 2,591 are content-rich detail pages ✅ |

### 3.2 Correctly excluded from the sitemap (good)
`/tools/<legacy-slug>`, `/categories/*`, `/search`, `/prompts`, `/guides/*` — each of these is either a redirect, a noindex page, or has no route. `app/sitemap.ts` documents these decisions in comments, which is well above average.

### 3.3 Observed response envelope
All pages are prerendered (`x-nextjs-cache: HIT`) with `Cache-Control: s-maxage=31536000, stale-while-revalidate`. Fast and cheap, and it means every HTML payload in `.next/server/app/**.html` is exactly what a crawler receives.

---

## 4. What is already working (keep this)

1. **`llms.txt` exists and is well-formed** (`app/llms.txt/route.ts`, 11.4 KB, `force-static`). It follows the llmstxt.org shape: H1, blockquote summary, location, languages, core sections, then 80 curated deep links. Very few sites have this.
2. **`robots.txt` explicitly allows AI crawlers** (`GPTBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `CCBot`). This is the single highest-leverage GEO switch and it is already on.
3. **`rel="canonical"` is present on 100% of prerendered pages** — verified programmatically across 4,697 generated HTML files. No missing canonicals at all.
4. **Every detail page is content-rich in the server HTML.** Verified with a GPTBot user-agent: `/tools/agents/agency-swarm` returns the name, tagline, full description, tags, pricing, author, dates, upvotes/bookmarks — ~1,400 characters of real text. This is exactly what AI engines need to cite a page.
5. **Detail pages carry full JSON-LD**: `SoftwareApplication` (+ `Offer` at price 0 for free tools), `Article` for offers, plus `BreadcrumbList`, `datePublished`, `dateModified`, `sameAs`.
6. **Hub pages carry `CollectionPage` + `ItemList` JSON-LD** (top-10 items) on `/tools`, `/dev-tools`, `/courses`, `/offers`, `/edittools`, and every category page.
7. **Home page has `FAQPage` JSON-LD** built from the real on-page FAQ (`HOME_FAQS`) — not fabricated.
8. **`safeJsonLd()`** escapes `<` in all structured data — a real XSS hardening that most codebases skip.
9. **Zero crawl errors**: 3,100/3,100 sitemap URLs → HTTP 200.
10. **Metadata is centralized and correct**: `metadataBase`, title template, OpenGraph, Twitter card, `viewport.themeColor`, `manifest.ts`, `geo.region=MA` / `geo.placename=Morocco`, Google verification via env.

---

## 5. P0 — Critical findings

### 5.1 P0-1 · Listing hub pages ship an EMPTY body to every crawler that does not run JavaScript

**Evidence (live, GPTBot user-agent, no JS):**

```
/tools         unique_item_links=0  h1=0  bytes=44557
/dev-tools     unique_item_links=0  h1=1  bytes=45063
/courses       unique_item_links=0  h1=0  bytes=45403
/offers        unique_item_links=0  h1=0  bytes=44916
/edittools     unique_item_links=0  h1=0  bytes=44556
```

The rendered text of `/tools` is, in full, between the nav and the footer:

```
Discover   Loading results…   [4 × <div class="h-48 animate-pulse rounded-2xl …">]
```

That is the entire page body. 44 KB of HTML, **zero tools, zero links, no heading**.

Sweeping the prerendered output confirms the scale:

* **32 of the 87 static/category URLs in the sitemap have no `<h1>` at all** in their HTML — `/tools`, `/edittools`, `/offers`, all 11 `/offers/<cat>`, all 17 `/courses/<cat>`, all 18 `/courses/…`, `/courses`.
* **1,624 prerendered pages contain no `<h1>`** (subtracting the 1,266 legacy pages in §5.2 → ~358 real listing pages).
* `/dev-tools` and all 53 `/dev-tools/<cat>` pages **are fine** — because `components/listing/DevToolsView.tsx` renders its own static `<h1>Dev Tools</h1>` *outside* the listing component.

**Root cause (two compounding issues):**

1. `lib/store.tsx` → `AppProvider` starts with `freshSeed()` (all arrays empty) and only fills them inside a `useEffect` after `await import('@/lib/seed')`. `useEffect` never runs on the server. Every listing view reads `useApp()`:
   ```tsx
   // components/listing/ToolsView.tsx
   const { tools } = useApp()      // ← empty during SSR/prerender
   return <ListingView items={tools} … />
   ```
2. `components/listing/ListingView.tsx` calls `useSearchParams()`, which forces the nearest `<Suspense>` boundary to render its fallback during static prerendering:
   ```tsx
   // app/tools/page.tsx
   <Suspense fallback={<div …>Loading…</div>}><ToolsView /></Suspense>
   ```

The detail pages already solve this correctly — they pass `initial={tool}` from the server component into the client component (`components/detail/ToolDetail.tsx:44`). The listing pages just never got the same treatment.

**Impact**

| Engine | What happens |
|---|---|
| **GPTBot, ClaudeBot, PerplexityBot, CCBot, OAI-SearchBot, Amazonbot** | Do **not** execute JavaScript. They see an empty page with no links. These pages can never be cited as a source for "best AI tools directory" / "n8n tools list" queries — the exact queries this site is built for. |
| **Googlebot** | Will render, but only after downloading and executing the client bundle, then waiting for `await import('@/lib/seed')` — see §6.1. Render is deferred and expensive across 88 hub pages. |
| **Sitelinks / topical clustering** | Hub pages are the internal-link hubs. With zero outbound item links in the HTML, Google receives no crawl paths from `/tools` to the 1,264 tool pages — it must rely entirely on the sitemap. |

**Fix — mirror the pattern that already works on detail pages.**

Step 1 — give the client views a server-rendered fallback, exactly like `initial={tool}`:

```tsx
// components/listing/ToolsView.tsx
'use client'
import type { Tool } from '@/types'

export function ToolsView({ initialItems = [] }: { initialItems?: Tool[] }) {
  const { tools } = useApp()
  const items = tools.length ? tools : initialItems   // SSR / prerender uses seed
  return <ListingView items={items} … />
}
```

Step 2 — pass the first page from the server page, and add the missing `<h1>` + intro (copy the `DevToolsView` header pattern):

```tsx
// app/tools/page.tsx  (server component — SEED_TOOLS is already imported here)
const score = (t: (typeof SEED_TOOLS)[number]) =>
  t.upvotes + Math.round(t.bookmarks * 0.8) + (t.featured ? 80 : 0)
const FIRST_PAGE = [...SEED_TOOLS].sort((a, b) => score(b) - score(a)).slice(0, 12)

<div className="container-page py-8">
  <div className="mb-8">
    <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">Discover</div>
    <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">AI Tools</h1>
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
      {SEED_TOOLS.length.toLocaleString()} community-ranked AI tools across coding, writing,
      image, video, audio, research, productivity and more.
    </p>
  </div>
  <Suspense fallback={null}>
    <ToolsView initialItems={FIRST_PAGE} />
  </Suspense>
</div>
```

Step 3 — repeat for `CoursesView`, `OffersView`, `ReposView`, and the three `[category]` listing routes.

Step 4 — **add a crawler-facing link list.** 12 cards expose only 12 of 1,264 URLs. Add a server-rendered `<nav>` at the bottom of each hub listing the category links (e.g. 24 category chips), giving crawlers real paths into the catalogue. Do **not** use `?page=` links — they create duplicate URLs.

> **Related architectural note:** `/tools/<category>` currently *cannot* become a real category listing page, because `app/tools/[category]/page.tsx` occupies that URL space as the legacy redirect handler (§5.2). Freeing `/tools/<category>` for genuine category landing pages (e.g. `/tools/coding`, `/tools/agents`) is one of the highest-value SEO moves available here — it aligns URL structure with search intent ("best AI coding tools") instead of burying everything inside a paginated view.

---

### 5.2 P0-2 · 1,292 legacy URLs return HTTP 200 with a 1-second meta-refresh instead of a 301/308

**Evidence:**

```
$ curl -s -o /dev/null -w '%{http_code} loc=%{redirect_url}\n' localhost:3999/tools/chatgpt
HTTP 200 loc=

$ grep -o 'http-equiv="refresh"[^>]*' .next/server/app/tools/chatgpt.html
http-equiv="refresh" content="1;url=/tools/other/chatgpt"

$ cat .next/server/app/tools/chatgpt.meta
{ "headers": { "x-next-cache-tags": "_N_T_/layout,…,_N_T_/tools/chatgpt" } }
# ↑ no "redirect" entry — Next.js prerendered the redirect as a static HTTP 200 page
```

Same behaviour for `/categories/<cat>`: `/categories/coding` → `HTTP 200`, empty body, meta refresh.

**Population affected**

| Pattern | Count | Handler |
|---|---|---|
| `/tools/<legacy-slug>` | **1,264** | `app/tools/[category]/page.tsx` (`generateStaticParams` + `redirect()`) |
| `/categories/<category>` | **28** | `app/categories/[category]/page.tsx` (`redirect()`) |
| **Total** | **1,292** | |

**Why this is P0**

* A meta refresh with a **1-second delay** is not a permanent redirect. Google treats it as a soft redirect and passes signals far less reliably than a 301/308.
* AI crawlers **do not follow meta refresh**. All 1,292 URLs are dead ends for them.
* These pages also inherit the layout's **default title** (`AI Hunt - Discover AI Tools, Dev Tools & Learning Resources`) and **default description** — this is the source of the **1,265 duplicate titles** and **~1,270 duplicate descriptions** found in the sweep. They do carry `robots: noindex, follow`, which limits the damage, but it also means Google drops the URLs rather than consolidating their signals.

**Fix A (recommended, ~2 lines per route)** — force dynamic rendering so `redirect()` produces a real 307 with a `Location` header:

```tsx
// app/tools/[category]/page.tsx
export const dynamic = 'force-dynamic'        // ← add
// and delete generateStaticParams() so Next.js stops prerendering a static meta-refresh page

export default async function ToolRedirectPage({ params }: { params: { category: string } }) {
  const tool = SEED_TOOLS.find((t) => t.slug === params.category)
  redirect(tool ? `/tools/${tool.category}/${tool.slug}` : '/tools')
}
```

```tsx
// app/categories/[category]/page.tsx
export const dynamic = 'force-dynamic'        // ← add
```

While you are there, drop `robots: { index: false, follow: true }` from both routes — once they return real 3xx responses a noindex is unnecessary, and noindex + redirect on the same URL is a conflicting signal.

**Verify after applying:**
```bash
curl -sI localhost:3000/tools/chatgpt    | head -3   # expect 307/308 + Location
curl -sI localhost:3000/categories/coding | head -3
```
> Behaviour note: for a request-time (non-prerendered) route, Next.js emits a genuine 307. Confirm with the commands above after the change — if Next still prerenders, fall back to Fix B.

**Fix B (guaranteed permanent 301, more work)** — declare the mapping in `next.config.js` so it is handled in the routing layer before any render:

```js
// next.config.js
async redirects() {
  const legacy = require('./lib/legacy-tool-redirects.json') // [{ slug, category }, …]
  return [
    { source: '/devtool', destination: '/dev-tools', permanent: true },
    { source: '/devtool/:path*', destination: '/dev-tools/:path*', permanent: true },
    ...legacy.map(({ slug, category }) => ({
      source: `/tools/${slug}`,
      destination: `/tools/${category}/${slug}`,
      permanent: true,   // → 308
    })),
  ]
}
```
…with `lib/legacy-tool-redirects.json` emitted by a prebuild script that parses `lib/seed/tools.ts` (`next.config.js` cannot import the TS module directly). Note that Next.js caps `redirects()` at ~1,000 entries per config on some hosts — if that bites, use middleware with a JSON map instead.

---

## 6. P1 — High-impact findings

### 6.1 P1-1 · A 2.36 MB JavaScript chunk of seed data is downloaded by every visitor

**Evidence:**
```
$ ls -S .next/static/chunks/*.js | head -3
2358 KB  6108-462d8d9424d906da.js      ← contains the entire seed dataset
 323 KB  9e784b99.6498c27b8229efa1.js
 199 KB  1386-85e2a70566497541.js

$ grep -l 'Agency Swarm' .next/static/chunks/*.js
6108-462d8d9424d906da.js               ← 2,358 KB

$ du -sh .next/static/chunks
4.7M
```

**Cause:** `lib/store.tsx` sits in the root layout and does `await import('@/lib/seed')` on mount. The seed is 2.87 MB of TypeScript source (`tools.ts` 822 KB, `offers.ts` 883 KB, `dev-tools.ts` 552 KB, …) which compiles into one ~2.36 MB client chunk. Because `AppProvider` wraps the whole app, **every page — including a single tool detail page that needs one record — pulls the entire catalogue.**

**Impact:** LCP/TBT/INP on mobile (Vercel reports this as poor), and Core Web Vitals is a confirmed Google ranking input. For AI crawlers this is irrelevant (they do not run JS) — but it is exactly why the render-deferred strategy in §5.1 cannot be relied on as a substitute for server-rendered content.

**Fix options (in order of preference):**

1. **Per-route seed slices.** Have each route's server component pass the data it needs (`initialItems`) and have `AppProvider` lazily load only the slices actually required (e.g. `import('@/lib/seed/tools')` instead of `@/lib/seed`). Removes the mega-chunk entirely.
2. **Move catalogue reads to the server** and turn the store into a client-only layer for *user deltas* (which is what `README.md` already says it is: `localStorage` votes/bookmarks). The store is currently carrying two jobs — full-catalogue cache + user state — and only the second needs to be client-side.
3. **React Server Components for listings** (a natural consequence of §5.1): the server already has `SEED_TOOLS`; only the interactive bits (upvote/bookmark buttons, filters) need `'use client'`.

Quick win while the refactor is pending: moving the `await import('@/lib/seed')` behind an idle callback stops it from competing with first paint on detail pages.

---

### 6.2 P1-2 · An incorrect `BreadcrumbList` is emitted site-wide, and detail pages emit two conflicting ones

**Evidence** — the breadcrumb lives in the **root layout**, so it is injected into every single page:

```tsx
// app/layout.tsx  (schema-breadcrumb) — applied to ALL routes
itemListElement: [
  { name: 'Home',      item: baseUrl },
  { name: 'AI Tools',  item: `${baseUrl}/tools` },
  { name: 'Dev Tools', item: `${baseUrl}/dev-tools` },
  { name: 'Courses',   item: `${baseUrl}/courses` },
]
```

Live check on a tool page:

```
/tools/agents/agency-swarm   ldjson_blocks=7  BreadcrumbList occurrences=3
```

The page emits **two** `BreadcrumbList` objects with different contents:

| Source | Breadcrumb |
|---|---|
| `app/layout.tsx` | Home → AI Tools → Dev Tools → Courses *(wrong — this is a tool page)* |
| `app/tools/[category]/[slug]/page.tsx` (`breadcrumbJsonLd`) | Home → AI Tools → Agency Swarm *(correct)* |

So a course detail page, an offer page and a repo page all claim to be inside "Dev Tools → Courses", and every detail page contradicts itself.

**Why it matters:** Google's Rich Results Test flags conflicting/incorrect breadcrumb data, and AI engines use breadcrumb trails for entity disambiguation — a wrong trail actively misinforms them about site structure.

**Fix**

1. Delete the `schema-breadcrumb` `<Script>` block from `app/layout.tsx` (lines ~192-208).
2. Add a real 2-level breadcrumb to the five hub pages that currently have none, using the existing helper:

```tsx
// app/tools/page.tsx
<Script id="schema-breadcrumb-tools" type="application/ld+json" dangerouslySetInnerHTML={{
  __html: safeJsonLd(breadcrumbJsonLd(SITE_URL, [
    { name: 'Home', path: '/' },
    { name: 'AI Tools', path: '/tools' },
  ])),
}} />
```
Repeat for `/dev-tools`, `/courses`, `/offers`, `/edittools`.

3. Add the category level to detail-page trails where relevant, e.g. `Home → AI Tools → {category} → {name}`.
4. Validate with the [Rich Results Test](https://search.google.com/test/rich-results) on one URL per template after the change.

---

### 6.3 P1-3 · `/guides` is a soft-404 that returns HTTP 200 + `index, follow`, and `llms.txt` advertises it

**Evidence:**
```
$ curl -s -o /dev/null -w '%{http_code}\n' localhost:3999/guides
200
$ curl -s localhost:3999/guides | grep -o '<meta name="robots"[^>]*>'
<meta name="robots" content="index, follow"/>
$ curl -s localhost:3999/guides | grep -o 'Page not found'
Page not found
$ curl -s -o /dev/null -w '%{http_code}\n' localhost:3999/guides/any-slug
200
```

`lib/guides.ts` sets `export const GUIDES_ENABLED = false`, and `app/guides/page.tsx` does `if (!GUIDES_ENABLED) notFound()`. But because the route is statically prerendered, Next.js serves the not-found component inside a **200 response** with the guides page's own `index, follow` metadata and title (`Paid Guides — Premium PDF Playbooks`). Result: a Google **soft 404**, and `/guides/<anything>` behaves the same.

Meanwhile `llms.txt` tells every AI engine:

```
- Paid guides: https://aihubtools.vercel.app/guides
```

So the GEO endpoint instructs LLMs to cite a URL that renders "Page not found".

**Fix**

```ts
// app/guides/page.tsx  and  app/guides/[slug]/page.tsx
export const metadata: Metadata = {
  …,
  robots: GUIDES_ENABLED ? { index: true, follow: true } : { index: false, follow: false },
}
```

```ts
// app/llms.txt/route.ts — only advertise sections that actually exist
...(GUIDES_ENABLED ? [`- Paid guides: ${base}/guides`] : []),
```

Plus, in `app/robots.ts`, add `Disallow: /guides` while the flag is off (belt-and-braces with the noindex), and remove it when guides ship.

Finally, add a smoke test to CI so this cannot regress:
```bash
# scripts/seo-smoke.sh
test "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/guides")" = "404" || exit 1
```

---

### 6.4 P1-4 · `robots.txt` blocks the same URLs that rely on `noindex`

**Current output:**
```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /search        ← /search also serves <meta name="robots" content="noindex, follow">
Disallow: /profile/      ← /profile/<user> also serves <meta name="robots" content="noindex, nofollow">
```

**The problem:** a `Disallow` prevents crawling, and `noindex` can only be honoured if the page is crawled. Blocking a page you also mark `noindex` means Google never reads the directive and may still index the URL from external links (and it can never see the canonical either). Pick one mechanism per URL.

Also relevant: the `WebSite` schema declares a `SearchAction` pointing at `/search?q={search_term_string}` — Google requires the search target to be crawlable, so the sitelinks search box will not appear while `/search` is disallowed.

**Fix** — remove `Disallow: /search` and `Disallow: /profile/`; keep the `noindex` metas (they are already correctly set), keep `Disallow: /api/` and `/_next/`. If crawl-budget is a concern, keep `Disallow: /api/` only.

---

### 6.5 P1-5 · The AI-crawler allow-list is incomplete, and 108 raw `.md` files are publicly indexable

**6.5a — Missing AI agents.** The current list is a good start but it is built from 2023-24 tokens. Missing (all verified live and reachable):

```ts
// app/robots.ts — expand the GEO group
userAgent: [
  // existing
  'GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'CCBot',
  // add — search/answer engines
  'OAI-SearchBot', 'Perplexity-User', 'Claude-User', 'Claude-SearchBot',
  'Applebot', 'Applebot-Extended', 'DuckAssistBot', 'Amazonbot',
  'MistralAI-User', 'meta-externalagent', 'cohere-ai', 'YouBot',
],
```
Decide deliberately about training-only crawlers (`Bytespider`, `PetalBot`, `Timpibot`, `ImagesiftBot`) — blocking them costs nothing in citations and saves bandwidth. This is a policy choice, not a bug; document it in a comment.

**6.5b — `/skills/*.md` is publicly served and unblocked.** `public/skills/` contains **108 raw Markdown files** (`seo.md`, `mcp-builder.md`, `stripe-integration.md`, …) downloadable at `/skills/<name>.md` and referenced from tool detail pages (`components/detail/ToolDetail.tsx:141` → `/skills/${tool.slug}.md`):

```
$ curl -s -o /dev/null -w '%{http_code} %{content_type}\n' localhost:3999/skills/seo.md
200 text/markdown; charset=UTF-8
```

These are third-party skill documents served verbatim from your domain. They are **not** in the sitemap (good) but they are crawlable and indexable as thin/duplicated content — Google can index them under your domain and dilute relevance for your own pages.

**Fix:** add `Disallow: /skills/` to `robots.ts` and an `X-Robots-Tag` header in `next.config.js`:
```js
async headers() {
  return [{
    source: '/skills/:path*',
    headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
  }]
}
```
Better still, inline each guide's content into its tool page instead of linking out to a raw `.md` — that converts 108 wasted URLs into on-page content.

---

### 6.6 P1-6 · Duplicate meta descriptions across real, indexable pages

**Evidence (sweep of 4,697 prerendered HTML files):**
```
unique descriptions: 3384 | duplicated: 9
TOP DUPLICATE DESCRIPTIONS:
  1271x  AI Hunt is a community-driven platform to discover and share the best AI tools…
    36x  AI-powered email tool for writing, automation, and marketing.
     3x  Online photo editor and collage maker.
     2x  AI-powered music production assistant.
     2x  AI-powered text-to-speech and voice cloning.
     2x  AI-powered music creation and collaboration.
```

* The 1,271 identical descriptions come from the layout default (§5.2) — fixed by P0-2.
* The **36x** duplicate is real and sits on indexable tool pages: `seoDescription(tool.description, tool.tagline)` truncates to 155 chars and 36 seed records carry the same short description string. Find them with:
  ```bash
  grep -n 'AI-powered email tool for writing, automation, and marketing' lib/seed/tools.ts
  ```
* `seoTitle()` in `lib/seo.ts` appends `…` when the title exceeds 60 chars. Titles that truncate mid-word lose the brand suffix and can collide. Prefer `"${name} – ${shortTagline}"` with a word-boundary cut and always keep the brand in the SERP snippet.

**Fix:** de-duplicate the 36 descriptions in the seed and add a build-time guard to `scripts/validate-seed.mjs`:
```js
// scripts/validate-seed.mjs
const seen = new Map()
for (const t of SEED_TOOLS) {
  const d = (t.description ?? t.tagline ?? '').trim().toLowerCase()
  if (d && seen.has(d)) errors.push(`Duplicate description: ${t.slug} == ${seen.get(d)}`)
  else if (d) seen.set(d, t.slug)
}
```

---

### 6.7 P1-7 · `/edittools` carries two contradictory identities

The same section is described differently depending on where you look:

| Surface | Says |
|---|---|
| URL | `/edittools` → implies "editing tools" |
| H1 (`components/listing/ReposView.tsx:19`) | **"Editing Tools"** |
| Intro copy | "Explore top online editing tools ranked by the community." |
| `<title>` (`app/edittools/page.tsx`) | "Open Source GitHub Repos & LLM Tools" |
| `llms.txt` | "Open-source repos & LLM tools: /edittools" |
| JSON-LD | `SoftwareApplication`, `applicationCategory: 'Multimedia'`, sourced from `SEED_REPOS` |

For Google this is a relevance mismatch (`edittools` strongly implies media editors; the content is GitHub/LLM repos, so the page competes for the wrong query). For LLMs it is an entity-confusion bug — `llms.txt` explicitly labels the URL as something the page itself denies.

**Fix (recommended):** rename the section to match its content and 301 the old URLs.
```js
// next.config.js
{ source: '/edittools', destination: '/repos', permanent: true },
{ source: '/edittools/:slug', destination: '/repos/:slug', permanent: true },
```
Then rename `app/edittools/` → `app/repos/`, set the H1 to **"Open Source Repos & LLM Tools"**, and update `sitemap.ts`, `llms.txt`, the navbar/footer labels and internal links.

**Minimum viable fix** (no URL change): make the H1 and intro copy say "Open Source GitHub Repos & LLM Tools" so the page agrees with its own `<title>` and `llms.txt`.

---

### 6.8 P1-8 · 26 near-duplicate `/offers/edu/*` pages dilute topical relevance

```
$ grep -c '/offers/edu/' urls.txt
26
```

Sitemap entries include `/offers/edu/smc-edu`, `/offers/edu/cerritos-edu`, `/offers/edu/coastline-edu`, `/offers/edu/pasadena-city-edu`, … Each is a template-populated page about a US community-college `.EDU` mailbox, all sharing the same structure, the same "unlock 40+ offers" pitch and near-identical body copy — all at `priority: 0.7`.

Two compounding problems:
1. **Thin/duplicate content at scale.** 26 templated pages earn no organic traffic individually, and they drag on the site-quality signals that govern the 2,591 genuinely good detail pages.
2. **Topical drift.** The site positions as *Morocco-first* (`geo.region=MA`, `llms.txt` says so), yet 26 of its 322 offer pages are about US community-college enrollment. That is a relevance problem for both Google and for LLM source selection.

**Fix:** consolidate — create one comprehensive page (`/offers/edu/how-to-get-edu-mailbox`) and 301 the 26 thin pages into it, or `noindex` the cluster and remove it from the sitemap. Keep the 5-6 strongest if they have individual search demand.

---

### 6.9 P1-9 · OpenGraph images for detail pages are third-party favicons

`lib/site.ts` → `resolveOgImage()` returns the item's `logoUrl`, which for most seed records is `https://icons.duckduckgo.com/ip3/<domain>.ico` — a **32×32 favicon**. Meta then sets:

```tsx
images: [{ url: ogImage.src, alt: `${tool.name} - AI Hunt` }],
twitter: { card: ogImage.isLogo ? 'summary' : 'summary_large_image' }
```

**Consequences**
* Shared links and AI answer cards render a tiny, often blurry favicon instead of a 1200×630 preview.
* `og:image` depends on a third-party host (DuckDuckGo) at render time — if it changes its IP3 endpoint, every preview across 2,591 pages breaks.
* The page's *primary* image is a 32px `.ico`, which is weak for Google Images and useless as an entity signal for LLMs.

**Fix:** generate a per-page OG image with Next.js `ImageResponse` (`app/<route>/opengraph-image.tsx` or a shared `/og?title=…` route) reading the item name, category and tagline. That is a well-supported App Router feature and removes the third-party dependency entirely:
```tsx
// app/api/og/route.tsx  (simplified)
import { ImageResponse } from 'next/og'
export async function GET(req: Request) {
  const name = new URL(req.url).searchParams.get('title') ?? 'AI Hunt'
  return new ImageResponse(<div style={{ /* 1200×630 card with name + AI Hunt */ }} />,
    { width: 1200, height: 630 })
}
```
Then `resolveOgImage` returns `${SITE_URL}/api/og?title=${encodeURIComponent(item.name)}` and `twitter:card` is always `summary_large_image`.

---

## 7. P2 — Medium findings

### 7.1 GEO: `llms.txt` is present but shallow
`llms.txt` lists 20 tools, 20 dev tools, 15 repos, 15 courses, 10 offers — **80 of 2,591 detail pages**. There is no `llms-full.txt`, no per-page Markdown rendition, and no "last updated" line (LLM retrieval pipelines prefer dated sources).

Recommended additions:
```
## Optional
- Full catalogue dump (Markdown): /llms-full.txt
- Machine-readable sitemap: /sitemap.xml
- Last updated: <ISO-8601 date, injected at build>
```
plus an `app/llms-full.txt/route.ts` that streams every item as `- [Name](url): tagline — category · pricing`. Keep `llms.txt` as the curated index.

### 7.2 GEO: no authorship or provenance surface for E-E-A-T
Every detail page shows `Updated 3mo ago` (good), but there is **no `/about` page, no author page, no `/contact` page**, and `profile/yahia` is `noindex, nofollow`. The `Organization` schema has a `founder` and exactly one `sameAs` (GitHub).

Answer engines weigh entity provenance heavily when choosing sources. Add:
* `/about` — who runs the directory, the ranking methodology, how submissions are reviewed.
* `/contact` — or promote `/support` and link it from the footer as contact.
* Expand `Organization` JSON-LD with logo dimensions, `sameAs` (GitHub, X, LinkedIn) and `contactPoint`.

### 7.3 `WebSite` schema uses an invalid `keywords` property and a blocked `SearchAction` target
```tsx
keywords: 'AI tools, n8n, automation, …',        // not a schema.org WebSite property
potentialAction: { '@type': 'SearchAction',
  target: { urlTemplate: `${baseUrl}/search?q={search_term_string}` } }
```
* `keywords` is not in the schema.org vocabulary — remove it (the schema already has `about`/`audience`).
* The `SearchAction` target must be crawlable; `/search` is `Disallow`ed (§6.4). Either remove the disallow or drop the `SearchAction`.

### 7.4 No `hreflang`, and the Arabic content is invisible to crawlers
Metadata declares `inLanguage: ['en','fr','ar']` and `llms.txt` states "Languages: English, French, Arabic" — but there is **no alternate-language URL and no `hreflang`**. The Arabic translations live in `offersLang` state and the hover-to-translate UI, and `lib/store.tsx` deliberately strips the query parameter:

```ts
// lib/store.tsx — "query variants would create duplicate indexable URLs"
const url = new URL(window.location.href)
if (url.searchParams.has('lang')) { url.searchParams.delete('lang'); … }
```

So Arabic content is unreachable to search engines and LLMs — a missed opportunity for Morocco-intent queries in Arabic, one of the site's stated differentiators. If Arabic coverage matters, publish it in a real URL space (`/ar/...`) with reciprocal `hreflang` (or `next-intl` + `alternates.languages`). If it does not, drop `'ar'` from the schema and from `llms.txt` so the stated language set matches reality.

### 7.5 Sitemap `lastModified` churns on every deploy
`app/sitemap.ts` uses a build-time `BUILD_DATE` for every hub and category page, so each deploy claims 88 pages changed even when nothing did. Google discounts `lastmod` values it cannot trust. Derive `lastModified` from the newest `updatedAt` in each section instead, so the signal stays meaningful.

Also decide and document whether `/submit` belongs in the sitemap — it is currently `index, follow` with a self-canonical but is not listed.

### 7.6 Canonical/robots conflicts on the redirect + noindex routes
`app/tools/[category]/page.tsx` and `app/categories/[category]/page.tsx` set `robots: { index: false, follow: true }` while inheriting `alternates.canonical = baseUrl` (the **homepage**) from the layout. A noindex page that canonicalises to the homepage is a contradictory instruction. Give those routes an explicit self-canonical, or (better) make them real redirects per §5.2 and delete both directives.

### 7.7 `not-found` / `error` handling
`app/not-found.tsx` correctly renders with a 404 status for genuinely missing routes. The problem is elsewhere: statically prerendered routes that *call* `notFound()` (`/guides`) or *call* `redirect()` (`/tools/<slug>`) return HTTP **200** instead. Those are the two templates to fix (§5.2, §6.3); the not-found component itself is fine.

---

## 8. P3 — Polish / nice-to-haves

1. **`X-Robots-Tag: noindex` on `/api/*`** — currently only a `robots.txt` disallow. Headers are more robust than robots rules.
2. **IndexNow / Bing Webmaster Tools** — ping on deploy for near-instant discovery; it also feeds Copilot's index. Cheap to add.
3. **`og:locale` + `og:locale:alternate`** in OpenGraph to support the multi-language claim.
4. **`dateModified` on home and hub pages** — currently only detail pages carry dates.
5. **`<img>` vs `next/image`** — only 3 components use `next/image`; ~11 raw `<img>` tags bypass optimization (`components/ui/Avatar.tsx`, `Logo.tsx`, `PartnersMarquee.tsx`, `StarterPackCard.tsx`, `PackDetailModal.tsx`, `ChatBot.tsx`). `alt` text is present on **all 11** (good, verified), but `width`/`height` is inconsistent, which causes CLS.
6. **Self-host the logos** — `public/logos/` already holds 114 files; removing the `icons.duckduckgo.com` dependency (see §6.9) also removes a third-party request per card.
7. **Sitemap scale headroom** — 3,100 URLs today is fine. Introduce a sitemap index before crossing 50,000.
8. **`README.md` says "1,800+ curated entries"; the seed now holds 3,013** (1,264 tools + 814 dev tools + 421 repos + 191 courses + 323 offers). Update the docs.
9. **Ranking transparency** — the "community-ranked" claim is backed by static seed numbers plus per-browser `localStorage` deltas (documented in `README.md`). For E-E-A-T, state the ranking methodology on-page and name the curator.
10. **Comment/rating schema** — detail pages render a `Discussion` section that always shows `0 comments` in the prerendered HTML. Once comments persist, wire up `Comment`/`AggregateRating` JSON-LD; until then consider deferring the empty block.

---

## 9. Prioritized action plan

### Week 1 — stop the bleeding (P0)
| # | Action | File(s) | Effort |
|---|---|---|---|
| 1 | Server-render first page + static `<h1>` on `/tools`, `/courses`, `/offers`, `/edittools` and the 3 `[category]` listing routes | `app/**/page.tsx`, `components/listing/*View.tsx` | M |
| 2 | Make legacy `/tools/<slug>` + `/categories/<x>` return real 3xx (`dynamic = 'force-dynamic'`, drop `generateStaticParams`) | `app/tools/[category]/page.tsx`, `app/categories/[category]/page.tsx` | S |
| 3 | Delete the site-wide `BreadcrumbList` from the layout; add correct 2-level breadcrumbs to the 5 hub pages | `app/layout.tsx`, `app/tools/page.tsx`, … | S |
| 4 | `/guides`: `noindex` while `GUIDES_ENABLED=false`; remove `/guides` from `llms.txt` when disabled | `app/guides/**`, `app/llms.txt/route.ts`, `app/robots.ts` | S |
| 5 | Remove `Disallow: /search` and `Disallow: /profile/`; add `Disallow: /skills/` | `app/robots.ts` | S |
| 6 | Expand the AI-crawler allow-list (§6.5a) | `app/robots.ts` | S |

### Weeks 2-4 — structural SEO (P1)
7. Fix the 2.36 MB seed bundle — per-route slices / server-first catalogue (§6.1).
8. Rename `/edittools` → `/repos` with 301s, or at minimum align the H1 and intro copy with the title (§6.7).
9. Consolidate the 26 `/offers/edu/*` pages into one guide with 301s (§6.8).
10. De-duplicate the 36 identical meta descriptions; add the duplicate guard to `scripts/validate-seed.mjs` (§6.6).
11. Generate real per-page OG images with `ImageResponse`; drop the favicon-based `og:image` (§6.9).
12. Free `/tools/<category>` for genuine category landing pages (depends on #2) — highest-upside structural change.

### Weeks 5-12 — GEO & authority (P2)
13. Add `/about` + `/contact`, expand `Organization` JSON-LD, state ranking methodology (§7.2).
14. Ship `llms-full.txt` and add a build-injected "Last updated" line to `llms.txt` (§7.1).
15. Fix `WebSite` schema: remove `keywords`, unblock the `SearchAction` target (§7.3).
16. Decide on Arabic: real `/ar/` URLs with `hreflang`, or remove the Arabic claims from schema and `llms.txt` (§7.4).
17. Source `lastmod` from real content dates instead of build time (§7.5).
18. Register Google Search Console + Bing Webmaster + IndexNow; set `NEXT_PUBLIC_SITE_URL` to the real production domain.

---

## 10. Configuration check — the canonical host

`lib/site.ts` resolves every canonical, OG URL, JSON-LD `url`, `sitemap.xml` `<loc>` and `robots.txt` `Sitemap:` line from a single value:

```ts
const FALLBACK_SITE_URL = 'https://aihubtools.vercel.app'
export const SITE_URL = resolveSiteUrl()   // from NEXT_PUBLIC_SITE_URL
```

The value currently committed in `.env.local` is `https://aihubtools.vercel.app`, which is what every one of the 3,100 sitemap URLs and every canonical now points at:

```
$ curl -s localhost:3999/robots.txt | tail -1
Sitemap: https://aihubtools.vercel.app/sitemap.xml
$ curl -s localhost:3999/tools | grep -o '<link rel="canonical"[^>]*>'
<link rel="canonical" href="https://aihubtools.vercel.app/tools"/>
```

**Action:** confirm the production domain. If AI Hunt is served from anything other than `aihubtools.vercel.app` (the repo's own `.env.example` suggests `https://ai-hunt.com`), then **every canonical on the site currently points at the wrong host** — which is the most damaging possible SEO state, because it tells Google to consolidate all signal onto a different origin. `lib/site.ts` already warns about this at build time; make the warning a hard build failure in production:

```ts
if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error('NEXT_PUBLIC_SITE_URL must be set in production')
}
```
Also set it as a project environment variable in Vercel, not only in `.env.local`.

> Security note (not a finding): the NVIDIA API key in `.env.local` is correctly excluded from git (`.gitignore` covers `.env*`, and `git grep nvapi-` across all history returns only documentation prose, no key). The placeholder-domain warning in `lib/site.ts` only fires on `NODE_ENV=production` builds without the env var — worth surfacing in CI.

---

## 11. Measurement — how to know these fixes worked

| Signal | Where | Target |
|---|---|---|
| Pages indexed vs submitted | Google Search Console → Pages | Submitted 3,100 → indexed should climb from whatever it is today (check first; the empty hubs are likely capped) |
| "Discovered – currently not indexed" | GSC | Should shrink after P0-2 (redirects consolidate) |
| Soft 404 count | GSC | Should go to ~0 after §5.2 + §6.3 |
| Rich results (Breadcrumbs, Sitelinks searchbox, FAQ) | GSC → Enhancements | Breadcrumb errors should drop to 0 after §6.2 |
| Core Web Vitals | GSC → Experience / Vercel Speed Insights | LCP and INP "Good" on mobile after §6.1 |
| AI citations | Manual: ask ChatGPT / Perplexity / Claude / Copilot "best AI tools directory for Morocco", "n8n automation tools", "free AI tools for developers" and record whether AI Hunt is cited | Baseline now, re-measure monthly |
| AI crawl activity | Vercel logs filtered on `GPTBot`, `ClaudeBot`, `PerplexityBot`, `OAI-SearchBot`, `CCBot` | Should see real GETs on `/` + `/llms.txt`; if you only see `/llms.txt` and not the hub pages, P0-1 is not done |
| Server-side render check (regression guard) | CI script below | Must show non-zero content on every hub |

### Recommended CI guard (`scripts/seo-smoke.sh`)
```bash
#!/usr/bin/env bash
set -uo pipefail
BASE="${1:-http://localhost:3000}"
fail=0
check() { # path, pattern, label
  body=$(curl -s -A 'GPTBot/1.2' "$BASE$1")
  if ! grep -q "$2" <<<"$body"; then echo "FAIL $3 ($1) — missing: $2"; fail=1
  else echo "ok   $3"; fi
}
check /            '<h1'            'home has H1'
check /tools       '<h1'            'tools hub has H1 in server HTML'
check /tools       'GitHub Copilot' 'tools hub lists real items without JS'
check /courses     '<h1'            'courses hub has H1 in server HTML'
check /offers      '<h1'            'offers hub has H1 in server HTML'
check /edittools   '<h1'            'edittools hub has H1 in server HTML'
check /llms.txt    'Top AI tools'   'llms.txt served'

[ "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/tools/chatgpt")" = 308 ] \
  || { echo "FAIL legacy /tools/<slug> is not a 308"; fail=1; }
[ "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/guides")" = 404 ] \
  || { echo "FAIL /guides should 404 while GUIDES_ENABLED=false"; fail=1; }
exit $fail
```
Run it against the preview deployment in CI (`.github/` already exists in this repo).

---

## 12. Appendix — raw evidence and the sweep script

### 12.1 Crawl result (all sitemap URLs)
```
checked: 3100
non-200:    0
```
**Every sitemap URL resolves with HTTP 200.** No 404s, no 5xx, no redirects. The crawl surface itself is clean.

### 12.2 Server-render check (GPTBot user-agent, no JavaScript)
```
/              unique_item_links=20  h1=1  bytes=128118
/tools         unique_item_links=0   h1=0  bytes=44557
/dev-tools     unique_item_links=0   h1=1  bytes=45063
/courses       unique_item_links=0   h1=0  bytes=45403
/offers        unique_item_links=0   h1=0  bytes=44916
/edittools     unique_item_links=0   h1=0  bytes=44556
```
The 20 links on `/` come from `PartnersMarquee` (static data, correctly server-rendered). The catalogues add zero.

### 12.3 Prerendered-HTML sweep (4,697 files)
```
pages scanned: 4697
unique titles: 3430 | duplicated titles: 3
  1266x  AI Hunt - Discover AI Tools, Dev Tools & Learning Resources
         (1,265 legacy /tools/<slug> pages + the _not-found template)
     2x  Elicit - AI research assistant for literature review - AI Hunt
     2x  Guide Not Found - AI Hunt

unique descriptions: 3384 | duplicated: 9
  1271x  AI Hunt is a community-driven platform to discover and share…
    36x  AI-powered email tool for writing, automation, and marketing.

pages WITHOUT canonical link: 0
pages WITHOUT <h1>: 1624
```

### 12.4 H1 coverage of indexable sitemap URLs
```
87 sitemap static/category URLs checked
32 have NO <h1> in their HTML:
  /tools, /edittools, /offers
  /courses and 17 × /courses/<category>
  /offers and 11 × /offers/<category>
```

### 12.5 Status-code report for the non-sitemap (legacy) URL space
```
/tools/chatgpt          HTTP 200  loc=(none)  → meta refresh after 1s to /tools/other/chatgpt
/tools/agency-swarm     HTTP 200  loc=(none)
/tools/zed              HTTP 200  loc=(none)
/categories/coding      HTTP 200  loc=(none)
/categories/llm         HTTP 200  loc=(none)
/devtool                HTTP 308  → /dev-tools           ✅
/devtool/foo            HTTP 308  → /dev-tools/foo       ✅
/prompts                HTTP 404                          ✅
/guides                 HTTP 200  (body: "Page not found", meta robots: index, follow)
/guides/any-slug        HTTP 200
/search                 HTTP 200, <meta name="robots" content="noindex, follow">   ✅
/profile/yahia          HTTP 200, <meta name="robots" content="noindex, nofollow">  ✅
/skills/seo.md          HTTP 200, text/markdown   ← 108 crawlable raw files
```

### 12.6 Repro script — prerendered-HTML sweep
```python
import os, re, collections
titles, descs = collections.Counter(), collections.Counter()
no_h1, no_canon, n = [], [], 0
for root, _, files in os.walk('.next/server/app'):
    for f in files:
        if not f.endswith('.html'):
            continue
        p = os.path.join(root, f)
        h = open(p, encoding='utf-8').read()
        n += 1
        titles.update(re.findall(r'<title>(.*?)</title>', h))
        descs.update(re.findall(r'<meta name="description" content="(.*?)"', h))
        if '<h1' not in h: no_h1.append(p)
        if 'rel="canonical"' not in h: no_canon.append(p)
print('pages:', n, '| no <h1>:', len(no_h1), '| no canonical:', len(no_canon))
print('duplicate titles:', [(t, c) for t, c in titles.most_common(3)])
print('duplicate descriptions:', [(t[:60], c) for t, c in descs.most_common(3)])
```

### 12.7 Files reviewed for this audit
`app/layout.tsx` · `app/page.tsx` · `app/robots.ts` · `app/sitemap.ts` · `app/manifest.ts` · `app/llms.txt/route.ts` · `app/tools/page.tsx` · `app/tools/[category]/page.tsx` · `app/tools/[category]/[slug]/page.tsx` · `app/dev-tools/**` · `app/courses/**` · `app/offers/**` · `app/edittools/**` · `app/guides/**` · `app/categories/[category]/page.tsx` · `app/search/page.tsx` · `app/submit/page.tsx` · `app/support/page.tsx` · `app/profile/[username]/page.tsx` · `lib/site.ts` · `lib/seo.ts` · `lib/json-ld.ts` · `lib/guides.ts` · `lib/store.tsx` · `lib/seed/*.ts` · `components/listing/*` · `components/detail/*` · `components/home/*` · `next.config.js` · `.env.example` · `.gitignore` · `README.md` · build artefacts in `.next/`

---

## 13. Bottom line

The **infrastructure layer** of this site is in better shape than most directories: a complete 3,100-URL sitemap with zero broken URLs, canonicals everywhere, correct noindex on search/profiles, rich per-item JSON-LD, an AI-crawler allow-list, and an `llms.txt` that actually exists. Those are the hard, unglamorous things most sites never do.

The failure is concentrated in exactly **two places**, and both are fixable in a day or two of work:

1. **Hub pages render empty without JavaScript** — so AI engines see `/tools`, `/courses`, `/offers` and `/edittools` as blank pages with no links and no heading. The GEO plumbing points at pages with nothing in them.
2. **1,292 legacy URLs are 200-status meta-refresh pages** instead of redirects — so Google gets soft redirects on 1,292 URLs and AI crawlers get dead ends.

Fix those two, then ship the seed-bundle refactor and the breadcrumb correction, and this site goes from "well-built but invisible to answer engines" to genuinely citation-ready.
