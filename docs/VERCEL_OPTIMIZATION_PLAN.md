# AIhubtools Vercel CPU Optimization Plan

## Prioritized Tasks

| Priority | Task | Target Files | CPU Impact | Complexity | Regression Risk |
|---|---|---|---|---|---|
| **P0** | Replace 3-way unconditional race in `/api/chat` with primary-first + 12s delayed hedge, eliminate per-chunk `setTimeout` promise allocations where unnecessary, and import `SEED_COURSES` directly from `@/lib/seed/courses` | `app/api/chat/route.ts` | **High** (cuts 2 extra SSE JSON-parse streams + ~100ms cold-start CPU per instance) | Medium | Low (fallback still triggers after 12s or on early error) |
| **P0** | Gate `/api/admin/ping` behind `currentUser` and cache result in `sessionStorage` (cleared on admin login/logout) | `components/layout/NotificationBell.tsx`, `components/profile/AdminBadge.tsx` | **Medium-High** (eliminates ~95%+ of `/api/admin/ping` invocations) | Low | Very Low |
| **P1** | Replace `@/lib/seed` barrel imports in `lib/goal-finder.ts` with direct submodule imports (`tools`, `dev-tools`, `repos`) | `lib/goal-finder.ts` | **Medium** (smaller `/api/goal-match` bundle & faster cold start) | Low | Very Low |
| **P1** | Exclude `/_next/static`, `/_next/image`, `favicon.ico`, `icons/`, and static asset extensions from `middleware.ts` matcher | `middleware.ts` | **Medium** (reduces Edge Middleware invocations on static assets) | Low | Low (all HTML/API/SEO routes remain matched) |
| **P2** | Add `revalidate = 3600` to `app/profile/[username]/page.tsx` and `Cache-Control` to `app/api/push/public-key/route.ts` | `app/profile/[username]/page.tsx`, `app/api/push/public-key/route.ts` | **Low-Medium** (caches repeated on-demand profile & VAPID requests) | Low | Very Low |

## Validation Requirements

- `npx tsc --noEmit` (0 errors)
- `npm run lint` (0 errors/warnings)
- `npm run seed:check`
- `npm run test:api`
- `npm run test:goal`
- `npm run build` (verify all 3,418 static/SSG routes compile and preserve SEO routes)
- Local before/after benchmark of module cold-start import & goal-finder latency

## Rollback Strategy

All changes are isolated to `perf/vercel-cpu-audit`. Any individual optimization can be reverted cleanly with `git revert <commit>` without database migrations or environment variable changes.
