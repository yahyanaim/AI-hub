'use client'
import { ListingView, ListingCrawlLinks, type FilterOption, type ListingHeading } from '@/components/listing/ListingView'
import { CourseCard } from '@/components/cards/CourseCard'
import { useApp } from '@/lib/store'
import { COURSE_CATEGORY_LABELS, type Course } from '@/types'
import { courseTrendingScore } from '@/lib/listing-order'
import { useRouter } from 'next/navigation'
const categoryOptions: FilterOption[] = Object.entries(COURSE_CATEGORY_LABELS).map(
  ([value, label]) => ({ value, label })
)
export function CoursesView({
  initialCategory,
  initialItems = [],
  heading,
}: {
  initialCategory?: string
  initialItems?: Course[]
  heading?: ListingHeading
}) {
  const { courses } = useApp()
  const router = useRouter()
  // `initialItems` comes from the server page so the Suspense fallback ships real
  // cards + links instead of an empty skeleton (see lib/listing-order.ts).
  const items = courses.length ? courses : initialItems
  return (
    <>
      <div className="container-page pt-6 md:pt-8">
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
      </div>
        {/* Server-rendered crawl links: cards open modals on plain click, so
            this invisible nav is what ships real item URLs to non-JS crawlers. */}
        <ListingCrawlLinks
          items={items}
          label="Courses quick links"
          getHref={(c) => `/courses/${c.category}/${c.slug}`}
        />
    <ListingView<Course>
      items={items}
      config={{
      title: heading?.title ?? 'Learning Courses',
      eyebrow: heading?.eyebrow ?? 'Learn',
      description:
        heading?.description ??
        'Structured roadmaps and learning paths for software developers. From full-stack to AI engineering.',
      categoryLabel: 'Category',
      categoryOptions,
      itemLabel: 'courses',
      initialCategory,
      defaultSort: 'new',
      onCategoryChange: (cat) => {
      router.push(cat === 'all' ? '/courses' : `/courses/${cat}`)
      },
      customCategoryFilter: (itemCategory, item, selectedCategory) => {
      if (selectedCategory === 'high-recommended') {
      return Boolean((item as Course).tags?.includes('high-recommended'))
      }
      return itemCategory === selectedCategory
      },
      }}
      renderCard={(c) => <CourseCard course={c} />}
      getCategory={(c) => c.category}
      getUpvotes={(c) => c.upvotes}
      getBookmarks={(c) => c.bookmarks}
      getCreatedAt={(c) => c.createdAt}
      getTrendingScore={courseTrendingScore}
    />
    </>
  )
}
