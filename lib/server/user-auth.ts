import 'server-only'
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import {
  indexUserAccount,
  recordAdminMetric,
  USERS_INDEX_KEY,
} from '@/lib/server/admin-metrics'
import { utcMonthKey } from '@/lib/server/quota'
import {
  isFailClosedMode,
  isRedisConfigured,
  redisCommandResult,
  redisPipeline,
  SIGNUP_COUNT_KEY,
} from '@/lib/server/redis'

const USER_KEY_PREFIX = 'aihunt:user:'
const DEVICE_ACCOUNT_PREFIX = 'aihunt:device:acct:'
const ADMIN_RECOVERY_USERNAME = 'yahianaim'
const ADMIN_RECOVERY_DISPLAY_NAME = 'Yahia Naim'
const ADMIN_RECOVERY_USED_KEY = `${USER_KEY_PREFIX}${ADMIN_RECOVERY_USERNAME}:recovery_used`

type StoredUser = {
  username: string
  displayName: string
  salt: string
  passwordHash: string
  createdAt: string
}

const memUsers = new Map<string, StoredUser>()
const memDeviceAccounts = new Map<string, string>()
let memAdminRecoveryUsed = false

export function normalizeUsername(raw: string): string {
  return raw.trim().toLowerCase().replace(/[^a-z0-9_]/g, '')
}

export function validateCredentials(
  rawUsername: string,
  password: string
): { ok: true; username: string; displayName: string } | { ok: false; error: string } {
  const username = normalizeUsername(rawUsername)
  if (username.length < 2 || username.length > 32) {
    return {
      ok: false,
      error: 'Username must be 2–32 characters (letters, numbers, or underscores).',
    }
  }
  if (typeof password !== 'string' || password.length < 6 || password.length > 128) {
    return { ok: false, error: 'Password must be 6–128 characters.' }
  }
  const displayName = rawUsername.trim().slice(0, 40) || username
  return { ok: true, username, displayName }
}

function hashPassword(password: string, salt: string): string {
  return scryptSync(password, salt, 64).toString('hex')
}

function verifyPassword(password: string, salt: string, expectedHex: string): boolean {
  const actual = Buffer.from(hashPassword(password, salt), 'hex')
  const expected = Buffer.from(expectedHex, 'hex')
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}

export type AuthUserResult =
  | { ok: true; user: { username: string; displayName: string } }
  | { ok: false; status: number; error: string; code?: string }

export async function registerUser(
  rawUsername: string,
  password: string,
  deviceHash?: string,
  options?: { bypassDeviceLimit?: boolean }
): Promise<AuthUserResult> {
  const v = validateCredentials(rawUsername, password)
  if (!v.ok) return { ok: false, status: 400, error: v.error }

  const salt = randomBytes(16).toString('hex')
  const record: StoredUser = {
    username: v.username,
    displayName: v.displayName,
    salt,
    passwordHash: hashPassword(password, salt),
    createdAt: new Date().toISOString(),
  }

  if (!isRedisConfigured()) {
    if (isFailClosedMode()) {
      return {
        ok: false,
        status: 503,
        error: 'Authentication service temporarily unavailable.',
      }
    }
    if (deviceHash && !options?.bypassDeviceLimit && memDeviceAccounts.has(deviceHash)) {
      return {
        ok: false,
        status: 409,
        error: 'Only one account can be created per device. Please sign in to your existing account.',
      }
    }
    if (memUsers.has(v.username)) {
      return {
        ok: false,
        status: 409,
        error: 'Username already exists. Please sign in instead.',
      }
    }
    memUsers.set(v.username, record)
    if (deviceHash && !options?.bypassDeviceLimit) memDeviceAccounts.set(deviceHash, v.username)
    void recordAdminMetric('signups')
    return { ok: true, user: { username: record.username, displayName: record.displayName } }
  }

  if (deviceHash && !options?.bypassDeviceLimit) {
    const existingDevice = await redisCommandResult<string>([
      'get',
      `${DEVICE_ACCOUNT_PREFIX}${deviceHash}`,
    ])
    if (!existingDevice.ok) {
      return { ok: false, status: 503, error: 'Authentication service temporarily unavailable.' }
    }
    if (existingDevice.result) {
      return {
        ok: false,
        status: 409,
        error: 'Only one account can be created per device. Please sign in to your existing account.',
      }
    }
  }

  const res = await redisCommandResult<string>([
    'set',
    `${USER_KEY_PREFIX}${v.username}`,
    JSON.stringify(record),
    'NX',
  ])
  if (!res.ok) {
    return { ok: false, status: 503, error: 'Authentication service temporarily unavailable.' }
  }
  if (res.result !== 'OK') {
    return {
      ok: false,
      status: 409,
      error: 'Username already exists. Please sign in instead.',
    }
  }

  if (deviceHash && !options?.bypassDeviceLimit) {
    const claim = await redisCommandResult<string>([
      'set',
      `${DEVICE_ACCOUNT_PREFIX}${deviceHash}`,
      v.username,
      'NX',
    ])
    if (!claim.ok || claim.result !== 'OK') {
      await redisCommandResult(['del', `${USER_KEY_PREFIX}${v.username}`]).catch(() => {})
      if (!claim.ok) {
        return { ok: false, status: 503, error: 'Authentication service temporarily unavailable.' }
      }
      return {
        ok: false,
        status: 409,
        error: 'Only one account can be created per device. Please sign in to your existing account.',
      }
    }
  }

  // Keep the admin signup counter accurate for every real new account
  // regardless of whether signup happened via AuthModal or /chat.
  await redisCommandResult(['incr', SIGNUP_COUNT_KEY]).catch(() => {})
  void recordAdminMetric('signups')
  void indexUserAccount(record.username, Date.parse(record.createdAt) || Date.now())
  return { ok: true, user: { username: record.username, displayName: record.displayName } }
}

