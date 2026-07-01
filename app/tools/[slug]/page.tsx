import type { Metadata } from 'next'
import Script from 'next/script'
import { SEED_TOOLS, SEED_USERS } from '@/lib/seed'
import { ToolDetail } from '@/components/detail/ToolDetail'

export async function generateStaticParams() {
  return SEED_TOOLS.map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tool = SEED_TOOLS.find((t) => t.slug === params.slug)
  if (!tool) return { title: 'Tool Not Found' }
  return {
    title: tool.name,
    description: tool.tagline,
    openGraph: {
      title: tool.name,
      description: tool.tagline,
      type: 'article',
      images: tool.logoUrl ? [{ url: tool.logoUrl, alt: tool.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.name,
      description: tool.tagline,
      images: tool.logoUrl ? [tool.logoUrl] : undefined,
    },
    alternates: {
      canonical: `https://ai-hunt.app/tools/${tool.slug}`,
    },
  }
}

export default async function ToolDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const tool = SEED_TOOLS.find((t) => t.slug === slug)
  const user = tool ? SEED_USERS.find((u) => u.id === tool.submittedBy) : null

  const jsonLd = tool ? {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.tagline,
    applicationCategory: tool.category,
    offers: {
      '@type': 'Offer',
      price: tool.pricing === 'free' || tool.pricing === 'open-source' ? '0' : undefined,
      priceCurrency: 'USD',
    },
    author: user ? {
      '@type': 'Person',
      name: user.displayName,
    } : undefined,
    url: tool.url,
    datePublished: tool.createdAt,
  } : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ToolDetail slug={slug} />
    </>
  )
}
