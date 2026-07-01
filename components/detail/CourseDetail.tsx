'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Flame, Clock, BookOpen, Download } from 'lucide-react'
import Link from 'next/link'
import { useApp } from '@/lib/store'
import { Logo } from '@/components/ui/Logo'
import { Avatar } from '@/components/ui/Avatar'
import { CategoryBadge, PricingBadge, Tag } from '@/components/ui/Badges'
import { UpvoteButton } from '@/components/interactive/UpvoteButton'
import { BookmarkButton } from '@/components/interactive/BookmarkButton'
import { cn, formatNumber, downloadRoadmapPlan } from '@/lib/utils'
import type { Course } from '@/types'

const TOPIC_COLORS = ['orange', 'blue', 'purple', 'green', 'amber', 'cyan', 'pink', 'violet'] as const

function topicColor(topic: string) {
  let hash = 0
  for (let i = 0; i < topic.length; i++) hash = topic.charCodeAt(i) + ((hash << 5) - hash)
  return TOPIC_COLORS[Math.abs(hash) % TOPIC_COLORS.length]
}

export function CourseDetailModal() {
  const { detailModalCourseId, closeDetailModalForCourse, courses, getUser } = useApp()
  const course = courses.find((c) => c.id === detailModalCourseId) ?? null

  useEffect(() => {
    if (!detailModalCourseId) return
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDetailModalForCourse()
    }
    window.addEventListener('keydown', onEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onEsc)
      document.body.style.overflow = ''
    }
  }, [detailModalCourseId, closeDetailModalForCourse])

  return (
    <AnimatePresence>
      {course && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${course.name} details`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeDetailModalForCourse}
          />

          <motion.div
            className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-card shadow-xl"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={closeDetailModalForCourse}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-start gap-4 px-6 pb-0 pt-6">
              <Logo src={course.logoUrl} name={course.name} size={52} />
              <div className="min-w-0 flex-1 pr-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-foreground">
                    {course.name}
                  </h2>
                  {course.url && (
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0 text-xs font-medium text-brand-orange hover:underline"
                    >
                      Visit course →
                    </a>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {course.tagline}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {(() => {
                const submitter = getUser(course.submittedBy)
                return submitter ? (
                  <div className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Avatar name={submitter.displayName} src={submitter.avatarUrl} size={18} />
                    <span>by</span>
                    <Link
                      href={`/profile/${submitter.username}`}
                      onClick={closeDetailModalForCourse}
                      className="font-medium text-foreground hover:text-brand-orange"
                    >
                      @{submitter.username}
                    </Link>
                  </div>
                ) : null
              })()}

              <div className="mb-4 flex flex-wrap items-center gap-1.5">
                <CategoryBadge kind="course" category={course.category} />
                <PricingBadge pricing={course.pricing} />
                <span className={cn(
                  'inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium',
                  course.difficulty === 'beginner' && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                  course.difficulty === 'intermediate' && 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
                  course.difficulty === 'advanced' && 'bg-red-500/10 text-red-600 dark:text-red-400',
                )}>
                  {course.difficulty}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {course.duration}
                </span>
              </div>

              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                {course.description}
              </p>

              <div className="mb-5">
                <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <BookOpen className="h-4 w-4" />
                  Roadmap ({course.roadmap.length} steps)
                </h3>
                <div className="relative">
                  <div className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-0.5 bg-border" />
                  {course.roadmap.map((step, i) => {
                    const isLast = i === course.roadmap.length - 1
                    const isCapstone = step.title === 'Capstone Project'
                    return (
                      <div key={i} className="relative flex gap-4 pb-5 last:pb-0">
                        <div className="relative z-10 flex shrink-0 flex-col items-center">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-brand-orange bg-card text-[8px] font-bold text-brand-orange">
                            {i + 1}
                          </span>
                          {!isLast && <div className="mt-1 h-full w-0.5 bg-border" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-medium text-foreground">{step.title}</h4>
                            <span className="text-[10px] text-muted-foreground">{step.duration}</span>
                          </div>
                          {!isCapstone && (
                            <div className="mt-1 flex flex-wrap gap-1">
                              {step.topics.map((topic) => (
                                <Tag key={topic} color={topicColor(topic)}>{topic}</Tag>
                              ))}
                            </div>
                          )}
                          {step.description && (
                            <p className={cn("leading-relaxed", isCapstone ? "mt-2 text-sm text-foreground/90" : "mt-1 text-[11px] text-muted-foreground/80")}>
                              {step.description}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Flame className="h-3.5 w-3.5 text-brand-orange" />
                  {formatNumber(course.upvotes)} upvotes
                </span>
                <span>{course.roadmap.length} steps</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <UpvoteButton itemType="course" itemId={course.id} count={course.upvotes} variant="detail" />
                <BookmarkButton itemType="course" itemId={course.id} variant="detail" />
              </div>
              <button
                onClick={() => downloadRoadmapPlan(course)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              >
                Download Plan
                <Download className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function CourseDetail({ slug }: { slug: string }) {
  const { courses, getUser } = useApp()
  const course = courses.find((c) => c.slug === slug)

  if (!course) return null

  const submitter = getUser(course.submittedBy)

  return (
    <div className="container-page py-8">
      <div className="rounded-xl border border-border bg-muted p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <Logo src={course.logoUrl} name={course.name} size={80} />
          <div className="min-w-0 flex-1">
            <h1 className="font-heading text-3xl font-bold tracking-tight">
              {course.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {course.tagline}
            </p>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">
              {course.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <CategoryBadge kind="course" category={course.category} />
              <PricingBadge pricing={course.pricing} />
              <span className={cn(
                'inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium',
                course.difficulty === 'beginner' && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                course.difficulty === 'intermediate' && 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
                course.difficulty === 'advanced' && 'bg-red-500/10 text-red-600 dark:text-red-400',
              )}>
                {course.difficulty}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                <Clock className="h-3 w-3" />
                {course.duration}
              </span>
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

        <div className="mt-8">
          <h2 className="mb-4 flex items-center gap-2 font-heading text-xl font-bold">
            <BookOpen className="h-5 w-5 text-brand-orange" />
            Roadmap ({course.roadmap.length} steps)
          </h2>
          <div className="relative">
            <div className="absolute left-[11px] top-2 h-[calc(100%-1.5rem)] w-0.5 bg-border" />
            {course.roadmap.map((step, i) => {
              const isLast = i === course.roadmap.length - 1
              const isCapstone = step.title === 'Capstone Project'
              return (
                <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
                  <div className="relative z-10 flex shrink-0 flex-col items-center">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-brand-orange bg-card text-xs font-bold text-brand-orange">
                      {i + 1}
                    </span>
                    {!isLast && <div className="mt-1 h-full w-0.5 bg-border" />}
                  </div>
                  <div className="min-w-0 flex-1 rounded-lg border border-border bg-card p-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">{step.title}</h3>
                      <span className="text-xs text-muted-foreground">{step.duration}</span>
                    </div>
                    {!isCapstone && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {step.topics.map((topic) => (
                          <Tag key={topic} color={topicColor(topic)}>{topic}</Tag>
                        ))}
                      </div>
                    )}
                    {step.description && (
                      <p className={cn("leading-relaxed", isCapstone ? "mt-3 text-sm text-foreground/90" : "mt-2 text-xs text-muted-foreground/80")}>
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <UpvoteButton itemType="course" itemId={course.id} count={course.upvotes} variant="detail" />
          <BookmarkButton itemType="course" itemId={course.id} variant="detail" />
          <button
            onClick={() => downloadRoadmapPlan(course)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Download Plan
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
