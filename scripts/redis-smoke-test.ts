/**
 * Safe Live Upstash Redis REST EVAL Smoke Test (dedicated `aihunt:test:*` namespace).
 * Never modifies production counters and never logs credentials.
 * Run: npx tsx scripts/redis-smoke-test.ts
 */
import { randomBytes } from 'node:crypto'
import { isRedisConfigured, redisCommand, redisEval } from '../lib/server/redis'
import {
  LUA_CV_REFUND,
  LUA_CV_RESERVE,
  LUA_LEASE_ACQUIRE,
  LUA_LEASE_RELEASE,
  LUA_LEASE_RENEW,
} from '../lib/server/quota'

async function main() {
  if (!isRedisConfigured()) {
    console.error('BLOCKED: UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are not configured in the environment.')
    process.exit(2)
  }

  const runId = randomBytes(6).toString('hex')
  const leaseKey = `aihunt:test:smoke:lease:${runId}`
  const ipKey = `aihunt:test:smoke:cvip:${runId}`
  const devKey = `aihunt:test:smoke:cvdev:${runId}`
  const resKey = `aihunt:test:smoke:cvres:${runId}`

  try {
    const now = Date.now()
    const acq = await redisEval<[number]>(LUA_LEASE_ACQUIRE, [leaseKey], [now, 'tokA', 1, 5000])
    if (!Array.isArray(acq) || acq[0] !== 1) throw new Error(`Lease acquire failed: ${JSON.stringify(acq)}`)

    const ren = await redisEval<number>(LUA_LEASE_RENEW, [leaseKey], [now + 1000, 'tokA', 5000])
    if (Number(ren) !== 1) throw new Error(`Lease renew failed: ${String(ren)}`)

    const rel = await redisEval<number>(LUA_LEASE_RELEASE, [leaseKey], ['tokA'])
    if (Number(rel) !== 1) throw new Error(`Lease release failed: ${String(rel)}`)

    const cvRes = await redisEval<[number, number]>(
      LUA_CV_RESERVE,
      [ipKey, devKey, resKey],
      [12, 60, 3, 60, 60, `${ipKey}|${devKey}`]
    )
    if (!Array.isArray(cvRes) || cvRes[0] !== 1) throw new Error(`CV reserve failed: ${JSON.stringify(cvRes)}`)

    const ref1 = await redisEval<number>(LUA_CV_REFUND, [resKey, ipKey, devKey], [])
    const ref2 = await redisEval<number>(LUA_CV_REFUND, [resKey, ipKey, devKey], [])
    if (Number(ref1) !== 1 || Number(ref2) !== 0) {
      throw new Error(`CV idempotent refund failed: ref1=${ref1}, ref2=${ref2}`)
    }

    console.log('ok    live Upstash Redis Lua EVAL smoke test passed (lease acquire/renew/release + idempotent CV reserve/refund)')
  } finally {
    await redisCommand(['del', leaseKey, ipKey, devKey, resKey]).catch(() => {})
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
