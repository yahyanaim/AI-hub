import { NextResponse } from 'next/server'
import { SEED_COURSES } from '@/lib/seed'

const API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions'
// Nov 2026 audit: openai/gpt-oss-20b is still LISTED on integrate.api.nvidia.com
// but its inference hangs forever (no response, no error) — the career advisor
// surfaced "AI service temporarily unavailable" from the 45s abort. deepseek-v4.1-
// flash also hangs; kimi-k2.6 is 404 for this account. Measured live on production
// with the FULL system prompt: nvidia/nemotron-3.5-lightning-30b-a3b delivers in
// 21-50s and minimaxai/minimax-m3.1-flash in ~26s — both return valid content.
const DEFAULT_MODEL = 'nvidia/nemotron-3.5-lightning-30b-a3b'
const FALLBACK_MODELS = ['minimaxai/minimax-m3.1-flash']

function buildCourseCatalog(): string {
  return SEED_COURSES.map(c => {
    return `- ${c.id}: "${c.name}" | path: ${c.category}/${c.slug} | ${c.difficulty} | ${c.duration} | ${c.pricing}`
  }).join('\n')
}

const COURSE_CATALOG = buildCourseCatalog()

const SYSTEM_PROMPT = `You are a Development Career Advisor and Skill Development Coach for AI Hunt - a platform for AI tools, developer tools, open-source repos, and coding courses.

Your single mission is to deeply understand the person in front of you and produce a fully personalized, structured roadmap for their development career. You never give generic advice. Every recommendation must map back to what this specific person told you about themselves.

You always follow this exact sequence. Never skip a phase. Never merge phases.

---

## Phase 0 - Output Format (Ask First, Always)

Before anything else, ask these three questions and wait for answers:

**Q1.** How do you want the output structured? - Chat-based (conversational, step-by-step), Structured document (clean sections like a career report), Tracking system (tables for skills/projects/milestones), or Hybrid (chat explanation + tracking tables)

**Q2.** Format details - Do you want tracker tables formatted for chat, or exportable to Notion/Obsidian? One long response or split into phases?

**Q3.** Timeline preference - 3-month, 6-month, or 12-month progression plan?

After answers, ask permission into Notion/Obsidian (or their preferred app) to create a page. After each phase, update this page with organized output.

---

## Phase 1 - Context Gathering (Mandatory)

Your goal: build a complete, accurate picture of who this person actually is - not who they think they are. Determine their level from what they've done, not from any label they give themselves.

### Golden Rules
1. Never ask them to rate themselves. No "rate your skills 1-10." No "what level are you?" Ask what they've done - you decide their level from evidence.
2. Make every question feel safe. No wrong or embarrassing answers.
3. Follow the thread - if they say something interesting or vague, dig in.
4. Read what they don't say - short answers = less comfort; unprompted detail = confidence.

### Conversation Areas (in order)
**AREA 1 - CV and Portfolio:** Ask for their CV/resume, GitHub profile, portfolio site, or deployed projects first. Use these to calibrate all follow-up questions. If they have nothing, note it without judgment.

**AREA 2 - Background:** What do they do day-to-day? How did they get into development? Any tech-adjacent work? What does a typical day look like?

**AREA 3 - Technical Experience (most important):** Ask what they've actually built or done - not what they "know." Probe frontend (websites, frameworks), backend (servers, APIs, databases), programming fundamentals (scripts, projects), tools (Git, deployment, terminal). Use follow-ups like "Can you give me a specific example?", "How far did you get?", "What did you try when stuck?"

**AREA 4 - Goals:** What pulls them toward development? What do they want to be doing in a year? Specific role/company type? What does success look like?

**AREA 5 - Time & Resources:** Realistic hours per day, budget for courses, computer specs, learning style (videos/written/hands-on/community).

**AREA 6 - Obstacles:** What's gotten in the way before? What approaches didn't work? Any life constraints to factor in?

### Before leaving Phase 1, you must know:
- Their actual technical level (Entry/Junior/Mid/Senior - from evidence)
- Their real strengths and gaps
- Their honest goal and motivation
- Their daily time availability (realistic number)
- Their budget situation
- Their CV/portfolio state
- Their learning style
- Past obstacles

---

## Phase 2 - Confirm Understanding

Reflect back a concise summary:
- Who they are right now
- Their evidence-based level (explain why)
- Their real strengths and gaps
- Their goal and motivation
- Their constraints and timeline
- Their preferred output format

Then ask: "Does this accurately capture your situation? Should I adjust anything before I begin the analysis?"

Only proceed when they confirm.

---

## Phase 3 - The Roadmap Delivery

Deliver a tailored roadmap with these steps. Use the course catalog below to recommend exact courses by name.

1. **Current State Analysis** - Skill matrix, career level, strengths/gaps/reality check
2. **Learning Path Strategy** - Phased roadmap (Foundations → Core Skills → Advanced Topics → Projects & Portfolio), learning approach, realistic timeline
3. **Skill Development** - Skills to master table, certification/course plan (use exact names from catalog)
4. **Hands-On Resources** - Platform comparison, 12-week curriculum
5. **Project & Portfolio** - 4-5 progressive projects, GitHub/blog/personal site strategy
6. **Lab & Coding Practice** - Practice platforms, dev setup guide
7. **Skill Tracking** - Trackers for skills/projects/milestones
8. **Community & Networking** - Communities, events, content, mentorship
9. **Interview Prep** - Technical topics, behavioral, coding challenges, portfolio talking points
10. **Daily & Weekly Routine** - Custom schedule matching their hours
11. **Acceleration Plan** - Month-by-month for 3/6/12 months
12. **Readiness Assessment** - Are they ready for entry-level/internship/freelance?

After Step 2, ask: "Continue, pause, or adjust?"

### Document capture (mandatory)
Whenever you deliver a COMPLETE roadmap document in a single message (step 2 above, or any later fully-updated version), you MUST wrap the entire document in exactly one fenced code block that opens with \`\`\`roadmap, like:

\`\`\`roadmap
# <Document title>
...the complete document...
\`\`\`

Rules:
- The first line inside the block MUST be a markdown H1 title (e.g. "# Sarah - 6-Month Frontend Roadmap").
- Keep the FULL document as markdown inside the block (headings, tables, lists). Use at most heading levels ## and below inside it.
- Never wrap quick answers, partial steps, or conversational replies in this block — only complete documents. The chat renders the document separately; in the visible reply outside the block, briefly present the plan and tell the user the full document is available.
- If the user later asks to update the document, output the COMPLETE updated version in a fresh \`\`\`roadmap block (a new document, not a diff).

---

## Execution Principles
1. Specificity always - tailor everything to what they told you. No generic advice.
2. Depth over breadth - master 1-2 core stacks before expanding.
3. Document everything - all learning becomes portfolio content.
4. Community matters - development is relationship-driven.
5. 70% hands-on building, 30% theory.
6. Sustainable over sprint - consistency beats intensity.
7. Test job readiness early - apply at 70% ready, not 100%.
8. Measure everything.

## You Are Their Instructor - Not Just a Prompt
Delivering the roadmap is not the end. Every conversation is a continuation, not a restart. When they return:
- Ask what phase they're in and what they've been working on
- Listen fully, diagnose root cause
- Give concrete next steps
- Update the roadmap if their situation changed
- Close every session with: summary, 1-3 most important actions, open invitation to return

## Course Catalog (use exact names from here):
${COURSE_CATALOG}

## Course Links (mandatory)
When you recommend a course from the catalog - in chat replies AND inside documents/roadmaps - ALWAYS turn it into a clickable link the user can open:
- Format: [Course Name](https://www.aihubtools.ma/courses/<category>/<slug>) using the exact "path: category/slug" from the catalog line.
- Example: a catalog line 'path: web-development/the-odin-project' becomes [The Odin Project](https://www.aihubtools.ma/courses/web-development/the-odin-project).
- NEVER invent URLs or slugs. Only link courses that appear in the catalog above; plain recommendations without a catalog entry get no link.`

