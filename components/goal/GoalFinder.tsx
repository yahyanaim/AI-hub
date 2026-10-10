'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Target, Sparkles, ArrowRight, BadgeCheck } from 'lucide-react'
import { matchToolsByGoal } from '@/lib/goal-finder'
import { Logo } from '@/components/ui/Logo'

const STEPS = [
  {
    n: '01',
    title: 'Start with the outcome',
    text: 'Describe the work in your own words — a task, workflow, or outcome.',
  },
  {
    n: '02',
    title: 'Review what matched',
    text: 'See real catalogue listings and exactly which words matched them.',
  },
  {
    n: '03',
    title: 'Explore the tradeoffs',
    text: 'Compare pricing and tags, then open the detail page that fits.',
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
    <div>
      {/* How it works */}
      <ol className="grid gap-4 sm:grid-cols-3">
        {STEPS.map((s) => (
          <li key={s.n} className="rounded-2xl border border-border bg-card p-5">
            <p className="font-heading text-sm font-bold text-brand-orange">{s.n}</p>
            <h2 className="mt-1 font-heading text-base font-bold">{s.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
          </li>
        ))}
      </ol>

      {/* Goal form */}
      <div className="mt-6 rounded-2xl border border-brand-orange/30 bg-brand-orange/[0.05] p-6 dark:bg-brand-orange/[0.03]">
        <h2 className="font-heading text-lg font-bold">Describe your goal</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A task, workflow, or outcome is a good place to start. 500 characters
          max. Matches come only from published listing information.
        </p>
        <label htmlFor="goal-input" className="sr-only">
          Describe what you want to accomplish
        </label>
        <textarea
          id="goal-input"
          value={goal}
          onChange={(e) => setGoal(e.target.value.slice(0, 500))}
          placeholder="e.g. I want to turn long YouTube videos into short clips with captions…"
          rows={3}
          className="input mt-4 resize-y"
        />
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={freeOnly}
              onChange={(e) => setFreeOnly(e.target.checked)}
              className="h-4 w-4 accent-[#FF6B00]"
            />
            Show only tools with a free plan
          </label>
          <div className="flex gap-2">
            <button type="button" onClick={askAi} className="btn-secondary">
              <Sparkles className="h-4 w-4" />
              Ask AI instead
            </button>
            <button
              type="button"
              onClick={() => setDone(true)}
              disabled={!goal.trim()}
              className="btn-primary"
            >
              <Target className="h-4 w-4" />
              Find my options
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {done && (
        <div className="mt-6">
          <h2 className="font-heading text-lg font-bold">
            {matches.length ? `${matches.length} matches` : 'No matches yet'}
          </h2>
          {matches.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Nothing in the catalogue matches those words yet. Try broader
              terms — or ask the AI for guidance.
            </p>
          ) : (
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
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
