'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ExternalLink,
  ChevronLeft,
  Share2,
  MessageSquare,
  Sparkles,
} from 'lucide-react'
import { useApp } from '@/lib/store'
import { Logo } from '@/components/ui/Logo'
import { Avatar } from '@/components/ui/Avatar'
import { CategoryBadge, PricingBadge, Tag } from '@/components/ui/Badges'
import { Markdown } from '@/components/ui/Markdown'
import { UpvoteButton } from '@/components/interactive/UpvoteButton'
import { BookmarkButton } from '@/components/interactive/BookmarkButton'
import { CommentThread } from '@/components/detail/CommentThread'
import { SectionHeading } from '@/components/ui/SectionHeading'

import { RepoCard } from '@/components/cards/RepoCard'
import { relativeTime, formatDate, formatNumber } from '@/lib/utils'
import { use, useState, useEffect } from 'react'

export function ToolDetail({
  slug,
}: {
  slug: string
}) {
  const { tools, repos, getItemBySlug, getUser } = useApp()
  const [notFoundFlag, setNotFoundFlag] = useState(false)
  const [tool, setTool] = useState(
    tools.find((t) => t.slug === slug)
  )

  useEffect(() => {
    const found = tools.find((t) => t.slug === slug)
    if (!found) setNotFoundFlag(true)
    setTool(found)
  }, [slug, tools])

  if (notFoundFlag && !tool) {
    notFound()
  }
  if (!tool) return null

  const submitter = getUser(tool.submittedBy)
  const relatedRepos = (tool.relatedRepos ?? [])
    .map((id) => repos.find((r) => r.id === id))
    .filter(Boolean)

  const share = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    try {
      await navigator.share?.({ title: tool.name, url })
    } catch {
      navigator.clipboard?.writeText(url)
    }
  }

  return (
    <div className="container-page py-8">
      <Link
        href="/tools"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-muted-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        All tools
      </Link>

      {/* Hero */}
      <div className="rounded-xl border border-border bg-muted p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <Logo src={tool.logoUrl} name={tool.name} size={80} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-3xl font-bold tracking-tight">
                {tool.name}
              </h1>
              {tool.featured && (
                <span className="badge border-accent/30 bg-accent/10 text-accent">
                  <Sparkles className="h-3 w-3" />
                  Featured
                </span>
              )}
            </div>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">
              {tool.tagline}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <CategoryBadge kind="tool" category={tool.category} />
              <PricingBadge pricing={tool.pricing} />
              {tool.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            {submitter && (
              <Link
                href={`/profile/${submitter.username}`}
                className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-muted-foreground"
              >
                <Avatar
                  name={submitter.displayName}
                  src={submitter.avatarUrl}
                  size={24}
                />
                Submitted by @{submitter.username} · {relativeTime(tool.createdAt)}
              </Link>
            )}
          </div>

          {/* Actions */}
          <div className="flex shrink-0 gap-2">
            <UpvoteButton
              itemType="tool"
              itemId={tool.id}
              count={tool.upvotes}
              variant="detail"
            />
            <BookmarkButton
              itemType="tool"
              itemId={tool.id}
              variant="detail"
            />
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <ExternalLink className="h-4 w-4" />
              Visit
            </a>
            <button onClick={share} className="btn-secondary" aria-label="Share">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-3 font-heading text-lg font-semibold">Overview</h2>
          <Markdown>{tool.description}</Markdown>

          {/* Meta sidebar on mobile */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:hidden">
            <MetaStat label="Upvotes" value={formatNumber(tool.upvotes)} />
            <MetaStat label="Bookmarks" value={formatNumber(tool.bookmarks)} />
            <MetaStat label="Added" value={formatDate(tool.createdAt)} />
            <MetaStat label="Updated" value={relativeTime(tool.updatedAt)} />
          </div>

          {/* Discussion */}
          <div className="mt-10">
            <CommentThread itemId={tool.id} />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="rounded-lg border border-border bg-muted p-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Stats
            </h3>
            <div className="space-y-3">
              <SidebarStat label="Upvotes" value={formatNumber(tool.upvotes)} />
              <SidebarStat label="Bookmarks" value={formatNumber(tool.bookmarks)} />
              <SidebarStat label="Added" value={formatDate(tool.createdAt)} />
              <SidebarStat label="Updated" value={relativeTime(tool.updatedAt)} />
            </div>
          </div>

          {relatedRepos.length > 0 && (
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Related repos
              </h3>
              <div className="space-y-3">
                {relatedRepos.map((r) => r && <RepoCard key={r.id} repo={r} />)}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

function MetaStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-muted p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 font-heading text-sm font-semibold text-foreground">
        {value}
      </div>
    </div>
  )
}

function SidebarStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  )
}
