import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import Script from 'next/script'
import { redirect } from 'next/navigation'
import { SEED_TOOLS } from '@/lib/seed'
import { TOOL_CATEGORY_LABELS } from '@/types'
import { ToolsView } from '@/components/listing/ToolsView'
import { safeJsonLd } from '@/lib/json-ld'
import { toolsFirstPage } from '@/lib/listing-static'
import { breadcrumbJsonLd } from '@/lib/seo'

const baseUrl = SITE_URL

// Real category landing pages (Hub → Category → Tool crawl path).
// Legacy one-segment tool URLs (/tools/<slug>) are 308-redirected by
// middleware.ts before reaching this route; the fallbacks below only cover
// direct hits that bypass it.
export function generateStaticParams() {
  return Object.keys(TOOL_CATEGORY_LABELS).map((category) => ({ category }))
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const { category } = params

  const label = TOOL_CATEGORY_LABELS[category as keyof typeof TOOL_CATEGORY_LABELS]
  if (label) {
    const title = `${label} AI Tools`
    const description = `Discover the best ${label.toLowerCase()} AI tools, ranked by the community. Compare features, pricing, and top-rated alternatives.`
    return {
      title,
      description,
      openGraph: {
        title: `${title} - AI Hunt`,
        description,
        url: `${baseUrl}/tools/${category}`,
        siteName: 'AI Hunt',
        type: 'website',
        locale: 'en_US',
        images: [{ url: `${baseUrl}/og.png`, width: 1200, height: 630, alt: `AI Hunt ${label} Tools` }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} - AI Hunt`,
        description,
        images: [`${baseUrl}/og.png`],
      },
      alternates: { canonical: `${baseUrl}/tools/${category}` },
    }
  }

  // Legacy: old flat /tools/<slug>. Never redirect() inside generateMetadata —
  // point crawlers at the canonical detail URL; the component redirects.
  const legacy = SEED_TOOLS.find((t) => t.slug === category)
  if (legacy) {
    const canonical = `${baseUrl}/tools/${legacy.category}/${legacy.slug}`
    return {
      title: `${legacy.name} - ${legacy.tagline}`,
      robots: { index: false, follow: true },
      alternates: { canonical },
      openGraph: { url: canonical },
    }
  }

  return { title: 'Tools Not Found', robots: { index: false, follow: false } }
}

export default function ToolCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params

  const label = TOOL_CATEGORY_LABELS[category as keyof typeof TOOL_CATEGORY_LABELS]
  if (!label) {
    const legacy = SEED_TOOLS.find((t) => t.slug === category)
    if (legacy) redirect(`/tools/${legacy.category}/${legacy.slug}`)
    redirect('/tools')
  }

  return (
    <>
      <Script id={`schema-collection-tools-${category}`} type="application/ld+json" dangerouslySetInnerHTML={{
        __html: safeJsonLd({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${label} AI Tools`,
          description: `Community-curated collection of the best ${label.toLowerCase()} AI tools.`,
          url: `${baseUrl}/tools/${category}`,
        }),
      }} />
      <Script id={`schema-breadcrumb-tools-${category}`} type="application/ld+json" dangerouslySetInnerHTML={{
        __html: safeJsonLd(
          breadcrumbJsonLd(baseUrl, [
            { name: 'Home', path: '/' },
            { name: 'AI Tools', path: '/tools' },
            { name: `${label} AI Tools`, path: `/tools/${category}` },
          ])
        ),
      }} />
      <ToolsView initialCategory={category} initialItems={toolsFirstPage(category)} />
    </>
  )
}
