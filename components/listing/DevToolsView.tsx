'use client'
import { ListingView, ListingCrawlLinks, type FilterOption } from '@/components/listing/ListingView'
import { DevToolCard } from '@/components/cards/DevToolCard'
import { useApp } from '@/lib/store'
import { useRouter } from 'next/navigation'
import {
  DEVTOOL_CATEGORY_LABELS,
  PRICING_LABELS,
  type DevTool,
} from '@/types'
import { devToolTrendingScore } from '@/lib/listing-order'
const categoryOptions: FilterOption[] = Object.entries(DEVTOOL_CATEGORY_LABELS).map(
  ([value, label]) => ({ value, label })
)
const pricingOptions: FilterOption[] = Object.entries(PRICING_LABELS).map(
  ([value, label]) => ({ value, label })
)
export function DevToolsView({
  initialCategory,
  initialItems = [],
}: {
  initialCategory?: string
  initialItems?: DevTool[]
}) {
  const { devTools } = useApp()
  const router = useRouter()
  // Server-prerendered first page so the Suspense fallback is not empty
  // (see lib/listing-order.ts).
  const items = devTools.length ? devTools : initialItems
  // Category hubs get their own H1 + intro (unique per category for SEO);
  // the main hub keeps the generic header.
  const catLabel = initialCategory
    ? DEVTOOL_CATEGORY_LABELS[initialCategory as keyof typeof DEVTOOL_CATEGORY_LABELS]
    : undefined
  return (
    <div className="container-page py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
          {catLabel ?? 'For developers'}
        </div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {catLabel ? `${catLabel} Developer Tools` : 'Dev Tools'}
        </h1>
        <div className="mt-3 w-full rounded-xl border border-brand-orange/50 bg-card px-4 py-3 transition-all duration-200 hover:border-accent hover:shadow-[0_0_24px_var(--accent-glow)]">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {catLabel
              ? `Community-ranked ${catLabel.toLowerCase()} tools for developers — compare options and discover what engineers actually use.`
              : <>Essential tools for modern development workflows &mdash; from IDEs
              and debugging to CI/CD and monitoring.</>}
          </p>
        </div>
      </div>
      {/* All dev tools (including starter packs as a regular category) */}
        {/* Server-rendered crawl links: cards open modals on plain click, so
            this invisible nav is what ships real item URLs to non-JS crawlers. */}
        <ListingCrawlLinks
          items={items}
          label="Dev tools quick links"
          getHref={(t) => `/dev-tools/${t.category}/${t.slug}`}
        />
    <ListingView<DevTool>
      key={initialCategory ?? 'all'}
      items={items}
      config={{
      title: '',
      eyebrow: '',
      description: '',
      categoryLabel: 'Category',
      categoryOptions,
      itemLabel: 'dev-tools',
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
      getTrendingScore={devToolTrendingScore}
    />
    </div>
  )
}
