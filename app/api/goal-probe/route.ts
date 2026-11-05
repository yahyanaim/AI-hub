import { NextResponse } from 'next/server'

const API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions'
const API_KEY = process.env.NVIDIA_API_KEY ?? ''

async function timedFetch(label: string, url: string, init: RequestInit, ms: number) {
  const c = new AbortController()
  const t = setTimeout(() => c.abort(), ms)
  const start = Date.now()
  try {
    const res = await fetch(url, { ...init, signal: c.signal })
    const text = await res.text()
    return { label, status: res.status, ms: Date.now() - start, body: text.slice(0, 220) }
  } catch (err) {
    return {
      label,
      errName: err instanceof Error ? err.name : 'unknown',
      errMsg: err instanceof Error ? err.message.slice(0, 120) : '',
      ms: Date.now() - start,
      body: '',
    }
  } finally {
    clearTimeout(t)
  }
}

export async function GET() {
  const target = new URL(process.env.GOAL_PROBE_URL ?? API_URL)
  const modelsRes = await timedFetch('models', 'https://integrate.api.nvidia.com/v1/models', { headers: { Authorization: `Bearer ${API_KEY}` } }, 12_000)
  let modelIds: string[] = []
  try {
    const raw = JSON.parse(modelsRes.body || '{}') as never
  } catch {}
  const chat = (name: string, model: string, budgetMs = 30_000) =>
    timedFetch(name, 'https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages: [{ role: 'user', content: 'hi' }], max_tokens: 16, stream: false }),
    }, budgetMs)
  const results = await Promise.all([
    chat('deepseek', 'deepseek-ai/deepseek-v4.1-flash'),
    chat('minimax', 'minimaxai/minimax-m3.1-flash'),
    chat('nemotron', 'nvidia/nemotron-3.5-lightning-30b-a3b'),
    chat('oss20b', 'openai/gpt-oss-20b', 20_000),
    fetch('https://integrate.api.nvidia.com/v1/models', { headers: { Authorization: `Bearer ${API_KEY}` }, signal: AbortSignal.timeout(12_000) })
      .then(async (res) => {
        const data = (await res.json().catch(() => ({}))) as { data?: { id?: string }[] }
        const ids = (data.data ?? []).map((m) => m.id ?? '').filter(Boolean)
        return { label: 'models', status: res.status, ids }
      })
      .catch((err) => ({ label: 'models', status: 0, ids: [] as string[], errName: err instanceof Error ? err.name : 'x' })),
    timedFetch(
      'chat-candidate',
      target.toString(),
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'zai-org/glm-4.7-flash', messages: [{ role: 'user', content: 'hi' }], max_tokens: 16, stream: false }),
      },
      35_000
    ),
  ])
  const ids = results.find((r) => 'ids' in r)?.ids ?? []
  return NextResponse.json(
    { keyPresent: API_KEY.length > 0, target: target.toString(), ids, results },
    {
      status: 200,
      headers: { 'X-Diag-Raw': 'goal-probe' },
    }
  )
}
