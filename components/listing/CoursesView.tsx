'use client'

import { ListingView, type FilterOption } from '@/components/listing/ListingView'
import { CourseCard } from '@/components/cards/CourseCard'
import { useApp } from '@/lib/store'
import { COURSE_CATEGORY_LABELS, type Course } from '@/types'

const categoryOptions: FilterOption[] = Object.entries(COURSE_CATEGORY_LABELS).map(
  ([value, label]) => ({ value, label })
)

export function CoursesView() {
  const { courses } = useApp()

  return (
    <>
      <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">
        <strong>Free access & certification:</strong> To get free access and earn a Coursera certificate, fill out{' '}
        <a
          href="https://recoded.typeform.com/apricot?typeform-source=l.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline hover:text-blue-600 dark:hover:text-blue-300"
        >
          this form
        </a>
        .
      </div>
      <ListingView<Course>
      items={courses}
      config={{
        title: 'Learning Courses',
        eyebrow: 'Learn',
        description:
          'Structured roadmaps and learning paths for software developers. From full-stack to AI engineering.',
        categoryLabel: 'Category',
        categoryOptions,
        itemLabel: 'courses',
      }}
      renderCard={(c) => <CourseCard course={c} />}
      getCategory={(c) => c.category}
      getUpvotes={(c) => c.upvotes}
      getBookmarks={(c) => c.bookmarks}
      getCreatedAt={(c) => c.createdAt}
      getTrendingScore={(c) => c.upvotes + (c.featured ? 100 : 0)}
    />
    </>
  )
}
