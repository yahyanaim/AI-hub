import type { Metadata } from 'next'
import { SEED_REPOS } from '@/lib/seed'
import { RepoDetail } from '@/components/detail/RepoDetail'

export async function generateStaticParams() {
  return SEED_REPOS.map((repo) => ({ slug: repo.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const repo = SEED_REPOS.find((r) => r.slug === params.slug)
  if (!repo) return { title: 'Editing Tool Not Found' }
  return {
    title: repo.name,
    description: repo.description,
    openGraph: {
      title: repo.name,
      description: repo.description,
      type: 'article',
      images: repo.logoUrl ? [{ url: repo.logoUrl, alt: repo.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: repo.name,
      description: repo.description,
      images: repo.logoUrl ? [repo.logoUrl] : undefined,
    },
    alternates: {
      canonical: `https://ai-hunt.app/edittools/${repo.slug}`,
    },
  }
}

export default async function EditToolDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const repo = SEED_REPOS.find((r) => r.slug === slug)

  const jsonLd = repo ? {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: repo.name,
    description: repo.description,
    applicationCategory: 'Multimedia',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: repo.pricing === 'free' || repo.pricing === 'open-source' ? '0' : undefined,
      priceCurrency: 'USD',
    },
    url: repo.url,
    datePublished: repo.createdAt,
  } : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <RepoDetail slug={slug} />
    </>
  )
}
