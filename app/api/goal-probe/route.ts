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
  const results = await Promise.all([
    timedFetch('generic-post', 'https://postman-echo.com/post', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"ping":1}' }, 12_000),
    timedFetch('llama-tiny', 'https://integrate.api.nvidia.com/v1/chat/completions', { method: 'POST', headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'meta/llama-3.1-8b-instruct', messages: [{ role: 'user', content: 'hi' }], max_tokens: 16, stream: false }) }, 35_000),
    timedFetch('gptoss120-tiny', 'https://integrate.api.nvidia.com/v1/chat/completions', { method: 'POST', headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'openai/gpt-oss-120b', messages: [{ role: 'user', content: 'hi' }], max_tokens: 16, stream: false }) }, 35_000),
    timedFetch(
      'models',
      'https://integrate.api.nvidia.com/v1/models',
      { headers: { Authorization: `Bearer ${API_KEY}` } },
      12_000
    ).then((r) => {
      try {
        const data = JSON.parse(r.body || '{}') as { data?: { id?: string }[] }
        const ids = (data.data ?? []).map((m) => m.id ?? '').filter(Boolean)
        return { ...r, ids: ids.filter((i) => /gpt-oss|glm|qwen|deepseek|llama-3|kimi/i.test(i)).slice(0, 40) }
      } catch {
        return { ...r, ids: [] as string[] }
      }
    }),
    timedFetch(
      'chat-candidate',
      target.toString(),
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'openai/gpt-oss-20b-fp4', messages: [{ role: 'user', content: 'hi' }], max_tokens: 16, stream: false }),
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
