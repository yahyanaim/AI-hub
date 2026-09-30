// ============================================================
// SERVER-ONLY. First-page helpers for listing hubs.
//
// These read the full seed, so they must never be imported from a
// 'use client' component — that would pull the whole 2.8 MB seed into the
// client bundle. Only app/**/page.tsx (server components) may import this.
//
// They exist so each hub's prerendered HTML contains real cards and real
// <a href> links for crawlers that do not execute JavaScript. Ordering logic
// mirrors the client views exactly (sort + category filter + guide visibility),
// otherwise the grid would visibly reshuffle on hydration.
// ============================================================

import {
  SEED_TOOLS,
  SEED_DEV_TOOLS,
  SEED_REPOS,
  SEED_COURSES,
  SEED_OFFERS,
} from '@/lib/seed'
import { GUIDES_ENABLED, isPaidGuide } from '@/lib/guides'
import {
  LISTING_STATIC_COUNT,
  toolTrendingScore,
  devToolTrendingScore,
  repoTrendingScore,
  byNewest,
} from '@/lib/listing-order'
import type { Tool, DevTool, Repo, Course, Offer } from '@/types'

const take = <T,>(arr: T[]) => arr.slice(0, LISTING_STATIC_COUNT)

/** `/tools` — default sort: trending. */
export function toolsFirstPage(): Tool[] {
  return take([...SEED_TOOLS].sort((a, b) => toolTrendingScore(b) - toolTrendingScore(a)))
}

/** `/dev-tools` and `/dev-tools/<category>` — default sort: trending. */
export function devToolsFirstPage(category?: string): DevTool[] {
  const pool = category ? SEED_DEV_TOOLS.filter((t) => t.category === category) : SEED_DEV_TOOLS
  return take([...pool].sort((a, b) => devToolTrendingScore(b) - devToolTrendingScore(a)))
}

/** `/edittools` — default sort: trending. */
export function reposFirstPage(): Repo[] {
  return take([...SEED_REPOS].sort((a, b) => repoTrendingScore(b) - repoTrendingScore(a)))
}

/**
 * `/courses` and `/courses/<category>` — default sort: newest.
 * `high-recommended` is a tag-based pseudo-category handled by CoursesView.
 */
export function coursesFirstPage(category?: string): Course[] {
  let pool = SEED_COURSES
  if (category === 'high-recommended') {
    pool = pool.filter((c) => Boolean(c.tags?.includes('high-recommended')))
  } else if (category) {
    pool = pool.filter((c) => c.category === category)
  }
  return take([...pool].sort(byNewest))
}

/**
 * `/offers` and `/offers/<category>` — default sort: newest.
 * Paid guides are hidden while GUIDES_ENABLED is false, matching OffersView.
 */
export function offersFirstPage(category?: string): Offer[] {
  let pool = SEED_OFFERS
  if (!GUIDES_ENABLED) pool = pool.filter((o) => !isPaidGuide(o))
  if (category) pool = pool.filter((o) => o.category === category)
  return take([...pool].sort(byNewest))
}
