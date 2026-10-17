import { NextResponse } from 'next/server'
import { createHash, randomBytes } from 'node:crypto'
import { matchToolsByGoal, analyzeGoal, type GoalItemKind } from '@/lib/goal-finder'
import { GOAL_MATCH_SYSTEM_PROMPT } from '@/lib/goal-prompt'
import { runProviderRoundtrip, parseProviderOutput, type ProviderResult } from '@/lib/goal-provider-roundtrip'
import { PROVIDER_ATTEMPT_MS, SERVER_TOTAL_MS } from '@/lib/goal-timeouts'
import type { Tool, DevTool, Repo } from '@/types'

const API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions'
const API_KEY = process.env.NVIDIA_API_KEY ?? ''
const DEFAULT_MODEL = 'openai/gpt-oss-20b'
// Measured (Oct 2026, production payload for the reported false-empty
// query): glm-5.3-flash never delivered inside ANY budget (45s, 60s,
// 90s; >60s even with thinking-disabled request variants), while the
// primary resolves at 15-55s. A sibling that only ever hits the attempt
// deadline actively wastes the user's wait on abstentions and partial
// failures (park/until-deadline semantics), so the fan-out stays single
// — replace only with a model measured FASTER on the actual payload.
const FALLBACK_MODELS: string[] = []

// Candidates are prefiltered and RANKED locally so the prompt stays small
// and the model can only pick from REAL catalogue entries (IDs validated
// below). Live evidence: large candidate lists push reasoning-style
// models into multi-minute turnarounds or output-budget truncation, and
// the strongest matches rank first — top 30 (Opus Clip ranked #4,
// SendShort #6 for the clip query) keeps prompt ≈1.5k tokens.
const CANDIDATE_COUNT = 30

// Simple per-IP rate limit to protect provider credits.
const hits = new Map<string, number[]>()
function rateLimited(ip: string): boolean {
  const now = Date.now()
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 60_000)
  arr.push(now)
  hits.set(ip, arr)
  return arr.length > 12
}

// Safe operational diagnostics: metadata only — never the raw user query,
// never the API key, never raw prompt text. Every event carries:
// - rnd: per-request id so server logs correlate with the requestId the
//   client received in the response `meta`
// - build: commit under which this code is running — first thing to check
//   when the user reports behavior that contradicts (e.g. "retry layer
//   missing" on the deployed host)
// - prompt: 8-hex PROMPT_VERSION — catches "prompt not updated on host"
const PROMPT_VERSION = createHash('sha256').update(GOAL_MATCH_SYSTEM_PROMPT).digest('hex').slice(0, 8)
const logGoalMatch = (requestId: string, event: string, meta: Record<string, unknown> = {}) => {
  const common = {
    rnd: requestId,
    build: process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.COMMIT_SHA ?? process.env.NEXT_PUBLIC_COMMIT_SHA ?? 'dev',
    prompt: PROMPT_VERSION,
  }
  console.error(`[goal-match] ${event} ${JSON.stringify({ ...common, ...meta })}`)
}

// A fresh logger per request, so every event carries the same rnd/build
// id without threading the ids through every call site.
const loggerFor = (requestId: string) => (event: string, meta: Record<string, unknown> = {}) =>
  logGoalMatch(requestId, event, meta)

// Candidate descriptions are cut on a SENTENCE boundary, never
// mid-sentence: the sentence boundary is usually where task-supporting
// evidence lives (e.g. "repurpose long videos into viral short clips."),
// and a blind 150-char cut can hide exactly that. Bounded at MAX_DESC;
// live payload stays ≈2.3k prompt tokens.
const MAX_DESC = 260
function truncateDescription(desc: string): string {
  const flat = desc.replace(/\s+/g, ' ').trim()
  if (flat.length <= MAX_DESC) return flat
  const head = flat.slice(0, MAX_DESC)
  const cut = Math.max(head.lastIndexOf('. '), head.lastIndexOf('! '), head.lastIndexOf('? '))
  return cut > 0 ? head.slice(0, cut + 1) : head
}

function candidateLine(kind: GoalItemKind, t: { id: string; name: string; category: string; pricing: string; tags: string[]; tagline: string; description: string }): string {
  const desc = truncateDescription(t.description)
  return `- [${kind}] ${t.id} | ${t.name} | ${t.category} | ${t.pricing} | tags: ${t.tags.join(', ')} | ${t.tagline} | ${desc}`
}


