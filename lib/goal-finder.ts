// ============================================================
// Goal-first finder: match a plain-language goal against published
// catalogue listings. Scores come ONLY from existing record fields
// (name, tags, category, tagline, description) — never generated claims.
//
// Two clearly separated paths:
// - matchToolsByGoal: keyword RETRIEVAL. A wide net that produces
//   candidates; it never establishes task suitability on its own.
// - evaluateGoalFallback: CONSERVATIVE evaluation used only when the AI
//   ranker is technically unavailable. It qualifies a candidate as a
//   goal match only when the listing text covers EVERY query concept
//   (action + object + …), with at least two concepts supported by the
//   listing body itself. Anything else returns no matches — the UI then
//   shows a temporary-unavailable message instead of fake matches.
//
// Matching quality notes:
// - Unicode-aware tokenization + light stemming (editing/edit, photos/photo)
// - synonym CONCEPTS: "videos" and "clips" are ONE concept, never two
//   independent matched requirements
// - word-boundary matching: a query term can never match inside a brand
//   name ("clip" does not match "Clipdrop"/"Paperclip"); an explicit
//   product-name search ("Clipdrop") still retrieves the product
// - negation & constraints preserved ("without internet", "not paid",
//   "no installation" are recorded as constraints, not discarded)
// - typo tolerance (edit distance ≤ 1, both words ≥ 5 chars; substring
//   matching above that length only — it can no longer fabricate
//   capability evidence from brand-name fragments)
// ============================================================

import { SEED_TOOLS, SEED_DEV_TOOLS, SEED_REPOS } from '@/lib/seed'
import type { Tool, DevTool, Repo } from '@/types'

const STOP = new Set([
  'the', 'and', 'for', 'with', 'that', 'this', 'from', 'have', 'has',
  'want', 'need', 'like', 'just', 'make', 'help', 'tool', 'tools',
  'best', 'find', 'looking', 'using', 'use', 'used',
  'your', 'you', 'our', 'are', 'was', 'will', 'can', 'able', 'get',
  'app', 'website', 'online', 'easy', 'easily', 'really', 'very',
  'into', 'onto', 'over', 'under', 'about', 'than', 'then',
  'something', 'anything', 'thing', 'things', 'way', 'much', 'many',
  'une', 'des', 'les', 'pour', 'avec', 'dans', 'sur',
  'est', 'plus', 'tout', 'aux', 'ces', 'ses', 'mon', 'ton', 'son',
  // Arabic stopwords.
  // NOTE: negators (لا, لم, لن, بدون, غير, دون, ما) are NOT stopwords —
  // they are captured as negation markers below.
  'في', 'من', 'على', 'إلى', 'أن', 'إن', 'هذا', 'هذه', 'التي', 'الذي',
  'مع', 'بين', 'عن', 'كل', 'أو', 'هو', 'هي', 'نحن', 'كما', 'بعد',
  'قبل', 'حتى', 'لكن', 'قد', 'عند',
  // Moroccan Darija fillers
  'بغيت', 'ديال', 'باش', 'شنو', 'كيفاش', 'شني', 'دابا', 'بزاف',
])

// Negation/constraint markers. The word after a marker inherits the
// negation and is recorded as a mandatory constraint — it is never used
// as positive search evidence.
const NEGATORS = new Set([
  'without', 'no', 'not', 'non', 'except', 'excluding', 'sans', 'sauf',
  'بدون', 'غير', 'دون', 'ما', 'لا', 'لم', 'لن',
])

// NOTE: 'free' is intentionally NOT a stopword: "free" carries the
// free-plan requirement and is a constraint the AI evaluator must honor.

