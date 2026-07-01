import { NextResponse } from 'next/server'

const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions'
const API_KEY = process.env.NVIDIA_API_KEY

const SYSTEM_PROMPT = `You are an AI Career Advisor for AI Hunt — a community-driven platform for AI tools, developer tools, open-source repos, and coding courses.

Your role:
- Help users assess their skill level (entry/junior/mid/senior) based on what they've built
- Recommend learning paths and courses from AI Hunt's catalog
- Answer technical questions about web development, AI, and programming
- Suggest study plans tailored to their available time
- Keep answers concise and practical

When suggesting courses, mention they can find them on AI Hunt's Courses page. Be encouraging but honest. If you don't know something, say so.`

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    if (!API_KEY) {
      return NextResponse.json(
        { error: 'NVIDIA API key not configured' },
        { status: 500 }
      )
    }

    const payload = {
      model: 'minimaxai/minimax-m3',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 2048,
      temperature: 0.70,
      top_p: 0.95,
      stream: true,
    }

    const nvidiaResponse = await fetch(NVIDIA_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!nvidiaResponse.ok) {
      const text = await nvidiaResponse.text()
      return NextResponse.json(
        { error: `NVIDIA API error: ${nvidiaResponse.status}`, details: text },
        { status: nvidiaResponse.status }
      )
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = nvidiaResponse.body!.getReader()
        const decoder = new TextDecoder()

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            controller.enqueue(value)
          }
        } finally {
          controller.close()
          reader.releaseLock()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error', details: error?.message },
      { status: 500 }
    )
  }
}
