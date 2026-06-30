'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { SearchX, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import { CardGrid } from '@/components/cards/CardPrimitives'
import { Dropdown, ChipFilter, ClearButton } from '@/components/layout/FilterBar'
import type { FilterOption } from '@/components/layout/FilterBar'
export type { FilterOption }
import { ViewToggle } from '@/components/layout/ViewToggle'
import { cn } from '@/lib/utils'

type SortKey = 'trending' | 'top' | 'new' | 'bookmarked'

const SORT_OPTIONS: FilterOption[] = [
  { value: 'trending', label: 'Trending' },
  { value: 'top', label: 'Top' },
  { value: 'new', label: 'New' },
  { value: 'bookmarked', label: 'Most Bookmarked' },
]

const PAGE_SIZE = 12

export interface ListingConfig {
  title: string
  eyebrow: string
  description: string
  categoryLabel: string
  categoryOptions: FilterOption[]
  extraFilters?: 'pricing' | 'language'
  pricingOptions?: FilterOption[]
  languageOptions?: FilterOption[]
}

interface ListingViewProps<T> {
  items: T[]
  config: ListingConfig
  renderCard: (item: T, view: 'grid' | 'list') => React.ReactNode
  getCategory: (item: T) => string
  getPricing?: (item: T) => string
  getLanguage?: (item: T) => string
  getUpvotes: (item: T) => number
  getBookmarks: (item: T) => number
  getCreatedAt: (item: T) => string
  getTrendingScore?: (item: T) => number
  pageSize?: number
}

export function ListingView<T extends { id: string }>({
  items,
  config,
  renderCard,
  getCategory,
  getPricing,
  getLanguage,
  getUpvotes,
  getBookmarks,
  getCreatedAt,
  getTrendingScore,
  pageSize = PAGE_SIZE,
}: ListingViewProps<T>) {
  const [sort, setSort] = useState<SortKey>('trending')
  const [category, setCategory] = useState('all')
  const [pricing, setPricing] = useState('all')
  const [language, setLanguage] = useState('all')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let arr = [...items]
    if (category !== 'all') arr = arr.filter((i) => getCategory(i) === category)
    if (pricing !== 'all' && getPricing) arr = arr.filter((i) => getPricing(i) === pricing)
    if (language !== 'all' && getLanguage) arr = arr.filter((i) => getLanguage(i) === language)

    arr.sort((a, b) => {
      switch (sort) {
        case 'top':
          return getUpvotes(b) - getUpvotes(a)
        case 'new':
          return (
            new Date(getCreatedAt(b)).getTime() -
            new Date(getCreatedAt(a)).getTime()
          )
        case 'bookmarked':
          return getBookmarks(b) - getBookmarks(a)
        case 'trending':
        default: {
          const sa = getTrendingScore?.(a) ?? getUpvotes(a)
          const sb = getTrendingScore?.(b) ?? getUpvotes(b)
          return sb - sa
        }
      }
    })
    return arr
  }, [
    items,
    sort,
    category,
    pricing,
    language,
    getCategory,
    getPricing,
    getLanguage,
    getUpvotes,
    getBookmarks,
    getCreatedAt,
    getTrendingScore,
  ])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  const hasFilters =
    category !== 'all' || pricing !== 'all' || language !== 'all' || sort !== 'trending'

  const clearFilters = () => {
    setCategory('all')
    setPricing('all')
    setLanguage('all')
    setSort('trending')
    setPage(1)
  }

  const changeFilter = <T,>(setter: (v: T) => void, value: T) => {
    setter(value)
    setPage(1)
  }

  return (
    <div className={config.title ? 'container-page py-8' : ''}>
      {config.title && (
        <div className="mb-8">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
            {config.eyebrow}
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {config.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {config.description}
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="mb-6 space-y-3 border-b border-border pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Sort
          </span>
          <Dropdown label="" value={sort} options={SORT_OPTIONS} onChange={(v) => changeFilter(setSort, v as SortKey)} />
          {config.extraFilters?.includes('pricing') && config.pricingOptions && (
            <Dropdown label="Pricing" value={pricing} options={config.pricingOptions} onChange={(v) => changeFilter(setPricing, v)} />
          )}
          {config.extraFilters?.includes('language') && config.languageOptions && (
            <Dropdown label="Language" value={language} options={config.languageOptions} onChange={(v) => changeFilter(setLanguage, v)} />
          )}
          <div className="ml-auto flex items-center gap-2">
            {hasFilters && <ClearButton onClick={clearFilters} />}
            <ViewToggle view={view} onChange={setView} />
          </div>
        </div>

        {/* Category chips */}
        <ChipFilter
          label={config.categoryLabel}
          options={[{ value: 'all', label: 'All' }, ...config.categoryOptions]}
          value={category}
          onChange={(v) => changeFilter(setCategory, v)}
        />
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{filtered.length}</span> tools &middot; Page {page} of {totalPages}
      </div>

      {/* Grid / List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-20 text-center">
          <SearchX className="mb-3 h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No results match your filters.</p>
          <button onClick={clearFilters} className="btn-ghost mt-3">
            Clear filters
          </button>
        </div>
      ) : view === 'grid' ? (
        <CardGrid>
          {paginated.map((item) => (
            <div key={item.id} role="listitem">
              {renderCard(item, 'grid')}
            </div>
          ))}
        </CardGrid>
      ) : (
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-3"
          role="list"
        >
          {paginated.map((item) => (
            <div key={item.id} role="listitem">
              {renderCard(item, 'list')}
            </div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn-ghost flex items-center gap-1 px-3 py-2 text-sm disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </button>
          <div className="flex items-center gap-1">
            {(() => {
              const pages: (number | '...')[] = [1]
              if (page > 3) pages.push('...')
              for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
                if (i > 1 && i < totalPages) pages.push(i)
              }
              if (page < totalPages - 2) pages.push('...')
              if (totalPages > 1) pages.push(totalPages)
              return pages.map((p, idx) =>
                p === '...' ? (
                  <span key={`e-${idx}`} className="flex h-8 w-8 items-center justify-center text-sm text-muted-foreground">
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors',
                      p === page
                        ? 'bg-brand-orange text-white'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {p}
                  </button>
                )
              )
            })()}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="btn-ghost flex items-center gap-1 px-3 py-2 text-sm disabled:opacity-30"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
