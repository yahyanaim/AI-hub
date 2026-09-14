import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SEED_OFFERS } from '@/lib/seed'
import { isPaidGuide, GUIDE_PRICE_LABEL, GUIDES_ENABLED } from '@/lib/guides'
import { GuideLanding } from '@/components/guides/GuideLanding'
import { safeJsonLd } from '@/lib/json-ld'
import { SITE_URL } from '@/lib/site'

export function generateStaticParams() {
  if (!GUIDES_ENABLED) return []
  return SEED_OFFERS.filter(isPaidGuide).map((g) => ({ slug: g.slug }))
}

function findGuide(slug: string) {
  const g = SEED_OFFERS.find((o) => o.slug === slug)
  return g && isPaidGuide(g) ? g : undefined
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const guide = findGuide(params.slug)
  if (!guide) return { title: 'Guide Not Found', robots: { index: false, follow: false } }
  const price = GUIDE_PRICE_LABEL(guide)
  const title = `${guide.name} — ${price} | AI Hunt Guide`
  const description = `${guide.tagline} Pay by virement, send receipt on WhatsApp, get the ${guide.pages ?? ''} PDF.`.slice(0, 155)
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/guides/${guide.slug}`,
      images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: guide.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/og.png`],
    },
    alternates: { canonical: `${SITE_URL}/guides/${guide.slug}` },
  }
}

export default function GuideDetailPage({ params }: { params: { slug: string } }) {
  if (!GUIDES_ENABLED) notFound()
  const guide = findGuide(params.slug)
  if (!guide) notFound()

  const price = GUIDE_PRICE_LABEL(guide)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: guide.name,
    description: guide.tagline,
    image: `${SITE_URL}/og.png`,
    url: `${SITE_URL}/guides/${guide.slug}`,
    offers: {
      '@type': 'Offer',
      price: guide.price,
      priceCurrency: guide.currency ?? 'MAD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating:
      typeof guide.rating === 'number'
        ? {
            '@type': 'AggregateRating',
            ratingValue: guide.rating,
            reviewCount: guide.reviewsCount ?? 1,
          }
        : undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <GuideLanding offer={guide} />
      <p className="sr-only">Price: {price}. Pay by virement, send receipt on WhatsApp.</p>
    </>
  )
}
