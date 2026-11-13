/**
 * Comprehensive Cost Protection, Quota, Identity, Anti-Bot & Fail-Closed Tests.
 * Run: npm run test:cost
 */

import { GET as cvGet, POST as cvPost } from '../app/api/chat/cv/route'
import { POST as chatPost } from '../app/api/chat/route'
import { POST as goalPost } from '../app/api/goal-match/route'
import {
  __resetLocalQuotaStoreForTests,
  acquireConcurrencyLease,
  atomicCheckAndIncr,
  commitCvMonthlyQuota,
  getCvMonthlyQuotaStatus,
  nextUtcMonthResetIso,
  refundCvMonthlyQuota,
  reserveCvMonthlyQuota,
  utcMonthKey,
} from '../lib/server/quota'
import { isFailClosedMode } from '../lib/server/redis'
import { resolveVisitorIdentity } from '../lib/server/visitor'
import robotsGet from '../app/robots'

let passed = 0
let failed = 0

function check(label: string, ok: boolean, detail?: unknown) {
  if (ok) {
    passed++
    console.log(`ok    ${label}`)
  } else {
    failed++
    console.error(`FAIL  ${label}`, detail !== undefined ? detail : '')
  }
}

const BROWSER_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/130.0.0.0 Safari/537.36'
const VALID_CV_TEXT = 'Full-Stack Engineer with 5 years experience in TypeScript, Next.js, Node.js, Redis, and PostgreSQL.'

function extractCookieValue(setCookieHeader: string | null): string {
  if (!setCookieHeader) return ''
  const first = setCookieHeader.split(';')[0] ?? ''
  return first.trim()
}

