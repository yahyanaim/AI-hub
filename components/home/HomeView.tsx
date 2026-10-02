'use client'

import { useMemo } from 'react'
import { useApp } from '@/lib/store'
import type { Tool, DevTool, Repo } from '@/types'
import { ToolCard } from '@/components/cards/ToolCard'
import { DevToolCard } from '@/components/cards/DevToolCard'
import { RepoCard } from '@/components/cards/RepoCard'
import { HeroSection } from './HeroSection'
import { Sidebar } from './Sidebar'
import { FaqSection } from './FaqSection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { motion } from 'framer-motion'

interface HomeCounts {
  tools: number
  devTools: number
  repos: number
  courses: number
  offers: number
}

/**
 * Server-prerendered first paint: app/page.tsx passes the top-ranked items so
 * crawlers (and first paint) see real cards without JavaScript. Once the
 * client store hydrates, live data takes over — same sort, so no reshuffle.
 */
export function HomeView({
  initialTools = [],
  initialDevTools = [],
  initialRepos = [],
  initialCounts = { tools: 0, devTools: 0, repos: 0, courses: 0, offers: 0 },
}: {
  initialTools?: Tool[]
  initialDevTools?: DevTool[]
  initialRepos?: Repo[]
  initialCounts?: HomeCounts
}) {
  const { tools, devTools, repos, courses, offers, setPaletteOpen } = useApp()
  const t = tools.length ? tools : initialTools
  const d = devTools.length ? devTools : initialDevTools
  const r = repos.length ? repos : initialRepos

  const todaysTools = useMemo(
    () => [...t].sort((a, b) => b.upvotes - a.upvotes).slice(0, 6),
    [t]
  )

  const trendingDevTools = useMemo(
    () => [...d].sort((a, b) => b.upvotes - a.upvotes).slice(0, 4),
    [d]
  )

  const trendingRepos = useMemo(
    () => [...r].sort((a, b) => b.upvotes - a.upvotes).slice(0, 4),
    [r]
  )

  return (
    <div className="container-page space-y-10 pb-8 pt-10 md:pt-14">
      {/* Hero Section */}
      <HeroSection
        onSearch={() => setPaletteOpen(true)}
        toolCount={tools.length ? tools.length : initialCounts.tools}
        promptCount={devTools.length ? devTools.length : initialCounts.devTools}
        repoCount={repos.length ? repos.length : initialCounts.repos}
        courseCount={courses.length ? courses.length : initialCounts.courses}
        offerCount={offers.length ? offers.length : initialCounts.offers}
      />

      {/* Main content with sidebar */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main area */}
        <div className="flex-1 min-w-0 space-y-12">
          {/* Today's Picks */}
          <section>
            <SectionHeading
              eyebrow="Featured"
              title="Today's top tools"
              href="/tools"
            />
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
              className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              {todaysTools.map((tool, i) => (
                <motion.div
                  key={tool.id}
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                >
                  <ToolCard tool={tool} rank={i + 1} />
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Trending Dev Tools */}
          <section>
            <SectionHeading
              eyebrow="Dev Tools"
              title="Trending dev tools"
              href="/dev-tools"
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {trendingDevTools.map((tool) => (
                <DevToolCard key={tool.id} devtool={tool} />
              ))}
            </div>
          </section>

          {/* Trending Editing Tools */}
          <section>
            <SectionHeading
              eyebrow="Editing Tools"
              title="Trending Editing tools"
              href="/edittools"
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {trendingRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="w-full shrink-0 lg:w-80 xl:w-96">
          <div className="lg:sticky lg:top-24">
            <Sidebar />
          </div>
        </div>
      </div>

      {/* FAQ — sits above the donate banner rendered in layout */}
      <FaqSection />
    </div>
  )
}
