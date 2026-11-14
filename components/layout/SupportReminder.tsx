'use client'

import { FacetedGlyph } from '@/components/ui/FacetedGlyph'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { SupportArt } from '@/components/ui/SupportArt'

const FLOATING_ART = [
  { kind: 'coffee', x: '5%', y: '14%', size: 56, delay: 0, duration: 6, opacity: 0.16 },
  { kind: 'share', x: '84%', y: '12%', size: 52, delay: 0.5, duration: 7, opacity: 0.16 },
  { kind: 'heart', x: '12%', y: '68%', size: 44, delay: 0.8, duration: 6.5, opacity: 0.12 },
  { kind: 'coffee', x: '80%', y: '70%', size: 44, delay: 0.3, duration: 5.5, opacity: 0.12 },
] as const

export function SupportReminder() {
  const [copied, setCopied] = useState(false)
  const pathname = usePathname()

  // Hidden on /support, that page already carries the full donation section.
  if (pathname === '/support') return null

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const shareData = {
      title: 'AI Hub Tools',
      text: 'AI Hub Tools - free curated AI tools, courses & offers. No ads, no tracking.',
      url,
    }
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share(shareData)
        return
      }
      throw new Error('share unsupported')
    } catch (err) {
      if ((err as DOMException)?.name === 'AbortError') return
      // Fallback: copy link
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      } catch {
        // clipboard unavailable
      }
    }
  }

  return (
    <div className="relative mt-8 overflow-hidden rounded-xl border border-brand-orange/60 bg-background px-6 py-10 text-center transition-all duration-200 hover:border-accent hover:shadow-[0_0_24px_var(--accent-glow)]">
      {/* Decorative support artwork; reduced motion keeps the illustration still. */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
        {FLOATING_ART.map(({ kind, x, y, size, delay, duration, opacity }, i) => (
          <div
            key={i}
            className="absolute animate-float-soft text-brand-orange motion-reduce:animate-none"
            style={{
              left: x,
              top: y,
              opacity,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          >
            <SupportArt kind={kind} size={size} />
          </div>
        ))}
      </div>

      <div className="relative">
        <SupportArt kind="heart" size={96} className="mx-auto mb-4 h-24 w-24" />
        <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          AI Hub Tools is 100% free
        </h3>
        <p className="mt-2 text-center text-base text-muted-foreground">
          No ads · No tracking · No data collection, ever.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/support"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:border-accent/40 hover:shadow-[0_0_24px_var(--accent-glow)] active:scale-[0.98] sm:w-auto"
          >
            Donate &amp; Support
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:w-auto"
          >
            {copied ? (
              <>
                <FacetedGlyph kind="check" className="h-4 w-4 text-green-600" />
                Link copied!
              </>
            ) : (
              <>
                <FacetedGlyph kind="share" className="h-4 w-4" />
                Share the platform
              </>
            )}
          </button>
        </div>

        <p className="mt-3.5 text-center text-xs text-muted-foreground/80">
          Even one share makes a difference <FacetedGlyph kind="heart" size={14} className="inline-block align-text-bottom" />
        </p>
      </div>
    </div>
  )
}
