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
//   /offers/edu/<college>    → the EDU master guide (thin-template
//                              consolidation, audit §6.8)
//
// The slug maps are generated at build time by scripts/gen-legacy-redirects.mjs
// so the middleware stays a fast, dependency-free lookup.
// ============================================================

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import legacy from '@/lib/legacy-redirects.json'
import { GUIDES_ENABLED } from '@/lib/guides'

const MAPS: Record<string, Record<string, string>> = {
  tools: legacy.tools,
  'dev-tools': legacy.devtools,
  courses: legacy.courses,
  offers: legacy.offers,
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Disabled /guides section: real 404 at the routing layer. (Calling
  // notFound() inside the statically-prerenderable guides pages produced an
  // HTTP 200 soft-404 instead.) Remove when GUIDES_ENABLED flips true.
  if (!GUIDES_ENABLED && (pathname === '/guides' || pathname.startsWith('/guides/'))) {
    return new NextResponse('Not Found', { status: 404 })
  }

  // Legacy /categories/<cat> → section listing.
  const catMatch = /^\/categories\/([^/]+)\/?$/.exec(pathname)
  if (catMatch) {
    const raw = catMatch[1] ?? ''
    const target = (legacy.categories as Record<string, string>)[decodeURIComponent(raw)]
    if (target) return NextResponse.redirect(new URL(target, request.url), 308)
    return NextResponse.redirect(new URL('/tools', request.url), 308)
  }

  // Thin EDU college templates → the comprehensive master guide (audit §6.8).
  // The master guide itself passes through untouched.
  const eduMatch = /^\/offers\/edu\/([^/]+)\/?$/.exec(pathname)
  if (eduMatch) {
    const slug = decodeURIComponent(eduMatch[1] ?? '')
    const colleges = legacy.eduColleges as string[]
    if (slug !== legacy.eduMaster && colleges.includes(slug)) {
      return NextResponse.redirect(new URL(`/offers/edu/${legacy.eduMaster}`, request.url), 308)
    }
    return NextResponse.next()
  }

  // Legacy one-segment slugs: exactly /<section>/<slug> (two segments).
  // Exception: /tools/<category> are real hub pages (audit §8) and pass
  // through. The only slug/category collision is 'seo' (a tool slug AND a
  // category): the hub wins; that tool stays reachable at its canonical URL.
  //
  // NOTE on statuses: page-level redirect()/notFound() calls on routes that
  // export generateStaticParams are served as HTTP 200 (meta-refresh / baked
  // not-found UI), even for on-demand params. So the middleware below is the
  // status-code authority for catalogue URLs: real 308s for legacy/renamed
  // links, real 404s for unknown slugs (audit §14). Page components keep
  // their fallbacks for safety.
  const m = /^\/(tools|dev-tools|courses|offers)\/([^/]+)\/?$/.exec(pathname)
  if (m) {
    const section = m[1] as string
    const slug = decodeURIComponent(m[2] ?? '')
    if (section === 'tools') {
      if (legacy.toolCategories.includes(slug)) return NextResponse.next()
      const category = (legacy.tools as Record<string, string>)[slug]
      if (category) return NextResponse.redirect(new URL(`/tools/${category}/${slug}`, request.url), 308)
      return NextResponse.redirect(new URL('/tools', request.url), 308)
    }
    const cats =
      section === 'dev-tools' ? legacy.devCategories
      : section === 'courses' ? legacy.courseCategories
      : legacy.offerCategories
    if (cats.includes(slug)) return NextResponse.next()
    const category = MAPS[section]?.[slug]
    if (category) return NextResponse.redirect(new URL(`/${section}/${category}/${slug}`, request.url), 308)
    return new NextResponse('Not Found', { status: 404 })
  }

  // Detail pages: /<section>/<category>/<slug>. Unknown slugs are 404s;
  // right-slug-wrong-category links 308 to the canonical URL.
  const d = /^\/(tools|dev-tools|courses|offers)\/([^/]+)\/([^/]+)\/?$/.exec(pathname)
  if (d) {
    const section = d[1] as string
    const category = decodeURIComponent(d[2] ?? '')
    const slug = decodeURIComponent(d[3] ?? '')
    const canonical = MAPS[section]?.[slug]
    if (!canonical) return new NextResponse('Not Found', { status: 404 })
    if (canonical !== category) {
      return NextResponse.redirect(new URL(`/${section}/${canonical}/${slug}`, request.url), 308)
    }
    return NextResponse.next()
  }

  // edittools has no category routes: known repo → page, else 404.
  const e = /^\/edittools\/([^/]+)\/?$/.exec(pathname)
  if (e) {
    const slug = decodeURIComponent(e[1] ?? '')
    if ((legacy.repos as Record<string, string>)[slug]) return NextResponse.next()
    return new NextResponse('Not Found', { status: 404 })
  }

  return NextResponse.next()
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
    '/edittools',
    '/edittools/:path*',
    '/categories',
    '/categories/:path*',
    '/guides',
    '/guides/:path*',
  ],
}
