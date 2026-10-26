import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromRequest } from '@/lib/server/auth'
import { isRedisConfigured, redisCommand, SIGNUP_COUNT_KEY } from '@/lib/server/redis'

/**
 * Signup count — readable ONLY after the server verifies the HttpOnly admin
 * JWT cookie (signature + role + subject). Anyone else gets 401 and learns
 * nothing, not even the number.
 */
export async function GET(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  if (!isRedisConfigured()) {
    return NextResponse.json(
      { error: 'redis-not-configured', count: null },
      { status: 503 }
    )
  }

  const raw = await redisCommand<number | string>(['get', SIGNUP_COUNT_KEY])
  const count = raw === null ? 0 : Number(raw)

  return NextResponse.json(
    { count, name: admin.name },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
