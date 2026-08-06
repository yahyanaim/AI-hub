import type { Metadata } from 'next'
import { BadgePercent, Construction } from 'lucide-react'
import Link from 'next/link'

const baseUrl = 'https://aihubtools.vercel.app'

export const metadata: Metadata = {
  title: 'Offers & Deals for Developers',
  description: 'Curated offers, discounts, and exclusive deals on AI tools, courses, and developer resources. Coming soon with hand-picked promotions and community-vetted savings.',
  openGraph: {
    title: 'Offers & Deals for Developers — AI Hunt',
    description: 'Curated offers, discounts, and exclusive deals for developers and AI practitioners. Coming soon.',
    url: `${baseUrl}/offers`,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'AI Hunt Offers' }],
  },
  alternates: { canonical: `${baseUrl}/offers` },
}

export default function OffersPage() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-orange/10">
          <BadgePercent className="h-10 w-10 text-brand-orange" />
        </div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
          Offers
        </h1>
        <p className="mt-2 text-muted-foreground">
          Savings and deals worth sharing with the community
        </p>
        <div className="mt-10 rounded-xl border border-dashed border-brand-orange/30 bg-brand-orange/5 p-8">
          <Construction className="mx-auto mb-4 h-12 w-12 text-brand-orange/60" />
          <h2 className="mb-2 font-heading text-xl font-bold text-foreground">
            Stay Tuned
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            We&apos;re curating the best offers, discounts, and exclusive deals on AI tools, courses,
            and developer resources. This section is coming soon with hand-picked promotions and
            verified savings.
          </p>
        </div>
        <Link
          href="/courses"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          Browse Courses Instead
        </Link>
      </div>
    </div>
  )
}