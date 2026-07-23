import { NextResponse } from 'next/server'
import { SEED_COURSES } from '@/lib/seed'

const API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions'
const API_KEY = process.env.NVIDIA_API_KEY || process.env.DAHL_API_KEY

function buildCourseCatalog(): string {
  return SEED_COURSES.map(c => {
    const roadmap = c.roadmap.map(r => `"${r.title}"`).join(' → ')
    return `- ${c.id}: "${c.name}" | ${c.category} | ${c.difficulty} | ${c.duration} | ${c.pricing}\n  Roadmap: ${roadmap}`
  }).join('\n\n')
}

const COURSE_CATALOG = buildCourseCatalog()

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
- Suggest 1-3 courses from the catalog below that match their level and goal
- Always reference course names exactly as they appear in the catalog
- Explain why each course fits their situation

## Step 3 — Roadmap
Build a step-by-step plan using the **actual roadmap phases from the courses** you recommended (not generic phase names). Use the exact phase titles, topics, and durations listed in each course's roadmap. Structure the plan as:
- Phase 1, Phase 2, etc. (use the course's real phase titles)
- Topics covered per phase
- Duration per phase
- Link to the course section when available

Rules:
- Always assess before recommending — never jump straight to suggesting courses
- Keep answers practical and actionable, not generic
- Mention that courses are available at /courses on AI Hunt
- Be encouraging but honest — if something requires prerequisites, say so
- If the student already knows what they want, skip assessment and give the roadmap directly
- Stay concise — use bullet points and short paragraphs

## Course Catalog (use exact names from here):
${COURSE_CATALOG}`

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    if (!API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const payload = {
      model: 'meta/llama-3.1-70b-instruct',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 1024,
      temperature: 0.70,
      top_p: 0.95,
      stream: true,
    }

    const apiResponse = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!apiResponse.ok) {
      const text = await apiResponse.text()
      return NextResponse.json(
        { error: `API error: ${apiResponse.status}`, details: text },
        { status: apiResponse.status }
      )
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = apiResponse.body!.getReader()
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
