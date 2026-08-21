'use client'

import Link from 'next/link'
import { ExternalLink, ShieldCheck } from 'lucide-react'
import { useApp } from '@/lib/store'
import { Logo } from '@/components/ui/Logo'
import { Avatar } from '@/components/ui/Avatar'
import { CategoryBadge, PricingBadge } from '@/components/ui/Badges'
import { UpvoteButton } from '@/components/interactive/UpvoteButton'
import { BookmarkButton } from '@/components/interactive/BookmarkButton'

export function OfferDetail({ slug }: { slug: string }) {
  const { offers, getUser, offersLang, setOffersLang } = useApp()
  const offer = offers.find((o) => o.slug === slug)

  if (!offer) return null

  const submitter = getUser(offer.submittedBy)
  const isAr = offersLang === 'ar'
  const displayName = isAr && offer.nameAr ? offer.nameAr : offer.name
  const displayTagline = isAr && offer.taglineAr ? offer.taglineAr : offer.tagline
  const displayDesc = isAr && offer.descriptionAr ? offer.descriptionAr : offer.description
  const displaySteps = isAr && offer.stepsAr && offer.stepsAr.length ? offer.stepsAr : offer.steps

  return (
    <div className="container-page py-8" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Lang toggle */}
      <div className="mb-4 flex justify-end">
        <div className="inline-flex rounded-full border border-border bg-muted p-1 text-sm">
          <button onClick={() => setOffersLang('en')} className={`rounded-full px-4 py-1.5 font-medium transition ${!isAr ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}>EN</button>
          <button onClick={() => setOffersLang('ar')} className={`rounded-full px-4 py-1.5 font-medium transition ${isAr ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}>عربي</button>
        </div>
      </div>
      {/* Header */}
      <div className="rounded-xl border border-border bg-muted p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <Logo src={offer.logoUrl} name={displayName} size={80} />
          <div className="min-w-0 flex-1">
            <h1 className="font-heading text-3xl font-bold tracking-tight">
              {displayName}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {displayTagline}
            </p>
            <p className="mt-2 w-full text-base text-muted-foreground">
              {displayDesc}
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
                {isAr ? 'زيارة العرض' : 'Visit offer'}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            {submitter && (
              <Link
                href={`/profile/${submitter.username}`}
                className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-muted-foreground"
              >
                <Avatar name={submitter.displayName} src={submitter.avatarUrl} size={24} />
                {isAr ? `أرسله @${submitter.username}` : `Submitted by @${submitter.username}`}
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
            {isAr ? 'كيف تحصل عليه' : 'How to get it'}
          </h2>
        </div>

        <ol className="space-y-4">
          {displaySteps.map((step, i) => (
            <li
              key={i}
              className="flex gap-4 rounded-lg border border-border bg-muted/50 p-4"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-sm font-bold text-brand-orange">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="font-medium text-foreground">
                  {step.title}
                  {step.duration && (
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      {step.duration}
                    </span>
                  )}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
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
            {isAr ? 'احصل على العرض' : 'Get this offer'}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}