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

import { SEED_TOOLS, SEED_DEV_TOOLS, SEED_REPOS } from '@/lib/seed'
import type { Tool, DevTool, Repo } from '@/types'

const STOP = new Set([
  'the', 'and', 'for', 'with', 'that', 'this', 'from', 'have', 'has',
  'want', 'need', 'like', 'just', 'make', 'help', 'tool', 'tools',
  'best', 'free', 'find', 'looking', 'using', 'use', 'used',
  'your', 'you', 'our', 'are', 'was', 'will', 'can', 'able', 'get',
  'app', 'website', 'online', 'easy', 'easily', 'really', 'very',
  'into', 'onto', 'over', 'under', 'from', 'about', 'than', 'then',
  'something', 'anything', 'thing', 'things', 'way', 'much', 'many',
  'une', 'des', 'les', 'pour', 'avec', 'dans', 'sur',
  'est', 'pas', 'plus', 'tout', 'aux', 'ces', 'ses', 'mon', 'ton', 'son',
  // Arabic stopwords (kept short list; tokens() already drops <3 chars)
  'في', 'من', 'على', 'إلى', 'أن', 'إن', 'ما', 'لا', 'لم', 'لن', 'هذا',
  'هذه', 'التي', 'الذي', 'مع', 'بين', 'عن', 'كل', 'أو', 'هو', 'هي',
  'نحن', 'كما', 'بعد', 'قبل', 'حتى', 'غير', 'لكن', 'قد', 'عند', 'دون',
  // Moroccan Darija fillers
  'بغيت', 'ديال', 'باش', 'شنو', 'كيفاش', 'شني', 'دابا', 'بزاف',
])

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
}

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

