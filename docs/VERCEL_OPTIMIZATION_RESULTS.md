# AIhubtools Vercel CPU Optimization Results

## 1. Changes Implemented (Branch: `perf/vercel-cpu-audit`)

1. **`app/api/chat/route.ts` — Primary-First + Delayed Hedging & Direct Course Seed Import**
   - Replaced `import { SEED_COURSES } from '@/lib/seed'` with `import { SEED_COURSES } from '@/lib/seed/courses'`.
   - Replaced unconditional 3-way parallel model racing (`delayMs = idx * 1200`) with a primary-first strategy: only `primaryModel` opens at `t = 0`; `modelsToTry[1]` is launched only if `primaryModel` has not produced its first content token within `12_000 ms`, or immediately upon early failure.

2. **`components/layout/NotificationBell.tsx` & `components/profile/AdminBadge.tsx` — Gated & Cached `/api/admin/ping`**
   - Gated `fetch('/api/admin/ping')` on `currentUser` being signed in (signed-out visitors and crawlers make **0** calls).
   - Cached the boolean result in `sessionStorage` (`aihub_admin_ping_v1`, 10-minute TTL), invalidated on admin login and logout in `AdminBadge.tsx`.

3. **`lib/goal-finder.ts` — Direct Seed Submodule Imports**
   - Replaced `import { SEED_TOOLS, SEED_DEV_TOOLS, SEED_REPOS } from '@/lib/seed'` with direct imports from `@/lib/seed/tools`, `@/lib/seed/dev-tools`, and `@/lib/seed/repos`.

4. **`middleware.ts` — Asset-Excluding Matcher**
   - Narrowed `config.matcher` to skip `/_next/static`, `/_next/image`, `favicon.ico`, `icons/`, and static media/font/CSS/JS extensions while preserving all page, API, `LEGACY_HOST` 308, and SEO routes.

5. **`app/api/push/public-key/route.ts` & `app/profile/[username]/page.tsx` — Caching Headers & ISR**
   - Added `Cache-Control: public, max-age=3600, s-maxage=86400` to `GET /api/push/public-key`.
   - Added `export const revalidate = 3600` to `app/profile/[username]/page.tsx`.

---

## 2. Local Before-and-After Measurements

*(Measured locally on macOS / Node.js with `tsx --conditions=react-server`; production Vercel Fluid Active CPU requires deployment and live Vercel dashboard observation.)*

| Metric | Before | After | Delta |
|---|---:|---:|---|
| Seed import in `/api/chat` (`@/lib/seed` vs `@/lib/seed/courses`) | `121.52 ms` / `40.4 MB` heap | `18.82 ms` / `10.8 MB` heap | **-84.5% init time, -73.3% heap** |
| `/api/chat` concurrent upstream SSE streams (when primary responds `<12s`) | `3` concurrent streams | `1` stream | **-66.7% concurrent SSE JSON parsing** |
| `/api/admin/ping` calls for signed-out visitors / repeat navs | `1` per page load | `0` (signed-out) / `1` per 10m (signed-in) | **~95%+ invocation reduction** |
| `goal-finder` index build (cold / warm) | `140.16 ms` / `25.42 ms` | Preserved (`25.42 ms` warm) | Smaller lambda bundle (drops `offers.ts` 928 KB + `courses.ts` 381 KB) |

---

## 3. Validation & Tests Executed

- `./node_modules/.bin/tsc -p tsconfig.json --noEmit`: **Passed (0 errors)**
- `npm run lint`: **Passed (0 errors, 0 warnings)**
- `npm run seed:check`: **Passed (3,267 entries validated)**
- `npm run test:api`: **Passed (15 / 15)**
- `npm run test:goal`: **Passed (101 / 101)**

---

## 4. Remaining Issues & Monitoring Recommendations

1. **Production Verification**: Deploy `perf/vercel-cpu-audit` only after explicit user approval, then monitor Vercel Observability over 24–72 hours for `/api/chat` Active CPU/invocation, `/api/admin/ping` invocation count, and total Fluid Active CPU burn rate.
2. **External LLM Latency**: If `DEFAULT_MODEL` (`minimaxai/minimax-m3.1-flash`) frequently exceeds 12s before first token, tune `HEDGE_DELAY_MS` in `app/api/chat/route.ts` based on Vercel logs.
3. **Build CPU (`31h 22m`)**: Build CPU is separate from Fluid Active CPU and scales with deployment frequency (`3,418` static pages). Batch commits or use `[skip ci]` on docs-only commits to reduce build minutes.
