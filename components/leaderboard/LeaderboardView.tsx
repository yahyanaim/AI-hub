'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Trophy, Crown, Medal, Flame, Star, GitBranch } from 'lucide-react'
import { useApp } from '@/lib/store'
import { Logo } from '@/components/ui/Logo'
import { cn, formatNumber, relativeTime } from '@/lib/utils'
import type { ItemType } from '@/types'

type Period = 'weekly' | 'monthly' | 'alltime'
type BoardType = 'tool' | 'devtool' | 'course' | 'repo'

const PERIODS: { value: Period; label: string }[] = [
  { value: 'weekly', label: 'This week' },
  { value: 'monthly', label: 'This month' },
  { value: 'alltime', label: 'All time' },
]

const BOARD_TYPES: { value: BoardType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: 'tool', label: 'Tools', icon: Trophy },
  { value: 'devtool', label: 'Dev Tools', icon: Star },
  { value: 'course', label: 'Courses', icon: Medal },
  { value: 'repo', label: 'Edit Tools', icon: GitBranch },
]

export function LeaderboardView() {
  const { tools, devTools, courses, repos } = useApp()
  const [period, setPeriod] = useState<Period>('weekly')
  const [type, setType] = useState<BoardType>('tool')

  const now = Date.now()
  const periodMs =
    period === 'weekly' ? 7 * 86400000 : period === 'monthly' ? 30 * 86400000 : Infinity

  type Row = {
    id: string
    title: string
    subtitle: string
    href: string
    score: number
    secondary: string
    logoUrl?: string
    badge?: string
    createdAt: string
  }

  const rows: Row[] = (() => {
    const inPeriod = (iso: string) => now - new Date(iso).getTime() < periodMs
    if (type === 'tool') {
      return tools
        .filter((t) => period === 'alltime' || inPeriod(t.createdAt))
        .map((t) => ({
          id: t.id,
          title: t.name,
          subtitle: t.tagline,
          href: `/tools/${t.slug}`,
          score: t.upvotes,
          secondary: `${formatNumber(t.bookmarks)} bookmarks`,
          logoUrl: t.logoUrl,
          badge: t.featured ? '🔥 Trending' : undefined,
          createdAt: t.createdAt,
        }))
    }
    if (type === 'devtool') {
      return devTools
        .filter((d) => period === 'alltime' || inPeriod(d.createdAt))
        .map((d) => ({
          id: d.id,
          title: d.name,
          subtitle: d.tagline,
          href: `/devtool/${d.slug}`,
          score: d.upvotes,
          secondary: `${formatNumber(d.bookmarks)} bookmarks`,
          logoUrl: d.logoUrl,
          badge: d.featured ? '🔥 Trending' : undefined,
          createdAt: d.createdAt,
        }))
    }
    if (type === 'course') {
      return courses
        .filter((c) => period === 'alltime' || inPeriod(c.createdAt))
        .map((c) => ({
          id: c.id,
          title: c.name,
          subtitle: c.tagline,
          href: `/courses/${c.slug}`,
          score: c.upvotes,
          secondary: `${formatNumber(c.bookmarks)} bookmarks`,
          logoUrl: c.logoUrl,
          badge: c.featured ? '🔥 Trending' : undefined,
          createdAt: c.createdAt,
        }))
    }
    return repos
      .filter((r) => period === 'alltime' || inPeriod(r.createdAt))
      .map((r) => ({
        id: r.id,
        title: r.name,
        subtitle: r.tagline ?? r.description,
        href: `/edittools/${r.slug}`,
        score: r.upvotes,
        secondary: `${formatNumber(r.upvotes)} upvotes`,
        badge: r.featured ? '🔥 Trending' : undefined,
        createdAt: r.createdAt,
      }))
  })()
    .sort((a, b) => b.score - a.score)
    .slice(0, 15)

  return (
    <div className="container-page py-8">
      <div className="mb-8 text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs text-amber-500">
          <Trophy className="h-3.5 w-3.5" />
          Leaderboard
        </div>
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">
          Top of the charts
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The highest-voted {type === 'tool' ? 'tools' : type === 'devtool' ? 'dev tools' : type === 'course' ? 'courses' : 'edit tools'} across each period.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-col items-center justify-between gap-4 border-b border-border pb-4 sm:flex-row">
        <div className="flex items-center gap-1 rounded-md border border-border bg-card p-0.5">
          {BOARD_TYPES.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setType(value)}
              className={cn(
                'flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-sm font-medium transition-colors',
                type === value
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-muted-foreground'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 rounded-md border border-border bg-card p-0.5">
          {PERIODS.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={cn(
                'rounded-sm px-3 py-1.5 text-sm font-medium transition-colors',
                period === p.value
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-muted-foreground'
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Podium — top 3 */}
      {rows.length >= 3 && (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 0, 2].map((podiumIdx) => {
            const r = rows[podiumIdx]
            if (!r) return null
            const rank = podiumIdx + 1
            const isFirst = rank === 1
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: podiumIdx * 0.08 }}
                className={cn(
                  'relative overflow-hidden rounded-lg border bg-muted p-5 text-center',
                  isFirst
                    ? 'border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.15)]'
                    : 'border-border'
                )}
              >
                {isFirst && (
                  <div className="absolute -top-8 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full bg-amber-500/20 blur-2xl" />
                )}
                <div className="relative">
                  <div
                    className={cn(
                      'mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 font-heading font-bold',
                      rank === 1 && 'border-amber-500 text-amber-500',
                      rank === 2 && 'border-muted-foreground text-muted-foreground',
                      rank === 3 && 'border-amber-500/60 text-amber-500/80'
                    )}
                  >
                    {rank === 1 ? (
                      <Crown className="h-6 w-6" />
                    ) : (
                      `#${rank}`
                    )}
                  </div>
                  <Link href={r.href} className="block">
                    <h3 className="truncate font-heading text-base font-semibold hover:text-accent">
                      {r.title}
                    </h3>
                  </Link>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {r.subtitle}
                  </p>
                  <div className="mt-3 font-heading text-2xl font-bold text-brand-orange">
                    {formatNumber(r.score)}
                  </div>
                  <div className="text-xs text-muted-foreground">upvotes</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Ranked list */}
      <div className="overflow-hidden rounded-lg border border-border">
        {rows.map((r, i) => (
          <Link
            key={r.id}
            href={r.href}
            className={cn(
              'flex items-center gap-4 border-b border-border bg-muted px-4 py-3 transition-colors last:border-b-0 hover:bg-card',
              i < 3 && 'bg-card/40'
            )}
          >
            <span
              className={cn(
                'w-8 shrink-0 text-center font-heading text-sm font-bold',
                i === 0 && 'text-amber-500',
                i === 1 && 'text-muted-foreground',
                i === 2 && 'text-amber-500/70',
                i > 2 && 'text-muted-foreground'
              )}
            >
              {i + 1}
            </span>
            <div className="h-9 w-9 shrink-0">
              {r.logoUrl ? (
                <Logo src={r.logoUrl} name={r.title} size={36} />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-xs font-bold text-accent">
                  {r.title[0]?.toUpperCase()}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-medium text-foreground">
                  {r.title}
                </span>
                {r.badge && (
                  <span className="shrink-0 text-xs text-amber-500">{r.badge}</span>
                )}
              </div>
              <p className="truncate text-xs text-muted-foreground">{r.subtitle}</p>
            </div>
            <div className="hidden text-right sm:block">
              <div className="text-xs text-muted-foreground">{r.secondary}</div>
              <div className="text-xs text-muted-foreground">{relativeTime(r.createdAt)}</div>
            </div>
            <div className="flex shrink-0 items-center gap-1 text-brand-orange">
              <Flame className="h-4 w-4" />
              <span className="font-heading text-sm font-bold">
                {formatNumber(r.score)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
