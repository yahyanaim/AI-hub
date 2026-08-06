'use client'

import Link from 'next/link'
import { ArrowRight, Map, Sparkles } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Avatar } from '@/components/ui/Avatar'
import { CategoryBadge, PricingBadge } from '@/components/ui/Badges'
import { BookmarkButton } from '@/components/interactive/BookmarkButton'
import { useApp } from '@/lib/store'
import { cn } from '@/lib/utils'
import type { Offer } from '@/types'

const ACCENT_STYLES = [
  'from-brand-orange/20 to-brand-orange/5',
  'from-violet-500/20 to-violet-500/5',
  'from-sky-500/20 to-sky-500/5',
  'from-emerald-500/20 to-emerald-500/5',
  'from-pink-500/20 to-pink-500/5',
] as const

export function OfferCard({ offer, className }: { offer: Offer; className?: string }) {
  const { getUser } = useApp()
  const submitter = getUser(offer.submittedBy)
  const accent = ACCENT_STYLES[offer.id.charCodeAt(0) % ACCENT_STYLES.length]

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/30 hover:shadow-xl hover:shadow-brand-orange/10',
        className
      )}
    >
      <div className={cn('pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r', accent)} />

      <Link href={`/offers/${offer.slug}`} className="absolute inset-0 z-10" aria-label={`${offer.name} — open details`}>
        <span className="sr-only">{offer.name}</span>
      </Link>

      <div className="relative mb-3 flex items-start gap-3.5">
        <Logo src={offer.logoUrl} name={offer.name} size={56} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-heading text-base font-bold text-foreground transition-colors group-hover:text-brand-orange">
              {offer.name}
            </h3>
            {offer.featured && (
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-brand-orange" />
            )}
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
            {offer.tagline}
          </p>
          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Map className="h-3.5 w-3.5" />
              {offer.steps.length}-move journey
            </span>
          </div>
        </div>
      </div>

      <p className="mb-3 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-muted-foreground">
        {offer.description}
      </p>

      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <CategoryBadge kind="offer" category={offer.category} />
        <PricingBadge pricing={offer.pricing} />
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-3">
        <div className="flex items-center gap-2">
          {submitter && (
            <>
              <Avatar name={submitter.displayName} src={submitter.avatarUrl} size={22} />
              <Link
                href={`/profile/${submitter.username}`}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                onClick={(e) => e.stopPropagation()}
              >
                @{submitter.username}
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 rounded-lg bg-brand-orange/10 px-2.5 py-1.5 text-xs font-semibold text-brand-orange transition-all group-hover:bg-brand-orange group-hover:text-white">
            See how
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
          <div className="relative z-20">
            <BookmarkButton itemType="offer" itemId={offer.id} />
          </div>
        </div>
      </div>
    </article>
  )
}