import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SEED_REPOS } from '@/lib/seed'
import { RepoDetail } from '@/components/detail/RepoDetail'
import { safeJsonLd } from '@/lib/json-ld'
import { seoTitle, seoDescriptionWithName, breadcrumbJsonLd } from '@/lib/seo'
import { SITE_URL, resolveOgImage } from '@/lib/site'

export async function generateStaticParams() {
  return SEED_REPOS.map((repo) => ({ slug: repo.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const repo = SEED_REPOS.find((r) => r.slug === params.slug)
  if (!repo) return { title: 'Editing Tool Not Found', robots: { index: false, follow: false } }
  const title = seoTitle(repo.name, repo.tagline)
  const seoDescriptionText = seoDescriptionWithName(repo.name, repo.description, repo.tagline)
  const ogImage = resolveOgImage(repo.logoUrl)
  return {
    title,
    description: seoDescriptionText,
    openGraph: {
      title,
      description: seoDescriptionText,
      type: 'article',
      siteName: 'AI Hunt',
      url: `${SITE_URL}/edittools/${repo.slug}`,
      images: [{ url: ogImage.src, alt: `${repo.name} - AI Hunt` }],
    },
    twitter: {
      card: ogImage.isLogo ? 'summary' : 'summary_large_image',
      title,
      description: seoDescriptionText,
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
  // Unknown slugs 404 at the middleware layer; this is the fallback.
  if (!repo) notFound()

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
      {repo && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(
              breadcrumbJsonLd(SITE_URL, [
                { name: 'Home', path: '/' },
                { name: 'Open Source Repos', path: '/edittools' },
                { name: repo.name, path: `/edittools/${repo.slug}` },
              ])
            ),
          }}
        />
      )}
      <RepoDetail slug={slug} initial={repo ?? undefined} />
    </>
  )
}
