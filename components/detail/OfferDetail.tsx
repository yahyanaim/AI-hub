'use client'

import Link from 'next/link'
import {
  ExternalLink,
  Map,
  Rocket,
  BadgeCheck,
  BookOpen,
  Fingerprint,
  Gift,
  Sparkles,
  Clock,
} from 'lucide-react'
import { useApp } from '@/lib/store'
import { Avatar } from '@/components/ui/Avatar'
import { Tag } from '@/components/ui/Badges'
import { UpvoteButton } from '@/components/interactive/UpvoteButton'
import { BookmarkButton } from '@/components/interactive/BookmarkButton'
import { cn } from '@/lib/utils'

const NODE_STYLES = [
  { icon: Rocket, ring: 'text-[#FF6B00]', bg: 'from-[#FF6B00]/25 to-[#c84d00]/10 border-[#FF6B00]/40' },
  { icon: Fingerprint, ring: 'text-violet-500', bg: 'from-violet-500/25 to-violet-500/10 border-violet-500/40' },
  { icon: BookOpen, ring: 'text-sky-500', bg: 'from-sky-500/25 to-sky-500/10 border-sky-500/40' },
  { icon: Gift, ring: 'text-emerald-500', bg: 'from-emerald-500/25 to-emerald-500/10 border-emerald-500/40' },
  { icon: Sparkles, ring: 'text-pink-500', bg: 'from-pink-500/25 to-pink-500/10 border-pink-500/40' },
  { icon: BadgeCheck, ring: 'text-amber-500', bg: 'from-amber-500/25 to-amber-500/10 border-amber-500/40' },
] as const

const TAG_COLORS = ['orange', 'blue', 'purple', 'green', 'amber', 'cyan', 'pink', 'violet'] as const

export function OfferDetail({ slug }: { slug: string }) {
  const { offers, getUser } = useApp()
  const offer = offers.find((o) => o.slug === slug)

  if (!offer) return null

  const submitter = getUser(offer.submittedBy)

  return (
    <div className="container-page py-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-orange/15 via-card to-violet-500/10 p-8 md:p-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-brand-orange/30 bg-white/60 shadow-lg shadow-brand-orange/10">
              <span className="font-heading text-4xl font-bold text-brand-orange">
                {((offer.name.trim()[0] ?? '?').match(/[a-zA-Z0-9]/) ? offer.name.trim()[0] : offer.name.trim()[1] ?? '?').toUpperCase()}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-orange px-2.5 py-1 text-[11px] font-semibold text-white">
                  <Sparkles className="h-3 w-3" />
                  Community offer
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/60 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-orange">
                  Free to get
                </span>
              </div>
              <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
                {offer.name}
              </h1>
              <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                {offer.tagline}
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {offer.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {offer.tags.slice(0, 6).map((t, i) => (
              <Tag key={t} color={TAG_COLORS[i % TAG_COLORS.length]} className="bg-white/50 dark:bg-card">{t}</Tag>
            ))}
          </div>

          {submitter && (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href={`/profile/${submitter.username}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <Avatar name={submitter.displayName} src={submitter.avatarUrl} size={26} />
                Curated by @{submitter.username}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* How to get it */}
      <div className="mt-10">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-orange/10">
            <Map className="h-5 w-5 text-brand-orange" />
          </span>
          <div>
            <h2 className="font-heading text-xl font-bold">Your journey to {offer.name}</h2>
            <p className="text-sm text-muted-foreground">
              {offer.steps.length} quick moves — follow the path and you’re in.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Connecting trail */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-brand-orange/40 via-violet-400/30 to-transparent md:block" />

          <div className="space-y-6">
            {offer.steps.map((step, i) => {
              const meta = NODE_STYLES[i % NODE_STYLES.length]
              const Icon = meta.icon
              const reverse = i % 2 === 1
              return (
                <div key={i} className={cn('relative grid md:grid-cols-2 md:gap-8')}>
                  {/* Node on the center line (desktop) */}
                  <div className="absolute left-1/2 top-6 z-10 hidden -translate-x-1/2 md:flex">
                    <span
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-2xl border bg-gradient-to-br text-lg font-bold shadow-lg',
                        meta.ring,
                        meta.bg,
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>

                  {/* Mobile node */}
                  <div className={cn('mb-0 flex items-center gap-3 md:hidden')}>
                    <span
                      className={cn(
                        'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border bg-gradient-to-br text-lg font-bold shadow-md',
                        meta.ring,
                        meta.bg,
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground/60">
                      Move {i + 1}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className={cn(
                      'group rounded-2xl border border-border bg-card/70 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl',
                      reverse ? 'md:col-start-2' : 'md:col-start-1',
                    )}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span className={cn('hidden text-sm font-bold md:inline', meta.ring)}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                        Move
                      </span>
                      {step.duration && (
                        <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {step.duration}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold leading-snug text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                    {step.url && (
                      <a
                        href={step.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-orange/10 px-3 py-1.5 text-xs font-semibold text-brand-orange transition-colors hover:bg-brand-orange/20"
                      >
                        Open here
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>

                  {/* Spacer to keep grid aligned when card is on right */}
                  {reverse && <div className="hidden md:block" />}
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA banner */}
        <div className="relative mt-10 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-orange to-orange-500 p-6 md:p-8">
          <div className="pointer-events-none absolute -right-4 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="font-heading text-xl font-bold text-white">
                Ready to grab it?
              </h3>
              <p className="text-sm text-white/80">
                Head to {offer.name} and start your {offer.steps.length}-move journey.
              </p>
            </div>
            <a
              href={offer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-brand-orange shadow-lg transition-transform hover:scale-[1.02]"
            >
              Get this offer
              <Rocket className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <UpvoteButton itemType="offer" itemId={offer.id} count={offer.upvotes} variant="detail" />
          <BookmarkButton itemType="offer" itemId={offer.id} variant="detail" />
        </div>
      </div>
    </div>
  )
}