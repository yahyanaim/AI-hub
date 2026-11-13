import 'server-only'
import { atomicCheckAndIncr } from '@/lib/server/quota'
export { getClientIp } from '@/lib/server/visitor'

/**
 * Distributed atomic rate limiter backed by Upstash Redis Lua script when
 * configured, falling back to an explicit local store in dev/test environments.
 */
export async function checkRateLimit(
  bucket: string,
  identifier: string,
  maxRequests: number,
  windowSeconds: number
): Promise<boolean> {
  const res = await atomicCheckAndIncr([
    {
      key: `aihunt:rl:${bucket}:${identifier}`,
      limit: maxRequests,
      ttlSeconds: windowSeconds,
    },
  ])
  return !res.ok
}
