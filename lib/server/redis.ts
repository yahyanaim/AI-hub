import 'server-only'

function getUpstashConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim()
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim()
  return { url, token }
}

export function isRedisConfigured(): boolean {
  const { url, token } = getUpstashConfig()
  return Boolean(url && token)
}

/**
 * In production (or when AIHUB_FAIL_CLOSED=1), expensive AI endpoints must fail
 * closed with 503 if Redis is unconfigured or unreachable rather than falling
 * back to uncoordinated per-instance memory counters.
 *
 * AIHUB_ALLOW_MEMORY_FALLBACK=1 is strictly ignored in production.
 */
export function isFailClosedMode(): boolean {
  if (process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production') {
    return true
  }
  if (process.env.AIHUB_FAIL_CLOSED === '1') return true
  if (process.env.AIHUB_ALLOW_MEMORY_FALLBACK === '1') return false
  return false
}

/**
 * Runs one command against the Upstash Redis REST endpoint and unwraps the
 * `result` field. Plain fetch instead of @upstash/redis so there is no extra
 * dependency and no build-time weight; the REST API is a stable contract.
 */
export async function redisCommand<T = unknown>(cmd: string[]): Promise<T | null> {
  const { url, token } = getUpstashConfig()
  if (!url || !token) return null
  try {
    const res = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
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
 * Runs a Lua script atomically on Upstash Redis via EVAL.
 * Returns null if Redis is unconfigured, unreachable, or returns an error.
 */
export async function redisEval<T = unknown>(
  script: string,
  keys: string[],
  args: Array<string | number>
): Promise<T | null> {
  return redisCommand<T>([
    'eval',
    script,
    String(keys.length),
    ...keys,
    ...args.map((a) => String(a)),
  ])
}

/**
 * Runs several commands in one HTTP pipeline request.
 */
export async function redisPipeline(
  cmds: string[][]
): Promise<Array<{ result: unknown; error?: string }>> {
  const { url, token } = getUpstashConfig()
  if (!url || !token) return []
  try {
    const res = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
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
