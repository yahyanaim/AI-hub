'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, SearchX } from 'lucide-react'
import { useApp } from '@/lib/store'
import { ToolCard } from '@/components/cards/ToolCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Tool } from '@/types'

interface SubSection {
  key: string
  title: string
  description: string
  categories: string[]
}

const SECTIONS: SubSection[] = [
  {
    key: 'text-generation',
    title: 'Text Generation',
    description: 'Free AI writing assistants and content generators',
    categories: ['writing', 'marketing'],
  },
  {
    key: 'deep-search',
    title: 'Deep Search',
    description: 'Free AI research agents and data analysis tools',
    categories: ['research', 'data'],
  },
  {
    key: 'video',
    title: 'Video',
    description: 'Free AI tools for creating and editing videos',
    categories: ['video'],
  },
  {
    key: 'image',
    title: 'Image',
    description: 'Free AI image generators and editors',
    categories: ['image'],
  },
]

const FREE_PRICING = new Set(['free', 'open-source'])

export function FreeAlternativesView() {
  const { tools } = useApp()

  const sectionTools = useMemo(() => {
    const freeTools = tools.filter((t) => FREE_PRICING.has(t.pricing))
    const result: Record<string, Tool[]> = {}
    for (const section of SECTIONS) {
      const matches = freeTools
        .filter((t) => section.categories.includes(t.category))
        .sort((a, b) => b.upvotes - a.upvotes)
        .slice(0, 6)
      result[section.key] = matches
    }
    return result
  }, [tools])

  const allEmpty = SECTIONS.every((s) => sectionTools[s.key].length === 0)

  return (
    <div className="container-page py-8 space-y-10">
      <div>
        <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
          <Sparkles className="h-3.5 w-3.5" />
          Free Alternatives
        </div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Free Alternative AI Tools
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Curated free and open-source AI tools — no paid plans required.
        </p>
      </div>

      {allEmpty ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-20 text-center">
          <SearchX className="mb-3 h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No free tools found.</p>
        </div>
      ) : (
        SECTIONS.map((section) => {
          const items = sectionTools[section.key]
          if (items.length === 0) return null
          return (
            <section key={section.key}>
              <SectionHeading
                title={section.title}
                description={section.description}
                href={`/tools?pricing=free&category=${section.categories[0]}`}
                hrefLabel="Browse all free"
              />
              <motion.div
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
                className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
              >
                {items.map((tool) => (
                  <motion.div
                    key={tool.id}
                    variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                  >
                    <ToolCard tool={tool} />
                  </motion.div>
                ))}
              </motion.div>
            </section>
          )
        })
      )}
    </div>
  )
}
