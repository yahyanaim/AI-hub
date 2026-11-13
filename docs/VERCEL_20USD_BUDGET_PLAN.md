# AIhubtools Vercel Pro ($20/mo) Budget & FinOps Plan

## 1. Historical Usage vs. Post-Optimization Estimates

*(Production Vercel billing settings and live post-deploy metrics are **Not Verified** in this workspace because deployment has not been triggered yet.)*

| Resource | Historical 30d (Hobby) | Primary Cause | Post-Optimization Controls |
|---|---:|---|---|
| **Fluid Active CPU** | `5h 43m` (exceeded 4h Hobby cap) | Unconditional 3-way `/api/chat` racing, `3.04 MB` seed barrel imports, `/api/admin/ping` on all page loads | Primary-first + `12s` hedge, direct `@/lib/seed/*` imports, global daily cap (`500/day`), per-visitor quotas |
| **Function Invocations** | `622,000` | Uncached `/api/admin/ping`, broad middleware matcher, unthrottled AI calls | Gated + cached admin ping, asset-excluding middleware, bot guard + rate limits |
| **Build CPU** | `31h 22m` | Frequent deploys (e.g., 20 builds in 6h × `3,418` static pages) | Batch commits; avoid rapid back-to-back pushes to `main` |

## 2. Conservative Traffic Scenarios (Estimates, Not Guarantees)

- **Baseline Protected Traffic (~200 chat + 50 CV + 100 goal-match/day)**: Within `AI_GLOBAL_DAILY_REQUEST_LIMIT=500`, estimated Fluid Active CPU stays well under Vercel Pro's included monthly compute credit, assuming primary model responds within 12s on most turns.
- **Abuse / Spike Scenario**: Even under sustained bot/scraper flooding, `checkExpensiveAiBotGuard` (`403`), per-visitor limits, concurrency leases (`10` global), and `AI_GLOBAL_DAILY_REQUEST_LIMIT=500` cap total AI executions before runaway CPU charges occur.
- **Important Limitation — Request Limits Do Not Equal Vercel Spending Limits**:
  - Application-level request caps (`500/day`, `10,000/month`) bound *successful AI invocations*, **not** total Vercel dollar spend.
  - Unprotected dimensions that still incur Vercel usage include: Fast Data Transfer / Edge bandwidth, bot traffic hitting non-AI SSR/ISR routes or rejected at function entry (`403`/`429`/`503` still consumes minimal function invocation & edge CPU unless blocked at Vercel Firewall/WAF), Build CPU minutes across `3,418` static pages, and Fluid Provisioned Memory during slow upstream timeouts.
  - Therefore, **Vercel Spend Management + Vercel Firewall/WAF + Upstash monitoring** are mandatory companions to application quotas.

## 3. Vercel Dashboard Billing & Infrastructure Monitoring Checklist

*(All items below must be configured in the Vercel Dashboard by the account owner — **Not Verified** from local CLI.)*

1. Upgrade team `yahyanaims-projects` to **Vercel Pro** ($20/month base subscription) and review included monthly usage credits (CPU, memory, invocations, bandwidth).
2. Enable **Spend Management** under **Team Settings → Billing → Spend Management** and configure a **Hard Spending Limit** (e.g., $20–$30 total / $0–$10 overage cap) with automatic pause/notifications.
3. Set **Billing Alerts** at 50%, 75%, and 90% of included Fluid Active CPU, Function Invocations, Build Minutes, and Fast Data Transfer.
4. Configure **Vercel Firewall / WAF** rules in **Project → Security → Firewall** (rate-limit `/api/*`, challenge suspicious ASNs/countries if needed) so abusive traffic is dropped at the edge before invoking Serverless Functions.
5. Verify `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, and `AUTH_SECRET` (or `VISITOR_HMAC_SECRET`, **>=32 chars**) are set in Vercel Production Environment Variables before deploying, because `/api/chat`, `/api/chat/cv`, and `/api/goal-match` **fail closed (HTTP 503)** in production if Redis or the HMAC secret is missing or weak (`AIHUB_ALLOW_MEMORY_FALLBACK=1` is ignored in production).
6. Monitor **Vercel Usage / Observability** weekly for: Fluid Active CPU, P95 duration on `/api/chat`, `503` error rate (which would indicate Redis or secret misconfiguration), and Upstash Redis command volume.

## 4. Emergency Shutdown Procedure

To immediately halt all expensive AI compute without taking down the catalog or SEO pages:
1. In Vercel Dashboard → `ai-hub` → **Settings → Environment Variables**, set `AI_EMERGENCY_DISABLE=true`.
2. Redeploy (or trigger a fast redeploy). All `/api/chat`, `/api/chat/cv`, and `/api/goal-match` requests immediately return `503` while the `3,418` static SEO pages remain 100% online.
