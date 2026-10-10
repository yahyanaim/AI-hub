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
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
            The goal-first finder
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Find the best AI tool for what you&apos;re trying to accomplish
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Start with the outcome. Explore real directory listings, see why
            they matched, compare available details, and find a path that fits.
          </p>
        </div>
        <GoalFinder />
      </div>
    </>
  )
}
