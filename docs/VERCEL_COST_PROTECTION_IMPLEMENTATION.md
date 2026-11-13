# AIhubtools Cost Protection Implementation Architecture

## 1. Visitor Identity Strategy (`lib/server/visitor.ts`)

- **Dual-Key Enforcement**: Every expensive AI request resolves both:
  - `ipHash`: HMAC-SHA256 of server-observed client IP (`x-vercel-forwarded-for` → `x-forwarded-for` → `x-real-ip`).
  - `deviceHash`: HMAC-SHA256 of the signed `aihunt_vid` first-party cookie (`128-bit` random hex + `24-hex` HMAC signature; `HttpOnly`, `SameSite=Lax`, `Secure` in production, 1-year `Max-Age`).
- **Privacy**: Raw IPs, raw cookie tokens, and CV text are **never** stored in Redis keys.
- **Known Limitations of IP Enforcement**: Shared NATs (universities, mobile carriers, corporate Wi-Fi) share one `ipHash`; VPN/mobile IP rotation changes `ipHash` (mitigated by `deviceHash`, and vice-versa for cookie deletion).

## 2. Atomic Redis Lua Enforcement (`lib/server/quota.ts`, `lib/server/redis.ts`)

- **Multi-Key Check-and-Increment (`LUA_MULTI_CHECK_AND_INCR`)**: Atomically checks all IP, device, and global keys in a single `EVAL` round-trip. If *any* key is at/above its limit, returns `{0, index, ttl}` without incrementing any key. Otherwise increments all keys and sets `EXPIRE` on first creation (`val == 1`).
- **Concurrency Leases (`acquireConcurrencyLease`)**: Acquires `aihunt:conc:<ep>:ip:<hash>`, `aihunt:conc:<ep>:dev:<hash>`, and `aihunt:conc:ai:global` with safety TTLs (`60s–180s`) and releases via clamped `DECR` (`LUA_MULTI_DECR_CLAMP`) on completion, error, stream `cancel()`, or `request.signal` abort.
- **CV Monthly Reserve/Commit/Refund (`reserveCvMonthlyQuota`, `refundCvMonthlyQuota`)**:
  - Keys: `aihunt:cv:m:<YYYY-MM>:ip:<ipHash>` and `aihunt:cv:m:<YYYY-MM>:dev:<deviceHash>` (UTC calendar month, TTL = seconds until next UTC month + 3600s).
  - Reserves before parsing; refunds atomically if missing file, wrong extension, invalid `%PDF-` magic header, `<40` extracted chars, or parse exception.
  - Separate per-minute abuse counter (`aihunt:rl:cvabuse:<YYYY-MM-DDTHH:MM>:*`) prevents malformed-file spam.
- **Fail-Closed Mode (`isFailClosedMode`)**: In production (`NODE_ENV=production` or `VERCEL_ENV=production` or `AIHUB_FAIL_CLOSED=1`), missing or unreachable Upstash Redis returns **HTTP 503** on expensive AI endpoints instead of silently falling back to uncoordinated memory.

## 3. Environment Variables (`lib/server/budget-config.ts`)

| Variable | Default | Purpose |
|---|---:|---|
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | — | Required in production for distributed quotas |
| `VISITOR_HMAC_SECRET` | `AUTH_SECRET` | HMAC key for `ipHash`, `deviceHash`, and `aihunt_vid` |
| `AI_EMERGENCY_DISABLE` | `false` | Set `true` to immediately return `503` on all AI endpoints |
| `AI_GLOBAL_DAILY_REQUEST_LIMIT` | `500` | Global daily cap across AI endpoints |
| `AI_GLOBAL_MONTHLY_REQUEST_LIMIT` | `10000` | Global monthly cap across AI endpoints |
| `AI_GLOBAL_MAX_CONCURRENT` | `10` | Max simultaneous AI executions globally |
| `CV_MONTHLY_LIMIT` | `3` | Successful CV uploads per UTC month per IP & device |
| `CV_ABUSE_PER_MINUTE_LIMIT` | `10` | Per-minute cap including failed/malformed CV uploads |
| `CHAT_PER_MINUTE_LIMIT` / `HOUR` / `DAY` / `MONTH` | `5` / `20` / `50` / `300` | Per-visitor Chat limits |
| `CHAT_MAX_CONCURRENT` | `1` | Max concurrent chat streams per visitor |
| `GOAL_PER_MINUTE_LIMIT` / `DAY` / `MONTH` | `5` / `20` / `100` | Per-visitor Goal Match limits |
| `GOAL_MAX_CONCURRENT` | `1` | Max concurrent Goal Match calls per visitor |
| `GOAL_CACHE_TTL_SECONDS` | `300` | Redis cache TTL for non-personalized Goal Match results |
| `AI_BOT_STRICT` / `TURNSTILE_SECRET_KEY` | `true` / — | Automated UA blocking + optional Cloudflare Turnstile |
