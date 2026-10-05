import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import Script from 'next/script'
import { ReposView } from '@/components/listing/ReposView'
import { SEED_REPOS } from '@/lib/seed'
import { safeJsonLd } from '@/lib/json-ld'
import { reposFirstPage } from '@/lib/listing-static'
import { breadcrumbJsonLd } from '@/lib/seo'

const baseUrl = SITE_URL

const topRepos = [...SEED_REPOS].sort((a, b) => b.upvotes - a.upvotes).slice(0, 10)

// Prerendered first page for non-JS crawlers — see lib/listing-static.ts.
const firstPage = reposFirstPage()

export const metadata: Metadata = {
  title: 'Editing Tools - Free PDF, Image, Video & Audio Editors',
  description: 'Free online editing tools: PDF editors, image and photo editors, video and audio editors, converters and design tools. Community-ranked and reviewed.',
  openGraph: {
    title: 'Editing Tools - AI Hunt',
    description: 'Discover free PDF editors, image tools, video and audio editors, converters and design tools, ranked by the community.',
    url: `${baseUrl}/edittools`,
    siteName: 'AI Hunt',
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${baseUrl}/og.png`, width: 1200, height: 630, alt: 'AI Hunt Editing Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Editing Tools - AI Hunt',
    description: 'Free PDF, image, video and audio editors, ranked by the community.',
    images: [`${baseUrl}/og.png`],
  },
  alternates: { canonical: `${baseUrl}/edittools` },
}

export default function EditToolsPage() {
  return (
    <>
      <Script id="schema-collection-repos" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: safeJsonLd({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Editing Tools',
          description: 'Community-curated collection of free online editing tools: PDF, image, video and audio.',
          url: `${baseUrl}/edittools`,
          about: { '@type': 'Thing', name: 'Editing Tools' },
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: topRepos.length,
            itemListElement: topRepos.map((repo, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: repo.name,
              url: `${baseUrl}/edittools/${repo.slug}`,
            })),
          },
        }),
      }} />
      <Script id="schema-breadcrumb-edittools" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: safeJsonLd(
          breadcrumbJsonLd(baseUrl, [
            { name: 'Home', path: '/' },
            { name: 'Editing Tools', path: '/edittools' },
          ])
        ),
      }} />
      <ReposView initialItems={firstPage} />
    </>
  )
}