// ---- Public-endpoint guards (tune after launch based on real usage) ----
const RATE_LIMIT_MAX_REQUESTS = 20 // requests...
const RATE_LIMIT_WINDOW_MS = 60_000 // ...per this window, per IP
// Assistant turns legitimately exceed 4k chars here: the roadmap phases the
// advisor produces are long documents, and the client echoes them back on
// every follow-up — a 40x4000 payload guard made the chat unusable after the
// first roadmap. Limits raised to fit real advisor turns; per-request token
// cost stays controlled by MAX_CONTEXT_MESSAGES below.
const MAX_MESSAGES_COUNT = 60 // reject payloads with more messages than this
const MAX_MESSAGE_CHARS = 20_000 // reject any single message longer than this
const MAX_CONTEXT_MESSAGES = 20 // only send the last N messages to the model
const MAX_CV_CHARS = 12_000 // attached CV is context-only — parsed text, never stored

// ---- GitHub snapshot (live, read-only, in-memory cache) --------------------
// When the user pastes a github.com/<user> link, fetch public profile + repo
// data so the advisor analyzes real projects instead of saying it cannot
// browse. Cached 10 minutes per login; failures degrade to no snapshot.
const GH_CACHE = new Map<string, { at: number; text: string }>()
const GH_RESERVED_PATHS = new Set([
  'features', 'apps', 'about', 'topics', 'collections', 'trending', 'orgs',
  'site', 'settings', 'marketplace', 'enterprise', 'customer-stories',
  'sponsors', 'education', 'developers', 'readme', 'events', 'explore', 'login',
  'signup', 'pricing', 'search', 'pulls', 'issues', 'notifications', 'watch',
])

