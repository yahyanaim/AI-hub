import type { Metadata } from 'next'
import { SEED_REPOS } from '@/lib/seed'
import { RepoDetail } from '@/components/detail/RepoDetail'
import { safeJsonLd } from '@/lib/json-ld'
import { SITE_URL, resolveOgImage } from '@/lib/site'

export async function generateStaticParams() {
  return SEED_REPOS.map((repo) => ({ slug: repo.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const repo = SEED_REPOS.find((r) => r.slug === params.slug)
  if (!repo) return { title: 'Editing Tool Not Found', robots: { index: false, follow: false } }
  const seoDescription = repo.description
    ? `${repo.description.replace(/[#_*`]/g, '').split(/\s+/).slice(0, 30).join(' ').slice(0, 155)}`
    : repo.tagline
  const ogImage = resolveOgImage(repo.logoUrl)
  return {
    title: `${repo.name} - ${repo.tagline}`,
    description: seoDescription,
    openGraph: {
      title: `${repo.name} - ${repo.tagline}`,
      description: seoDescription,
      type: 'article',
      url: `${SITE_URL}/edittools/${repo.slug}`,
      images: [{ url: ogImage.src, alt: `${repo.name} - AI Hunt` }],
    },
    twitter: {
      card: ogImage.isLogo ? 'summary' : 'summary_large_image',
      title: `${repo.name} - ${repo.tagline}`,
      description: seoDescription,
      images: [ogImage.src],
    },
    alternates: {
      canonical: `${SITE_URL}/edittools/${repo.slug}`,
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
    description: repo.tagline,
    applicationCategory: 'Multimedia',
    applicationSubCategory: repo.category,
    operatingSystem: 'Web',
    ...(repo.pricing === 'free' || repo.pricing === 'open-source'
      ? {
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            url: repo.url,
          },
        }
      : {}),
    url: `${SITE_URL}/edittools/${repo.slug}`,
    sameAs: repo.url,
    datePublished: repo.createdAt,
    dateModified: repo.updatedAt,
  } : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        />
      )}
      <RepoDetail slug={slug} initial={repo ?? undefined} />
    </>
  )
}