export async function authenticateUser(
  rawUsername: string,
  password: string
): Promise<AuthUserResult> {
  const v = validateCredentials(rawUsername, password)
  if (!v.ok) return { ok: false, status: 400, error: v.error }

  let record: StoredUser | null = null
  if (!isRedisConfigured()) {
    if (isFailClosedMode()) {
      return {
        ok: false,
        status: 503,
        error: 'Authentication service temporarily unavailable.',
      }
    }
    record = memUsers.get(v.username) ?? null
  } else {
    const res = await redisCommandResult<string>(['get', `${USER_KEY_PREFIX}${v.username}`])
    if (!res.ok) {
      return { ok: false, status: 503, error: 'Authentication service temporarily unavailable.' }
    }
    if (res.result) {
      try {
        record = JSON.parse(res.result) as StoredUser
      } catch {
        record = null
      }
    }
  }

  if (!record) {
    return {
      ok: false,
      status: 404,
      code: 'account-not-migrated',
      error: 'No password set for this account yet. Switch to "Create account" to set your password.',
    }
  }

  if (!verifyPassword(password, record.salt, record.passwordHash)) {
    void recordAdminMetric('auth_fail')
    return { ok: false, status: 401, error: 'Invalid username or password.' }
  }

  return { ok: true, user: { username: record.username, displayName: record.displayName } }
}

export async function getStoredUserDisplayName(username: string): Promise<string | null> {
  const clean = normalizeUsername(username)
  if (!clean) return null
  if (!isRedisConfigured()) {
    return memUsers.get(clean)?.displayName ?? null
  }
  const res = await redisCommandResult<string>(['get', `${USER_KEY_PREFIX}${clean}`])
  if (!res.ok || !res.result) return null
  try {
    const parsed = JSON.parse(res.result) as Partial<StoredUser>
    return typeof parsed.displayName === 'string' && parsed.displayName.trim()
      ? parsed.displayName.trim()
      : null
  } catch {
    return null
  }
}

export async function isAdminRecoveryUsed(): Promise<boolean> {
  if (!isRedisConfigured()) {
    return memAdminRecoveryUsed
  }
  const res = await redisCommandResult<string | null>(['get', ADMIN_RECOVERY_USED_KEY])
  return Boolean(res.ok && res.result)
}

