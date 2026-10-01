import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SITE_URL } from '@/lib/site'
import Script from 'next/script'
import { ToolsView } from '@/components/listing/ToolsView'
import { SEED_TOOLS } from '@/lib/seed'
import { safeJsonLd } from '@/lib/json-ld'
import { toolsFirstPage } from '@/lib/listing-static'
import { breadcrumbJsonLd } from '@/lib/seo'

const baseUrl = SITE_URL

const topTools = [...SEED_TOOLS].sort((a, b) => b.upvotes - a.upvotes).slice(0, 10)

// Prerendered first page: this is what non-JS crawlers (GPTBot, ClaudeBot,
// PerplexityBot, CCBot) and the Suspense fallback render. See lib/listing-static.ts.
const firstPage = toolsFirstPage()

export const metadata: Metadata = {
  title: 'AI Tools Directory',
  description: 'Browse the best AI tools for coding, writing, image generation, video, productivity, research, marketing, and more. Community-ranked and reviewed.',
  openGraph: {
    title: 'AI Tools Directory - AI Hunt',
    description: 'Browse and discover the best AI tools ranked by the community. Find tools for coding, writing, design, productivity, and more.',
    url: `${baseUrl}/tools`,
    siteName: 'AI Hunt',
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${baseUrl}/og.png`, width: 1200, height: 630, alt: 'AI Hunt Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Directory - AI Hunt',
    description: 'Browse and discover the best AI tools ranked by the community.',
    images: [`${baseUrl}/og.png`],
  },
  alternates: { canonical: `${baseUrl}/tools` },
}

export default function ToolsPage() {
  return (
    <>
      <Script id="schema-collection-tools" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: safeJsonLd({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'AI Tools Directory',
          description: 'Community-curated collection of the best AI tools for developers.',
          url: `${baseUrl}/tools`,
          about: { '@type': 'Thing', name: 'AI Tools' },
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: topTools.length,
            itemListElement: topTools.map((tool, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: tool.name,
              url: `${baseUrl}/tools/${tool.category}/${tool.slug}`,
            })),
          },
        }),
      }} />
      {/* 2-level breadcrumb — replaces the incorrect site-wide one that used to
          live in app/layout.tsx (see SEO_GEO_AUDIT.md §6.2). */}
      <Script id="schema-breadcrumb-tools" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: safeJsonLd(
          breadcrumbJsonLd(baseUrl, [
            { name: 'Home', path: '/' },
            { name: 'AI Tools', path: '/tools' },
          ])
        ),
      }} />
      <Suspense fallback={null}>
        <ToolsView initialItems={firstPage} />
      </Suspense>
    </>
  )
}