async function run() {
  __resetLocalQuotaStoreForTests()
  process.env.AUTH_SECRET = '0123456789abcdef0123456789abcdef0123456789abcdef'

  // 1-4. First, second, third CV upload succeed; fourth rejected (429)
  {
    const ip = '198.51.100.100'
    let cookie = ''
    const upload = (txt = VALID_CV_TEXT, name = 'cv.txt') => {
      const form = new FormData()
      form.append('file', new File([txt], name, { type: 'text/plain' }))
      return cvPost(
        new Request('http://localhost/api/chat/cv', {
          method: 'POST',
          headers: {
            'x-vercel-forwarded-for': ip,
            'user-agent': BROWSER_UA,
            ...(cookie ? { cookie } : {}),
          },
          body: form,
        })
      )
    }

    const r1 = await upload()
    const d1 = await r1.json()
    cookie = extractCookieValue(r1.headers.get('set-cookie'))
    check('cv-quota: 1st upload succeeds (remaining=2)', r1.status === 200 && d1.quota?.remaining === 2 && cookie.startsWith('aihunt_vid='), { status: r1.status, d1 })

    const r2 = await upload()
    const d2 = await r2.json()
    check('cv-quota: 2nd upload succeeds (remaining=1)', r2.status === 200 && d2.quota?.remaining === 1, d2)

    const r3 = await upload()
    const d3 = await r3.json()
    check('cv-quota: 3rd upload succeeds (remaining=0)', r3.status === 200 && d3.quota?.remaining === 0, d3)

    const r4 = await upload()
    const d4 = await r4.json()
    check('cv-quota: 4th upload rejected with 429 + Retry-After', r4.status === 429 && Boolean(r4.headers.get('retry-after')) && d4.quota?.remaining === 0, { status: r4.status, d4 })

    // 5. GET /api/chat/cv reports 0 remaining and next UTC month reset
    const rGet = await cvGet(
      new Request('http://localhost/api/chat/cv', {
        headers: { 'x-vercel-forwarded-for': ip, cookie },
      })
    )
    const dGet = await rGet.json()
    check('cv-quota: GET returns remaining=0 and resetAt', rGet.status === 200 && dGet.remaining === 0 && typeof dGet.resetAt === 'string', dGet)

    // 6. Cookie deletion on same IP is bounded by CV_IP_MONTHLY_LIMIT (12)
    // (3 already used by first device; 9 more allowed across new devices, then blocked with 429)
    const prevAbuse = process.env.CV_ABUSE_PER_MINUTE_LIMIT
    process.env.CV_ABUSE_PER_MINUTE_LIMIT = '30'
    let allowedAcrossResets = 0
    let rIpExhaustedStatus = 0
    try {
      for (let i = 0; i < 9; i++) {
        const form = new FormData()
        form.append('file', new File([VALID_CV_TEXT], 'cv.txt', { type: 'text/plain' }))
        const res = await cvPost(
          new Request('http://localhost/api/chat/cv', {
            method: 'POST',
            headers: { 'x-vercel-forwarded-for': ip, 'user-agent': BROWSER_UA },
            body: form,
          })
        )
        if (res.status === 200) allowedAcrossResets++
      }
      const rIpExhausted = await cvPost(
        (() => {
          const form = new FormData()
          form.append('file', new File([VALID_CV_TEXT], 'cv.txt', { type: 'text/plain' }))
          return new Request('http://localhost/api/chat/cv', {
            method: 'POST',
            headers: { 'x-vercel-forwarded-for': ip, 'user-agent': BROWSER_UA },
            body: form,
          })
        })()
      )
      rIpExhaustedStatus = rIpExhausted.status
    } finally {
      if (prevAbuse === undefined) delete process.env.CV_ABUSE_PER_MINUTE_LIMIT
      else process.env.CV_ABUSE_PER_MINUTE_LIMIT = prevAbuse
    }
    check(
      'cv-quota: cookie deletion on same IP bounded at CV_IP_MONTHLY_LIMIT (12) then blocked (429)',
      allowedAcrossResets === 9 && rIpExhaustedStatus === 429,
      { allowedAcrossResets, status: rIpExhaustedStatus }
    )

    // 7. Same device cookie on changed IP cannot bypass device quota
    const rChangedIp = await cvPost(
      (() => {
        const form = new FormData()
        form.append('file', new File([VALID_CV_TEXT], 'cv.txt', { type: 'text/plain' }))
        return new Request('http://localhost/api/chat/cv', {
          method: 'POST',
          headers: { 'x-vercel-forwarded-for': '203.0.113.222', 'user-agent': BROWSER_UA, cookie },
          body: form,
        })
      })()
    )
    check('cv-quota: same device on changed IP still blocked (429)', rChangedIp.status === 429, rChangedIp.status)
  }

  // 8. Failed upload refunds monthly quota
  {
    const ip = '198.51.100.101'
    const formBad = new FormData()
    formBad.append('file', new File(['short'], 'bad.txt', { type: 'text/plain' }))
    const rBad = await cvPost(
      new Request('http://localhost/api/chat/cv', {
        method: 'POST',
        headers: { 'x-vercel-forwarded-for': ip, 'user-agent': BROWSER_UA },
        body: formBad,
      })
    )
    const cookie = extractCookieValue(rBad.headers.get('set-cookie'))
    const rStatus = await cvGet(
      new Request('http://localhost/api/chat/cv', {
        headers: { 'x-vercel-forwarded-for': ip, cookie },
      })
    )
    const st = await rStatus.json()
    check('cv-quota: failed upload (422) refunds monthly quota (still 3 remaining)', rBad.status === 422 && st.remaining === 3, { status: rBad.status, st })
  }

  // 9. UTC Calendar monthly reset isolation
  {
    const req = new Request('http://localhost/api/chat/cv', {
      headers: { 'x-vercel-forwarded-for': '198.51.100.102' },
    })
    const id = resolveVisitorIdentity(req)
    const nov = new Date('2026-11-15T12:00:00Z')
    const dec = new Date('2026-12-01T00:00:01Z')
    const r1 = await reserveCvMonthlyQuota(id, nov)
    const r2 = await reserveCvMonthlyQuota(id, nov)
    const r3 = await reserveCvMonthlyQuota(id, nov)
    const novStatus = await getCvMonthlyQuotaStatus(id, nov)
    const decStatus = await getCvMonthlyQuotaStatus(id, dec)
    check(
      'cv-quota: UTC calendar month resets from Nov (0 left) to Dec (3 left)',
      utcMonthKey(nov) === '2026-11' &&
        utcMonthKey(dec) === '2026-12' &&
        novStatus.ok &&
        novStatus.status.remaining === 0 &&
        decStatus.ok &&
        decStatus.status.remaining === 3 &&
        nextUtcMonthResetIso(nov) === '2026-12-01T00:00:00.000Z',
      { novStatus, decStatus }
    )
    if (r1.ok) await refundCvMonthlyQuota(id, r1.reservationId, nov)
    if (r2.ok) await refundCvMonthlyQuota(id, r2.reservationId, nov)
    if (r3.ok) await refundCvMonthlyQuota(id, r3.reservationId, nov)
  }

  // 10. Atomic concurrency lease & concurrent upload protection
  {
    const specs = [
      { key: 'aihunt:test:conc:1', limit: 3, ttlSeconds: 60 },
    ]
    const results = await Promise.all([
      acquireConcurrencyLease(specs),
      acquireConcurrencyLease(specs),
      acquireConcurrencyLease(specs),
      acquireConcurrencyLease(specs),
      acquireConcurrencyLease(specs),
    ])
    const granted = results.filter((r) => r.ok)
    const denied = results.filter((r) => !r.ok)
    check('atomic: concurrent lease grants exact limit (3) and denies excess (2)', granted.length === 3 && denied.length === 2, { granted: granted.length, denied: denied.length })
    for (const g of granted) {
      if (g.ok) await g.release()
    }
    const afterRelease = await acquireConcurrencyLease(specs)
    check('atomic: released lease allows new acquisition', afterRelease.ok === true, afterRelease)
    if (afterRelease.ok) await afterRelease.release()
  }

  // 11. Atomic multi-key check rolls back completely if second key fails
  {
    await atomicCheckAndIncr([{ key: 'aihunt:test:rollback:b', limit: 1, ttlSeconds: 60 }])
    const res = await atomicCheckAndIncr([
      { key: 'aihunt:test:rollback:a', limit: 5, ttlSeconds: 60 },
      { key: 'aihunt:test:rollback:b', limit: 1, ttlSeconds: 60 },
    ])
    const checkA = await atomicCheckAndIncr([{ key: 'aihunt:test:rollback:a', limit: 1, ttlSeconds: 60 }])
    check('atomic: failed multi-key check does not increment first key', !res.ok && checkA.ok, { res, checkA })
  }

  // 12. Chat quota exceeded (per-minute) + Retry-After
  {
    __resetLocalQuotaStoreForTests()
    const prevKey = process.env.NVIDIA_API_KEY
    const prevMin = process.env.CHAT_PER_MINUTE_LIMIT
    process.env.NVIDIA_API_KEY = ''
    process.env.CHAT_PER_MINUTE_LIMIT = '2'
    try {
      const ip = '198.51.100.150'
      const makeChatReq = () =>
        chatPost(
          new Request('http://localhost/api/chat', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'x-vercel-forwarded-for': ip,
              'user-agent': BROWSER_UA,
            },
            body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
          })
        )
      const c1 = await makeChatReq()
      const cookie = extractCookieValue(c1.headers.get('set-cookie'))
      const c2 = await chatPost(
        new Request('http://localhost/api/chat', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-vercel-forwarded-for': ip,
            'user-agent': BROWSER_UA,
            cookie,
          },
          body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
        })
      )
      const c3 = await chatPost(
        new Request('http://localhost/api/chat', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-vercel-forwarded-for': ip,
            'user-agent': BROWSER_UA,
            cookie,
          },
          body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
        })
      )
      check('chat: 3rd request within 1m limit=2 returns 429 + Retry-After', c1.status === 500 && c2.status === 500 && c3.status === 429 && Boolean(c3.headers.get('retry-after')), { s1: c1.status, s2: c2.status, s3: c3.status })
    } finally {
      if (prevKey === undefined) delete process.env.NVIDIA_API_KEY
      else process.env.NVIDIA_API_KEY = prevKey
      if (prevMin === undefined) delete process.env.CHAT_PER_MINUTE_LIMIT
      else process.env.CHAT_PER_MINUTE_LIMIT = prevMin
    }
  }

  // 13. Global AI budget exceeded & emergency kill switch
  {
    __resetLocalQuotaStoreForTests()
    const prevGlobal = process.env.AI_GLOBAL_DAILY_REQUEST_LIMIT
    process.env.AI_GLOBAL_DAILY_REQUEST_LIMIT = '1'
    try {
      const form1 = new FormData()
      form1.append('file', new File(['short'], 'a.txt', { type: 'text/plain' }))
      // Goal-match triggers global budget; test 1st passes budget (returns 503 if no key, or 400 on bad goal), wait:
      // Let's test global budget on /api/chat (with NVIDIA_API_KEY dummy)
      const prevKey = process.env.NVIDIA_API_KEY
      process.env.NVIDIA_API_KEY = 'dummy'
      const r1 = await chatPost(
        new Request('http://localhost/api/chat', {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-vercel-forwarded-for': '198.51.100.201', 'user-agent': BROWSER_UA },
          body: JSON.stringify({}), // invalid payload, but budget already acquired and released
        })
      )
      const r2 = await chatPost(
        new Request('http://localhost/api/chat', {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-vercel-forwarded-for': '198.51.100.202', 'user-agent': BROWSER_UA },
          body: JSON.stringify({ messages: [{ role: 'user', content: 'hello' }] }),
        })
      )
      check('global-budget: 2nd request from different IP blocked with 503 when global daily=1', r1.status === 400 && r2.status === 503, { s1: r1.status, s2: r2.status })
      if (prevKey === undefined) delete process.env.NVIDIA_API_KEY
      else process.env.NVIDIA_API_KEY = prevKey
    } finally {
      if (prevGlobal === undefined) delete process.env.AI_GLOBAL_DAILY_REQUEST_LIMIT
      else process.env.AI_GLOBAL_DAILY_REQUEST_LIMIT = prevGlobal
    }

    process.env.AI_EMERGENCY_DISABLE = 'true'
    const rEmerg = await cvGet(new Request('http://localhost/api/chat/cv', { headers: { 'x-vercel-forwarded-for': '198.51.100.203' } }))
    delete process.env.AI_EMERGENCY_DISABLE
    check('emergency-switch: AI_EMERGENCY_DISABLE=true returns 503', rEmerg.status === 503, rEmerg.status)
  }

  // 14. Fail-closed when Redis is unavailable in fail-closed mode
  {
    const prevFailClosed = process.env.AIHUB_FAIL_CLOSED
    const prevRedisUrl = process.env.UPSTASH_REDIS_REST_URL
    process.env.AIHUB_FAIL_CLOSED = '1'
    delete process.env.UPSTASH_REDIS_REST_URL
    try {
      const rFailClosed = await cvGet(
        new Request('http://localhost/api/chat/cv', {
          headers: { 'x-vercel-forwarded-for': '198.51.100.210' },
        })
      )
      check('fail-closed: missing Redis in fail-closed mode returns 503 (never silent bypass)', rFailClosed.status === 503, rFailClosed.status)
    } finally {
      if (prevFailClosed === undefined) delete process.env.AIHUB_FAIL_CLOSED
      else process.env.AIHUB_FAIL_CLOSED = prevFailClosed
      if (prevRedisUrl !== undefined) process.env.UPSTASH_REDIS_REST_URL = prevRedisUrl
    }
  }

  // 15. Bot protection blocks automated scraper UAs on AI POST endpoints
  {
    const rCurlChat = await chatPost(
      new Request('http://localhost/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'user-agent': 'curl/8.4.0', 'x-vercel-forwarded-for': '198.51.100.220' },
        body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
      })
    )
    const rPyGoal = await goalPost(
      new Request('http://localhost/api/goal-match', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'user-agent': 'python-requests/2.31.0', 'x-vercel-forwarded-for': '198.51.100.221' },
        body: JSON.stringify({ goal: 'video editor' }),
      })
    )
    check('bot-guard: blocks curl/python-requests on AI POST routes with 403', rCurlChat.status === 403 && rPyGoal.status === 403, { chat: rCurlChat.status, goal: rPyGoal.status })
  }

  // 16. SEO crawler compatibility: robots.ts preserves Googlebot & Bingbot access
  {
    const robots = robotsGet()
    const rules = Array.isArray(robots.rules) ? robots.rules : [robots.rules]
    const allowsRoot = rules.some((r: { allow?: string | string[] }) => r.allow === '/' || (Array.isArray(r.allow) && r.allow.includes('/')))
    check('seo: robots.ts allows root crawling and declares sitemap', allowsRoot && Boolean(robots.sitemap), robots)
  }

  // 17. Lease expiry, reacquisition, renewal, and delayed release safety
  {
    __resetLocalQuotaStoreForTests()
    const specs = [{ key: 'aihunt:test:lease:exp', limit: 1, ttlSeconds: 1 }]
    const leaseA = await acquireConcurrencyLease(specs)
    check('lease: initial acquisition succeeds', leaseA.ok === true, leaseA)
    if (leaseA.ok) {
      const blocked = await acquireConcurrencyLease(specs)
      check('lease: second concurrent request denied while active', !blocked.ok && !blocked.unavailable, blocked)

      const renewed = await leaseA.renew(2)
      check('lease: active lease can renew TTL', renewed === true, renewed)

      // Wait for renewed 2s TTL to expire
      await new Promise((r) => setTimeout(r, 2100))

      const leaseB = await acquireConcurrencyLease(specs)
      check('lease: expired lease allows new request B to acquire', leaseB.ok === true, leaseB)

      // Delayed release of expired leaseA MUST NOT release leaseB!
      await leaseA.release()
      const blockedByB = await acquireConcurrencyLease(specs)
      check('lease: delayed release of expired A does not release active B', !blockedByB.ok && !blockedByB.unavailable, blockedByB)

      // Renewing expired A returns false
      const renewExpiredA = await leaseA.renew(5)
      check('lease: renewing released/expired lease returns false', renewExpiredA === false, renewExpiredA)

      if (leaseB.ok) await leaseB.release()
    }
  }

  // 18. Idempotent CV reservations: duplicate refunds & committed reservations are no-ops
  {
    __resetLocalQuotaStoreForTests()
    const id = resolveVisitorIdentity(new Request('http://localhost/api/chat/cv', { headers: { 'x-vercel-forwarded-for': '198.51.100.230' } }))
    const now = new Date('2026-11-20T12:00:00Z')
    const res1 = await reserveCvMonthlyQuota(id, now)
    const res2 = await reserveCvMonthlyQuota(id, now)
    check('cv-res: two reservations succeed with distinct IDs', res1.ok && res2.ok && res1.reservationId !== res2.reservationId)
    if (res1.ok && res2.ok) {
      await commitCvMonthlyQuota(res1.reservationId)
      const refundCommitted = await refundCvMonthlyQuota(id, res1.reservationId, now)
      const refundOnce = await refundCvMonthlyQuota(id, res2.reservationId, now)
      const refundTwice = await refundCvMonthlyQuota(id, res2.reservationId, now)
      const status = await getCvMonthlyQuotaStatus(id, now)
      check(
        'cv-res: committed refund=false, first refund=true, duplicate refund=false (used=1, remaining=2)',
        refundCommitted === false &&
          refundOnce === true &&
          refundTwice === false &&
          status.ok &&
          status.status.used === 1 &&
          status.status.remaining === 2,
        { refundCommitted, refundOnce, refundTwice, status }
      )
    }
  }

  // 19. Shared-IP fairness: distinct devices behind same NAT IP aren't blocked at 3
  {
    __resetLocalQuotaStoreForTests()
    const sharedIp = '203.0.113.77'
    const now = new Date('2026-11-20T12:00:00Z')
    const dev1 = resolveVisitorIdentity(new Request('http://localhost/api/chat/cv', { headers: { 'x-vercel-forwarded-for': sharedIp } }))
    const dev2 = resolveVisitorIdentity(new Request('http://localhost/api/chat/cv', { headers: { 'x-vercel-forwarded-for': sharedIp } }))
    // Exhaust dev1 (3 uploads)
    for (let i = 0; i < 3; i++) await reserveCvMonthlyQuota(dev1, now)
    const dev1Extra = await reserveCvMonthlyQuota(dev1, now)
    const dev2First = await reserveCvMonthlyQuota(dev2, now)
    check(
      'shared-ip: dev1 blocked at 3 while distinct dev2 on same IP still allowed',
      !dev1Extra.ok && dev2First.ok,
      { dev1Extra, dev2First }
    )
  }

  // 20. Production fail-closed ignores AIHUB_ALLOW_MEMORY_FALLBACK=1
  {
    const prevEnv = process.env.VERCEL_ENV
    const prevAllow = process.env.AIHUB_ALLOW_MEMORY_FALLBACK
    process.env.VERCEL_ENV = 'production'
    process.env.AIHUB_ALLOW_MEMORY_FALLBACK = '1'
    try {
      check('prod-fail-closed: AIHUB_ALLOW_MEMORY_FALLBACK=1 ignored in production', isFailClosedMode() === true)
    } finally {
      if (prevEnv === undefined) delete process.env.VERCEL_ENV
      else process.env.VERCEL_ENV = prevEnv
      if (prevAllow === undefined) delete process.env.AIHUB_ALLOW_MEMORY_FALLBACK
      else process.env.AIHUB_ALLOW_MEMORY_FALLBACK = prevAllow
    }
  }

  // 21. Missing or weak AUTH_SECRET / VISITOR_HMAC_SECRET fails safely (503) in fail-closed mode
  {
    const prevFail = process.env.AIHUB_FAIL_CLOSED
    const prevAuth = process.env.AUTH_SECRET
    const prevVis = process.env.VISITOR_HMAC_SECRET
    process.env.AIHUB_FAIL_CLOSED = '1'
    process.env.AUTH_SECRET = 'too-short'
    delete process.env.VISITOR_HMAC_SECRET
    try {
      const rWeak = await cvGet(new Request('http://localhost/api/chat/cv', { headers: { 'x-vercel-forwarded-for': '198.51.100.240' } }))
      check('secret-guard: weak AUTH_SECRET in fail-closed mode returns 503', rWeak.status === 503, rWeak.status)
    } finally {
      if (prevFail === undefined) delete process.env.AIHUB_FAIL_CLOSED
      else process.env.AIHUB_FAIL_CLOSED = prevFail
      if (prevAuth === undefined) delete process.env.AUTH_SECRET
      else process.env.AUTH_SECRET = prevAuth
      if (prevVis === undefined) delete process.env.VISITOR_HMAC_SECRET
      else process.env.VISITOR_HMAC_SECRET = prevVis
    }
  }

  // 22. Redis network error fails closed with 503 in fail-closed mode
  {
    const prevFail = process.env.AIHUB_FAIL_CLOSED
    const prevUrl = process.env.UPSTASH_REDIS_REST_URL
    const prevTok = process.env.UPSTASH_REDIS_REST_TOKEN
    const prevFetch = globalThis.fetch
    process.env.AIHUB_FAIL_CLOSED = '1'
    process.env.UPSTASH_REDIS_REST_URL = 'https://mock-upstash.invalid'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'mock-token'
    globalThis.fetch = (async () => {
      throw new Error('ECONNREFUSED')
    }) as typeof fetch
    try {
      const rErr = await cvGet(new Request('http://localhost/api/chat/cv', { headers: { 'x-vercel-forwarded-for': '198.51.100.241' } }))
      check('redis-error: unreachable Upstash in fail-closed mode returns 503', rErr.status === 503, rErr.status)
    } finally {
      globalThis.fetch = prevFetch
      if (prevFail === undefined) delete process.env.AIHUB_FAIL_CLOSED
      else process.env.AIHUB_FAIL_CLOSED = prevFail
      if (prevUrl === undefined) delete process.env.UPSTASH_REDIS_REST_URL
      else process.env.UPSTASH_REDIS_REST_URL = prevUrl
      if (prevTok === undefined) delete process.env.UPSTASH_REDIS_REST_TOKEN
      else process.env.UPSTASH_REDIS_REST_TOKEN = prevTok
    }
  }

  // 23. Turnstile client compatibility & header/origin hardening
  {
    __resetLocalQuotaStoreForTests()
    const prevSecret = process.env.TURNSTILE_SECRET_KEY
    const prevSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    const prevMode = process.env.TURNSTILE_MODE
    const prevKey = process.env.NVIDIA_API_KEY
    process.env.NVIDIA_API_KEY = ''

    try {
      // Case A: TURNSTILE_SECRET_KEY set without NEXT_PUBLIC_TURNSTILE_SITE_KEY -> does not break legit requests
      process.env.TURNSTILE_SECRET_KEY = 'secret-only'
      delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
      const rNoSiteKey = await chatPost(
        new Request('http://localhost/api/chat', {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'user-agent': BROWSER_UA, 'x-vercel-forwarded-for': '198.51.100.242' },
          body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
        })
      )
      check('turnstile: secret without site key does not break legitimate chat', rNoSiteKey.status !== 403, rNoSiteKey.status)

      // Case B: Both keys set + TURNSTILE_MODE=risk -> browser headers pass without token; risky missing sec-fetch-site gets 403
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = 'site-key'
      process.env.TURNSTILE_MODE = 'risk'
      const rBrowserRisk = await chatPost(
        new Request('http://localhost/api/chat', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'user-agent': BROWSER_UA,
            'sec-fetch-site': 'same-origin',
            'accept-language': 'en-US,en;q=0.9',
            'x-vercel-forwarded-for': '198.51.100.243',
          },
          body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
        })
      )
      const rBotRisk = await chatPost(
        new Request('http://localhost/api/chat', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'user-agent': BROWSER_UA,
            'x-vercel-forwarded-for': '198.51.100.244',
          },
          body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
        })
      )
      check(
        'turnstile-risk: same-origin browser passes; missing sec-fetch-site/accept-language challenged (403)',
        rBrowserRisk.status !== 403 && rBotRisk.status === 403,
        { rBrowserRisk: rBrowserRisk.status, rBotRisk: rBotRisk.status }
      )

      // Case C: Cross-site or Origin mismatch blocked with 403
      const rCrossSite = await chatPost(
        new Request('http://localhost/api/chat', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'user-agent': BROWSER_UA,
            'sec-fetch-site': 'cross-site',
            'x-vercel-forwarded-for': '198.51.100.245',
          },
          body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
        })
      )
      const rOriginMismatch = await goalPost(
        new Request('http://localhost/api/goal-match', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'user-agent': BROWSER_UA,
            host: 'www.aihubtools.ma',
            origin: 'https://evil.example',
            'x-vercel-forwarded-for': '198.51.100.246',
          },
          body: JSON.stringify({ goal: 'video editor' }),
        })
      )
      check('bot-guard: blocks cross-site and origin mismatch with 403', rCrossSite.status === 403 && rOriginMismatch.status === 403, { rCrossSite: rCrossSite.status, rOriginMismatch: rOriginMismatch.status })
    } finally {
      if (prevSecret === undefined) delete process.env.TURNSTILE_SECRET_KEY
      else process.env.TURNSTILE_SECRET_KEY = prevSecret
      if (prevSiteKey === undefined) delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
      else process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = prevSiteKey
      if (prevMode === undefined) delete process.env.TURNSTILE_MODE
      else process.env.TURNSTILE_MODE = prevMode
      if (prevKey === undefined) delete process.env.NVIDIA_API_KEY
      else process.env.NVIDIA_API_KEY = prevKey
    }
  }

  console.log(`\n${passed} passed, ${failed} failed`)
  if (failed > 0) process.exit(1)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
