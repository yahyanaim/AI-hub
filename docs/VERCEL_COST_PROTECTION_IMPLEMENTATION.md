# AIhubtools Cost Protection Implementation Architecture

## 1. Visitor Identity Strategy (`lib/server/visitor.ts`)

- **Dual-Key Enforcement**: Every expensive AI request resolves both:
  - `ipHash`: HMAC-SHA256 of server-observed client IP (`x-vercel-forwarded-for` → `x-forwarded-for` → `x-real-ip`).
  - `deviceHash`: HMAC-SHA256 of the signed `aihunt_vid` first-party cookie (`128-bit` random hex + `24-hex` HMAC signature; `HttpOnly`, `SameSite=Lax`, `Secure` in production, 1-year `Max-Age`).
- **Privacy**: Raw IPs, raw cookie tokens, and CV text are **never** stored in Redis keys.
- **Known Limitations of IP Enforcement & Shared-IP Fairness Policy**:
  - Shared NATs (universities, mobile carriers, corporate Wi-Fi, households) share one `ipHash`; VPN/mobile IP rotation changes `ipHash`.
  - To avoid locking out unrelated users behind a shared NAT after one person uploads 3 CVs, CV uploads enforce **`CV_MONTHLY_LIMIT=3` per device (`dev`)** and **`CV_IP_MONTHLY_LIMIT=12` per IP (`ip`)** (configurable). Trade-off: up to 4 distinct devices (or cookie resets) can share one IP per month, while single-IP cookie-deletion abuse remains strictly bounded at `12/month` plus `CV_ABUSE_PER_MINUTE_LIMIT=10`.
- **Mandatory Production Secret (`VisitorSecretError`)**: In fail-closed/production mode, `VISITOR_HMAC_SECRET` or `AUTH_SECRET` must be at least **32 characters**. Missing or weak secrets throw `VisitorSecretError` and return **HTTP 503** instead of falling back to an ephemeral per-instance secret.

## 2. Atomic Redis Lua Enforcement (`lib/server/quota.ts`, `lib/server/redis.ts`)

- **Multi-Key Check-and-Increment (`LUA_MULTI_CHECK_AND_INCR`)**: Atomically checks all IP, device, and global keys in a single `EVAL` round-trip. If *any* key is at/above its limit, returns `{0, index, ttl}` without incrementing any key. Otherwise increments all keys and sets `EXPIRE` on first creation (`val == 1`).
- **Token-Based Concurrency Leases (`acquireConcurrencyLease`)**:
  - Uses Redis **ZSETs** (`LUA_LEASE_ACQUIRE`, `LUA_LEASE_RENEW`, `LUA_LEASE_RELEASE`) where each lease holds a unique random 96-bit `token` and `expiresAtMs` score.
  - `ZREMRANGEBYSCORE` prunes expired tokens before `ZCARD`; `release()` executes `ZREM key token` (atomic compare-and-release) so an expired or delayed request can **never** release a newer request's active lease.
  - `/api/chat` renews its `180s` lease every `60s` during long-running SSE streams and clears timers on `finish()` and `cancel()`.
- **Crash-Safe CV Reserve / Commit / Refund / Lazy Recovery (`reserveCvMonthlyQuota`, `commitCvMonthlyQuota`, `refundCvMonthlyQuota`, `recoverExpiredCvReservations`)**:
  - Keys: `aihunt:cv:m:<YYYY-MM>:ip:<ipHash>`, `aihunt:cv:m:<YYYY-MM>:dev:<deviceHash>`, `aihunt:cv:res:<reservationId>` (TTL = UTC month end + 3600s, storing `${ownerDeviceHash}|${ipKey}|${devKey}`), and `aihunt:cv:pending` ZSET (score = `staleAtMs = nowMs + 300_000`).
  - `LUA_CV_RESERVE` atomically runs bounded lazy recovery (`LIMIT 0 10`) on stale pending reservations before checking limits, increments counters, persists `aihunt:cv:res:<reservationId>` for the full month TTL, and registers it in `aihunt:cv:pending`.
  - On success, `LUA_CV_COMMIT` verifies owner match and atomically deletes both `aihunt:cv:res:<reservationId>` and the `aihunt:cv:pending` entry.
  - On failure, `LUA_CV_REFUND` verifies owner match, atomically deletes both keys, and clamp-decrements the exact `ipKey`/`devKey` stored in the reservation metadata (safe across UTC month boundaries and immune to double-refund or post-commit refund).
  - If a Function crashes before commit or refund, `LUA_CV_RECOVER_EXPIRED` (invoked lazily by `getCvMonthlyQuotaStatus` and `reserveCvMonthlyQuota`) atomically claims and refunds abandoned reservations after 300s.
  - Separate per-minute abuse counter (`aihunt:rl:cvabuse:<YYYY-MM-DDTHH:MM>:*`) prevents malformed-file spam.
