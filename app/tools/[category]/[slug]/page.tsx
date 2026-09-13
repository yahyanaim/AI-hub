import type { Metadata } from 'next'
import { SEED_TOOLS, SEED_USERS } from '@/lib/seed'
import { ToolDetail } from '@/components/detail/ToolDetail'
import { safeJsonLd } from '@/lib/json-ld'
import { SITE_URL } from '@/lib/site'

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
  const seoDescription = tool.description
    ? `${tool.description.replace(/[#_*`]/g, '').slice(0, 155)}`
    : tool.tagline
  return {
    title: `${tool.name} - ${tool.tagline}`,
    description: seoDescription,
    openGraph: {
      title: `${tool.name} - ${tool.tagline}`,
      description: seoDescription,
      type: 'article',
      images: tool.logoUrl ? [{ url: tool.logoUrl, alt: tool.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} - ${tool.tagline}`,
      description: seoDescription,
      images: tool.logoUrl ? [tool.logoUrl] : undefined,
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
  const user = tool ? SEED_USERS.find((u) => u.id === tool.submittedBy) : null

  const jsonLd = tool
    ? {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: tool.name,
        description: tool.tagline,
        applicationCategory: 'DeveloperApplication',
        applicationSubCategory: tool.category,
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price:
            tool.pricing === 'free' || tool.pricing === 'open-source'
              ? '0'
              : undefined,
          priceCurrency: 'USD',
          url: tool.url,
        },
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
      <ToolDetail slug={slug} />
    </>
  )
}
