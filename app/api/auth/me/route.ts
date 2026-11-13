import { NextResponse } from 'next/server'
import { getUserSessionFromRequest, UserSessionSecretError } from '@/lib/server/user-session'

export async function GET(req: Request) {
  try {
    const session = getUserSessionFromRequest(req)
    return NextResponse.json(
      { user: session ? { username: session.username } : null },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  } catch (err) {
    if (err instanceof UserSessionSecretError) {
      return NextResponse.json(
        { user: null },
        { status: 503, headers: { 'Cache-Control': 'no-store' } }
      )
    }
    throw err
  }
}
