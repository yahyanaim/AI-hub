import { NextResponse } from 'next/server'
import { recordPageview } from '@/lib/server/admin-metrics'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const fetchSite = req.headers.get('sec-fetch-site')
    if (fetchSite && fetchSite !== 'same-origin' && fetchSite !== 'same-site' && fetchSite !== 'none') {
      return new NextResponse(null, { status: 204 })
    }

    const body = (await req.json().catch(() => null)) as { path?: unknown } | null
    const path = typeof body?.path === 'string' ? body.path : ''
    if (path) {
      await recordPageview(path)
    }
  } catch {
    // Non-blocking analytics — never break user navigation
  }
  return new NextResponse(null, { status: 204 })
}
