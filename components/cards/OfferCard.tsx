'use client'

import Link from 'next/link'
import { ExternalLink, ListChecks } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Avatar } from '@/components/ui/Avatar'
import { CategoryBadge, PricingBadge } from '@/components/ui/Badges'
import { BookmarkButton } from '@/components/interactive/BookmarkButton'
import { useApp } from '@/lib/store'
import { cn } from '@/lib/utils'
import { HoverTranslate } from '@/components/ui/HoverTranslate'
import type { Offer } from '@/types'

export function OfferCard({ offer, className, lang }: { offer: Offer; className?: string; lang?: 'en' | 'ar' }) {
  const { getUser } = useApp()
  const submitter = getUser(offer.submittedBy)
  const hasAr = !!(offer.nameAr && offer.taglineAr)

  return (
    <article
      className={cn(
        'group relative flex cursor-pointer flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-orange/30 hover:shadow-xl hover:shadow-brand-orange/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40',
        className
      )}
      aria-label={`${offer.name} - open details`}
    >
      <Link
        href={`/offers/${offer.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`${offer.name} - open details`}
      >
        <span className="sr-only">{offer.name}</span>
      </Link>

      <div className="relative mb-3 flex items-start gap-3.5">
        <Logo src={offer.logoUrl} name={offer.name} size={56} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-heading text-base font-bold text-foreground transition-colors group-hover:text-brand-orange">
              <HoverTranslate en={offer.name} ar={offer.nameAr} className="font-heading" />
            </h3>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
            <HoverTranslate en={offer.tagline} ar={offer.taglineAr} />
          </p>
          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <ListChecks className="h-3.5 w-3.5" />
              {offer.steps.length} steps
              {hasAr && <span className="text-[10px] opacity-60">· مرّر للترجمة</span>}
            </span>
            {offer.featured && (
              <span className={cn(
                'rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider',
                'bg-brand-orange/10 text-brand-orange'
              )}>
                Featured
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <CategoryBadge kind="offer" category={offer.category} />
        <PricingBadge pricing={offer.pricing} />
      </div>

      <p className="mb-4 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-muted-foreground">
        <HoverTranslate en={offer.description} ar={offer.descriptionAr} className="line-clamp-2" />
      </p>

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
          <a
            href={offer.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-brand-orange/10 px-2.5 py-1.5 text-xs font-semibold text-brand-orange transition-colors hover:bg-brand-orange/20"
          >
            Visit
            <ExternalLink className="h-3 w-3" />
          </a>
          <div className="relative z-20">
            <BookmarkButton itemType="offer" itemId={offer.id} />
          </div>
        </div>
      </div>
    </article>
  )
}