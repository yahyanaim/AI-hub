# AIhubtools Cost Protection Test Results

## Automated Checks Executed

| Command | Scope | Result |
|---|---|---|
| `./node_modules/.bin/tsc -p tsconfig.json --noEmit` | Full TypeScript typecheck | **Passed (0 errors)** |
| `npm run lint` | ESLint (`next lint`) | **Passed (0 errors, 0 warnings)** |
| `npm run seed:check` | Catalog integrity (`3,267` entries) | **Passed** |
| `npm run test:api` | IP extraction, CV upload validation, admin login (`scripts/api-security-tests.ts`) | **15 passed, 0 failed** |
| `npm run test:cost` | CV 3/month quota, cookie/IP bypass resistance, failed upload refund, UTC monthly reset, atomic concurrency leases, rollback, chat/global quotas, emergency switch, fail-closed Redis, bot guard, SEO `robots.ts` (`scripts/cost-protection-tests.ts`) | **18 passed, 0 failed** |
| `npm run test:goal` | Goal-finder retrieval, prompt, output validation, timeouts, route contracts (`scripts/goal-finder-tests.ts`) | **101 passed, 0 failed** |

## Unresolved Risks / External Dependencies

- Live Upstash Redis Lua `EVAL` behavior and Vercel Pro dashboard billing limits cannot be verified locally without production deployment and live Redis credentials; local tests exercise the identical quota contract using the explicit in-memory store and `AIHUB_FAIL_CLOSED=1` override.
- Static/SSG SEO pages (`3,418` routes) are verified via `npm run build`.