function tokens(text: string): { raw: string; stem: string }[] {
  const seen = new Set<string>()
  const out: { raw: string; stem: string }[] = []
  // Unicode-aware split: keeps Arabic, French accents, and other scripts
  // (a Latin-only split silently dropped non-Latin queries entirely).
  for (const raw of text.toLowerCase().split(/[^\p{L}\p{N}]+/u)) {
    if (raw.length < 3 || STOP.has(raw)) continue
    // Arabic definite article: try the word with and without the ال prefix
    // (query says البرمجة, catalogue language is keyed on برمجة).
    const forms = [raw]
    if (/^ال[\u0600-\u06FF]{2,}$/u.test(raw) && !STOP.has(raw)) {
      const stripped = raw.slice(2)
      if (stripped.length >= 3 && !STOP.has(stripped)) forms.push(stripped)
    }
    for (const form of forms) {
      const gloss = GLOSSARY[form] ?? []
      // A non-Latin term with glossary equivalents can never match the
      // English catalogue itself — emit only the equivalents so it does
      // not dilute the match percentage.
      if (gloss.length > 0 && /[^\x00-\x7F]/.test(form)) {
        for (const equiv of gloss) {
          if (STOP.has(equiv)) continue
          const es = stem(equiv)
          if (seen.has(es)) continue
          seen.add(es)
          out.push({ raw: equiv, stem: es })
        }
        continue
      }
      const s = stem(form)
      if (!seen.has(s)) {
        seen.add(s)
        out.push({ raw: form, stem: s })
      }
      // Glossary equivalents: same position in the term list, same weight.
      for (const equiv of GLOSSARY[form] ?? []) {
        if (STOP.has(equiv)) continue
        const es = stem(equiv)
        if (seen.has(es)) continue
        seen.add(es)
        out.push({ raw: equiv, stem: es })
      }
    }
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

/** Edit distance ≤ 1 (insert/delete/substitute), cheap for short tokens.
 *  Both sides must be ≥ 5 chars: short words collide too easily
 *  ('trip' vs 'strip' once produced a travel app for "background removal"). */
function fuzzy(hay: string, needle: string): boolean {
  if (hay.includes(needle)) return true
  if (needle.length < 5 || hay.length < 5) return false
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
  tagTokens: string[]
  catTokens: string[]
  bodyTokens: string[]
  doc: Set<string>
}

function stemTokens(text: string): string[] {
  return tokens(text.replace(/-/g, ' ')).map((t) => t.stem)
}

// Built once per pool and reused across queries (module lifetime).
const indexCache = new Map<string, IndexEntry[]>()

function getIndex(freeOnly: boolean): IndexEntry[] {
  const key = freeOnly ? 'free' : 'all'
  const hit = indexCache.get(key)
  if (hit) return hit
  const pool = (
    freeOnly
      ? [
          ...SEED_TOOLS.filter((t) => t.pricing === 'free' || t.pricing === 'open-source').map((item) => ({ kind: 'tool' as const, item })),
          ...SEED_DEV_TOOLS.filter((t) => t.pricing === 'free' || t.pricing === 'open-source').map((item) => ({ kind: 'devtool' as const, item })),
          ...SEED_REPOS.filter((t) => t.pricing === 'free' || t.pricing === 'open-source').map((item) => ({ kind: 'repo' as const, item })),
        ]
      : [
          ...SEED_TOOLS.map((item) => ({ kind: 'tool' as const, item })),
          ...SEED_DEV_TOOLS.map((item) => ({ kind: 'devtool' as const, item })),
          ...SEED_REPOS.map((item) => ({ kind: 'repo' as const, item })),
        ]
  ).filter(({ item }) => !item.name.toLowerCase().endsWith(' skill'))
  const entries = pool.map(({ kind, item }) => {
    const tagTokens = item.tags.flatMap((t) => stemTokens(t))
    const catTokens = stemTokens(item.category)
    const bodyTokens = stemTokens(`${item.tagline} ${item.description}`)
    return {
      kind,
      item,
      name: item.name.toLowerCase(),
      tagTokens,
      catTokens,
      bodyTokens,
      doc: new Set([
        ...stemTokens(item.name),
        ...tagTokens,
        ...catTokens,
        ...bodyTokens,
      ]),
    }
  })
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

export function matchToolsByGoal(goal: string, freeOnly = false, limit = 8): GoalMatch[] {
  const rawTerms = tokens(goal).slice(0, 20)
  if (!rawTerms.length) return []
  const entries = getIndex(freeOnly)
  // Multi-word phrases from the raw goal (e.g. "landing page").
  const lowered = goal.toLowerCase()
  const phrases = ['landing page', 'text to speech', 'speech to text', 'background remover', 'remove background']
    .filter((p) => lowered.includes(p))

  // Term boosts computed ONCE per query (not per tool): rarity is a
  // property of the pool, and recomputing it per record froze the UI.
  const boosts = rawTerms.map(({ stem: term }) => 1 + idf(expand(term), entries.map((e) => e.doc), entries.length))

  const scored: GoalMatch[] = []
  // Best achievable score for this query: every term hitting a name (5x)
  // plus every phrase bonus. Percentages are relative to this ceiling.
  const maxPossible =
    rawTerms.reduce((sum, _, ti) => sum + 5 * boosts[ti]!, 0) + 4 * phrases.length
  const toPct = (score: number) =>
    maxPossible > 0 ? Math.min(100, Math.round((score / maxPossible) * 100)) : 0
  for (const { kind, item, name, tagTokens, catTokens, bodyTokens } of entries) {
    let score = 0
    const matched: string[] = []
    const hit = (label: string, w: number) => {
      score += w
      if (!matched.includes(label)) matched.push(label)
    }
    rawTerms.forEach(({ raw, stem: term }, ti) => {
      const variants = expand(term)
      const boost = boosts[ti]!
      // Names match exactly (brand precision — no fuzzy, no synonyms).
      if (variants.some((v) => name.includes(v))) hit(raw, 5 * boost)
      else if (fieldIncludes(tagTokens, variants)) hit(raw, 3 * boost)
      else if (fieldIncludes(catTokens, variants)) hit(raw, 2 * boost)
      else if (fieldIncludes(bodyTokens, variants)) hit(raw, 1 * boost)
    })
    for (const p of phrases) {
      const blob = `${item.name} ${item.tagline} ${item.description}`.toLowerCase()
      if (blob.includes(p)) {
        score += 4
        matched.push(p)
      }
    }
    if (score > 0) scored.push({ kind, item, score, pct: toPct(score), matched: matched.slice(0, 4) })
  }
  // Best match per normalized name: the catalogue contains a few duplicate
  // records for the same product — never show the same tool twice.
  // Minimum score 2 filters single body-word coincidences (one stray word
  // in a long description outranking genuinely relevant tools).
  const best = new Map<string, GoalMatch>()
  // Conservative relevance: multi-term goals need evidence for at least two
  // distinct terms (action + object together) — one stray word is not enough.
  // Single-term goals keep the minimum-score bar only.
  const needTerms = rawTerms.length > 1 ? 2 : 1
  for (const m of scored) {
    if (m.score < 2) continue
    if (m.matched.length < needTerms) continue
    const key = m.item.name.toLowerCase().replace(/[^a-z0-9]/g, '')
    const prev = best.get(key)
    if (!prev || m.score > prev.score) best.set(key, m)
  }
  return [...best.values()]
    .sort((a, b) => b.score - a.score || b.item.upvotes - a.item.upvotes)
    .slice(0, limit)
}
