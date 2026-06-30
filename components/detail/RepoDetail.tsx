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
import type { Repo } from '@/types'

export function RepoDetailModal() {
  const { detailModalRepoId, closeDetailModalForRepo, repos, getUser } = useApp()
  const repo = repos.find((r) => r.id === detailModalRepoId) ?? null

  useEffect(() => {
    if (!detailModalRepoId) return
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDetailModalForRepo()
    }
    window.addEventListener('keydown', onEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onEsc)
      document.body.style.overflow = ''
    }
  }, [detailModalRepoId, closeDetailModalForRepo])

  return (
    <AnimatePresence>
      {repo && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${repo.name} details`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeDetailModalForRepo}
          />

          <motion.div
            className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-card shadow-xl"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={closeDetailModalForRepo}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-start gap-4 px-6 pb-0 pt-6">
              <Logo src={repo.logoUrl} name={repo.name} size={52} />
              <div className="min-w-0 flex-1 pr-6">
                <h2 className="text-lg font-semibold text-foreground">
                  {repo.name}
                </h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {repo.tagline}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {(() => {
                const submitter = getUser(repo.submittedBy)
                return submitter ? (
                  <div className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Avatar name={submitter.displayName} src={submitter.avatarUrl} size={18} />
                    <span>by</span>
                    <Link
                      href={`/profile/${submitter.username}`}
                      onClick={closeDetailModalForRepo}
                      className="font-medium text-foreground hover:text-brand-orange"
                    >
                      @{submitter.username}
                    </Link>
                  </div>
                ) : null
              })()}

              <div className="mb-4 flex flex-wrap items-center gap-1.5">
                <CategoryBadge kind="repo" category={repo.category} />
                <PricingBadge pricing={repo.pricing} />
                {repo.tags.slice(0, 4).map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {stripMarkdown(repo.description)}
              </p>

              <div className="mt-5 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" />
                  {ratingFor(repo.upvotes, repo.bookmarks).toFixed(1)}
                </span>
                <span>{formatNumber(repo.upvotes)} upvotes</span>
                <span>Since {new Date(repo.createdAt).getFullYear()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <UpvoteButton itemType="repo" itemId={repo.id} count={repo.upvotes} variant="detail" />
                <BookmarkButton itemType="repo" itemId={repo.id} variant="detail" />
              </div>
              <a
                href={repo.url}
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

export function RepoDetail({ slug }: { slug: string }) {
  const { repos, getUser } = useApp()
  const repo = repos.find((r) => r.slug === slug)

  if (!repo) return null

  const submitter = getUser(repo.submittedBy)

  return (
    <div className="container-page py-8">
      <div className="rounded-xl border border-border bg-muted p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <Logo src={repo.logoUrl} name={repo.name} size={80} />
          <div className="min-w-0 flex-1">
            <h1 className="font-heading text-3xl font-bold tracking-tight">
              {repo.name}
            </h1>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">
              {repo.tagline}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <CategoryBadge kind="repo" category={repo.category} />
              <PricingBadge pricing={repo.pricing} />
            </div>
            {submitter && (
              <Link
                href={`/profile/${submitter.username}`}
                className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-muted-foreground"
              >
                <Avatar name={submitter.displayName} src={submitter.avatarUrl} size={24} />
                Submitted by @{submitter.username}
              </Link>
            )}
          </div>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          {repo.description}
        </p>
        <div className="mt-6 flex items-center gap-4">
          <UpvoteButton itemType="repo" itemId={repo.id} count={repo.upvotes} variant="detail" />
          <BookmarkButton itemType="repo" itemId={repo.id} variant="detail" />
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Visit site
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
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
