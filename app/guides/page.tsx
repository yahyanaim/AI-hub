import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { SITE_URL } from '@/lib/site'
import { SEED_OFFERS } from '@/lib/seed'
import { isPaidGuide, GUIDES_ENABLED } from '@/lib/guides'
import { safeJsonLd } from '@/lib/json-ld'
import { GuidesView } from '@/components/guides/GuidesView'

const baseUrl = SITE_URL
const guides = SEED_OFFERS.filter(isPaidGuide)

// Force request-time rendering while guides are disabled so notFound() below
// returns a real HTTP 404 (not a statically prerendered 200 soft-404).
// Remove when GUIDES_ENABLED flips true and the page has real content.
export const dynamic = GUIDES_ENABLED ? 'auto' : 'force-dynamic'

export const metadata: Metadata = {
  title: 'Paid Guides — Premium PDF Playbooks',
  description:
    'Premium PDF guides. Pay by virement, send “Hi, I paid” + receipt on WhatsApp, receive the PDF on WhatsApp.',
  // Guides are not launched yet (GUIDES_ENABLED = false): keep the route out of
  // the index until it ships. Flip back to index:true when guides go live.
  robots: GUIDES_ENABLED ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    title: 'Paid Guides - AI Hunt',
    description: 'Premium PDF playbooks with WhatsApp delivery.',
    url: `${baseUrl}/guides`,
    siteName: 'AI Hunt',
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${baseUrl}/og.png`, width: 1200, height: 630, alt: 'AI Hunt Guides' }],
  },
  alternates: { canonical: `${baseUrl}/guides` },
}

export default function GuidesPage() {
  if (!GUIDES_ENABLED) notFound()
  return (
    <>
      <Script
        id="schema-collection-guides"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Paid Guides',
            description: 'Premium PDF playbooks delivered via WhatsApp.',
            url: `${baseUrl}/guides`,
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: guides.length,
              itemListElement: guides.map((g, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: g.name,
                url: `${baseUrl}/guides/${g.slug}`,
              })),
            },
          }),
        }}
      />
      <GuidesView />
    </>
  )
}
