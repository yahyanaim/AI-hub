// ============================================================
// Goal-first finder: match a plain-language goal against published
// catalogue listings. Scores come ONLY from existing record fields
// (name, tags, category, tagline, description) — never generated claims.
// The matched terms are returned so the UI can show *why* each tool
// matched, exactly as the copy promises.
// ============================================================

import { SEED_TOOLS } from '@/lib/seed'
import type { Tool } from '@/types'

const STOP = new Set([
  'the', 'and', 'for', 'with', 'that', 'this', 'from', 'have', 'has',
  'want', 'need', 'like', 'just', 'make', 'help', 'tool', 'tools',
  'best', 'free', 'find', 'looking', 'need', 'using', 'use', 'used',
  'your', 'you', 'our', 'are', 'was', 'will', 'can', 'able', 'get',
  'app', 'website', 'online', 'easy', 'easily', 'really', 'very',
  'une', 'des', 'les', 'pour', 'avec', 'dans', 'sur',
])

export interface GoalMatch {
  tool: Tool
  score: number
  matched: string[]
}

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 3 && !STOP.has(t))
}

export function matchToolsByGoal(goal: string, freeOnly = false, limit = 8): GoalMatch[] {
  const terms = [...new Set(tokens(goal))].slice(0, 20)
  if (!terms.length) return []
  const pool = freeOnly
    ? SEED_TOOLS.filter((t) => t.pricing === 'free' || t.pricing === 'open-source')
    : SEED_TOOLS
  const scored: GoalMatch[] = []
  for (const tool of pool) {
    const name = tool.name.toLowerCase()
    const tags = tool.tags.map((t) => t.toLowerCase())
    const cat = tool.category.toLowerCase().replace(/-/g, ' ')
    const body = `${tool.tagline} ${tool.description}`.toLowerCase()
    let score = 0
    const matched: string[] = []
    for (const term of terms) {
      let w = 0
      if (name.includes(term)) w += 5
      else if (tags.some((t) => t.replace(/-/g, ' ').includes(term))) w += 3
      else if (cat.includes(term)) w += 2
      else if (body.includes(term)) w += 1
      if (w > 0) {
        score += w
        matched.push(term)
      }
    }
    if (score > 0) scored.push({ tool, score, matched: matched.slice(0, 4) })
  }
  return scored
    .sort((a, b) => b.score - a.score || b.tool.upvotes - a.tool.upvotes)
    .slice(0, limit)
}
