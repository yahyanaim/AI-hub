'use client'

import { useEffect, useMemo, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, X, CornerDownLeft, ArrowRight, Clock } from 'lucide-react'
import { useApp } from '@/lib/store'
import { cn, formatNumber } from '@/lib/utils'
import { Logo } from '@/components/ui/Logo'
import type { Tool, DevTool, Prompt, Repo } from '@/types'

interface SearchResult {
  type: 'tool' | 'prompt' | 'devtool' | 'repo'
  id: string
  slug: string
  title: string
  subtitle: string
  meta?: string
  href: string
  item: Tool | DevTool | Prompt | Repo
}

export function CommandPalette() {
  const {
    paletteOpen,
    setPaletteOpen,
    tools,
    devTools,
    prompts,
    repos,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
  } = useApp()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(true)
      }
      if (e.key === 'Escape' && paletteOpen) {
        setPaletteOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setPaletteOpen, paletteOpen])

  // Focus + reset on open
  useEffect(() => {
    if (paletteOpen) {
      setQuery('')
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [paletteOpen])

  // Lock scroll
  useEffect(() => {
    if (paletteOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [paletteOpen])

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const matches = (s: string) => s.toLowerCase().includes(q)

    const toolResults: SearchResult[] = tools
      .filter(
        (t) =>
          matches(t.name) ||
          matches(t.tagline) ||
          matches(t.description) ||
          t.tags.some(matches)
      )
      .slice(0, 4)
      .map((t) => ({
        type: 'tool' as const,
        id: t.id,
        slug: t.slug,
        title: t.name,
        subtitle: t.tagline,
        meta: formatNumber(t.upvotes) + ' upvotes',
        href: `/tools/${t.slug}`,
        item: t,
      }))

    const devToolResults: SearchResult[] = devTools
      .filter(
        (p) =>
          matches(p.name) ||
          matches(p.tagline) ||
          matches(p.description) ||
          p.tags.some(matches)
      )
      .slice(0, 4)
      .map((p) => ({
        type: 'devtool' as const,
        id: p.id,
        slug: p.slug,
        title: p.name,
        subtitle: p.tagline,
        meta: formatNumber(p.upvotes) + ' upvotes',
        href: `/devtool/${p.slug}`,
        item: p,
      }))

    const repoResults: SearchResult[] = repos
      .filter(
        (r) =>
          matches(r.name) ||
          matches(r.description) ||
          r.tags.some(matches)
      )
      .slice(0, 4)
      .map((r) => ({
        type: 'repo' as const,
        id: r.id,
        slug: r.slug,
        title: r.name,
        subtitle: r.tagline ?? r.description,
        meta: formatNumber(r.upvotes) + ' upvotes',
        href: `/edittools/${r.slug}`,
        item: r,
      }))

    return [...toolResults, ...devToolResults, ...repoResults]
  }, [query, tools, devTools, prompts, repos])

  // Grouped view
  const grouped = useMemo(() => {
    const g: Record<string, SearchResult[]> = {}
    for (const r of results) {
      ;(g[r.type] ??= []).push(r)
    }
    return g
  }, [results])

  // Reset active when results change
  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  // Keyboard nav within list
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, Math.max(results.length - 1, 0)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const r = results[activeIndex]
      if (r) go(r)
    }
  }

  const go = (r: SearchResult) => {
    addRecentSearch(query.trim())
    setPaletteOpen(false)
    router.push(r.href)
  }

  if (!paletteOpen) return null

  const showRecents = !query.trim() && recentSearches.length > 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh] sm:pt-[15vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={() => setPaletteOpen(false)}
      />
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-lg border border-border bg-card shadow-2xl animate-slide-up"
        onKeyDown={onKeyDown}
      >
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search AI tools, dev tools, repos…"
            className="w-full bg-transparent py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            aria-label="Search query"
          />
          <button
            onClick={() => setPaletteOpen(false)}
            className="rounded-sm p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-2">
          {showRecents && (
            <div className="mb-2">
              <div className="flex items-center justify-between px-2 py-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Recent
                </span>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              </div>
              {recentSearches.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {s}
                </button>
              ))}
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <div className="px-4 py-12 text-center">
              <p className="text-sm text-muted-foreground">
                No results for “{query}”.
              </p>
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                onClick={() => {
                  addRecentSearch(query.trim())
                  setPaletteOpen(false)
                }}
                className="mt-3 inline-flex items-center gap-1 text-sm text-accent hover:underline"
              >
                Full search <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          )}

          {/* Grouped results */}
          {Object.entries(grouped).map(([group, items]) => {
            const label =
               group === 'tool'
                 ? 'Tools'
                 : group === 'devtool'
                   ? 'Dev Tools'
                 : group === 'prompt'
                   ? 'Prompts'
                   : 'Repos'
            return (
              <div key={group} className="mb-1">
                <div className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {label}
                </div>
                {items.map((r) => {
                  const flatIndex = results.indexOf(r)
                  const active = flatIndex === activeIndex
                  return (
                    <button
                      key={r.id}
                      onMouseEnter={() => setActiveIndex(flatIndex)}
                      onClick={() => go(r)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-md px-2 py-2.5 text-left transition-colors',
                        active
                          ? 'bg-muted'
                          : 'hover:bg-muted/60'
                      )}
                    >
                      {r.type === 'tool' ? (
                        <Logo
                          src={(r.item as Tool).logoUrl}
                          name={r.title}
                          size={32}
                        />
                      ) : r.type === 'devtool' ? (
                        <Logo
                          src={(r.item as DevTool).logoUrl}
                          name={r.title}
                          size={32}
                        />
                      ) : r.type === 'repo' ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-muted text-xs font-bold text-brand-blue">
                          {(r.item as Repo).name[0]?.toUpperCase()}
                        </div>
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-muted font-heading text-xs font-bold text-accent">
                          {'>'}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-foreground">
                          {r.title}
                        </div>
                        <div className="truncate text-xs text-muted-foreground">
                          {r.subtitle}
                        </div>
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {r.meta}
                      </span>
                      {active && (
                        <CornerDownLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
                      )}
                    </button>
                  )
                })}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded-sm border border-border bg-muted px-1 py-0.5 font-mono">
                ↑↓
              </kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded-sm border border-border bg-muted px-1 py-0.5 font-mono">
                ↵
              </kbd>
              open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded-sm border border-border bg-muted px-1 py-0.5 font-mono">
                esc
              </kbd>
              close
            </span>
          </div>
          <Link
            href={query.trim() ? `/search?q=${encodeURIComponent(query)}` : '/search'}
            onClick={() => {
              if (query.trim()) addRecentSearch(query.trim())
              setPaletteOpen(false)
            }}
            className="hover:text-foreground"
          >
            Advanced search →
          </Link>
        </div>
      </div>
    </div>
  )
}
