'use client'

import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  Wrench,
  Github,
  Star,
  Bookmark,
  ExternalLink,
  Sparkles,
  Flame,
  BadgeCheck,
} from 'lucide-react'
import { useApp } from '@/lib/store'
import { Avatar } from '@/components/ui/Avatar'
import { AdminBadge } from '@/components/profile/AdminBadge'
import { ToolCard } from '@/components/cards/ToolCard'
import { DevToolCard } from '@/components/cards/DevToolCard'
import { RepoCard } from '@/components/cards/RepoCard'
import { OfferCard } from '@/components/cards/OfferCard'
import { CourseCard } from '@/components/cards/CourseCard'
import { cn, formatNumber, formatDate } from '@/lib/utils'

type Tab = 'submitted' | 'upvoted' | 'bookmarked'

function hashStr(s: string): number {
  let hash = 0
  for (let i = 0; i < s.length; i++) {
    hash = s.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash)
}

const HEAT_LEVELS = [
  'rgba(0,0,0,0.07)',
  'rgba(255,107,0,0.25)',
  'rgba(255,107,0,0.45)',
  'rgba(255,107,0,0.7)',
  '#FF6B00',
]

/** GitHub-style contribution heatmap rendered as the profile banner.
 *  The dot grid always spans the full banner width, newest week on the right. */
function ContributionBanner({
  username,
  contributions,
}: {
  username: string
  contributions: number
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [bannerW, setBannerW] = useState(1200)
  const [bannerH, setBannerH] = useState(160)
  const cell = 11
  const gap = 3
  const step = cell + gap

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const update = () => {
      setBannerW(el.offsetWidth)
      setBannerH(el.offsetHeight)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const weeks = Math.max(8, Math.floor(bannerW / step))
  // Full-depth grid from the top, with a small breathing gap above so the
  // squares don't butt against the banner's edge.
  const rows = Math.max(4, Math.floor((bannerH - 12) / step))
  const width = weeks * step
  const height = rows * step
  const density = contributions === 0 ? 0 : Math.min(56, 10 + contributions * 3)

  const cells: Array<{ x: number; y: number; level: number }> = []
  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < rows; d++) {
      // Unsigned conversion: the raw hash can exceed int32 and bitwise ops
      // would flip it negative, producing negative array indices.
      const h = hashStr(`${username}:${w}:${d}`) >>> 0
      const level = h % 100 < density ? 1 + ((h >>> 3) % 4) : 0
      cells.push({ x: w * step, y: d * step, level })
    }
  }

  return (
    <div
      ref={rowRef}
      className="relative h-36 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-zinc-50 md:h-44"
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="absolute right-0 top-1.5"
        aria-hidden
      >
        {cells.map((c, i) => (
          <rect
            key={i}
            x={c.x}
            y={c.y}
            width={cell}
            height={cell}
            rx={2.5}
            fill={HEAT_LEVELS[c.level]}
          />
        ))}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent" />
      <div className="absolute left-5 top-4 flex items-center gap-1.5 rounded-full border border-zinc-300/80 bg-zinc-200/90 px-3 py-1 text-xs font-medium text-zinc-800 shadow-sm">
        <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
        {formatNumber(contributions)} contributions
      </div>
      <div className="absolute bottom-3 right-5 flex items-center gap-2 rounded-full bg-zinc-200/90 px-2.5 py-1 text-[10px] font-medium text-zinc-800 shadow-sm">
        Less
        {HEAT_LEVELS.map((c, i) => (
          <span key={i} className="inline-block size-2.5 rounded-[3px]" style={{ background: c }} />
        ))}
        More
      </div>
    </div>
  )
}

