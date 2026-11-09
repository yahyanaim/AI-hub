import { NextResponse } from 'next/server'
import { extractText, getDocumentProxy } from 'unpdf'

// Transient CV parser. The uploaded file is received in memory, converted to
// plain text, returned to the client, and immediately discarded — nothing is
// written to disk or any store. The chat API never sees the binary either.
const MAX_FILE_BYTES = 4 * 1024 * 1024 // 4MB (Vercel request body ceiling)
const MAX_TEXT_CHARS = 12_000

const RATE = { max: 10, windowMs: 60_000 }
const hits = new Map<string, number[]>()

function clientIpHeader(request: Request): string | null {
  const fwd = request.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0]?.trim() || null
  return null
}

function rateLimited(ip: string) {
    const now = Date.now()
    const list = (hits.get(ip) || []).filter((t) => now - t < RATE.windowMs)
    if (list.length >= RATE.max) return true
    list.push(now)
    hits.set(ip, [...list])
  if (hits.size > 500) hits.clear()
  return false
}

export async function POST(request: Request) {
  try {
    const ip =
      clientIpHeader(request) || request.headers.get('x-real-ip') || 'unknown'
    if (rateLimited(ip)) {
      return NextResponse.json({ error: 'Too many uploads. Please wait a minute.' }, { status: 429 })
    }

    const form = await request.formData().catch(() => null)
    const file = form?.get('file')
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file received.' }, { status: 400 })
    }
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: 'File too large (max 4MB).' }, { status: 400 })
    }

    const name = (file as { name?: string }).name || 'cv'
    const lower = name.toLowerCase()
    let text = ''

    if (lower.endsWith('.txt') || lower.endsWith('.md')) {
      text = await (file as Blob).text()
    } else if (lower.endsWith('.pdf')) {
      const bytes = new Uint8Array(await (file as Blob).arrayBuffer())
      const pdf = await getDocumentProxy(bytes)
      // mergePages keeps the natural reading order of a CV (scanned-image PDFs
      // contain no text layer and yield '' here — surfaced as an error below)
      const { text: extracted } = await extractText(pdf, { mergePages: true })
      text = Array.isArray(extracted) ? extracted.join('\n') : (extracted as string) ?? ''
    } else {
      return NextResponse.json(
        { error: 'Unsupported format. Please attach a PDF or TXT file.' },
        { status: 415 }
      )
    }

    text = text.replace(/\u0000/g, ' ').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim()
    if (!text || text.replace(/\s/g, '').length < 40) {
      return NextResponse.json(
        { error: "Couldn't read any text from this file — if it's a scan, please paste the text instead." },
        { status: 422 }
      )
    }
    if (text.length > MAX_TEXT_CHARS) text = text.slice(0, MAX_TEXT_CHARS)

    return NextResponse.json({ name, chars: text.length, text })
  } catch (err) {
    console.error('[cv-parse]', err)
    return NextResponse.json({ error: 'Failed to parse this file. Please try another PDF.' }, { status: 500 })
  }
}
