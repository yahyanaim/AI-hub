// ============================================================
// Shared listing ordering + server-side "first page" helpers.
//
// Why this file exists
// --------------------
// `ListingView` calls `useSearchParams()`, which opts its <Suspense> boundary
// out of static prerendering. The HTML that ships to crawlers is therefore the
// boundary *fallback*, not the interactive list. To keep that fallback
// content-rich (and identical to what hydrates over it), the server pages
// prerender the first page of items themselves.
//
// The score/order functions live here so the server page and the client view
// can never drift apart — a mismatch would visibly reshuffle the grid on
// hydration.
// ============================================================

import type { Tool, DevTool, Repo, Course, Offer } from '@/types'

/** Number of items each hub prerenders into the static HTML (matches ListingView PAGE_SIZE). */
export const LISTING_STATIC_COUNT = 12

export const toolTrendingScore = (t: Tool) =>
  t.upvotes + Math.round(t.bookmarks * 0.8) + (t.featured ? 80 : 0)

export const devToolTrendingScore = (t: DevTool) =>
  t.upvotes + Math.round(t.bookmarks * 0.8) + (t.featured ? 80 : 0)

export const repoTrendingScore = (r: Repo) => r.upvotes + (r.featured ? 100 : 0)

export const courseTrendingScore = (c: Course) => c.upvotes + (c.featured ? 100 : 0)

export const offerTrendingScore = (o: Offer) => o.upvotes + (o.featured ? 100 : 0)

/** Same comparator ListingView uses for `sort: 'new'`. */
export function byNewest<T extends { createdAt: string }>(a: T, b: T): number {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
}

/** Same comparator ListingView uses for `sort: 'top'`. */
export function byTop<T extends { upvotes: number }>(a: T, b: T): number {
  return b.upvotes - a.upvotes
}
