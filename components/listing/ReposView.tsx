'use client'

import { ListingView, type FilterOption } from '@/components/listing/ListingView'
import { RepoCard } from '@/components/cards/RepoCard'
import { useApp } from '@/lib/store'
import { REPO_CATEGORY_LABELS, type Repo } from '@/types'

const categoryOptions: FilterOption[] = Object.entries(REPO_CATEGORY_LABELS).map(
  ([value, label]) => ({ value, label })
)

export function ReposView() {
  const { repos } = useApp()

  return (
    <ListingView<Repo>
      items={repos}
      config={{
        title: 'Editing Tools',
        eyebrow: 'Discover',
        description:
          'Explore top online editing tools ranked by the community.',
        categoryLabel: 'Category',
        categoryOptions,
      }}
      renderCard={(r) => <RepoCard repo={r} />}
      getCategory={(r) => r.category}
      getUpvotes={(r) => r.upvotes}
      getBookmarks={(r) => r.bookmarks}
      getCreatedAt={(r) => r.createdAt}
      getTrendingScore={(r) =>
        r.upvotes + (r.featured ? 100 : 0)
      }
    />
  )
}
