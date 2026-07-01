import { NextResponse } from 'next/server'

const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions'
const API_KEY = process.env.NVIDIA_API_KEY

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
      messages,
      max_tokens: 8192,
      temperature: 1.00,
      top_p: 0.95,
      stream: false,
    }

    const response = await fetch(NVIDIA_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `NVIDIA API error: ${response.status}`, details: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
