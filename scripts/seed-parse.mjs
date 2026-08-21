// Shared parser for lib/seed.ts — used by validate-seed.mjs and dedupe-seed.mjs
//
// Entries are detected structurally by indentation convention:
//   - entry opens  with the exact line "  {"   (2-space indent)
//   - entry closes with a line matching /^  \},?$/ (nested closers are deeper)
// Array segments close with the first line matching /^\];?$/ at column 0.

export const NAMESPACES = [
  { name: 'tools', markers: ['const toolsPart1', 'const toolsPart2', 'export const SEED_TOOLS'], idPrefix: 't' },
  { name: 'devtools', markers: ['export const SEED_DEV_TOOLS'], idPrefix: 'd' },
  { name: 'repos', markers: ['export const SEED_REPOS'], idPrefix: 'r' },
  { name: 'courses', markers: ['export const SEED_COURSES'], idPrefix: 'c' },
  { name: 'offers', markers: ['export const SEED_OFFERS'], idPrefix: 'o' },
]

/** Split source into lines, find a segment's [lineStart, lineEnd) bounds. */
function segmentBounds(lines, marker) {
  const startLine = lines.findIndex((l) => l.startsWith(marker))
  if (startLine === -1) throw new Error(`marker not found: ${marker}`)
  const openLine = lines.findIndex((l) => l.trim() === '[', startLine)
  let endLine = -1
  for (let i = Math.max(openLine, startLine); i < lines.length; i++) {
    if (/^\];?\s*$/.test(lines[i])) {
      endLine = i // exclusive
      break
    }
  }
  if (endLine === -1) throw new Error(`segment end not found for: ${marker}`)
  return { startLine, endLine }
}

/** Extract top-level entry ranges (in line indices) inside [from, to). */
function entryRanges(lines, from, to) {
  const ranges = []
  let cur = null
  for (let i = from; i < to; i++) {
    const line = lines[i]
    if (cur === null && line === '  {') {
      cur = i
    } else if (cur !== null && /^  \},?\s*$/.test(line)) {
      ranges.push([cur, i + 1])
      cur = null
    }
  }
  return ranges
}

const field = (text, name) => {
  const m = text.match(new RegExp(`\\b${name}: '([^']+)'`))
  return m ? m[1] : null
}

/**
 * Parse all namespaces from seed.ts source.
 * Returns Map<namespaceName, Array<{start, end, id, slug, text}>> with absolute
 * line indices [start, end).
 */
export function parseNamespaces(source) {
  const lines = source.split('\n')
  const out = new Map()
  for (const ns of NAMESPACES) {
    const entries = []
    for (const marker of ns.markers) {
      const { startLine, endLine } = segmentBounds(lines, marker)
      for (const [a, b] of entryRanges(lines, startLine, endLine)) {
        const text = lines.slice(a, b).join('\n')
        entries.push({ start: a, end: b, id: field(text, 'id'), slug: field(text, 'slug'), text })
      }
    }
    out.set(ns.name, entries)
  }
  return out
}

export function duplicates(entries, key) {
  const seen = new Map()
  for (const e of entries) {
    const k = e[key]
    if (!k) continue
    if (!seen.has(k)) seen.set(k, [])
    seen.get(k).push(e)
  }
  return [...seen.entries()].filter(([, v]) => v.length > 1)
}
