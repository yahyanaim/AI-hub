import type { Metadata } from 'next'
import Script from 'next/script'
import { SITE_URL } from '@/lib/site'
import { HomeView } from '@/components/home/HomeView'
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
  },
  alternates: { canonical: SITE_URL },
}

export default function HomePage() {
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
      <HomeView />
    </>
  )
}
