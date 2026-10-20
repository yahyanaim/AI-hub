# AI Hunt: technical SEO and Sitelinks audit

Audit date: 20 October 2026. Repository baseline: `68af4da82d473d46d73b903d4858c72dedf2f9eb`.
Scope: existing AI Hunt website at https://www.aihubtools.ma. English primary language. No new pages, categories, design changes or production deployment. Follow-up authorization permits a clean feature-branch commit, push and PR to main, with no merge or production deployment.

## Discovery and initial audit (before implementation)

Next.js 14.2.35, React 18.3.1, App Router. Root metadata and global schemas: `app/layout.tsx`. Canonical helper: `lib/site.ts`. SEO helpers: `lib/seo.ts`, escaping: `lib/json-ld.ts`. Navigation: `components/layout/Navbar.tsx`, `Footer.tsx`, `FooterGate.tsx`. Dynamic catalogue routes: tools, dev-tools, courses, offers (category and detail), edittools (detail). Sitemap and robots use Next metadata routes. Legacy redirects and real catalogue 404s are enforced by `middleware.ts` with generated `lib/legacy-redirects.json`. `next.config.js` supplies additional permanent redirects and noindex headers for raw skills and API responses. No Vercel project configuration file found; live `x-vercel-id` headers corroborate Vercel hosting, but account settings are not accessible. Existing smoke checks: `scripts/seo-smoke.sh`; CI runs seed, goal, lint, type and build checks.

| Finding | Severity | Evidence | Recommended fix |
|---|---|---|---|
| Global WebSite/Organization and hub JSON-LD absent from raw HTML | High | Live GET `/`, `/tools`, `/dev-tools`, `/edittools`, `/courses`, `/offers`, `/about`, `/find-by-goal`, sampled category hubs: zero actual JSON-LD script elements. Source uses `next/script` default afterInteractive strategy. `/tools/other/chatgpt` instead emits native SoftwareApplication and BreadcrumbList scripts. This establishes a rendering dependency, not proof that Google never renders the schemas. | Use native script tags for existing JSON-LD, retaining safe serialization. Keep executable analytics scripts unchanged. |
| Crawlable rendering resources blocked by robots | High | Live robots.txt contains `Disallow: /_next/` in wildcard and named-agent groups; rendered HTML references CSS and JS under that path. | Allow framework resources while preserving API/skills/disabled-guides exclusions and intentional noindex pages. |
| Sidebar categories link to query variants instead of existing canonical hubs | Medium | 27 homepage anchors use `/tools?category=...`; those URLs inherit `/tools` canonical. Dedicated `/tools/<category>` hubs already have their own content and canonicals. | Deferred after behavior review: retain existing query hrefs because dedicated hubs use separate saved-filter state keys. |
| Sitemap lastmod uses build time without content evidence | Medium | Live homepage, support, about and find-by-goal share `2026-10-20T01:49:15.796Z`; `app/sitemap.ts` assigns BUILD_DATE to static pages and missing/invalid item dates. | Omit unsupported lastmod values and retain valid item-based dates. |
| Brand suffix repeated in About and Support document titles | Low | Live titles: `About AI Hunt - Who runs this directory and how ranking works - AI Hunt`; `Support AI Hunt - Buy me a coffee - AI Hunt`. Root template appends the suffix to titles already naming the brand. | Make these existing full titles absolute; preserve their wording. |

No critical issue established. Do not infer the reason for absent Google Sitelinks from this audit alone. Google decides Sitelinks algorithmically.

## Verified strengths and boundaries

- All nine primary/informational pages sampled return 200, one H1, English HTML, descriptions and exactly one appropriate production canonical.
- Main header/footer destinations are real HTML anchors in raw responses, including Tools, Dev Tools, Editing Tools, Courses, Offers, Find by Goal and About (footer).
- Search and sampled profile pages intentionally serve noindex, follow; excluded from sitemap. Do not remove those directives.
- The live XML sitemap parses successfully: 3,309 entries, 3,309 unique locations, all on `www.aihubtools.ma`. No future dates found relative to audit date. No claim that every listed URL has been live-crawled.
- Site logo, `/og.png` and `/og-hero.png` return 200 with image/png.
- `AI Hub Tools` already appears as a secondary name in homepage description and visible support copy; it is not a reason to rename AI Hunt.
- Existing native detail schemas parse as JSON. Syntax validity does not establish Google rich-result eligibility. Existing BreadcrumbList trails reference real routes; visible breadcrumb UI is absent in sampled components. No new breadcrumb hierarchy or visible UI will be added without approval.
- Existing hidden crawl-link navigation and repeated marquee links are recorded, not redesigned. Category counts are zero in homepage raw HTML until store hydration; fixing that visible content behavior is outside the minimal technical patch.
- No authenticated Search Console integration is available; indexing, Google-selected canonical, branded search performance and actual Sitelinks remain unverified.

