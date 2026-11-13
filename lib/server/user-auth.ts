import 'server-only'
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import { isFailClosedMode, isRedisConfigured, redisCommandResult } from '@/lib/server/redis'

const USER_KEY_PREFIX = 'aihunt:user:'

type StoredUser = {
  username: string
  displayName: string
  salt: string
  passwordHash: string
  createdAt: string
}

const memUsers = new Map<string, StoredUser>()

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
  | { ok: false; status: number; error: string }

export async function registerUser(
  rawUsername: string,
  password: string
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
    if (memUsers.has(v.username)) {
      return {
        ok: false,
        status: 409,
        error: 'Username already exists. Please sign in instead.',
      }
    }
    memUsers.set(v.username, record)
    return { ok: true, user: { username: record.username, displayName: record.displayName } }
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

  if (!record || !verifyPassword(password, record.salt, record.passwordHash)) {
    return { ok: false, status: 401, error: 'Invalid username or password.' }
  }

  return { ok: true, user: { username: record.username, displayName: record.displayName } }
}

export function __resetMemUsersForTests() {
  memUsers.clear()
}
