import type { Metadata } from 'next'
import { SITE_URL, resolveOgImage } from '@/lib/site'
import { redirect, notFound } from 'next/navigation'
import { SEED_COURSES, SEED_USERS } from '@/lib/seed'
import { CourseDetail } from '@/components/detail/CourseDetail'
import { safeJsonLd } from '@/lib/json-ld'

const baseUrl = SITE_URL

export function generateStaticParams() {
  return SEED_COURSES.map((course) => ({ category: course.category, slug: course.slug }))
}

export async function generateMetadata({ params }: { params: { category: string; slug: string } }): Promise<Metadata> {
  const { category, slug } = params
  const course = SEED_COURSES.find((c) => c.slug === slug && c.category === category)

  if (!course) return { title: 'Course Not Found', robots: { index: false, follow: false } }

  const seoDescription = course.description
    ? `${course.description.replace(/[#_*`]/g, '').split(/\s+/).slice(0, 30).join(' ').slice(0, 155)}`
    : course.tagline
  const ogImage = resolveOgImage(course.logoUrl)
  return {
    title: `${course.name} - ${course.tagline}`,
    description: seoDescription,
    openGraph: {
      title: `${course.name} - ${course.tagline}`,
      description: seoDescription,
      type: 'article',
      url: `${baseUrl}/courses/${course.category}/${course.slug}`,
      images: [{ url: ogImage.src, alt: `${course.name} - AI Hunt` }],
    },
    twitter: {
      card: ogImage.isLogo ? 'summary' : 'summary_large_image',
      title: `${course.name} - ${course.tagline}`,
      description: seoDescription,
      images: [ogImage.src],
    },
    alternates: {
      canonical: `${baseUrl}/courses/${course.category}/${course.slug}`,
    },
  }
}

export default async function CourseDetailPage({ params }: { params: { category: string; slug: string } }) {
  const { category, slug } = params
  const course = SEED_COURSES.find((c) => c.slug === slug && c.category === category)

  if (!course) notFound()

  // If only the category segment is wrong but the slug exists elsewhere,
  // redirect to the canonical category instead of 404.
  const canonical = SEED_COURSES.find((c) => c.slug === slug)
  if (canonical && canonical.category !== category) {
    redirect(`/courses/${canonical.category}/${canonical.slug}`)
  }

  const user = SEED_USERS.find((u) => u.id === course.submittedBy)

  // Provider must be a real organization, not words sliced from the course
  // title. Derive it from the course URL host (e.g. udemy.com -> Udemy).
  let providerName = 'AI Hunt'
  try {
    const host = new URL(course.url).hostname.replace(/^www\./, '')
    if (host) providerName = host
  } catch {
    // keep fallback
  }

  const isFree = course.pricing === 'free' || course.pricing === 'open-source'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.tagline,
    provider: {
      '@type': 'Organization',
      name: providerName,
    },
    educationalCredentialAwarded: course.difficulty === 'beginner' ? 'Beginner' : course.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced',
    timeRequired: course.duration,
    // Only emit offers when the price is known: free courses get price 0,
    // paid courses with unknown price omit offers entirely (price: undefined
    // + priceCurrency fails rich-result validation).
    ...(isFree
      ? {
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            url: course.url,
          },
        }
      : {}),
    author: user ? {
      '@type': 'Person',
      name: user.displayName,
    } : undefined,
    url: `${baseUrl}/courses/${course.category}/${course.slug}`,
    datePublished: course.createdAt,
    dateModified: course.updatedAt,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <CourseDetail slug={slug} initial={course} />
    </>
  )
}