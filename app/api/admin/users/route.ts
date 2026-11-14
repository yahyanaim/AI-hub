import { NextRequest, NextResponse } from 'next/server'
import { recordAdminMetric } from '@/lib/server/admin-metrics'
import { getAdminFromRequest } from '@/lib/server/auth'
import { getBudgetConfig } from '@/lib/server/budget-config'
import { listSafeUsersPage } from '@/lib/server/user-auth'

export const dynamic = 'force-dynamic'

const NO_STORE = { 'Cache-Control': 'no-store' }

export async function GET(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    void recordAdminMetric('admin_unauth')
    return NextResponse.json({ error: 'unauthorized' }, { status: 401, headers: NO_STORE })
  }

  const sp = req.nextUrl.searchParams
  const q = sp.get('q') ?? ''
  const page = Number.parseInt(sp.get('page') ?? '1', 10) || 1
  const limit = Number.parseInt(sp.get('limit') ?? '20', 10) || 20
  const cfg = getBudgetConfig()

  const result = await listSafeUsersPage({
    query: q,
    page,
    limit,
    cvMonthlyLimit: cfg.cvMonthlyLimit,
  })

  return NextResponse.json(result, { status: 200, headers: NO_STORE })
}
