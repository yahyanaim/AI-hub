import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { SEED_TOOLS, SEED_DEV_TOOLS, SEED_REPOS, SEED_COURSES, SEED_OFFERS } from '@/lib/seed'
import { isPaidGuide, GUIDES_ENABLED } from '@/lib/guides'
import { DEVTOOL_CATEGORY_LABELS, OFFER_CATEGORY_LABELS, COURSE_CATEGORY_LABELS } from '@/types'

// Fixed build-time date so sitemap output is deterministic across requests.
const BUILD_DATE = new Date('2026-01-01T00:00:00.000Z')

function safeDate(value: string | undefined): Date {
  const d = value ? new Date(value) : BUILD_DATE
  return Number.isNaN(d.getTime()) ? BUILD_DATE : d
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL

  const staticPages = [
    { url: baseUrl, lastModified: BUILD_DATE, changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/tools`, lastModified: BUILD_DATE, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/dev-tools`, lastModified: BUILD_DATE, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/edittools`, lastModified: BUILD_DATE, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/courses`, lastModified: BUILD_DATE, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/offers`, lastModified: BUILD_DATE, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/support`, lastModified: BUILD_DATE, changeFrequency: 'monthly' as const, priority: 0.5 },
  ]

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
    lastModified: BUILD_DATE,
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
    lastModified: BUILD_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const offerCategoryPages = Object.keys(OFFER_CATEGORY_LABELS).map((category) => ({
    url: `${baseUrl}/offers/${category}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const offerPages = SEED_OFFERS.filter((o) => GUIDES_ENABLED || !isPaidGuide(o)).map((offer) => ({
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
