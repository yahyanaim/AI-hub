'use client'

import { ListingView, type FilterOption } from '@/components/listing/ListingView'
import { DevToolCard } from '@/components/cards/DevToolCard'
import { useApp } from '@/lib/store'
import { useRouter } from 'next/navigation'
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

export function DevToolsView({ initialCategory }: { initialCategory?: string }) {
  const { devTools } = useApp()
  const router = useRouter()

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
        <div className="mt-3 w-full rounded-xl border border-brand-orange/50 bg-card px-4 py-3 transition-all duration-200 hover:border-accent hover:shadow-[0_0_24px_var(--accent-glow)]">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Essential tools for modern development workflows &mdash; from IDEs
            and debugging to CI/CD and monitoring.
          </p>
        </div>
      </div>

      {/* All dev tools (including starter packs as a regular category) */}
      <ListingView<DevTool>
        key={initialCategory ?? 'all'}
        items={devTools}
        config={{
          title: '',
          eyebrow: '',
          description: '',
          categoryLabel: 'Category',
          categoryOptions,
          extraFilters: 'pricing',
          pricingOptions,
          initialCategory,
          onCategoryChange: (cat) => {
            router.push(cat === 'all' ? '/dev-tools' : `/dev-tools/${cat}`)
          },
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
