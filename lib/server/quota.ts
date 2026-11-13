import 'server-only'
import { randomBytes } from 'node:crypto'
import { isFailClosedMode, isRedisConfigured, redisCommand, redisEval, redisPipeline } from '@/lib/server/redis'
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
  | { ok: true; token: string; release: () => Promise<void>; renew: (ttlSeconds?: number) => Promise<boolean> }
  | { ok: false; unavailable: true; error: string }
  | { ok: false; unavailable: false; retryAfterSeconds: number }

export type CvReserveResult =
  | { ok: true; reservationId: string; remaining: number }
  | { ok: false; unavailable: true; error: string }
  | { ok: false; unavailable: false; retryAfterSeconds: number; failedKey: string }

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
// key -> Map<token, expiresAtMs>
const memLeases = new Map<string, Map<string, number>>()
// reservationId -> { keys: string[], expiresAtMs: number }
const memReservations = new Map<string, { keys: string[]; expiresAtMs: number }>()
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
  memLeases.clear()
  memReservations.clear()
}

// ---- Atomic Lua Scripts -----------------------------------------------------

// KEYS = [k1, k2, ...], ARGV = [limit1, ttl1, limit2, ttl2, ...]
// Returns [1, minRemaining] if all keys are below limit and incremented,
// or [0, failedIndex1Based, retryAfterSeconds] without mutating any key.
export const LUA_MULTI_CHECK_AND_INCR = `
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

// ZSET-based unique-token concurrency leases:
// KEYS = [k1, k2, ...], ARGV = [nowMs, token, limit1, ttlMs1, limit2, ttlMs2, ...]
export const LUA_LEASE_ACQUIRE = `
local nowMs = tonumber(ARGV[1])
local token = ARGV[2]
local n = #KEYS
for i = 1, n do
  redis.call('ZREMRANGEBYSCORE', KEYS[i], '-inf', nowMs)
  local limit = tonumber(ARGV[2 + (i - 1) * 2 + 1])
  local count = redis.call('ZCARD', KEYS[i])
  if count >= limit then
    local earliest = redis.call('ZRANGE', KEYS[i], 0, 0, 'WITHSCORES')
    local retry = 1
    if earliest[2] then
      retry = math.max(1, math.ceil((tonumber(earliest[2]) - nowMs) / 1000))
    end
    return {0, i, retry}
  end
end
for i = 1, n do
  local ttlMs = tonumber(ARGV[2 + (i - 1) * 2 + 2])
  redis.call('ZADD', KEYS[i], nowMs + ttlMs, token)
  redis.call('PEXPIRE', KEYS[i], ttlMs + 5000)
end
return {1}
`

// KEYS = [k1, k2, ...], ARGV = [nowMs, token, ttlMs1, ttlMs2, ...]
export const LUA_LEASE_RENEW = `
local nowMs = tonumber(ARGV[1])
local token = ARGV[2]
local n = #KEYS
local renewed = 0
for i = 1, n do
  redis.call('ZREMRANGEBYSCORE', KEYS[i], '-inf', nowMs)
  if redis.call('ZSCORE', KEYS[i], token) then
    local ttlMs = tonumber(ARGV[2 + i])
    redis.call('ZADD', KEYS[i], nowMs + ttlMs, token)
    redis.call('PEXPIRE', KEYS[i], ttlMs + 5000)
    renewed = renewed + 1
  end
end
return renewed
`

// KEYS = [k1, k2, ...], ARGV = [token]
export const LUA_LEASE_RELEASE = `
local token = ARGV[1]
for i = 1, #KEYS do
  redis.call('ZREM', KEYS[i], token)
end
return 1
`

// KEYS = [ipKey, devKey, reservationKey], ARGV = [ipLimit, ipTtl, devLimit, devTtl, resTtl, resValue]
export const LUA_CV_RESERVE = `
local ipLimit = tonumber(ARGV[1])
local ipTtl = tonumber(ARGV[2])
local devLimit = tonumber(ARGV[3])
local devTtl = tonumber(ARGV[4])
local resTtl = tonumber(ARGV[5])
local resValue = ARGV[6]

