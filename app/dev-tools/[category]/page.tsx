import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import Script from 'next/script'
import { redirect, notFound } from 'next/navigation'
import { SEED_DEV_TOOLS } from '@/lib/seed'
import { DEVTOOL_CATEGORY_LABELS } from '@/types'
import { DevToolsView } from '@/components/listing/DevToolsView'
import { safeJsonLd } from '@/lib/json-ld'

const baseUrl = SITE_URL

export function generateStaticParams() {
  return Object.keys(DEVTOOL_CATEGORY_LABELS).map((category) => ({ category }))
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const { category } = params

  const label = DEVTOOL_CATEGORY_LABELS[category as keyof typeof DEVTOOL_CATEGORY_LABELS]
  if (label) {
    return {
      title: `${label} Developer Tools`,
      description: `Explore the best curated ${label.toLowerCase()} developer tools for software engineers.`,
      openGraph: {
        title: `${label} Developer Tools - AI Hunt`,
        description: `Curated ${label.toLowerCase()} developer tools for engineers.`,
        url: `${baseUrl}/dev-tools/${category}`,
        images: [{ url: '/og.png', width: 1200, height: 630, alt: 'AI Hunt Dev Tools' }],
      },
      alternates: { canonical: `${baseUrl}/dev-tools/${category}` },
    }
  }

  const legacy = SEED_DEV_TOOLS.find((t) => t.slug === category)
  if (legacy) {
    redirect(`/dev-tools/${legacy.category}/${legacy.slug}`)
  }

  return { title: 'Dev Tools Not Found' }
}

export default function DevToolCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params

  const label = DEVTOOL_CATEGORY_LABELS[category as keyof typeof DEVTOOL_CATEGORY_LABELS]
  if (!label) {
    const legacy = SEED_DEV_TOOLS.find((t) => t.slug === category)
    if (legacy) redirect(`/dev-tools/${legacy.category}/${legacy.slug}`)
    notFound()
  }

  return (
    <>
      <Script id={`schema-collection-devtools-${category}`} type="application/ld+json" dangerouslySetInnerHTML={{
        __html: safeJsonLd({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${label} Developer Tools`,
          description: `Community-curated collection of the best ${label.toLowerCase()} developer tools.`,
          url: `${baseUrl}/dev-tools/${category}`,
        }),
      }} />
      <DevToolsView initialCategory={category} />
    </>
  )
}