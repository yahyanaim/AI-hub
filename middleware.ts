// ============================================================
// Legacy-URL redirects — real 308s for old one-segment URLs.
//
// Background: statically-rendered redirect() calls in the App Router are
// prerendered as HTTP 200 pages with a 1-second <meta http-equiv="refresh">
// instead of genuine 3xx responses. AI crawlers do not follow meta refresh,
// and Google passes signals weakly compared to a 301/308. This middleware
// returns proper 308 (Permanent Redirect) responses for:
//
//   /tools/<slug>          → /tools/<category>/<slug>
//   /dev-tools/<slug>      → /dev-tools/<category>/<slug>
//   /courses/<slug>        → /courses/<category>/<slug>
//   /offers/<slug>         → /offers/<category>/<slug>
//   /categories/<category> → section listing (mirrors the old mapping)
//
// The slug maps are generated at build time by scripts/gen-legacy-redirects.mjs
// so the middleware stays a fast, dependency-free lookup.
// ============================================================

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import legacy from '@/lib/legacy-redirects.json'

const MAPS: Record<string, Record<string, string>> = {
  tools: legacy.tools,
  'dev-tools': legacy.devtools,
  courses: legacy.courses,
  offers: legacy.offers,
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Legacy /categories/<cat> → section listing.
  const catMatch = /^\/categories\/([^/]+)\/?$/.exec(pathname)
  if (catMatch) {
    const raw = catMatch[1] ?? ''
    const target = (legacy.categories as Record<string, string>)[decodeURIComponent(raw)]
    if (target) return NextResponse.redirect(new URL(target, request.url), 308)
    return NextResponse.redirect(new URL('/tools', request.url), 308)
  }

  // Legacy one-segment slugs: exactly /<section>/<slug> (two segments).
  const m = /^\/(tools|dev-tools|courses|offers)\/([^/]+)\/?$/.exec(pathname)
  if (!m) return NextResponse.next()
  const section = m[1] as 'tools' | 'dev-tools' | 'courses' | 'offers'
  const slug = decodeURIComponent(m[2] ?? '')
  const category = MAPS[section]?.[slug]
  if (!category) return NextResponse.next()
  return NextResponse.redirect(new URL(`/${section}/${category}/${slug}`, request.url), 308)
}

export const config = {
  // Run on probable one-segment legacy paths. Matchers must cover the
  // two-segment shapes too (e.g. '/tools/:slug*'), because a matcher like
  // '/tools/:slug' also matches plain '/tools' itself. The middleware body
  // double-checks the exact shape before redirecting, so /tools etc. pass
  // through untouched.
  matcher: [
    '/tools',
    '/tools/:path*',
    '/dev-tools',
    '/dev-tools/:path*',
    '/courses',
    '/courses/:path*',
    '/offers',
    '/offers/:path*',
    '/categories',
    '/categories/:path*',
  ],
}
