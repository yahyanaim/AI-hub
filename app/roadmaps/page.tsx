import type { Metadata } from 'next'
import Script from 'next/script'
import { SITE_URL } from '@/lib/site'
import { ROADMAP_TRACKS } from '@/lib/roadmaps'
import { RoadmapView } from '@/components/roadmap/RoadmapView'
import { safeJsonLd } from '@/lib/json-ld'

const baseUrl = SITE_URL

export const metadata: Metadata = {
  title: 'CS Roadmaps - Frontend, Backend, AI, Data & More Paths',
  description:
    'Interactive developer roadmaps for 12 CS specialisations: frontend, backend, fullstack, Python, data science, AI engineering, cloud, cybersecurity and more. Each step links to a course.',
  openGraph: {
    title: 'CS Roadmaps - AI Hunt',
    description:
      'Follow interactive roadmaps for frontend, backend, AI, data science, cloud and more. Every step links to a course.',
    url: `${baseUrl}/roadmaps`,
    siteName: 'AI Hunt',
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${baseUrl}/og.png`, width: 1200, height: 630, alt: 'AI Hunt Roadmaps' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CS Roadmaps - AI Hunt',
    description: 'Interactive developer roadmaps with course links for every step.',
    images: [`${baseUrl}/og.png`],
  },
  alternates: { canonical: `${baseUrl}/roadmaps` },
}

export default function RoadmapsPage() {
  return (
    <>
      <Script
        id="schema-collection-roadmaps"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'CS Roadmaps',
            description: 'Interactive learning roadmaps for 12 computer science specialisations, each step linked to a course.',
            url: `${baseUrl}/roadmaps`,
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: ROADMAP_TRACKS.length,
              itemListElement: ROADMAP_TRACKS.map((t, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: `${t.title} Roadmap`,
                url: `${baseUrl}/roadmaps`,
              })),
            },
          }),
        }}
      />
      <div className="container-page py-8">
        <div className="mb-8">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
            Learn
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            CS Roadmaps
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Pick a specialisation and follow the path step by step. Every step
            links to a course from our catalogue — or to Coursera when we do
            not cover it yet. Stuck? Ask the AI about your path below.
          </p>
        </div>
        <RoadmapView />
      </div>
    </>
  )
}
