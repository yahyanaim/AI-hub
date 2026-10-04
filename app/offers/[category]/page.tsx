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
    const count = SEED_OFFERS.filter((o) => o.category === category).length
    return {
      title: `${label} Opportunities & Deals`,
      description: `Claim ${count} curated ${label.toLowerCase()} opportunities and deals, each with a step-by-step guide.`,
      openGraph: {
        title: `${label} Opportunities - AI Hunt`,
        description: `Curated ${label.toLowerCase()} offers and deals.`,
        url: `${baseUrl}/offers/${category}`,
        images: [{ url: `${baseUrl}/og.png`, width: 1200, height: 630, alt: 'AI Hunt Offers' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${label} Opportunities - AI Hunt`,
        description: `Curated ${label.toLowerCase()} offers and deals.`,
        images: [`${baseUrl}/og.png`],
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

  const count = SEED_OFFERS.filter((o) => o.category === category).length

  return (
    <>
      <Script id={`schema-collection-offers-${category}`} type="application/ld+json" dangerouslySetInnerHTML={{
        __html: safeJsonLd({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${label} Opportunities`,
          description: `Community-curated collection of the best ${label.toLowerCase()} offers and deals.`,
          url: `${baseUrl}/offers/${category}`,
        }),
      }} />
      <Script id={`schema-breadcrumb-offers-${category}`} type="application/ld+json" dangerouslySetInnerHTML={{
        __html: safeJsonLd(
          breadcrumbJsonLd(baseUrl, [
            { name: 'Home', path: '/' },
            { name: 'Offers', path: '/offers' },
            { name: `${label} Opportunities`, path: `/offers/${category}` },
          ])
        ),
      }} />
      <OffersView
        initialCategory={category}
        initialItems={offersFirstPage(category)}
        heading={{
          title: `${label} Opportunities`,
          eyebrow: label,
          description: `${count} curated ${label.toLowerCase()} opportunities and deals, each with a step-by-step guide to claim it.`,
        }}
      />
    </>
  )
}
