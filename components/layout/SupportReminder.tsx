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
    <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-5 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
          <Heart className="h-5 w-5 text-brand-orange" />
        </span>
        <p className="max-w-md text-sm leading-snug text-muted-foreground">
          <span className="font-semibold text-foreground">AI Hunt is 100% free</span> — no ads,
          no tracking, no data collection. Help keep it that way.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href="/support"
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          <Heart className="h-4 w-4" />
          Donate
        </Link>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-600" />
              Link copied!
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              Share
            </>
          )}
        </button>
      </div>
    </div>
  )
}
