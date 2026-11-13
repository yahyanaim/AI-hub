import 'server-only'
import { isFailClosedMode, isRedisConfigured, redisEval, redisPipeline } from '@/lib/server/redis'
import { getBudgetConfig, isAiEmergencyDisabled } from '@/lib/server/budget-config'
import type { VisitorIdentity } from '@/lib/server/visitor'

export type QuotaWindowSpec = {
  key: string
  limit: number
  ttlSeconds: number
}

export type QuotaCheckResult =
  | { ok: true; remaining?: number }
  | { ok: false; unavailable: true; error: string }
  | { ok: false; unavailable: false; retryAfterSeconds: number; failedKey: string }

export type LeaseAcquireResult =
  | { ok: true; release: () => Promise<void> }
  | { ok: false; unavailable: true; error: string }
  | { ok: false; unavailable: false; retryAfterSeconds: number }

export type CvQuotaStatus = {
  limit: number
  used: number
  remaining: number
  resetAt: string
}

// ---- UTC Calendar Helpers ---------------------------------------------------

export function utcMonthKey(now = new Date()): string {
  const y = now.getUTCFullYear()
  const m = String(now.getUTCMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

export function utcDayKey(now = new Date()): string {
  return now.toISOString().slice(0, 10)
}

export function utcHourKey(now = new Date()): string {
  return now.toISOString().slice(0, 13)
}

export function utcMinuteKey(now = new Date()): string {
  return now.toISOString().slice(0, 16)
}

export function nextUtcMonthDate(now = new Date()): Date {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0, 0))
}

export function nextUtcMonthResetIso(now = new Date()): string {
  return nextUtcMonthDate(now).toISOString()
}

export function secondsUntilNextUtcMonth(now = new Date()): number {
  const diff = Math.ceil((nextUtcMonthDate(now).getTime() - now.getTime()) / 1000)
  return Math.max(60, diff)
}

export function secondsUntilNextUtcDay(now = new Date()): number {
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0, 0))
  return Math.max(60, Math.ceil((next.getTime() - now.getTime()) / 1000))
}

// ---- In-memory fallback (ONLY for local dev/test when fail-closed is off) ---

type MemEntry = { count: number; expiresAt: number }
const memStore = new Map<string, MemEntry>()
const MAX_MEM_KEYS = 10_000

function memGet(key: string, nowMs: number): number {
  const entry = memStore.get(key)
  if (!entry) return 0
  if (entry.expiresAt <= nowMs) {
    memStore.delete(key)
    return 0
  }
  return entry.count
}

function memCheckAndIncr(specs: QuotaWindowSpec[]): QuotaCheckResult {
  const nowMs = Date.now()
  for (const s of specs) {
    const cur = memGet(s.key, nowMs)
    if (cur >= s.limit) {
      const entry = memStore.get(s.key)
      const ttl = entry ? Math.max(1, Math.ceil((entry.expiresAt - nowMs) / 1000)) : s.ttlSeconds
      return { ok: false, unavailable: false, retryAfterSeconds: ttl, failedKey: s.key }
    }
  }
  let minRemaining = Infinity
  for (const s of specs) {
    const existing = memStore.get(s.key)
    if (!existing || existing.expiresAt <= nowMs) {
      memStore.set(s.key, { count: 1, expiresAt: nowMs + s.ttlSeconds * 1000 })
      minRemaining = Math.min(minRemaining, Math.max(0, s.limit - 1))
    } else {
      existing.count += 1
      minRemaining = Math.min(minRemaining, Math.max(0, s.limit - existing.count))
    }
  }
  if (memStore.size > MAX_MEM_KEYS) {
    for (const [k, v] of memStore) {
      if (v.expiresAt <= nowMs) memStore.delete(k)
    }
  }
  return { ok: true, remaining: Number.isFinite(minRemaining) ? minRemaining : 0 }
}

function memDecrClamp(keys: string[]): void {
  const nowMs = Date.now()
  for (const key of keys) {
    const entry = memStore.get(key)
    if (!entry || entry.expiresAt <= nowMs) {
      memStore.delete(key)
      continue
    }
    entry.count = Math.max(0, entry.count - 1)
  }
}

export function __resetLocalQuotaStoreForTests(): void {
  memStore.clear()
}

// ---- Atomic Lua Scripts -----------------------------------------------------

