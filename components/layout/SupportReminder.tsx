'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, Share2, Check } from 'lucide-react'

export function SupportReminder() {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const shareData = {
      title: 'AI Hunt',
      text: 'AI Hunt - free curated AI tools, courses & offers. No ads, no tracking.',
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
    <div className="relative mt-14 overflow-hidden rounded-3xl border border-brand-orange/20 bg-gradient-to-br from-brand-orange/[0.07] via-transparent to-brand-orange/[0.05] px-6 py-10 text-center shadow-sm backdrop-blur-sm sm:px-10">
      {/* Soft decorative hearts */}
      <Heart className="pointer-events-none absolute -left-3 -top-3 h-20 w-20 rotate-[-18deg] text-brand-orange/5" fill="currentColor" />
      <Heart className="pointer-events-none absolute -bottom-5 -right-2 h-24 w-24 rotate-[15deg] text-brand-orange/5" fill="currentColor" />

      <div className="relative">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10">
          <Heart className="h-6 w-6 text-brand-orange" fill="currentColor" />
        </span>

        <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          AI Hunt is 100% free
        </h3>
        <p className="mt-2 text-base text-muted-foreground">
          No ads · No tracking · No data collection - ever.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/support"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-7 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
          >
            <Heart className="h-4 w-4" fill="currentColor" />
            Donate &amp; Support
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:w-auto"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-600" />
                Link copied!
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                Share the platform
              </>
            )}
          </button>
        </div>

        <p className="mt-3.5 text-xs text-muted-foreground/80">
          Even one share makes a difference 🧡
        </p>
      </div>
    </div>
  )
}
