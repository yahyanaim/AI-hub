'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StarRating({
  value,
  size = 14,
  className,
}: {
  value: number
  size?: number
  className?: string
}) {
  const full = Math.floor(value)
  const hasHalf = value - full >= 0.5
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)} aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const isFull = i < full
        const isHalf = i === full && hasHalf
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star
              className="absolute inset-0 text-amber-300"
              style={{ width: size, height: size, strokeWidth: 1.5 }}
              fill="none"
            />
            {(isFull || isHalf) && (
              <Star
                className="absolute inset-0 text-amber-400"
                style={{
                  width: size,
                  height: size,
                  strokeWidth: 1.5,
                  clipPath: isHalf ? 'inset(0 50% 0 0)' : 'none',
                }}
                fill="currentColor"
              />
            )}
          </span>
        )
      })}
    </span>
  )
}
