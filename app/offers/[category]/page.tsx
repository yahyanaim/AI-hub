import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import Script from 'next/script'
import { redirect, notFound } from 'next/navigation'
import { SEED_OFFERS } from '@/lib/seed'
import { OFFER_CATEGORY_LABELS } from '@/types'
import { OffersView } from '@/components/listing/OffersView'
import { safeJsonLd } from '@/lib/json-ld'

const baseUrl = SITE_URL

export function generateStaticParams() {
  return [
    ...Object.keys(OFFER_CATEGORY_LABELS).map((category) => ({ category })),
    ...SEED_OFFERS.map((offer) => ({ category: offer.slug })),
  ]
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const { category } = params

  const label = OFFER_CATEGORY_LABELS[category as keyof typeof OFFER_CATEGORY_LABELS]
  if (label) {
    return {
      title: `${label} Offers & Deals`,
      description: `Explore the best curated ${label.toLowerCase()} offers, programs, and deals.`,
      openGraph: {
        title: `${label} Offers - AI Hunt`,
        description: `Curated ${label.toLowerCase()} offers and deals.`,
        url: `${baseUrl}/offers/${category}`,
        images: [{ url: '/og.png', width: 1200, height: 630, alt: 'AI Hunt Offers' }],
      },
      alternates: { canonical: `${baseUrl}/offers/${category}` },
    }
  }

  // Legacy: old flat /offers/<slug> — redirect handled in component, return fallback metadata here
  const legacy = SEED_OFFERS.find((o) => o.slug === category)
  if (legacy) {
    return {
      title: legacy.name,
      description: legacy.tagline,
      alternates: { canonical: `${baseUrl}/offers/${legacy.category}/${legacy.slug}` },
    }
  }

  return { title: 'Offers Not Found' }
}

export default function OfferCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params

  const label = OFFER_CATEGORY_LABELS[category as keyof typeof OFFER_CATEGORY_LABELS]
  if (!label) {
    const legacy = SEED_OFFERS.find((o) => o.slug === category)
    if (legacy) redirect(`/offers/${legacy.category}/${legacy.slug}`)
    notFound()
  }

  return (
    <>
      <Script id={`schema-collection-offers-${category}`} type="application/ld+json" dangerouslySetInnerHTML={{
        __html: safeJsonLd({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${label} Offers`,
          description: `Community-curated collection of the best ${label.toLowerCase()} offers and deals.`,
          url: `${baseUrl}/offers/${category}`,
        }),
      }} />
      <OffersView initialCategory={category} />
    </>
  )
}
