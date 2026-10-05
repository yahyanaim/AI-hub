'use client'
import { ListingView, ListingCrawlLinks, type FilterOption } from '@/components/listing/ListingView'
import { RepoCard } from '@/components/cards/RepoCard'
import { useApp } from '@/lib/store'
import { REPO_CATEGORY_LABELS, type Repo } from '@/types'
import { repoTrendingScore } from '@/lib/listing-order'
const categoryOptions: FilterOption[] = Object.entries(REPO_CATEGORY_LABELS).map(
  ([value, label]) => ({ value, label })
)
export function ReposView({ initialItems = [] }: { initialItems?: Repo[] }) {
  const { repos } = useApp()
  // Server-prerendered first page (see lib/listing-order.ts).
  const items = repos.length ? repos : initialItems
  return (
    <>
      {/* Server-rendered crawl links: cards open modals on plain click, so
          this invisible nav is what ships real item URLs to non-JS crawlers. */}
      <ListingCrawlLinks
        items={items}
          label="Editing tools quick links"
        getHref={(r) => `/edittools/${r.slug}`}
      />
    <ListingView<Repo>
      items={items}
      config={{
      title: 'Editing Tools',
      eyebrow: 'Edit',
      description:
      'Free online PDF editors, image and photo tools, video and audio editors, converters and design tools. Community-voted and curated.',
      categoryLabel: 'Category',
      categoryOptions,
      itemLabel: 'repos',
      }}
      renderCard={(r) => <RepoCard repo={r} />}
      getCategory={(r) => r.category}
      getUpvotes={(r) => r.upvotes}
      getBookmarks={(r) => r.bookmarks}
      getCreatedAt={(r) => r.createdAt}
      getTrendingScore={repoTrendingScore}
    />
    </>
  )
}
