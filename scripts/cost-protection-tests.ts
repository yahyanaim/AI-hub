/**
 * Comprehensive Cost Protection, Quota, Identity, Anti-Bot & Fail-Closed Tests.
 * Run: npm run test:cost
 */

import { NextRequest } from 'next/server'
import { GET as chatLockGet, POST as chatLockPost } from '../app/api/admin/chat-lock/route'
import { POST as userLoginPost } from '../app/api/auth/login/route'
import { POST as userLogoutPost } from '../app/api/auth/logout/route'
import { GET as userMeGet } from '../app/api/auth/me/route'
import { GET as cvGet, POST as cvPost } from '../app/api/chat/cv/route'
import { POST as chatPost } from '../app/api/chat/route'
import { POST as goalPost } from '../app/api/goal-match/route'
import { ADMIN_COOKIE, signAdminJwt } from '../lib/server/auth'
import { __resetChatLockForTests } from '../lib/server/chat-lock'
import { __resetMemUsersForTests } from '../lib/server/user-auth'
import {
  __resetLocalQuotaStoreForTests,
  acquireConcurrencyLease,
  atomicCheckAndIncr,
  commitCvMonthlyQuota,
  getCvMonthlyQuotaStatus,
  nextUtcMonthResetIso,
  recoverExpiredCvReservations,
  refundCvMonthlyQuota,
  reserveCvMonthlyQuota,
  utcMonthKey,
} from '../lib/server/quota'
import { __resetTurnstileReplayStoreForTests } from '../lib/server/bot-guard'
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

  // 24. Crash-safe CV reservation recovery, duplicate recovery, ownership, and month boundary
  {
    __resetLocalQuotaStoreForTests()
    const owner = resolveVisitorIdentity(new Request('http://localhost/api/chat/cv', { headers: { 'x-vercel-forwarded-for': '198.51.100.250' } }))
    const other = resolveVisitorIdentity(new Request('http://localhost/api/chat/cv', { headers: { 'x-vercel-forwarded-for': '198.51.100.251' } }))
    const novEnd = new Date('2026-11-30T23:58:00Z')
    const decStart = new Date('2026-12-01T00:05:00Z')

    // Simulate 1 committed upload + 1 crashed/abandoned upload (1s stale window)
    const committed = await reserveCvMonthlyQuota(owner, novEnd, 50)
    const crashed = await reserveCvMonthlyQuota(owner, novEnd, 50)
    if (committed.ok && crashed.ok) {
      // Ownership check: other visitor cannot commit or refund owner's reservation
      const stolenCommit = await commitCvMonthlyQuota(committed.reservationId, other)
      const stolenRefund = await refundCvMonthlyQuota(other, crashed.reservationId, novEnd)
      check('cv-recovery: ownership prevents other visitor commit/refund', !stolenCommit && !stolenRefund, { stolenCommit, stolenRefund })

      // Owner commits first reservation
      const okCommit = await commitCvMonthlyQuota(committed.reservationId, owner)
      // Concurrent refund after commit must be false
      const lateRefund = await refundCvMonthlyQuota(owner, committed.reservationId, novEnd)
      check('cv-recovery: commit succeeds once and blocks subsequent refund', okCommit && !lateRefund)

      // Advance past staleAtMs (50ms) into December -> lazy recovery refunds crashed Nov reservation without touching committed or Dec
      const rec1 = await recoverExpiredCvReservations(decStart.getTime(), 10)
      const rec2 = await recoverExpiredCvReservations(decStart.getTime(), 10)
      const novStatus = await getCvMonthlyQuotaStatus(owner, novEnd)
      const decStatus = await getCvMonthlyQuotaStatus(owner, decStart)
      check(
        'cv-recovery: expired crashed reservation recovered once across month boundary, committed preserved, no negative counters',
        rec1.ok &&
          rec1.recovered === 1 &&
          rec2.ok &&
          rec2.recovered === 0 &&
          novStatus.ok &&
          novStatus.status.used === 1 &&
          novStatus.status.remaining === 2 &&
          decStatus.ok &&
          decStatus.status.used === 0 &&
          decStatus.status.remaining === 3,
        { rec1, rec2, novStatus, decStatus }
      )
    }
  }

  // 25. Concurrent commit and refund on same reservation: at most one wins
  {
    __resetLocalQuotaStoreForTests()
    const id = resolveVisitorIdentity(new Request('http://localhost/api/chat/cv', { headers: { 'x-vercel-forwarded-for': '198.51.100.252' } }))
    const now = new Date('2026-11-20T12:00:00Z')
    const r = await reserveCvMonthlyQuota(id, now)
    if (r.ok) {
      const [cRes, rRes] = await Promise.all([
        commitCvMonthlyQuota(r.reservationId, id),
        refundCvMonthlyQuota(id, r.reservationId, now),
      ])
      check('cv-recovery: concurrent commit and refund resolves exclusively (exactly one true)', cRes !== rRes, { cRes, rRes })
    }
  }

  // 26. Redis outage during commit and refund fails safely (returns false)
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
      const id = resolveVisitorIdentity(new Request('http://localhost/api/chat/cv', { headers: { 'x-vercel-forwarded-for': '198.51.100.253' } }))
      const comOutage = await commitCvMonthlyQuota('res-outage-1', id)
      const refOutage = await refundCvMonthlyQuota(id, 'res-outage-1')
      check('cv-recovery: Redis outage during commit/refund returns false cleanly', comOutage === false && refOutage === false, { comOutage, refOutage })
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

  // 27. Turnstile action binding, hostname verification, and replay prevention
  {
    __resetLocalQuotaStoreForTests()
    __resetTurnstileReplayStoreForTests()
    const prevSecret = process.env.TURNSTILE_SECRET_KEY
    const prevSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    const prevMode = process.env.TURNSTILE_MODE
    const prevKey = process.env.NVIDIA_API_KEY
    const prevFetch = globalThis.fetch

    process.env.TURNSTILE_SECRET_KEY = 'ts-secret'
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = 'ts-site'
    process.env.TURNSTILE_MODE = 'always'
    process.env.NVIDIA_API_KEY = ''

    let mockSiteverify: { success: boolean; action?: string; hostname?: string } = {
      success: true,
      action: 'chat',
      hostname: 'www.aihubtools.ma',
    }
    globalThis.fetch = (async () =>
      new Response(JSON.stringify(mockSiteverify), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })) as typeof fetch

    try {
      // Valid action + hostname succeeds once; replay of same token fails 403
      const rOk = await chatPost(
        new Request('http://localhost/api/chat', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'user-agent': BROWSER_UA,
            host: 'www.aihubtools.ma',
            'x-turnstile-token': 'tok-unique-1',
            'x-vercel-forwarded-for': '198.51.100.254',
          },
          body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
        })
      )
      const rReplay = await chatPost(
        new Request('http://localhost/api/chat', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'user-agent': BROWSER_UA,
            host: 'www.aihubtools.ma',
            'x-turnstile-token': 'tok-unique-1',
            'x-vercel-forwarded-for': '198.51.100.254',
          },
          body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
        })
      )
      check('turnstile-hardening: valid token passes once, replay blocked (403)', rOk.status !== 403 && rReplay.status === 403, { rOk: rOk.status, rReplay: rReplay.status })

      // Cross-endpoint action mismatch rejected (403)
      mockSiteverify = { success: true, action: 'cv', hostname: 'www.aihubtools.ma' }
      const rActionMismatch = await chatPost(
        new Request('http://localhost/api/chat', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'user-agent': BROWSER_UA,
            host: 'www.aihubtools.ma',
            'x-turnstile-token': 'tok-unique-2',
            'x-vercel-forwarded-for': '198.51.100.255',
          },
          body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
        })
      )

      // Hostname mismatch rejected (403)
      mockSiteverify = { success: true, action: 'chat', hostname: 'evil.example' }
      const rHostMismatch = await chatPost(
        new Request('http://localhost/api/chat', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'user-agent': BROWSER_UA,
            host: 'www.aihubtools.ma',
            'x-turnstile-token': 'tok-unique-3',
            'x-vercel-forwarded-for': '198.51.100.255',
          },
          body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
        })
      )
      check(
        'turnstile-hardening: rejects cross-endpoint action mismatch and hostname mismatch (403)',
        rActionMismatch.status === 403 && rHostMismatch.status === 403,
        { rActionMismatch: rActionMismatch.status, rHostMismatch: rHostMismatch.status }
      )
    } finally {
      globalThis.fetch = prevFetch
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

  // 28. Turnstile Redis error classification (claimed -> allow, SET NX null -> 403, Redis error -> 503)
  {
    __resetLocalQuotaStoreForTests()
    __resetTurnstileReplayStoreForTests()
    const prevSecret = process.env.TURNSTILE_SECRET_KEY
    const prevSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    const prevMode = process.env.TURNSTILE_MODE
    const prevFail = process.env.AIHUB_FAIL_CLOSED
    const prevUrl = process.env.UPSTASH_REDIS_REST_URL
    const prevTok = process.env.UPSTASH_REDIS_REST_TOKEN
    const prevKey = process.env.NVIDIA_API_KEY
    const prevFetch = globalThis.fetch

    process.env.TURNSTILE_SECRET_KEY = 'ts-secret'
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = 'ts-site'
    process.env.TURNSTILE_MODE = 'always'
    process.env.AIHUB_FAIL_CLOSED = '1'
    process.env.UPSTASH_REDIS_REST_URL = 'https://mock-upstash.invalid'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'mock-token'
    process.env.NVIDIA_API_KEY = ''

    let redisMode: 'ok' | 'null' | 'error' = 'ok'
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url = String(input)
      if (url.includes('turnstile')) {
        return new Response(JSON.stringify({ success: true, action: 'chat', hostname: 'www.aihubtools.ma' }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      }
      if (redisMode === 'error') {
        throw new Error('ECONNRESET')
      }
      if (redisMode === 'null') {
        return new Response(JSON.stringify([{ result: null }]), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      }
      return new Response(JSON.stringify([{ result: 'OK' }]), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    }) as typeof fetch

    const makeTsReq = (tok: string) =>
      chatPost(
        new Request('http://localhost/api/chat', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'user-agent': BROWSER_UA,
            host: 'www.aihubtools.ma',
            'x-turnstile-token': tok,
            'x-vercel-forwarded-for': '198.51.100.253',
          },
          body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
        })
      )

    try {
      redisMode = 'ok'
      const rClaimed = await makeTsReq('tok-redis-1') // bot-guard passes, then quota Lua returns non-array -> 503 from quota, NOT 403
      redisMode = 'null'
      const rReused = await makeTsReq('tok-redis-2') // SET NX returned null -> MUST be 403
      redisMode = 'error'
      const rRedisDown = await makeTsReq('tok-redis-3') // Redis threw error -> MUST be 503, never 403

      check(
        'turnstile-redis: claimed passes bot-guard (!403), SET NX null -> 403, Redis error -> 503',
        rClaimed.status !== 403 && rReused.status === 403 && rRedisDown.status === 503,
        { rClaimed: rClaimed.status, rReused: rReused.status, rRedisDown: rRedisDown.status }
      )
    } finally {
      globalThis.fetch = prevFetch
      if (prevSecret === undefined) delete process.env.TURNSTILE_SECRET_KEY
      else process.env.TURNSTILE_SECRET_KEY = prevSecret
      if (prevSiteKey === undefined) delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
      else process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = prevSiteKey
      if (prevMode === undefined) delete process.env.TURNSTILE_MODE
      else process.env.TURNSTILE_MODE = prevMode
      if (prevFail === undefined) delete process.env.AIHUB_FAIL_CLOSED
      else process.env.AIHUB_FAIL_CLOSED = prevFail
      if (prevUrl === undefined) delete process.env.UPSTASH_REDIS_REST_URL
      else process.env.UPSTASH_REDIS_REST_URL = prevUrl
      if (prevTok === undefined) delete process.env.UPSTASH_REDIS_REST_TOKEN
      else process.env.UPSTASH_REDIS_REST_TOKEN = prevTok
      if (prevKey === undefined) delete process.env.NVIDIA_API_KEY
      else process.env.NVIDIA_API_KEY = prevKey
    }
  }

  // ---------------------------------------------------------------------------
  // 15. Admin chat lock (401 unauthenticated, 423 when locked, unlock restores)
  // ---------------------------------------------------------------------------
  {
    __resetChatLockForTests()
    const prevAuthSecret = process.env.AUTH_SECRET
    const prevKey = process.env.NVIDIA_API_KEY
    process.env.AUTH_SECRET = 'test-auth-secret-at-least-32-chars-long'
    delete process.env.NVIDIA_API_KEY

    try {
      const unauthGet = await chatLockGet(new NextRequest('http://localhost/api/admin/chat-lock'))
      const unauthPost = await chatLockPost(
        new NextRequest('http://localhost/api/admin/chat-lock', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ locked: true }),
        })
      )
      check(
        'admin-chat-lock: unauthenticated GET & POST return 401',
        unauthGet.status === 401 && unauthPost.status === 401,
        { get: unauthGet.status, post: unauthPost.status }
      )

      const jwt = await signAdminJwt()
      const cookieHeader = `${ADMIN_COOKIE}=${jwt}`

      const lockRes = await chatLockPost(
        new NextRequest('http://localhost/api/admin/chat-lock', {
          method: 'POST',
          headers: { 'content-type': 'application/json', cookie: cookieHeader },
          body: JSON.stringify({ locked: true }),
        })
      )
      const lockBody = (await lockRes.json()) as { ok?: boolean; locked?: boolean }
      const getLocked = await chatLockGet(
        new NextRequest('http://localhost/api/admin/chat-lock', {
          headers: { cookie: cookieHeader },
        })
      )
      const getLockedBody = (await getLocked.json()) as { locked?: boolean }
      check(
        'admin-chat-lock: authenticated admin can lock chat',
        lockRes.status === 200 && lockBody.locked === true && getLockedBody.locked === true,
        { lockStatus: lockRes.status, lockBody, getLockedBody }
      )

      const cvStatusLocked = await cvGet(
        new Request('http://localhost/api/chat/cv', {
          headers: { 'user-agent': BROWSER_UA, 'x-vercel-forwarded-for': '198.51.100.250' },
        })
      )
      const cvStatusLockedBody = (await cvStatusLocked.json()) as { chatLocked?: boolean }

      const chatWhileLocked = await chatPost(
        new Request('http://localhost/api/chat', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'user-agent': BROWSER_UA,
            'x-vercel-forwarded-for': '198.51.100.250',
          },
          body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
        })
      )
      const cvWhileLocked = await cvPost(
        new Request('http://localhost/api/chat/cv', {
          method: 'POST',
          headers: {
            'user-agent': BROWSER_UA,
            'x-vercel-forwarded-for': '198.51.100.250',
          },
        })
      )
      check(
        'admin-chat-lock: locked state blocks /api/chat and /api/chat/cv with 423 & surfaces chatLocked',
        cvStatusLockedBody.chatLocked === true &&
          chatWhileLocked.status === 423 &&
          cvWhileLocked.status === 423,
        {
          chatLocked: cvStatusLockedBody.chatLocked,
          chatStatus: chatWhileLocked.status,
          cvStatus: cvWhileLocked.status,
        }
      )

      const unlockRes = await chatLockPost(
        new NextRequest('http://localhost/api/admin/chat-lock', {
          method: 'POST',
          headers: { 'content-type': 'application/json', cookie: cookieHeader },
          body: JSON.stringify({ locked: false }),
        })
      )
      const cvStatusUnlocked = await cvGet(
        new Request('http://localhost/api/chat/cv', {
          headers: { 'user-agent': BROWSER_UA, 'x-vercel-forwarded-for': '198.51.100.250' },
        })
      )
      const cvStatusUnlockedBody = (await cvStatusUnlocked.json()) as { chatLocked?: boolean }
      const chatWhileUnlocked = await chatPost(
        new Request('http://localhost/api/chat', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'user-agent': BROWSER_UA,
            'x-vercel-forwarded-for': '198.51.100.250',
          },
          body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
        })
      )
      check(
        'admin-chat-lock: unlock restores chat (chatLocked=false and POST /api/chat != 423)',
        unlockRes.status === 200 &&
          cvStatusUnlockedBody.chatLocked === false &&
          chatWhileUnlocked.status !== 423,
        {
          unlockStatus: unlockRes.status,
          chatLocked: cvStatusUnlockedBody.chatLocked,
          chatStatus: chatWhileUnlocked.status,
        }
      )
    } finally {
      __resetChatLockForTests()
      if (prevAuthSecret === undefined) delete process.env.AUTH_SECRET
      else process.env.AUTH_SECRET = prevAuthSecret
      if (prevKey === undefined) delete process.env.NVIDIA_API_KEY
      else process.env.NVIDIA_API_KEY = prevKey
    }
  }

  // ---------------------------------------------------------------------------
  // 16. Cross-browser account quota (user auth + aihunt_user session cookie)
  // ---------------------------------------------------------------------------
  {
    __resetLocalQuotaStoreForTests()
    __resetMemUsersForTests()
    const prevAuthSecret = process.env.AUTH_SECRET
    process.env.AUTH_SECRET = 'test-auth-secret-at-least-32-chars-long'

    try {
      const signupRes = await userLoginPost(
        new NextRequest('http://localhost/api/auth/login', {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-vercel-forwarded-for': '198.51.100.240' },
          body: JSON.stringify({ username: 'cross_user', password: 'password123', mode: 'signup' }),
        })
      )
      const allSetCookies = signupRes.headers.get('set-cookie') || ''
      const userMatch = allSetCookies.match(/aihunt_user=[^;]+/)
      const userCookie = userMatch ? userMatch[0] : ''
      const vidMatch = allSetCookies.match(/aihunt_vid=[^;]+/)
      const vidCookie = vidMatch ? vidMatch[0] : ''
      const sameDeviceSecondAccount = await userLoginPost(
        new NextRequest('http://localhost/api/auth/login', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-vercel-forwarded-for': '198.51.100.240',
            cookie: vidCookie,
          },
          body: JSON.stringify({ username: 'cross_user_2', password: 'password123', mode: 'signup' }),
        })
      )
      const dupSignup = await userLoginPost(
        new NextRequest('http://localhost/api/auth/login', {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-vercel-forwarded-for': '198.51.100.240' },
          body: JSON.stringify({ username: 'cross_user', password: 'password123', mode: 'signup' }),
        })
      )
      const wrongPass = await userLoginPost(
        new NextRequest('http://localhost/api/auth/login', {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-vercel-forwarded-for': '198.51.100.240' },
          body: JSON.stringify({ username: 'cross_user', password: 'wrong-password', mode: 'login' }),
        })
      )
      const meRes = await userMeGet(
        new Request('http://localhost/api/auth/me', { headers: { cookie: userCookie } })
      )
      const meBody = (await meRes.json()) as { user?: { username: string } | null }
      check(
        'user-auth: signup, 1-account-per-device 409, duplicate 409, wrong password 401, and /api/auth/me',
        signupRes.status === 200 &&
          allSetCookies.includes('aihunt_user=') &&
          vidCookie.startsWith('aihunt_vid=') &&
          sameDeviceSecondAccount.status === 409 &&
          dupSignup.status === 409 &&
          wrongPass.status === 401 &&
          meBody.user?.username === 'cross_user',
        {
          signup: signupRes.status,
          sameDevice: sameDeviceSecondAccount.status,
          dup: dupSignup.status,
          wrong: wrongPass.status,
          meBody,
        }
      )

      // Browser A (IP 198.51.100.241) uploads 1 CV -> remaining=2
      const uploadAs = async (ipAddr: string, cookieHeader: string) => {
        const form = new FormData()
        form.append('file', new File([VALID_CV_TEXT], 'cv.txt', { type: 'text/plain' }))
        return cvPost(
          new Request('http://localhost/api/chat/cv', {
            method: 'POST',
            headers: {
              'user-agent': BROWSER_UA,
              'x-vercel-forwarded-for': ipAddr,
              cookie: cookieHeader,
            },
            body: form,
          })
        )
      }

      const b1Upload1 = await uploadAs('198.51.100.241', userCookie)
      const b1Body1 = (await b1Upload1.json()) as { quota?: { remaining: number } }

      // Browser B (new browser, different IP 198.51.100.242, NO aihunt_vid, signs into same account)
      const loginB2 = await userLoginPost(
        new NextRequest('http://localhost/api/auth/login', {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-vercel-forwarded-for': '198.51.100.242' },
          body: JSON.stringify({ username: 'cross_user', password: 'password123', mode: 'login' }),
        })
      )
      const cookieB2Match = (loginB2.headers.get('set-cookie') || '').match(/aihunt_user=[^;]+/)
      const cookieB2 = cookieB2Match ? cookieB2Match[0] : ''
      const b2Status = await cvGet(
        new Request('http://localhost/api/chat/cv', {
          headers: { 'x-vercel-forwarded-for': '198.51.100.242', cookie: cookieB2 },
        })
      )
      const b2StatusBody = (await b2Status.json()) as { remaining?: number }

      const b2Upload2 = await uploadAs('198.51.100.242', cookieB2)
      const b2Upload3 = await uploadAs('198.51.100.242', cookieB2)
      const b1Upload4 = await uploadAs('198.51.100.241', userCookie)

      check(
        'cross-browser-quota: Browser B inherits remaining=2 and 4th upload across browsers is 429',
        b1Upload1.status === 200 &&
          b1Body1.quota?.remaining === 2 &&
          b2StatusBody.remaining === 2 &&
          b2Upload2.status === 200 &&
          b2Upload3.status === 200 &&
          b1Upload4.status === 429,
        {
          b1Remaining: b1Body1.quota?.remaining,
          b2Remaining: b2StatusBody.remaining,
          u2: b2Upload2.status,
          u3: b2Upload3.status,
          u4: b1Upload4.status,
        }
      )

      const logoutRes = await userLogoutPost()
      const clearedCookie = logoutRes.headers.get('set-cookie') || ''
      check(
        'user-auth: logout clears aihunt_user cookie',
        logoutRes.status === 200 && clearedCookie.includes('aihunt_user=') && clearedCookie.includes('Max-Age=0'),
        { status: logoutRes.status, clearedCookie }
      )
    } finally {
      __resetLocalQuotaStoreForTests()
      __resetMemUsersForTests()
      if (prevAuthSecret === undefined) delete process.env.AUTH_SECRET
      else process.env.AUTH_SECRET = prevAuthSecret
    }
  }

  // ---------------------------------------------------------------------------
  // 17. Legacy display name ("Yahia Naim" -> yahianaim), safe claim & admin separation
  // ---------------------------------------------------------------------------
  {
    __resetLocalQuotaStoreForTests()
    __resetMemUsersForTests()
    const prevAuthSecret = process.env.AUTH_SECRET
    process.env.AUTH_SECRET = 'test-auth-secret-at-least-32-chars-long'

    try {
      const unmigratedLogin = await userLoginPost(
        new NextRequest('http://localhost/api/auth/login', {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-vercel-forwarded-for': '198.51.100.245' },
          body: JSON.stringify({ username: 'Yahia Naim', password: 'admin-password-1', mode: 'login' }),
        })
      )
      const unmigratedBody = (await unmigratedLogin.json()) as { code?: string }
      check(
        'legacy-auth: unmigrated "Yahia Naim" login returns 404 account-not-migrated',
        unmigratedLogin.status === 404 && unmigratedBody.code === 'account-not-migrated',
        { status: unmigratedLogin.status, unmigratedBody }
      )

      // Simulate device already having created a test account first
      const firstAcct = await userLoginPost(
        new NextRequest('http://localhost/api/auth/login', {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-vercel-forwarded-for': '198.51.100.245' },
          body: JSON.stringify({ username: 'test_dev_user', password: 'password123', mode: 'signup' }),
        })
      )
      const vidMatch = (firstAcct.headers.get('set-cookie') || '').match(/aihunt_vid=[^;]+/)
      const vidCookie = vidMatch ? vidMatch[0] : ''

      // Admin with valid aihunt_admin cookie can still claim "Yahia Naim" -> yahianaim
      const adminJwt = await signAdminJwt()
      const adminCookie = `${ADMIN_COOKIE}=${adminJwt}`
      const claimRes = await userLoginPost(
        new NextRequest('http://localhost/api/auth/login', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-vercel-forwarded-for': '198.51.100.245',
            cookie: `${vidCookie}; ${adminCookie}`,
          },
          body: JSON.stringify({ username: 'Yahia Naim', password: 'yahia-secret-pass', mode: 'signup' }),
        })
      )
      const claimBody = (await claimRes.json()) as Record<string, unknown> & {
        user?: { username: string; displayName: string }
      }
      const claimCookies = claimRes.headers.get('set-cookie') || ''
      const yahiaUserCookie = (claimCookies.match(/aihunt_user=[^;]+/) || [''])[0]

      // Duplicate signup for yahianaim MUST NOT overwrite existing password (returns 409)
      const overwriteAttempt = await userLoginPost(
        new NextRequest('http://localhost/api/auth/login', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-vercel-forwarded-for': '198.51.100.245',
            cookie: adminCookie,
          },
          body: JSON.stringify({ username: 'Yahia Naim', password: 'new-password-hack', mode: 'signup' }),
        })
      )

      // /api/auth/me preserves displayName "Yahia Naim" and normalized username "yahianaim"
      const meRes = await userMeGet(
        new Request('http://localhost/api/auth/me', { headers: { cookie: yahiaUserCookie } })
      )
      const meBody = (await meRes.json()) as Record<string, unknown> & {
        user?: { username: string; displayName: string }
      }

      // Admin endpoint still requires aihunt_admin (aihunt_user alone is 401; aihunt_admin is 200)
      const adminLockUserOnly = await chatLockGet(
        new NextRequest('http://localhost/api/admin/chat-lock', {
          headers: { cookie: yahiaUserCookie },
        })
      )
      const adminLockWithAdmin = await chatLockGet(
        new NextRequest('http://localhost/api/admin/chat-lock', {
          headers: { cookie: `${yahiaUserCookie}; ${adminCookie}` },
        })
      )

      check(
        'legacy-auth: "Yahia Naim" normalizes to yahianaim, preserves displayName, blocks overwrite, keeps admin separate',
        claimRes.status === 200 &&
          claimBody.user?.username === 'yahianaim' &&
          claimBody.user?.displayName === 'Yahia Naim' &&
          !('passwordHash' in claimBody) &&
          !('salt' in claimBody) &&
          overwriteAttempt.status === 409 &&
          meBody.user?.username === 'yahianaim' &&
          meBody.user?.displayName === 'Yahia Naim' &&
          adminLockUserOnly.status === 401 &&
          adminLockWithAdmin.status === 200,
        {
          claimStatus: claimRes.status,
          claimBody,
          overwriteStatus: overwriteAttempt.status,
          meBody,
          adminLockUserOnly: adminLockUserOnly.status,
          adminLockWithAdmin: adminLockWithAdmin.status,
        }
      )
    } finally {
      __resetLocalQuotaStoreForTests()
      __resetMemUsersForTests()
      if (prevAuthSecret === undefined) delete process.env.AUTH_SECRET
      else process.env.AUTH_SECRET = prevAuthSecret
    }
  }

  console.log(`\n${passed} passed, ${failed} failed`)
  if (failed > 0) process.exit(1)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