export async function recoverAdminUserPassword(newPassword: string): Promise<AuthUserResult> {
  if (typeof newPassword !== 'string' || newPassword.length < 6 || newPassword.length > 128) {
    return { ok: false, status: 400, error: 'Password must be 6–128 characters.' }
  }

  const salt = randomBytes(16).toString('hex')
  const passwordHash = hashPassword(newPassword, salt)

  if (!isRedisConfigured()) {
    if (isFailClosedMode()) {
      return { ok: false, status: 503, error: 'Account service temporarily unavailable.' }
    }
    if (memAdminRecoveryUsed) {
      return {
        ok: false,
        status: 409,
        code: 'recovery-already-used',
        error: 'One-time account recovery has already been used.',
      }
    }
    memAdminRecoveryUsed = true
    const existing = memUsers.get(ADMIN_RECOVERY_USERNAME)
    const updated: StoredUser = {
      username: ADMIN_RECOVERY_USERNAME,
      displayName: existing?.displayName || ADMIN_RECOVERY_DISPLAY_NAME,
      salt,
      passwordHash,
      createdAt: existing?.createdAt || new Date().toISOString(),
    }
    memUsers.set(ADMIN_RECOVERY_USERNAME, updated)
    return { ok: true, user: { username: updated.username, displayName: updated.displayName } }
  }

  const claim = await redisCommandResult<string | null>([
    'set',
    ADMIN_RECOVERY_USED_KEY,
    new Date().toISOString(),
    'NX',
  ])
  if (!claim.ok) {
    return { ok: false, status: 503, error: 'Account service temporarily unavailable.' }
  }
  if (claim.result !== 'OK') {
    return {
      ok: false,
      status: 409,
      code: 'recovery-already-used',
      error: 'One-time account recovery has already been used.',
    }
  }

  const userKey = `${USER_KEY_PREFIX}${ADMIN_RECOVERY_USERNAME}`
  const existingRes = await redisCommandResult<string | null>(['get', userKey])
  if (!existingRes.ok) {
    await redisCommandResult(['del', ADMIN_RECOVERY_USED_KEY])
    return { ok: false, status: 503, error: 'Account service temporarily unavailable.' }
  }

  let existing: Partial<StoredUser> | null = null
  if (existingRes.result) {
    try {
      existing = JSON.parse(existingRes.result) as Partial<StoredUser>
    } catch {
      existing = null
    }
  }

  const updated: StoredUser = {
    username: ADMIN_RECOVERY_USERNAME,
    displayName:
      typeof existing?.displayName === 'string' && existing.displayName.trim()
        ? existing.displayName.trim()
        : ADMIN_RECOVERY_DISPLAY_NAME,
    salt,
    passwordHash,
    createdAt:
      typeof existing?.createdAt === 'string' && existing.createdAt
        ? existing.createdAt
        : new Date().toISOString(),
  }

  const saveRes = await redisCommandResult<string>(['set', userKey, JSON.stringify(updated)])
  if (!saveRes.ok || saveRes.result !== 'OK') {
    await redisCommandResult(['del', ADMIN_RECOVERY_USED_KEY])
    return { ok: false, status: 503, error: 'Account service temporarily unavailable.' }
  }

  return { ok: true, user: { username: updated.username, displayName: updated.displayName } }
}

export type SafeUserSummary = {
  username: string
  displayName: string
  createdAt: string
  cvUsedThisMonth: number
  cvMonthlyLimit: number
}

