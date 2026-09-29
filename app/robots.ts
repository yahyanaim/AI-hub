import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/search', '/profile/'],
      },
      // GEO: explicitly allow AI crawlers / assistants so ChatGPT,
      // Claude, Perplexity and Gemini can cite AI Hunt.
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'CCBot'],
        allow: '/',
        disallow: ['/api/', '/_next/', '/search', '/profile/'],
      },
      // Images can be indexed for Google Images traffic.
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
