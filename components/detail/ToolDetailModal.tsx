'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useApp } from '@/lib/store'
import { Logo } from '@/components/ui/Logo'
import { Avatar } from '@/components/ui/Avatar'
import { CategoryBadge, PricingBadge, Tag } from '@/components/ui/Badges'
import { StarRating } from '@/components/ui/StarRating'
import { UpvoteButton } from '@/components/interactive/UpvoteButton'
import { BookmarkButton } from '@/components/interactive/BookmarkButton'
import { formatNumber, ratingFor } from '@/lib/utils'

export function ToolDetailModal() {
  const { detailModalToolId, closeDetailModal, tools, devTools, getUser } = useApp()
  const isDevTool = detailModalToolId ? devTools.some((d) => d.id === detailModalToolId) : false
  const tool = isDevTool
    ? devTools.find((d) => d.id === detailModalToolId) ?? null
    : tools.find((t) => t.id === detailModalToolId) ?? null

  useEffect(() => {
    if (!detailModalToolId) return
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDetailModal()
    }
    window.addEventListener('keydown', onEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onEsc)
      document.body.style.overflow = ''
    }
  }, [detailModalToolId, closeDetailModal])

  return (
    <AnimatePresence>
      {tool && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${tool.name} details`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeDetailModal}
          />

          <motion.div
            className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-card shadow-xl"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close */}
            <button
              onClick={closeDetailModal}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-4 px-6 pb-0 pt-6">
              <Logo src={tool.logoUrl} name={tool.name} size={52} />
              <div className="min-w-0 flex-1 pr-6">
                <h2 className="text-lg font-semibold text-foreground">
                  {tool.name}
                </h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {tool.tagline}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {/* Submitter */}
              {(() => {
                const submitter = getUser(tool.submittedBy)
                return submitter ? (
                  <div className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Avatar name={submitter.displayName} src={submitter.avatarUrl} size={18} />
                    <span>by</span>
                    <Link
                      href={`/profile/${submitter.username}`}
                      onClick={closeDetailModal}
                      className="font-medium text-foreground hover:text-brand-orange"
                    >
                      @{submitter.username}
                    </Link>
                  </div>
                ) : null
              })()}

              {/* Badges */}
              <div className="mb-4 flex flex-wrap items-center gap-1.5">
                <CategoryBadge kind={isDevTool ? 'devtool' : 'tool'} category={tool.category} />
                <PricingBadge pricing={tool.pricing} />
                {tool.tags.slice(0, 4).map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {stripMarkdown(tool.description)}
              </p>

              {/* Stats row */}
              <div className="mt-5 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" />
                  {ratingFor(tool.upvotes, tool.bookmarks).toFixed(1)}
                </span>
                <span>{formatNumber(tool.upvotes)} upvotes</span>
                <span>Since {new Date(tool.createdAt).getFullYear()}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <UpvoteButton itemType={isDevTool ? 'devtool' : 'tool'} itemId={tool.id} count={tool.upvotes} variant="detail" />
                <BookmarkButton itemType={isDevTool ? 'devtool' : 'tool'} itemId={tool.id} variant="detail" />
              </div>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              >
                Visit
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function stripMarkdown(md: string): string {
  return md
    .replace(/^[-*]\s+/gm, '• ')
    .replace(/[#*`_>]/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
