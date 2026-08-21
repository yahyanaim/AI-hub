'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export function HoverTranslate({
  en,
  ar,
  as: Tag = 'span',
  className,
  dirOnHover = true,
}: {
  en: string
  ar?: string
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div'
  className?: string
  dirOnHover?: boolean
}) {
  const [tapped, setTapped] = useState(false)
  if (!ar || ar === en) return <Tag className={className}>{en}</Tag>
  const showAr = tapped // tap toggles for mobile

  return (
    <Tag
      className={cn('group/hover relative inline-block cursor-pointer select-none', className)}
      onClick={() => setTapped((v) => !v)}
      onTouchStart={() => setTapped((v) => !v)}
      title={ar}
    >
      <span className={cn('block transition-opacity duration-200', showAr ? 'opacity-0' : 'group-hover/hover:opacity-0')}>
        {en}
      </span>
      <span
        dir={dirOnHover ? 'rtl' : undefined}
        className={cn(
          'pointer-events-none absolute inset-0 block opacity-0 transition-opacity duration-200',
          showAr ? 'opacity-100' : 'group-hover/hover:opacity-100'
        )}
      >
        {ar}
      </span>
      {/* reserve layout height - invisible duplicate for sizing when ar longer */}
      <span className="invisible block h-0 overflow-hidden" aria-hidden>
        {ar.length > en.length ? ar : en}
      </span>
    </Tag>
  )
}

export function HoverTranslateBlock({
  en,
  ar,
  className,
}: {
  en: string
  ar?: string
  className?: string
}) {
  const [tapped, setTapped] = useState(false)
  if (!ar) return <p className={className}>{en}</p>
  return (
    <div
      className={cn('group/hover relative cursor-pointer', className)}
      onClick={() => setTapped((v) => !v)}
      title={ar}
    >
      <p className={cn('transition-opacity duration-200', tapped ? 'opacity-0' : 'group-hover/hover:opacity-0')}>{en}</p>
      <p
        dir="rtl"
        className={cn(
          'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200',
          tapped ? 'opacity-100' : 'group-hover/hover:opacity-100'
        )}
      >
        {ar}
      </p>
    </div>
  )
}
