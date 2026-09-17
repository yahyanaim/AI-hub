'use client'

import { useMemo, useRef, useState } from 'react'
import { ChevronDown, Heart, Quote } from 'lucide-react'
import { useApp } from '@/lib/store'
import { ToolCard } from '@/components/cards/ToolCard'
import { DevToolCard } from '@/components/cards/DevToolCard'
import { RepoCard } from '@/components/cards/RepoCard'
import { HeroSection } from './HeroSection'
import { Sidebar } from './Sidebar'
import { FaqSection } from './FaqSection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { motion } from 'framer-motion'
import { Avatar } from '@/components/ui/Avatar'
import { cn } from '@/lib/utils'

const DEMO_STORIES = [
  {
    name: 'Salma B.',
    role: 'Frontend learner',
    topic: 'A clearer starting point',
    quote: 'Finding free coding courses in one place helped me choose what to learn next instead of opening another dozen tabs.',
  },
  {
    name: 'Youssef A.',
    role: 'Freelance developer',
    topic: 'Tools worth exploring',
    quote: 'I like comparing AI tools by category and pricing. It makes building a shortlist for my next project much simpler.',
  },
  {
    name: 'Imane R.',
    role: 'Computer science student',
    topic: 'Learning on a budget',
    quote: 'The free resources and student offers are what I would come back for. There is always something new to explore.',
  },
  {
    name: 'Adam K.',
    role: 'Self-taught developer',
    topic: 'Less searching, more building',
    quote: 'Having courses, developer tools, and editing resources together makes it easier to move from an idea to a project.',
  },
  {
    name: 'Lina M.',
    role: 'Python learner',
    topic: 'A roadmap I can follow',
    quote: 'The course roadmaps give me a starting point. I can pick a topic, see the steps, and focus on learning.',
  },
  {
    name: 'Mehdi T.',
    role: 'Fullstack developer',
    topic: 'My next project starts here',
    quote: 'I came looking for a code editor and ended up exploring a whole new set of developer tools.',
  },
  {
    name: 'Aya N.',
    role: 'Design student',
    topic: 'Creative tools, less digging',
    quote: 'It is useful to have image tools and editing resources side by side, especially when I want to try something free.',
  },
  {
    name: 'Omar D.',
    role: 'Automation enthusiast',
    topic: 'From curiosity to a workflow',
    quote: 'The automation category makes discovering tools feel approachable. I can explore the options before committing to one.',
  },
  {
    name: 'Ines F.',
    role: 'Junior developer',
    topic: 'A little more direction',
    quote: 'I keep my favorite resources bookmarked in my browser. It is a simple way to return to what I want to learn next.',
  },
]

const VISIBLE_STORIES = 6

function WallOfLove() {
  const [expanded, setExpanded] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const stories = expanded ? DEMO_STORIES : DEMO_STORIES.slice(0, VISIBLE_STORIES)

  const collapse = () => {
    setExpanded(false)
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section aria-labelledby="wall-of-love-heading" className="mt-4">
      <div className="rounded-3xl bg-[#F4F4F6] p-6 sm:p-10 dark:bg-muted/20">
        <div className="flex flex-col gap-2 text-center">
          <h2
            id="wall-of-love-heading"
            className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            <Heart className="size-6 text-brand-orange" aria-hidden />
            Wall of Love
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            What learners and makers say about AI Hunt. Example stories for now,
            yours could be next.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-8 grid gap-5 text-left sm:grid-cols-2 lg:grid-cols-3"
        >
          {stories.map((story) => (
            <figure
              key={story.name}
              className="flex flex-col rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-border dark:bg-card"
            >
              <Quote className="size-5 text-brand-orange/60" aria-hidden />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground">
                {story.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <Avatar name={story.name} size={36} />
                <div>
                  <p className="text-sm font-semibold text-foreground">{story.name}</p>
                  <p className="text-xs text-muted-foreground">{story.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {DEMO_STORIES.length > VISIBLE_STORIES && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => (expanded ? collapse() : setExpanded(true))}
              className="btn-secondary"
              aria-expanded={expanded}
            >
              {expanded ? 'Show less' : 'Show more'}
              <ChevronDown
                className={cn('size-4 transition-transform', expanded && 'rotate-180')}
                aria-hidden
              />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export function HomeView() {
  const { tools, devTools, repos, courses, offers, setPaletteOpen } = useApp()

  const todaysTools = useMemo(
    () => [...tools].sort((a, b) => b.upvotes - a.upvotes).slice(0, 6),
    [tools]
  )

  const trendingDevTools = useMemo(
    () => [...devTools].sort((a, b) => b.upvotes - a.upvotes).slice(0, 4),
    [devTools]
  )

  const trendingRepos = useMemo(
    () => [...repos].sort((a, b) => b.upvotes - a.upvotes).slice(0, 4),
    [repos]
  )

  return (
    <div className="container-page space-y-10 pb-8 pt-10 md:pt-14">
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

      <WallOfLove />

      {/* FAQ — sits above the donate banner rendered in layout */}
      <FaqSection />
    </div>
  )
}
