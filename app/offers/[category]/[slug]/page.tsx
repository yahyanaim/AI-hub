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
  if (!offer) return { title: 'Offer Not Found', robots: { index: false, follow: false } }
  const seoDescription = offer.description
    ? `${offer.description.replace(/[#_*`]/g, '').split(/\s+/).slice(0, 30).join(' ').slice(0, 155)}`
    : offer.tagline
  const ogImage = `${SITE_URL}/og.png`
  return {
    title: `${offer.name} - ${offer.tagline}`,
    description: seoDescription,
    openGraph: {
      title: `${offer.name} - ${offer.tagline}`,
      description: seoDescription,
      type: 'article',
      url: `${SITE_URL}/offers/${offer.category}/${offer.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${offer.name} - AI Hunt` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${offer.name} - ${offer.tagline}`,
      description: seoDescription,
      images: [ogImage],
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
    description: offer.tagline,
    image: `${SITE_URL}/og.png`,
    author: { '@type': 'Organization', name: 'AI Hunt' },
    url: `${SITE_URL}/offers/${offer.category}/${offer.slug}`,
    datePublished: offer.createdAt,
    dateModified: offer.updatedAt,
    provider: {
      '@type': 'Organization',
      name: 'AI Hunt',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <OfferDetail slug={slug} initial={offer} />
    </>
  )
}
