import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import Script from 'next/script'
import { redirect, notFound } from 'next/navigation'
import { SEED_COURSES } from '@/lib/seed'
import { COURSE_CATEGORY_LABELS } from '@/types'
import { CoursesView } from '@/components/listing/CoursesView'
import { safeJsonLd } from '@/lib/json-ld'

const baseUrl = SITE_URL

export function generateStaticParams() {
  return Object.keys(COURSE_CATEGORY_LABELS).map((category) => ({ category }))
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const { category } = params

  const label = COURSE_CATEGORY_LABELS[category as keyof typeof COURSE_CATEGORY_LABELS]
  if (label) {
    return {
      title: `${label} Courses`,
      description: `Explore the best curated ${label.toLowerCase()} courses, learning paths, and roadmaps for developers.`,
      openGraph: {
        title: `${label} Courses - AI Hunt`,
        description: `Curated ${label.toLowerCase()} courses and roadmaps for developers.`,
        url: `${baseUrl}/courses/${category}`,
        images: [{ url: '/og.png', width: 1200, height: 630, alt: 'AI Hunt Courses' }],
      },
      alternates: { canonical: `${baseUrl}/courses/${category}` },
    }
  }

  const legacy = SEED_COURSES.find((c) => c.slug === category)
  if (legacy) {
    redirect(`/courses/${legacy.category}/${legacy.slug}`)
  }

  return { title: 'Courses Not Found' }
}

export default function CourseCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params

  const label = COURSE_CATEGORY_LABELS[category as keyof typeof COURSE_CATEGORY_LABELS]
  if (!label) {
    const legacy = SEED_COURSES.find((c) => c.slug === category)
    if (legacy) redirect(`/courses/${legacy.category}/${legacy.slug}`)
    notFound()
  }

  return (
    <>
      <Script id={`schema-collection-courses-${category}`} type="application/ld+json" dangerouslySetInnerHTML={{
        __html: safeJsonLd({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${label} Courses`,
          description: `Community-curated collection of the best ${label.toLowerCase()} courses and learning paths.`,
          url: `${baseUrl}/courses/${category}`,
        }),
      }} />
      <CoursesView initialCategory={category} />
    </>
  )
}