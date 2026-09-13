'use client'

import { useMemo, useState, useEffect, useRef } from 'react'
import { Suspense } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { SearchX, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import { CardGrid } from '@/components/cards/CardPrimitives'
import { Dropdown, ChipFilter, ClearButton } from '@/components/layout/FilterBar'
import type { FilterOption } from '@/components/layout/FilterBar'
export type { FilterOption }
import { ViewToggle } from '@/components/layout/ViewToggle'
import { cn } from '@/lib/utils'

export type SortKey = 'trending' | 'top' | 'new' | 'bookmarked'

const SORT_OPTIONS: FilterOption[] = [
  { value: 'trending', label: 'Trending' },
  { value: 'top', label: 'Top' },
  { value: 'new', label: 'New' },
  { value: 'bookmarked', label: 'Most Bookmarked' },
]

const PAGE_SIZE = 12

interface SavedListingState {
  sort?: SortKey
  category?: string
  pricing?: string
  language?: string
  view?: 'grid' | 'list'
  page?: number
}

function loadSavedState(key: string): SavedListingState {
  if (typeof window === 'undefined') return {}
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return {}
    const o = parsed as Record<string, unknown>
    const validSort: SortKey[] = ['trending', 'top', 'new', 'bookmarked']
    return {
      sort: validSort.includes(o.sort as SortKey) ? (o.sort as SortKey) : undefined,
      category: typeof o.category === 'string' ? o.category.slice(0, 60) : undefined,
      pricing: typeof o.pricing === 'string' ? o.pricing.slice(0, 60) : undefined,
      language: typeof o.language === 'string' ? o.language.slice(0, 60) : undefined,
      view: o.view === 'grid' || o.view === 'list' ? o.view : undefined,
      page: typeof o.page === 'number' && Number.isFinite(o.page) ? Math.min(500, Math.max(1, Math.floor(o.page))) : undefined,
    }
  } catch {
    return {}
  }
}

export interface ListingConfig<T = unknown> {
  title: string
  eyebrow: string
  description: string
  categoryLabel: string
  categoryOptions: FilterOption[]
  itemLabel?: string
  extraFilters?: 'pricing' | 'language'
  pricingOptions?: FilterOption[]
  languageOptions?: FilterOption[]
  customCategoryFilter?: (itemCategory: string, item: T, selectedCategory: string) => boolean
  subcategoryOptions?: FilterOption[]
  subcategoryLabel?: string
  subcategoryFilter?: (item: T, subcategory: string) => boolean
  initialCategory?: string
  /** Default sort for first-time visitors (returning visitors restore their saved sort) */
  defaultSort?: SortKey
  /** Mirror the selected category into ?category=<key> so filters are shareable */
  syncCategoryToUrl?: boolean
  onCategoryChange?: (category: string) => void
}

