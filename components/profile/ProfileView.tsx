'use client'

import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Wrench,
  TerminalSquare,
  Github,
  Star,
  Bookmark,
  ExternalLink,
} from 'lucide-react'
import { useApp } from '@/lib/store'
import { Avatar } from '@/components/ui/Avatar'
import { ToolCard } from '@/components/cards/ToolCard'
import { DevToolCard } from '@/components/cards/DevToolCard'
import { RepoCard } from '@/components/cards/RepoCard'
import { cn, formatNumber, formatDate, relativeTime } from '@/lib/utils'

type Tab = 'submitted' | 'upvoted' | 'bookmarked'

export function ProfileView({ username }: { username: string }) {
  const {
    getUserByUsername,
    tools,
    devTools,
    prompts,
    repos,
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

  const isOwn = currentUser?.id === user.id

  return (
    <div className="container-page py-8">
      {/* Profile header */}
      <div className="relative overflow-hidden rounded-xl border border-border bg-muted p-6 md:p-8">
        <div className="absolute -top-16 right-0 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
          <Avatar
            name={user.displayName}
            src={user.avatarUrl}
            size={80}
            className="ring-2 ring-accent/30 ring-offset-2 ring-offset-background"
          />
          <div className="min-w-0 flex-1">
            <h1 className="font-heading text-2xl font-bold">{user.displayName}</h1>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
            {user.bio && (
              <p className="mt-2 max-w-lg text-sm text-muted-foreground">{user.bio}</p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 text-brand-orange" />
                {formatNumber(user.karma)} karma
              </span>
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
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                >
                  <Github className="h-3 w-3" />
                  {user.githubHandle}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 rounded-lg border border-border bg-card/40 p-4">
          <StatBox
            label="Submitted"
            value={
              user.submittedTools.length +
          user.submittedDevTools.length +
          user.submittedRepos.length
            }
            icon={Wrench}
          />
          <StatBox label="Upvoted" value={user.upvotedItems.length} icon={Star} />
          <StatBox
            label="Bookmarked"
            value={user.bookmarkedItems.length}
            icon={Bookmark}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex items-center gap-1 border-b border-border">
        {(
          [
            { value: 'submitted' as Tab, label: 'Submitted' },
            { value: 'upvoted' as Tab, label: 'Upvoted' },
            ...(isOwn ? [{ value: 'bookmarked' as Tab, label: 'Bookmarked' }] : []),
          ] as const
        ).map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setTab(value)}
            className={cn(
              'border-b-2 px-4 py-3 text-sm font-medium transition-colors',
              tab === value
                ? 'border-accent text-foreground'
                : 'border-transparent text-muted-foreground hover:text-muted-foreground'
            )}
          >
            {label}
          </button>
        ))}
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
            {bookmarkedTools.length === 0 && bookmarkedDevTools.length === 0 && bookmarkedRepos.length === 0 && (
              <EmptyState message="No bookmarks yet." />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function StatBox({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: number
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="text-center">
      <Icon className="mx-auto mb-1 h-4 w-4 text-accent" />
      <div className="font-heading text-xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
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
  type: 'tool' | 'devtool' | 'prompt' | 'repo'
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
