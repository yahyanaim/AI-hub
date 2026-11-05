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
  const results = await Promise.all([
    timedFetch(
      'models',
      'https://integrate.api.nvidia.com/v1/models',
      { headers: { Authorization: `Bearer ${API_KEY}` } },
      12_000
    ),
    timedFetch(
      'chat-tiny',
      target.toString(),
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'openai/gpt-oss-20b', messages: [{ role: 'user', content: 'hi' }], max_tokens: 16, stream: false }),
      },
      35_000
    ),
  ])
  return NextResponse.json(
    { keyPresent: API_KEY.length > 0, target: target.toString(), results },
    {
      status: 200,
      headers: { 'X-Diag-Raw': 'goal-probe' },
    }
  )
}
