# AIhubtools Cost Protection Test Results

## Automated Checks Executed

- **Execution Environment:** Local macOS workspace (`Node.js` + `tsx --conditions=react-server`), no `UPSTASH_REDIS_REST_URL` / `TURNSTILE_SECRET_KEY` in `.env`.
- **Mocked Dependencies:** `scripts/cost-protection-tests.ts` exercises the in-memory quota store (`memStore`/`memLeases`/`memReservations`), mocked `globalThis.fetch` for Redis outage & Turnstile `siteverify` tests, and `AIHUB_FAIL_CLOSED=1`. Mocked Redis tests do **not** replace live Upstash `EVAL` integration tests.

| Command | Passed | Failed | Skipped | Scope & Notes |
|---|---:|---:|---:|---|
| `./node_modules/.bin/tsc -p tsconfig.json --noEmit` | — | 0 | 0 | Full TypeScript typecheck (**0 errors**) |
| `npm run lint` | — | 0 | 0 | ESLint (`next lint`, **0 errors, 0 warnings**) |
| `npm run seed:check` | 5 suites | 0 | 0 | Seed integrity (`1345` tools, `915` devtools, `461` repos, `205` courses, `341` offers) |
| `npm run test:api` | 15 | 0 | 0 | IP extraction, CV upload validation, admin login (`scripts/api-security-tests.ts`) |
| `npm run test:cost` | 41 | 0 | 0 | CV 3/dev + 12/IP, crash-safe CV reservation recovery, ownership, month boundary, commit/refund concurrency, ZSET token leases, prod fail-closed, secret guard, Turnstile action/host/replay & Redis error classification (`scripts/cost-protection-tests.ts`) |
| `npm run test:goal` | 101 | 0 | 0 | Goal-finder retrieval, prompt, output validation, timeouts, route contracts (`scripts/goal-finder-tests.ts`) |
| `npm run build` | 3,418 routes | 0 | 0 | Next.js production build & SSG generation (`3418/3418` static pages) |
| `npx tsx scripts/redis-smoke-test.ts` | — | — | **BLOCKED** | Blocked locally: `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN` unavailable in `.env`, `.env.local`, and Vercel link |

## Unverified External Integrations

- **Live Upstash Redis `EVAL` Integration:** **BLOCKED** locally (no Upstash credentials present). Run `npx tsx scripts/redis-smoke-test.ts` with `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` set to verify `LUA_MULTI_CHECK_AND_INCR`, `LUA_LEASE_*`, and `LUA_CV_*` against live Upstash in the isolated `aihunt:test:cost-protection:*` namespace.
- **Real-Browser Turnstile Interactive Flow:** Client-side `lib/client/turnstile.ts` (`interaction-only` modal rendering, Safari/Chrome/Firefox interactive challenges, ad-blocker behavior) was **not** executed in a live browser because no `NEXT_PUBLIC_TURNSTILE_SITE_KEY` or live deployment is configured in this workspace.
