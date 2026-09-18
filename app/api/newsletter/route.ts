import { NextResponse } from 'next/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Buttondown caps addresses at 255 chars; keep payloads small.
const MAX_EMAIL_LENGTH = 255

export async function POST(req: Request) {
  const apiKey = process.env.BUTTONDOWN_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { message: 'Newsletter is not configured yet. Please try again later.' },
      { status: 503 }
    )
  }

  let email: unknown
  try {
    email = (await req.json())?.email
  } catch {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 })
  }

  if (typeof email !== 'string' || email.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ message: 'Please enter a valid email address.' }, { status: 400 })
  }

  try {
    const res = await fetch('https://api.buttondown.com/v1/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email.trim().toLowerCase(),
        tags: ['ai-hunt-footer'],
      }),
    })

    if (res.status === 201) {
      return NextResponse.json({ message: 'Subscribed! Check your inbox to confirm.' })
    }

    const data = (await res.json().catch(() => null)) as { code?: string; detail?: string } | null
    // Buttondown returns 400 when the address is already subscribed.
    if (res.status === 400 && data?.code === 'email_already_exists') {
      return NextResponse.json({ message: "You're already subscribed. Welcome back!" })
    }
    // Forward Buttondown's own message when safe (e.g. invalid domain,
    // disposable address, subscriber limit) so users know what to fix.
    if (data?.detail && data.detail.length < 200) {
      console.warn('[newsletter] buttondown rejected signup:', data.code, data.detail)
      return NextResponse.json({ message: data.detail }, { status: 502 })
    }
    console.warn('[newsletter] buttondown signup failed:', res.status)
    return NextResponse.json(
      { message: 'Subscription failed. Please try again.' },
      { status: 502 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Could not reach the newsletter service. Please try again.' },
      { status: 502 }
    )
  }
}
