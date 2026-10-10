'use client'

import { useState } from 'react'
import { matchToolsByGoal } from '@/lib/goal-finder'
import { ToolCard } from '@/components/cards/ToolCard'

const STEPS = [
  { n: '01', title: 'Start with the outcome', text: 'Describe the work in your own words.' },
  { n: '02', title: 'Review what matched', text: 'See the relevant listing details.' },
  { n: '03', title: 'Explore the tradeoffs', text: 'Compare available facts, then inspect details.' },
]

const SUGGESTIONS = [
  'Turn YouTube videos into short clips',
  'Write cold emails that convert',
  'Build a landing page fast',
  'Transcribe my meetings with notes',
  'Remove backgrounds from photos',
  'Create a logo for my startup',
]

export function GoalFinder() {
  const [goal, setGoal] = useState('')
  const [freeOnly, setFreeOnly] = useState(false)
  const [done, setDone] = useState(false)
  const matches = done ? matchToolsByGoal(goal, freeOnly) : []

  const submit = () => {
    if (!goal.trim()) return
    setDone(true)
    setTimeout(() => {
      document.getElementById('finder-results')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <div>
      {/* Story */}
      <section aria-label="How it works">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-orange">
          <span className="inline-block h-px w-5 bg-brand-orange" />
          Less scrolling. More signal.
        </div>
        <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          Because a tool list isn&apos;t the same as an answer.
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Tools can sound alike. Start with your goal, check which published
          listing details matched, and decide what fits.
        </p>
      <ol className="mt-6 grid gap-5 sm:grid-cols-3">
        {STEPS.map((s) => (
          <li key={s.n} className="flex gap-3">
            <span className="font-heading text-sm font-bold text-brand-orange">{s.n}</span>
            <div>
              <p className="font-heading text-base font-bold">{s.title}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
      </section>

      {/* Form */}
      <form
        className="mt-8 rounded-[13px] border border-border bg-card p-5 shadow-[0_14px_32px_rgb(0_0_0/8%)] sm:px-8"
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-orange">
          <span>01</span> Describe your goal
        </div>
        <label
          htmlFor="goal-input"
          className="mt-2 block font-heading text-[22px] font-semibold tracking-tight"
        >
          What are you hoping to get done?
        </label>
        <p className="mt-1 text-xs text-muted-foreground">
          A task, workflow, or outcome is a good place to start.
        </p>
        <div className="relative mt-3">
          <textarea
            id="goal-input"
            value={goal}
            onChange={(e) => setGoal(e.target.value.slice(0, 500))}
            placeholder="For example, organize customer feedback and find recurring themes"
            rows={3}
            minLength={2}
            required
            aria-describedby="goal-help"
            className="input min-h-[92px] pb-8"
          />
          <span className="pointer-events-none absolute bottom-2 right-3 text-[10px] text-muted-foreground">
            500 character limit
          </span>
        </div>
        <p id="goal-help" className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
          Matches come from published listing information. This finder does not
          generate or verify product claims.
        </p>

        {/* Suggestion chips */}
        <div className="mt-3 flex flex-wrap gap-2" aria-label="Suggested goals">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setGoal(s)
                setDone(false)
              }}
              className="rounded-full border-2 border-brand-orange bg-white px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-brand-orange/10 dark:bg-card"
            >
              {s}
            </button>
          ))}
        </div>

        <label className="mt-4 inline-flex cursor-pointer items-start gap-2.5 text-xs text-foreground">
          <input
            type="checkbox"
            checked={freeOnly}
            onChange={(e) => setFreeOnly(e.target.checked)}
            className="peer sr-only"
          />
          <span
            aria-hidden="true"
            className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded border border-input bg-card transition-colors peer-checked:border-brand-orange peer-checked:bg-brand-orange peer-focus-visible:outline-2 peer-focus-visible:outline-brand-orange [&>svg]:hidden peer-checked:[&>svg]:block"
          >
            <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 fill-none stroke-white stroke-2">
              <path d="M1.5 5.5l2.5 2.5 4.5-6" />
            </svg>
          </span>
          <span>
            Show only tools with a free plan
            <small className="mt-0.5 block text-[10px] leading-relaxed text-muted-foreground">
              Free-plan evidence is reviewed separately from whether the tool
              itself is verified.
            </small>
          </span>
        </label>

        <div className="mt-3 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-[10px] leading-relaxed text-muted-foreground">
            Your goal is used only to search directory listings. Nothing is
            saved or sent anywhere.
          </p>
          <button type="submit" className="btn-primary shrink-0">
            Find my options
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>

      {/* Results */}
      {done && (
        <div id="finder-results" className="mt-5 scroll-mt-24 rounded-[13px] border border-border bg-card p-5 shadow-[0_14px_32px_rgb(0_0_0/8%)] sm:px-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-heading text-2xl font-semibold tracking-tight">
                {matches.length ? `${matches.length} matches` : 'No matches yet'}
              </h2>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                Goal: <strong className="font-medium text-foreground">{goal.trim().slice(0, 140)}</strong>
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-border px-2.5 py-1 text-[10px] text-muted-foreground">
              {matches.length} found
            </span>
          </div>
          <p className="mt-3 rounded-md border border-brand-orange/20 bg-brand-orange/[0.04] p-2.5 text-[10px] leading-relaxed text-muted-foreground">
            Method: keyword overlap against published names, tags, categories
            and descriptions. No generated claims.
          </p>
          {matches.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Nothing in the catalogue matches those words yet. Try broader
              terms or one of the suggestions above.
            </p>
          ) : (
            <>
              <ul className="mt-4 grid gap-5 sm:grid-cols-2">
                {matches.map(({ tool }) => (
                  <li key={tool.id}>
                    <ToolCard tool={tool} />
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[10px] text-muted-foreground">
                Showing top {matches.length} of catalogue matches.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