## Minimal implementation plan

1. Render existing JSON-LD natively and give the WebSite/Organization stable entity IDs. Use existing alternate site name and English primary language.
2. Unblock rendering assets in robots.
3. Preserve all 27 original sidebar hrefs and existing shared listing state, after the final behavior review identified risk in changing targets.
4. Omit synthetic sitemap modification dates; preserve validated content dates.
5. Prevent duplicate brand suffixes on About/Support titles.
6. Validate type/lint/build, existing tests, browser navigation and raw HTML/schema/sitemap/redirect behavior before feature-branch publication.

## Sitelinks readiness

| Area | Assessment |
|---|---|
| Brand consistency | AI Hunt is retained in titles, logos, manifest and site entities. Existing AI Hub Tools alias is used as alternateName, not a replacement brand. |
| Navigation clarity | Existing main sections are one click from the homepage via HTML anchors. No new destinations added. |
| Indexability | Sampled main hubs are indexable 200 pages; intentional utility exclusions remain. Search Console indexing decisions unavailable. |
| Internal linking | All 27 sidebar category links retain the original query URLs and shared filter/history behavior. Dedicated canonical hubs remain in the sitemap; a direct-href optimization is deferred. Catalogue pages already expose detail links and related resources. Full orphan-page proof requires a complete rendered crawl; pagination remains client driven. |
| Metadata | Sampled canonicals/descriptions/language already correct; About/Support brand repetition corrected. No editorial descriptions rewritten. |
| Canonical consistency | Production www host is consistent in sampled canonicals and all sitemap locations. All four HTTP/HTTPS host variants reach it; HTTP apex has a two-hop 308 chain. |
| Crawlability | Existing SSR headings/listings preserved. Framework assets unblocked locally. |
| Structured data | Existing schemas moved to raw HTML; JSON syntax and entity consistency checked locally. Google rich-result eligibility is not implied by valid JSON. |

Strong existing Sitelink candidates: Tools (`/tools`), Dev Tools (`/dev-tools`), Editing Tools (`/edittools`), Courses (`/courses`), Offers (`/offers`), Find by Goal (`/find-by-goal`). About (`/about`) and Support (`/support`) are secondary informational destinations. This reflects their existing navigation prominence, not a request to force any Google result.

## Implementation and regression risk

| Files modified | Existing problem and applied change | SEO purpose | Regression risk |
|---|---|---|---|
| `app/layout.tsx` | WebSite/Organization now use native JSON-LD script tags, stable entity IDs and a publisher reference; preferred name AI Hunt, alternate AI Hub Tools from existing homepage copy, primary language en. Analytics stays on next/script. | Remove hydration dependency; clarify site identity. | Low: non-executable markup only; keep safeJsonLd escaping. |
| `app/page.tsx`, `app/about/page.tsx`, `app/find-by-goal/page.tsx`, `app/guides/page.tsx` | Existing FAQ/About/HowTo/collection markup uses native scripts. Disabled guides remain disabled. | Make existing structured data available in raw HTML. | Low: no body content or enabled routes changed. |
| `app/tools/page.tsx`, `app/dev-tools/page.tsx`, `app/edittools/page.tsx`, `app/courses/page.tsx`, `app/offers/page.tsx`; `app/tools/[category]/page.tsx`, `app/dev-tools/[category]/page.tsx`, `app/courses/[category]/page.tsx`, `app/offers/[category]/page.tsx` | Existing CollectionPage/BreadcrumbList scripts render natively. | Avoid deferring schema discovery to JavaScript rendering. | Low: preserve existing schema contents and URLs. |
| `app/robots.ts` | Remove only the /_next/ exclusion in wildcard and named-agent groups. | Allow CSS/JS crawling and rendering. | Low: API/skills/disabled-guides rules and page noindex remain. |
| `app/sitemap.ts` | Omit unsupported lastModified values; skip missing/invalid catalogue dates when aggregating. | Preserve truthful content-change signals. | Low: identical ordered URL set; valid existing dates retained. |
| `app/about/page.tsx`, `app/support/page.tsx` | Existing complete document titles are absolute to bypass the root suffix. | Prevent repeated brand suffix; no wording change. | Low: document title only. |
| `scripts/seo-regression-check.ts` | New focused checks for sitemap integrity/dates, crawl rules, safe JSON-LD and optional raw HTTP response checks. | Catch recurrence of the demonstrated defects. | Test-only; no provider calls. |

