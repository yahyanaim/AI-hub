import type { Metadata } from 'next'
import Script from 'next/script'
import { ToolsView } from '@/components/listing/ToolsView'

const baseUrl = 'https://aihubtools.vercel.app'

export const metadata: Metadata = {
  title: 'AI Tools Directory',
  description: 'Browse the best AI tools for coding, writing, image generation, video, productivity, research, marketing, and more. Community-ranked and reviewed.',
  openGraph: {
    title: 'AI Tools Directory — AI Hunt',
    description: 'Browse and discover the best AI tools ranked by the community. Find tools for coding, writing, design, productivity, and more.',
    url: `${baseUrl}/tools`,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'AI Hunt Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Directory — AI Hunt',
    description: 'Browse and discover the best AI tools ranked by the community.',
    images: ['/og.png'],
  },
  alternates: { canonical: `${baseUrl}/tools` },
}

export default function ToolsPage() {
  return (
    <>
      <Script id="schema-collection-tools" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'AI Tools Directory',
          description: 'Community-curated collection of the best AI tools for developers.',
          url: `${baseUrl}/tools`,
          about: { '@type': 'Thing', name: 'AI Tools' },
        }),
      }} />
      <ToolsView />
    </>
  )
}
