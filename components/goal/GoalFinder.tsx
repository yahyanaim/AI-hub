'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, BadgeCheck } from 'lucide-react'
import { matchToolsByGoal } from '@/lib/goal-finder'
import { Logo } from '@/components/ui/Logo'

const STEPS = [
  {
    n: '01',
    title: 'Start with the outcome',
    text: 'Describe the work in your own words.',
  },
  {
    n: '02',
    title: 'Review what matched',
    text: 'See the relevant listing details.',
  },
  {
    n: '03',
    title: 'Explore the tradeoffs',
    text: 'Compare available facts, then inspect details.',
  },
]

export function GoalFinder() {
  const [goal, setGoal] = useState('')
  const [freeOnly, setFreeOnly] = useState(false)
  const [done, setDone] = useState(false)
  const matches = done ? matchToolsByGoal(goal, freeOnly) : []

  const askAi = () => {
    const q = goal.trim()
    if (!q) return
    window.dispatchEvent(
      new CustomEvent('ai-hunt:ask', {
        detail: { question: `Help me find an AI tool for this goal: ${q}` },
      })
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Signal statement */}
      <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-foreground">
        Less scrolling. More signal.
      </p>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
        Because a tool list isn&apos;t the same as an answer. Tools can sound
        alike — start with your goal, check which published listing details
        matched, and decide what fits.
      </p>

      {/* Numbered steps */}
      <ol className="mt-8 space-y-5">
        {STEPS.map((s) => (
          <li key={s.n} className="flex gap-4">
            <span className="font-heading text-sm font-bold text-brand-orange">
              {s.n}
            </span>
            <div>
              <h2 className="font-heading text-base font-bold">{s.title}</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* Goal form */}
      <div className="mt-10">
        <p className="font-heading text-sm font-bold uppercase tracking-widest text-brand-orange">
          01 Describe your goal
        </p>
        <h2 className="mt-2 font-heading text-xl font-bold">
          What are you hoping to get done?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A task, workflow, or outcome is a good place to start. 500 character
          limit. Matches come from published listing information — this finder
          does not generate or verify product claims.
        </p>
        <label htmlFor="goal-input" className="sr-only">
          Describe what you want to accomplish
        </label>
        <textarea
          id="goal-input"
          value={goal}
          onChange={(e) => setGoal(e.target.value.slice(0, 500))}
          rows={4}
          className="input mt-4 resize-y"
        />
        <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={freeOnly}
            onChange={(e) => setFreeOnly(e.target.checked)}
            className="h-4 w-4 accent-[#FF6B00]"
          />
          Show only tools with a free plan
        </label>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Your goal is used only to search directory listings. Prefer the AI?
          Send it to the chatbot instead — same matching, conversational help.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => setDone(true)}
            disabled={!goal.trim()}
            className="btn-primary px-8"
          >
            Find my options
            <ArrowRight className="h-4 w-4" />
          </button>
          <button type="button" onClick={askAi} className="btn-secondary">
            <Sparkles className="h-4 w-4" />
            Ask AI instead
          </button>
        </div>
      </div>

      {/* Results */}
      {done && (
        <div className="mt-10">
          <h2 className="text-center font-heading text-lg font-bold">
            {matches.length ? `${matches.length} matches` : 'No matches yet'}
          </h2>
          {matches.length === 0 ? (
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Nothing in the catalogue matches those words yet. Try broader
              terms — or ask the AI for guidance.
            </p>
          ) : (
            <ul className="mt-4 space-y-4">
              {matches.map(({ tool, matched }) => (
                <li
                  key={tool.id}
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <Logo src={tool.logoUrl} name={tool.name} size={44} />
                    <div className="min-w-0">
                      <h3 className="truncate font-heading text-base font-bold">
                        {tool.name}
                      </h3>
                      <p className="truncate text-xs text-muted-foreground">
                        {tool.tagline}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                    <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-orange" />
                    <span>
                      Matched on: {matched.join(', ')} · {tool.pricing}
                    </span>
                  </p>
                  <Link
                    href={`/tools/${tool.category}/${tool.slug}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:underline"
                  >
                    View details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