- **Fail-Closed Mode (`isFailClosedMode`)**: In production (`NODE_ENV=production` or `VERCEL_ENV=production` or `AIHUB_FAIL_CLOSED=1`), missing or unreachable Upstash Redis returns **HTTP 503** on expensive AI endpoints. `AIHUB_ALLOW_MEMORY_FALLBACK=1` is **strictly ignored in production**.

## 3. Bot Mitigation & Turnstile Integration (`lib/server/bot-guard.ts`, `lib/client/turnstile.ts`)

- **Header & Origin Hardening**: Rejects `sec-fetch-site: cross-site`, `origin`/`host` mismatches, and automated CLI/scraper User-Agents on expensive AI `POST` endpoints (`403`) without affecting public `GET` catalog/SEO routes or Googlebot/Bingbot.
- **Accessible Client-Compatible Turnstile**: Server verification activates only when **both** `TURNSTILE_SECRET_KEY` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` are configured (unless `TURNSTILE_ENFORCE_WITHOUT_SITE_KEY=1` is explicitly set). `lib/client/turnstile.ts` serializes widget execution via an internal queue, uses `appearance: 'interaction-only'` inside an accessible `role="dialog"` overlay (never `display:none`), cleans up on abort/unmount/cancel, handles token expiry (`reset`) and slow/blocked scripts (`4.5s` load timeout), and binds `action` (`chat`, `cv`, `goal_match`).
- **Action, Hostname & Replay Verification**: Server-side `siteverify` validates `action`, `hostname`, and single-use token replay (`aihunt:ts:used:<sha256>`, `SET NX EX 300`). Supports `TURNSTILE_MODE=always` (default) or `TURNSTILE_MODE=risk`.
- **Vercel Firewall / WAF**: Recommended at the edge (Vercel Dashboard → Security → Firewall) to rate-limit `/api/*` before requests invoke Next.js functions.

## 3. Environment Variables (`lib/server/budget-config.ts`)

| Variable | Default | Purpose |
|---|---:|---|
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | — | Required in production for distributed quotas |
| `VISITOR_HMAC_SECRET` | `AUTH_SECRET` | HMAC key for `ipHash`, `deviceHash`, and `aihunt_vid` |
| `AI_EMERGENCY_DISABLE` | `false` | Set `true` to immediately return `503` on all AI endpoints |
| `AI_GLOBAL_DAILY_REQUEST_LIMIT` | `500` | Global daily cap across AI endpoints |
| `AI_GLOBAL_MONTHLY_REQUEST_LIMIT` | `10000` | Global monthly cap across AI endpoints |
| `AI_GLOBAL_MAX_CONCURRENT` | `10` | Max simultaneous AI executions globally |
| `CV_MONTHLY_LIMIT` | `3` | Successful CV uploads per UTC month per device (`dev`) |
| `CV_IP_MONTHLY_LIMIT` | `12` | Shared-IP ceiling for CV uploads per UTC month per IP (`ip`) |
| `CV_ABUSE_PER_MINUTE_LIMIT` | `10` | Per-minute cap including failed/malformed CV uploads |
| `CHAT_PER_MINUTE_LIMIT` / `HOUR` / `DAY` / `MONTH` | `5` / `20` / `50` / `300` | Per-visitor Chat limits |
| `CHAT_MAX_CONCURRENT` | `1` | Max concurrent chat streams per visitor |
| `GOAL_PER_MINUTE_LIMIT` / `DAY` / `MONTH` | `5` / `20` / `100` | Per-visitor Goal Match limits |
| `GOAL_MAX_CONCURRENT` | `1` | Max concurrent Goal Match calls per visitor |
| `GOAL_CACHE_TTL_SECONDS` | `300` | Redis cache TTL for non-personalized Goal Match results |
| `AI_BOT_STRICT` / `TURNSTILE_SECRET_KEY` / `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_MODE` | `true` / — / — / `always` | Automated UA/origin blocking + optional Cloudflare Turnstile (`always` or `risk`) |
