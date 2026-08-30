import { NextResponse } from 'next/server'
import { SEED_COURSES } from '@/lib/seed'

const API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions'
const DEFAULT_MODEL = 'meta/llama-3.1-70b-instruct'
const FALLBACK_MODELS = ['nvidia/llama-3.1-nemotron-70b-instruct', 'meta/llama-3.1-405b-instruct', 'meta/llama-3.1-8b-instruct']

function buildCourseCatalog(): string {
  return SEED_COURSES.map(c => {
    return `- ${c.id}: "${c.name}" | ${c.category} | ${c.difficulty} | ${c.duration} | ${c.pricing}`
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
${COURSE_CATALOG}`

// ---- Public-endpoint guards (tune after launch based on real usage) ----
const RATE_LIMIT_MAX_REQUESTS = 20 // requests...
const RATE_LIMIT_WINDOW_MS = 60_000 // ...per this window, per IP
const MAX_MESSAGES_COUNT = 40 // reject payloads with more messages than this
const MAX_MESSAGE_CHARS = 4000 // reject any single message longer than this
const MAX_CONTEXT_MESSAGES = 20 // only send the last N messages to the model

// In-memory sliding window: ip -> timestamps of recent requests
const rateLimitMap = new Map<string, number[]>()

function getClientIp(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
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

    const primaryModel = process.env.NVIDIA_MODEL || DEFAULT_MODEL

    async function callNvidia(model: string): Promise<Response> {
      const payload = {
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...conversation,
        ],
        max_tokens: 2048,
        temperature: 0.70,
        top_p: 0.95,
        stream: true,
      }
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 30_000)
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        })
        return res
      } catch (e: unknown) {
        clearTimeout(timeout)
        const msg = e instanceof Error && e.name === 'AbortError' ? 'Upstream timeout after 30s' : String(e)
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
        // Retry on model-not-found with fallback; fail fast on auth/rate-limit
        if ((res.status === 404 || res.status === 400 || res.status === 422) && m !== modelsToTry[modelsToTry.length - 1]) {
          upstreamBody = body
          continue
        }
        // Non-retryable or last fallback failed
        let clientError = 'The AI service is temporarily unavailable. Please try again shortly.'
        if (res.status === 401 || res.status === 403) {
          clientError = `AI auth failed (upstream ${res.status}). Check NVIDIA_API_KEY on Vercel and redeploy.`
        } else if (res.status === 410) {
          clientError = `NVIDIA Public API Endpoints not enabled for this account (410 Gone). Your key is valid but the org lacks permission — request enablement at forums.developer.nvidia.com or set DAHL_API_KEY/OPENAI_API_KEY as fallback. See build.nvidia.com.`
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
