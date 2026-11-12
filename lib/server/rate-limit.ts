import 'server-only'
import { isRedisConfigured, redisCommand } from '@/lib/server/redis'

// Bounded in-memory fallback when Upstash Redis is not configured (local dev / tests).
const memoryBuckets = new Map<string, number[]>()
const MAX_MEMORY_KEYS = 5000

/**
 * Extract the best-effort client IP, preferring Vercel's non-spoofable
 * `x-vercel-forwarded-for` header before falling back to `x-forwarded-for`.
 */
export function getClientIp(request: Request): string {
  const vercelIp = request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()
  if (vercelIp) return vercelIp
  const fwd = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  if (fwd) return fwd
  return request.headers.get('x-real-ip')?.trim() || 'unknown'
}

/**
 * Distributed rate limiter backed by Upstash Redis when configured, falling back
 * to an in-memory sliding window for local dev/test environments.
 */
export async function checkRateLimit(
  bucket: string,
  ip: string,
  maxRequests: number,
  windowSeconds: number
): Promise<boolean> {
  if (isRedisConfigured()) {
    const rlKey = `aihunt:rl:${bucket}:${ip}`
    const used = await redisCommand<number>(['incr', rlKey])
    if (used !== null) {
      if (used === 1) {
        await redisCommand(['expire', rlKey, String(windowSeconds)])
      }
      return used > maxRequests
    }
  }

  const now = Date.now()
  const windowMs = windowSeconds * 1000
  const memKey = `${bucket}:${ip}`
  const hits = (memoryBuckets.get(memKey) ?? []).filter((ts) => now - ts < windowMs)
  if (hits.length >= maxRequests) {
    memoryBuckets.set(memKey, hits)
    return true
  }
  hits.push(now)
  memoryBuckets.set(memKey, hits)
  if (memoryBuckets.size > MAX_MEMORY_KEYS) {
    for (const [key, timestamps] of memoryBuckets) {
      if (timestamps.every((ts) => now - ts >= windowMs)) {
        memoryBuckets.delete(key)
      }
    }
  }
  return false
}
