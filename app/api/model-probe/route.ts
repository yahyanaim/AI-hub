import { NextResponse } from 'next/server'

const CANDIDATES = [
  'nvidia/nemotron-3.5-lightning-30b-a3b',
  'minimaxai/minimax-m3.1-flash',
  'mistralai/mistral-large-2-instruct',
  'google/gemma-4-31b-it',
  'mistralai/mistral-large-4-1t-a52b',
  'ai21labs/jamba-1.5-large-instruct',
  'microsoft/phi-3.5-moe-instruct',
  'nv-mistralai/mistral-nemo-12b-instruct',
  'mistralai/mixtral-8x22b-v0.1',
  'ibm/granite-3.0-8b-instruct',
  'meta/llama-3.2-90b-vision-instruct',
]

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('t')
  if (token !== process.env.AUTH_SECRET?.slice(0, 12)) {
    return NextResponse.json({ error: 'nope' }, { status: 401 })
  }
  const KEY = process.env.NVIDIA_API_KEY || process.env.DAHL_API_KEY
  const results: Record<string, string> = {}
  for (const model of CANDIDATES) {
    const t0 = Date.now()
    try {
      const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${KEY}`,
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: 'Reply with the single word: alive' }],
          max_tokens: 512,
          temperature: 1,
          stream: true,
          seed: 0,
        }),
      })
      if (!res.ok) {
        const b = (await res.text()).slice(0, 120).replace(/\s+/g, ' ')
        results[model] = `HTTP ${res.status} (${(Date.now() - t0) / 1000 | 0}s) ${b}`
        continue
      }
      const reader = res.body!.getReader()
      const dec = new TextDecoder()
      let buf = ''
      let content = ''
      let reasoning = 0
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buf += dec.decode(value, { stream: true })
        const lines = buf.split('\n')
        buf = lines.pop() || ''
        for (const line of lines) {
          const t = line.trim()
          if (!t.startsWith('data: ') || t.slice(6) === '[DONE]') continue
          try {
            const j = JSON.parse(t.slice(6))
            const d = j.choices?.[0]?.delta || {}
            if (typeof d.content === 'string') content += d.content
            if (typeof d.reasoning_content === 'string') reasoning += d.reasoning_content.length
          } catch {}
        }
      }
      results[model] = `OK content=${content.length} reasoning=${reasoning} (${(Date.now() - t0) / 1000 | 0}s) sample=${JSON.stringify(content.slice(0, 30))}`
    } catch (e: unknown) {
      results[model] = `FAIL (${(Date.now() - t0) / 1000 | 0}s) ${e instanceof Error ? e.name : String(e)}`
    }
  }
  return NextResponse.json({ results })
}
