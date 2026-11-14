import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromRequest } from '@/lib/server/auth'

/**
 * Server-verified Admin session check.
 * Returns only whether the request carries a valid signed HttpOnly `aihunt_admin` JWT.
 */
export async function GET(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  return NextResponse.json(
    { authenticated: Boolean(admin) },
    { status: 200, headers: { 'Cache-Control': 'no-store' } }
  )
}
