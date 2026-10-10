import type { Metadata } from 'next'
import Script from 'next/script'
import { SITE_URL } from '@/lib/site'
import { GoalFinder } from '@/components/goal/GoalFinder'
import { safeJsonLd } from '@/lib/json-ld'

const baseUrl = SITE_URL

export const metadata: Metadata = {
  title: 'Find AI Tools by Goal - Describe It, Get Matches',
  description:
    'Start with your goal and get matched AI tools from our catalogue. See why each matched, compare pricing, or ask the AI for guidance. Free, no account needed.',
  openGraph: {
    title: 'Find AI Tools by Goal - AI Hunt',
    description:
      'Describe what you want to accomplish and get matched tools with honest match reasons.',
    url: `${baseUrl}/find-by-goal`,
    siteName: 'AI Hunt',
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${baseUrl}/og.png`, width: 1200, height: 630, alt: 'Find AI tools by goal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find AI Tools by Goal - AI Hunt',
    description: 'Describe your goal, get matched AI tools with match reasons.',
    images: [`${baseUrl}/og.png`],
  },
  alternates: { canonical: `${baseUrl}/find-by-goal` },
}

export default function FindByGoalPage() {
  return (
    <>
      <Script
        id="schema-howto-goal"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'Find the right AI tool for your goal',
            description:
              'Describe your goal, review matched catalogue listings, and compare options.',
            step: [
              { '@type': 'HowToStep', position: 1, name: 'Start with the outcome', text: 'Describe the work in your own words.' },
              { '@type': 'HowToStep', position: 2, name: 'Review what matched', text: 'See real catalogue listings and matched terms.' },
              { '@type': 'HowToStep', position: 3, name: 'Explore the tradeoffs', text: 'Compare pricing and open the detail page that fits.' },
            ],
          }),
        }}
      />
      <div className="container-page py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-orange">
            <span className="inline-block h-px w-5 bg-brand-orange" />
            The goal-first finder
          </div>
          <h1 className="mt-3 max-w-3xl font-heading font-semibold leading-[1.05] tracking-tight text-foreground text-[clamp(38px,5vw,58px)]">
            Find the best AI tool for{' '}
            <em className="not-italic text-brand-orange">what you&apos;re trying to accomplish.</em>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Start with the outcome. Explore real directory listings, see why
            they matched, compare available details, and find a path that fits.
          </p>
        </div>
        <GoalFinder />
      </div>
    </>
  )
}