// Query-side glossary: Arabic / Darija / French intent words mapped to the
// English vocabulary the catalogue is written in. Catalogue data is never
// touched — this only lets non-English goals retrieve candidates for the
// (multilingual) ranker to judge.
const GLOSSARY: Record<string, string[]> = {
  // learning & code
  'تعلم': ['learn'], 'تعليم': ['learn'], 'apprendre': ['learn'],
  'برمجة': ['code', 'programming'], 'كود': ['code'], 'programmation': ['code', 'programming'],
  'مطور': ['developer'], 'مطورين': ['developer'], 'developpeur': ['developer'], 'développeur': ['developer'],
  'بايثون': ['python'],
  // transfer
  'تحميل': ['download'], 'تنزيل': ['download'], 'حمل': ['download'],
  'telecharger': ['download'], 'télécharger': ['download'],
  'مجلد': ['folder'], 'مجلدات': ['folder'], 'dossier': ['folder'],
  'جيتهاب': ['github'], 'جيت': ['git'],
  'رفع': ['upload'],
  // media
  'فيديو': ['video'], 'فيديوهات': ['video'],
  'يوتيوب': ['youtube'],
  'مقاطع': ['clip'], 'مقطع': ['clip'],
  'قصيرة': ['short'], 'قصير': ['short'],
  'حوّل': ['convert'], 'تحويل': ['convert'], 'استخراج': ['extract'],
  'صورة': ['photo'], 'صور': ['photo'],
  'موسيقى': ['music'], 'صوت': ['audio'], 'أغنية': ['song'], 'اغنية': ['song'], 'musique': ['music'],
  // text work
  'ترجمة': ['translate'], 'traduire': ['translate'], 'traduction': ['translate'],
  'كتابة': ['write'], 'اكتب': ['write'], 'écrire': ['write'], 'ecrire': ['write'],
  'بريد': ['email'], 'ايميل': ['email'],
  'ملخص': ['summary'], 'تلخيص': ['summary'],
  'ملاحظات': ['notes'],
  // edit & build
  'تعديل': ['edit'], 'حرر': ['edit'], 'تحرير': ['edit'], 'modifier': ['edit'],
  'حذف': ['remove'], 'احذف': ['remove'], 'supprimer': ['remove'],
  'خلفية': ['background'], 'fond': ['background'],
  'شعار': ['logo'],
  'سيرة': ['resume'],
  'بحث': ['search'], 'ابحث': ['search'], 'recherche': ['search'], 'chercher': ['search'],
  'إنشاء': ['build'], 'انشئ': ['build'], 'creer': ['build'], 'créer': ['build'],
  'تصميم': ['design'],
  // comms & misc
  'اجتماع': ['meeting'], 'اجتماعات': ['meeting'], 'reunion': ['meeting'], 'réunion': ['meeting'],
  'دردشة': ['chat'], 'محادثة': ['chat'],
  'أخبار': ['news'], 'اخبار': ['news'],
    'لعبة': ['game'], 'ألعاب': ['game'], 'العاب': ['game'], 'jeu': ['game'],
    'مجانا': ['free'], 'مجاني': ['free'], 'مجانية': ['free'], 'gratuit': ['free'],
    // French media/task words (glossed words emit equivalents only)
    'vidéo': ['video'], 'vidéos': ['video'],
    'convertir': ['convert'], 'extraire': ['extract'], 'couper': ['cut'],
    'courts': ['short'], 'court': ['short'], 'courte': ['short'],
}

