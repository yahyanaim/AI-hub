'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Sparkles, Search, TrendingUp, Brain, Code, Globe, Zap, Terminal, Rocket, Layers, Database } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface FloatingIcon {
  Icon: LucideIcon
  x: string
  y: string
  size: number
  delay: number
  duration: number
  opacity: number
}

const FLOATING_ICONS: FloatingIcon[] = [
  { Icon: Brain, x: '6%', y: '8%', size: 24, delay: 0, duration: 6, opacity: 0.18 },
  { Icon: Code, x: '85%', y: '15%', size: 22, delay: 0.5, duration: 7, opacity: 0.16 },
  { Icon: Globe, x: '45%', y: '5%', size: 19, delay: 0.8, duration: 8, opacity: 0.17 },
  { Icon: Zap, x: '90%', y: '45%', size: 16, delay: 1.2, duration: 5, opacity: 0.12 },
  { Icon: Terminal, x: '68%', y: '82%', size: 17, delay: 0.9, duration: 6, opacity: 0.13 },
  { Icon: Rocket, x: '3%', y: '52%', size: 17, delay: 0.7, duration: 5.5, opacity: 0.18 },
  { Icon: Layers, x: '80%', y: '32%', size: 16, delay: 0.2, duration: 6, opacity: 0.14 },
  { Icon: Database, x: '50%', y: '95%', size: 14, delay: 0.2, duration: 6.5, opacity: 0.15 },
]

interface HeroSectionProps {
  onSearch: () => void
  toolCount: number
  promptCount: number
  repoCount: number
  courseCount: number
  offerCount: number
}

export function HeroSection({ onSearch, toolCount, promptCount, repoCount, courseCount, offerCount }: HeroSectionProps) {
  const totalCount = toolCount + promptCount + repoCount + courseCount + offerCount
  const reduceMotion = useReducedMotion()

  // Typewriter for the headline keyword
  const PHRASES = ['AI tools', 'dev tools', 'courses']
  const phraseAt = (i: number) => PHRASES[i % PHRASES.length] ?? 'AI tools'
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charCount, setCharCount] = useState(phraseAt(0).length)
  const [deleting, setDeleting] = useState(true)

  useEffect(() => {
    if (reduceMotion) {
      setCharCount(phraseAt(0).length)
      return
    }
    const current = phraseAt(phraseIdx)
    let delay = deleting ? 35 : 75
    if (!deleting && charCount === current.length) delay = 1600
    else if (deleting && charCount === 0) delay = 350
    const t = setTimeout(() => {
      if (!deleting && charCount === current.length) {
        setDeleting(true)
      } else if (deleting && charCount === 0) {
        setDeleting(false)
        setPhraseIdx((i) => (i + 1) % PHRASES.length)
      } else {
        setCharCount((c) => c + (deleting ? -1 : 1))
      }
    }, delay)
    return () => clearTimeout(t)
  }, [charCount, deleting, phraseIdx, reduceMotion])

  const typed = reduceMotion
    ? phraseAt(0)
    : phraseAt(phraseIdx).slice(0, charCount)

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Floating background icons */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
        {FLOATING_ICONS.map(({ Icon, x, y, size, delay, duration, opacity }, i) => (
          <motion.div
            key={i}
            className="absolute text-brand-orange"
            style={{ left: x, top: y, opacity }}
            animate={reduceMotion ? undefined : {
              y: [0, -12, 0, 10, 0],
              opacity: [opacity, opacity * 1.6, opacity, opacity * 1.3, opacity],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Icon size={size} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-xs text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          {totalCount}+ curated entries
        </div>

        <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Discover the best{' '}
          <span className="bg-gradient-to-r from-brand-orange to-orange-400 bg-clip-text text-transparent">
            {typed}
          </span>
          <span aria-hidden="true" className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.12em] animate-pulse rounded-full bg-brand-orange" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-4 max-w-xl text-center text-base text-muted-foreground"
        >
          A community-driven directory. Browse, upvote, and share what works.
        </motion.p>

        <div className="mx-auto mt-8 max-w-md">
          <button
            onClick={onSearch}
            className="group flex w-full items-center gap-3 rounded-xl border border-border bg-muted/50 px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
          >
            <Search className="h-4 w-4 shrink-0" />
            <span className="flex-1">Search tools, dev tools, repos...</span>
            <kbd className="hidden rounded-md border border-border bg-background px-1.5 py-0.5 font-sans text-xs text-muted-foreground sm:inline-block">
              &#8984;K
            </kbd>
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/tools">
            <Button className="gap-2 bg-brand-orange px-6 py-5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-orange-600">
              <TrendingUp className="h-4 w-4" />
              Browse tools
            </Button>
          </Link>
          <Link href="/submit">
            <Button
              variant="outline"
              className="gap-2 px-6 py-5 text-sm font-semibold"
            >
              <Sparkles className="h-4 w-4" />
              Submit yours
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
