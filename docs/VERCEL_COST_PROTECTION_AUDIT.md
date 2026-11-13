# AIhubtools Cost Protection, Rate Limiting & Anti-Bot Audit

## 1. Verified Risks & Weaknesses (Pre-Implementation Baseline)

1. **Non-Atomic Redis Rate Limiting (`lib/server/rate-limit.ts`)**:
   - Previously executed separate `INCR` and `EXPIRE` REST calls, creating a race condition where concurrent requests or a failed `EXPIRE` could leave permanent counters or miss expiration.
   - Silently fell back to uncoordinated per-instance `memoryBuckets` even in production if `UPSTASH_REDIS_REST_URL` was unset or unreachable.
2. **No Monthly CV Quota (`app/api/chat/cv/route.ts`)**:
   - Only had a 10/minute per-IP limit, allowing unlimited monthly PDF parsing (`unpdf`, `~288 ms` Active CPU/call) and easy bypass across sessions.
3. **No Daily/Monthly/Concurrency Caps on `/api/chat` or `/api/goal-match`**:
   - `/api/chat` (`1.33s` Active CPU/call in 12h) and `/api/goal-match` (`733 ms` Active CPU/call) had only short 60s IP windows, no device identity cookie, no concurrency lease, and no global AI budget cap.
4. **No Anti-Bot Guard on Expensive AI POST Endpoints**:
   - Automated scripts (`curl`, `python-requests`, headless scrapers) could POST directly to `/api/chat`, `/api/chat/cv`, and `/api/goal-match` without User-Agent validation, payload pre-checks, or optional Turnstile verification.
5. **No Emergency AI Kill Switch**:
   - No environment toggle existed to disable expensive AI endpoints while keeping the `3,418` static SEO pages online.

## 2. Endpoint Classification

| Route | Classification | Protection Applied |
|---|---|---|
| `GET /`, `/tools/**`, `/courses/**`, `/offers/**`, `/dev-tools/**`, `/edittools/**`, `/sitemap.xml`, `/robots.txt`, `/llms*.txt` | Public Read-Only / Static SEO | Untouched (Googlebot & Bingbot preserved) |
| `POST /api/chat` | Public Expensive (AI Streaming) | Bot guard, dual IP+device quotas (min/hr/day/mo), concurrency lease, global AI budget, fail-closed Redis |
| `POST /api/chat/cv` | Public Expensive (File/PDF Processing) | Bot guard, 3/UTC-month atomic reserve/commit/refund quota, abuse throttle, concurrency lease, fail-closed Redis |
| `GET /api/chat/cv` | Public Read-Only (Quota Status) | Read-only UTC month remaining count + reset timestamp |
| `POST /api/goal-match` | Public Expensive (AI Ranking) | Bot guard, dual IP+device quotas (min/day/mo), concurrency lease, global AI budget, 5m Redis query cache |
| `POST /api/auth/admin-login` | Administrative / Auth | Constant-time SHA-256 `timingSafeEqual` + atomic Lua IP rate limit |
| `GET /api/admin/ping`, `/api/admin/signups`, `POST /api/admin/push-broadcast` | Administrative | HttpOnly HS256 JWT (`getAdminFromRequest`), client ping gated & session-cached |
| `POST /api/newsletter`, `POST/DELETE /api/push/subscribe`, `POST /api/analytics/signup` | Public Write (Low CPU) | Atomic Lua per-IP rate limiting + payload validation |
