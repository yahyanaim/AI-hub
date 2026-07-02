'use client'

import { useApp } from '@/lib/store'
import { ToolCard } from '@/components/cards/ToolCard'
import { DevToolCard } from '@/components/cards/DevToolCard'
import { RepoCard } from '@/components/cards/RepoCard'
import { HeroSection } from './HeroSection'
import { Sidebar } from './Sidebar'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { motion } from 'framer-motion'
import { AIToolsCarousel } from './AIToolsCarousel'

export function HomeView() {
  const { tools, devTools, prompts, repos, setPaletteOpen } = useApp()

  const todaysTools = [...tools]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 6)

  const trendingDevTools = [...devTools]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 4)

  const trendingRepos = [...repos]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 4)

  return (
    <div className="container-page py-8 space-y-10">
      {/* Hero Section */}
      <HeroSection
        onSearch={() => setPaletteOpen(true)}
        toolCount={tools.length}
        promptCount={devTools.length}
        repoCount={repos.length}
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
              href="/devtool"
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {trendingDevTools.map((tool) => (
                <DevToolCard key={tool.id} devtool={tool} />
              ))}
            </div>
          </section>

          {/* Popular Repos */}
          <section>
            <SectionHeading
              eyebrow="Repositories"
              title="Star-worthy repos"
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

      {/* AI Tools Carousel */}
      <AIToolsCarousel />
    </div>
  )
}