## Production observations and unresolved items

Live evidence is recorded in `docs/SITELINKS_LIVE_EVIDENCE.json`.

- `http://aihubtools.ma/` → 308 HTTPS apex → 308 HTTPS www → 200. HTTPS apex and HTTP www each reach HTTPS www in one redirect. No loop observed. Keep host redirects unchanged; optional one-hop optimization belongs in Vercel domain settings after verifying configuration access.
- Legacy Vercel host preserves path/query when issuing 308 to www. `/tools/chatgpt` issues 308 to `/tools/other/chatgpt`. Unknown sampled detail URL and disabled `/guides` return real 404.
- Existing breadcrumbs reference real hierarchy/routes, but no visible breadcrumb component exists in sampled pages. Adding one would alter UI and is deferred pending approval.
- Empty SSR sidebar counts and existing hidden crawl-link/marquee behavior are not redesigned. Full catalogue orphan detection and a complete 3,309-URL live crawl are not claimed.
- No Core Web Vitals measurement, field data or authenticated Search Console inspection was available. This patch adds no client dependency or visual component; no numeric performance claim is made.
- Existing lint warnings outside changed code remain; dependency versions and lockfile unchanged. pnpm 11 downloaded dependencies but exited on its build-script approval policy; installed binaries support the checks, and no repository approval configuration was retained.

## Google Search Console checklist after an approved deployment

1. Inspect `https://www.aihubtools.ma/`: compare indexed URL with Test Live URL; confirm crawl allowed and indexing allowed; check the Google-selected canonical equals HTTPS www homepage.
2. Repeat for `/tools`, `/dev-tools`, `/edittools`, `/courses`, `/offers`, `/find-by-goal` and one existing category/detail route. Check the rendered HTML/screenshot and resource availability; verify native WebSite/Organization and applicable collection/breadcrumb JSON-LD.
3. Recheck production `/robots.txt`: framework assets must no longer be disallowed; API/skills/disabled-guides rules must remain. Verify search, submit and profile noindex remains.
4. Confirm `/sitemap.xml` is successful in Sitemaps. Keep the existing sitemap submission; resubmit its same URL if needed. Check fetch date and indexing exclusions. Sitemap submission does not guarantee indexing.
5. Inspect sample URLs marked duplicate, crawled-currently-not-indexed or discovered-currently-not-indexed. Compare user-declared and Google-selected canonicals; do not remove intentional utility noindex exclusions.
6. Use Google Rich Results Test for supported page schema types and Schema Markup Validator for general WebSite/Organization syntax. A valid graph does not guarantee rich results or Sitelinks.
7. Request indexing for the homepage and a small number of changed important pages after live verification. Do not repeatedly request the whole catalogue.
8. In Performance, compare branded queries `AI Hunt`, `AI Hub Tools`, `aihubtools.ma` over comparable periods and country/device filters, noting deployment and recrawl dates. Reassess after Google recrawls; no fixed appearance deadline or Sitelinks guarantee.

## Official guidance consulted

- [Google Sitelinks](https://developers.google.com/search/docs/appearance/sitelinks): algorithmic results driven by usefulness and site structure.
- [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics): blocked resources cannot be rendered.
- [Google structured data introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data): JSON-LD belongs in page script elements; rendered injection is supported but adds a dependency.
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap): lastmod should reflect verifiable significant changes.

## Validation results

