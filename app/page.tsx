import type { Metadata } from 'next'
import Script from 'next/script'
import { SITE_URL } from '@/lib/site'
import { SEED_TOOLS, SEED_DEV_TOOLS, SEED_REPOS, SEED_COURSES, SEED_OFFERS } from '@/lib/seed'
import { HomeView } from '@/components/home/HomeView'
import { PartnersMarquee } from '@/components/layout/PartnersMarquee'
import { HOME_FAQS } from '@/components/home/FaqSection'
import { safeJsonLd } from '@/lib/json-ld'

export const metadata: Metadata = {
  title: 'AI Hunt - Discover the Best AI Tools in Morocco',
  description:
    'AI Hunt (AI Hub Tools) is a Morocco-first directory to discover AI tools, dev tools, coding courses and developer offers. Free, community-ranked resources for developers and students.',
  openGraph: {
    title: 'AI Hunt - Discover the Best AI Tools in Morocco',
    description:
      'Morocco-first directory of AI tools, dev tools, coding courses and developer offers. Free, ranked by the community.',
    url: SITE_URL,
    siteName: 'AI Hunt',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/og-hero.png`,
        width: 1200,
        height: 630,
        alt: 'AI Hunt homepage - discover AI tools, courses and developer resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Hunt - Discover the Best AI Tools in Morocco',
    description:
      'Morocco-first directory of AI tools, dev tools, coding courses and developer offers. Free, ranked by the community.',
    images: [`${SITE_URL}/og-hero.png`],
  },
  alternates: { canonical: SITE_URL },
}

export default function HomePage() {
  // Server-rendered first paint for crawlers: top-ranked items + full counts.
  // Sorts mirror HomeView exactly so hydration never reshuffles the grid.
  const byUpvotes = (a: { upvotes: number }, b: { upvotes: number }) => b.upvotes - a.upvotes
  const initialTools = [...SEED_TOOLS].sort(byUpvotes).slice(0, 12)
  const initialDevTools = [...SEED_DEV_TOOLS].sort(byUpvotes).slice(0, 8)
  const initialRepos = [...SEED_REPOS].sort(byUpvotes).slice(0, 8)
  const initialCounts = {
    tools: SEED_TOOLS.length,
    devTools: SEED_DEV_TOOLS.length,
    repos: SEED_REPOS.length,
    courses: SEED_COURSES.length,
    offers: SEED_OFFERS.length,
  }
  return (
    <>
      <Script
        id="schema-faq-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: HOME_FAQS.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }),
        }}
      />
      <HomeView
        initialTools={initialTools}
        initialDevTools={initialDevTools}
        initialRepos={initialRepos}
        initialCounts={initialCounts}
      />
      {/* Server-rendered: keeps the 20 crawlable directory links in the home
          HTML with zero client JS. Previously this lived behind MarqueeGate in
          the root layout, which dragged the whole seed catalogue into the
          global client bundle (audit §6.1). */}
      <div className="container-page">
        <PartnersMarquee />
      </div>
    </>
  )
}
