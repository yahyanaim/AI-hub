// One-off cleanup: dedupe seed entries by slug (keeps first occurrence) and
// renumber remaining id collisions to maxId+1 for the namespace prefix.
// Run: node scripts/dedupe-seed.mjs   (rewrites lib/seed/*.ts in place)
// Run with --dry-run to only report without writing.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { parseNamespaces, duplicates } from './seed-parse.mjs'

const dryRun = process.argv.includes('--dry-run')

// Seed lives split across lib/seed/*.ts; validate-seed.mjs joins them before
// parsing, so do the same here and map global line indices back to files.
const seedDir = new URL('../lib/seed/', import.meta.url)
const files = readdirSync(seedDir)
  .filter((f) => f.endsWith('.ts') && f !== 'index.ts' && f !== '_shared.ts')
  .sort()
const parts = files.map((f) => readFileSync(new URL(f, seedDir), 'utf8'))
const fileStart = [] // global line offset where each file starts in joined source
{
  let acc = 0
  for (const p of parts) {
    fileStart.push(acc)
    acc += p.split('\n').length
  }
}
const source = parts.join('\n')
const parsed = parseNamespaces(source)

const drop = new Set() // global line indices to delete
const edits = [] // {start, end, text} replacements (line-preserving)

for (const [name, entries] of parsed) {
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

  const kept = entries.filter((e) => !drop.has(e.start))
  for (const [, list] of duplicates(kept, 'id')) {
    const nums = kept.map((e) => parseInt((e.id.match(/\d+/) || ['0'])[0], 10))
    let next = Math.max(...nums) + 1
    for (const e of list.slice(1)) {
      const prefix = e.id.replace(/\d+$/, '')
      const newId = `${prefix}${next++}`
      console.log(`${name}: renumbering id ${e.id} (${e.slug}, line ${e.start + 1}) → ${newId}`)
      edits.push({ start: e.start, end: e.end, text: e.text.replace(`id: '${e.id}'`, `id: '${newId}'`) })
    }
  }
}

if (dryRun || (drop.size === 0 && edits.length === 0)) {
  console.log(`\n${dryRun ? '(dry run) ' : ''}removed ${drop.size} lines, applied ${edits.length} renames`)
  process.exit(0)
}

// Apply renames to the joined lines, then split back into per-file chunks.
const lines = source.split('\n')
edits.sort((a, b) => b.start - a.start)
for (const { start, end, text } of edits) {
  lines.splice(start, end - start, ...text.split('\n'))
}
// Recompute drops against post-edit indices: renames preserve line counts,
// so global indices remain valid.
const kept = lines.filter((_, i) => !drop.has(i))

// Map kept global lines back to files via original offsets adjusted for drops.
const perFile = files.map(() => [])
kept.forEach((line, globalIdx) => {
  void globalIdx
})
{
  // Walk original global indices in order, skipping dropped ones.
  let out = 0
  const total = lines.length
  const fileOf = (g) => {
    let fi = 0
    for (let i = 0; i < files.length; i++) {
      if (g >= fileStart[i]) fi = i
    }
    return fi
  }
  for (let g = 0; g < total; g++) {
    if (drop.has(g)) continue
    perFile[fileOf(g)].push(lines[g])
    out++
  }
  void out
}

files.forEach((f, i) => {
  writeFileSync(new URL(f, seedDir), perFile[i].join('\n'))
})
console.log(`\nremoved ${drop.size} lines, applied ${edits.length} renames`)