export async function listSafeUsersPage(opts?: {
  query?: string
  page?: number
  limit?: number
  cvMonthlyLimit?: number
}): Promise<{
  users: SafeUserSummary[]
  total: number
  page: number
  limit: number
  quotaDistribution: { zero: number; partial: number; maxed: number }
}> {
  const page = Math.max(1, Math.min(100, opts?.page ?? 1))
  const limit = Math.max(1, Math.min(50, opts?.limit ?? 20))
  const q = (opts?.query ?? '').trim().toLowerCase()
  const cvLimit = opts?.cvMonthlyLimit ?? 3
  const month = utcMonthKey()

  if (!isRedisConfigured()) {
    const all = Array.from(memUsers.values())
      .filter((u) => !q || u.username.includes(q) || u.displayName.toLowerCase().includes(q))
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    const total = all.length
    const slice = all.slice((page - 1) * limit, page * limit).map((u) => ({
      username: u.username,
      displayName: u.displayName,
      createdAt: u.createdAt,
      cvUsedThisMonth: 0,
      cvMonthlyLimit: cvLimit,
    }))
    return {
      users: slice,
      total,
      page,
      limit,
      quotaDistribution: { zero: total, partial: 0, maxed: 0 },
    }
  }

  // Prefer the O(log N) ZSET index; backfill once from a capped SCAN if empty.
  let usernames: string[] = []
  const zRes = await redisCommandResult<string[]>(['ZREVRANGE', USERS_INDEX_KEY, '0', '499'])
  if (zRes.ok && Array.isArray(zRes.result) && zRes.result.length > 0) {
    usernames = zRes.result
  } else {
    let cursor = '0'
    const discovered: string[] = []
    for (let step = 0; step < 5; step++) {
      const scanRes = await redisCommandResult<[string, string[]]>(['SCAN', cursor, 'MATCH', `${USER_KEY_PREFIX}*`, 'COUNT', '100'])
      if (!scanRes.ok || !Array.isArray(scanRes.result)) break
      cursor = scanRes.result[0]
      const keys = scanRes.result[1] ?? []
      for (const k of keys) {
        if (k.endsWith(':recovery_used')) continue
        const uname = k.slice(USER_KEY_PREFIX.length)
        if (uname && !discovered.includes(uname)) discovered.push(uname)
      }
      if (cursor === '0' || discovered.length >= 250) break
    }
    usernames = discovered
  }

  if (usernames.length === 0) {
    return { users: [], total: 0, page, limit, quotaDistribution: { zero: 0, partial: 0, maxed: 0 } }
  }

  const cmds: string[][] = []
  for (const u of usernames) {
    cmds.push(['GET', `${USER_KEY_PREFIX}${u}`])
    cmds.push(['GET', `aihunt:cv:m:${month}:usr:${u}`])
  }
  const pipe = await redisPipeline(cmds)
  const summaries: SafeUserSummary[] = []
  const zaddCmds: string[][] = []
  const quotaDistribution = { zero: 0, partial: 0, maxed: 0 }

  if (pipe.length > 0) {
    for (let i = 0; i < usernames.length; i++) {
      const rawUser = pipe[i * 2]?.result
      const rawCv = pipe[i * 2 + 1]?.result
      if (typeof rawUser !== 'string') continue
      try {
        const parsed = JSON.parse(rawUser) as Partial<StoredUser>
        const uname = typeof parsed.username === 'string' ? parsed.username : usernames[i]!
        const displayName =
          typeof parsed.displayName === 'string' && parsed.displayName.trim()
            ? parsed.displayName.trim()
            : uname
        const createdAt = typeof parsed.createdAt === 'string' ? parsed.createdAt : ''
        const cvUsed = Math.max(0, Number.parseInt(String(rawCv ?? '0'), 10) || 0)

        if (cvUsed <= 0) quotaDistribution.zero++
        else if (cvUsed >= cvLimit) quotaDistribution.maxed++
        else quotaDistribution.partial++

        if ((!zRes.ok || !zRes.result?.length) && uname) {
          zaddCmds.push(['ZADD', USERS_INDEX_KEY, String(Date.parse(createdAt) || Date.now()), uname])
        }

        if (!q || uname.includes(q) || displayName.toLowerCase().includes(q)) {
          summaries.push({
            username: uname,
            displayName,
            createdAt,
            cvUsedThisMonth: cvUsed,
            cvMonthlyLimit: cvLimit,
          })
        }
      } catch {
        /* ignore malformed entry */
      }
    }
  }

  if (zaddCmds.length > 0) {
    void redisPipeline(zaddCmds).catch(() => null)
  }

  summaries.sort((a, b) => (Date.parse(b.createdAt) || 0) - (Date.parse(a.createdAt) || 0))
  const total = summaries.length
  const users = summaries.slice((page - 1) * limit, page * limit)
  return { users, total, page, limit, quotaDistribution }
}

export function __resetMemUsersForTests() {
  memUsers.clear()
  memDeviceAccounts.clear()
  memAdminRecoveryUsed = false
}
