import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import Script from 'next/script'
import { CoursesView } from '@/components/listing/CoursesView'
import { SEED_COURSES } from '@/lib/seed'
import { safeJsonLd } from '@/lib/json-ld'
import { coursesFirstPage } from '@/lib/listing-static'
import { breadcrumbJsonLd } from '@/lib/seo'

const baseUrl = SITE_URL

const topCourses = [...SEED_COURSES].sort((a, b) => b.upvotes - a.upvotes).slice(0, 10)

// Prerendered first page for non-JS crawlers — see lib/listing-static.ts.
const firstPage = coursesFirstPage()

export const metadata: Metadata = {
  title: 'Coding & AI Courses - Learn Programming Online',
  description: 'Free and paid coding courses and roadmaps: AI engineering, prompt engineering, Python, automation with n8n, web and backend development. Community-ranked learning paths.',
  openGraph: {
    title: 'Coding & AI Courses - AI Hunt',
    description: 'Discover free and paid coding courses: AI engineering, prompt engineering, Python, n8n automation, web and backend roadmaps.',
    url: `${baseUrl}/courses`,
    siteName: 'AI Hunt',
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${baseUrl}/og.png`, width: 1200, height: 630, alt: 'AI Hunt Courses' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coding Courses & Learning Paths - AI Hunt',
    description: 'Discover the best free and paid coding courses and roadmaps for developers.',
    images: [`${baseUrl}/og.png`],
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
      <Script id="schema-breadcrumb-courses" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: safeJsonLd(
          breadcrumbJsonLd(baseUrl, [
            { name: 'Home', path: '/' },
            { name: 'Courses', path: '/courses' },
          ])
        ),
      }} />
      <CoursesView initialItems={firstPage} />
    </>
  )
}
