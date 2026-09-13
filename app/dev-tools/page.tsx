import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import Script from 'next/script'
import { DevToolsView } from '@/components/listing/DevToolsView'
import { SEED_DEV_TOOLS } from '@/lib/seed'
import { safeJsonLd } from '@/lib/json-ld'

const baseUrl = SITE_URL

const topDevTools = [...SEED_DEV_TOOLS].sort((a, b) => b.upvotes - a.upvotes).slice(0, 10)

export const metadata: Metadata = {
  title: 'Developer Tools Directory',
  description: 'Discover essential developer tools - IDEs, code editors, testing frameworks, CI/CD platforms, monitoring solutions, databases, API tools, and more. Curated for software engineers.',
  openGraph: {
    title: 'Developer Tools Directory - AI Hunt',
    description: 'Discover essential developer tools: IDEs, CI/CD, testing, monitoring, databases, and more. Curated for engineers.',
    url: `${baseUrl}/dev-tools`,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'AI Hunt Dev Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Tools Directory - AI Hunt',
    description: 'Discover essential developer tools: IDEs, CI/CD, testing, monitoring, and more.',
    images: ['/og.png'],
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
      <DevToolsView />
    </>
  )
}
