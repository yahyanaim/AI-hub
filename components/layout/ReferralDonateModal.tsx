'use client'

import { FacetedGlyph } from '@/components/ui/FacetedGlyph'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { SupportArt } from '@/components/ui/SupportArt'
import {
  REFERRAL_MODAL_SESSION_KEY,
  shouldShowReferralModal,
} from '@/lib/referral'

const AUTO_DISMISS_MS = 5000
const SHOW_DELAY_MS = 600

const FLOATING_ART = [
  { kind: 'coffee', x: '5%', y: '14%', size: 48, delay: 0, duration: 6, opacity: 0.14 },
  { kind: 'share', x: '82%', y: '16%', size: 44, delay: 0.5, duration: 7, opacity: 0.14 },
  { kind: 'heart', x: '8%', y: '75%', size: 40, delay: 0.8, duration: 6.5, opacity: 0.10 },
] as const

export function ReferralDonateModal() {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  const dismiss = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    try {
      sessionStorage.setItem(REFERRAL_MODAL_SESSION_KEY, 'true')
    } catch {
      // storage unavailable - modal simply won't re-trigger this mount
    }
    // Fade out before unmounting for a smooth exit.
    setLeaving(true)
    setTimeout(() => {
      setVisible(false)
      setLeaving(false)
    }, 250)
  }, [])

  const handleShare = useCallback(async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: 'AI Hub Tools',
          text: 'AI Hub Tools - free curated AI tools, courses & offers. No ads, no tracking.',
          url,
        })
        return
      }
      throw new Error('share unsupported')
    } catch (err) {
      if ((err as DOMException)?.name === 'AbortError') return
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      } catch {
        // clipboard unavailable
      }
    }
  }, [])

  useEffect(() => {
    // Never on the donation page itself, and never twice per session.
    if (pathname === '/support') return
    let seen = false
    try {
      seen = sessionStorage.getItem(REFERRAL_MODAL_SESSION_KEY) === 'true'
    } catch {
      seen = false
    }
    if (seen) return

    let eligible = false
    try {
      eligible = shouldShowReferralModal({
        referrer: document.referrer,
        currentHost: window.location.hostname,
        search: window.location.search,
      })
    } catch {
      eligible = false
    }
    if (!eligible) return

    const showTimer = setTimeout(() => setVisible(true), SHOW_DELAY_MS)
    return () => clearTimeout(showTimer)
  }, [pathname])

  // Auto-dismiss ~3s after appearing; lock scroll while open.
  useEffect(() => {
    if (!visible) return
    timer.current = setTimeout(dismiss, AUTO_DISMISS_MS)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      if (timer.current) clearTimeout(timer.current)
      document.body.style.overflow = prev
    }
  }, [visible, dismiss])

  useEffect(() => {
    if (!visible) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible, dismiss])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Support AI Hunt"
          initial={{ opacity: 0 }}
          animate={{ opacity: leaving ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={dismiss}
            aria-hidden="true"
          />
          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-brand-orange/60 bg-background shadow-2xl sm:max-w-lg"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: leaving ? 0 : 1, y: leaving ? 8 : 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
          >
            {/* Decorative artwork mirrors the on-page support banner. */}
            <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
              {FLOATING_ART.map(({ kind, x, y, size, delay, duration, opacity }, i) => (
                <div
                  key={i}
                  className="absolute animate-float-soft motion-reduce:animate-none"
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
            <button
              onClick={dismiss}
              className="absolute right-3 top-3 z-10 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Dismiss"
              autoFocus
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative p-8 text-center">
              <SupportArt kind="heart" size={96} className="mx-auto mb-4 h-24 w-24" />
              <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                AI Hub Tools is 100% free
              </h2>
              <p className="mt-2 text-center text-base text-muted-foreground">
                No ads · No tracking · No data collection, ever.
              </p>

              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/support"
                  onClick={dismiss}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_24px_var(--accent-glow)] active:scale-[0.98] sm:w-auto"
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
