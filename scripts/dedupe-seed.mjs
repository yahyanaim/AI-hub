// One-off cleanup: dedupe seed entries by slug (keeps first occurrence) and
// renumber remaining id collisions to maxId+1 for the namespace prefix.
// Run: node scripts/dedupe-seed.mjs   (rewrites lib/seed.ts in place)
import { readFileSync, writeFileSync } from 'node:fs'
import { parseNamespaces, duplicates } from './seed-parse.mjs'

const path = new URL('../lib/seed/index.ts', import.meta.url)
let source = readFileSync(path, 'utf8')
const parsed = parseNamespaces(source)

const drop = new Set() // absolute line indices to delete
const edits = [] // {start, end, text} replacements

for (const [name, entries] of parsed) {
  // 1. slug dedupe — keep first occurrence across the whole namespace
  const seenSlugs = new Set()
  for (const e of entries) {
    if (!e.slug) continue
    if (seenSlugs.has(e.slug)) {
      for (let i = e.start; i < e.end; i++) drop.add(i)
      console.log(`${name}: dropping duplicate slug '${e.slug}' (id ${e.id}, line ${e.start + 1})`)
    } else {
      seenSlugs.add(e.slug)
    }
  }

  // 2. id collisions that survived slug-dedupe → renumber later entries
  const kept = entries.filter((e) => !drop.has(e.start))
  for (const [, list] of duplicates(kept, 'id')) {
    const nums = kept.map((e) => parseInt((e.id.match(/\d+/) || ['0'])[0], 10))
    let next = Math.max(...nums) + 1
    for (const e of list.slice(1)) {
      const prefix = e.id.replace(/\d+$/, '')
      const newId = `${prefix}${next++}`
      console.log(`${name}: renumbering id ${e.id} (${e.slug}, line ${e.start + 1}) → ${newId}`)
      const text = e.text.replace(`id: '${e.id}'`, `id: '${newId}'`)
      edits.push({ start: e.start, end: e.end, text })
    }
  }
}

// Apply edits first (replacements), then deletions — both bottom-up.
edits.sort((a, b) => b.start - a.start)
for (const { start, end, text } of edits) {
  source = source.split('\n').toSpliced(start, end - start, text).join('\n')
}
if (drop.size) {
  const lines = source.split('\n')
  const keep = lines.filter((_, i) => !drop.has(i))
  source = keep.join('\n')
}

writeFileSync(path, source)
console.log(`\nremoved ${drop.size} lines, applied ${edits.length} renames`)
