import 'server-only'
import webpush from 'web-push'
import { isRedisConfigured, redisCommand, redisPipeline } from '@/lib/server/redis'

const SUBS_SET = 'aihunt:push:subs'
const MAX_SUBS = 10_000

export type StoredPushSub = {
  endpoint: string
  keys: { p256dh: string; auth: string }
  /** Attach the subscriber username for debugging, never shown publicly. */
  u?: string
  ts: string
}

export function isPushConfigured(): boolean {
  return Boolean(
    process.env.VAPID_PUBLIC_KEY &&
      process.env.VAPID_PRIVATE_KEY &&
      process.env.VAPID_SUBJECT
  )
}

function vapidDetails() {
  return {
    subject: process.env.VAPID_SUBJECT!,
    publicKey: process.env.VAPID_PUBLIC_KEY!,
    privateKey: process.env.VAPID_PRIVATE_KEY!,
  }
}

function encodeEndpoint(endpoint: string): string {
  return Buffer.from(endpoint).toString('base64url')
}

export function getVapidPublicKey(): string | null {
  return process.env.VAPID_PUBLIC_KEY || null
}

/** Validates the shape of a browser PushSubscription and stores it. */
export async function saveSubscription(
  raw: unknown,
  u?: string
): Promise<{ ok: boolean; reason?: string }> {
  if (!isRedisConfigured()) return { ok: false, reason: 'redis-not-configured' }
  const sub = raw as {
    endpoint?: string
    keys?: { p256dh?: string; auth?: string }
  }
  const endpoint = sub?.endpoint
  const p256dh = sub?.keys?.p256dh
  const auth = sub?.keys?.auth
  if (
    typeof endpoint !== 'string' ||
    !/^https:\/\//.test(endpoint) ||
    typeof p256dh !== 'string' ||
    typeof auth !== 'string'
  ) {
    return { ok: false, reason: 'invalid-subscription' }
  }

  const stored: StoredPushSub = {
    endpoint,
    keys: { p256dh, auth },
    u: typeof u === 'string' ? u.slice(0, 24) : undefined,
    ts: new Date().toISOString(),
  }

  const count = await redisCommand<number>(['scard', SUBS_SET])
  if (count !== null && count >= MAX_SUBS) {
    return { ok: false, reason: 'subscriber-limit' }
  }

  const key = `aihunt:push:sub:${encodeEndpoint(endpoint)}`
  await redisPipeline([
    ['set', key, JSON.stringify(stored)],
    ['sadd', SUBS_SET, key],
  ])
  return { ok: true }
}

export async function removeSubscription(endpoint: string): Promise<void> {
  const key = `aihunt:push:sub:${encodeEndpoint(endpoint)}`
  await redisPipeline([['del', key], ['srem', SUBS_SET, key]])
}

export type PushItem = { title: string; body: string; icon: string; url: string }

/**
 * Sends a push broadcast to every stored subscription. Dead endpoints
 * (410/404/403) are pruned automatically. Returns delivery stats.
 */
export async function broadcastPush(
  items: PushItem[]
): Promise<{ sent: number; pruned: number; total: number }> {
  if (!isRedisConfigured() || items.length === 0) {
    return { sent: 0, pruned: 0, total: 0 }
  }
  const keys = (await redisCommand<string[]>(['smembers', SUBS_SET])) ?? []
  if (keys.length === 0) return { sent: 0, pruned: 0, total: 0 }

  const raw = await redisPipeline(keys.map((k) => ['get', k]))
  const payload = JSON.stringify({ items })
  const dead: string[] = []

  const results = await Promise.all(
    keys.map((key, i) => {
      const entry = raw[i]
      return (async () => {
        if (!entry || typeof entry.result !== 'string') {
          // Missing JSON sub — clean the dangling reference.
          dead.push(key)
          return false
        }
        let stored: StoredPushSub
        try {
          stored = JSON.parse(entry.result) as StoredPushSub
        } catch {
          dead.push(key)
          return false
        }
        try {
          await webpush.sendNotification(
            { endpoint: stored.endpoint, keys: stored.keys },
            payload,
            { vapidDetails: vapidDetails(), TTL: 60 * 60 * 24 }
          )
          return true
        } catch (err) {
          const e = err as { statusCode?: number }
          const code = e.statusCode
          // Sub is gone/expired — drop it so future broadcasts skip it.
          if (code === 410 || code === 404 || code === 403 || code === 406) {
            dead.push(key)
          }
          // Any other error is a transient provider hiccup — keep the sub.
          return false
        }
      })()
    }),
  )

  // Prune dead references in one batch (set + per-endpoint keys).
  if (dead.length > 0) {
    await redisPipeline([
      ...dead.map((k) => ['srem', SUBS_SET, k]),
      ...dead.map((k) => ['del', k]),
    ])
  }

  const sent = results.filter(Boolean).length
  return { sent, pruned: dead.length, total: keys.length }
}
