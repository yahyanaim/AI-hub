import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { SEED_TOOLS, SEED_DEV_TOOLS, SEED_REPOS, SEED_COURSES, SEED_OFFERS } from '@/lib/seed'
import { isPaidGuide, GUIDES_ENABLED } from '@/lib/guides'
import { DEVTOOL_CATEGORY_LABELS, OFFER_CATEGORY_LABELS, COURSE_CATEGORY_LABELS } from '@/types'

/**
 * lastmod source of truth per section: the newest item `updatedAt`, or the
 * build date when there is no content signal (static pages). This keeps Google
 * trusting lastmod instead of churning all 88 hub URLs on every deploy.
 */
const BUILD_DATE = new Date()

function safeDate(value: string | undefined): Date {
  const d = value ? new Date(value) : BUILD_DATE
  return Number.isNaN(d.getTime()) ? BUILD_DATE : d
}

function newestUpdatedAt(values: (string | undefined)[]): Date {
  let best: Date | null = null
  for (const v of values) {
    if (!v) continue
    const d = new Date(v)
    if (Number.isNaN(d.getTime())) continue
    if (!best || d > best) best = d
  }
  return best ?? BUILD_DATE
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL

  // Hub lastmod = newest item in the section, not the build date, so Google
  // sees real change signals (see newestUpdatedAt above).
  const toolsMod = newestUpdatedAt(SEED_TOOLS.map((t) => t.updatedAt))
  const devToolsMod = newestUpdatedAt(SEED_DEV_TOOLS.map((t) => t.updatedAt))
  const reposMod = newestUpdatedAt(SEED_REPOS.map((r) => r.updatedAt))
  const coursesMod = newestUpdatedAt(SEED_COURSES.map((c) => c.updatedAt))
  const offersMod = newestUpdatedAt(
    SEED_OFFERS.filter((o) => GUIDES_ENABLED || !isPaidGuide(o)).map((o) => o.updatedAt)
  )

  const staticPages = [
    { url: baseUrl, lastModified: BUILD_DATE, changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/tools`, lastModified: toolsMod, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/dev-tools`, lastModified: devToolsMod, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/edittools`, lastModified: reposMod, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/courses`, lastModified: coursesMod, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/offers`, lastModified: offersMod, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/support`, lastModified: BUILD_DATE, changeFrequency: 'monthly' as const, priority: 0.5 },
  ]

  const byDevToolCategory = new Map<string, Date>()
  for (const t of SEED_DEV_TOOLS) {
    const d = safeDate(t.updatedAt)
    const prev = byDevToolCategory.get(t.category)
    if (!prev || d > prev) byDevToolCategory.set(t.category, d)
  }
  const byCourseCategory = new Map<string, Date>()
  for (const c of SEED_COURSES) {
    const d = safeDate(c.updatedAt)
    const prev = byCourseCategory.get(c.category)
    if (!prev || d > prev) byCourseCategory.set(c.category, d)
  }
  const visibleOffers = SEED_OFFERS.filter((o) => GUIDES_ENABLED || !isPaidGuide(o))
  const byOfferCategory = new Map<string, Date>()
  for (const o of visibleOffers) {
    const d = safeDate(o.updatedAt)
    const prev = byOfferCategory.get(o.category)
    if (!prev || d > prev) byOfferCategory.set(o.category, d)
  }

  const toolPages = SEED_TOOLS.map((tool) => ({
    url: `${baseUrl}/tools/${tool.category}/${tool.slug}`,
    lastModified: safeDate(tool.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // NOTE: /tools/[category] is a legacy-redirect route (see app/tools/[category]/page.tsx)
  // that 301s to /tools or /tools/<category>/<slug>. Do NOT list category URLs
  // here to avoid sitemap soft-404s. Re-add only when a real listing exists.

  const devToolPages = SEED_DEV_TOOLS.map((tool) => ({
    url: `${baseUrl}/dev-tools/${tool.category}/${tool.slug}`,
    lastModified: safeDate(tool.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const devToolCategoryPages = Object.keys(DEVTOOL_CATEGORY_LABELS).map((category) => ({
    url: `${baseUrl}/dev-tools/${category}`,
    lastModified: byDevToolCategory.get(category) ?? BUILD_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const repoPages = SEED_REPOS.map((repo) => ({
    url: `${baseUrl}/edittools/${repo.slug}`,
    lastModified: safeDate(repo.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const coursePages = SEED_COURSES.map((course) => ({
    url: `${baseUrl}/courses/${course.category}/${course.slug}`,
    lastModified: safeDate(course.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const courseCategoryPages = Object.keys(COURSE_CATEGORY_LABELS).map((category) => ({
    url: `${baseUrl}/courses/${category}`,
    lastModified: byCourseCategory.get(category) ?? BUILD_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const offerCategoryPages = Object.keys(OFFER_CATEGORY_LABELS).map((category) => ({
    url: `${baseUrl}/offers/${category}`,
    lastModified: byOfferCategory.get(category) ?? BUILD_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const offerPages = visibleOffers.map((offer) => ({
    url: `${baseUrl}/offers/${offer.category}/${offer.slug}`,
    lastModified: safeDate(offer.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const paidGuides = GUIDES_ENABLED ? SEED_OFFERS.filter(isPaidGuide) : []
  const guidePages = GUIDES_ENABLED
    ? [
        { url: `${baseUrl}/guides`, lastModified: BUILD_DATE, changeFrequency: 'weekly' as const, priority: 0.8 },
        ...paidGuides.map((g) => ({
          url: `${baseUrl}/guides/${g.slug}`,
          lastModified: safeDate(g.updatedAt),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        })),
      ]
    : []

  // NOTE: prompts intentionally omitted — no /prompts route exists yet.
  // Re-add when the route ships to avoid sitemap 404s.

  return [...staticPages, ...toolPages, ...devToolPages, ...devToolCategoryPages, ...repoPages, ...coursePages, ...courseCategoryPages, ...offerCategoryPages, ...offerPages, ...guidePages]
}
