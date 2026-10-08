'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Map, Send, Sparkles, ExternalLink, GraduationCap } from 'lucide-react'
import {
  ROADMAP_TRACKS,
  roadmapMermaid,
  nodeHref,
  nodeSourceLabel,
  type RoadmapTrack,
} from '@/lib/roadmaps'

/** Ask the site chatbot about the current roadmap (respects its own gating). */
function askChatbot(question: string) {
  window.dispatchEvent(new CustomEvent('ai-hunt:ask', { detail: { question } }))
}

function MermaidDiagram({ track }: { track: RoadmapTrack }) {
  const ref = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    setFailed(false)
    // Mermaid is dynamically imported so its weight never touches other pages.
    import('mermaid')
      .then((m) => {
        if (cancelled) return
        const mermaid = m.default
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: '#FF6B00',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#c2410c',
            lineColor: '#FF6B00',
            edgeLabelBackground: '#FFF7ED',
          },
        })
        const id = `roadmap-${track.id}`
        mermaid
          .render(id, roadmapMermaid(track))
          .then(({ svg }) => {
            if (!cancelled && ref.current) ref.current.innerHTML = svg
          })
          .catch(() => {
            if (!cancelled) setFailed(true)
          })
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [track])

  if (failed) return null
  return (
    <div
      ref={ref}
      role="img"
      aria-label={`${track.title} roadmap diagram`}
      className="overflow-x-auto rounded-2xl border border-brand-orange/30 bg-brand-orange/[0.07] p-4 dark:bg-brand-orange/[0.04] [&_svg]:mx-auto [&_svg]:max-w-none"
    />
  )
}

export function RoadmapView({ initialTrackId }: { initialTrackId?: string }) {
  const [trackId, setTrackId] = useState(
    ROADMAP_TRACKS.some((t) => t.id === initialTrackId) ? initialTrackId! : ROADMAP_TRACKS[0]!.id
  )
  const [question, setQuestion] = useState('')
  const track = ROADMAP_TRACKS.find((t) => t.id === trackId) ?? ROADMAP_TRACKS[0]!

  const submitQuestion = () => {
    const q = question.trim()
    if (!q) return
    askChatbot(`About the ${track.title} roadmap: ${q}`)
    setQuestion('')
  }

  return (
    <div>
      {/* Track picker */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Roadmap tracks">
        {ROADMAP_TRACKS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === track.id}
            onClick={() => setTrackId(t.id)}
            className={
              t.id === track.id
                ? 'rounded-full bg-brand-orange px-4 py-2 text-sm font-semibold text-white shadow-md'
                : 'rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-brand-orange/40 hover:text-foreground'
            }
          >
            {t.title}
          </button>
        ))}
      </div>

      {/* Diagram (orange background per design) */}
      <div className="mt-6">
        <MermaidDiagram track={track} />
      </div>

      {/* Step cards with course links — server-rendered for crawlers */}
      <ol className="mt-6 grid gap-4 sm:grid-cols-2">
        {track.nodes.map((node, i) => {
          const external = !node.courseSlug
          return (
            <li
              key={node.id}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-sm font-bold text-brand-orange">
                  {i + 1}
                </span>
                <h3 className="font-heading text-base font-bold">{node.label}</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{node.hint}</p>
              <Link
                href={nodeHref(node)}
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:underline"
              >
                <GraduationCap className="h-4 w-4" />
                {node.courseSlug ? 'Study this step' : 'Find courses on Coursera'}
                {external && <ExternalLink className="h-3.5 w-3.5" />}
              </Link>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                {nodeSourceLabel(node)}
              </p>
            </li>
          )
        })}
      </ol>

      {/* Ask AI about this roadmap */}
      <div className="mt-8 rounded-2xl border border-brand-orange/30 bg-brand-orange/[0.07] p-6 dark:bg-brand-orange/[0.04]">
        <h2 className="flex items-center gap-2 font-heading text-lg font-bold">
          <Sparkles className="h-5 w-5 text-brand-orange" />
          Ask AI about the {track.title} path
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Not sure where to start? Ask for a personalized plan — answered by the
          site chatbot.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <label htmlFor="roadmap-ask" className="sr-only">
            Ask AI about this roadmap
          </label>
          <input
            id="roadmap-ask"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submitQuestion()
            }}
            placeholder={`e.g. I know Python, how fast can I finish ${track.title}?`}
            className="input flex-1"
          />
          <button type="button" onClick={submitQuestion} className="btn-primary">
            <Send className="h-4 w-4" />
            Ask AI
          </button>
        </div>
      </div>

      {/* All tracks overview (crawlable index) */}
      <div className="mt-10">
        <h2 className="flex items-center gap-2 font-heading text-lg font-bold">
          <Map className="h-5 w-5 text-brand-orange" />
          All specialisations
        </h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {ROADMAP_TRACKS.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => {
                  setTrackId(t.id)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-left transition-colors hover:border-brand-orange/40"
              >
                <span className="text-sm font-semibold">{t.title}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {t.nodes.length} steps · {t.tagline}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
