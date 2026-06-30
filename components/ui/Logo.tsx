'use client'

import { cn } from '@/lib/utils'

interface LogoProps {
  src?: string
  name: string
  size?: number
  className?: string
}

export function Logo({ src, name, size = 48, className }: LogoProps) {
  const initial = (name?.[0] ?? '?').toUpperCase()
  const fallback = (
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
  if (!src || src.includes('placeholder')) return fallback
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-card',
        className
      )}
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt={`${name} logo`}
        width={size}
        height={size}
        className="h-full w-full object-cover"
        onError={(e) => {
          const el = e.currentTarget
          el.style.display = 'none'
          const parent = el.parentElement
          if (parent && !parent.dataset.fallback) {
            parent.dataset.fallback = '1'
            parent.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:var(--font-heading);font-weight:700;font-size:${size * 0.4}px;color:hsl(var(--foreground));background:linear-gradient(135deg, rgba(255,107,0,0.2), rgba(255,107,0,0.05))">${initial}</div>`
          }
        }}
      />
    </div>
  )
}