| Check | Result |
|---|---|
| TypeScript `tsc --noEmit` | Passed after correcting strict undefined handling in the new regression test. |
| Full ESLint | Passed with 9 pre-existing warnings in unchanged card/chat/detail/avatar/hero files, 0 errors. Focused lint on changed technical code and new script: clean. |
| Production build | Passed, all 3,356 static pages generated and optimization completed. First build caught type errors in the new test while it was being written; corrected before successful final build. |
| Existing goal tests | 101 passed, 0 failed, mocked providers; no live AI-provider calls. |
| Existing seed validation | Passed: tools 1,343; devtools 894; repos 455; courses 190; offers 334. |
| New SEO regression script | Passed: all 3,309 sitemap URLs unique/canonical, invalid dates omitted, static dates omitted, asset crawl rules and JSON-LD escaping. |
| Baseline sitemap comparison | All 3,309 URLs preserved in identical order; 5 unsupported lastmod values removed. Existing valid item dates unchanged. |
| Raw HTTP checks on built app | Passed on 18 sampled home/hub/category/detail/informational pages: English HTML, H1, one correct canonical, parseable JSON-LD with exactly one WebSite/Organization each; relevant collection/FAQ/breadcrumb schemas present. All 27 homepage category anchors retain their original /tools?category=... targets. |
| Intentional noindex checks | Search, submit and sampled profile remain noindex, follow. |
| Existing SEO smoke script | All 24 checks passed: SSR HTML links/headings, LLM resources, robots, skills noindex header, permanent legacy redirects, known hubs and real unknown/disabled-route 404s. |
| Live sitemap sample | 127 URLs (110 category hubs, 17 spread detail samples): all 200, unchanged destination, H1 present and no noindex meta. Full 3,309-URL HTTP crawl not performed. |
| Live host redirects | All requested host/scheme variants reach HTTPS www, no loop. HTTP apex retains its existing two-hop chain. |
| Diff whitespace | `git diff --check` passed. |

Local HTTP checks initially failed because separate command sandboxes cannot share a loopback server. Re-running server and checks together passed; no application fix was needed. The dependency install policy warning and pre-existing lint warnings were not hidden or fixed through unrelated changes.

Reproduce from the repository root:

```sh
node --import tsx scripts/seo-regression-check.ts
node --import tsx scripts/goal-finder-tests.ts
node scripts/validate-seed.mjs
npm run lint
npm run typecheck
NEXT_PUBLIC_SITE_URL=https://www.aihubtools.ma npm run build
npm run start
# In the same network environment, with the built app running:
node --import tsx scripts/seo-regression-check.ts http://127.0.0.1:3000
bash scripts/seo-smoke.sh http://127.0.0.1:3000
```

Validated branch: `fix/sitelinks-technical-seo`. Follow-up approval permits committing, pushing this feature branch and opening a PR to main. Merging and production deployment remain unapproved. Production behavior changes only after a separately approved merge/deployment. No claim of Google indexing, rich-result eligibility, field performance gains or guaranteed Sitelinks.


## Final pre-publication review

- Reviewed every changed application file against baseline. Non-root page diffs contain only the native JSON-LD tag conversion and the two reviewed metadata title corrections. `app/layout.tsx` changes only the existing JSON-LD rendering/entity metadata. No UI classes, body editorial content, category definitions, seed records, fonts, icons, colors, dependencies, authentication, API handlers, middleware or redirect configuration changed.
- Removed the original Sidebar href optimization from the final diff. Existing category hubs use heading-dependent sessionStorage keys, unlike the shared `/tools?category=...` listing; retaining the original targets avoids filter/history and heading differences. Sidebar, ToolsView, ListingView, FilterBar, Navbar and Footer are byte-identical to baseline.
- A real headless Chromium browser verified all 27 sidebar links, selected-category chips, retained Free pricing, Top sort and List view, and Back/Forward navigation. Additional pagination restoration and Clear/category-chip checks are recorded in the final review evidence.
- Robots source comparison confirms the only change is removing `/_next/` from the two pre-existing exclusion lists. All other user-agent groups, allows, sitemap references and exclusions are unchanged. `/api/`, `/skills/`, disabled `/guides`, page noindex and X-Robots-Tag rules remain; no authorization or access-control code was altered.
- Official brand remains AI Hunt. `lib/site.ts`, the production domain, root title template, manifest, logos, header/footer branding and existing canonical URLs are unchanged. WebSite alternateName uses the already-existing AI Hub Tools alias.
- Reran TypeScript, full lint, production build, seed tests, all 101 goal tests, 18-page raw HTTP/JSON-LD checks and 24 SEO smoke checks against the final application code. All pass. Existing lint warnings: 8 `no-img-element` warnings (`StarterPackCard.tsx` twice, `ChatBot.tsx` three times, `PackDetailModal.tsx` twice, `Avatar.tsx` once), and 1 `react-hooks/exhaustive-deps` warning (`HeroSection.tsx`). These files are unchanged.
- Residual risks: more framework assets can now be crawled, server HTML includes existing schema bytes earlier, and unsupported lastmod values are absent. Search Console outcomes, Google-selected canonicals, live post-deployment behavior and field Core Web Vitals require the deployment checklist; Google Sitelinks are not guaranteed. Query-based sidebar discovery and the existing HTTP-apex redirect chain are intentionally preserved.

All changed files are listed in `docs/SITELINKS_FINAL_REVIEW.md`, with the final validation evidence and deployment checklist.
