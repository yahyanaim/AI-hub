import { NextRequest, NextResponse } from 'next/server'
import { recordAdminMetric } from '@/lib/server/admin-metrics'
import { buildAdminDashboardPayload } from '@/lib/server/admin-dashboard-data'
import { getAdminFromRequest } from '@/lib/server/auth'

export const dynamic = 'force-dynamic'

const NO_STORE = { 'Cache-Control': 'no-store' }

export async function GET(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    void recordAdminMetric('admin_unauth')
    return NextResponse.json({ error: 'unauthorized' }, { status: 401, headers: NO_STORE })
  }

  const sp = req.nextUrl.searchParams
  const payload = await buildAdminDashboardPayload({
    range: sp.get('range'),
    from: sp.get('from'),
    to: sp.get('to'),
  })

  return NextResponse.json(payload, { status: 200, headers: NO_STORE })
}
