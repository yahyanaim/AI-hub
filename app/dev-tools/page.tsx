import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import Script from 'next/script'
import { DevToolsView } from '@/components/listing/DevToolsView'
import { SEED_DEV_TOOLS } from '@/lib/seed'
import { safeJsonLd } from '@/lib/json-ld'
import { devToolsFirstPage } from '@/lib/listing-static'
import { breadcrumbJsonLd } from '@/lib/seo'

const baseUrl = SITE_URL

const topDevTools = [...SEED_DEV_TOOLS].sort((a, b) => b.upvotes - a.upvotes).slice(0, 10)

// Prerendered first page for non-JS crawlers — see lib/listing-static.ts.
const firstPage = devToolsFirstPage()

export const metadata: Metadata = {
  title: 'Developer Tools Directory',
  description: 'IDEs, CI/CD, testing, monitoring, databases and API tools — community-ranked dev tools for engineers.',
  openGraph: {
    title: 'Developer Tools Directory - AI Hunt',
    description: 'Discover essential developer tools: IDEs, CI/CD, testing, monitoring, databases, and more. Curated for engineers.',
    url: `${baseUrl}/dev-tools`,
    images: [{ url: `${baseUrl}/og.png`, width: 1200, height: 630, alt: 'AI Hunt Dev Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Tools Directory - AI Hunt',
    description: 'Discover essential developer tools: IDEs, CI/CD, testing, monitoring, and more.',
    images: [`${baseUrl}/og.png`],
  },
  alternates: { canonical: `${baseUrl}/dev-tools` },
}

export default function DevToolsPage() {
  return (
    <>
      <Script id="schema-collection-devtools" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: safeJsonLd({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Developer Tools Directory',
          description: 'Community-curated collection of essential developer tools.',
          url: `${baseUrl}/dev-tools`,
          about: { '@type': 'Thing', name: 'Developer Tools' },
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: topDevTools.length,
            itemListElement: topDevTools.map((tool, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: tool.name,
              url: `${baseUrl}/dev-tools/${tool.category}/${tool.slug}`,
            })),
          },
        }),
      }} />
      <Script id="schema-breadcrumb-dev-tools" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: safeJsonLd(
          breadcrumbJsonLd(baseUrl, [
            { name: 'Home', path: '/' },
            { name: 'Dev Tools', path: '/dev-tools' },
          ])
        ),
      }} />
      <DevToolsView initialItems={firstPage} />
    </>
  )
}

