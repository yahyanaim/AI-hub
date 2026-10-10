// ============================================================
// Goal-first finder: match a plain-language goal against published
// catalogue listings. Scores come ONLY from existing record fields
// (name, tags, category, tagline, description) — never generated claims.
// The matched terms are returned so the UI can show *why* each tool
// matched, exactly as the copy promises.
//
// Matching quality layers:
// - normalization + light stemming (editing/edit, photos/photo)
// - synonym expansion (pic/photo/image, cv/resume, mail/email …)
// - multi-word phrase matching (landing page, text to speech …)
// - typo tolerance (edit distance ≤ 1 for terms ≥ 5 chars)
// ============================================================

import { SEED_TOOLS } from '@/lib/seed'
import type { Tool } from '@/types'

const STOP = new Set([
  'the', 'and', 'for', 'with', 'that', 'this', 'from', 'have', 'has',
  'want', 'need', 'like', 'just', 'make', 'help', 'tool', 'tools',
  'best', 'free', 'find', 'looking', 'using', 'use', 'used',
  'your', 'you', 'our', 'are', 'was', 'will', 'can', 'able', 'get',
  'app', 'website', 'online', 'easy', 'easily', 'really', 'very',
  'into', 'onto', 'over', 'under', 'from', 'about', 'than', 'then',
  'something', 'anything', 'thing', 'things', 'way', 'much', 'many',
  'une', 'des', 'les', 'pour', 'avec', 'dans', 'sur',
])

const SYNONYMS: Record<string, string[]> = {
  photo: ['photo', 'photos', 'pic', 'pics', 'picture', 'pictures', 'image', 'images'],
  image: ['photo', 'photos', 'pic', 'pics', 'picture', 'pictures', 'image', 'images'],
  video: ['video', 'videos', 'film', 'films', 'movie', 'movies', 'clip', 'clips'],
  audio: ['audio', 'sound', 'sounds', 'music', 'voice', 'voices'],
  remove: ['remove', 'removal', 'delete', 'erase', 'erase', 'strip'],
  logo: ['logo', 'logos', 'brand', 'branding'],
  resume: ['resume', 'resumes', 'cv', 'cvs'],
  email: ['email', 'emails', 'mail', 'mails', 'gmail', 'inbox'],
  edit: ['edit', 'editing', 'editor', 'editors'],
  write: ['write', 'writing', 'writer', 'writers'],
  code: ['code', 'coding', 'coder', 'program', 'programming', 'developer'],
  design: ['design', 'designs', 'designer', 'ui', 'ux'],
  meeting: ['meeting', 'meetings', 'call', 'calls', 'conference'],
  notes: ['notes', 'note', 'notetaking'],
  summary: ['summary', 'summaries', 'summarize', 'summarizer', 'tldr'],
  translate: ['translate', 'translation', 'translator', 'dubbing', 'dub'],
  chat: ['chat', 'chatbot', 'assistant', 'conversation'],
  search: ['search', 'find', 'finder', 'lookup', 'discover'],
  build: ['build', 'builder', 'create', 'creator', 'generate', 'generator', 'maker'],
  test: ['test', 'testing', 'tests', 'qa'],
}

function stem(t: string): string {
  if (t.length > 5 && t.endsWith('ing')) return t.slice(0, -3)
  if (t.length > 4 && t.endsWith('ed')) return t.slice(0, -2)
  if (t.length > 4 && t.endsWith('es')) return t.slice(0, -2)
  if (t.length > 4 && t.endsWith('s')) return t.slice(0, -1)
  if (t.length > 5 && t.endsWith('ies')) return t.slice(0, -3) + 'y'
  return t
}

function tokens(text: string): { raw: string; stem: string }[] {
  const seen = new Set<string>()
  const out: { raw: string; stem: string }[] = []
  for (const raw of text.toLowerCase().split(/[^a-z0-9]+/)) {
    if (raw.length < 3 || STOP.has(raw)) continue
    const s = stem(raw)
    if (seen.has(s)) continue
    seen.add(s)
    out.push({ raw, stem: s })
  }
  return out
}