const SYNONYMS: Record<string, string[]> = {
  photo: ['photo', 'photos', 'pic', 'pics', 'picture', 'pictures', 'image', 'images'],
  image: ['photo', 'photos', 'pic', 'pics', 'picture', 'pictures', 'image', 'images'],
  video: ['video', 'videos', 'film', 'films', 'movie', 'movies', 'clip', 'clips'],
  // "turn X into Y" / conversion words are ONE transformation concept —
  // "turn" is not a separate hard requirement from "convert"/"cut".
  turn: ['turn', 'turns', 'convert', 'converts', 'extract', 'extract', 'cut', 'cuts', 'split', 'splits'],
  audio: ['audio', 'sound', 'sounds', 'music', 'voice', 'voices'],
  remove: ['remove', 'removal', 'delete', 'erase', 'strip'],
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
  translate: ['translate', 'translation', 'translator'],
  chat: ['chat', 'chatbot'],
  search: ['search', 'find', 'finder', 'lookup', 'discover'],
  build: ['build', 'builder', 'create', 'creator', 'generate', 'generator'],
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

// Canonical synonym-group id per stem: every variant ("videos", "clips",
// "movies") collapses into ONE concept ("video"). Concept coverage, not
// keyword count, is what counts as requirement evidence.
const CONCEPT_BY_STEM = new Map<string, string>()
for (const [canon, group] of Object.entries(SYNONYMS)) {
  CONCEPT_BY_STEM.set(stem(canon), canon)
  for (const w of group) CONCEPT_BY_STEM.set(stem(w), canon)
}

export interface GoalToken { raw: string; stem: string; negated: boolean }

function tokens(text: string): GoalToken[] {
  const seen = new Set<string>()
  const out: GoalToken[] = []
  let negated = false
  // Unicode-aware split: keeps Arabic (incl. combining diacritics \p{M} —
  // a \p{L}/\p{N}-only class split حوّل into fragments!), French accents,
  // and other scripts.
  for (const raw0 of text.toLowerCase().split(/[^\p{L}\p{N}\p{M}]+/u)) {
    if (!raw0) continue
    if (NEGATORS.has(raw0)) {
      negated = true
      continue
    }
    if (raw0.length < 3 || STOP.has(raw0)) continue
    // Arabic definite article: try the word with and without the ال prefix
    // (query says البرمجة, catalogue language is keyed on برمجة).
    const forms = [raw0]
    if (/^ال[\u0600-\u06FF]{2,}$/u.test(raw0)) {
      const stripped = raw0.slice(2)
      if (stripped.length >= 3 && !STOP.has(stripped)) forms.push(stripped)
    }
    for (const raw of forms) {
      const gloss = GLOSSARY[raw] ?? []
      const s = stem(raw)
      // Stopwords are checked on both the raw word and its stem, so
      // inflected fillers ("needed", "uses") are dropped too.
      const blocked = STOP.has(raw) || (s.length >= 3 && STOP.has(s))
      const push = (label: string, st: string) => {
        if (!seen.has(st)) {
          seen.add(st)
          // Negation applies to the first content word after the marker;
          // scope then closes (e.g. "no installation, runs online").
          out.push({ raw: label, stem: st, negated })
        }
      }
      // A term with glossary equivalents maps DIRECTLY to its English
      // equivalents (any script): the raw foreign word never matches the
      // English catalogue and must not dilute the concept set.
      if (gloss.length > 0) {
        for (const equiv of gloss) {
          if (STOP.has(equiv)) continue
          push(equiv, stem(equiv))
        }
        continue
      }
      if (!blocked) push(raw, s)
    }
    negated = false
  }
  return out
}

function variantsForStem(termStem: string): string[] {
  const canon = CONCEPT_BY_STEM.get(termStem) ?? termStem
  const group = SYNONYMS[canon]
  if (!group) return [termStem]
  const out = new Set<string>([termStem])
  for (const w of group) out.add(stem(w))
  return [...out]
}

export interface GoalConcept {
  id: string
  label: string
  variants: string[]
  negated: boolean
}

export interface GoalAnalysis {
  concepts: GoalConcept[]
  phrases: string[]
  /** Display labels of negated mandatory constraints ("without internet"). */
  constraints: string[]
}

export function analyzeGoal(goal: string): GoalAnalysis {
  const toks = tokens(goal).slice(0, 24)
  const lowered = goal.toLowerCase()
  const phrases = ['landing page', 'text to speech', 'speech to text', 'background remover', 'remove background']
    .filter((p) => lowered.includes(p))
  const concepts: GoalConcept[] = []
  const constraints: string[] = []
  const byConcept = new Map<string, GoalConcept>()
  for (const { raw, stem: term, negated } of toks) {
    const canon = CONCEPT_BY_STEM.get(term) ?? term
    let c = byConcept.get(canon)
    if (!c) {
      c = { id: canon, label: raw, variants: variantsForStem(term), negated }
      byConcept.set(canon, c)
      concepts.push(c)
    }
    // "not paid / without internet / no installation" — first negation of
    // a concept wins and is never discarded as a stopword.
    if (negated && !c.negated) {
      c.negated = true
      c.label = `not ${c.label}`
    }
  }
  for (const c of concepts) if (c.negated) constraints.push(c.label)
  return { concepts, phrases, constraints }
}

/** Edit distance ≤ 1 (insert/delete/substitute), cheap for short tokens.
 *  Both sides must be ≥ 5 chars for the cheap prefix/substring check:
 *  short words collide too easily, and "clip" must NOT match
 *  "Clipdrop"/"Paperclip" inside their brand names. */
function fuzzy(hay: string, needle: string): boolean {
  if (hay === needle) return true
  if (hay.length < 5 || needle.length < 5) return false
  if (hay.includes(needle)) return true
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

export type GoalItemKind = 'tool' | 'devtool' | 'repo'

export interface GoalMatch {
  kind: GoalItemKind
  item: Tool | DevTool | Repo
  score: number
  /** 0-100: share of the best achievable score for this query. */
  pct: number
  matched: string[]
}

interface IndexEntry {
  kind: GoalItemKind
  item: Tool | DevTool | Repo
  name: string
  nameTokens: string[]
  tagTokens: string[]
  catTokens: string[]
  bodyTokens: string[]
  doc: Set<string>
  bodyBlob: string
}

export function stemTokens(text: string): string[] {
  return tokens(text.replace(/-/g, ' '))
    .filter((t) => !t.negated)
    .map((t) => t.stem)
}

// Built once per pool and reused across queries (module lifetime).
const indexCache = new Map<string, IndexEntry[]>()

export type GoalPoolItem = { kind: GoalItemKind; item: Tool | DevTool | Repo }

function buildIndex(pool: GoalPoolItem[]): IndexEntry[] {
  return pool.map(({ kind, item }) => {
    const tagTokens = item.tags.flatMap((t) => stemTokens(t))
    const catTokens = stemTokens(item.category)
    const bodyBlob =
      `${item.tagline} ${item.description}`
        .replace(/[*_#]/g, ' ')
        .replace(/\s+/g, ' ')
        .toLowerCase()
    const bodyTokens = stemTokens(bodyBlob)
    return {
      kind,
      item,
      name: item.name.toLowerCase(),
      nameTokens: stemTokens(item.name),
      tagTokens,
      catTokens,
      bodyTokens,
      doc: new Set([
        ...stemTokens(item.name),
        ...tagTokens,
        ...catTokens,
        ...bodyTokens,
      ]),
      bodyBlob,
    }
  })
}

function isFree(item: { pricing: string }): boolean {
  return item.pricing === 'free' || item.pricing === 'open-source'
}

function getIndex(freeOnly: boolean): IndexEntry[] {
  const key = freeOnly ? 'free' : 'all'
  const hit = indexCache.get(key)
  if (hit) return hit
  const pool: GoalPoolItem[] = (
    freeOnly
      ? [
          ...SEED_TOOLS.filter(isFree).map((item) => ({ kind: 'tool' as const, item })),
          ...SEED_DEV_TOOLS.filter(isFree).map((item) => ({ kind: 'devtool' as const, item })),
          ...SEED_REPOS.filter(isFree).map((item) => ({ kind: 'repo' as const, item })),
        ]
      : [
          ...SEED_TOOLS.map((item) => ({ kind: 'tool' as const, item })),
          ...SEED_DEV_TOOLS.map((item) => ({ kind: 'devtool' as const, item })),
          ...SEED_REPOS.map((item) => ({ kind: 'repo' as const, item })),
        ]
  ).filter(({ item }) => !item.name.toLowerCase().endsWith(' skill'))
  const entries = buildIndex(pool)
  indexCache.set(key, entries)
  return entries
}

// IDF cache persists across queries: term rarity never changes at runtime.
const idfCache = new Map<string, number>()

function idf(variants: string[], docs: Set<string>[], poolSize: number): number {
  let best = 0
  for (const v of variants) {
    // Keyed by pool size: the same term is rarer in the smaller free pool.
    const key = `${poolSize}:${v}`
    let cached = idfCache.get(key)
    if (cached === undefined) {
      const df = docs.filter((d) => [...d].some((f) => fuzzy(f, v))).length || 1
      cached = Math.log(poolSize / df)
      idfCache.set(key, cached)
    }
    if (cached > best) best = cached
  }
  return best
}

function fieldIncludes(fieldTokens: string[], variants: string[]): boolean {
  return variants.some((v) => fieldTokens.some((f) => fuzzy(f, v)))
}

/** Word-boundary name match: brand-name fragments ("clip" inside
 *  "Clipdrop") can never pass — the query variant must equal a whole name
 *  token (or fuzzy-match a token prefix with ≥5-char typo tolerance). */
function matchName(nameTokens: string[], variants: string[]): boolean {
  return variants.some((v) =>
    nameTokens.some((nt) => nt === v || (nt.length >= 5 && v.length >= 5 && fuzzy(nt, v))))
}

export interface ScoredMatch extends GoalMatch {
  /** Concepts that hit a strong field (name, tags, category). */
  strong: string[]
  /** Concepts that hit the tagline/description body text. */
  bodyConcepts: string[]
}

/** Shared per-entry scoring used by retrieval and the conservative
 *  fallback evaluator. Concepts are scored independently; a concept that
 *  matches via ANY synonym variant counts ONCE. */
function scoreIndex(entries: IndexEntry[], analysis: GoalAnalysis): {
  scored: ScoredMatch[]
  concepts: GoalConcept[]
  maxPossible: number
} {
  // Retrieval uses POSITIVE concepts only: a negated requirement
  // ("no installation") is an evaluator constraint, never positive
  // search evidence.
  const concepts = analysis.concepts.filter((c) => !c.negated).slice(0, 12)
  if (!concepts.length) return { scored: [], concepts, maxPossible: 0 }

  const boostPerConcept = concepts.map((c) =>
    1 + idf(c.variants, entries.map((e) => e.doc), entries.length))

  // Best achievable score for this query: every concept hitting a name (5x)
  // plus phrase bonus. Percentages are relative to this ceiling.
  const maxPossible =
    concepts.reduce((sum, _, ci) => sum + 5 * boostPerConcept[ci]!, 0) + 4 * analysis.phrases.length
  const toPct = (score: number) =>
    maxPossible > 0 ? Math.min(100, Math.round((score / maxPossible) * 100)) : 0

  const scored: ScoredMatch[] = []
  for (const { kind, item, name, nameTokens, tagTokens, catTokens, bodyTokens, bodyBlob } of entries) {
    let score = 0
    const strong: string[] = []
    const bodyConcepts: string[] = []
    const matched: string[] = []
    concepts.forEach((c, ci) => {
      const variants = c.variants
      const boost = boostPerConcept[ci]!
      // Name: exact token equality (plus ≥5-char typo tolerance) — never
      // a substring hit inside a brand name.
      if (matchName(nameTokens, variants)) {
        strong.push(c.id)
        score += 5 * boost
        matched.push(c.label)
      } else if (fieldIncludes(tagTokens, variants)) {
        strong.push(c.id)
        score += 3 * boost
        matched.push(c.label)
      } else if (fieldIncludes(catTokens, variants)) {
        strong.push(c.id)
        score += 2 * boost
        matched.push(c.label)
      }
      // Body evidence is recorded INDEPENDENTLY of the field chain: a
      // concept already matched in a strong field still counts toward
      // body support when its words appear in the tagline/description.
      if (fieldIncludes(bodyTokens, variants)) {
        bodyConcepts.push(c.id)
        // Only score body weight when no stronger field carried it.
        if (!strong.includes(c.id)) {
          score += 1 * boost
        }
        if (!matched.includes(c.label)) matched.push(c.label)
      }
    })
    for (const p of analysis.phrases) {
      if (bodyBlob.includes(p)) {
        score += 4
        matched.push(p)
      }
    }
    if (score > 0) {
      scored.push({
        kind,
        item,
        score,
        pct: toPct(score),
        matched: matched.slice(0, 4),
        strong,
        bodyConcepts,
      })
    }
  }
  return { scored, concepts, maxPossible }
}

// ============================================================
// RETRIEVAL — candidates for the AI evaluator (not final matches)
// ============================================================

function collectRetrieval(
  entries: IndexEntry[],
  analysis: GoalAnalysis,
  limit: number,
): GoalMatch[] {
  const { scored, concepts } = scoreIndex(entries, analysis)

  // Minimum score 2 filters single body-word coincidences (one stray word
  // in a long description outranking genuinely relevant tools).
  // Conservative relevance: multi-CONCEPT goals (action + object etc.)
  // need evidence for at least two DISTINCT concepts; synonyms merged
  // into one concept can no longer satisfy an action+object requirement.
  const need = concepts.length > 1 ? 2 : 1
  const best = new Map<string, ScoredMatch>()
  for (const m of scored) {
    if (m.score < 2) continue
    if (m.matched.length < need) continue
    const key = m.item.name.toLowerCase().replace(/[^a-z0-9]/g, '')
    const prev = best.get(key)
    if (!prev || m.score > prev.score) best.set(key, m)
  }
  return [...best.values()]
    .sort((a, b) => b.score - a.score || b.item.upvotes - a.item.upvotes)
    .slice(0, limit)
}

export function matchToolsByGoal(goal: string, freeOnly = false, limit = 8): GoalMatch[] {
  const analysis = analyzeGoal(goal)
  if (!analysis.concepts.filter((c) => !c.negated).length) return []
  return collectRetrieval(getIndex(freeOnly), analysis, limit)
}

/** Retrieval over a controlled pool (regression-test fixtures). */
export function matchToolsByGoalInPool(pool: GoalPoolItem[], goal: string, limit = 8): GoalMatch[] {
  const analysis = analyzeGoal(goal)
  if (!analysis.concepts.filter((c) => !c.negated).length) return []
  return collectRetrieval(buildIndex(pool), analysis, limit)
}

// ============================================================
// CONSERVATIVE FALLBACK EVALUATION — AI unavailable only
// ============================================================

function collectConservative(
  entries: IndexEntry[],
  analysis: GoalAnalysis,
  limit: number,
): GoalMatch[] {
  // Explicit negated mandatory constraints ("without internet", "not
  // paid", "no installation") cannot be verified with a keyword gate.
  // Showing matches while ignoring them would silently relax the user's
  // requirements, so the fallback declines instead.
  if (analysis.constraints.length) return []

  const concepts = analysis.concepts.filter((c) => !c.negated)
  if (!concepts.length) return []
  const { scored } = scoreIndex(entries, analysis)

  // Every distinct query concept must be covered by listing evidence —
  // two matching keywords do not establish an end-to-end workflow, so
  // ANY missing concept makes the candidate ineligible here.
  const needCoverage = concepts.length
  const needBody = Math.min(2, concepts.length)
  const best = new Map<string, ScoredMatch>()
  for (const m of scored) {
    if (m.score < 2) continue
    const covered = new Set([...m.strong, ...m.bodyConcepts])
    if (covered.size < needCoverage) continue
    if (m.bodyConcepts.length < needBody) continue
    const key = m.item.name.toLowerCase().replace(/[^a-z0-9]/g, '')
    const prev = best.get(key)
    if (!prev || m.score > prev.score) best.set(key, m)
  }
  return [...best.values()]
    .sort((a, b) => b.score - a.score || b.item.upvotes - a.item.upvotes)
    .slice(0, limit)
}

/** Strict local evaluation for when the AI ranker cannot be used.
 *
 *  A candidate MAY be shown as a goal match only when the listing's own
 *  text establishes support for every distinct query concept, with at
 *  least two concepts evidenced directly in the tagline/description body
 *  (not merely in a name fragment or a broad category). If the local
 *  check cannot establish task suitability — including any explicit
 *  negated constraint, which cannot be verified without AI — the caller
 *  must show a temporary-unavailability message instead.
 *
 *  This is still a deterministic keyword gate: it is deliberately much
 *  stricter than retrieval, and results surfaced through it are labeled
 *  "not AI-verified" in the UI. */
export function evaluateGoalFallback(goal: string, freeOnly = false, limit = 4): GoalMatch[] {
  return collectConservative(getIndex(freeOnly), analyzeGoal(goal), limit)
}

/** Conservative evaluation over a controlled pool (regression tests). */
export function evaluateGoalFallbackInPool(pool: GoalPoolItem[], goal: string, limit = 4): GoalMatch[] {
  return collectConservative(buildIndex(pool), analyzeGoal(goal), limit)
}
