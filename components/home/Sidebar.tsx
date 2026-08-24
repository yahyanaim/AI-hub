'use client'

import Link from 'next/link'
import { useApp } from '@/lib/store'
import { TOOL_CATEGORY_LABELS, REPO_CATEGORY_LABELS, type Tool } from '@/types'
import { Badge } from '@/components/ui/badge'
import {
  Wrench,
  Sparkles,
  Github,
  TrendingUp,
  Flame,
  Star,
  ArrowUpRight,
} from 'lucide-react'

export function Sidebar() {
  const { tools, repos } = useApp()

  const allCategories = Object.entries(TOOL_CATEGORY_LABELS).map(([key, label]) => ({
    key,
    label,
    type: 'tools' as const,
    count: tools.filter((t) => t.category === key).length,
  }))

  const topTools = [...tools].sort((a, b) => b.upvotes - a.upvotes).slice(0, 5)

  return (
    <aside className="space-y-8">
      {/* Categories */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 font-heading text-sm font-bold text-foreground">
          <Wrench className="h-4 w-4 text-brand-orange" />
          Categories
        </h3>
        <div className="space-y-1">
          {allCategories.map((cat) => (
            <Link
              key={cat.key}
              href={`/tools?category=${cat.key}`}
              className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <span>{cat.label}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground/60">{cat.count}</span>
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 font-heading text-sm font-bold text-foreground">
          <TrendingUp className="h-4 w-4 text-brand-orange" />
          Trending Tools
        </h3>
        <div className="space-y-3">
          {topTools.map((tool, i) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.category}/${tool.slug}`}
              className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-bold text-muted-foreground">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{tool.name}</p>
                <p className="truncate text-xs text-muted-foreground">{tool.tagline}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                <Flame className="h-3 w-3 text-brand-orange" />
                {tool.upvotes}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 font-heading text-sm font-bold text-foreground">
          <Sparkles className="h-4 w-4 text-brand-orange" />
          Quick Links
        </h3>
        <div className="space-y-2">
          <Link
            href="/submit"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Star className="h-4 w-4 text-brand-orange" />
            Submit a Tool
          </Link>
          <Link
            href="/search"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Github className="h-4 w-4 text-brand-orange" />
            Browse Repos
          </Link>
        </div>
      </div>
    </aside>
  )
}

