// One-shot LIVE provider check for the goal-match route.
// Runs the real route handler with the real NVIDIA_API_KEY from .env.local
// and the real catalogue. Prints safe metadata + the parsed outcome only.
//
// Run: npx tsx scripts/goal-match-live-check.ts

async function liveCheckMain() {
  const rows: string[] = []
  for (const line of (await import('node:fs')).readFileSync('.env.local', 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (m && !process.env[m[1]!]) process.env[m[1]!] = m[2]!
  }
  const { POST } = await import('../app/api/goal-match/route')
  const goals = process.argv.slice(2).length
    ? process.argv.slice(2)
    : ['Turn YouTube videos into short clips', 'Transcribe my meetings with notes']
  for (const query of goals) {
    const req = new Request('http://localhost/api/goal-match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal: query, freeOnly: false }),
    })
    const started = Date.now()
    try {
      const res = await POST(req)
      const data = (await res.json()) as unknown as { matches: { item: { name: string }; reason: string }[]; abstained?: boolean; noCandidates?: boolean; error?: string }
      rows.push(
        [
          `LIVE "${query}"`,
          `status=${res.status}`,
          `ms=${Date.now() - started}`,
          `abstained=${String(data.abstained ?? false)}`,
          `noCandidates=${String(data.noCandidates ?? false)}`,
          data.error ? `error=${data.error}` : '',
          (data.matches ?? []).map((m) => `${m.item.name} — ${m.reason}`).join(' | '),
        ].filter(Boolean).join(' · ')
      )
    } catch (err) {
      rows.push(`LIVE "${query}" THREW ${err instanceof Error ? err.name : 'unknown'} ms=${Date.now() - started}`)
    }
  }
  console.log(rows.join('\n'))
}

void liveCheckMain()
