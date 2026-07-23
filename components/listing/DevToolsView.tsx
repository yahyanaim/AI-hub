'use client'

import { ListingView, type FilterOption } from '@/components/listing/ListingView'
import { DevToolCard } from '@/components/cards/DevToolCard'
import { useApp } from '@/lib/store'
import {
  DEVTOOL_CATEGORY_LABELS,
  PRICING_LABELS,
  type DevTool,
} from '@/types'

const categoryOptions: FilterOption[] = Object.entries(DEVTOOL_CATEGORY_LABELS).map(
  ([value, label]) => ({ value, label })
)
const pricingOptions: FilterOption[] = Object.entries(PRICING_LABELS).map(
  ([value, label]) => ({ value, label })
)

export function DevToolsView() {
  const { devTools } = useApp()

  return (
    <div className="container-page py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
          For developers
        </div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Dev Tools
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Essential tools for modern development workflows &mdash; from IDEs
          and debugging to CI/CD and monitoring.
        </p>
      </div>

      {/* All dev tools (including starter packs as a regular category) */}
      <ListingView<DevTool>
        items={devTools}
        config={{
          title: '',
          eyebrow: '',
          description: '',
          categoryLabel: 'Category',
          categoryOptions,
          extraFilters: 'pricing',
          pricingOptions,
        }}
        renderCard={(devtool) => <DevToolCard devtool={devtool} />}
        getCategory={(t) => t.category}
        getPricing={(t) => t.pricing}
        getUpvotes={(t) => t.upvotes}
        getBookmarks={(t) => t.bookmarks}
        getCreatedAt={(t) => t.createdAt}
        getTrendingScore={(t) =>
          t.upvotes + Math.round(t.bookmarks * 0.8) + (t.featured ? 80 : 0)
        }
      />
    </div>
  )
}
