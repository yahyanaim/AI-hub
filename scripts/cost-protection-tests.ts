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
  getCvMonthlyQuotaStatus,
  nextUtcMonthResetIso,
  refundCvMonthlyQuota,
  reserveCvMonthlyQuota,
  utcMonthKey,
} from '../lib/server/quota'
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

    // 6. Cookie deletion / new device on same IP cannot bypass IP quota
    const rNewCookie = await cvPost(
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
    check('cv-quota: cookie deletion on same IP still blocked (429)', rNewCookie.status === 429, rNewCookie.status)

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
    await reserveCvMonthlyQuota(id, nov)
    await reserveCvMonthlyQuota(id, nov)
    await reserveCvMonthlyQuota(id, nov)
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
    await refundCvMonthlyQuota(id, nov)
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

  console.log(`\n${passed} passed, ${failed} failed`)
  if (failed > 0) process.exit(1)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
