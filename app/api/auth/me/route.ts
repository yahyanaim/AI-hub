import { NextResponse } from 'next/server'
import { getStoredUserDisplayName } from '@/lib/server/user-auth'
import { getUserSessionFromRequest, UserSessionSecretError } from '@/lib/server/user-session'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const session = getUserSessionFromRequest(req)
    if (!session) {
      return NextResponse.json(
        { user: null },
        { headers: { 'Cache-Control': 'no-store' } }
      )
    }
    const displayName = await getStoredUserDisplayName(session.username)
    return NextResponse.json(
      {
        user: {
          username: session.username,
          displayName: displayName ?? session.username,
        },
      },
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
