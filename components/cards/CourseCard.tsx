'use client'

import Link from 'next/link'
import { ExternalLink, Clock, BookOpen, Download } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Avatar } from '@/components/ui/Avatar'
import { CategoryBadge, PricingBadge } from '@/components/ui/Badges'
import { BookmarkButton } from '@/components/interactive/BookmarkButton'
import { useApp } from '@/lib/store'
import { cn, downloadRoadmapPlan } from '@/lib/utils'
import type { Course } from '@/types'

export function CourseCard({ course, className }: { course: Course; className?: string }) {
  const { getUser, openDetailModalForCourse } = useApp()
  const submitter = getUser(course.submittedBy)

  return (
    <article
      onClick={() => openDetailModalForCourse(course.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          openDetailModalForCourse(course.id)
        }
      }}
      className={cn(
        'group relative flex cursor-pointer flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-orange/30 hover:shadow-xl hover:shadow-brand-orange/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40',
        className
      )}
      aria-label={`${course.name} — open details`}
    >
      <div className="relative mb-3 flex items-start gap-3.5">
        <Logo src={course.logoUrl} name={course.name} size={56} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-heading text-base font-bold text-foreground transition-colors group-hover:text-brand-orange">
              {course.name}
            </h3>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
            {course.tagline}
          </p>
          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              {course.roadmap.length} steps
            </span>
            <span className={cn(
              'rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider',
              course.difficulty === 'beginner' && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
              course.difficulty === 'intermediate' && 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
              course.difficulty === 'advanced' && 'bg-red-500/10 text-red-600 dark:text-red-400',
            )}>
              {course.difficulty}
            </span>
          </div>
        </div>
      </div>

      <p className="mb-3 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-muted-foreground">
        {course.description}
      </p>

      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <CategoryBadge kind="course" category={course.category} />
        <PricingBadge pricing={course.pricing} />
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
          <a
            onClick={(e) => { e.stopPropagation(); downloadRoadmapPlan(course) }}
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-brand-orange/10 px-2.5 py-1.5 text-xs font-semibold text-brand-orange transition-colors hover:bg-brand-orange/20"
          >
            Download Plan
            <Download className="h-3 w-3" />
          </a>
          <div className="relative z-20">
            <BookmarkButton itemType="course" itemId={course.id} />
          </div>
        </div>
      </div>
    </article>
  )
}
