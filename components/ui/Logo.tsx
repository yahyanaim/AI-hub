'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface LogoProps {
  src?: string
  name: string
  size?: number
  className?: string
}

export function Logo({ src, name, size = 48, className }: LogoProps) {
  const initial = (name?.[0] ?? '?').toUpperCase()
  const [failed, setFailed] = useState(false)
  const showFallback = !src || src.includes('placeholder') || failed
  if (showFallback) {
    return (
      <div
        className={cn(
          'flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-orange/20 to-brand-orange/5 font-heading text-lg font-bold text-foreground',
          className
        )}
        style={{ width: size, height: size }}
      >
        {initial}
      </div>
    )
  }
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-card',
        className
      )}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- remote favicons from arbitrary allowlisted hosts; optimization not worth the config churn */}
      <img
        src={src}
        alt={`${name} logo`}
        width={size}
        height={size}
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  )
}