async function fetchJsonT(url: string, ms = 6000): Promise<any> {
  try {
    const ctl = new AbortController()
    const t = setTimeout(() => ctl.abort(), ms)
    const headers: Record<string, string> = {
      'User-Agent': 'AIHubTools-Career-Advisor',
      Accept: 'application/vnd.github+json',
    }
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    const res = await fetch(url, { headers, signal: ctl.signal })
    clearTimeout(t)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

async function githubSnapshotFromText(text: string): Promise<string | null> {
  const m = text.match(/github\.com\/([A-Za-z0-9][A-Za-z0-9-]{0,38})/i)
  if (!m) return null
  const login = m[1]?.toLowerCase() || ''
  if (GH_RESERVED_PATHS.has(login)) return null
  const cached = GH_CACHE.get(login)
  if (cached && Date.now() - cached.at < 10 * 60_000) return cached.text || null

  const [user, repos] = await Promise.all([
    fetchJsonT(`https://api.github.com/users/${login}`),
    fetchJsonT(`https://api.github.com/users/${login}/repos?sort=updated&per_page=30`),
  ])
  if (!user || user.message || !Array.isArray(repos)) return null // 404 / rate-limited / timeout

  const lines: string[] = []
  if (user.name) lines.push(`User: ${user.name} (@${user.login})`)
  else lines.push(`User: @${user.login}`)
  if (user.bio) lines.push(`Bio: ${user.bio}`)
  if (user.company) lines.push(`Company: ${user.company}`)
  if (user.blog) lines.push(`Site: ${user.blog}`)
  lines.push(`Public repos: ${user.public_repos} · Followers: ${user.followers}`)
  const langAgg: Record<string, number> = {}
  for (const r of repos.slice(0, 12)) {
    if (!r || r.fork) continue
    lines.push(
      `- ${r.name} (${r.language || 'unknown'}) ★${r.stargazers_count} · updated ${(r.updated_at || '').slice(0, 10)}${r.description ? ' — ' + r.description : ''}`
    )
    if (r.language) langAgg[r.language] = (langAgg[r.language] || 0) + 1
  }
  const kept = lines.length
  if (repos.length > 12) lines.splice(kept, 0, `(showing the 12 most recently updated of ${repos.length} repos)`)
  const langs = Object.entries(langAgg)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([l, c]) => `${l} (${c})`)
  if (langs.length) lines.push(`Most-used languages by repo count: ${langs.join(', ')}`)
  const snapshot = lines.join('\n').slice(0, 4000)
  GH_CACHE.set(login, { at: Date.now(), text: snapshot })
  if (GH_CACHE.size > 200) GH_CACHE.clear()
  return snapshot
}

// In-memory sliding window: ip -> timestamps of recent requests
const rateLimitMap = new Map<string, number[]>()

function getClientIp(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0]?.trim() ?? 'unknown'
  return request.headers.get('x-real-ip') ?? 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const hits = (rateLimitMap.get(ip) ?? []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  )
  if (hits.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitMap.set(ip, hits)
    return true
  }
  hits.push(now)
  rateLimitMap.set(ip, hits)
  // Opportunistic cleanup so the map doesn't grow unbounded
  if (rateLimitMap.size > 5000) {
    for (const [key, timestamps] of rateLimitMap) {
      if (timestamps.every((ts) => now - ts >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(key)
      }
    }
  }
  return false
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute and try again.' },
        { status: 429 }
      )
    }

    const body = await request.json().catch(() => null)
    const { messages } = body ?? {}

    if (
      !Array.isArray(messages) ||
      messages.length === 0 ||
      messages.length > MAX_MESSAGES_COUNT ||
      messages.some(
        (m: unknown) =>
          !m ||
          typeof m !== 'object' ||
          typeof (m as { role?: unknown }).role !== 'string' ||
          typeof (m as { content?: unknown }).content !== 'string' ||
          ((m as { content: string }).content ?? '').length > MAX_MESSAGE_CHARS
      )
    ) {
      return NextResponse.json(
        { error: `Invalid messages payload (max ${MAX_MESSAGES_COUNT} messages, ${MAX_MESSAGE_CHARS} characters each).` },
        { status: 400 }
      )
    }

    const API_KEY = process.env.NVIDIA_API_KEY || process.env.DAHL_API_KEY
    if (!API_KEY) {
      console.error('[chat] missing API key — set NVIDIA_API_KEY in Vercel env and redeploy')
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // Never trust client-supplied system prompts; cap context to control token cost
    const conversation = messages
      .filter((m: { role: string }) => m.role === 'user' || m.role === 'assistant')
      .slice(-MAX_CONTEXT_MESSAGES)

    // Attached CV (parsed text from the client) rides along in memory for the
    // request only — included as context, never persisted anywhere.
    const cvRaw = typeof (body as { cv?: unknown })?.cv === 'string' ? (body as { cv: string }).cv : ''
    const cv = cvRaw.length > MAX_CV_CHARS ? cvRaw.slice(0, MAX_CV_CHARS) : cvRaw

    // Live GitHub snapshot when the user shared a github.com link recently.
    const recentUserText = messages
      .slice(-4)
      .map((m: { role: string; content: string }) => (m.role === 'user' ? m.content : ''))
      .join(' ')
    const ghSnapshot = await githubSnapshotFromText(recentUserText)

    const primaryModel = process.env.NVIDIA_MODEL || DEFAULT_MODEL

    async function callNvidia(model: string): Promise<Response> {
      // Normalize conversation to support vision (content as string or array) like your axios snippet
      const normalizedConversation = conversation.map((m: { role: string; content: unknown }) => {
        // If content already array (vision), pass through; else string
        return m
      })
      const payload: Record<string, unknown> = {
        model,
        messages: [
          {
            role: 'system',
            content:
              SYSTEM_PROMPT +
              (cv
                ? `\n\n## Attached CV (session-only, not stored)\nThe user attached their CV as parsed text. Base career advice on it: strengths, gaps, and concrete next steps.\n\n${cv}`
                : '') +
              (ghSnapshot
                ? `\n\n## GitHub profile snapshot (fetched live, read-only)\n${ghSnapshot}\n\nThe user actually shared this GitHub profile. Analyze these REAL projects (repos, languages, activity) when working on AREA 1 (CV & Portfolio) — never say you cannot browse GitHub; this data IS their GitHub.`
                : ''),
          },
          ...normalizedConversation,
        ],
        max_tokens: 4096,
        temperature: 1,
        stream: true,
        seed: 0,
      }
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 45_000)
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        })
        return res
      } catch (e: unknown) {
        clearTimeout(timeout)
        const msg = e instanceof Error && e.name === 'AbortError' ? 'Upstream timeout after 60s' : String(e)
        console.error('[chat] fetch failed', model, msg)
        throw e
      } finally {
        clearTimeout(timeout)
      }
    }

    let apiResponse: Response | null = null
    let usedModel = primaryModel
    let upstreamBody = ''
    const modelsToTry = [primaryModel, ...FALLBACK_MODELS.filter(m => m !== primaryModel)]

    for (const m of modelsToTry) {
      try {
        const res = await callNvidia(m)
        if (res.ok) {
          apiResponse = res
          usedModel = m
          break
        }
        const body = await res.text()
        console.error('[chat] upstream error', m, res.status, body)
        const isLast = m === modelsToTry[modelsToTry.length - 1]
        // Auth failures won't fix themselves on retry — fail fast.
        // Everything else (dead model, gone/EOL, rate-limit, overload) → try next model.
        if ((res.status === 401 || res.status === 403) || isLast) {
          let clientError = 'The AI service is temporarily unavailable. Please try again shortly.'
          if (res.status === 401 || res.status === 403) {
            clientError = `AI auth failed (upstream ${res.status}). Check NVIDIA_API_KEY on Vercel and redeploy.`
          } else if (res.status === 410) {
            clientError = `Model "${m}" is retired (upstream 410 Gone).`
          } else if (res.status === 404 || res.status === 400 || res.status === 422) {
            const hint = body.slice(0, 200).replace(/\s+/g, ' ')
            clientError = `Model "${m}" rejected (upstream ${res.status}). ${hint}`
          } else if (res.status === 429) {
            clientError = `AI rate limited/quota exhausted (upstream 429). Try in 60s or check build.nvidia.com credits.`
          } else if (res.status >= 500) {
            clientError = `AI upstream overloaded (upstream ${res.status}). Retry in a few seconds.`
          } else {
            clientError = `AI service error (upstream ${res.status}). Please retry shortly.`
          }
          return NextResponse.json(
            { error: clientError, upstreamStatus: res.status },
            { status: 502 }
          )
        }
        upstreamBody = body
        continue
      } catch (e: unknown) {
        // fetch timeout/network — retry next model if available, else 502
        if (m !== modelsToTry[modelsToTry.length - 1]) continue
        return NextResponse.json(
          { error: 'The AI service is temporarily unavailable. Please try again shortly.' },
          { status: 502 }
        )
      }
    }

    if (!apiResponse || !apiResponse.ok) {
      return NextResponse.json(
        { error: `All models failed (tried ${modelsToTry.join(', ')}). Last: ${upstreamBody.slice(0,120)}` },
        { status: 502 }
      )
    }

    const stream = new ReadableStream({
      async start(controller) {
        console.log('[chat] streaming with model', usedModel)
        const reader = apiResponse!.body!.getReader()

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            controller.enqueue(value)
          }
        } finally {
          controller.close()
          reader.releaseLock()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('[chat] handler error', msg, error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
