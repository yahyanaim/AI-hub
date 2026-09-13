import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import Script from 'next/script'
import { CoursesView } from '@/components/listing/CoursesView'
import { SEED_COURSES } from '@/lib/seed'
import { safeJsonLd } from '@/lib/json-ld'

const baseUrl = SITE_URL

const topCourses = [...SEED_COURSES].sort((a, b) => b.upvotes - a.upvotes).slice(0, 10)

export const metadata: Metadata = {
  title: 'Coding Courses & Learning Paths',
  description: 'Free and paid coding courses, roadmaps and learning paths for web, AI, data and backend development.',
  openGraph: {
    title: 'Coding Courses & Learning Paths - AI Hunt',
    description: 'Discover the best free and paid coding courses, roadmaps, and learning paths for developers. Curated by the community.',
    url: `${baseUrl}/courses`,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'AI Hunt Courses' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coding Courses & Learning Paths - AI Hunt',
    description: 'Discover the best free and paid coding courses and roadmaps for developers.',
    images: ['/og.png'],
  },
  alternates: { canonical: `${baseUrl}/courses` },
}

export default function CoursesPage() {
  return (
    <>
      <Script id="schema-collection-courses" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: safeJsonLd({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Coding Courses & Learning Paths',
          description: 'Community-curated collection of the best coding courses and learning paths.',
          url: `${baseUrl}/courses`,
          about: { '@type': 'Thing', name: 'Programming Courses' },
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: topCourses.length,
            itemListElement: topCourses.map((course, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: course.name,
              url: `${baseUrl}/courses/${course.category}/${course.slug}`,
            })),
          },
        }),
      }} />
      <CoursesView />
    </>
  )
}
