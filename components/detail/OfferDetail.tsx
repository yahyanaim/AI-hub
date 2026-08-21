'use client'

import Link from 'next/link'
import { ExternalLink, ShieldCheck } from 'lucide-react'
import { useApp } from '@/lib/store'
import { Logo } from '@/components/ui/Logo'
import { Avatar } from '@/components/ui/Avatar'
import { CategoryBadge, PricingBadge } from '@/components/ui/Badges'
import { UpvoteButton } from '@/components/interactive/UpvoteButton'
import { BookmarkButton } from '@/components/interactive/BookmarkButton'
import { HoverTranslate } from '@/components/ui/HoverTranslate'

export function OfferDetail({ slug }: { slug: string }) {
  const { offers, getUser } = useApp()
  const offer = offers.find((o) => o.slug === slug)

  if (!offer) return null

  const submitter = getUser(offer.submittedBy)
  const hasAr = !!(offer.nameAr && offer.descriptionAr)

  return (
    <div className="container-page py-8">
      {hasAr && <p className="mb-2 text-center text-xs text-muted-foreground">مرّر فوق النص للترجمة · Hover text to translate · Tap on mobile</p>}
      {/* Header */}
      <div className="rounded-xl border border-border bg-muted p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <Logo src={offer.logoUrl} name={offer.name} size={80} />
          <div className="min-w-0 flex-1">
            <h1 className="font-heading text-3xl font-bold tracking-tight">
              <HoverTranslate en={offer.name} ar={offer.nameAr} as="span" />
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              <HoverTranslate en={offer.tagline} ar={offer.taglineAr} />
            </p>
            <p className="mt-2 w-full text-base text-muted-foreground">
              <HoverTranslate en={offer.description} ar={offer.descriptionAr} as="div" />
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <CategoryBadge kind="offer" category={offer.category} />
              <PricingBadge pricing={offer.pricing} />
              <a
                href={offer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-brand-orange px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-orange-600"
              >
                Visit offer
                <ExternalLink className="h-3 w-3" />
              </a>
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
      </div>

      {/* How to get it */}
      <div className="mt-8 rounded-xl border border-border bg-card p-6 md:p-8">
        <div className="mb-6 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-brand-orange" />
          <h2 className="font-heading text-xl font-bold">
            How to get it <span className="text-xs font-normal text-muted-foreground">· مرّر للترجمة</span>
          </h2>
        </div>

        <ol className="space-y-4">
          {(offer.stepsAr && offer.stepsAr.length ? offer.steps.map((_, i) => ({ en: offer.steps[i], ar: offer.stepsAr![i] })) : offer.steps.map(s => ({ en: s, ar: undefined }))).map(({ en, ar }, i) => (
            <li
              key={i}
              className="flex gap-4 rounded-lg border border-border bg-muted/50 p-4"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-sm font-bold text-brand-orange">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="font-medium text-foreground">
                  <HoverTranslate en={en.title} ar={ar?.title} />
                  {en.duration && (
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      {en.duration}
                    </span>
                  )}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  <HoverTranslate en={en.description} ar={ar?.description} as="span" />
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-6">
          <UpvoteButton itemType="offer" itemId={offer.id} count={offer.upvotes} variant="detail" />
          <BookmarkButton itemType="offer" itemId={offer.id} variant="detail" />
          <a
            href={offer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Get this offer
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}