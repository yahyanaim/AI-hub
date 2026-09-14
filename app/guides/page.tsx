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

export const metadata: Metadata = {
  title: 'Paid Guides — Premium PDF Playbooks',
  description:
    'Premium PDF guides. Pay by virement, send “Hi, I paid” + receipt on WhatsApp, receive the PDF on WhatsApp.',
  openGraph: {
    title: 'Paid Guides - AI Hunt',
    description: 'Premium PDF playbooks with WhatsApp delivery.',
    url: `${baseUrl}/guides`,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'AI Hunt Guides' }],
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