local ipCur = tonumber(redis.call('GET', KEYS[1]) or '0')
if ipCur >= ipLimit then
  local ttl = redis.call('TTL', KEYS[1])
  if ttl < 1 then ttl = ipTtl end
  return {0, 1, ttl}
end

local devCur = tonumber(redis.call('GET', KEYS[2]) or '0')
if devCur >= devLimit then
  local ttl = redis.call('TTL', KEYS[2])
  if ttl < 1 then ttl = devTtl end
  return {0, 2, ttl}
end

local nextIp = redis.call('INCR', KEYS[1])
if nextIp == 1 then redis.call('EXPIRE', KEYS[1], ipTtl) end

local nextDev = redis.call('INCR', KEYS[2])
if nextDev == 1 then redis.call('EXPIRE', KEYS[2], devTtl) end

redis.call('SET', KEYS[3], resValue, 'EX', resTtl)

local remIp = math.max(0, ipLimit - nextIp)
local remDev = math.max(0, devLimit - nextDev)
return {1, math.min(remIp, remDev)}
`

// KEYS = [reservationKey, ipKey, devKey]
// Atomically deletes reservationKey; only decrements ipKey/devKey if reservation existed.
export const LUA_CV_REFUND = `
local existed = redis.call('DEL', KEYS[1])
if existed == 0 then
  return 0
end
for i = 2, #KEYS do
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

function memLeaseAcquire(specs: QuotaWindowSpec[], token: string, nowMs: number): { ok: true } | { ok: false; retryAfterSeconds: number } {
  for (const s of specs) {
    let bucket = memLeases.get(s.key)
    if (bucket) {
      for (const [tok, exp] of bucket) {
        if (exp <= nowMs) bucket.delete(tok)
      }
      if (bucket.size >= s.limit) {
        let earliest = Infinity
        for (const exp of bucket.values()) {
          if (exp < earliest) earliest = exp
        }
        const retry = Number.isFinite(earliest) ? Math.max(1, Math.ceil((earliest - nowMs) / 1000)) : s.ttlSeconds
        return { ok: false, retryAfterSeconds: retry }
      }
    }
  }
  for (const s of specs) {
    let bucket = memLeases.get(s.key)
    if (!bucket) {
      bucket = new Map()
      memLeases.set(s.key, bucket)
    }
    bucket.set(token, nowMs + s.ttlSeconds * 1000)
  }
  return { ok: true }
}

function memLeaseRenew(specs: QuotaWindowSpec[], token: string, nowMs: number, overrideTtlSeconds?: number): boolean {
  let renewed = 0
  for (const s of specs) {
    const bucket = memLeases.get(s.key)
    if (!bucket) continue
    for (const [tok, exp] of bucket) {
      if (exp <= nowMs) bucket.delete(tok)
    }
    if (bucket.has(token)) {
      const ttlMs = (overrideTtlSeconds ?? s.ttlSeconds) * 1000
      bucket.set(token, nowMs + ttlMs)
      renewed += 1
    }
  }
  return renewed === specs.length
}

function memLeaseRelease(keys: string[], token: string): void {
  for (const key of keys) {
    memLeases.get(key)?.delete(token)
  }
}

