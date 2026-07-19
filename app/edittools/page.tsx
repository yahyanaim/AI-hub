import type { Metadata } from 'next'
import Script from 'next/script'
import { ReposView } from '@/components/listing/ReposView'

const baseUrl = 'https://aihubtools.vercel.app'

export const metadata: Metadata = {
  title: 'Open Source GitHub Repos & LLM Tools',
  description: 'Explore top open-source GitHub repositories for AI, LLMs, fine-tuning, RAG, agent frameworks, vector databases, and machine learning. Community-voted and curated.',
  openGraph: {
    title: 'Open Source Repos & LLM Tools — AI Hunt',
    description: 'Discover top open-source GitHub repos for AI, LLMs, RAG, agent frameworks, vector databases, and ML tools.',
    url: `${baseUrl}/edittools`,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'AI Hunt Open Source Repos' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Source Repos & LLM Tools — AI Hunt',
    description: 'Discover top open-source GitHub repos for AI, LLMs, RAG, and ML tools.',
    images: ['/og.png'],
  },
  alternates: { canonical: `${baseUrl}/edittools` },
}

export default function EditToolsPage() {
  return (
    <>
      <Script id="schema-collection-repos" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Open Source GitHub Repos & LLM Tools',
          description: 'Community-curated collection of open-source repos for AI and LLM development.',
          url: `${baseUrl}/edittools`,
          about: { '@type': 'Thing', name: 'Open Source Repositories' },
        }),
      }} />
      <ReposView />
    </>
  )
}
