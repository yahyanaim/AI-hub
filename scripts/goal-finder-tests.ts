// ============================================================
// Goal-finder regression checks (deterministic — no live calls)
// Run: npx tsx scripts/goal-finder-tests.ts
//
// Deterministic checks validate plumbing and lexical behaviour with
// controlled catalogue fixtures. They do NOT prove real-model semantic
// relevance; live-provider checks are reported separately.
// ============================================================

import type { Tool } from '@/types'
import {
  analyzeGoal,
  matchToolsByGoalInPool,
  evaluateGoalFallbackInPool,
  matchToolsByGoal,
  type GoalPoolItem,
} from '@/lib/goal-finder'
import {
  parseModelOutput,
  type ParsedOutput,
} from '@/lib/goal-output'
import { runProviderRoundtrip, type ProviderResult } from '@/lib/goal-provider-roundtrip'
import { shouldRefillLocally } from '@/lib/goal-fallback-policy'
import { GOAL_MATCH_SYSTEM_PROMPT } from '@/lib/goal-prompt'
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
{
  const fallback = evaluateGoalFallbackInPool(basePool, CLIP_QUERY)
  const ids = fallback.map((m) => m.item.id)
  check('fallback: Clipdrop/Paperclip not presented as clip-tool matches', !ids.includes('fx-clipdrop') && !ids.includes('fx-paperclip'), ids)
  const retrieval = matchToolsByGoalInPool(basePool, CLIP_QUERY)
  const retrievalHasBrandFragmentOnly = retrieval.some(
    (m) => (m.item.id === 'fx-clipdrop' || m.item.id === 'fx-paperclip') &&
      m.matched.every((label) => ['clip', 'clips'].includes(label.toLowerCase())),
  )
  check('retrieval: brand-fragment match did not fire for Clipdrop/Paperclip', !retrievalHasBrandFragmentOnly, retrieval.map((m) => `${m.item.id}:${m.matched}`))
}

// ------------------------------------------------------------
// 2. Explicitly supporting clipper stays eligible
// ------------------------------------------------------------
{
  const fallback = evaluateGoalFallbackInPool(basePool, CLIP_QUERY)
  check('fallback: explicit YouTube clipper stays eligible', fallback.some((m) => m.item.id === 'fx-clipper'), fallback.map((m) => m.item.id))
}

// ------------------------------------------------------------
// 3. Generic video editor is insufficient
// ------------------------------------------------------------
{
  const genericOnly = [fxClipdrop, fxPaperclip, fxGenericEditor]
  const fallback = evaluateGoalFallbackInPool(genericOnly, CLIP_QUERY)
  check('fallback: generic video editor insufficient for shorts workflow', fallback.length === 0, fallback.map((m) => m.item.id))

  // Workflow honesty: no-YouTube-import tool still eligible if it supports
  // the clipping workflow, but direct YouTube URL claims are NOT invented.
  const noYouTube = [fxOfflineClipper]
  const fb2 = evaluateGoalFallbackInPool(noYouTube, 'Turn downloaded YouTube videos into short clips')
  check('fallback: downloaded-video clipping workflow eligible without URL import', fb2.some((m) => m.item.id === 'fx-offline-clipper'), fb2.map((m) => m.item.id))
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
  // edit+object requirement: one concept (object synonyms) is not two.
  const onlyObject = [fixtureTool('fx-obj', 'Fred', 'free', 'video', 'Makes clips from your videos', 'Create short clips: splits your videos automatically.', ['clips'])]
  const fbEditObject = evaluateGoalFallbackInPool(onlyObject, 'edit videos with AI')
  check('fallback: object synonyms alone do not satisfy action+object', fbEditObject.length === 0, fbEditObject.map((m) => m.item.id))
  const withAction = [fixtureTool('fx-act', 'FredEdit', 'free', 'video', 'AI video editor', 'A full editor for your videos with editing, trim and cut tools.', ['editing', 'video'])]
  const fbEditObject2 = evaluateGoalFallbackInPool(withAction, 'edit videos with AI')
  check('fallback: real editor covering action stays eligible', fbEditObject2.length > 0, fbEditObject2.map((m) => m.item.id))
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
  // Conservative fallback declines unverifiable constraints
  const fb = evaluateGoalFallbackInPool([fxLocalOnly], 'edit videos without internet')
  check('fallback: does not silently verify "without internet"', fb.length === 0, fb.map((m) => m.item.id))
}

// ------------------------------------------------------------
// 7. Missing mandatory evidence causes exclusion
// ------------------------------------------------------------
{
  // Translation/transcription distinction: transcribe tool must not match translate+dub query coverage locally
  const fbTrans = evaluateGoalFallbackInPool(
    [fixtureTool('fx-transcr', 'MeetNotes', 'free', 'productivity', 'Transcribe meetings', 'Real-time meeting transcription with speaker notes.', ['transcription'])],
    'transcribe my meetings with notes',
  )
  check('fallback: direct transcription listing eligible', fbTrans.length === 1, fbTrans.map((m) => m.item.id))
}

