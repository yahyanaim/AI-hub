'use client'
import { ListingView, ListingCrawlLinks, type FilterOption } from '@/components/listing/ListingView'
import { ToolCard } from '@/components/cards/ToolCard'
import { useApp } from '@/lib/store'
import { TOOL_CATEGORY_LABELS, PRICING_LABELS, type Tool } from '@/types'
import { toolTrendingScore } from '@/lib/listing-order'
const categoryOptions: FilterOption[] = Object.entries(TOOL_CATEGORY_LABELS).map(
  ([value, label]) => ({ value, label })
)
const pricingOptions: FilterOption[] = Object.entries(PRICING_LABELS).map(
  ([value, label]) => ({ value, label })
)
/**
 * `initialItems` is the first page prerendered by app/tools/page.tsx. The store
 * starts empty on the server, so without it the Suspense fallback would ship a
 * heading with no cards and no links.
 */
export function ToolsView({ initialItems = [] }: { initialItems?: Tool[] }) {
  const { tools } = useApp()
  const items = tools.length ? tools : initialItems
  return (
    <>
      {/* Server-rendered crawl links: ToolCard opens a modal on plain click, so
          this invisible nav is what ships real item URLs to non-JS crawlers. */}
      <ListingCrawlLinks
        items={items}
        label="AI tools quick links"
        getHref={(t) => `/tools/${t.category}/${t.slug}`}
      />
    <ListingView
      items={items}
      config={{
      title: 'AI Tools',
      eyebrow: 'Discover',
      description:
      'Browse the best AI products across categories - from code editors to image generators. Upvote your favorites.',
      categoryLabel: 'Category',
      categoryOptions,
      syncCategoryToUrl: true,
      extraFilters: 'pricing',
      pricingOptions,
      }}
      renderCard={(tool) => <ToolCard tool={tool} />}
      getCategory={(t) => t.category}
      getPricing={(t) => t.pricing}
      getUpvotes={(t) => t.upvotes}
      getBookmarks={(t) => t.bookmarks}
      getCreatedAt={(t) => t.createdAt}
      getTrendingScore={toolTrendingScore}
    />
    </>
  )
}
