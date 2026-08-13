import type { Metadata } from 'next'
import { redirect, notFound } from 'next/navigation'
import { SEED_COURSES, SEED_USERS } from '@/lib/seed'
import { CourseDetail } from '@/components/detail/CourseDetail'

const baseUrl = 'https://aihubtools.vercel.app'

export function generateStaticParams() {
  return SEED_COURSES.map((course) => ({ category: course.category, slug: course.slug }))
}

export async function generateMetadata({ params }: { params: { category: string; slug: string } }): Promise<Metadata> {
  const { category, slug } = params
  const course = SEED_COURSES.find((c) => c.slug === slug)

  if (!course) return { title: 'Course Not Found' }

  if (course.category !== category) {
    redirect(`/courses/${course.category}/${course.slug}`)
  }

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
      canonical: `${baseUrl}/courses/${course.category}/${course.slug}`,
    },
  }
}

export default async function CourseDetailPage({ params }: { params: { category: string; slug: string } }) {
  const { category, slug } = params
  const course = SEED_COURSES.find((c) => c.slug === slug)

  if (!course) notFound()

  if (course.category !== category) {
    redirect(`/courses/${course.category}/${course.slug}`)
  }

  const user = SEED_USERS.find((u) => u.id === course.submittedBy)

  const jsonLd = {
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
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CourseDetail slug={slug} />
    </>
  )
}