// ------------------------------------------------------------
// 8. freeOnly(pricing filter) retrieval on the real catalogue
// ------------------------------------------------------------
{
  const freeOnly = matchToolsByGoal('remove background from photos', true, 10)
  check('retrieval: freeOnly accepts only free/open-source pool',
    freeOnly.every((m) => m.item.pricing === 'free' || m.item.pricing === 'open-source'),
    freeOnly.map((m) => `${m.item.name}:${m.item.pricing}`))
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
  check('policy: 5xx allows local conservative refill', shouldRefillLocally(502) && shouldRefillLocally(500), true)
  check('policy: aborted/no-response (0) allows local refill', shouldRefillLocally(0), true)
  check('policy: 4xx never refilled', !shouldRefillLocally(400) && !shouldRefillLocally(429), true)
  check('policy: success never refilled (abstention returns before this path)', !shouldRefillLocally(200), true)
}

// ------------------------------------------------------------
// 14. Intent rules installed in the runtime prompt
// ------------------------------------------------------------
{
  check('prompt: source-material rule installed (naming a source ≠ URL import)',
    GOAL_MATCH_SYSTEM_PROMPT.includes('identifies the source material. It does not automatically require direct YouTube URL import'), true)
  check('prompt: URL-import evidence required only on explicit request',
    GOAL_MATCH_SYSTEM_PROMPT.includes('Require direct URL-import evidence only when the user explicitly requests URL import'), true)
  check('prompt: download/upload workflow allowed with explicit limitation, never invented',
    GOAL_MATCH_SYSTEM_PROMPT.includes('a documented download-then-upload or file-based workflow qualifies') &&
    GOAL_MATCH_SYSTEM_PROMPT.includes('Never invent direct import support'), true)
}

// ------------------------------------------------------------
// 15. Conservative fallback evidence purity (catalogue facts only)
// ------------------------------------------------------------
{
  const fluffy: GoalPoolItem = fixtureTool(
    'fx-fluffy',
    'ClipCraft Cloud',
    'freemium',
    'video-editor',
    'Unleash creativity and engage your audience effortlessly!',
    // Marketing copy with no catalogue facts about clipping workflows
    'A delightful experience for modern storytellers and ambitious teams. Loved by thousands.',
    ['creative', 'easy', 'popular'],
  )
  const pool = [fxClipper, fluffy]
  const rich = evaluateGoalFallbackInPool(pool, CLIP_QUERY)
  const anyFluffy = rich.some((m) => m.item.name === 'ClipCraft Cloud')
  check('fallback: marketing-only listing excluded (evidence must be catalogue facts)', !anyFluffy, rich.map((m) => m.item.name))
  check('fallback: listing with concrete clipping facts stays eligible', rich.some((m) => m.item.name === 'ShortsForge'), rich.map((m) => m.item.name))
}

// ------------------------------------------------------------
// 12. Live API-route plumbing (mocked provider only)
// ------------------------------------------------------------
// next/server is imported inside a try so the deterministic script still
// runs when the Next runtime pieces are unavailable under tsx.
async function routeChecks(): Promise<void> {
  const realFetch = globalThis.fetch
  let fetchCalls: { url: string; body: any }[] = []
  function jsonResponse(content: string): Response {
    return {
      ok: true,
      status: 200,
      json: async () => ({ choices: [{ message: { content }, finish_reason: 'stop' }] }),
    } as unknown as Response
  }
  async function post(body: unknown): Promise<Response> {
    const req = new Request('http://localhost/api/goal-match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '203.0.113.77' },
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
    check('route: system prompt installed (runtime relevance evaluator)', String(fetchCalls[0]?.body?.messages?.[0]?.content ?? '').includes('strict catalogue relevance evaluator'), true)
    check('route: freeOnly=true forwarded into user payload', String(fetchCalls[0]?.body?.messages?.[1]?.content ?? '').includes('free plan required'), String(fetchCalls[0]?.body?.messages?.[1]?.content ?? '').slice(0, 120))

    // b) AI abstention [] stays empty — no local keyword refill
    globalThis.fetch = (async () => jsonResponse('[]')) as unknown as typeof fetch
    const res2 = await post({ goal: CLIP_QUERY, freeOnly: true })
    const data2 = await res2.json()
    check('route: valid [] = abstained, matches empty', res2.status === 200 && data2.abstained === true && data2.matches.length === 0, { res2: res2.status, data2 })

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
    globalThis.fetch = (async () => jsonResponse('[]')) as unknown as typeof fetch
    const res5 = await post({ goal: 'remove background from photos', freeOnly: true })
    await res5.json()
    const catalog5 = fetchCalls.at(-1)?.body?.messages?.[1]?.content ?? ''
    const pricings = [...catalog5.matchAll(/\| (freemium|paid|free|open-source) \|/g)].map((m) => m[1])
    check('route: freeOnly catalogue limited to free/open-source', pricings.length > 0 && pricings.every((p) => p === 'free' || p === 'open-source'), pricings)

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