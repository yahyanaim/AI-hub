import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromRequest } from '@/lib/server/auth'
import { broadcastPush, isPushConfigured, type PushItem } from '@/lib/server/push'
import { isRedisConfigured, redisCommand } from '@/lib/server/redis'
import { SEED_TOOLS } from '@/lib/seed/tools'
import { SEED_DEV_TOOLS } from '@/lib/seed/dev-tools'
import { SEED_REPOS } from '@/lib/seed/repos'
import { SEED_OFFERS } from '@/lib/seed/offers'

/**
 * Admin-only push broadcast (verified admin JWT required).
 * Sends the newest tail items of every catalogue slice to all push
 * subscribers, one OS notification per item (max 3 per slice, 12 total).
 */
export async function POST(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  if (!isPushConfigured()) {
    return NextResponse.json({ error: 'push-not-configured' }, { status: 503 })
  }
  if (!isRedisConfigured()) {
    return NextResponse.json({ error: 'redis-not-configured' }, { status: 503 })
  }

  const body = (await req.json().catch(() => ({}))) as { maxPerSlice?: number }
  const maxPerSlice = Math.max(1, Math.min(3, body.maxPerSlice ?? 3))

  const href = (
    itemType: string,
    category: string,
    slug: string
  ): string => {
    if (itemType === 'tool') return `/tools/${category || 'other'}/${slug}`
    if (itemType === 'devtool') return `/dev-tools/${category || 'other'}/${slug}`
    if (itemType === 'offer') return `/offers/${category || 'other'}/${slug}`
    return `/edittools/${slug}`
  }

  const sliceMap: Array<[string, readonly unknown[]]> = [
    ['tool', SEED_TOOLS],
    ['devtool', SEED_DEV_TOOLS],
    ['offer', SEED_OFFERS],
    ['repo', SEED_REPOS],
  ]

  // The seeds append newest entries at the tail — the same signal the bell uses.
  const items: PushItem[] = []
  for (const [itemType, list] of sliceMap) {
    if (!Array.isArray(list) || list.length === 0) continue
    for (const item of list.slice(-maxPerSlice).reverse()) {
      items.push({
        title:
          itemType === 'tool'
            ? `New AI Tool: ${item.name}`
            : itemType === 'devtool'
              ? `New Dev Tool: ${item.name}`
              : itemType === 'offer'
                ? `New Offer: ${item.name}`
                : `New Editing Tool: ${item.name}`,
        body: item.tagline,
        icon:
          // Remote logos pass through; any local non-icon placeholder maps to
          // the bold orange atom mark (the white /logo.png renders as a white
          // blob at notification size on Android).
          item.logoUrl && item.logoUrl.startsWith('http')
            ? item.logoUrl
            : '/icons/push-icon-512.png?v=4',
        url: href(itemType, item.category, item.slug),
      })
    }
  }

  const result = await broadcastPush(items)

  // Record the last broadcast time (admin stats, anti double-click).
  await redisCommand(['set', 'aihunt:push:last-broadcast', new Date().toISOString()])

  return NextResponse.json(
    { ok: true, prepared: items.length, ...result },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
