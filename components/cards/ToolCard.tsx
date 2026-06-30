'use client'

import Link from 'next/link'
import { ExternalLink, Flame, Heart, TrendingUp, Trash2 } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Avatar } from '@/components/ui/Avatar'
import { CategoryBadge, PricingBadge } from '@/components/ui/Badges'
import { StarRating } from '@/components/ui/StarRating'
import { BookmarkButton } from '@/components/interactive/BookmarkButton'
import { useApp } from '@/lib/store'
import { cn, formatNumber, ratingFor } from '@/lib/utils'
import type { Tool } from '@/types'

export function ToolCard({
  tool,
  className,
  rank,
}: {
  tool: Tool
  className?: string
  rank?: number
}) {
  const { getUser, currentUser, deleteTool, openDetailModal } = useApp()
  const submitter = getUser(tool.submittedBy)
  const rating = ratingFor(tool.upvotes, tool.bookmarks)

  return (
    <article
      onClick={() => openDetailModal(tool.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          openDetailModal(tool.id)
        }
      }}
      className={cn(
        'group relative flex cursor-pointer flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-orange/30 hover:shadow-xl hover:shadow-brand-orange/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40',
        className
      )}
      aria-label={`${tool.name} — open details`}
    >
      {/* ===== Header: icon with optional rank badge ===== */}
      <div className="relative mb-3 flex items-start gap-3.5">
        <div className="relative">
          <Logo src={tool.logoUrl} name={tool.name} size={56} />
          {rank && (
            <span className="absolute -left-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-brand-orange to-orange-400 text-[11px] font-bold text-white shadow-md ring-2 ring-background">
              {rank}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-heading text-base font-bold text-foreground transition-colors group-hover:text-brand-orange">
              {tool.name}
            </h3>
            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          {/* Star rating row */}
          <div className="mt-1 flex items-center gap-1.5">
            <StarRating value={rating} size={13} />
            <span className="text-xs font-medium text-muted-foreground">{rating.toFixed(1)}</span>
          </div>
        </div>
        {/* Actions, top-right */}
        <div className="relative z-20 -mr-1 -mt-1 flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
          {currentUser?.id === tool.submittedBy && (
            <button
              onClick={() => {
                if (window.confirm(`Delete "${tool.name}"?`)) deleteTool(tool.id)
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground opacity-0 transition-all hover:bg-red-500/10 hover:text-red-500 group-hover:opacity-100"
              aria-label="Delete tool"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
          <BookmarkButton itemType="tool" itemId={tool.id} />
        </div>
      </div>

      {/* ===== Description ===== */}
      <p className="mb-3 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-muted-foreground">
        {tool.tagline}
      </p>

      {/* ===== Badges ===== */}
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <CategoryBadge kind="tool" category={tool.category} />
        <PricingBadge pricing={tool.pricing} />
      </div>

      {/* ===== Footer: submitter + likes ===== */}
      <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-3">
        <div className="flex items-center gap-2">
          {submitter ? (
            <>
              <Avatar name={submitter.displayName} src={submitter.avatarUrl} size={22} />
              <span
                onClick={(e) => e.stopPropagation()}
                role="button"
              >
                <Link
                  href={`/profile/${submitter.username}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  @{submitter.username}
                </Link>
              </span>
            </>
          ) : (
            <span className="text-xs text-muted-foreground">Community</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-brand-orange/8 px-2.5 py-1">
          <Heart className="h-3.5 w-3.5 fill-brand-orange text-brand-orange" />
          <span className="text-xs font-semibold text-brand-orange">
            {formatNumber(tool.upvotes)}
          </span>
        </div>
      </div>
    </article>
  )
}
