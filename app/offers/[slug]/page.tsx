import type { Metadata } from 'next'
import { SEED_OFFERS } from '@/lib/seed'
import { OfferDetail } from '@/components/detail/OfferDetail'
import { safeJsonLd } from '@/lib/json-ld'
import { SITE_URL } from '@/lib/site'

export async function generateStaticParams() {
  return SEED_OFFERS.map((offer) => ({ slug: offer.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const offer = SEED_OFFERS.find((o) => o.slug === params.slug)
  if (!offer) return { title: 'Offer Not Found' }
  return {
    title: offer.name,
    description: offer.description,
    openGraph: {
      title: offer.name,
      description: offer.description,
      type: 'article',
      images: offer.logoUrl ? [{ url: offer.logoUrl, alt: offer.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: offer.name,
      description: offer.description,
      images: offer.logoUrl ? [offer.logoUrl] : undefined,
    },
    alternates: {
      canonical: `${SITE_URL}/offers/${offer.slug}`,
    },
  }
}

export default async function OfferDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const offer = SEED_OFFERS.find((o) => o.slug === slug)

  const jsonLd = offer
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: offer.name,
        description: offer.description,
        url: offer.url,
        datePublished: offer.createdAt,
        provider: {
          '@type': 'Organization',
          name: offer.name,
        },
      }
    : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        />
      )}
      <OfferDetail slug={slug} />
    </>
  )
}