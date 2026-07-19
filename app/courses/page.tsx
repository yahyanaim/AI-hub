import type { Metadata } from 'next'
import Script from 'next/script'
import { CoursesView } from '@/components/listing/CoursesView'

const baseUrl = 'https://aihubtools.vercel.app'

export const metadata: Metadata = {
  title: 'Coding Courses & Learning Paths',
  description: 'Discover the best free and paid coding courses, learning paths, and roadmaps for web development, AI, data science, and backend engineering. Curated for developers.',
  openGraph: {
    title: 'Coding Courses & Learning Paths — AI Hunt',
    description: 'Discover the best free and paid coding courses, roadmaps, and learning paths for developers. Curated by the community.',
    url: `${baseUrl}/courses`,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'AI Hunt Courses' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coding Courses & Learning Paths — AI Hunt',
    description: 'Discover the best free and paid coding courses and roadmaps for developers.',
    images: ['/og.png'],
  },
  alternates: { canonical: `${baseUrl}/courses` },
}

export default function CoursesPage() {
  return (
    <>
      <Script id="schema-collection-courses" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Coding Courses & Learning Paths',
          description: 'Community-curated collection of the best coding courses and learning paths.',
          url: `${baseUrl}/courses`,
          about: { '@type': 'Thing', name: 'Programming Courses' },
        }),
      }} />
      <CoursesView />
    </>
  )
}