// KEYS = [k1, k2, ...], ARGV = [limit1, ttl1, limit2, ttl2, ...]
// Returns [1, minRemaining] if all keys are below limit and incremented,
// or [0, failedIndex1Based, retryAfterSeconds] without mutating any key.
const LUA_MULTI_CHECK_AND_INCR = `
local n = #KEYS
for i = 1, n do
  local limit = tonumber(ARGV[(i - 1) * 2 + 1])
  local cur = tonumber(redis.call('GET', KEYS[i]) or '0')
  if cur >= limit then
    local ttl = redis.call('TTL', KEYS[i])
    if ttl < 1 then ttl = tonumber(ARGV[(i - 1) * 2 + 2]) end
    return {0, i, ttl}
  end
end
local minRem = 999999999
for i = 1, n do
  local limit = tonumber(ARGV[(i - 1) * 2 + 1])
  local ttl = tonumber(ARGV[(i - 1) * 2 + 2])
  local nextVal = redis.call('INCR', KEYS[i])
  if nextVal == 1 then
    redis.call('EXPIRE', KEYS[i], ttl)
  end
  local rem = limit - nextVal
  if rem < 0 then rem = 0 end
  if rem < minRem then minRem = rem end
end
return {1, minRem}
`

const LUA_MULTI_DECR_CLAMP = `
for i = 1, #KEYS do
  local cur = tonumber(redis.call('GET', KEYS[i]) or '0')
  if cur > 0 then
    redis.call('DECR', KEYS[i])
  end
end
return 1
`

export async function atomicCheckAndIncr(specs: QuotaWindowSpec[]): Promise<QuotaCheckResult> {
  if (specs.length === 0) return { ok: true }

  if (isRedisConfigured()) {
    const keys = specs.map((s) => s.key)
    const args: number[] = []
    for (const s of specs) {
      args.push(s.limit, s.ttlSeconds)
    }
    const res = await redisEval<[number, number, number?]>(LUA_MULTI_CHECK_AND_INCR, keys, args)
    if (Array.isArray(res) && (res[0] === 1 || res[0] === 0)) {
      if (res[0] === 1) {
        return { ok: true, remaining: Number(res[1] ?? 0) }
      }
      const idx = Math.max(0, Number(res[1] ?? 1) - 1)
      const ttl = Math.max(1, Number(res[2] ?? specs[idx]?.ttlSeconds ?? 60))
      return {
        ok: false,
        unavailable: false,
        retryAfterSeconds: ttl,
        failedKey: specs[idx]?.key ?? 'unknown',
      }
    }
    if (isFailClosedMode()) {
      return {
        ok: false,
        unavailable: true,
        error: 'Quota protection service is temporarily unavailable. Please try again shortly.',
      }
    }
  } else if (isFailClosedMode()) {
    return {
      ok: false,
      unavailable: true,
      error: 'Quota protection service is not configured. Please try again later.',
    }
  }

  return memCheckAndIncr(specs)
}

export async function atomicDecrementClamp(keys: string[]): Promise<void> {
  if (keys.length === 0) return
  if (isRedisConfigured()) {
    await redisEval(LUA_MULTI_DECR_CLAMP, keys, [])
    return
  }
  if (!isFailClosedMode()) {
    memDecrClamp(keys)
  }
}

export async function acquireConcurrencyLease(specs: QuotaWindowSpec[]): Promise<LeaseAcquireResult> {
  const res = await atomicCheckAndIncr(specs)
  if (!res.ok) return res

  let released = false
  const keys = specs.map((s) => s.key)
  return {
    ok: true,
    release: async () => {
      if (released) return
      released = true
      await atomicDecrementClamp(keys)
    },
  }
}

// ---- CV Monthly Quota (3 / UTC Month, Reserve / Commit / Refund) ------------

export function cvQuotaKeys(identity: VisitorIdentity, now = new Date()): string[] {
  const month = utcMonthKey(now)
  return [
    `aihunt:cv:m:${month}:ip:${identity.ipHash}`,
    `aihunt:cv:m:${month}:dev:${identity.deviceHash}`,
  ]
}

export async function getCvMonthlyQuotaStatus(
  identity: VisitorIdentity,
  now = new Date()
): Promise<{ ok: true; status: CvQuotaStatus } | { ok: false; error: string }> {
  const { cvMonthlyLimit } = getBudgetConfig()
  const keys = cvQuotaKeys(identity, now)
  const resetAt = nextUtcMonthResetIso(now)

  if (isRedisConfigured()) {
    const res = await redisPipeline(keys.map((k) => ['get', k]))
    if (res.length === keys.length && res.every((r) => !r.error)) {
      const counts = res.map((r) => Math.max(0, Number(r.result ?? 0) || 0))
      const used = Math.max(...counts)
      return {
        ok: true,
        status: {
          limit: cvMonthlyLimit,
          used,
          remaining: Math.max(0, cvMonthlyLimit - used),
          resetAt,
        },
      }
    }
    if (isFailClosedMode()) {
      return { ok: false, error: 'CV quota service is temporarily unavailable.' }
    }
  } else if (isFailClosedMode()) {
    return { ok: false, error: 'CV quota service is not configured.' }
  }

  const nowMs = now.getTime()
  const used = Math.max(...keys.map((k) => memGet(k, nowMs)))
  return {
    ok: true,
    status: {
      limit: cvMonthlyLimit,
      used,
      remaining: Math.max(0, cvMonthlyLimit - used),
      resetAt,
    },
  }
}

