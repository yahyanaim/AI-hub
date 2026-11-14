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
  plus: 'M9 0h6v9h9v6h-9v9H9v-9H0V9h9z',
  menu: 'M1 3h22v4H1zM1 10h22v4H1zM1 17h22v4H1z',
  close: 'm4 0 8 8 8-8 4 4-8 8 8 8-4 4-8-8-8 8-4-4 8-8-8-8z',
  logout: 'M2 1h11v5H9V5H6v14h3v-1h4v5H2zM11 10h7l-3-3 3-3 7 8-7 8-3-3 3-3h-7z',
  'chevron-down': 'M0 7 4 3 12 11 20 3 24 7 12 19z',
  'chevron-right': 'M7 0 19 12 7 24 3 20 11 12 3 4z',
  sun: 'M12 5 17 7 19 12 17 17 12 19 7 17 5 12 7 7zM10 0h4v3h-4zM10 21h4v3h-4zM0 10h3v4H0zM21 10h3v4h-3zM2 4l2-2 3 3-2 2zM17 19l2-2 3 3-2 2zM17 5l3-3 2 2-3 3zM2 20l3-3 2 2-3 3z',
  moon: 'M14 0 7 2 2 7 0 14 4 21 11 24 18 23 24 18 18 19 12 16 8 10 9 4z',
  bell: 'M12 0 15 3 19 5 21 11v6l3 3H0l3-3v-6L5 5l4-2zM8 22h8l-2 3h-4z',
  trash: 'M6 1h12v3h6v3H0V4h6zM3 9h18l-2 15H5zm5 2v10h2V11zm6 0v10h2V11z',
  'bell-ring': 'M12 2 15 5 18 7 19 14 21 18H3l2-4L6 7l3-2zM9 20h6l-1 3h-4zM1 5l3-3 2 2-3 3v4H0zM18 4l2-2 3 3 1 6h-3V7z',
  smartphone: 'M4 0h16v24H4zm3 4v15h10V4zm3 17v2h4v-2z',
  spinner: 'M12 0 20 3 24 10 21 11 18 6 12 4 6 7 4 13 7 19 13 21 12 24 4 21 0 13 3 4z',
  'chevron-left': 'M17 0 5 12 17 24 21 20 13 12 21 4z',
  link: 'M15 1h6l3 3v6l-6 6-3-3 5-5V6l-2-2h-2l-5 5-3-3zM9 23H3l-3-3v-6l6-6 3 3-5 5v2l2 2h2l5-5 3 3zM7 14l7-7 3 3-7 7z',
  star: 'M12 0 16 8 24 9 18 15 20 24 12 20 4 24 6 15 0 9 8 8z',
  return: 'M19 2h5v13H9l4 4-3 3L0 12 10 2l3 3-4 5h10z',
  clock: 'M12 0 20 3 24 12 20 21 12 24 4 21 0 12 4 3zM12 4 7 6 4 12 7 18 12 20 17 18 20 12 17 6zM10 6h3v6l5 3-2 3-6-4z',
  sliders: 'M0 4h6v4H0zM12 4h12v4H12zM6 1h6v10H6zM0 16h14v4H0zM20 16h4v4h-4zM14 13h6v10h-6z',
  grid: 'M0 0h10v10H0zM14 0h10v10H14zM0 14h10v10H0zM14 14h10v10H14z',
  list: 'M0 2h4v4H0zM7 2h17v4H7zM0 10h4v4H0zM7 10h17v4H7zM0 18h4v4H0zM7 18h17v4H7z',
  dashboard: 'M0 0h10v14H0zM14 0h10v8H14zM0 18h10v6H0zM14 12h10v12H14z',
  'bar-chart': 'M0 15h6v9H0zM9 8h6v16H9zM18 0h6v24h-6z',
  users: 'M10 1h4l3 3v4l-3 3h-4L7 8V4zM4 17l6-4h4l6 4v7H4zM1 4h3l2 3v3l-3 2-3-2V7zM0 16l4-2 2 2-4 4v4H0zM20 4h3l2 3v3l-3 2-3-2V7zM20 14l4 2v8h-2v-4l-4-4z',
  file: 'M3 0h12l7 7v17H3zm12 1v7h6zM6 11v3h12v-3zM6 17v3h10v-3z',
  cpu: 'M5 5h14v14H5zm4 4v6h6V9zM7 0h3v5H7zM14 0h3v5h-3zM7 19h3v5H7zM14 19h3v5h-3zM0 7h5v3H0zM0 14h5v3H0zM19 7h5v3h-5zM19 14h5v3h-5z',
  database: 'M12 0 22 4v16l-10 4-10-4V4zM5 6l7 3 7-3v3l-7 3-7-3zM5 13l7 3 7-3v3l-7 3-7-3z',
  folder: 'M0 3h9l4 4h11v17H0zm4 8v9h3v-9zm7 0v6h3v-6zm7 0v9h3v-9z',
  activity: 'M0 11h5L9 1l6 17 3-7h6v4h-3l-6 10L9 9l-2 6H0z',
  'check-circle': 'M12 0 20 3 24 12 20 21 12 24 4 21 0 12 4 3zM3 13l4-4 4 4 7-8 3 3-10 12z',
  alert: 'M12 0 25 24H-1zm-2 7v9h4V7zm0 12v3h4v-3z',
  bot: 'M4 5h6V1h4v4h6l3 3v12l-3 3H4l-3-3V8zm1 5v4h4v-4zm10 0v4h4v-4zm-8 7v3h10v-3z',
  server: 'M2 0h20v7H2zM2 9h20v6H2zM2 17h20v7H2zM5 2v3h3V2zM5 11v2h3v-2zM5 19v3h3v-3z',
  lock: 'M5 10V4l4-4h6l4 4v6h3v14H2V10zm4 0h6V6l-2-2h-2L9 6zm1 5v5h4v-5z',
  unlock: 'M10 10V4l4-4h6l4 4v5h-4V6l-2-2h-2l-2 2v4h4v14H0V10zm-4 5v5h4v-5z',
  'shield-check': 'M12 0 24 5l-2 12-10 8-10-8L0 5zM4 12l4-4 3 3 7-7 4 4-11 12z',
  'shield-alert': 'M12 0 24 5l-2 12-10 8-10-8L0 5zM10 6v9h4V6zm0 12v3h4v-3z',
  info: 'M12 0 20 3 24 12 20 21 12 24 4 21 0 12 4 3zM10 5v3h4V5zm0 5v10h4V10z',
  key: 'M7 0h7l5 5v7l-4 4-3-1-3 3v4H5v3H0v-8l6-6-1-3zM9 5 8 7l1 3h3l2-2-2-3z',
  megaphone: 'M2 7l19-6v18L2 13zM5 14l6 2 3 8H7zM0 7h3v7H0zM23 6h2v7h-2z',
  message: 'M2 1h20l2 3v14H9l-8 6V4zm3 5v3h14V6zm0 5v3h10v-3z',
  target: 'M12 0 20 3 24 12 20 21 12 24 4 21 0 12 4 3zM12 4 7 6 4 12 7 18 12 20 17 18 20 12 17 6zM12 8l4 2 1 4-4 3-4-1-2-4 2-3z',
  settings: 'M9 0h6l1 4 4-1 4 5-3 3 3 3-2 6-4-1-1 5H9l-1-4-4 1-4-5 3-3-3-3 2-6 4 1zM9 9l-1 3 1 3h6l1-3-1-3z',
  refresh: 'M12 1l6 2 3 3V1h4v12H13V9h6l-3-3-5-1-5 3-2 5 2 5 5 2 6-2 2-3 4 2-4 6-8 2-8-4-4-8 4-9z',
} as const

export type FacetedGlyphKind = keyof typeof SHAPES

export function FacetedGlyph({ kind, size = 20, onAccent = false, className }: {
  kind: FacetedGlyphKind
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
          <path d={SHAPES[kind]} clipRule={(kind === 'share' || kind === 'link') ? 'nonzero' : 'evenodd'} />
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
