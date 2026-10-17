// Latency probe: exact goal-match provider payload, generous 90s budget,
// measures real provider latency for the slow case. Safe metadata only.
async function probeMain() {
  const fs = await import('node:fs')
  for (const line of fs.readFileSync('.env.local', 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (m && !process.env[m[1]!]) process.env[m[1]!] = m[2]!
  }
  const API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions'
  const { GOAL_MATCH_SYSTEM_PROMPT } = await import('../lib/goal-prompt')
  const { matchToolsByGoal, analyzeGoal } = await import('../lib/goal-finder')
  const goal = 'Turn YouTube videos into short clips'
  const local = matchToolsByGoal(goal, false, 60)
  // Isolation mode: override catalogue with only the strong-evidence tools
  const isolate = process.env.ISOLATE === '1'
  const pool = isolate
    ? local.filter((m) => /opus|sendshort/i.test(m.item.name))
    : local
  const desc = (t: { description: string }) => t.description.replace(/\s+/g, ' ').slice(0, 140)
  const catalog = pool
    .map((m) => `- [${m.kind}] ${m.item.id} | ${m.item.name} | ${m.item.category} | ${m.item.pricing} | tags: ${m.item.tags.join(', ')} | ${m.item.tagline} | ${desc(m.item as { description: string })}`)
    .join('\n')
  const analysis = analyzeGoal(goal)
  const constraints = analysis.constraints.length
    ? `\nMandatory constraints (do NOT relax them): ${analysis.constraints.join('; ')}\n`
    : '\n'
  const user = `Goal: "${goal}"${constraints}\n\nCatalogue:\n${catalog}`
  console.log(`candidates=${pool.length} promptChars=${(GOAL_MATCH_SYSTEM_PROMPT.length + user.length)} isolate=${isolate}`)
  for (const model of ['openai/gpt-oss-20b', 'z-ai/glm-5.3-flash']) {
    const started = Date.now()
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: GOAL_MATCH_SYSTEM_PROMPT },
            { role: 'user', content: user },
          ],
          max_tokens: 2000,
          temperature: 0.2,
          stream: false,
        }),
        signal: AbortSignal.timeout(90_000),
      })
      const data = (await res.json()) as {
        choices?: { message?: { content?: string }; finish_reason?: string }[]
      }
      const content = data?.choices?.[0]?.message?.content ?? ''
      console.log(`model=${model} status=${res.status} ms=${Date.now() - started} finish=${data?.choices?.[0]?.finish_reason} chars=${content.length}`)
      console.log(content.slice(0, 400))
    } catch (err) {
      console.log(`model=${model} THREW ${err instanceof Error ? err.name : '?'} ms=${Date.now() - started}`)
    }
  }
}
void probeMain()
