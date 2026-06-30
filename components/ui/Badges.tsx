import { cn } from '@/lib/utils'
import {
  PRICING_LABELS,
  type Pricing,
  type DevToolCategory,
  type ToolCategory,
  type EditToolCategory,
  type CourseCategory,
  TOOL_CATEGORY_LABELS,
  DEVTOOL_CATEGORY_LABELS,
  REPO_CATEGORY_LABELS,
  COURSE_CATEGORY_LABELS,
} from '@/types'

export function CategoryBadge({
  kind,
  category,
  className,
}: {
  kind: 'tool' | 'devtool' | 'repo' | 'course'
  category: DevToolCategory | ToolCategory | EditToolCategory | CourseCategory
  className?: string
}) {
  const label =
    kind === 'tool'
      ? TOOL_CATEGORY_LABELS[category as ToolCategory]
      : kind === 'devtool'
        ? DEVTOOL_CATEGORY_LABELS[category as DevToolCategory]
        : kind === 'course'
          ? COURSE_CATEGORY_LABELS[category as CourseCategory]
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
