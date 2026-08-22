'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, Share2, Check, Sparkles } from 'lucide-react'

export function SupportReminder() {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const shareData = {
      title: 'AI Hunt',
      text: 'AI Hunt — free curated AI tools, courses & offers. No ads, no tracking.',
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
    <div className="relative mt-14 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-orange via-orange-500 to-amber-400 px-6 py-12 text-center shadow-2xl shadow-brand-orange/30 sm:px-10 sm:py-14">
      {/* Decorative floating hearts */}
      <Heart className="pointer-events-none absolute -left-4 -top-4 h-24 w-24 rotate-[-20deg] text-white/10" fill="currentColor" />
      <Heart className="pointer-events-none absolute -bottom-6 -right-2 h-32 w-32 rotate-[15deg] text-white/10" fill="currentColor" />
      <Sparkles className="pointer-events-none absolute right-[18%] top-6 h-6 w-6 animate-pulse text-white/40" />
      <Sparkles className="pointer-events-none absolute bottom-8 left-[15%] h-5 w-5 animate-pulse text-white/40" style={{ animationDelay: '0.7s' }} />

      <div className="relative">
        <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          <Heart className="h-8 w-8 animate-bounce text-white" fill="currentColor" />
        </span>

        <h3 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          AI Hunt is 100% free
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-lg font-medium leading-snug text-white/95">
          No ads · No tracking · No data collection — ever.
        </p>
        <p className="mx-auto mt-1.5 max-w-md text-base text-white/80">
          If it helped you, keep it alive for everyone:
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/support"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-bold text-brand-orange shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98] sm:w-auto"
          >
            <Heart className="h-5 w-5" fill="currentColor" />
            Donate &amp; Support
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/70 bg-transparent px-8 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            {copied ? (
              <>
                <Check className="h-5 w-5" />
                Link copied!
              </>
            ) : (
              <>
                <Share2 className="h-5 w-5" />
                Share the platform
              </>
            )}
          </button>
        </div>

        <p className="mt-4 text-xs font-medium uppercase tracking-widest text-white/70">
          Even one share makes a difference 🧡
        </p>
      </div>
    </div>
  )
}
