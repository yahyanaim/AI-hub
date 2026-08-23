'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Share2, Check, Brain, Code, Rocket, Zap, Sparkles, Terminal, Globe, Star } from 'lucide-react'

const FLOATING_ICONS = [
  { Icon: Brain, x: '6%', y: '18%', size: 22, delay: 0, duration: 6, opacity: 0.16 },
  { Icon: Rocket, x: '88%', y: '14%', size: 20, delay: 0.5, duration: 7, opacity: 0.15 },
  { Icon: Code, x: '12%', y: '70%', size: 19, delay: 0.8, duration: 6.5, opacity: 0.14 },
  { Icon: Zap, x: '90%', y: '62%', size: 17, delay: 0.3, duration: 5.5, opacity: 0.13 },
  { Icon: Terminal, x: '30%', y: '8%', size: 16, delay: 1.0, duration: 7, opacity: 0.13 },
  { Icon: Globe, x: '72%', y: '82%', size: 18, delay: 0.6, duration: 7.5, opacity: 0.14 },
  { Icon: Star, x: '45%', y: '4%', size: 14, delay: 0.2, duration: 6, opacity: 0.15 },
  { Icon: Sparkles, x: '60%', y: '90%', size: 15, delay: 0.9, duration: 6.8, opacity: 0.13 },
]

export function SupportReminder() {
  const [copied, setCopied] = useState(false)

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
    <div className="relative mt-14 overflow-hidden rounded-xl border border-brand-orange/60 bg-card bg-gradient-to-br from-brand-orange/[0.07] via-transparent to-brand-orange/[0.05] px-6 py-10 text-center shadow-sm transition-all duration-200 hover:border-accent hover:shadow-[0_0_24px_var(--accent-glow)]">
      {/* Floating icons */}
      <div className="pointer-events-none absolute inset-0 select-none">
        {FLOATING_ICONS.map(({ Icon, x, y, size, delay, duration, opacity }, i) => (
          <motion.div
            key={i}
            className="absolute text-brand-orange"
            style={{ left: x, top: y, opacity }}
            animate={{
              y: [0, -12, 0, 10, 0],
              opacity: [opacity, opacity * 1.6, opacity, opacity * 1.3, opacity],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay,
            }}
          >
            <Icon size={size} />
          </motion.div>
        ))}
      </div>

      <div className="relative">
        <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          AI Hub Tools is 100% free
        </h3>
        <p className="mt-2 text-base text-muted-foreground">
          No ads · No tracking · No data collection — ever.
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
