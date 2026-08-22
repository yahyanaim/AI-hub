import type { Metadata } from 'next'
import Script from 'next/script'
import { DevToolsView } from '@/components/listing/DevToolsView'
import { safeJsonLd } from '@/lib/json-ld'

const baseUrl = 'https://aihubtools.vercel.app'

export const metadata: Metadata = {
  title: 'Developer Tools Directory',
  description: 'Discover essential developer tools — IDEs, code editors, testing frameworks, CI/CD platforms, monitoring solutions, databases, API tools, and more. Curated for software engineers.',
  openGraph: {
    title: 'Developer Tools Directory — AI Hunt',
    description: 'Discover essential developer tools: IDEs, CI/CD, testing, monitoring, databases, and more. Curated for engineers.',
    url: `${baseUrl}/devtool`,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'AI Hunt Dev Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Tools Directory — AI Hunt',
    description: 'Discover essential developer tools: IDEs, CI/CD, testing, monitoring, and more.',
    images: ['/og.png'],
  },
  alternates: { canonical: `${baseUrl}/devtool` },
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
          url: `${baseUrl}/devtool`,
          about: { '@type': 'Thing', name: 'Developer Tools' },
        }),
      }} />
      <DevToolsView />
    </>
  )
}
