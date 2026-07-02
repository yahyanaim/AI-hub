'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { useApp } from '@/lib/store'
import { cn } from '@/lib/utils'
import type { Tool } from '@/types'

function CarouselCard({ tool }: { tool: Tool }) {
  const { openDetailModal } = useApp()
  return (
    <button
      onClick={() => openDetailModal(tool.id)}
      className="group flex w-[130px] shrink-0 flex-col items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-orange/30 hover:shadow-md hover:shadow-brand-orange/10"
    >
      <Logo src={tool.logoUrl} name={tool.name} size={36} />
      <span className="line-clamp-2 text-center text-xs font-medium text-foreground transition-colors group-hover:text-brand-orange">
        {tool.name}
      </span>
    </button>
  )
}

export function AIToolsCarousel() {
  const { tools } = useApp()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const sortedTools = [...tools].sort((a, b) => b.upvotes - a.upvotes)
  if (sortedTools.length === 0) return null

  const duplicatedTools = [...sortedTools, ...sortedTools]

  const toolCount = sortedTools.length
  const displayCount = toolCount >= 10000 ? toolCount : `10K+`

  const duration = Math.max(60, sortedTools.length * 1.5)

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-center gap-2"
      >
        <Sparkles className="h-5 w-5 text-brand-orange" />
        <h2 className="font-heading text-xl font-bold text-foreground">
          More than <span className="text-brand-orange">{displayCount}</span> AI tools for you
        </h2>
      </motion.div>

      <div className="relative">
        <div
          className={cn(
            'pointer-events-none absolute inset-y-0 left-0 z-10 w-32',
            'bg-gradient-to-r from-background via-background/80 to-transparent',
          )}
        />
        <div
          className={cn(
            'pointer-events-none absolute inset-y-0 right-0 z-10 w-32',
            'bg-gradient-to-l from-background via-background/80 to-transparent',
          )}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-hidden"
        >
          <motion.div
            className="flex gap-4"
            animate={isInView ? { x: [0, `-${sortedTools.length * 134}px`] } : {}}
            transition={{
              x: {
                duration,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            {duplicatedTools.map((tool, i) => (
              <CarouselCard key={`${tool.id}-${i}`} tool={tool} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
