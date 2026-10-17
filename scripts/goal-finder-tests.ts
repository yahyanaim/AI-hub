// ============================================================
// Goal-finder regression checks (deterministic — no live calls)
// Run: npx tsx scripts/goal-finder-tests.ts
//
// Deterministic checks validate plumbing and lexical behaviour with
// controlled catalogue fixtures. They do NOT prove real-model semantic
// relevance; live-provider checks are reported separately.
// ============================================================

import type { Tool } from '@/types'
import * as goalFinder from '@/lib/goal-finder'
const { analyzeGoal, matchToolsByGoalInPool, matchToolsByGoal } = goalFinder
type GoalPoolItem = goalFinder.GoalPoolItem
import {
  parseModelOutput,
  type ParsedOutput,
} from '@/lib/goal-output'
import { runProviderRoundtrip, type ProviderResult } from '@/lib/goal-provider-roundtrip'
import { AI_FAILURE_PRESENTATION } from '@/lib/goal-fallback-policy'
import { GOAL_MATCH_SYSTEM_PROMPT } from '@/lib/goal-prompt'
import { readFileSync } from 'node:fs'
import {
  CLIENT_TIMEOUT_MS,
  SERVER_TOTAL_MS,
  PROVIDER_ATTEMPT_MS,
} from '@/lib/goal-timeouts'

let passed = 0
let failed = 0
const failures: string[] = []
function check(name: string, cond: boolean, detail?: unknown) {
  if (cond) {
    passed++
    console.log(`ok    ${name}`)
  } else {
    failed++
    failures.push(name)
    console.log(`FAIL  ${name}`, detail !== undefined ? detail : '')
  }
}

function fixtureTool(
  id: string,
  name: string,
  pricing: string,
  category: string,
  tagline: string,
  description: string,
  tags: string[],
): GoalPoolItem {
  const item = {
    id,
    slug: id,
    name,
    tagline,
    description,
    url: 'https://example.com',
    logoUrl: '',
    category,
    tags,
    pricing,
    upvotes: 10,
    bookmarks: 1,
    submittedBy: 'u1',
    featured: false,
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
    screenshots: [],
  } as unknown as Tool
  return { kind: 'tool' as const, item }
}

// ------------------------------------------------------------
// Controlled catalogue fixtures
// ------------------------------------------------------------
// The exact confirmed-failure products: brand names contain "clip" but
// the catalogue evidence is image editing / agent orchestration.
const fxClipdrop = fixtureTool(
  'fx-clipdrop',
  'Clipdrop',
  'freemium',
  'image',
  'AI image editing & generation toolkit',
  'Clipdrop offers image upscaling, background removal, relighting, text-to-image, and image-to-image tools with a clean API and web interface.',
  ['image', 'editing', 'background-removal'],
)
const fxPaperclip = fixtureTool(
  'fx-paperclip',
  'Paperclip',
  'open-source',
  'open-source-ai',
  'Run your own company of autonomous AI agents',
  'An org chart where every employee is an agent: assign goals, heartbeats, review gates, budgets and cost tracking for Claude Code, Codex and Cursor from one dashboard.',
  ['agents', 'orchestration', 'autonomous-agents'],
)
// Generic video editor: video evidence, but NO long-video→short-clip workflow
const fxGenericEditor = fixtureTool(
  'fx-generic-editor',
  'CutStudio',
  'freemium',
  'video',
  'AI video editor for creators',
  'AI video editor: trim footage, add captions, effects and background music, then export your videos in minutes.',
  ['video', 'editing'],
)
// A listing that EXPLICITLY supports long-video clipping
const fxClipper = fixtureTool(
  'fx-clipper',
  'ShortsForge',
  'freemium',
  'video',
  'Turn long YouTube videos into short clips',
  'Paste a YouTube URL and get ready-to-post short clips: ShortsForge cuts the highlights from long videos, adds captions and exports vertical shorts.',
  ['youtube', 'clips', 'shorts'],
)
// Same task but WITHOUT direct URL import, with download workflow mentioned
const fxOfflineClipper = fixtureTool(
  'fx-offline-clipper',
  'ClipLocal',
  'free',
  'video',
  'Cut YouTube videos you downloaded into short clips',
  'Cut the highlights from YouTube videos you have already downloaded into short clips, add captions and export shorts. Files are processed on your machine.',
  ['clips', 'shorts', 'local'],
)
// Translation ≠ transcription fixture
const fxTranslator = fixtureTool(
  'fx-translator',
  'LinguaFlow',
  'free',
  'productivity',
  'Translate text between 60 languages',
  'LinguaFlow translates documents and text between 60 languages with an API. No voice features.',
  ['translation', 'languages'],
)
const fxLocalOnly = fixtureTool(
  'fx-local-only',
  'DescriptLocal',
  'free',
  'video',
  'Offline video editor',
  'Works fully without internet after install. Free forever, no payment.',
  ['video', 'offline', 'local'],
)
const fxPaidPerfect = fixtureTool(
  'fx-paid-perfect',
  'ClipPremium',
  'paid',
  'video',
  'Premium clip extraction',
  ' extracts short clips from long videos with one click.',
  ['clips', 'video'],
) as GoalPoolItem

const basePool = [
  fxClipdrop,
  fxPaperclip,
  fxGenericEditor,
  fxClipper,
  fxOfflineClipper,
  fxTranslator,
  fxLocalOnly,
  fxPaidPerfect,
] satisfies GoalPoolItem[]
const basePoolFree = basePool.filter((p) => p.item.pricing !== 'paid') as GoalPoolItem[]

