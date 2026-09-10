import { GraduationCap, Timer, CalendarX2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  PRICING_LABELS,
  type Pricing,
  type DevToolCategory,
  type ToolCategory,
  type EditToolCategory,
  type CourseCategory,
  type OfferCategory,
  TOOL_CATEGORY_LABELS,
  DEVTOOL_CATEGORY_LABELS,
  REPO_CATEGORY_LABELS,
  COURSE_CATEGORY_LABELS,
  OFFER_CATEGORY_LABELS,
} from '@/types'

export function CategoryBadge({
  kind,
  category,
  className,
}: {
  kind: 'tool' | 'devtool' | 'repo' | 'course' | 'offer'
  category: DevToolCategory | ToolCategory | EditToolCategory | CourseCategory | OfferCategory
  className?: string
}) {
  const label =
    kind === 'tool'
      ? TOOL_CATEGORY_LABELS[category as ToolCategory]
      : kind === 'devtool'
        ? DEVTOOL_CATEGORY_LABELS[category as DevToolCategory]
        : kind === 'course'
          ? COURSE_CATEGORY_LABELS[category as CourseCategory]
          : kind === 'offer'
            ? OFFER_CATEGORY_LABELS[category as OfferCategory]
            : REPO_CATEGORY_LABELS[category as EditToolCategory]
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-md bg-brand-orange/10 px-2 py-0.5 text-[11px] font-medium text-brand-orange', className)}>
      {label}
    </span>
  )
}

const pricingStyles: Record<Pricing, string> = {
  free: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'open-source': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  freemium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  paid: 'bg-red-500/10 text-red-600 dark:text-red-400',
}

export function PricingBadge({
  pricing,
  className,
}: {
  pricing: Pricing
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium', pricingStyles[pricing], className)}>
      {PRICING_LABELS[pricing]}
    </span>
  )
}

/** True for Coursera-hosted courses, which learners can take free via ReCoded. */
export function isCourseraFreeWithRecoded(url: string): boolean {
  return url.includes('coursera.org')
}

/** Badge shown on Coursera courses: free access via the ReCoded program. */
export function RecodedBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn('inline-flex items-center gap-1 rounded-md bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-600 dark:text-blue-400', className)}
      title="Free with ReCoded"
    >
      <GraduationCap className="h-3 w-3" />
      Free with ReCoded
    </span>
  )
}

/** Days before the deadline at which an offer counts as ending soon. */
export const OFFER_ENDING_SOON_DAYS = 7

export type OfferUrgency = 'ended' | 'ending-soon' | null

/** Parse an endsAt value to ms; date-only (YYYY-MM-DD) means end of that day. */
export function parseOfferEnd(endsAt: string | undefined): number | null {
  if (!endsAt) return null
  const end = new Date(/^\d{4}-\d{2}-\d{2}$/.test(endsAt.trim()) ? `${endsAt.trim()}T23:59:59` : endsAt).getTime()
  return Number.isNaN(end) ? null : end
}

/** Classify an offer deadline against now (invalid/missing dates → null). */
export function getOfferUrgency(endsAt: string | undefined, now: number = Date.now()): OfferUrgency {
  const end = parseOfferEnd(endsAt)
  if (end === null) return null
  if (end < now) return 'ended'
  if (end - now <= OFFER_ENDING_SOON_DAYS * 86400000) return 'ending-soon'
  return null
}

/** Red "Ended" / amber "Ends in N days" badge for time-sensitive offers. */
export function OfferUrgencyBadge({
  endsAt,
  now,
  className,
}: {
  endsAt?: string
  now?: number
  className?: string
}) {
  const urgency = getOfferUrgency(endsAt, now)
  const end = parseOfferEnd(endsAt)
  if (!urgency || end === null) return null
  if (urgency === 'ended') {
    return (
      <span
        className={cn('inline-flex items-center gap-1 rounded-md bg-red-500/10 px-2 py-0.5 text-[11px] font-medium text-red-600 dark:text-red-400', className)}
        title="This offer has ended"
      >
        <CalendarX2 className="h-3 w-3" />
        Ended
      </span>
    )
  }
  const current = now ?? Date.now()
  const atMidnight = (t: number) => {
    const d = new Date(t)
    d.setHours(0, 0, 0, 0)
    return d.getTime()
  }
  const calendarDays = Math.round((atMidnight(end) - atMidnight(current)) / 86400000)
  const label = calendarDays <= 0 ? 'Ends today' : calendarDays === 1 ? 'Ends tomorrow' : `Ends in ${calendarDays} days`
  return (
    <span
      className={cn('inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400', className)}
      title={label}
    >
      <Timer className="h-3 w-3" />
      {label}
    </span>
  )
}

export function Tag({
  children,
  className,
  color,
}: {
  children: React.ReactNode
  className?: string
  color?: 'orange' | 'blue' | 'purple' | 'green' | 'amber' | 'red' | 'cyan' | 'pink' | 'emerald' | 'violet'
}) {
  const colorStyles: Record<string, string> = {
    orange: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    green: 'bg-green-500/10 text-green-600 dark:text-green-400',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    red: 'bg-red-500/10 text-red-600 dark:text-red-400',
    cyan: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
    pink: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    violet: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  }

  return (
    <span className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium', color ? colorStyles[color] : 'bg-muted text-muted-foreground', className)}>
      #{children}
    </span>
  )
}
