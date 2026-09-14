'use client'

import { MessageCircle, Lock, BadgeCheck, Star, BookOpen, ShieldCheck } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { CategoryBadge, PricingBadge } from '@/components/ui/Badges'
import { UpvoteButton } from '@/components/interactive/UpvoteButton'
import { BookmarkButton } from '@/components/interactive/BookmarkButton'
import { HoverTranslate } from '@/components/ui/HoverTranslate'
import { PAYMENT_RIB, whatsappOrderLink, GUIDE_PRICE_LABEL } from '@/lib/guides'
import type { Offer } from '@/types'

export function GuideLanding({ offer }: { offer: Offer }) {
  const price = GUIDE_PRICE_LABEL(offer)
  const waLink = whatsappOrderLink(offer)
  const hasAr = !!(offer.nameAr && offer.descriptionAr)

  // First 3 steps = order flow, last step(s) = free glimpse chapter.
  const orderSteps = offer.steps.slice(0, 3)
  const glimpseSteps = offer.steps.slice(3)

  return (
    <div className="container-page py-8 pb-28 md:pb-8">
      {hasAr && (
        <p className="mb-2 text-center text-xs text-muted-foreground">
          مرّر فوق النص للترجمة · Hover text to translate
        </p>
      )}

      {/* Hero */}
      <div className="rounded-xl border border-border bg-muted p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <Logo src={offer.logoUrl} name={offer.name} size={80} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-green-600/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400">
                Guide • {price}
              </span>
              {typeof offer.rating === 'number' && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {offer.rating.toFixed(1)}
                  {offer.reviewsCount ? ` (${offer.reviewsCount} reviews)` : ''}
                </span>
              )}
              {offer.pages && (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <BookOpen className="h-3.5 w-3.5" /> {offer.pages} pages
                </span>
              )}
              {offer.level && (
                <span className="text-xs capitalize text-muted-foreground">{offer.level}</span>
              )}
            </div>
            <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight">
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
              {offer.guarantee && (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-green-600" /> {offer.guarantee}
                </span>
              )}
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-green-700"
            >
              <MessageCircle className="h-4 w-4" />
              Order on WhatsApp — {price}
            </a>
          </div>
        </div>
      </div>

      {/* How to get it — 3 steps */}
      <div className="mt-8 rounded-xl border border-border bg-card p-6 md:p-8">
        <h2 className="font-heading text-xl font-bold">How to get the PDF — 3 steps</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Virement direct. No account, no checkout page.
        </p>
        <ol className="mt-4 space-y-4">
          {orderSteps.map((step, i) => (
            <li key={i} className="flex gap-4 rounded-lg border border-border bg-muted/50 p-4">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-600/10 text-sm font-bold text-green-700 dark:text-green-400">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="font-medium text-foreground">
                  <HoverTranslate en={step.title} ar={offer.stepsAr?.[i]?.title} />
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  <HoverTranslate en={step.description} ar={offer.stepsAr?.[i]?.description} as="span" />
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-4 rounded-lg border border-dashed border-border bg-muted/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            1 — Pay to this RIB
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-foreground">{PAYMENT_RIB}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Amount: <strong className="text-foreground">{price}</strong> — keep the receipt screenshot.
          </p>
        </div>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-green-700"
        >
          <MessageCircle className="h-4 w-4" />
          2 — Send “Hi, I paid” + receipt on WhatsApp
        </a>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          3 — We reply and send you the full PDF on WhatsApp + 30 days of free updates.
        </p>
      </div>

      {/* Free glimpse — indexable */}
      {glimpseSteps.length > 0 && (
        <div className="mt-8 rounded-xl border border-border bg-card p-6 md:p-8">
          <div className="mb-2 flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-brand-orange" />
            <h2 className="font-heading text-xl font-bold">Free glimpse — 1 chapter</h2>
          </div>
          {glimpseSteps.map((step, i) => (
            <div key={i} className="mt-3 rounded-lg border border-border bg-muted/50 p-4">
              <h3 className="font-medium text-foreground">
                <HoverTranslate
                  en={step.title}
                  ar={offer.stepsAr?.[orderSteps.length + i]?.title}
                />
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                <HoverTranslate
                  en={step.description}
                  ar={offer.stepsAr?.[orderSteps.length + i]?.description}
                  as="span"
                />
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Locked */}
      <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card p-6 md:p-8">
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-heading text-xl font-bold">Full {offer.pages ?? ''} pages — locked</h2>
        </div>
        <div className="relative mt-4">
          <div className="space-y-2 blur-[3px]" aria-hidden="true">
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-5/6 rounded bg-muted" />
            <div className="h-4 w-2/3 rounded bg-muted" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/40">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-green-700"
            >
              <MessageCircle className="h-4 w-4" />
              Unlock on WhatsApp — {price}
            </a>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-6">
          <UpvoteButton itemType="offer" itemId={offer.id} count={offer.upvotes} variant="detail" />
          <BookmarkButton itemType="offer" itemId={offer.id} variant="detail" />
        </div>
      </div>

      {/* Sticky mobile buy bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-bold text-white"
        >
          <MessageCircle className="h-4 w-4" />
          Get the PDF — {price}
        </a>
      </div>
    </div>
  )
}
