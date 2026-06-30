'use client'

import { useCallback, useMemo, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, SearchX, X } from 'lucide-react'
import { useApp } from '@/lib/store'
import { Logo } from '@/components/ui/Logo'
import { ToolCard } from '@/components/cards/ToolCard'
import { DevToolCard } from '@/components/cards/DevToolCard'
import { RepoCard } from '@/components/cards/RepoCard'
import { cn, formatNumber } from '@/lib/utils'
import type { Tool, DevTool, Prompt, Repo } from '@/types'

export function SearchView() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { tools, devTools, prompts, repos } = useApp()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [tab, setTab] = useState<'all' | 'tool' | 'devtool' | 'repo'>('all')

  const q = query.trim().toLowerCase()
  const matches = useCallback(
    (s: string) => s.toLowerCase().includes(q),
    [q]
  )

  const toolResults = useMemo(
    () =>
      tools.filter(
        (t) =>
          matches(t.name) || matches(t.tagline) || matches(t.description) || t.tags.some(matches)
      ),
    [tools, matches]
  )
  const devToolResults = useMemo(
    () =>
      devTools.filter(
        (d) =>
          matches(d.name) ||
          matches(d.tagline) ||
          matches(d.description) ||
          d.tags.some(matches)
      ),
    [devTools, matches]
  )
  const repoResults = useMemo(
    () =>
      repos.filter(
        (r) =>
          matches(r.name) ||
          matches(r.description) ||
          r.tags.some(matches)
      ),
    [repos, matches]
  )

  const total = toolResults.length + devToolResults.length + repoResults.length
  const showing =
    tab === 'tool'
      ? toolResults.length
      : tab === 'devtool'
        ? devToolResults.length
        : tab === 'repo'
          ? repoResults.length
          : total

  return (
    <div className="container-page py-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">Search</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Find AI tools, dev tools, and repos across the platform.
        </p>
      </div>

      {/* Search bar */}
      <div className="mx-auto mt-8 max-w-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anything…"
            className="input pl-12 py-3 text-base"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                router.push(`/search?q=${encodeURIComponent(query.trim())}`)
              }
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-auto mt-4 flex max-w-xl items-center justify-center gap-1 rounded-md border border-border bg-card p-0.5">
        {(
          [
            { value: 'all', label: 'All' },
            { value: 'tool', label: 'Tools' },
            { value: 'devtool', label: 'Dev Tools' },
            { value: 'repo', label: 'Repos' },
          ] as const
        ).map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setTab(value)}
            className={cn(
              'rounded-sm px-3 py-1.5 text-sm font-medium transition-colors',
              tab === value
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:text-muted-foreground'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mx-auto mt-8 max-w-4xl">
        {!q && (
          <div className="py-16 text-center text-sm text-muted-foreground">
            Type something to search.
          </div>
        )}

        {q && total === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <SearchX className="mb-3 h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No results for “{query}”.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try a different query or browse the categories.
            </p>
          </div>
        )}

        {q && total > 0 && (
          <>
            <p className="mb-6 text-sm text-muted-foreground">
              {showing} result{showing !== 1 ? 's' : ''} for “{query}”
            </p>

            {tab === 'all' || tab === 'tool' ? (
              toolResults.length > 0 && (
                <section className="mb-10">
                  <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Tools ({toolResults.length})
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {toolResults.map((t) => (
                      <ToolCard key={t.id} tool={t} />
                    ))}
                  </div>
                </section>
              )
            ) : null}

            {tab === 'all' || tab === 'devtool' ? (
              devToolResults.length > 0 && (
                <section className="mb-10">
                  <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Dev Tools ({devToolResults.length})
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {devToolResults.map((d) => (
                      <DevToolCard key={d.id} devtool={d} />
                    ))}
                  </div>
                </section>
              )
            ) : null}

            {tab === 'all' || tab === 'repo' ? (
              repoResults.length > 0 && (
                <section className="mb-10">
                  <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Repos ({repoResults.length})
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {repoResults.map((r) => (
                      <RepoCard key={r.id} repo={r} />
                    ))}
                  </div>
                </section>
              )
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