export async function POST(req: Request) {
  const requestId = randomBytes(4).toString('hex')
  const meta = {
    requestId,
    build: process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.COMMIT_SHA ?? process.env.NEXT_PUBLIC_COMMIT_SHA ?? 'dev',
    prompt: PROMPT_VERSION,
  }

  if (!API_KEY) {
    return NextResponse.json({ error: 'AI matching is not configured.', fallback: true, meta }, { status: 503 })
  }
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many searches — please wait a minute.', fallback: true, meta },
      { status: 429 }
    )
  }

  let goal = ''
  let freeOnly = false
  try {
    const body = await req.json()
    goal = String(body.goal ?? '').slice(0, 500).trim()
    // Frontend sends freeOnly; honor the legacy 'free' key too so the
    // filter is never silently lost in transit.
    freeOnly = body.freeOnly === true || body.free === true
  } catch {
    return NextResponse.json({ error: 'Invalid request.', meta }, { status: 400 })
  }
  if (goal.length < 2) {
    return NextResponse.json({ error: 'Describe your goal first.', meta }, { status: 400 })
  }

  // ---- Per-request diagnostics ------------------------------------------
  // rnd: stable id across all log lines of this request AND echoed in the
  // response `meta` so a client-visible failure can be correlated with the
  // server-side evidence (attempt numbers, statuses, finish reasons).
  // Local shadow of the module-level factory keeps every existing call
  // site source-compatible while gaining rnd/build/prompt context.
  const logGoalMatch = loggerFor(requestId)

  // ---- State 1: candidate retrieval found nothing -----------------------
  const retrievalMs0 = Date.now()
  const local = matchToolsByGoal(goal, freeOnly, CANDIDATE_COUNT)
  const retrievalMs = Date.now() - retrievalMs0
  if (!local.length) {
    return NextResponse.json({ matches: [], noCandidates: true, abstained: false, meta })
  }
  const byId = new Map(local.map((m) => [m.item.id, m]))
  const catalog = local.map((m) => candidateLine(m.kind, m.item)).join('\n')

  // Keep the complete goal as the source of truth for negation. Do not
  // promote lossy token labels (e.g. 'internet' from 'without internet')
  // into contradictory positive requirements. The prompt reads the goal.
  // Preserve the explicit free-plan flag so none of
  // them gets treated as noise downstream. The query word "free" is a
  // plan constraint the evaluator must honor (a free trial, a free tier
  // for an unrelated feature, or open-source licensing do not satisfy
  // it); the UI freeOnly filter applies the structured pricing field.
  const analysis = analyzeGoal(goal)
  const constraintParts: string[] = []
  if (analysis.askingFree) constraintParts.push('free plan required')
  const constraintLines = constraintParts.length
    ? `\nMandatory constraints (do NOT relax them): ${constraintParts.join('; ')}\n`
    : '\n'
  const freeNote = freeOnly
    ? ' (the user filters to free-plan candidates. Structured pricing already excludes paid listings; a freemium candidate qualifies ONLY if its listing documents the requested feature on the free tier — a free trial never counts)'
    : ''
  const user = `Goal: "${goal}"${freeNote}${constraintLines}\n\nCatalogue:\n${catalog}`

  // ---- Provider fan-out: bounded budget, safe logs ---------------------
  // All providers run in parallel with independent per-attempt budgets
  // (each attempt can legitimately take 16–70s; 22s bills aborted
  // healthy runs). The roundtrip helper decides: early validated
  // non-empty matches win; a valid [] only parks; deadline expiry is a
  // distinct failure. Cancellation is best-effort: tokens already
  // processed may still be billed upstream.
  const started = Date.now()
  const validIdSet = new Set(byId.keys())
  logGoalMatch('request-built', {
    candidates: local.length,
    // Candidate set is safe to log (internal catalogue ids, not the user
    // query) — it pins down which ranked evidence the model judged.
    candidateIds: local.map((m) => m.item.id).slice(0, 30),
    retrievalMs,
    systemChars: GOAL_MATCH_SYSTEM_PROMPT.length,
    userChars: user.length,
  })

  // Client disconnects cancel the provider fan-out where the runtime
  // supports signal linking — no point paying for a request nobody will
  // read. Cancellation is a cost measure only; tokens the provider
  // already processed may still be billed.
  const controllers = new Map<string, AbortController>()
  let attemptSeq = 0
  const send = async (model: string, attemptMs: number = PROVIDER_ATTEMPT_MS): Promise<ProviderResult> => {
    if (req.signal.aborted) {
      return { ok: false, model, errName: 'ClientDisconnected' }
    }
    const attempt = ++attemptSeq
    const attemptStart = Date.now()
    logGoalMatch('provider-request', {
      attempt,
      model,
      attemptMs,
      // Reasoning/output config is part of the evidence for the
      // truncation/timeout failure classes (finish_reason=length).
      maxTokens: 4000,
      ...(model.startsWith('openai/') ? { reasoningEffort: 'medium' } : {}),
    })
    const controller = new AbortController()
    controllers.set(model, controller)
    const timer = setTimeout(() => controller.abort(), attemptMs)
    const linkedSignal =
      typeof AbortSignal.any === 'function'
        ? AbortSignal.any([controller.signal, req.signal])
        : controller.signal
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
            { role: 'system', content: GOAL_MATCH_SYSTEM_PROMPT },
            { role: 'user', content: user },
          ],
          // Headroom for reasoning-style models: live runs showed the
          // reasoning tokens consuming the output budget with the answer
          // never emitted (finish_reason=length). 4000 keeps the answer
          // inside the attempt budget: MEASURED completion consumption on
          // the production payload is 1232-2527 tokens for valid answers,
          // while truncating draws hit the previous 3000 cap with the
          // JSON cut mid-array (finish=length, contentChars 905 on one
          // draw) — an output-budget problem, not an attempt-time problem,
          // so the cap rises instead of the timeout.
          max_tokens: 4000,
          temperature: 0.2,
          // Evidence (latency probe on the production payload):
          // gpt-oss-20b with default reasoning burns 1.4-3k thinking
          // tokens (25-52s, sometimes truncating with no answer);
          // with explicit reasoning_effort='medium' it emits a valid
          // answer at ~25s (and 'low' under-thinks and abstains).
          // glm-5.3-flash ignores this knob and runs >60s on this
          // payload — it only ever contributes on cheap queries and is
          // otherwise cancelled at the attempt deadline.
          ...(model.startsWith('openai/') ? { reasoning_effort: 'medium' } : {}),
          stream: false,
        }),
        signal: linkedSignal,
      })
      if (!res.ok) {
        logGoalMatch('provider-http-error', { attempt, model, status: res.status, attemptMs: Date.now() - attemptStart })
        return { ok: false, model, httpStatus: res.status }
      }
      const data = (await res.json()) as {
        choices?: { message?: { content?: unknown }; finish_reason?: unknown }[]
        usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number }
      }
      const msg = data?.choices?.[0]?.message
      const text = typeof msg?.content === 'string' ? msg.content : ''
      const finishReason = String(data?.choices?.[0]?.finish_reason ?? '')
      // Token usage is provider-reported metadata (safe to log): when a
      // sibling attempt is cancelled, tokens already processed may
      // still be billed — this makes the real cost observable.
      const usage = {
        promptTokens: data?.usage?.prompt_tokens,
        completionTokens: data?.usage?.completion_tokens,
        totalTokens: data?.usage?.total_tokens,
      }
      logGoalMatch('provider-response', {
        attempt,
        model,
        status: res.status,
        attemptMs: Date.now() - attemptStart,
        finishReason,
        contentChars: text.trim().length,
        ...usage,
      })
      return text.trim() ? { ok: true, model, text, finishReason } : { ok: false, model }
    } catch (err) {
      logGoalMatch('provider-fetch-error', {
        attempt,
        model,
        attemptMs: Date.now() - attemptStart,
        errName: err instanceof Error ? err.name : 'unknown',
      })
      return { ok: false, model, errName: err instanceof Error ? err.name : 'unknown' }
    } finally {
      // Timer cleared so a settled attempt can never be aborted late;
      // late responses after the fan-out resolves are ignored by the
      // roundtrip helper's finished-guard.
      clearTimeout(timer)
      controllers.delete(model)
    }
  }
  const cancelInFlight = () => {
    for (const c of controllers.values()) {
      try {
        c.abort()
      } catch {
        // already settled
      }
    }
  }
  req.signal.addEventListener('abort', cancelInFlight, { once: true })

  const result = await runProviderRoundtrip({
    models: [DEFAULT_MODEL, ...FALLBACK_MODELS],
    send,
    totalMs: SERVER_TOTAL_MS,
    validIds: validIdSet,
    cancelInFlight,
    onEvent: logGoalMatch,
  })

  // Validated picks → response objects (shared by the fan-out winner and
  // the abstention-retry second draw below).
  const buildMatches = (picks: { id: string; reason: string }[]) => {
    const matches: { kind: GoalItemKind; item: Tool | DevTool | Repo; pct: number; reason: string; ai: true }[] = []
    const seenIds = new Set<string>()
    const seenNames = new Set<string>()
    for (const pick of picks) {
      if (matches.length >= 6) break
      if (seenIds.has(pick.id)) continue
      seenIds.add(pick.id)
      const m = byId.get(pick.id)!
      const nameKey = m.item.name.toLowerCase().replace(/[^a-z0-9]/g, '')
      if (seenNames.has(nameKey)) continue
      seenNames.add(nameKey)
      matches.push({
        kind: m.kind,
        item: m.item,
        pct: m.pct,
        reason: pick.reason,
        ai: true as const,
      })
    }
    return matches
  }

  // ---- State 2: AI abstention (valid empty array) ----------------------
  if (result.kind === 'abstain') {
    const elapsed = Date.now() - started
    logGoalMatch('goal-abstained', { elapsedMs: elapsed, deadlineExpired: result.deadlineExpired, abstentions: result.abstentions })
    // One INDEPENDENT second judgment when a repeat abstention would be
    // immediately shown: measured first-try abstentions resolve fast
    // (28-42s draws), and a fresh generation breaks the abstention often
    // enough to justify the wait — the honest "AI could not confirm" +
    // UI Retry then covers the residual two-abstain case. Never forced:
    // a second valid [] abstains too; the first valid judgment stands
    // unless the second draw contradicts it with validated picks.
    const RETRY_MIN_ROOM_MS = 35_000
    const remaining = SERVER_TOTAL_MS - elapsed
    if (!result.deadlineExpired && remaining >= RETRY_MIN_ROOM_MS) {
      const attemptMs = Math.min(PROVIDER_ATTEMPT_MS, remaining - 1)
      logGoalMatch('abstention-retry-start', { elapsedMs: elapsed, attemptMs })
      const second = await send(DEFAULT_MODEL, attemptMs)
      // Explicit retry-trail marker in the response contract, so "two
      // completed abstentions" (retry: 'abstained' | 'invalid' | none) is
      // distinguishable from "one abstention followed by an incomplete
      // attempt" (retry: 'incomplete') and from a success (no marker at
      // all). The UI keeps its single abstention state; the distinction
      // lives in the API + logs for honest diagnosis.
      let retryTrail: string | undefined
      if (second.ok && second.text) {
        const outcome = parseProviderOutput(second, validIdSet)
        if (outcome.kind === 'ok') {
          const matches = buildMatches(outcome.picks)
          logGoalMatch('goal-match-after-retry', { elapsedMs: Date.now() - started, picked: matches.length, dropped: outcome.dropped })
          return NextResponse.json({ matches, abstained: false, meta })
        }
        // Valid [] again → abstention stands (with or without explicit
        // deadline); invalid output does NOT override a valid verdict.
        retryTrail = second.finishReason && second.finishReason !== 'stop'
          ? 'incomplete'
          : outcome.kind === 'abstain' ? 'abstained' : 'invalid'
        logGoalMatch('abstention-retry-kept', { outcome: outcome.kind, elapsedMs: Date.now() - started })
      } else {
        // Truncated output with non-empty content is an INCOMPLETE
        // attempt, not an honest second abstention — it stays visible in
        // the trail as 'incomplete'.
        retryTrail = 'incomplete'
        logGoalMatch('abstention-retry-failed', {
          httpStatus: second.httpStatus,
          errName: second.errName,
        })
      }
      return NextResponse.json({ matches: [], abstained: true, meta: { ...meta, retryTrail } })
    } else {
      logGoalMatch('abstention-retry-skipped', { elapsedMs: elapsed })
    }
    return NextResponse.json({ matches: [], abstained: true, meta })
  }

  // ---- State 3: AI returned validated non-empty matches ----------------
  if (result.kind === 'ok') {
    const matches = buildMatches(result.picks)
    logGoalMatch('goal-match-done', {
      elapsedMs: Date.now() - started,
      candidates: local.length,
      picked: matches.length,
      droppedByContract: result.dropped,
    })
    return NextResponse.json({ matches, abstained: false, meta })
  }

  // ---- States 4/5: technical failure vs deadline expiry ----------------
  logGoalMatch('goal-failure', { elapsedMs: Date.now() - started, cause: result.cause, deadlineExpired: result.deadlineExpired })
  return NextResponse.json(
    { error: 'AI matching unavailable right now.', fallback: true, deadlineExpired: result.cause === 'deadline', meta },
    { status: 502 }
  )
}