export async function acquireConcurrencyLease(specs: QuotaWindowSpec[]): Promise<LeaseAcquireResult> {
  if (specs.length === 0) {
    return { ok: true, token: 'noop', release: async () => {}, renew: async () => true }
  }

  const token = randomBytes(12).toString('hex')
  const keys = specs.map((s) => s.key)

  if (isRedisConfigured()) {
    const nowMs = Date.now()
    const args: Array<string | number> = [nowMs, token]
    for (const s of specs) {
      args.push(s.limit, Math.max(1, s.ttlSeconds) * 1000)
    }
    const res = await redisEval<[number, number?, number?]>(LUA_LEASE_ACQUIRE, keys, args)
    if (Array.isArray(res) && res[0] === 1) {
      let released = false
      return {
        ok: true,
        token,
        release: async () => {
          if (released) return
          released = true
          await redisEval(LUA_LEASE_RELEASE, keys, [token])
        },
        renew: async (overrideTtlSeconds?: number) => {
          if (released) return false
          const renewArgs: Array<string | number> = [Date.now(), token]
          for (const s of specs) {
            renewArgs.push(Math.max(1, overrideTtlSeconds ?? s.ttlSeconds) * 1000)
          }
          const renewed = await redisEval<number>(LUA_LEASE_RENEW, keys, renewArgs)
          return Number(renewed) === keys.length
        },
      }
    }
    if (Array.isArray(res) && res[0] === 0) {
      const idx = Math.max(0, Number(res[1] ?? 1) - 1)
      const ttl = Math.max(1, Number(res[2] ?? specs[idx]?.ttlSeconds ?? 15))
      return { ok: false, unavailable: false, retryAfterSeconds: ttl }
    }
    if (isFailClosedMode()) {
      return {
        ok: false,
        unavailable: true,
        error: 'Concurrency protection service is temporarily unavailable. Please try again shortly.',
      }
    }
  } else if (isFailClosedMode()) {
    return {
      ok: false,
      unavailable: true,
      error: 'Concurrency protection service is not configured. Please try again later.',
    }
  }

  const memRes = memLeaseAcquire(specs, token, Date.now())
  if (!memRes.ok) {
    return { ok: false, unavailable: false, retryAfterSeconds: memRes.retryAfterSeconds }
  }
  let released = false
  return {
    ok: true,
    token,
    release: async () => {
      if (released) return
      released = true
      memLeaseRelease(keys, token)
    },
    renew: async (overrideTtlSeconds?: number) => {
      if (released) return false
      return memLeaseRenew(specs, token, Date.now(), overrideTtlSeconds)
    },
  }
}

// ---- CV Monthly Quota (3 / device / UTC Month, 12 / IP / UTC Month) --------

const CV_RESERVATION_TTL_SECONDS = 300

export function cvQuotaKeys(identity: VisitorIdentity, now = new Date()): [string, string] {
  const month = utcMonthKey(now)
  return [
    `aihunt:cv:m:${month}:ip:${identity.ipHash}`,
    `aihunt:cv:m:${month}:dev:${identity.deviceHash}`,
  ]
}

function cvReservationKey(reservationId: string): string {
  return `aihunt:cv:res:${reservationId}`
}

function computeEffectiveCvStatus(ipUsed: number, devUsed: number, cvMonthlyLimit: number, cvIpMonthlyLimit: number, resetAt: string): CvQuotaStatus {
  const devRemaining = Math.max(0, cvMonthlyLimit - devUsed)
  const ipRemaining = Math.max(0, cvIpMonthlyLimit - ipUsed)
  const remaining = Math.min(devRemaining, ipRemaining)
  const used = Math.max(0, cvMonthlyLimit - remaining)
  return {
    limit: cvMonthlyLimit,
    used,
    remaining,
    resetAt,
  }
}

export async function getCvMonthlyQuotaStatus(
  identity: VisitorIdentity,
  now = new Date()
): Promise<{ ok: true; status: CvQuotaStatus } | { ok: false; error: string }> {
  const { cvMonthlyLimit, cvIpMonthlyLimit } = getBudgetConfig()
  const keys = cvQuotaKeys(identity, now)
  const resetAt = nextUtcMonthResetIso(now)

  if (isRedisConfigured()) {
    const res = await redisPipeline(keys.map((k) => ['get', k]))
    if (res.length === keys.length && res.every((r) => !r.error)) {
      const ipUsed = Math.max(0, Number(res[0]?.result ?? 0) || 0)
      const devUsed = Math.max(0, Number(res[1]?.result ?? 0) || 0)
      return {
        ok: true,
        status: computeEffectiveCvStatus(ipUsed, devUsed, cvMonthlyLimit, cvIpMonthlyLimit, resetAt),
      }
    }
    if (isFailClosedMode()) {
      return { ok: false, error: 'CV quota service is temporarily unavailable.' }
    }
  } else if (isFailClosedMode()) {
    return { ok: false, error: 'CV quota service is not configured.' }
  }

  const nowMs = now.getTime()
  const ipUsed = memGet(keys[0], nowMs)
  const devUsed = memGet(keys[1], nowMs)
  return {
    ok: true,
    status: computeEffectiveCvStatus(ipUsed, devUsed, cvMonthlyLimit, cvIpMonthlyLimit, resetAt),
  }
}

