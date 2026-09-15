import type { Metadata } from 'next'
import { redirect, notFound } from 'next/navigation'
import { SEED_DEV_TOOLS, SEED_USERS } from '@/lib/seed'
import { DevToolDetail } from '@/components/detail/DevToolDetail'
import { safeJsonLd } from '@/lib/json-ld'
import { SITE_URL, resolveOgImage } from '@/lib/site'

export async function generateStaticParams() {
  return SEED_DEV_TOOLS.map((tool) => ({
    category: tool.category,
    slug: tool.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string }
}): Promise<Metadata> {
  const { category, slug } = params
  const tool = SEED_DEV_TOOLS.find((t) => t.slug === slug)
  if (!tool) return { title: 'Dev Tool Not Found', robots: { index: false, follow: false } }

  if (tool.category !== category) {
    redirect(`/dev-tools/${tool.category}/${tool.slug}`)
  }
  const seoDescription = tool.description
    ? `${tool.description.replace(/[#_*`]/g, '').split(/\s+/).slice(0, 30).join(' ').slice(0, 155)}`
    : tool.tagline
  const ogImage = resolveOgImage(tool.logoUrl)
  return {
    title: `${tool.name} - ${tool.tagline}`,
    description: seoDescription,
    openGraph: {
      title: `${tool.name} - ${tool.tagline}`,
      description: seoDescription,
      type: 'article',
      url: `${SITE_URL}/dev-tools/${tool.category}/${tool.slug}`,
      images: [{ url: ogImage.src, alt: `${tool.name} - AI Hunt` }],
    },
    twitter: {
      card: ogImage.isLogo ? 'summary' : 'summary_large_image',
      title: `${tool.name} - ${tool.tagline}`,
      description: seoDescription,
      images: [ogImage.src],
    },
    alternates: {
      canonical: `${SITE_URL}/dev-tools/${tool.category}/${tool.slug}`,
    },
  }
}

export default async function DevToolDetailPage({
  params,
}: {
  params: { category: string; slug: string }
}) {
  const { category, slug } = params
  const tool = SEED_DEV_TOOLS.find((t) => t.slug === slug)

  if (!tool) notFound()

  if (tool.category !== category) {
    redirect(`/dev-tools/${tool.category}/${tool.slug}`)
  }

  const user = SEED_USERS.find((u) => u.id === tool.submittedBy) ?? null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.tagline,
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: tool.category,
    operatingSystem: 'Cross-platform',
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
    author: user ? {
      '@type': 'Person',
      name: user.displayName,
    } : undefined,
    url: `${SITE_URL}/dev-tools/${tool.category}/${tool.slug}`,
    sameAs: tool.url,
    datePublished: tool.createdAt,
    dateModified: tool.updatedAt,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <DevToolDetail slug={slug} initial={tool} />
    </>
  )
}