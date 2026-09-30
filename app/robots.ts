import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { GUIDES_ENABLED } from '@/lib/guides'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // NOTE: /search and /profile/ intentionally have NO Disallow here.
        // Both pages serve a real `noindex` meta, and Google can only honour a
        // noindex if it is allowed to crawl the page. Blocking them would leave
        // the URL showing in search results from external links anyway.
        // /guides is blocked while GUIDES_ENABLED=false (same reason, plus it
        // 404s): remove this line when guides ship.
        //
        // The 108 raw /skills/*.md skill documents are third-party content
        // served verbatim — indexable thin content under our domain, so it is
        // blocked outright (see SEO_GEO_AUDIT.md §6.5b).
        disallow: ['/api/', '/_next/', ...(GUIDES_ENABLED ? [] : ['/guides']), '/skills/'],
      },
      // GEO: explicitly allow AI crawlers / assistants so ChatGPT,
      // Claude, Perplexity and Gemini can cite AI Hunt.
      {
        userAgent: [
          // --- existing (kept) ---
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'PerplexityBot',
          'Google-Extended',
          'CCBot',
          // --- answer/search engines added ---
          'OAI-SearchBot',
          'Perplexity-User',
          'Claude-User',
          'Claude-SearchBot',
          'Applebot',
          'Applebot-Extended',
          'DuckAssistBot',
          'Amazonbot',
          'MistralAI-User',
          'meta-externalagent',
          'cohere-ai',
          'YouBot',
        ],
        allow: '/',
        disallow: ['/api/', '/_next/', ...(GUIDES_ENABLED ? [] : ['/guides']), '/skills/'],
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