function expand(term: string): string[] {
  const out = new Set([term])
  for (const group of Object.values(SYNONYMS)) {
    if (group.includes(term)) group.forEach((g) => out.add(g))
  }
  return [...out]
}

/** Edit distance ≤ 1 (insert/delete/substitute), cheap for short tokens. */
function fuzzy(hay: string, needle: string): boolean {
  if (hay.includes(needle)) return true
  if (needle.length < 5 || hay.length < 4) return false
  if (Math.abs(hay.length - needle.length) > 1) return false
  let i = 0
  let j = 0
  let edits = 0
  while (i < hay.length && j < needle.length) {
    if (hay[i] === needle[j]) {
      i++
      j++
    } else {
      edits++
      if (edits > 1) return false
      if (hay.length === needle.length) {
        i++
        j++
      } else if (hay.length > needle.length) {
        i++
      } else {
        j++
      }
    }
  }
  return edits + (hay.length - i + (needle.length - j)) <= 1
}

export interface GoalMatch {
  tool: Tool
  score: number
  matched: string[]
}

function fieldIncludes(fieldTokens: string[], variants: string[]): boolean {
  return variants.some((v) => fieldTokens.some((f) => fuzzy(f, v)))
}

export function matchToolsByGoal(goal: string, freeOnly = false, limit = 8): GoalMatch[] {
  const rawTerms = tokens(goal).slice(0, 20)
  if (!rawTerms.length) return []
  const pool = freeOnly
    ? SEED_TOOLS.filter((t) => t.pricing === 'free' || t.pricing === 'open-source')
    : SEED_TOOLS
  // Multi-word phrases from the raw goal (e.g. "landing page").
  const lowered = goal.toLowerCase()
  const phrases = ['landing page', 'text to speech', 'speech to text', 'background remover', 'remove background']
    .filter((p) => lowered.includes(p))

  const scored: GoalMatch[] = []
  for (const tool of pool) {
    const name = tool.name.toLowerCase()
    const nameTokens = tokens(tool.name).map((t) => t.stem)
    const tagTokens = tool.tags.flatMap((t) => tokens(t.replace(/-/g, ' ')).map((x) => x.stem))
    const catTokens = tokens(tool.category.replace(/-/g, ' ')).map((t) => t.stem)
    const bodyTokens = tokens(`${tool.tagline} ${tool.description}`).map((t) => t.stem)
    let score = 0
    const matched: string[] = []
    const hit = (label: string, w: number) => {
      score += w
      if (!matched.includes(label)) matched.push(label)
    }
    for (const { raw, stem: term } of rawTerms) {
      const variants = expand(term)
      if (fieldIncludes(nameTokens, variants)) hit(raw, 5)
      else if (fieldIncludes(tagTokens, variants)) hit(raw, 3)
      else if (fieldIncludes(catTokens, variants)) hit(raw, 2)
      else if (fieldIncludes(bodyTokens, variants)) hit(raw, 1)
    }
    for (const p of phrases) {
      const blob = `${tool.name} ${tool.tagline} ${tool.description}`.toLowerCase()
      if (blob.includes(p)) {
        score += 4
        matched.push(p)
      }
    }
    if (score > 0) scored.push({ tool, score, matched: matched.slice(0, 4) })
  }
  // Best match per normalized name: the catalogue contains a few duplicate
  // records for the same product — never show the same tool twice.
  const best = new Map<string, GoalMatch>()
  for (const m of scored) {
    const key = m.tool.name.toLowerCase().replace(/[^a-z0-9]/g, '')
    const prev = best.get(key)
    if (!prev || m.score > prev.score) best.set(key, m)
  }
  return [...best.values()]
    .sort((a, b) => b.score - a.score || b.tool.upvotes - a.tool.upvotes)
    .slice(0, limit)
}
