'use client'

import { useApp } from '@/lib/store'
import { ToolCard } from '@/components/cards/ToolCard'
import { DevToolCard } from '@/components/cards/DevToolCard'
import { OfferCard } from '@/components/cards/OfferCard'
import { HeroSection } from './HeroSection'
import { Sidebar } from './Sidebar'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { motion } from 'framer-motion'

// Hand-picked spotlight order — most important first
const RECOMMENDED_SLUGS = [
  'datacamp-free-access-week',
  'ai-engineering-langchain-intermediate',
  'ai-fundamentals-for-beginners-track',
  'chinese-government-scholarship-csc',
]

export function HomeView() {
  const { tools, devTools, prompts, repos, courses, offers, setPaletteOpen } = useApp()

  const todaysTools = [...tools]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 6)

  const trendingDevTools = [...devTools]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 4)

  const recommended = RECOMMENDED_SLUGS
    .map((slug) => offers.find((o) => o.slug === slug))
    .filter((o): o is (typeof offers)[number] => Boolean(o))

  return (
    <div className="container-page py-8 space-y-10">
      {/* Hero Section */}
      <HeroSection
        onSearch={() => setPaletteOpen(true)}
        toolCount={tools.length}
        promptCount={devTools.length}
        repoCount={repos.length}
        courseCount={courses.length}
        offerCount={offers.length}
      />

      {/* Main content with sidebar */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main area */}
        <div className="flex-1 min-w-0 space-y-12">
          {/* Highly Recommended */}
          <section>
            <SectionHeading
              eyebrow="Highly Recommended"
              title="Don't miss these"
              href="/offers"
            />
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
              className="grid gap-5 sm:grid-cols-2"
            >
              {recommended.map((offer) => (
                <motion.div
                  key={offer.id}
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                >
                  <OfferCard offer={offer} />
                </motion.div>
              ))}
            </motion.div>
          </section>

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
        </div>

        {/* Sidebar */}
        <div className="w-full shrink-0 lg:w-80 xl:w-96">
          <div className="lg:sticky lg:top-24">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
