import 'server-only'

import { isFailClosedMode, isRedisConfigured, redisCommandResult } from '@/lib/server/redis'

export const CHAT_LOCK_KEY = 'aihunt:config:chat_locked'

let memChatLocked = false

export type ChatLockStatus =
  | { ok: true; locked: boolean }
  | { ok: false; locked: boolean; error: string }

/**
 * Reads the admin-controlled AI chat lock state from Upstash Redis
 * (with an in-memory fallback for local dev/test when Redis is unconfigured).
 */
export async function getChatLockStatus(): Promise<ChatLockStatus> {
  if (!isRedisConfigured()) {
    if (isFailClosedMode()) {
      return { ok: false, locked: false, error: 'redis-not-configured' }
    }
    return { ok: true, locked: memChatLocked }
  }

  const res = await redisCommandResult<string>(['get', CHAT_LOCK_KEY])
  if (res.ok) {
    return { ok: true, locked: res.result === '1' }
  }

  if (isFailClosedMode()) {
    return { ok: false, locked: false, error: res.error }
  }
  return { ok: true, locked: memChatLocked }
}

/**
 * Convenience check for request handlers. Returns `true` only when the chat
 * lock is explicitly enabled; Redis outages still fail closed in quota checks.
 */
export async function isChatLocked(): Promise<boolean> {
  const status = await getChatLockStatus()
  return status.ok ? status.locked : false
}

/**
 * Persists the admin-controlled AI chat lock state.
 */
export async function setChatLocked(
  locked: boolean
): Promise<{ ok: true; locked: boolean } | { ok: false; error: string }> {
  if (!isRedisConfigured()) {
    if (isFailClosedMode()) {
      return { ok: false, error: 'redis-not-configured' }
    }
    memChatLocked = locked
    return { ok: true, locked }
  }

  const res = locked
    ? await redisCommandResult(['set', CHAT_LOCK_KEY, '1'])
    : await redisCommandResult(['del', CHAT_LOCK_KEY])

  if (!res.ok) {
    return { ok: false, error: res.error }
  }

  memChatLocked = locked
  return { ok: true, locked }
}

export function __resetChatLockForTests() {
  memChatLocked = false
}