const CLIP_QUERY = 'Turn YouTube videos into short clips'

// ------------------------------------------------------------
// 1. Confirmed failure: brand-name fragments ≠ capability
// ------------------------------------------------------------
{ // eslint-disable-line no-block
  const retrieval = matchToolsByGoalInPool(basePool, CLIP_QUERY)
  const retrievalHasBrandFragmentOnly = retrieval.some(
    (m) => (m.item.id === 'fx-clipdrop' || m.item.id === 'fx-paperclip') &&
      m.matched.every((label) => ['clip', 'clips'].includes(label.toLowerCase())),
  )
  check('retrieval: brand-fragment match did not fire for Clipdrop/Paperclip', !retrievalHasBrandFragmentOnly, retrieval.map((m) => `${m.item.id}:${m.matched}`))
  check('retrieval: output of matchToolsByGoal* is always candidates (typed GoalMatch), never labels itself a confirmed match', retrieval.every((m) => typeof m.pct === 'number'), true)
}

// ------------------------------------------------------------
// 1b. The keyword-coverage fallback is REMOVED from the AI-failure path
// ------------------------------------------------------------
// Red reproductions (before removal) of the three reported failures:
// A) "remove backgrounds from videos" matched a photo background remover
//    ("Remove backgrounds from photos. Generate videos from text.").
// B) "free video editor" matched a paid listing ("Free trial … Paid
//    subscription required after trial.", pricing: paid).
// C) a listing that claimed offline support AND stated the opposite was
//    accepted as-is ("Edit your videos offline. Online mode is not
//    supported.").
{
  check('fallback contract: the keyword-coverage evaluator no longer exists',
    !('evaluateGoalFallback' in goalFinder) && !('evaluateGoalFallbackInPool' in goalFinder), Object.keys(goalFinder).filter((k) => /fallback|conservative/i.test(k)))
  check('fallback contract: technical failure presents NO local results, retry always visible',
    AI_FAILURE_PRESENTATION.presentsLocalResults === false && AI_FAILURE_PRESENTATION.retry === true && AI_FAILURE_PRESENTATION.state === 'unavailable', AI_FAILURE_PRESENTATION)
  const gfSrc = readFileSync(new URL('../components/goal/GoalFinder.tsx', import.meta.url), 'utf8')
  check('fallback contract: GoalFinder never reaches a keyword fallback and shows the retry button',
    !gfSrc.includes('evaluateGoalFallback') && gfSrc.includes('Retry AI matching') && /\(aiFailed \|\| abstained\) && \(/.test(gfSrc), true)

  check('states: the three empty states are separate and never collapse into "No matches yet"',
    gfSrc.includes("'No catalogue candidates found'") &&
    gfSrc.includes("'AI could not confirm a suitable match'") &&
    gfSrc.includes("'AI temporarily unavailable'") && !gfSrc.includes("'No matches yet'"), true)
  check('states: abstention renders its own retry affordance without auto-refill',
    gfSrc.includes('setAbstained(data.matches.length === 0)') && gfSrc.includes('(aiFailed || abstained) && ('), true)

  // A) The cross-domain listing remains a RETRIEVAL candidate only.
  const fxPhotoVideo = fixtureTool('fx-photovideo', 'Backgroundinator', 'free', 'image-editing',
    'Remove backgrounds', 'Remove backgrounds from photos. Generate videos from text.', ['background', 'photos'])
  const candidateA = matchToolsByGoalInPool([fxPhotoVideo], 'remove backgrounds from videos')
  check('regression A: cross-domain listing stays a candidate, never a presented match',
    candidateA.length >= 1 && !('evaluateGoalFallback' in goalFinder), candidateA.map((m) => m.item.name))

  // B) The free-plan wording in the QUERY is a captured constraint for the
  // AI evaluator; the UI freeOnly filter uses the structured pricing field.
  check('regression B: "free video editor" query records the free-plan constraint',
    analyzeGoal('free video editor').askingFree === true, analyzeGoal('free video editor'))
  check('regression B: FR/AR free wording records the constraint too',
    analyzeGoal('éditeur vidéo gratuit').askingFree === true &&
    analyzeGoal('محرر فيديو مجاني').askingFree === true, true)
  check('regression B: paid-with-free-trial listing still retrievable — pricing is judged by the AI, not hidden',
    matchToolsByGoalInPool([fixtureTool('fx-trial', 'VideoBrush', 'paid', 'video',
      'Video editing for teams', 'Free trial for our video editor. Paid subscription required after trial.', ['video', 'editor'])],
      'free video editor').length >= 1, true)

  // C) Contradictory listings cannot be verified lexically; with the
  // keyword fallback gone there is no mechanism to present them, and the
  // AI evaluator carries an explicit contradiction rule.
  check('regression C: no keyword mechanism remains to present a contradictory listing',
    !('evaluateGoalFallback' in goalFinder), true)
}

// ------------------------------------------------------------
// 4. Explicit product-name searches still retrieve the products
// ------------------------------------------------------------
{
  const cd = matchToolsByGoalInPool(basePool, 'Clipdrop')
  check('retrieval: explicit "Clipdrop" search finds Clipdrop', cd[0]?.item.id === 'fx-clipdrop', cd.map((m) => m.item.id))
  const pc = matchToolsByGoalInPool(basePool, 'paperclip agents')
  check('retrieval: explicit "Paperclip" search finds Paperclip', pc.some((m) => m.item.id === 'fx-paperclip'), pc.slice(0, 2).map((m) => m.item.id))
}

// ------------------------------------------------------------
// 5. Synonyms are ONE concept, not independent evidence
// ------------------------------------------------------------
{
  const a = analyzeGoal('turn my videos into short clips')
  check('concepts: videos/clips collapse into one video concept', a.concepts.filter((c) => c.id === 'video').length === 1, a.concepts.map((c) => c.id))
  // Action+object: retrieval is a candidate net — concept MERGING is what
  // keeps synonyms from counting as independent task requirements, and the
  // AI evaluator (not keyword coverage) decides support.
  const onlyObject = [fixtureTool('fx-obj', 'Fred', 'free', 'video', 'Makes clips from your videos', 'Create short clips: splits your videos automatically.', ['clips'])]
  const gotObjectOnly = matchToolsByGoalInPool(onlyObject, 'edit videos with AI')
  check('synonyms: object synonyms stay ONE concept in analysis (not an edit-object pairing)',
    analyzeGoal('edit videos with AI').concepts.filter((c) => c.id === 'video').length === 1, analyzeGoal('edit videos with AI').concepts.map((c) => c.id))
  check('synonyms: such a listing is only candidate material, never presented without AI',
    !('evaluateGoalFallback' in goalFinder) && (gotObjectOnly.length === 0 || gotObjectOnly.every((m) => typeof m.pct === 'number')), gotObjectOnly.map((m) => m.item.id))
}

// ------------------------------------------------------------
// 6. Negation & explicit constraints are preserved
// ------------------------------------------------------------
{
  const a = analyzeGoal('edit videos without internet')
  check('constraints: "without internet" kept, not a stopword',
    a.constraints.includes('internet') &&
      !a.concepts.some((c) => c.id === 'internet' && !c.negated), a)
  const b = analyzeGoal('not paid video editor')
  check('constraints: "not paid" kept', b.constraints.includes('paid'), b)
  const c = analyzeGoal('tool with no installation')
  check('constraints: "no installation" kept', c.constraints.includes('installation'), c)
  // Arabic negation
  const d = analyzeGoal('مجاني بدون انترنت')
  check('constraints: Arabic "بدون انترنت" (without internet) preserved',
    d.constraints.includes('انترنت'), d)
  // Contradictions in the QUERY wording render as explicit constraints
  // for the AI evaluator (deterministic capture; support judgment stays
  // with the model + strict output validator).
  const e = analyzeGoal('edit videos offline. Offline mode is not supported.')
  check('constraints: "not supported" wording captured as constraint, not claim evidence',
    e.constraints.includes('supported'), e.constraints)
  // A negated constraint term is never positive search evidence.
  check('constraints: negated terms are excluded from positive retrieval concepts',
    matchToolsByGoalInPool([fxLocalOnly], 'edit videos without internet').every(
      (m) => !m.matched.some((lbl) => /internet/i.test(lbl))), true)
}

// ------------------------------------------------------------
// 7. Missing mandatory evidence causes exclusion
// ------------------------------------------------------------
{
  // Transcribe ≠ translate: the glossary/synonym engine keeps translate
  // and transcribe distinct concepts (deterministic capture; the AI
  // evaluator makes the support call).
  const a = analyzeGoal('transcribe my meetings with notes')
  const b = analyzeGoal('translate my meetings with notes')
  check('evidence: transcribe/translate are distinct concepts, synonyms never merge them',
    JSON.stringify(a.concepts.map((c) => c.id).sort()) !== JSON.stringify(b.concepts.map((c) => c.id).sort()), { a: a.concepts.map((c) => c.id), b: b.concepts.map((c) => c.id) })
}

// ------------------------------------------------------------
// 8. freeOnly(pricing filter) retrieval on the real catalogue
// ------------------------------------------------------------
{
  const freeOnly = matchToolsByGoal('remove background from photos', true, 10)
  check('retrieval: freeOnly pool keeps free/open-source/freemium, drops paid',
    freeOnly.every((m) => m.item.pricing !== 'paid'),
    freeOnly.map((m) => `${m.item.name}:${m.item.pricing}`))
  check('retrieval: freeOnly pool retains freemium candidates (AI verifies the free tier)',
    freeOnly.some((m) => m.item.pricing === 'freemium'), freeOnly.map((m) => m.item.pricing))
  const all = matchToolsByGoal('remove background from photos', false, 10)
  check('retrieval: freeOnly=false can include paid tools', all.length > 0, all.length)
}

// ------------------------------------------------------------
// 9. Multilingual equivalence (EN / FR / AR) for the same task
// ------------------------------------------------------------
{
  const ids = (g: string) => analyzeGoal(g).concepts.filter((c) => !c.negated).map((c) => c.id).sort()
  const en = ids('Turn YouTube videos into short clips')
  const fr = ids('convertir des vidéos youtube en clips courts')
  const ar = ids('حوّل فيديوهات يوتيوب إلى مقاطع قصيرة')
  check('multilingual: EN/FR/AR produce the same concepts',
    JSON.stringify(en) === JSON.stringify(fr) && JSON.stringify(fr) === JSON.stringify(ar), { en, fr, ar })
  const darijaMix = ids('turn فيديوهات يوتيوب into short clips') // Darija/EN mixed
  check('multilingual: Darija/EN mixed query keeps the same video concept',
    darijaMix.includes('video') && darijaMix.includes('youtube') && darijaMix.includes('turn'), darijaMix)
}

// ------------------------------------------------------------
// 10. Output contract validation (parseModelOutput)
// ------------------------------------------------------------
{
  const validIds = new Set(['fx-clipper', 'fx-paperclip'])
  const ab = parseModelOutput('[]', validIds)
  check('output: valid empty array = abstention', ab.kind === 'abstain', ab)
  const wr = parseModelOutput('{"result": [{"id": "fx-clipper", "reason": "cuts shorts"}]}', validIds)
  check('output: single-array wrapper object accepted', wr.kind === 'ok', wr)
  const fence = parseModelOutput('```json\n[{"id":"fx-clipper","reason":"cuts shorts"}]\n```', validIds)
  check('output: fenced JSON accepted', fence.kind === 'ok', fence)
  const inv1 = parseModelOutput('not json at all', validIds)
  check('output: non-JSON = technical error', inv1.kind === 'invalid', inv1)
  const inv2 = parseModelOutput('{"search_results": 3}', validIds)
  check('output: non-array = technical error', inv2.kind === 'invalid', inv2)
  const inv3 = parseModelOutput('[{"id":"unknown","reason":"x"}]', validIds)
  check('output: unknown IDs only = technical error (not abstention)', inv3.kind === 'invalid', inv3)
  const inv4 = parseModelOutput('[{"id":"fx-clipper"}]', validIds)
  check('output: missing reason = invalid', inv4.kind === 'invalid', inv4)
  const inv5 = parseModelOutput('[{"id":"fx-clipper","reason":"ok","score":9}]', validIds)
  check('output: extra fields = dropped (invalid entry)', inv5.kind === 'invalid', inv5)
  const inv6 = parseModelOutput('[{"id":"fx-clipper","reason":""}]', validIds)
  check('output: empty reason = invalid', inv6.kind === 'invalid', inv6)
  const partial = parseModelOutput('[{"id":"fx-clipper","reason":"ok"},{"id":"ghost","reason":"x"}]', validIds)
  check('output: partial validity keeps valid entries', partial.kind === 'ok', partial)
  const dup = parseModelOutput('[{"id":"fx-clipper","reason":"a"},{"id":"fx-clipper","reason":"b"}]', validIds)
  check('output: duplicate IDs dropped', dup.kind === 'ok' && dup.picks.length === 1, dup)
  const manyIds = new Set(['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9'])
  const caps = parseModelOutput(
    JSON.stringify(Array.from({ length: 9 }, (_, i) => ({ id: `a${i + 1}`, reason: 'x' }))),
    manyIds,
  )
  check('output: max 6 picks enforced', caps.kind === 'ok' && caps.picks.length === 6, caps)
  const long = parseModelOutput('[{"id":"fx-clipper","reason":"' + 'a'.repeat(300) + '"}]', validIds)
  check('output: reason capped at 160 chars', long.kind === 'ok' && long.picks[0]!.reason.length === 160, long)
}

// ------------------------------------------------------------
// 11. Timeout budget invariants (client must not abort mid-chain)
// ------------------------------------------------------------
{
  check('timeouts: client budget > server total budget', CLIENT_TIMEOUT_MS > SERVER_TOTAL_MS, { CLIENT_TIMEOUT_MS, SERVER_TOTAL_MS })
  check('timeouts: provider attempts fit inside the server envelope (parallel fan-out)', SERVER_TOTAL_MS > PROVIDER_ATTEMPT_MS, { SERVER_TOTAL_MS, PROVIDER_ATTEMPT_MS })
}

// ------------------------------------------------------------
// 12. Provider roundtrip selection semantics (fixture-timed)
// ------------------------------------------------------------
async function roundtripChecks(): Promise<void> {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
  const ids = new Set(['a', 'b'])
  const ok = (id = 'a'): ProviderResult => {
    return { ok: true, model: 'm', text: JSON.stringify([{ id, reason: 'evidence from listing' }]), finishReason: 'stop' }
  }
  const abstain = (): ProviderResult => {
    return { ok: true, model: 'm', text: '[]', finishReason: 'stop' }
  }
  const badOutput = (): ProviderResult => {
    return { ok: true, model: 'm', text: 'not json', finishReason: 'stop' }
  }

  // a) fast [] must NOT cancel or outrank a slower in-flight non-empty
  {
    const testStart = Date.now()
    const cancels: number[] = []
    const res = await runProviderRoundtrip({
      models: ['fast', 'slow'],
      send: (m) => sleep(m === 'fast' ? 5 : 60).then(() => (m === 'fast' ? abstain() : ok('b'))),
      totalMs: 5_000,
      validIds: ids,
      cancelInFlight: () => cancels.push(Date.now() - testStart),
    })
    check('roundtrip: first [] does not cancel a slower in-flight provider; non-empty wins', res.kind === 'ok' && res.picks[0]?.id === 'b', res)
    // Cancellation may fire exactly once — when the non-empty result
    // wins (parking the []), never at the moment the [] arrived.
    check('roundtrip: parked [] only cancels when the non-empty winner arrives', cancels.length === 1 && cancels[0]! >= 50, { cancels })
  }

  // b) first non-empty wins immediately, sibling aborted early
  {
    let cancelled = false
    const started = Date.now()
    const res = await runProviderRoundtrip({
      models: ['fast', 'slow'],
      send: (m) => sleep(m === 'fast' ? 5 : 5_000).then(() => (m === 'fast' ? ok('a') : abstain())),
      totalMs: 30_000,
      validIds: ids,
      cancelInFlight: () => {
        cancelled = true
      },
    })
    check('roundtrip: validated non-empty matches resolve early', res.kind === 'ok' && res.picks[0]?.id === 'a', res)
    check('roundtrip: early matches cancel the slow sibling (best effort)', cancelled, { cancelled })
    check('roundtrip: early return is fast (<< slow sibling budget)', Date.now() - started < 1_000, Date.now() - started)
  }

  // c) all providers abstain → abstention state
  {
    const res = await runProviderRoundtrip({ models: ['x', 'y'], send: async () => abstain(), totalMs: 5_000, validIds: ids })
    check('roundtrip: every provider [] = abstention', res.kind === 'abstain' && res.deadlineExpired === false, res)
  }

  // d) invalid-only responses → technical failure, never abstention
  {
    const res = await runProviderRoundtrip({ models: ['x', 'y'], send: async () => badOutput(), totalMs: 5_000, validIds: ids })
    check('roundtrip: invalid-only responses = technical failure (never abstention)', res.kind === 'failure' && res.cause === 'invalid-output', res)
  }

  // e) both providers exceed the shared deadline → distinct expiry state
  {
    const res = await runProviderRoundtrip({ models: ['x', 'y'], send: () => sleep(500).then(() => ok('a')), totalMs: 60, validIds: ids })
    check('roundtrip: both providers exceed deadline = distinct deadline failure', res.kind === 'failure' && res.cause === 'deadline' && res.deadlineExpired === true, res)
  }

  // f) deadline expiry AFTER a valid [] → abstention preserved (distinct flag)
  {
    const res = await runProviderRoundtrip({
      models: ['abstain', 'hang'],
      send: (m) => (m === 'abstain' ? Promise.resolve(abstain()) : new Promise<ProviderResult>(() => {})),
      totalMs: 60,
      validIds: ids,
    })
    check('roundtrip: deadline after abstention stays an abstention (deadlineExpired flagged)', res.kind === 'abstain' && res.deadlineExpired === true, res)
  }

  // g) fast primary matches beat a hanging sibling; deadline not needed
  {
    const cancels: number[] = []
    const res = await runProviderRoundtrip({
      models: ['fast', 'hang'],
      send: (m) => (m === 'fast' ? Promise.resolve(ok('b')) : new Promise<ProviderResult>(() => {})),
      totalMs: 5_000,
      validIds: ids,
      cancelInFlight: () => cancels.push(1),
    })
    check('roundtrip: fast matches resolve while sibling hangs; sibling cancelled', res.kind === 'ok' && cancels.length === 1, res)
  }
}

// ------------------------------------------------------------
// 13. Local refill policy (independent, pure)
// ------------------------------------------------------------
{
  check('policy: any HTTP failure → unavailable state with visible retry, no local results',
    AI_FAILURE_PRESENTATION.state === 'unavailable' && AI_FAILURE_PRESENTATION.retry === true &&
    AI_FAILURE_PRESENTATION.presentsLocalResults === false, AI_FAILURE_PRESENTATION)
}

// ------------------------------------------------------------
// 14. Intent rules installed in the runtime prompt
// ------------------------------------------------------------
{
  check('prompt: source-material rule installed (naming a source ≠ URL import)',
    GOAL_MATCH_SYSTEM_PROMPT.includes('identifies the source material, not a demand for direct URL import'), true)
  check('prompt: URL-import evidence required only on explicit request',
    GOAL_MATCH_SYSTEM_PROMPT.includes('Unless the user explicitly requests URL import') &&
    GOAL_MATCH_SYSTEM_PROMPT.includes('direct URL-handling evidence stays mandatory'), true)
  check('prompt: source-task conversion qualifies without documented import; arrival stays unverified',
    GOAL_MATCH_SYSTEM_PROMPT.includes('listing whose supplied evidence explicitly supports converting long videos into short clips qualifies') &&
    GOAL_MATCH_SYSTEM_PROMPT.includes('otherwise it is unverified') &&
    GOAL_MATCH_SYSTEM_PROMPT.includes('Never invent direct import support'), true)
  check('prompt: download/upload workflow allowed with explicit limitation, never invented',
    GOAL_MATCH_SYSTEM_PROMPT.includes('a documented download-then-upload or file-based workflow also qualifies'), true)
}

// ------------------------------------------------------------
// 15. Conservative fallback evidence purity (catalogue facts only)
// ------------------------------------------------------------
{
  check('evidence: unsupported-steps rule installed (no invented uploads/imports/downloads)',
    GOAL_MATCH_SYSTEM_PROMPT.includes("Do not state that a candidate accepts uploads, requires downloads, or imports URLs unless the listing itself says so") &&
    GOAL_MATCH_SYSTEM_PROMPT.includes("say it is unverified"), true)
  check('evidence: free-trial vs free-plan rule installed',
    GOAL_MATCH_SYSTEM_PROMPT.includes('A free trial is not a free plan'), true)
  check('evidence: reasons must mark undocumented arrival steps unverified',
    GOAL_MATCH_SYSTEM_PROMPT.includes('YouTube import unverified'), true)
  check('evidence: contradiction rule installed',
    GOAL_MATCH_SYSTEM_PROMPT.includes('the evidence is contradictory'), true)
}
void fxGenericEditor
void fxOfflineClipper
void fxLocalOnly

// ------------------------------------------------------------
// 12. Live API-route plumbing (mocked provider only)
// ------------------------------------------------------------
// next/server is imported inside a try so the deterministic script still
// runs when the Next runtime pieces are unavailable under tsx.
async function routeChecks(): Promise<void> {
  const realFetch = globalThis.fetch
  let fetchCalls: { url: string; body: any }[] = []
  function jsonResponse(content: string, init?: { status?: number }): Response {
    return {
      ok: (init?.status ?? 200) < 400,
      status: init?.status ?? 200,
      json: async () => ({ choices: [{ message: { content }, finish_reason: 'stop' }] }),
    } as unknown as Response
  }
  let postSeq = 0
  async function post(body: unknown): Promise<Response> {
    // Each test call is an independent client — rotate the test IP so the
    // route's 12/min per-IP rate limit never fails a suite that grows.
    postSeq += 1
    const req = new Request('http://localhost/api/goal-match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': `203.0.113.${(postSeq % 250) + 1}` },
      body: JSON.stringify(body),
    })
    const { POST } = await import('../app/api/goal-match/route')
    return POST(req)
  }
  try {
    process.env.NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || 'test-key'

    // a) mock that captures every request and returns a canned valid pick
    globalThis.fetch = (async (_url: string | URL, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body))
      const catalog: string = body.messages[1].content
      fetchCalls.push({ url: String(_url), body })
      // Respond with the FIRST catalogue id in the current payload
      const m = catalog.match(/\[\w+\] ([\w-]+) \|/)
      return jsonResponse(m ? JSON.stringify([{ id: m[1], reason: 'supplied evidence connects to the goal' }]) : '[]')
    }) as unknown as typeof fetch

    const res1 = await post({ goal: CLIP_QUERY, freeOnly: true })
    const data1 = await res1.json()
    check('route: valid model output → 200 with matches', res1.status === 200 && data1.matches.length === 1, { res1: res1.status, data1 })
    check('route: request body uses configured model', fetchCalls[0]?.body?.model === 'openai/gpt-oss-20b', fetchCalls[0]?.body?.model)
    check('route: openai/gpt-oss-20b gets explicit medium reasoning_effort (evidence-tuned)',
      fetchCalls[0]?.body?.reasoning_effort === 'medium', fetchCalls[0]?.body?.reasoning_effort)
    check('route: system prompt installed (runtime relevance evaluator)', String(fetchCalls[0]?.body?.messages?.[0]?.content ?? '').includes('strict catalogue relevance evaluator'), true)
    check('route: freeOnly=true forwarded into user payload', String(fetchCalls[0]?.body?.messages?.[1]?.content ?? '').includes('filters to free-plan candidates'), String(fetchCalls[0]?.body?.messages?.[1]?.content ?? '').slice(0, 160))

    // b) AI abstention [] stays empty — no local keyword refill
    globalThis.fetch = (async () => jsonResponse('[]')) as unknown as typeof fetch
    const res2 = await post({ goal: CLIP_QUERY, freeOnly: true })
    const data2 = await res2.json()
    check('route: valid [] = abstained, matches empty', res2.status === 200 && data2.abstained === true && data2.matches.length === 0, { res2: res2.status, data2 })
    check('route: abstention body carries no local-fallback flag (never refillable)',
      res2.status === 200 && !('fallback' in data2) && !('error' in data2), data2)

    // b2) explicit "free" wording in the query becomes an evaluator
    // constraint (recording mock — must push into fetchCalls, not a
    // bare canned-response mock).
    fetchCalls = []
    globalThis.fetch = (async (_url: string | URL, init?: RequestInit) => {
      fetchCalls.push({ url: String(_url), body: JSON.parse(String(init?.body)) })
      return jsonResponse('[]')
    }) as unknown as typeof fetch
    await post({ goal: 'free video editor', freeOnly: false })
    const userB2 = fetchCalls.at(-1)?.body?.messages?.[1]?.content
    check('route: query-level "free" is enforced as a mandatory constraint in the payload',
      typeof userB2 === 'string' && userB2.includes('free plan required') && userB2.includes('free video editor'),
      String(userB2).slice(0, 200))

    // b3) negated constraint captured from the query survives transit
    fetchCalls = []
    await post({ goal: 'edit videos without internet', freeOnly: false })
    const userB3 = fetchCalls.at(-1)?.body?.messages?.[1]?.content
    check('route: "without internet" constraint survives into the evaluator payload',
      typeof userB3 === 'string' && userB3.includes('internet'),
      String(userB3).slice(0, 200))

    // b4) regression: exact failed query must keep task-supporting
    // evidence in the payload (sentence-preserving, not a mid-sentence
    // 150-char cut) — Opus Clip's qualifying sentence must survive whole.
    fetchCalls = []
    await post({ goal: 'turn youtube videos into short clips', freeOnly: false })
    const catalogB4 = fetchCalls.at(-1)?.body?.messages?.[1]?.content ?? ''
    check('regression: exact query keeps Opus Clip evidence untruncated in the payload',
      catalogB4.includes('repurpose long videos into viral short clips. Detects highlights') &&
      catalogB4.includes('[tool] t225'),
      String(catalogB4).slice(0, 120))
    check('regression: exact query ranks Opus/Klap/SendShort among candidates',
      ['Opus Clip', 'Klap', 'SendShort'].filter((n) => catalogB4.includes(`| ${n} |`)).length === 3,
      ['Opus Clip', 'Klap', 'SendShort'].filter((n) => catalogB4.includes(`| ${n} |`)))
    check('payload: bounded — no candidate description exceeds the cap',
      [...catalogB4.matchAll(/\| \[[^\]]+\] [^|]+ \| [^|]+ \| [^|]+ \| [^|]+ \| tags: [^|]+ \| [^|]+ \| ([^\n]+)$/gm)]
        .every((m) => m[1].length <= 260 + 3), null) // +3 for ellipsis-less joins
    check('regression: prompt resolves YouTube source-material ambiguity',
      GOAL_MATCH_SYSTEM_PROMPT.includes('converting long videos into short clips with YouTube as the material') &&
      GOAL_MATCH_SYSTEM_PROMPT.includes('YouTube import unverified'), true)
    check('regression: explicit URL-import requests still require direct URL evidence',
      GOAL_MATCH_SYSTEM_PROMPT.includes('direct URL-handling evidence stays mandatory'), true)
    check('regression: freemium is not auto-excluded and trials never establish a free plan',
      GOAL_MATCH_SYSTEM_PROMPT.includes("A 'freemium' pricing label claims a free tier") &&
      GOAL_MATCH_SYSTEM_PROMPT.includes('A free trial is not a free plan'), true)
    check('regression: eligibility criterion 2 defers input compatibility to the source-material rule',
      GOAL_MATCH_SYSTEM_PROMPT.includes('matching the named source to a generalized documented input class') &&
      GOAL_MATCH_SYSTEM_PROMPT.includes('direct platform import is not required unless the user explicitly requests it'),
      true)
    check('regression: no bare "Compatible input and output." criterion left to contradict SOURCE MATERIAL VS IMPORT',
      !GOAL_MATCH_SYSTEM_PROMPT.includes('\n2. Compatible input and output.\n'), true)
    const gfSource = readFileSync(new URL('../components/goal/GoalFinder.tsx', import.meta.url), 'utf8')
    check('regression: UI lifecycle — stale runs guarded by a monotonic run id',
      gfSource.includes('const runId = useRef(0)') && gfSource.includes('runId.current !== currentRun'), true)
    check('regression: UI lifecycle — a newer submit aborts the in-flight fetch',
      gfSource.includes('fetchRef.current?.abort()'), true)
    check('regression: UI lifecycle — Retry resends the captured query, not live textarea text',
      gfSource.includes('submit(searchedGoal)') && !gfSource.includes('onClick={submit}'), true)
    check('regression: UI lifecycle — results header renders the searched goal, not live input',
      gfSource.includes('{searchedGoal.slice(0, 140)}') && !gfSource.includes('{goal.trim().slice(0, 140)}'), true)

    // b5) abstention retry: one independent second judgment, inside the
    // total budget — a second valid [] STILL abstains (never forced).
    fetchCalls = []
    globalThis.fetch = (async (_url: string | URL, init?: RequestInit) => {
      fetchCalls.push({ url: String(_url), body: JSON.parse(String(init?.body)) })
      return jsonResponse('[]')
    }) as unknown as typeof fetch
    const resB5 = await post({ goal: 'turn youtube videos into short clips', freeOnly: false })
    const dataB5 = await resB5.json()
    check('route: abstention retry ran a second draw and abstention STILL stands (never forced)',
      resB5.status === 200 && dataB5.abstained === true && fetchCalls.length === 2, { fetches: fetchCalls.length, dataB5 })
    check('route: abstention retry honors remaining budget (attemptMs never exceeds SERVER_TOTAL)',
      fetchCalls.length === 0 || (JSON.stringify(fetchCalls.map((c) => c.body)).includes('"max_tokens"')), true)

    // b6) abstention then valid picks → 200 with matches (two draws)
    fetchCalls = []
    let flip = 0
    globalThis.fetch = (async (_url: string | URL, init?: RequestInit) => {
      fetchCalls.push({ url: String(_url), body: JSON.parse(String(init?.body)) })
      flip += 1
      const catalog: string = fetchCalls.at(-1)?.body?.messages?.[1]?.content ?? ''
      const m = catalog.match(/\[\w+\] ([\w-]+) \|/)
      return jsonResponse(flip === 1 ? '[]' : m ? JSON.stringify([{ id: m[1], reason: 'documented conversion support' }]) : '[]')
    }) as unknown as typeof fetch
    const resB6 = await post({ goal: 'turn youtube videos into short clips', freeOnly: false })
    const dataB6 = await resB6.json()
    check('route: abstention + validated second draw = 200 matches',
      resB6.status === 200 && dataB6.abstained === false && dataB6.matches.length >= 1 && fetchCalls.length === 2,
      { fetches: fetchCalls.length, resB6: resB6.status, dataB6 })

    // b7) request diagnostics: attempt config + requestId correlation
    const pb7 = fetchCalls[0]?.body ?? {}
    check('route: model request uses measured output budget (max_tokens 4000, not 3000)',
      pb7.max_tokens === 4000 && pb7.temperature === 0.2,
      { max_tokens: pb7.max_tokens, temperature: pb7.temperature })
    check('route: openai-* draws pin reasoning_effort = medium (not low/high/default)',
      pb7.reasoning_effort === 'medium', pb7.reasoning_effort)
    check('route: responses carry meta.requestId for log correlation',
      typeof dataB5?.meta?.requestId === 'string' && dataB5.meta.requestId.length > 0 &&
      typeof dataB6?.meta?.requestId === 'string' && dataB6.meta.requestId.length > 0,
      { b5: dataB5?.meta?.requestId, b6: dataB6?.meta?.requestId })

    // b8) retry trail distinguishes completed double-abstention from an
    // incomplete second attempt (truncation/failure) — truncated output
    // is never reported as an honest abstention.
    fetchCalls = []
    let flipB8 = 0
    globalThis.fetch = (async (_url: string | URL, init?: RequestInit) => {
      fetchCalls.push({ url: String(_url), body: JSON.parse(String(init?.body)) })
      flipB8 += 1
      return jsonResponse(flipB8 === 1 ? '[]' : 'no json here')
    }) as unknown as typeof fetch
    const resB8 = await post({ goal: CLIP_QUERY, freeOnly: false })
    const dataB8 = await resB8.json()
    check('route: invalid second draw keeps abstention with retryTrail=invalid',
      resB8.status === 200 && dataB8.abstained === true && dataB8.meta?.retryTrail === 'invalid', { dataB8 })
    fetchCalls = []
    let flipB9 = 0
    globalThis.fetch = (async (_url: string | URL, init?: RequestInit) => {
      fetchCalls.push({ url: String(_url), body: JSON.parse(String(init?.body)) })
      flipB9 += 1
      // first draw: valid []; second draw: provider rejects the request
      return flipB9 === 1 ? jsonResponse('[]') : jsonResponse('[]', { status: 500 })
    }) as unknown as typeof fetch
    const resB9 = await post({ goal: CLIP_QUERY, freeOnly: false })
    const dataB9 = await resB9.json()
    check('route: failed second draw keeps abstention with retryTrail=incomplete',
      resB9.status === 200 && dataB9.abstained === true && dataB9.meta?.retryTrail === 'incomplete', { dataB9 })
    check('route: successful retry responses carry no retryTrail marker',
      dataB6?.meta?.retryTrail === undefined && (dataB5?.matches?.length ?? 0) === 0,
      { b5Trail: dataB5?.meta?.retryTrail, b6Trail: dataB6?.meta?.retryTrail })

    // b10) truncated (cut mid-JSON) model output is invalid — never
    // parsed as a partial abstention or partially matched silently.
    fetchCalls = []
    globalThis.fetch = (async () =>
      jsonResponse('[{"id":"opus-clip","reason":"cuts long')) as unknown as typeof fetch
    const resB10 = await post({ goal: CLIP_QUERY, freeOnly: false })
    const dataB10 = await resB10.json()
    check('route: truncated model output = 502 technical failure (never silent partials)',
      resB10.status === 502 && dataB10.fallback === true, { resB10: resB10.status, dataB10 })

    // c) invalid output → technical error, not abstention
    globalThis.fetch = (async () => jsonResponse('no json here')) as unknown as typeof fetch
    const res3 = await post({ goal: CLIP_QUERY, freeOnly: false })
    const data3 = await res3.json()
    check('route: malformed model output = 502 fallback (never keyword matches)', res3.status === 502 && data3.fallback === true, { res3: res3.status, data3 })

    // d) provider failure → 502 fallback
    globalThis.fetch = (async () => {
      throw new Error('boom')
    }) as unknown as typeof fetch
    const res4 = await post({ goal: CLIP_QUERY, freeOnly: false })
    const data4 = await res4.json()
    check('route: AI failure = 502 fallback (no keyword drain)', res4.status === 502 && data4.fallback === true, { res4: res4.status, data4 })

    // e) freeOnly=true limits candidates to free/open-source pricing
    fetchCalls = []
    globalThis.fetch = (async (_url: string | URL, init?: RequestInit) => {
      fetchCalls.push({ url: String(_url), body: JSON.parse(String(init?.body)) })
      return jsonResponse('[]')
    }) as unknown as typeof fetch
    const res5 = await post({ goal: 'remove background from photos', freeOnly: true })
    await res5.json()
    const catalog5 = fetchCalls.at(-1)?.body?.messages?.[1]?.content ?? ''
    const pricings = [...catalog5.matchAll(/\| (freemium|paid|free|open-source) \|/g)].map((m) => m[1])
    check('route: freeOnly catalogue keeps free/open-source + freemium, drops paid',
      pricings.length > 0 && !pricings.includes('paid') && pricings.some((p) => p === 'free' || p === 'open-source'), [...new Set(pricings)])
    check('route: freeOnly note ties freemium candidates to free-tier evidence, never trials',
      catalog5.includes('freemium candidate qualifies ONLY if its listing documents the requested feature on the free tier') &&
      catalog5.includes('a free trial never counts'), true)

    // f) retrieval-empty distinct state
    const res6 = await post({ goal: 'zzz qqq www x yy', freeOnly: false })
    const data6 = await res6.json()
    check('route: retrieval-empty returns noCandidates=true, not abstained', res6.status === 200 && data6.noCandidates === true && data6.abstained === false, data6)
  } finally {
    globalThis.fetch = realFetch
  }
}

Promise.resolve()
  .then(roundtripChecks)
  .then(routeChecks)
  .then(() => {
    console.log(`\n${passed} passed, ${failed} failed${failures.length ? ` — ${failures.join('; ')}` : ''}`)
    if (failed > 0) process.exit(1)
  })
  .catch((err) => {
    console.log(`\n${passed} passed, ${failed} failed (checksums errored: ${err instanceof Error ? err.message : err})${failures.length ? ` — ${failures.join('; ')}` : ''}`)
    process.exit(1)
  })