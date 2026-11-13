/**
 * Safe Live Upstash Redis REST EVAL Smoke Test (`aihunt:test:cost-protection:*` namespace).
 * Never modifies production counters and never logs credentials.
 * Run: npx tsx scripts/redis-smoke-test.ts
 */
import { randomBytes } from 'node:crypto'
import { isRedisConfigured, redisCommand, redisEval } from '../lib/server/redis'
import {
  LUA_CV_COMMIT,
  LUA_CV_RECOVER_EXPIRED,
  LUA_CV_REFUND,
  LUA_CV_RESERVE,
  LUA_LEASE_ACQUIRE,
  LUA_LEASE_RELEASE,
  LUA_LEASE_RENEW,
  LUA_MULTI_CHECK_AND_INCR,
} from '../lib/server/quota'

async function main() {
  if (!isRedisConfigured()) {
    console.error('BLOCKED: UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are not configured in the environment.')
    process.exit(2)
  }

  const runId = randomBytes(6).toString('hex')
  const prefix = `aihunt:test:cost-protection:${runId}`
  const leaseKey = `${prefix}:lease`
  const quotaKeyA = `${prefix}:qa`
  const quotaKeyB = `${prefix}:qb`
  const ipKey = `${prefix}:cvip`
  const devKey = `${prefix}:cvdev`
  const pendingKey = `${prefix}:cvpending`
  const resPrefix = `${prefix}:cvres:`
  const res1Id = `r1-${runId}`
  const res2Id = `r2-${runId}`
  const res3Id = `r3-${runId}`
  const res1Key = `${resPrefix}${res1Id}`
  const res2Key = `${resPrefix}${res2Id}`
  const res3Key = `${resPrefix}${res3Id}`

  try {
    // 1. Atomic multi-key check-and-increment + rollback
    const q1 = await redisEval<[number, number]>(LUA_MULTI_CHECK_AND_INCR, [quotaKeyA, quotaKeyB], [2, 60, 1, 60])
    const q2 = await redisEval<[number, number, number]>(LUA_MULTI_CHECK_AND_INCR, [quotaKeyA, quotaKeyB], [2, 60, 1, 60])
    if (!Array.isArray(q1) || q1[0] !== 1 || !Array.isArray(q2) || q2[0] !== 0) {
      throw new Error(`Multi-key quota failed: q1=${JSON.stringify(q1)}, q2=${JSON.stringify(q2)}`)
    }

    // 2. Lease acquire / renew / release
    const now = Date.now()
    const acq = await redisEval<[number]>(LUA_LEASE_ACQUIRE, [leaseKey], [now, 'tokA', 1, 5000])
    if (!Array.isArray(acq) || acq[0] !== 1) throw new Error(`Lease acquire failed: ${JSON.stringify(acq)}`)

    const ren = await redisEval<number>(LUA_LEASE_RENEW, [leaseKey], [now + 1000, 'tokA', 5000])
    if (Number(ren) !== 1) throw new Error(`Lease renew failed: ${String(ren)}`)

    const rel = await redisEval<number>(LUA_LEASE_RELEASE, [leaseKey], ['tokA'])
    if (Number(rel) !== 1) throw new Error(`Lease release failed: ${String(rel)}`)

    // 3. CV reserve -> commit -> post-commit refund no-op
    const r1 = await redisEval<[number, number]>(
      LUA_CV_RESERVE,
      [ipKey, devKey, res1Key, pendingKey],
      [12, 60, 3, 60, 60, `owner1|${ipKey}|${devKey}`, now, now + 5000, res1Id, resPrefix]
    )
    if (!Array.isArray(r1) || r1[0] !== 1) throw new Error(`CV reserve 1 failed: ${JSON.stringify(r1)}`)
    const com1 = await redisEval<number>(LUA_CV_COMMIT, [res1Key, pendingKey], [res1Id, 'owner1'])
    const refAfterCommit = await redisEval<number>(LUA_CV_REFUND, [res1Key, pendingKey], [res1Id, 'owner1'])
    if (Number(com1) !== 1 || Number(refAfterCommit) !== 0) {
      throw new Error(`CV commit/post-commit refund failed: com1=${com1}, ref=${refAfterCommit}`)
    }

    // 4. CV reserve -> idempotent refund
    const r2 = await redisEval<[number, number]>(
      LUA_CV_RESERVE,
      [ipKey, devKey, res2Key, pendingKey],
      [12, 60, 3, 60, 60, `owner1|${ipKey}|${devKey}`, now, now + 5000, res2Id, resPrefix]
    )
    if (!Array.isArray(r2) || r2[0] !== 1) throw new Error(`CV reserve 2 failed: ${JSON.stringify(r2)}`)
    const ref1 = await redisEval<number>(LUA_CV_REFUND, [res2Key, pendingKey], [res2Id, 'owner1'])
    const ref2 = await redisEval<number>(LUA_CV_REFUND, [res2Key, pendingKey], [res2Id, 'owner1'])
    if (Number(ref1) !== 1 || Number(ref2) !== 0) {
      throw new Error(`CV idempotent refund failed: ref1=${ref1}, ref2=${ref2}`)
    }

    // 5. Abandoned CV reservation lazy recovery
    const r3 = await redisEval<[number, number]>(
      LUA_CV_RESERVE,
      [ipKey, devKey, res3Key, pendingKey],
      [12, 60, 3, 60, 60, `owner1|${ipKey}|${devKey}`, now, now + 100, res3Id, resPrefix]
    )
    if (!Array.isArray(r3) || r3[0] !== 1) throw new Error(`CV reserve 3 failed: ${JSON.stringify(r3)}`)
    const rec = await redisEval<number>(LUA_CV_RECOVER_EXPIRED, [pendingKey], [now + 200, resPrefix, 10])
    if (Number(rec) !== 1) throw new Error(`CV recovery failed: rec=${rec}`)

    console.log('ok    live Upstash Redis Lua EVAL smoke test passed (multi-key, lease, CV reserve/commit/refund/recovery)')
  } finally {
    await redisCommand(['del', leaseKey, quotaKeyA, quotaKeyB, ipKey, devKey, pendingKey, res1Key, res2Key, res3Key]).catch(() => {})
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
