'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  ExternalLink,
  ChevronLeft,
  Share2,
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
import { relativeTime, formatDate, formatNumber } from '@/lib/utils'
import type { DevTool } from '@/types'

export function DevToolDetail({ slug }: { slug: string }) {
  const { devTools, getUser } = useApp()
  const [notFoundFlag, setNotFoundFlag] = useState(false)
  const [devtool, setDevTool] = useState<DevTool | undefined>(
    devTools.find((d) => d.slug === slug)
  )

  useEffect(() => {
    const found = devTools.find((d) => d.slug === slug)
    if (!found) setNotFoundFlag(true)
    setDevTool(found)
  }, [slug, devTools])

  if (notFoundFlag && !devtool) {
    notFound()
  }
  if (!devtool) return null

  const submitter = getUser(devtool.submittedBy)

  const share = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    try {
      await navigator.share?.({ title: devtool.name, url })
    } catch {
      navigator.clipboard?.writeText(url)
    }
  }

  return (
    <div className="container-page py-8">
      <Link
        href="/devtool"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-muted-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        All dev tools
      </Link>

      {/* Hero */}
      <div className="rounded-xl border border-border bg-muted p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <Logo src={devtool.logoUrl} name={devtool.name} size={80} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-3xl font-bold tracking-tight">
                {devtool.name}
              </h1>
              {devtool.featured && (
                <span className="badge border-accent/30 bg-accent/10 text-accent">
                  <Sparkles className="h-3 w-3" />
                  Featured
                </span>
              )}
            </div>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">
              {devtool.tagline}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <CategoryBadge kind="tool" category={devtool.category} />
              <PricingBadge pricing={devtool.pricing} />
              {devtool.tags.map((t) => (
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
                Submitted by @{submitter.username} &middot; {relativeTime(devtool.createdAt)}
              </Link>
            )}
          </div>

          {/* Actions */}
          <div className="flex shrink-0 gap-2">
            <UpvoteButton
              itemType="devtool"
              itemId={devtool.id}
              count={devtool.upvotes}
              variant="detail"
            />
            <BookmarkButton
              itemType="devtool"
              itemId={devtool.id}
              variant="detail"
            />
            <a
              href={devtool.url}
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
          <Markdown>{devtool.description}</Markdown>

          {/* Meta stats in mobile-friendly layout */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:hidden">
            <MetaStat label="Upvotes" value={formatNumber(devtool.upvotes)} />
            <MetaStat label="Bookmarks" value={formatNumber(devtool.bookmarks)} />
            <MetaStat label="Added" value={formatDate(devtool.createdAt)} />
            <MetaStat label="Updated" value={relativeTime(devtool.updatedAt)} />
          </div>

          {/* Discussion */}
          <div className="mt-10">
            <CommentThread itemId={devtool.id} />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="rounded-lg border border-border bg-muted p-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Stats
            </h3>
            <div className="space-y-3">
              <SidebarStat label="Upvotes" value={formatNumber(devtool.upvotes)} />
              <SidebarStat label="Bookmarks" value={formatNumber(devtool.bookmarks)} />
              <SidebarStat label="Added" value={formatDate(devtool.createdAt)} />
              <SidebarStat label="Updated" value={relativeTime(devtool.updatedAt)} />
            </div>
          </div>
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
