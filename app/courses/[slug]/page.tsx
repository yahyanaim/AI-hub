import type { Metadata } from 'next'
import { SEED_COURSES, SEED_USERS } from '@/lib/seed'
import { CourseDetail } from '@/components/detail/CourseDetail'

export async function generateStaticParams() {
  return SEED_COURSES.map((course) => ({ slug: course.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const course = SEED_COURSES.find((c) => c.slug === params.slug)
  if (!course) return { title: 'Course Not Found' }
  return {
    title: course.name,
    description: course.description,
    openGraph: {
      title: course.name,
      description: course.description,
      type: 'article',
      images: course.logoUrl ? [{ url: course.logoUrl, alt: course.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: course.name,
      description: course.description,
      images: course.logoUrl ? [course.logoUrl] : undefined,
    },
    alternates: {
      canonical: `https://aihubtools.vercel.app/courses/${course.slug}`,
    },
  }
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const course = SEED_COURSES.find((c) => c.slug === slug)
  const user = course ? SEED_USERS.find((u) => u.id === course.submittedBy) : null

  const jsonLd = course ? {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: course.name.split(' ').slice(0, 2).join(' '),
    },
    educationalCredentialAwarded: course.difficulty === 'beginner' ? 'Beginner' : course.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced',
    timeRequired: course.duration,
    offers: {
      '@type': 'Offer',
      price: course.pricing === 'free' || course.pricing === 'open-source' ? '0' : undefined,
      priceCurrency: 'USD',
    },
    author: user ? {
      '@type': 'Person',
      name: user.displayName,
    } : undefined,
    url: course.url,
    datePublished: course.createdAt,
  } : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <CourseDetail slug={slug} />
    </>
  )
}
