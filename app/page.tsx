import type { Metadata } from 'next'
import Script from 'next/script'
import { SITE_URL } from '@/lib/site'
import { SEED_TOOLS, SEED_DEV_TOOLS, SEED_REPOS, SEED_COURSES, SEED_OFFERS } from '@/lib/seed'
import { HomeView } from '@/components/home/HomeView'
import { PartnersMarquee } from '@/components/layout/PartnersMarquee'
import { HOME_FAQS } from '@/components/home/FaqSection'
import { safeJsonLd } from '@/lib/json-ld'

export const metadata: Metadata = {
  title: 'AI Hunt - AI Tools, n8n Automation, Courses & Freelancing Skills in Morocco',
  description:
    'Morocco-first directory to learn AI, n8n automation, development, and freelancing: discover AI tools, follow coding courses, and build job-ready skills. Free community-curated resources for Moroccan developers and students.',
  openGraph: {
    title: 'AI Hunt - Learn AI, Automation & Freelancing in Morocco',
    description:
      'Discover AI tools, master n8n automation, take coding courses, and build freelancing skills. Free resources for Morocco.',
    url: SITE_URL,
    siteName: 'AI Hunt',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: 'AI Hunt - Discover AI Tools & Developer Resources',
      },
    ],
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
