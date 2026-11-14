import Image from 'next/image'
import { cn } from '@/lib/utils'

const SOURCES = {
  heart: '/illustrations/support-heart.svg',
  coffee: '/illustrations/support-coffee.svg',
  bank: '/illustrations/support-bank.svg',
  share: '/illustrations/support-share.svg',
  brain: '/illustrations/hero-brain.svg',
  code: '/illustrations/hero-code.svg',
  globe: '/illustrations/hero-globe.svg',
  bolt: '/illustrations/hero-bolt.svg',
  terminal: '/illustrations/hero-terminal.svg',
  rocket: '/illustrations/hero-rocket.svg',
  layers: '/illustrations/hero-layers.svg',
  database: '/illustrations/hero-database.svg',
  package: '/illustrations/submit-package.svg',
  edit: '/illustrations/submit-edit.svg',
  gift: '/illustrations/submit-gift.svg',
  document: '/illustrations/submit-document.svg',
  search: '/illustrations/search-empty.svg',
} as const

export type FacetedArtKind = keyof typeof SOURCES

/** Decorative SVG artwork with a shared orange and cream, folded-paper palette. */
export function FacetedArt({ kind, size = 96, className }: {
  kind: FacetedArtKind
  size?: number
  className?: string
}) {
  return (
    <Image
      src={SOURCES[kind]}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      draggable={false}
      className={cn('shrink-0 select-none object-contain', className)}
    />
  )
}
