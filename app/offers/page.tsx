import type { Metadata } from 'next'
import Script from 'next/script'
import { OffersView } from '@/components/listing/OffersView'
import { safeJsonLd } from '@/lib/json-ld'

const baseUrl = 'https://aihubtools.vercel.app'

export const metadata: Metadata = {
  title: 'Offers & Deals for Developers',
  description: 'Free programs, fellowships, and developer resources worth claiming. Each offer includes a step-by-step guide to get it - from free skills academies to free AI API access.',
  openGraph: {
    title: 'Offers & Deals for Developers - AI Hunt',
    description: 'Curated offers and free programs with step-by-step how-to-get-it guides.',
    url: `${baseUrl}/offers`,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'AI Hunt Offers' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Offers & Deals for Developers - AI Hunt',
    description: 'Curated offers and free programs with step-by-step guides.',
    images: ['/og.png'],
  },
  alternates: { canonical: `${baseUrl}/offers` },
}

export default function OffersPage() {
  return (
    <>
      <Script id="schema-collection-offers" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: safeJsonLd({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Offers & Deals for Developers',
          description: 'Community-curated offers, free programs, and developer deals with step-by-step guides.',
          url: `${baseUrl}/offers`,
          about: { '@type': 'Thing', name: 'Developer Offers and Deals' },
        }),
      }} />
      <OffersView />
    </>
  )
}