export async function reserveCvMonthlyQuota(
  identity: VisitorIdentity,
  now = new Date()
): Promise<CvReserveResult> {
  const { cvMonthlyLimit, cvIpMonthlyLimit } = getBudgetConfig()
  const ttl = secondsUntilNextUtcMonth(now) + 3600
  const [ipKey, devKey] = cvQuotaKeys(identity, now)
  const reservationId = randomBytes(12).toString('hex')
  const resKey = cvReservationKey(reservationId)

  if (isRedisConfigured()) {
    const res = await redisEval<[number, number, number?]>(
      LUA_CV_RESERVE,
      [ipKey, devKey, resKey],
      [cvIpMonthlyLimit, ttl, cvMonthlyLimit, ttl, CV_RESERVATION_TTL_SECONDS, `${ipKey}|${devKey}`]
    )
    if (Array.isArray(res) && res[0] === 1) {
      return { ok: true, reservationId, remaining: Number(res[1] ?? 0) }
    }
    if (Array.isArray(res) && res[0] === 0) {
      const idx = Number(res[1] ?? 2)
      const failedKey = idx === 1 ? ipKey : devKey
      const retryAfterSeconds = Math.max(1, Number(res[2] ?? ttl))
      return { ok: false, unavailable: false, retryAfterSeconds, failedKey }
    }
    if (isFailClosedMode()) {
      return {
        ok: false,
        unavailable: true,
        error: 'CV quota protection service is temporarily unavailable. Please try again shortly.',
      }
    }
  } else if (isFailClosedMode()) {
    return {
      ok: false,
      unavailable: true,
      error: 'CV quota protection service is not configured. Please try again later.',
    }
  }

  const check = memCheckAndIncr([
    { key: ipKey, limit: cvIpMonthlyLimit, ttlSeconds: ttl },
    { key: devKey, limit: cvMonthlyLimit, ttlSeconds: ttl },
  ])
  if (!check.ok) return check

  memReservations.set(reservationId, {
    keys: [ipKey, devKey],
    expiresAtMs: Date.now() + CV_RESERVATION_TTL_SECONDS * 1000,
  })
  return { ok: true, reservationId, remaining: check.remaining ?? 0 }
}

export async function commitCvMonthlyQuota(reservationId: string): Promise<void> {
  if (!reservationId) return
  if (isRedisConfigured()) {
    await redisCommand(['del', cvReservationKey(reservationId)])
    return
  }
  memReservations.delete(reservationId)
}

export async function refundCvMonthlyQuota(
  identity: VisitorIdentity,
  reservationId: string,
  now = new Date()
): Promise<boolean> {
  if (!reservationId) return false
  const [fallbackIpKey, fallbackDevKey] = cvQuotaKeys(identity, now)
  const resKey = cvReservationKey(reservationId)

  if (isRedisConfigured()) {
    const stored = await redisCommand<string | null>(['get', resKey])
    const parts = typeof stored === 'string' && stored.includes('|') ? stored.split('|', 2) : null
    const ipKeyToRefund = parts?.[0] || fallbackIpKey
    const devKeyToRefund = parts?.[1] || fallbackDevKey
    const res = await redisEval<number>(LUA_CV_REFUND, [resKey, ipKeyToRefund, devKeyToRefund], [])
    return Number(res) === 1
  }

  if (isFailClosedMode()) return false

  const entry = memReservations.get(reservationId)
  if (!entry || entry.expiresAtMs <= Date.now()) {
    memReservations.delete(reservationId)
    return false
  }
  memReservations.delete(reservationId)
  memDecrClamp(entry.keys)
  return true
}

// ---- Global + Endpoint AI Budget Guard --------------------------------------

export type AiBudgetAcquireResult =
  | { ok: true; release: () => Promise<void>; renew: (ttlSeconds?: number) => Promise<boolean> }
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

  return { ok: true, release: lease.release, renew: lease.renew }
}
