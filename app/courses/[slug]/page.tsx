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
  }
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const course = SEED_COURSES.find((c) => c.slug === slug)
  const user = course ? SEED_USERS.find((u) => u.id === course.submittedBy) : null
  return <CourseDetail slug={slug} />
}
