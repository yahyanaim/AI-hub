// CI check: fails if any seed namespace has duplicate ids or slugs.
// Run: node scripts/validate-seed.mjs
import { readFileSync, readdirSync } from 'node:fs'
import { parseNamespaces, duplicates } from './seed-parse.mjs'

const seedDir = new URL('../lib/seed/', import.meta.url)
const source = readdirSync(seedDir)
  .filter((f) => f.endsWith('.ts') && f !== 'index.ts' && f !== '_shared.ts')
  .sort()
  .map((f) => readFileSync(new URL(f, seedDir), 'utf8'))
  .join('\n')
const parsed = parseNamespaces(source)

let failed = false
for (const [name, entries] of parsed) {
  for (const key of ['id', 'slug']) {
    const dups = duplicates(entries, key)
    if (dups.length) {
      failed = true
      console.error(`✗ ${name}: duplicate ${key}s:`)
      for (const [k, list] of dups) {
        console.error(`    ${k} → lines ${list.map((e) => e.start + 1).join(', ')}`)
      }
    }
  }
  // Audit §6.6: identical descriptions dilute SERP snippets (36 tool records
  // once shared one string). The name-prefix in lib/seo.ts neutralizes indexed
  // pages, but new copy-paste descriptions should not be added. Top-level
  // `description:` only (4-space indent, any quote style) — nested step
  // descriptions excluded.
  const seenDesc = new Map()
  for (const e of entries) {
    const m = e.text.match(/^    description:\s*[`'"](.*)[`'"],?\s*$/m)
    if (!m) continue
    const norm = m[1].replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase()
    if (!norm) continue
    if (!seenDesc.has(norm)) seenDesc.set(norm, [])
    seenDesc.get(norm).push(e)
  }
  for (const [desc, list] of seenDesc) {
    if (list.length > 1) {
      failed = true
      console.error(`✗ ${name}: duplicate descriptions (${list.length}x): "${desc.slice(0, 70)}…"`)
      for (const e of list) {
        console.error(`    ${e.slug ?? e.id} → line ${e.start + 1}`)
      }
    }
  }
  console.log(`✓ ${name}: ${entries.length} entries`)
}

if (failed) process.exit(1)
console.log('seed data OK')
