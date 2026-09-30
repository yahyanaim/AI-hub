import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import Script from 'next/script'
import { redirect, notFound } from 'next/navigation'
import { SEED_OFFERS } from '@/lib/seed'
import { OFFER_CATEGORY_LABELS } from '@/types'
import { OffersView } from '@/components/listing/OffersView'
import { safeJsonLd } from '@/lib/json-ld'
import { offersFirstPage } from '@/lib/listing-static'
import { breadcrumbJsonLd } from '@/lib/seo'

const baseUrl = SITE_URL

export function generateStaticParams() {
  // Only real category listing pages are prerendered.
  // Legacy flat /offers/<slug> URLs are NOT prerendered here on purpose:
  // prerendering a redirect() produces an HTTP 200 + meta-refresh page, not a
  // genuine redirect. middleware.ts returns real 308s for those instead, and
  // the page component's redirect() below covers any runtime misses.
  return Object.keys(OFFER_CATEGORY_LABELS).map((category) => ({ category }))
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
      twitter: {
        card: 'summary_large_image',
        title: `${label} Offers - AI Hunt`,
        description: `Curated ${label.toLowerCase()} offers and deals.`,
        images: ['/og.png'],
      },
      alternates: { canonical: `${baseUrl}/offers/${category}` },
    }
  }

  // Legacy: old flat /offers/<slug>, redirect handled in component, return fallback metadata here
  const legacy = SEED_OFFERS.find((o) => o.slug === category)
  if (legacy) {
    return {
      title: legacy.name,
      description: legacy.tagline,
      alternates: { canonical: `${baseUrl}/offers/${legacy.category}/${legacy.slug}` },
      robots: { index: false, follow: true },
    }
  }

  return { title: 'Offers Not Found', robots: { index: false, follow: false } }
}

export default function OfferCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params

  // Renamed category: competition → forstartups (keep old links working)
  if (category === 'competition') {
    redirect('/offers/forstartups')
  }

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
      <Script id={`schema-breadcrumb-offers-${category}`} type="application/ld+json" dangerouslySetInnerHTML={{
        __html: safeJsonLd(
          breadcrumbJsonLd(baseUrl, [
            { name: 'Home', path: '/' },
            { name: 'Offers', path: '/offers' },
            { name: `${label} Offers`, path: `/offers/${category}` },
          ])
        ),
      }} />
      <OffersView initialCategory={category} initialItems={offersFirstPage(category)} />
    </>
  )
}
