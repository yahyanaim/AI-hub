import type { Metadata } from 'next'
import { redirect, notFound } from 'next/navigation'
import { SEED_OFFERS } from '@/lib/seed'
import { OFFER_CATEGORY_LABELS } from '@/types'
import { OfferDetail } from '@/components/detail/OfferDetail'
import { safeJsonLd } from '@/lib/json-ld'
import { SITE_URL } from '@/lib/site'

export async function generateStaticParams() {
  return SEED_OFFERS.map((offer) => ({
    category: offer.category,
    slug: offer.slug,
  }))
}

async function findOffer(category: string, slug: string) {
  return SEED_OFFERS.find((o) => o.slug === slug && o.category === category)
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string }
}): Promise<Metadata> {
  const offer = await findOffer(params.category, params.slug)
  if (!offer) return { title: 'Offer Not Found' }
  return {
    title: offer.name,
    description: offer.tagline,
    openGraph: {
      title: offer.name,
      description: offer.tagline,
      type: 'article',
      images: offer.logoUrl ? [{ url: offer.logoUrl, alt: offer.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: offer.name,
      description: offer.tagline,
      images: offer.logoUrl ? [offer.logoUrl] : undefined,
    },
    alternates: {
      canonical: `${SITE_URL}/offers/${offer.category}/${offer.slug}`,
    },
  }
}

export default async function OfferDetailPage({
  params,
}: {
  params: { category: string; slug: string }
}) {
  const { category, slug } = params
  // Renamed category: competition → forstartups (keep old links working)
  if (category === 'competition') {
    const moved = SEED_OFFERS.find((o) => o.slug === slug)
    redirect(moved ? `/offers/forstartups/${moved.slug}` : '/offers/forstartups')
  }
  if (!OFFER_CATEGORY_LABELS[category as keyof typeof OFFER_CATEGORY_LABELS]) {
    notFound()
  }
  const offer = await findOffer(category, slug)
  if (!offer) {
    // Same slug under a different category (or legacy link): send to canonical URL.
    const canonical = SEED_OFFERS.find((o) => o.slug === slug)
    if (canonical) redirect(`/offers/${canonical.category}/${canonical.slug}`)
    notFound()
  }
  const jsonLd = {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <OfferDetail slug={slug} />
    </>
  )
}