export function ProfileView({ username }: { username: string }) {
  const {
    getUserByUsername,
    tools,
    devTools,
    repos,
    courses,
    offers,
    currentUser,
  } = useApp()

  const [tab, setTab] = useState<Tab>('submitted')

  const user = getUserByUsername(username)

  if (!user) {
    return (
      <div className="container-page flex flex-col items-center justify-center py-20 text-center">
        <h2 className="font-heading text-2xl font-bold">User not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          @{username} doesn&apos;t exist yet.
        </p>
        <Link href="/" className="btn-primary mt-6">
          Back home
        </Link>
      </div>
    )
  }

  const submittedTools = tools.filter((t) => t.submittedBy === user.id)
  const submittedDevTools = devTools.filter((d) => d.submittedBy === user.id)
  const submittedRepos = repos.filter((r) => r.submittedBy === user.id)

  const upvotedTools = tools.filter((t) => user.upvotedItems.includes(t.id))
  const upvotedDevTools = devTools.filter((d) => user.upvotedItems.includes(d.id))
  const upvotedRepos = repos.filter((r) => user.upvotedItems.includes(r.id))

  const bookmarkedTools = tools.filter((t) => user.bookmarkedItems.includes(t.id))
  const bookmarkedDevTools = devTools.filter((d) => user.bookmarkedItems.includes(d.id))
  const bookmarkedRepos = repos.filter((r) => user.bookmarkedItems.includes(r.id))
  const bookmarkedCourses = courses.filter((c) => user.bookmarkedItems.includes(c.id))
  const bookmarkedOffers = offers.filter((o) => user.bookmarkedItems.includes(o.id))

  const totalSubmitted =
    user.submittedTools.length +
    user.submittedDevTools.length +
    user.submittedRepos.length
  const totalContributions = totalSubmitted + user.upvotedItems.length + user.bookmarkedItems.length

  const isOwn = currentUser?.id === user.id

  const tabs = [
    { value: 'submitted' as Tab, label: 'Submitted', count: totalSubmitted },
    { value: 'upvoted' as Tab, label: 'Upvoted', count: user.upvotedItems.length },
    ...(isOwn
      ? [{ value: 'bookmarked' as Tab, label: 'Bookmarked', count: user.bookmarkedItems.length }]
      : []),
  ]

  return (
    <div className="container-page py-8">
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        {/* Banner: GitHub-style contribution heatmap */}
        <ContributionBanner username={user.username} contributions={totalContributions} />

        {/* Twitter-style header: overlapping avatar + identity */}
        <div className="px-5 pb-4 md:px-7">
          <div className="relative -mt-10 mb-3 flex items-end sm:-mt-12">
            <Avatar
              name={user.displayName}
              src={user.avatarUrl}
              size={88}
              className="rounded-full ring-4 ring-background"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <h1 className="font-heading text-2xl font-bold leading-tight">{user.displayName}</h1>
            {/* Legacy members signed up before the counter existed have no
                signupNumber — they are early members by definition. */}
            {(user.signupNumber == null || user.signupNumber <= 1000) && (
              <span
                title={user.signupNumber ? `Verified — member #${user.signupNumber}` : 'Verified — early member'}
                className="inline-flex"
              >
                <BadgeCheck className="h-5 w-5 fill-brand-orange stroke-white" />
              </span>
            )}
            {isOwn && (
              <AdminBadge
                username={user.username}
                canSee={currentUser?.username.toLowerCase() === 'yahianaim'}
              />
            )}
          </div>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
            @{user.username}
            {user.signupNumber != null && (
              <span
                title={`Member number ${user.signupNumber}`}
                aria-label={`Member number ${user.signupNumber}`}
                className="font-heading text-xs font-bold text-brand-orange"
              >
                #{user.signupNumber}
              </span>
            )}
          </p>

          {user.bio && (
            <p className="mt-2 max-w-lg text-sm text-foreground">{user.bio}</p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span>Joined {formatDate(user.createdAt)}</span>
            {user.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-accent hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                Website
              </a>
            )}
            {user.githubHandle && (
              <a
                href={`https://github.com/${user.githubHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-foreground"
              >
                <Github className="h-3 w-3" />
                {user.githubHandle}
              </a>
            )}
          </div>

          {/* Twitter-style inline stats */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="flex items-center gap-1.5">
              <Wrench className="h-3.5 w-3.5 text-brand-orange" />
              <b>{formatNumber(totalSubmitted)}</b>
              <span className="text-muted-foreground">Submitted</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 text-brand-orange" />
              <b>{formatNumber(user.upvotedItems.length)}</b>
              <span className="text-muted-foreground">Upvoted</span>
            </span>
            {isOwn && (
              <span className="flex items-center gap-1.5">
                <Bookmark className="h-3.5 w-3.5 text-brand-orange" />
                <b>{formatNumber(user.bookmarkedItems.length)}</b>
                <span className="text-muted-foreground">Bookmarked</span>
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5 text-brand-orange" />
              <span className="text-muted-foreground">{formatNumber(user.karma)} karma</span>
            </span>
          </div>
        </div>

        {/* Twitter-style tab bar */}
        <div className="flex items-center border-b border-border">
          {tabs.map(({ value, label, count }) => (
            <button
              key={value}
              onClick={() => setTab(value)}
              className={cn(
                'relative flex-1 px-4 py-3.5 text-sm font-medium transition-colors hover:bg-secondary/60 sm:flex-none sm:px-6',
                tab === value ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {label}
              <span className="ml-1.5 text-xs text-muted-foreground">{count}</span>
              {tab === value && (
                <span className="absolute inset-x-4 bottom-0 h-1 rounded-full bg-brand-orange sm:inset-x-6" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-6">
        {tab === 'submitted' && (
          <div className="space-y-8">
            {submittedTools.length > 0 && (
              <Section items={submittedTools} label="Tools" type="tool" />
            )}
            {submittedDevTools.length > 0 && (
              <Section items={submittedDevTools} label="Dev Tools" type="devtool" />
            )}
            {submittedRepos.length > 0 && (
              <Section items={submittedRepos} label="Repos" type="repo" />
            )}
            {submittedTools.length === 0 &&
              submittedDevTools.length === 0 &&
              submittedRepos.length === 0 && (
                <EmptyState message="No submissions yet." />
              )}
          </div>
        )}

        {tab === 'upvoted' && (
          <div className="space-y-8">
            {upvotedTools.length > 0 && (
              <Section items={upvotedTools} label="Tools" type="tool" />
            )}
            {upvotedDevTools.length > 0 && (
              <Section items={upvotedDevTools} label="Dev Tools" type="devtool" />
            )}
            {upvotedRepos.length > 0 && (
              <Section items={upvotedRepos} label="Repos" type="repo" />
            )}
            {upvotedTools.length === 0 &&
              upvotedDevTools.length === 0 &&
              upvotedRepos.length === 0 && (
                <EmptyState message="No upvotes yet." />
              )}
          </div>
        )}

        {tab === 'bookmarked' && (
          <div className="space-y-8">
            {bookmarkedTools.length > 0 && (
              <Section items={bookmarkedTools} label="Tools" type="tool" />
            )}
            {bookmarkedDevTools.length > 0 && (
              <Section items={bookmarkedDevTools} label="Dev Tools" type="devtool" />
            )}
            {bookmarkedRepos.length > 0 && (
              <Section items={bookmarkedRepos} label="Repos" type="repo" />
            )}
            {bookmarkedCourses.length > 0 && (
              <Section items={bookmarkedCourses} label="Courses" type="course" />
            )}
            {bookmarkedOffers.length > 0 && (
              <Section items={bookmarkedOffers} label="Offers" type="offer" />
            )}
            {bookmarkedTools.length === 0 &&
              bookmarkedDevTools.length === 0 &&
              bookmarkedRepos.length === 0 &&
              bookmarkedCourses.length === 0 &&
              bookmarkedOffers.length === 0 && <EmptyState message="No bookmarks yet." />}
          </div>
        )}
      </div>
    </div>
  )
}

function Section({
  items,
  label,
  type,
}: {
  items: Array<{ id: string }>
  label: string
  type: 'tool' | 'devtool' | 'prompt' | 'repo' | 'course' | 'offer'
}) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label} ({items.length})
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          if (type === 'tool')
            return <ToolCard key={item.id} tool={item as import('@/types').Tool} />
          if (type === 'devtool')
            return (
              <DevToolCard
                key={item.id}
                devtool={item as import('@/types').DevTool}
              />
            )
          if (type === 'course')
            return (
              <CourseCard key={item.id} course={item as import('@/types').Course} />
            )
          if (type === 'offer')
            return (
              <OfferCard key={item.id} offer={item as import('@/types').Offer} />
            )
          return (
            <RepoCard key={item.id} repo={item as import('@/types').Repo} />
          )
        })}
      </div>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
      {message}
    </div>
  )
}
