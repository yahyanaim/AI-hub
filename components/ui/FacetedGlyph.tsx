'use client'

import { useId } from 'react'
import { cn } from '@/lib/utils'

// Filled silhouettes keep the folded-paper style legible at control sizes.
const SHAPES = {
  heart: 'M12 6 8 3H4L1 7v5l11 10 11-10V7l-3-4h-4z',
  share: 'm5 12 14-8 2 3-14 8zM5 12l16 6-2 3-14-6zM1 10l3-2 4 1 2 3-1 4-3 2-4-1-2-3zM16 1h5l3 3-1 4-4 2-4-3V3zM18 15h4l2 3-1 4-4 2-4-3v-4z',
  mail: 'M2 4h20l2 3v13H0V7zm1 3 9 7 9-7-9 10z',
  copy: 'M1 1h15v4H5v12H1zM7 7h16v16H7zm3 3v10h10V10z',
  check: 'm1 12 4-4 6 6L21 2l3 4-13 17z',
  external: 'M2 3h10v3H5v14h14v-7h3v10H2zM14 1h10v10h-4V8L10 18l-3-3L17 5h-3z',
  search: 'M9 0 3 2 0 8l2 7 6 3 6-1 7 7 3-3-7-7 1-6-3-6zm0 4 4 1 2 4-1 4-5 2-4-2-1-4 2-4z',
  sparkles: 'm11 0 3 8 8 3-8 3-3 8-3-8-8-3 8-3zM21 15l1 3 3 1-3 1-1 4-1-4-3-1 3-1zM3 0l1 2 2 1-2 1-1 2-1-2-2-1 2-1z',
  trending: 'm0 16 8-8 5 5 5-7h-5V2h11v11h-4V9l-7 10-5-5-5 5z',
  arrow: 'M0 10h15l-5-5 3-4 11 11-11 11-3-4 5-5H0z',
  calendar: 'M2 4h3V0h4v4h6V0h4v4h3v20H2zm3 7v10h14V11zM7 14h4v4H7z',
} as const

export function FacetedGlyph({ kind, size = 20, onAccent = false, className }: {
  kind: keyof typeof SHAPES
  size?: number
  onAccent?: boolean
  className?: string
}) {
  const clipId = `facet-${useId().replace(/:/g, '')}`
  return (
    <svg
      viewBox="-1 -1 26 26"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
      fill="none"
    >
      <defs>
        <clipPath id={clipId}>
          <path d={SHAPES[kind]} clipRule={kind === 'share' ? 'nonzero' : 'evenodd'} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <path d="M-1-1h26v26H-1z" fill={onAccent ? '#FFF4DF' : '#FF7900'} />
        <path d="m-1-1 15 1-5 14z" fill={onAccent ? '#FFFFFF' : '#FFD17A'} />
        <path d="m14 0 11 0-16 14z" fill={onAccent ? '#FFF9EE' : '#FFAB32'} />
        <path d="m9 14 16-14v25z" fill={onAccent ? '#FFE3B0' : '#ED5900'} />
        <path d="m-1 25 10-11 16 11z" fill={onAccent ? '#F7CC8C' : '#BB3700'} />
      </g>
    </svg>
  )
}
