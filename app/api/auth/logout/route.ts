import { NextResponse } from 'next/server'
import { clearUserCookie } from '@/lib/server/user-session'

export async function POST() {
  const res = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } })
  clearUserCookie(res)
  return res
}
