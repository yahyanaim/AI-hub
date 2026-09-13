import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { SEED_TOOLS, SEED_DEV_TOOLS, SEED_REPOS, SEED_COURSES, SEED_OFFERS } from '@/lib/seed'
import { DEVTOOL_CATEGORY_LABELS, OFFER_CATEGORY_LABELS, TOOL_CATEGORY_LABELS, COURSE_CATEGORY_LABELS } from '@/types'

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

  const toolCategoryPages = Object.keys(TOOL_CATEGORY_LABELS).map((category) => ({
    url: `${baseUrl}/tools/${category}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

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

  const offerPages = SEED_OFFERS.map((offer) => ({
    url: `${baseUrl}/offers/${offer.category}/${offer.slug}`,
    lastModified: safeDate(offer.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // NOTE: prompts intentionally omitted — no /prompts route exists yet.
  // Re-add when the route ships to avoid sitemap 404s.

  return [...staticPages, ...toolPages, ...toolCategoryPages, ...devToolPages, ...devToolCategoryPages, ...repoPages, ...coursePages, ...courseCategoryPages, ...offerCategoryPages, ...offerPages]
}
