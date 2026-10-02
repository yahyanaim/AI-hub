import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SEED_TOOLS, SEED_USERS } from '@/lib/seed'
import { ToolDetail } from '@/components/detail/ToolDetail'
import { safeJsonLd } from '@/lib/json-ld'
import { seoTitle, seoDescriptionWithName, breadcrumbJsonLd } from '@/lib/seo'
import { SITE_URL, resolveOgImage } from '@/lib/site'

export async function generateStaticParams() {
  return SEED_TOOLS.map((tool) => ({
    category: tool.category,
    slug: tool.slug,
  }))
}

async function findTool(category: string, slug: string) {
  return SEED_TOOLS.find((t) => t.slug === slug && t.category === category)
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string }
}): Promise<Metadata> {
  const tool = await findTool(params.category, params.slug)
  if (!tool) return { title: 'Tool Not Found', robots: { index: false, follow: false } }
  const title = seoTitle(tool.name, tool.tagline)
  const seoDescriptionText = seoDescriptionWithName(tool.name, tool.description, tool.tagline)
  const ogImage = resolveOgImage(tool.logoUrl)
  return {
    title,
    description: seoDescriptionText,
    openGraph: {
      title,
      description: seoDescriptionText,
      type: 'article',
      siteName: 'AI Hunt',
      url: `${SITE_URL}/tools/${tool.category}/${tool.slug}`,
      images: [{ url: ogImage.src, alt: `${tool.name} - AI Hunt` }],
    },
    twitter: {
      card: ogImage.isLogo ? 'summary' : 'summary_large_image',
      title,
      description: seoDescriptionText,
      images: [ogImage.src],
    },
    alternates: {
      canonical: `${SITE_URL}/tools/${tool.category}/${tool.slug}`,
    },
  }
}

export default async function ToolDetailPage({
  params,
}: {
  params: { category: string; slug: string }
}) {
  const { category, slug } = params
  const tool = await findTool(category, slug)
  // Unknown slugs 404 at the middleware layer; this is the fallback.
  if (!tool) notFound()
  const user = tool ? SEED_USERS.find((u) => u.id === tool.submittedBy) : null
  // Same-category neighbours for the Related tools block: real internal links
  // computed on the server so crawlers follow them without JavaScript.
  const relatedTools = tool
    ? [...SEED_TOOLS]
        .filter((t) => t.category === tool.category && t.slug !== tool.slug)
        .sort((a, b) => b.upvotes - a.upvotes)
        .slice(0, 4)
    : []

  const jsonLd = tool
    ? {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: tool.name,
        description: tool.tagline,
        applicationCategory: 'DeveloperApplication',
        applicationSubCategory: tool.category,
        operatingSystem: 'Web',
        ...(tool.pricing === 'free' || tool.pricing === 'open-source'
          ? {
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                url: tool.url,
              },
            }
          : {}),
        author: user
          ? {
              '@type': 'Person',
              name: user.displayName,
            }
          : undefined,
        url: `${SITE_URL}/tools/${tool.category}/${tool.slug}`,
        sameAs: tool.url,
        datePublished: tool.createdAt,
        dateModified: tool.updatedAt,
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
      {tool && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(
              breadcrumbJsonLd(SITE_URL, [
                { name: 'Home', path: '/' },
                { name: 'AI Tools', path: '/tools' },
                { name: tool.name, path: `/tools/${tool.category}/${tool.slug}` },
              ])
            ),
          }}
        />
      )}
      <ToolDetail slug={slug} initial={tool ?? undefined} relatedTools={relatedTools} />
    </>
  )
}
