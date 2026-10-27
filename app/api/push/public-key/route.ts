import { NextResponse } from 'next/server'
import { getVapidPublicKey, isPushConfigured } from '@/lib/server/push'

/**
 * Public VAPID key — safe to expose (same key every browser gets). Clients
 * need it as the applicationServerKey to create a push subscription.
 */
export async function GET() {
  if (!isPushConfigured()) {
    return NextResponse.json({ error: 'push-not-configured' }, { status: 503 })
  }
  const key = getVapidPublicKey()
  return NextResponse.json({ key })
}