export async function reserveCvMonthlyQuota(
  identity: VisitorIdentity,
  now = new Date()
): Promise<QuotaCheckResult> {
  const { cvMonthlyLimit } = getBudgetConfig()
  const ttl = secondsUntilNextUtcMonth(now) + 3600
  const keys = cvQuotaKeys(identity, now)
  return atomicCheckAndIncr(keys.map((key) => ({ key, limit: cvMonthlyLimit, ttlSeconds: ttl })))
}

export async function refundCvMonthlyQuota(
  identity: VisitorIdentity,
  now = new Date()
): Promise<void> {
  await atomicDecrementClamp(cvQuotaKeys(identity, now))
}

// ---- Global + Endpoint AI Budget Guard --------------------------------------

export type AiBudgetAcquireResult =
  | { ok: true; release: () => Promise<void> }
  | { ok: false; status: 429 | 503; error: string; retryAfterSeconds?: number }

export async function acquireAiExecutionBudget(
  endpoint: 'chat' | 'goal' | 'cv',
  identity: VisitorIdentity,
  visitorSpecs: QuotaWindowSpec[],
  visitorMaxConcurrent: number,
  leaseTtlSeconds = 180
): Promise<AiBudgetAcquireResult> {
  if (isAiEmergencyDisabled()) {
    return {
      ok: false,
      status: 503,
      error: 'AI features are temporarily paused for maintenance. The rest of AIhubtools remains available.',
    }
  }

  const cfg = getBudgetConfig()
  const now = new Date()
  const day = utcDayKey(now)
  const month = utcMonthKey(now)
  const dayTtl = secondsUntilNextUtcDay(now) + 300
  const monthTtl = secondsUntilNextUtcMonth(now) + 3600

  // 1. Acquire concurrency leases (visitor IP + visitor device + global)
  const leaseSpecs: QuotaWindowSpec[] = [
    { key: `aihunt:conc:${endpoint}:ip:${identity.ipHash}`, limit: visitorMaxConcurrent, ttlSeconds: leaseTtlSeconds },
    { key: `aihunt:conc:${endpoint}:dev:${identity.deviceHash}`, limit: visitorMaxConcurrent, ttlSeconds: leaseTtlSeconds },
    { key: 'aihunt:conc:ai:global', limit: cfg.globalMaxConcurrent, ttlSeconds: leaseTtlSeconds },
  ]
  const lease = await acquireConcurrencyLease(leaseSpecs)
  if (!lease.ok) {
    if (lease.unavailable) {
      return { ok: false, status: 503, error: lease.error }
    }
    return {
      ok: false,
      status: 429,
      error: 'An AI request is already in progress. Please wait a moment and try again.',
      retryAfterSeconds: Math.min(15, lease.retryAfterSeconds),
    }
  }

  // 2. Check & increment per-visitor + global daily/monthly budgets atomically
  const allQuotaSpecs: QuotaWindowSpec[] = [
    ...visitorSpecs,
    { key: `aihunt:ai:global:d:${day}`, limit: cfg.globalDailyLimit, ttlSeconds: dayTtl },
    { key: `aihunt:ai:global:m:${month}`, limit: cfg.globalMonthlyLimit, ttlSeconds: monthTtl },
    { key: `aihunt:ai:ep:${endpoint}:d:${day}`, limit: cfg.globalDailyLimit, ttlSeconds: dayTtl },
    { key: `aihunt:ai:ep:${endpoint}:m:${month}`, limit: cfg.globalMonthlyLimit, ttlSeconds: monthTtl },
  ]

  const quota = await atomicCheckAndIncr(allQuotaSpecs)
  if (!quota.ok) {
    await lease.release()
    if (quota.unavailable) {
      return { ok: false, status: 503, error: quota.error }
    }
    const isGlobal = quota.failedKey.startsWith('aihunt:ai:global:')
    return {
      ok: false,
      status: isGlobal ? 503 : 429,
      error: isGlobal
        ? 'Daily or monthly AI capacity has been reached. Please try again later.'
        : 'Rate limit or quota exceeded. Please wait before sending another request.',
      retryAfterSeconds: quota.retryAfterSeconds,
    }
  }

  return { ok: true, release: lease.release }
}
