import 'server-only'

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL?.trim()
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN?.trim()

export function isRedisConfigured(): boolean {
  return Boolean(UPSTASH_URL && UPSTASH_TOKEN)
}

/**
 * Runs one command against the Upstash Redis REST endpoint and unwraps the
 * `result` field. Plain fetch instead of @upstash/redis so there is no extra
 * dependency and no build-time weight; the REST API is a stable contract.
 */
export async function redisCommand<T = unknown>(cmd: string[]): Promise<T | null> {
  if (!isRedisConfigured()) return null
  try {
    const res = await fetch(`${UPSTASH_URL}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([cmd]),
      cache: 'no-store',
    })
    if (!res.ok) return null
    const body = (await res.json()) as Array<{ result: T | null; error?: string }>
    const first = body[0]
    if (!first || first.error) return null
    return first.result
  } catch {
    return null
  }
}

/**
 * Runs several commands atomically-ish in one request (pipeline). Returns null
 * for any command that fails. Good enough for rate limiting; real atomicity is
 * not needed because commands are idempotent per key.
 */
export async function redisPipeline(
  cmds: string[][]
): Promise<Array<{ result: unknown; error?: string }>> {
  if (!isRedisConfigured()) return []
  try {
    const res = await fetch(`${UPSTASH_URL}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cmds),
      cache: 'no-store',
    })
    if (!res.ok) return []
    const body = (await res.json()) as Array<{ result: unknown; error?: string }>
    return body
  } catch {
    return []
  }
}

export const SIGNUP_COUNT_KEY = 'aihunt:signups:count'
