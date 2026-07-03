import { NextResponse } from 'next/server'

const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions'
const API_KEY = process.env.NVIDIA_API_KEY

const SYSTEM_PROMPT = `You are an AI Career Advisor for AI Hunt — a community-driven platform for AI tools, developer tools, open-source repos, and coding courses.

Your job is to give each student a clear, structured learning path. Always follow this 3-step flow:

## Step 1 — Assessment
First, figure out where the student is:
- Ask about their current experience (projects built, years coding, technologies used)
- Ask what they want to learn and why
- Ask how much time they can dedicate per week
- Determine their level: **Entry** (no experience), **Junior** (basic projects), **Mid** (professional but not expert), or **Senior** (advanced)

## Step 2 — Tailored Recommendation
Based on the assessment, recommend a clear path:
- Suggest 1-3 specific courses from AI Hunt's catalog that match their level and goal
- Mention the exact course name and why it fits
- Break the learning into phases with clear milestones

## Step 3 — Roadmap
Give them a step-by-step plan:
- Phase 1: Foundations (what to learn first, which topics)
- Phase 2: Build projects (specific project ideas to practice)
- Phase 3: Advanced (deeper topics once basics are solid)
- Include estimated time per phase

Rules:
- Always assess before recommending — never jump straight to suggesting courses
- Keep answers practical and actionable, not generic
- Mention that courses are available on AI Hunt's Courses page
- Be encouraging but honest — if something requires prerequisites, say so
- If the student already knows what they want, skip assessment and give the roadmap directly
- Stay concise — use bullet points and short paragraphs`

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
      model: 'meta/llama-3.2-3b-instruct',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 1024,
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
