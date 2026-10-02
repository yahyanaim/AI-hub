import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { SITE_URL } from '@/lib/site'
import { SEED_TOOLS, SEED_DEV_TOOLS, SEED_REPOS, SEED_COURSES, SEED_OFFERS } from '@/lib/seed'
import { safeJsonLd } from '@/lib/json-ld'

const baseUrl = SITE_URL
const totalEntries =
  SEED_TOOLS.length + SEED_DEV_TOOLS.length + SEED_REPOS.length + SEED_COURSES.length + SEED_OFFERS.length

export const metadata: Metadata = {
  title: 'About AI Hunt - Who runs this directory and how ranking works',
  description:
    'AI Hunt is a free, community-driven directory of AI tools, dev tools, courses and offers, built Morocco-first by Yahia Naim. Learn how tools are ranked and reviewed.',
  openGraph: {
    title: 'About AI Hunt',
    description:
      'Free community-driven directory of AI tools, dev tools, courses and offers. Morocco-first, curated by Yahia Naim.',
    url: `${baseUrl}/about`,
    siteName: 'AI Hunt',
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${baseUrl}/og.png`, width: 1200, height: 630, alt: 'About AI Hunt' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About AI Hunt',
    description: 'Who runs AI Hunt, how ranking works, and how to contact us.',
    images: [`${baseUrl}/og.png`],
  },
  alternates: { canonical: `${baseUrl}/about` },
}

export default function AboutPage() {
  return (
    <>
      <Script
        id="schema-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About AI Hunt',
            description:
              'Who runs the AI Hunt directory, how tools are ranked, and how to contact the curator.',
            url: `${baseUrl}/about`,
            about: {
              '@type': 'Organization',
              name: 'AI Hunt',
              url: baseUrl,
              founder: { '@type': 'Person', name: 'Yahia Naim' },
            },
          }),
        }}
      />
      <div className="container-page py-12">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            About
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            About AI Hunt
          </h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            AI Hunt is a free, community-driven directory to discover AI tools, developer
            tools, open-source repos, coding courses, and offers. It is built
            Morocco-first, for developers and students in Morocco and worldwide —
            currently listing {totalEntries.toLocaleString()} curated resources.
          </p>

          <h2 className="mt-10 font-heading text-xl font-bold">Who runs it</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            AI Hunt is curated by <strong className="text-foreground">Yahia Naim</strong>,
            a developer building open resources for the Moroccan tech community. New
            submissions are reviewed before going live, and the catalogue is updated
            in the open on{' '}
            <a
              href="https://github.com/yahyanaim/AI-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-orange hover:underline"
            >
              GitHub
            </a>
            .
          </p>

          <h2 className="mt-10 font-heading text-xl font-bold">How ranking works</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            There is no paid placement on AI Hunt. What you see ranked is decided by:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-muted-foreground">
            <li>
              <strong className="text-foreground">Community upvotes and bookmarks</strong>{' '}
              — the most useful resources rise to the top of each section.
            </li>
            <li>
              <strong className="text-foreground">Curation review</strong> — every
              submission is checked for quality, correct categorization, and working
              links before it appears.
            </li>
            <li>
              <strong className="text-foreground">Freshness</strong> — listings carry
              published and updated dates, and stale entries are pruned.
            </li>
          </ul>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Your votes are stored only in your own browser — no account, no tracking,
            no data collection.
          </p>

          <h2 className="mt-10 font-heading text-xl font-bold">What you will find</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-muted-foreground">
            <li>
              <Link href="/tools" className="font-medium text-brand-orange hover:underline">AI tools</Link>{' '}
              for coding, writing, image, video, and productivity.
            </li>
            <li>
              <Link href="/dev-tools" className="font-medium text-brand-orange hover:underline">Developer tools</Link>{' '}
              — IDEs, CI/CD, testing, databases, and APIs.
            </li>
            <li>
              <Link href="/courses" className="font-medium text-brand-orange hover:underline">Coding courses</Link>{' '}
              and roadmaps from beginner to advanced, including AI engineering.
            </li>
            <li>
              <Link href="/offers" className="font-medium text-brand-orange hover:underline">Offers</Link>{' '}
              — fellowships, programs, and deals with step-by-step claim guides.
            </li>
          </ul>

          <h2 className="mt-10 font-heading text-xl font-bold">Contact</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Questions, corrections, or partnership ideas? Reach out through the{' '}
            <Link href="/support" className="font-medium text-brand-orange hover:underline">
              support page
            </Link>
            , or open an issue on{' '}
            <a
              href="https://github.com/yahyanaim/AI-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-orange hover:underline"
            >
              GitHub
            </a>
            . To add a resource, use the{' '}
            <Link href="/submit" className="font-medium text-brand-orange hover:underline">
              submit page
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  )
}