interface ListingViewProps<T> {
  items: T[]
  config: ListingConfig<T>
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

function ListingViewInner<T extends { id: string }>({
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
  // Restore last-visited state (page/filters/view) when coming back to this listing.
  // NOTE: `||` (not `??`) so empty-string titles fall through to the default key
  // instead of colliding on `listing-view:` with other title-less listings.
  const storageKey = `listing-view:${config.itemLabel || config.title || 'default'}`
  const [saved] = useState<SavedListingState>(() => loadSavedState(storageKey))

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const urlCategory = searchParams.get('category')
  const validUrlCategory =
    config.syncCategoryToUrl && urlCategory && config.categoryOptions.some((o) => o.value === urlCategory)
      ? urlCategory
      : null
  const urlPage = (() => {
    const p = Number(searchParams.get('page') ?? '')
    return Number.isFinite(p) && p >= 1 && p <= 500 ? Math.floor(p) : null
  })()
  const urlSort = searchParams.get('sort') as SortKey | null
  const validUrlSort: SortKey | null =
    urlSort === 'trending' || urlSort === 'top' || urlSort === 'new' || urlSort === 'bookmarked' ? urlSort : null

  const [sort, setSort] = useState<SortKey>(validUrlSort ?? saved.sort ?? config.defaultSort ?? 'trending')
  const [category, setCategory] = useState(
    config.initialCategory ?? validUrlCategory ?? saved.category ?? 'all'
  )
  const [pricing, setPricing] = useState(saved.pricing ?? 'all')
  const [language, setLanguage] = useState(saved.language ?? 'all')
  const [view, setView] = useState<'grid' | 'list'>(saved.view ?? 'grid')
  const [page, setPage] = useState(urlPage ?? saved.page ?? 1)

  const syncListingToUrl = (next: { category?: string; sort?: SortKey; page?: number }) => {
    const params = new URLSearchParams(searchParams.toString())
    const cat = next.category ?? category
    const s = next.sort ?? sort
    const p = next.page ?? page
    if (config.syncCategoryToUrl) {
      if (cat === 'all') params.delete('category')
      else params.set('category', cat)
    }
    if (s === (config.defaultSort ?? 'trending')) params.delete('sort')
    else params.set('sort', s)
    if (p <= 1) params.delete('page')
    else params.set('page', String(p))
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  // Persist state on every change
  useEffect(() => {
    try {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify({ sort, category, pricing, language, view, page })
      )
    } catch {
      // storage unavailable
    }
  }, [storageKey, sort, category, pricing, language, view, page])

  // Track scroll position so returning from a detail page restores it.
  // Writes are rAF-throttled: at most one sessionStorage write per frame.
  useEffect(() => {
    const scrollKey = `${storageKey}:scroll`
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        try {
          sessionStorage.setItem(scrollKey, String(window.scrollY))
        } catch {
          // storage unavailable
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [storageKey])

  // Restore scroll once the list has data and rendered
  const [scrollRestored, setScrollRestored] = useState(false)
  useEffect(() => {
    if (scrollRestored || items.length === 0) return
    setScrollRestored(true)
    let target = 0
    try {
      target = Number(sessionStorage.getItem(`${storageKey}:scroll`) ?? 0)
    } catch {
      target = 0
    }
    if (!target) return
    const raf = requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      window.scrollTo(0, Math.max(0, Math.min(target, max)))
    })
    return () => cancelAnimationFrame(raf)
  }, [items.length, scrollRestored, storageKey])

  // React to external category changes (skip first run to preserve restored state)
  const firstCategoryRun = useRef(true)
  useEffect(() => {
    if (config.syncCategoryToUrl) return // URL drives category instead
    if (firstCategoryRun.current) {
      firstCategoryRun.current = false
      return
    }
    const next = config.initialCategory ?? 'all'
    setCategory(next)
    setPage(1)
  }, [config.initialCategory, config.syncCategoryToUrl])

  // Follow ?category= in the URL when syncing is enabled
  const firstUrlRun = useRef(true)
  useEffect(() => {
    if (!config.syncCategoryToUrl) return
    if (firstUrlRun.current) {
      firstUrlRun.current = false
      return
    }
    if (validUrlCategory && validUrlCategory !== category) {
      setCategory(validUrlCategory)
      setPage(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validUrlCategory, config.syncCategoryToUrl])

  const setCategoryWithUrl = (v: string) => {
    changeFilter(setCategory, v)
    syncListingToUrl({ category: v, page: 1 })
  }

  const setSortWithUrl = (v: SortKey) => {
    changeFilter(setSort, v)
    syncListingToUrl({ sort: v, page: 1 })
  }

  // Store function props in refs so inline closures from callers
  // (e.g. getCategory={(t) => t.category}) don't defeat the filter memo.
  const gettersRef = useRef({ getCategory, getPricing, getLanguage, getUpvotes, getBookmarks, getCreatedAt, getTrendingScore, customCategoryFilter: config.customCategoryFilter })
  gettersRef.current = { getCategory, getPricing, getLanguage, getUpvotes, getBookmarks, getCreatedAt, getTrendingScore, customCategoryFilter: config.customCategoryFilter }

  const filtered = useMemo(() => {
    const g = gettersRef.current
    let arr = [...items]
    if (category !== 'all') {
      if (g.customCategoryFilter) {
        arr = arr.filter((i) => g.customCategoryFilter!(g.getCategory(i), i, category))
      } else {
        arr = arr.filter((i) => g.getCategory(i) === category)
      }
    }
    if (pricing !== 'all' && g.getPricing) arr = arr.filter((i) => g.getPricing!(i) === pricing)
    if (language !== 'all' && g.getLanguage) arr = arr.filter((i) => g.getLanguage!(i) === language)

    arr.sort((a, b) => {
      switch (sort) {
        case 'top':
          return g.getUpvotes(b) - g.getUpvotes(a)
        case 'new':
          return (
            new Date(g.getCreatedAt(b)).getTime() -
            new Date(g.getCreatedAt(a)).getTime()
          )
        case 'bookmarked':
          return g.getBookmarks(b) - g.getBookmarks(a)
        case 'trending':
        default: {
          const sa = g.getTrendingScore?.(a) ?? g.getUpvotes(a)
          const sb = g.getTrendingScore?.(b) ?? g.getUpvotes(b)
          return sb - sa
        }
      }
    })
    return arr
  }, [items, sort, category, pricing, language])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  const setPageAndScroll = (next: number | ((p: number) => number)) => {
    setPage((prev) => {
      const resolved = typeof next === 'function' ? (next as (p: number) => number)(prev) : next
      syncListingToUrl({ page: resolved })
      return resolved
    })
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  }

  const pageHref = (p: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (config.syncCategoryToUrl) {
      if (category === 'all') params.delete('category')
      else params.set('category', category)
    }
    if (sort === (config.defaultSort ?? 'trending')) params.delete('sort')
    else params.set('sort', sort)
    if (p <= 1) params.delete('page')
    else params.set('page', String(p))
    const qs = params.toString()
    return qs ? `${pathname}?${qs}` : pathname
  }

  // Keep restored page valid if the item count shrinks. Must wait until the
  // store has hydrated: items start EMPTY and fill asynchronously, so clamping
  // early would wrongly reset a restored page (e.g. page 5) to 1 on every
  // return visit. A legit empty result still has items.length > 0 (only the
  // *filtered* list is empty), so this guard only skips the pre-hydration state.
  useEffect(() => {
    if (items.length === 0) return
    if (page > totalPages) setPage(totalPages)
  }, [totalPages, page, items.length])

  const defaultSort: SortKey = config.defaultSort ?? 'trending'
  const hasFilters =
    category !== 'all' || pricing !== 'all' || language !== 'all' || sort !== defaultSort

  const clearFilters = () => {
    setCategory('all')
    setPricing('all')
    setLanguage('all')
    setSort(defaultSort)
    setPage(1)
    if (config.syncCategoryToUrl && urlCategory) {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('category')
      const qs = params.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    }
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
          <div className="mt-3 w-full rounded-xl border border-brand-orange/50 bg-card px-4 py-3 transition-all duration-200 hover:border-accent hover:shadow-[0_0_24px_var(--accent-glow)]">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {config.description}
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="mb-6 space-y-3 border-b border-border pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Sort
          </span>
          <Dropdown label="" value={sort} options={SORT_OPTIONS} onChange={(v) => setSortWithUrl(v as SortKey)} />
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
          onChange={(v) => {
            setCategoryWithUrl(v)
            config.onCategoryChange?.(v)
          }}
        />
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{filtered.length}</span> {config.itemLabel ?? 'tools'} &middot; Page {page} of {totalPages}
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
        <div className="flex flex-col gap-3" role="list">
          {paginated.map((item) => (
            <div key={item.id} role="listitem">
              {renderCard(item, 'list')}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
          <a
            href={pageHref(Math.max(1, page - 1))}
            onClick={(e) => { e.preventDefault(); setPageAndScroll((p) => Math.max(1, p - 1)) }}
            aria-disabled={page === 1}
            aria-label="Previous page"
            className="btn-ghost flex items-center gap-1 px-3 py-2 text-sm aria-disabled:pointer-events-none aria-disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </a>          <div className="flex items-center gap-1">
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
                  <span key={`e-${idx}`} className="flex h-8 w-8 items-center justify-center text-sm text-muted-foreground" aria-hidden="true">
                    ...
                  </span>
                ) : (
                  <a
                    key={p}
                    href={pageHref(p)}
                    onClick={(e) => { e.preventDefault(); setPageAndScroll(p) }}
                    aria-label={`Page ${p}`}
                    aria-current={p === page ? 'page' : undefined}
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors',
                      p === page
                        ? 'bg-brand-orange text-white'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {p}
                  </a>
                )
              )
            })()}
          </div>
          <a
            href={pageHref(Math.min(totalPages, page + 1))}
            onClick={(e) => { e.preventDefault(); setPageAndScroll((p) => Math.min(totalPages, p + 1)) }}
            aria-disabled={page === totalPages}
            aria-label="Next page"
            className="btn-ghost flex items-center gap-1 px-3 py-2 text-sm aria-disabled:pointer-events-none aria-disabled:opacity-30"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </a>
        </nav>
      )}
    </div>
  )
}

/**
 * Suspense boundary lives here (not in each page) because the inner component
 * calls useSearchParams, required for static prerendering in Next 14.
 */
export function ListingView<T extends { id: string }>(props: ListingViewProps<T>) {
  return (
    <Suspense fallback={<div className="min-h-[60vh] animate-pulse rounded-xl border border-border bg-card p-6" role="status" aria-label="Loading results">Loading results…</div>}>
      <ListingViewInner {...props} />
    </Suspense>
  )
}
