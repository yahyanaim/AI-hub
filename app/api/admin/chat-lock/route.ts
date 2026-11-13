import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromRequest } from '@/lib/server/auth'
import { getChatLockStatus, setChatLocked } from '@/lib/server/chat-lock'

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store' }

export async function GET(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401, headers: NO_STORE_HEADERS })
  }

  const status = await getChatLockStatus()
  if (!status.ok) {
    return NextResponse.json({ error: status.error }, { status: 503, headers: NO_STORE_HEADERS })
  }

  return NextResponse.json({ locked: status.locked }, { headers: NO_STORE_HEADERS })
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401, headers: NO_STORE_HEADERS })
  }

  let body: { locked?: unknown } | null = null
  try {
    body = (await req.json()) as { locked?: unknown }
  } catch {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400, headers: NO_STORE_HEADERS })
  }

  if (!body || typeof body.locked !== 'boolean') {
    return NextResponse.json({ error: 'locked boolean is required' }, { status: 400, headers: NO_STORE_HEADERS })
  }

  const res = await setChatLocked(body.locked)
  if (!res.ok) {
    return NextResponse.json({ error: res.error }, { status: 503, headers: NO_STORE_HEADERS })
  }

  return NextResponse.json({ ok: true, locked: res.locked }, { headers: NO_STORE_HEADERS })
}
