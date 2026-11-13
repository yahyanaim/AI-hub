/**
 * Security & contract tests for /api/chat/cv, /api/auth/admin-login,
 * and shared IP/rate-limit helpers.
 *
 * Run: npm run test:api
 */

import { NextRequest } from 'next/server'
import { POST as cvPost } from '../app/api/chat/cv/route'
import { POST as adminLoginPost } from '../app/api/auth/admin-login/route'
import { getClientIp } from '../lib/server/rate-limit'

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

async function run() {
  // 1. getClientIp header precedence
  {
    const req1 = new Request('http://localhost/test', {
      headers: {
        'x-vercel-forwarded-for': '203.0.113.10, 10.0.0.1',
        'x-forwarded-for': '198.51.100.99',
        'x-real-ip': '192.0.2.5',
      },
    })
    check('ip: prefers x-vercel-forwarded-for over spoofable headers', getClientIp(req1) === '203.0.113.10', getClientIp(req1))

    const req2 = new Request('http://localhost/test', {
      headers: { 'x-forwarded-for': '198.51.100.42, 10.0.0.2' },
    })
    check('ip: falls back to first x-forwarded-for entry', getClientIp(req2) === '198.51.100.42', getClientIp(req2))

    const req3 = new Request('http://localhost/test', {
      headers: { 'x-real-ip': '192.0.2.5' },
    })
    check('ip: falls back to x-real-ip', getClientIp(req3) === '192.0.2.5', getClientIp(req3))
  }

  // 2. /api/chat/cv contract & magic-header validation
  {
    const ip = '198.51.100.11'
    const makeCvReq = (file?: File, reqIp = ip) => {
      const form = new FormData()
      if (file) form.append('file', file)
      return new Request('http://localhost/api/chat/cv', {
        method: 'POST',
        headers: {
          'x-vercel-forwarded-for': reqIp,
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X) AIHubTest/1.0',
        },
        body: form,
      })
    }

    const rMissing = await cvPost(makeCvReq())
    check('cv: missing file → 400', rMissing.status === 400, rMissing.status)

    const rBadExt = await cvPost(makeCvReq(new File(['hello world'], 'malware.exe', { type: 'application/octet-stream' })))
    check('cv: unsupported extension → 415', rBadExt.status === 415, rBadExt.status)

    const rSpoofPdf = await cvPost(makeCvReq(new File(['NOT_A_PDF_HEADER_PAYLOAD'], 'fake.pdf', { type: 'application/pdf' })))
    check('cv: spoofed PDF without %PDF- magic header → 415', rSpoofPdf.status === 415, rSpoofPdf.status)

    const rShortTxt = await cvPost(makeCvReq(new File(['too short'], 'cv.txt', { type: 'text/plain' })))
    check('cv: short text under 40 chars → 422', rShortTxt.status === 422, rShortTxt.status)

    const validCvText = 'Senior Software Engineer with 6 years building TypeScript, React, Next.js, and distributed APIs.'
    const rValid = await cvPost(makeCvReq(new File([validCvText], 'resume.txt', { type: 'text/plain' })))
    const validData = await rValid.json()
    check('cv: valid .txt CV → 200 with extracted text', rValid.status === 200 && validData.text === validCvText, validData)

    // Exhaust per-minute abuse limit with malformed uploads (refunds monthly quota, triggers 429 at 11th)
    for (let i = 0; i < 5; i++) {
      await cvPost(makeCvReq(new File(['too short'], 'cv.txt', { type: 'text/plain' })))
    }
    const rRateLimited = await cvPost(makeCvReq(new File(['too short'], 'cv.txt', { type: 'text/plain' })))
    check('cv: 11th upload from same IP → 429 rate limited', rRateLimited.status === 429, rRateLimited.status)
  }

  // 3. /api/auth/admin-login contract, timingSafeEqual, & rate limiting
  {
    const prevEmail = process.env.ADMIN_EMAIL
    const prevPassword = process.env.ADMIN_PASSWORD
    const prevSecret = process.env.AUTH_SECRET

    try {
      delete process.env.ADMIN_EMAIL
      delete process.env.ADMIN_PASSWORD
      delete process.env.AUTH_SECRET

      const rUnconfigured = await adminLoginPost(
        new NextRequest('http://localhost/api/auth/admin-login', {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-vercel-forwarded-for': '203.0.113.50' },
          body: JSON.stringify({ email: 'a@b.com', password: 'pw' }),
        })
      )
      check('admin-login: missing env vars → 503', rUnconfigured.status === 503, rUnconfigured.status)

      process.env.ADMIN_EMAIL = 'admin@aihubtools.ma'
      process.env.ADMIN_PASSWORD = 'correct-horse-battery-staple'
      process.env.AUTH_SECRET = '0123456789abcdef0123456789abcdef'

      const ip = '203.0.113.51'
      const postLogin = (body: string) =>
        adminLoginPost(
          new NextRequest('http://localhost/api/auth/admin-login', {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'x-vercel-forwarded-for': ip },
            body,
          })
        )

      const rBadJson = await postLogin('{not-json')
      check('admin-login: malformed JSON → 400', rBadJson.status === 400, rBadJson.status)

      const rWrongPass = await postLogin(JSON.stringify({ email: 'admin@aihubtools.ma', password: 'wrong' }))
      check('admin-login: wrong password → 401', rWrongPass.status === 401, rWrongPass.status)

      const rWrongEmail = await postLogin(JSON.stringify({ email: 'other@aihubtools.ma', password: 'correct-horse-battery-staple' }))
      check('admin-login: wrong email → 401', rWrongEmail.status === 401, rWrongEmail.status)

      const rSuccess = await postLogin(JSON.stringify({ email: '  ADMIN@aihubtools.ma ', password: 'correct-horse-battery-staple' }))
      const setCookie = rSuccess.headers.get('set-cookie') ?? ''
      check('admin-login: valid credentials → 200 + HttpOnly cookie', rSuccess.status === 200 && setCookie.toLowerCase().includes('httponly'), { status: rSuccess.status, setCookie })

      // Exhaust remaining attempts (3 counted above out of 10)
      for (let i = 0; i < 7; i++) {
        await postLogin(JSON.stringify({ email: 'admin@aihubtools.ma', password: 'wrong' }))
      }
      const rLocked = await postLogin(JSON.stringify({ email: 'admin@aihubtools.ma', password: 'correct-horse-battery-staple' }))
      check('admin-login: 11th attempt from same IP → 429 rate limited', rLocked.status === 429, rLocked.status)
    } finally {
      if (prevEmail === undefined) delete process.env.ADMIN_EMAIL
      else process.env.ADMIN_EMAIL = prevEmail
      if (prevPassword === undefined) delete process.env.ADMIN_PASSWORD
      else process.env.ADMIN_PASSWORD = prevPassword
      if (prevSecret === undefined) delete process.env.AUTH_SECRET
      else process.env.AUTH_SECRET = prevSecret
    }
  }

  console.log(`\n${passed} passed, ${failed} failed`)
  if (failed > 0) process.exit(1)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
