'use client'

import { useState } from 'react'
import { ListingView, type FilterOption } from '@/components/listing/ListingView'
import { DevToolCard } from '@/components/cards/DevToolCard'
import { StarterPackCard } from '@/components/cards/StarterPackCard'
import { PackDetailModal } from '@/components/detail/PackDetailModal'
import { useApp } from '@/lib/store'
import { Package } from 'lucide-react'
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
  const [selectedPack, setSelectedPack] = useState<DevTool | null>(null)

  const packs = devTools.filter((d) => d.category === 'starter-pack')
  const regularDevTools = devTools.filter((d) => d.category !== 'starter-pack')

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

      {/* Starter Packs section */}
      {packs.length > 0 && (
        <section className="mb-12">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-orange to-orange-400">
              <Package className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-foreground">
                Starter Packs
              </h2>
              <p className="text-xs text-muted-foreground">
                Pre-configured development environments &mdash; pick a stack and start building
              </p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {packs.map((pack) => (
              <StarterPackCard
                key={pack.id}
                devtool={pack}
                onPackClick={setSelectedPack}
              />
            ))}
          </div>
        </section>
      )}

      {/* Divider */}
      {packs.length > 0 && regularDevTools.length > 0 && (
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium text-muted-foreground">All Dev Tools</span>
          <div className="h-px flex-1 bg-border" />
        </div>
      )}

      {/* Regular dev tools */}
      <ListingView<DevTool>
        items={regularDevTools}
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

      {/* Pack Detail Modal */}
      <PackDetailModal pack={selectedPack} onClose={() => setSelectedPack(null)} />
    </div>
  )
}
