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
  )
}
