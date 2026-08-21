// CI check: fails if any seed namespace has duplicate ids or slugs.
// Run: node scripts/validate-seed.mjs
import { readFileSync } from 'node:fs'
import { parseNamespaces, duplicates } from './seed-parse.mjs'

const source = readFileSync(new URL('../lib/seed.ts', import.meta.url), 'utf8')
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
  console.log(`✓ ${name}: ${entries.length} entries`)
}

if (failed) process.exit(1)
console.log('seed data OK')
