# AIhubtools Vercel Fluid Active CPU & Production Audit

## 1. Executive Summary

AIhubtools (`www.aihubtools.ma`) exceeded its Vercel Hobby 4-hour monthly Fluid Active CPU allowance (**5h 43m** observed over 30 days, ~143%–149% of the 4h cap). An end-to-end inspection of the Next.js 14.2.35 App Router codebase, API routes, middleware, and production build output (`3,418` static/SSG pages) identified the primary drivers of Active CPU and unnecessary serverless invocations:

1. **Unconditional 3-Way Model Racing in `/api/chat` (`app/api/chat/route.ts`)**: Every chat request opens up to 3 concurrent SSE streams to `integrate.api.nvidia.com`, running 3 parallel `TextDecoder` + `JSON.parse` loops (including 6k–11k reasoning tokens) and 3 `~24 KB` system-prompt serializations. In the 12-hour snapshot, `/api/chat` consumed **180s Active CPU across 135 invocations (~1.33s CPU/invocation)**.
2. **Barrel Seed Imports (`@/lib/seed`)**: Importing from `@/lib/seed/index.ts` loads all 8 seed modules (**3.04 MB** of TypeScript data: `offers.ts` 928 KB, `tools.ts` 854 KB, `dev-tools.ts` 610 KB, `courses.ts` 381 KB, `repos.ts` 265 KB). Local measurement showed `require('./lib/seed')` takes **121.52 ms** and **40.4 MB** heap vs **18.82 ms** and **10.8 MB** heap for `require('./lib/seed/courses')` directly (**6.5x faster**, **73% less heap**).
3. **Unconditional `/api/admin/ping` Polling on Every Page Load (`components/layout/NotificationBell.tsx`)**: `NotificationBell` is mounted in `Navbar` across all routes and calls `fetch('/api/admin/ping')` in `useEffect(..., [])` for every visitor—including signed-out users and crawlers—even though the component returns `null` when `!currentUser`. This generated **235 invocations (7s CPU)** in the 12-hour snapshot alone.
4. **Overly Broad Edge Middleware Matcher (`middleware.ts`)**: `matcher: ['/', '/:path*']` executes the `53.9 kB` middleware (bundling `101 KB` `legacy-redirects.json`) on static assets (`/_next/static/*`, `/_next/image/*`, `/icons/*`, images, fonts).
5. **Uncached Read-Only & On-Demand Routes**:
   - `/api/push/public-key` returns a static VAPID key with no `Cache-Control` header.
   - `/profile/[username]` defaults to `dynamicParams = true` without `revalidate`, causing repeated on-demand SSR (`23` invocations / `6s` CPU = `261 ms/invocation`) for non-seed usernames.
   - `/api/goal-match` (`3` invocations / `2.2s` CPU = `733 ms/invocation`) imports the full `@/lib/seed` barrel via `lib/goal-finder.ts` (`140.16 ms` cold index build locally).

*(Note: Build CPU `31h 22m` is separate from Fluid Active CPU and reflects 3,418-page static builds across deployments, not runtime Fluid Compute.)*

---

## 2. Architecture Overview

- **Framework**: Next.js `14.2.35` (App Router), React `18.3.1`, TypeScript `5.5.4`.
- **Rendering Split (verified via `npm run build`)**:
  - **Static / SSG (`3,418` routes)**: `/`, `/tools`, `/tools/[category]`, `/tools/[category]/[slug]` (1,345), `/dev-tools/[category]/[slug]` (915), `/courses/[category]/[slug]` (205), `/offers/[category]/[slug]` (341), `/edittools/[slug]` (461), `/about`, `/chat`, `/find-by-goal`, `/search`, `/submit`, `/support`, `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`.
  - **Dynamic (`ƒ`)**: `/categories/[category]` (redirect fallback), `/guides` (gated by `GUIDES_ENABLED = false` in `middleware.ts`), and 12 API routes under `app/api/**`.
  - **Edge Middleware**: `middleware.ts` (`53.9 kB`) enforces `aihubtools.vercel.app → www.aihubtools.ma` (308), `/guides` 404, and legacy URL 308/404 handling using `lib/legacy-redirects.json` (`101 KB`).
- **Data Layer**: Static TypeScript seed catalogs (`lib/seed/*.ts`), Upstash Redis REST (`lib/server/redis.ts`) for signup counts, newsletter, web push subscriptions, and distributed rate limiting (`lib/server/rate-limit.ts`). No relational DB/ORM.
- **AI Providers**: NVIDIA NIM (`https://integrate.api.nvidia.com/v1/chat/completions`) for `/api/chat` and `/api/goal-match`; `unpdf` for `/api/chat/cv`.

---

## 3. Verified Findings & Root Cause Analysis

| Area | Evidence / File | Root Cause | Impact |
|---|---|---|---|
| **AI Chat** | `app/api/chat/route.ts` (`L2`, `L680-732`, `L567`, `L798`) | Unconditional 3-way parallel SSE racing, per-chunk `new Promise`/`setTimeout`, and `@/lib/seed` barrel import | **High** (180s / 135 calls = 1.33s CPU/call) |
| **Admin Ping** | `components/layout/NotificationBell.tsx` (`L92-102`) | Unconditional `fetch('/api/admin/ping')` on mount for all visitors regardless of auth state | **Medium-High** (235 calls / 12h ≈ 14k+/mo) |
| **Seed Barrel** | `lib/seed/index.ts`, `lib/goal-finder.ts` (`L34`) | Barrel imports load all 3.04 MB of seed catalogs into serverless lambdas | **Medium** (121.5ms vs 18.8ms cold import; 40.4 MB vs 10.8 MB heap) |
| **Middleware** | `middleware.ts` (`L174`) | `matcher: ['/', '/:path*']` runs on static assets and `_next` internals | **Medium** (unnecessary Edge invocations) |
| **Profile SSR** | `app/profile/[username]/page.tsx` | On-demand SSR for non-seed usernames with no ISR `revalidate` | **Low-Medium** (23 calls / 6s in 12h) |
| **Push Key** | `app/api/push/public-key/route.ts` | Static VAPID key served without `Cache-Control` | **Low** |

---

## 4. SEO Preservation Assessment

- All `3,418` static/SSG catalog, category, and hub pages remain prerendered HTML with full metadata, canonicals, JSON-LD, `sitemap.xml`, `robots.txt`, `llms.txt`, and `llms-full.txt`.
- `middleware.ts` continues to enforce `aihubtools.vercel.app → www.aihubtools.ma` (308) and all legacy 308/404 rules for page routes; only static assets (`_next/static`, `_next/image`, images, fonts, CSS, JS) are excluded from the matcher.
