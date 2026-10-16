import { NextResponse } from 'next/server'
import { matchToolsByGoal, type GoalItemKind } from '@/lib/goal-finder'

const API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions'
const API_KEY = process.env.NVIDIA_API_KEY ?? ''
const DEFAULT_MODEL = 'openai/gpt-oss-20b'
const FALLBACK_MODELS = ['z-ai/glm-5.3-flash']

// Candidates are prefiltered locally so the prompt stays small and the model
// can only pick from REAL catalogue entries (IDs validated below).
const CANDIDATE_COUNT = 60
const PICK_COUNT = 6

// Simple per-IP rate limit to protect NVIDIA credits.
const hits = new Map<string, number[]>()
function rateLimited(ip: string): boolean {
  const now = Date.now()
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 60_000)
  arr.push(now)
  hits.set(ip, arr)
  return arr.length > 12
}

function candidateLine(kind: GoalItemKind, t: { id: string; name: string; category: string; pricing: string; tags: string[]; tagline: string }): string {
  return `- [${kind}] ${t.id} | ${t.name} | ${t.category} | ${t.pricing} | tags: ${t.tags.join(', ')} | ${t.tagline}`
}

export async function POST(req: Request) {
  if (!API_KEY) {
    return NextResponse.json({ error: 'AI matching is not configured.' }, { status: 503 })
  }
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many searches — please wait a minute.', fallback: true },
      { status: 429 }
    )
  }

  let goal = ''
  let freeOnly = false
  try {
    const body = await req.json()
    goal = String(body.goal ?? '').slice(0, 500).trim()
    freeOnly = body.freeOnly === true
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
  if (goal.length < 2) {
    return NextResponse.json({ error: 'Describe your goal first.' }, { status: 400 })
  }

  // Local prefilter: same honest keyword scoring, wide net.
  const local = matchToolsByGoal(goal, freeOnly, CANDIDATE_COUNT)
  if (!local.length) return NextResponse.json({ matches: [] })
  const byId = new Map(local.map((m) => [m.item.id, m]))
  const catalog = local.map((m) => candidateLine(m.kind, m.item)).join('\n')

  const system = `You rank catalogue listings (AI tools, dev tools, editing tools) for a user's goal. You MUST pick only from the catalogue below, using each listing's real id. Never invent tools, features, or prices. Rank the ${PICK_COUNT} best fits and reply with STRICT JSON only — an array like [{"id": "...", "reason": "short reason grounded in the listed facts"}]. No markdown fences, no other text.`
  const user = `Goal: "${goal}"${freeOnly ? ' (free plan required — all candidates already satisfy this)' : ''}\n\nCatalogue:\n${catalog}`

  const models = [DEFAULT_MODEL, ...FALLBACK_MODELS]
  let text = ''
  let ok = false
  for (const model of models) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 30_000)
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: system },
              { role: 'user', content: user },
            ],
            max_tokens: 800,
            temperature: 0.2,
            stream: false,
          }),
          signal: controller.signal,
        })
        if (!res.ok) continue
        const data = await res.json()
        text = data?.choices?.[0]?.message?.content ?? ''
        if (text.trim()) {
          ok = true
          break
        }
      } finally {
        clearTimeout(timeout)
      }
    } catch {
      continue
    }
  }
  if (!ok || !text.trim()) {
    return NextResponse.json(
      { error: 'AI matching unavailable right now.', fallback: true },
      { status: 502 }
    )
  }

  // Parse + validate: unknown ids are dropped, never trusted. Tolerant of
  // wrapper shapes ({"rankings": [...]}) and fences — ids are regex-paired
  // with the nearest following "reason".
  const picks: { id?: string; reason?: string }[] = (() => {
    try {
      const clean = text.replace(/```json|```/g, '').trim()
      const direct: unknown = JSON.parse(clean)
      if (Array.isArray(direct)) return direct
      if (direct && typeof direct === 'object') {
        for (const v of Object.values(direct as Record<string, unknown>)) {
          if (Array.isArray(v)) return v
        }
      }
    } catch {
      // fall through to regex
    }
    const out: { id: string; reason: string }[] = []
    const re = /"id"\s*:\s*"([^"]+)"([\s\S]{0,400}?)"reason"\s*:\s*"([^"]{0,200})/g
    let m: RegExpExecArray | null
    while ((m = re.exec(text)) !== null) {
      const id = m[1]
      const reason = m[3]
      if (id) out.push({ id, reason: (reason ?? '').replace(/\s+/g, ' ').trim() })
    }
    return out
  })()
  if (!picks.length) {
    return NextResponse.json(
      { error: 'AI matching unavailable right now.', fallback: true },
      { status: 502 }
    )
  }

  const matches = picks
    .filter((p) => p && typeof p.id === 'string' && byId.has(p.id))
    .slice(0, PICK_COUNT)
    .map((p) => {
      const m = byId.get(p.id!)!
      return {
        kind: m.kind,
        item: m.item,
        pct: m.pct,
        reason:
          typeof p.reason === 'string' && p.reason.trim()
            ? p.reason.trim().slice(0, 160)
            : 'Matched by the AI re-rank.',
        ai: true as const,
      }
    })

  return NextResponse.json({ matches })
}
