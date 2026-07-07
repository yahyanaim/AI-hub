'use client'

import { ListingView, type FilterOption } from '@/components/listing/ListingView'
import { ToolCard } from '@/components/cards/ToolCard'
import { useApp } from '@/lib/store'
import { TOOL_CATEGORY_LABELS, PRICING_LABELS } from '@/types'

const categoryOptions: FilterOption[] = Object.entries(TOOL_CATEGORY_LABELS).map(
  ([value, label]) => ({ value, label })
)
const pricingOptions: FilterOption[] = Object.entries(PRICING_LABELS).map(
  ([value, label]) => ({ value, label })
)

export function ToolsView() {
  const { tools } = useApp()
  return (
    <ListingView
      items={tools}
      config={{
        title: 'AI Tools',
        eyebrow: 'Discover',
        description:
          'Browse the best AI products across categories — from code editors to image generators. Upvote your favorites.',
        categoryLabel: 'Category',
        categoryOptions,
        extraFilters: 'pricing',
        pricingOptions,
      }}
      renderCard={(tool) => <ToolCard tool={tool} />}
      getCategory={(t) => t.category}
      getPricing={(t) => t.pricing}
      getUpvotes={(t) => t.upvotes}
      getBookmarks={(t) => t.bookmarks}
      getCreatedAt={(t) => t.createdAt}
      getTrendingScore={(t) =>
        t.upvotes + Math.round(t.bookmarks * 0.8) + (t.featured ? 80 : 0)
      }
    />
  )
}
