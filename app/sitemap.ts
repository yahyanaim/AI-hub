import type { MetadataRoute } from 'next'
import { SEED_TOOLS, SEED_DEV_TOOLS, SEED_REPOS, SEED_COURSES, SEED_USERS } from '@/lib/seed'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ai-hunt.app'

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/devtool`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/edittools`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/courses`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/leaderboard`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${baseUrl}/submit`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
  ]

  const toolPages = SEED_TOOLS.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(tool.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const devToolPages = SEED_DEV_TOOLS.map((tool) => ({
    url: `${baseUrl}/devtool/${tool.slug}`,
    lastModified: new Date(tool.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const repoPages = SEED_REPOS.map((repo) => ({
    url: `${baseUrl}/edittools/${repo.slug}`,
    lastModified: new Date(repo.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const coursePages = SEED_COURSES.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: new Date(course.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const userPages = SEED_USERS.map((user) => ({
    url: `${baseUrl}/profile/${user.username}`,
    lastModified: new Date(user.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }))

  return [...staticPages, ...toolPages, ...devToolPages, ...repoPages, ...coursePages, ...userPages]
}
