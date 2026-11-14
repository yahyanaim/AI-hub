import 'server-only'
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import { isFailClosedMode, isRedisConfigured, redisCommandResult, SIGNUP_COUNT_KEY } from '@/lib/server/redis'

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

export function __resetMemUsersForTests() {
  memUsers.clear()
  memDeviceAccounts.clear()
  memAdminRecoveryUsed = false
}
