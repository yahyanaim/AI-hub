'use client'

import { ListingView, type FilterOption } from '@/components/listing/ListingView'
import { ToolCard } from '@/components/cards/ToolCard'
import { useApp } from '@/lib/store'
import { TOOL_CATEGORY_LABELS, PRICING_LABELS, type Tool } from '@/types'

const categoryOptions: FilterOption[] = Object.entries(TOOL_CATEGORY_LABELS).map(
  ([value, label]) => ({ value, label })
)
const pricingOptions: FilterOption[] = Object.entries(PRICING_LABELS).map(
  ([value, label]) => ({ value, label })
)

const FREE_PRICING = new Set(['free', 'open-source'])

const SUB_OPTIONS: FilterOption[] = [
  { value: 'images', label: 'Images' },
  { value: 'coding', label: 'Coding' },
  { value: 'deep-search', label: 'Deep Search' },
  { value: 'video', label: 'Video' },
  { value: 'text-generation', label: 'Text Generation' },
]

const SUB_FILTER_MAP: Record<string, string[]> = {
  images: ['image'],
  coding: ['coding'],
  'deep-search': ['research', 'data'],
  video: ['video'],
  'text-generation': ['writing', 'marketing'],
}

export function ToolsView() {
  const { tools } = useApp()
  return (
    <ListingView<Tool>
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
        customCategoryFilter: (cat, item, selected) => {
          if (selected === 'free-alternatives') {
            return FREE_PRICING.has((item as Tool).pricing)
          }
          return cat === selected
        },
        subcategoryOptions: SUB_OPTIONS,
        subcategoryLabel: 'Type',
        subcategoryFilter: (item, sub) =>
          SUB_FILTER_MAP[sub]?.includes((item as Tool).category) ?? false,
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
