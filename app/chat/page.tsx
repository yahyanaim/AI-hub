'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send, Loader2, SearchX, MessageSquare, Plus, Search, SquarePen,
  PanelLeft, PanelLeftClose, Trash2, X, Paperclip, FileText, Download,
  ListTree, Copy, Check, ImagePlus,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Markdown } from '@/components/ui/Markdown'
import { Avatar } from '@/components/ui/Avatar'

// Standalone AI Career Advisor (opened from the widget header logo). Mirrors
// the ChatGPT layout: collapsible left sidebar with the per-account chat
// history, bare content column, floating rounded composer. Requires the site
// account (username) so chats persist per user across sessions.

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type ChatSession = {
  id: string
  title: string
  messages: Message[]
  updatedAt: number
}

const GREETING =
  "Hey! I'm your AI Career Advisor from AI Hunt. I'll help you build your skills, find the right tools and courses, and create a learning plan that actually works for you. What are you looking to achieve?"

const STATE_KEY = 'ai-hunt-state-v4'
const USERNAME_KEY = 'ai-hunt-username'
const MAX_CONTEXT_MESSAGES = 40

function greeting(): ChatSession {
  return { id: 'greet', title: 'New chat', messages: [{ role: 'assistant', content: GREETING }], updatedAt: Date.now() }
}

function sessionsKey(username: string) {
  return `ai-hunt-chat-sessions::${username}`
}

// ---- Documents (ChatGPT-like artifacts) -----------------------------------
// Complete roadmaps the advisor delivers as ```roadmap blocks become
// documents: listed in the sidebar, previewable in a side panel, and
// exportable as PDF. The full markdown lives with the chat message (so the
// advisor keeps its context); the doc list is just the readable copy.
type ChatDoc = { id: string; title: string; body: string; createdAt: number }

const ROADMAP_FENCE = /```roadmap\s*\n([\s\S]*?)(?:```|$)/

function extractDocBody(content: string): string | null {
  const m = content.match(ROADMAP_FENCE)
  if (!m || !m[1]) return null
  return m[1].trim()
}

function docTitleFrom(body: string): string {
  const line = body.split('\n').find((l) => l.trim().length > 0) || ''
  const title = line.replace(/^#+\s*/, '').trim()
  return title || 'Career roadmap'
}

// Models sometimes write ATS-CV section headings as bold inline text
// (**Summary** content…). ATS docs must parse as real markdown headings,
// so normalize those lines into "## Heading" before the doc is stored.
const ATS_HEADING_RE =
  /^\s*\*\*(Contact Information|Coordonnées|Profil professionnel|Profil|Summary|Professional Summary|Objective|Compétences|Skills|Expériences professionnelles|Work Experience|Experience|Formation|Education|Certifications|Licenses|Projects|Projets|Awards|Langues|Languages|Volunteer Experience|Interests|References)\*\*\s*:?\s*(.*)$/i

function normalizeAtsBody(title: string, body: string): string {
  if (!/ats/i.test(title)) return body
  return body
    .split('\n')
    .map((line) => {
      const m = line.match(ATS_HEADING_RE)
      if (!m || !m[1]) return line
      const rest = (m[2] || '').trim()
      return rest ? `## ${m[1]}\n${rest}` : `## ${m[1]}`
    })
    .join('\n')
}

type AtsSection = { title: string; lines: string[] }

function parseAtsSections(body: string): { header: string[]; sections: AtsSection[] } {
  const header: string[] = []
  const sections: AtsSection[] = []
  let cur: AtsSection | null = null
  for (const raw of body.split('\n')) {
    const line = raw.trim().replace(/\*\*/g, '')
    if (!line || /^#\s/.test(line)) continue
    if (/^##\s/.test(line)) {
      cur = { title: line.replace(/^##\s+/, '').trim(), lines: [] }
      sections.push(cur)
      continue
    }
    if (cur) cur.lines.push(line)
    else header.push(line)
  }
  return { header, sections }
}

const cleanBullet = (l: string) => l.replace(/^[-•*]\s+/, '').trim()

type ContactIconKind = 'pin' | 'phone' | 'mail' | 'link'

type AtsExpItem = {
  role: string
  company: string
  location: string
  dates: string
  bullets: string[]
}

type AtsEduItem = {
  degree: string
  dates: string
  school: string
  details: string[]
}

type ParsedAtsSection =
  | { kind: 'profile'; title: string; paragraphs: string[] }
  | { kind: 'experience'; title: string; items: AtsExpItem[] }
  | { kind: 'education'; title: string; items: AtsEduItem[] }
  | { kind: 'skills'; title: string; items: string[] }
  | { kind: 'languages'; title: string; items: string[] }

type ParsedAtsCv = {
  name: string
  jobTitle: string
  contacts: { kind: ContactIconKind; text: string }[]
  sections: ParsedAtsSection[]
}

const DATE_RE =
  /\b(19|20)\d{2}\b|\b20xx\b|present|current|en cours|aujourd'hui|now|janv?|févr?|fevr?|mars?|avr|apr|mai|may|juin|jun|juil|jul|août|aout|aug|sept?|oct|nov|déc|dec/i

function parseAtsCv(body: string, docTitle: string): ParsedAtsCv {
  const h1Match = body.match(/^#\s+([^\n]+)/m)
  const rawTitle = (h1Match?.[1] || docTitle || 'PRÉNOM NOM').replace(/\*\*/g, '').trim()
  const name = rawTitle.replace(/\s*[—–-]\s*(ATS\s*)?(CV|Resume)\s*$/i, '').trim() || rawTitle

  const { header, sections } = parseAtsSections(body)
  const contactSec = sections.find((s) => /contact|coordonn/i.test(s.title))
  const rawHeaderLines = [...header, ...(contactSec?.lines ?? [])]

  let jobTitle = ''
  let location = ''
  let phone = ''
  let email = ''
  const extraLinks: string[] = []

  for (const rawLine of rawHeaderLines) {
    const cleaned = cleanBullet(rawLine)
    const roleMatch = cleaned.match(
      /^(role|job title|title|target role|intitulé du poste|poste|titre|headline)\s*:\s*(.+)$/i
    )
    if (roleMatch?.[2] && !jobTitle) {
      jobTitle = roleMatch[2].trim()
      continue
    }
    for (const seg of cleaned.split('|')) {
      const s = seg.trim()
      if (!s) continue
      const rMatch = s.match(
        /^(role|job title|title|target role|intitulé du poste|poste|titre|headline)\s*:\s*(.+)$/i
      )
      if (rMatch?.[2] && !jobTitle) {
        jobTitle = rMatch[2].trim()
        continue
      }
      const val = s
        .replace(
          /^(name|full name|nom|address|adresse|city(, ? country)?|city,? country|location|ville|lieu|phone( number)?|tél(éphone)?|tel|mobile|email( address)?|e-mail|mail|courriel|linkedin( profile url)?|github( profile url)?|site|website|portfolio)\s*:\s*/i,
          ''
        )
        .trim()
      if (!val || val.toLowerCase() === name.toLowerCase() || val.toLowerCase() === jobTitle.toLowerCase()) continue
      if (val.includes('@') || /\[.*(email|mail).*\]/i.test(val)) {
        if (!email) email = val
      } else if (/(\+?\d[\d\s().-]{6,}\d)|\[.*(phone|tél|tel|numéro).*\]/i.test(val)) {
        if (!phone) phone = val
      } else if (/https?:\/\/|linkedin\.com|github\.com|www\./i.test(val)) {
        extraLinks.push(val.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, ''))
      } else if (!location && (val.includes(',') || /france|maroc|morocco|canada|uk|usa|paris|lyon|casablanca|rabat|\[.*(city|location|ville).*\]/i.test(val))) {
        location = val
      } else if (!jobTitle && !/\d/.test(val)) {
        jobTitle = val
      } else if (!location) {
        location = val
      }
    }
  }

  const parseExpEntryLine = (line: string): Omit<AtsExpItem, 'bullets'> => {
    const clean = line.replace(/^###+\s*/, '').trim()
    const parts = clean.split('|').map((x) => x.trim()).filter(Boolean)
    let left = parts[0] || clean
    let loc = ''
    let dates = ''
    if (parts.length >= 3) {
      dates = parts[parts.length - 1] || ''
      loc = parts[parts.length - 2] || ''
      left = parts.slice(0, -2).join(' — ')
    } else if (parts.length === 2) {
      const right = parts[1] || ''
      if (DATE_RE.test(right)) dates = right
      else loc = right
    }
    let role = left
    let company = ''
    const dashIdx = left.indexOf(' — ')
    if (dashIdx > 0) {
      const before = left.slice(0, dashIdx).trim()
      const after = left.slice(dashIdx + 3).trim()
      const cIdx = before.indexOf(', ')
      if (cIdx > 0) {
        role = before.slice(0, cIdx).trim()
        company = before.slice(cIdx + 2).trim()
        if (!loc) loc = after
      } else {
        role = before
        if (!loc && (after.includes(',') || !company)) {
          if (after.includes(',')) loc = after
          else company = after
        }
      }
    } else {
      const cIdx = left.indexOf(', ')
      if (cIdx > 0) {
        role = left.slice(0, cIdx).trim()
        company = left.slice(cIdx + 2).trim()
      }
    }
    return { role: role || left, company, location: loc, dates }
  }

  const parsedSections: ParsedAtsSection[] = []

  for (const sec of sections) {
    if (/contact|coordonn/i.test(sec.title)) continue
    const t = sec.title

    if (/profil|summary|objective|about|résumé|propos/i.test(t)) {
      const text = sec.lines
        .map((l) => cleanBullet(l))
        .filter(Boolean)
        .join(' ')
      if (text) parsedSections.push({ kind: 'profile', title: t, paragraphs: [text] })
      continue
    }

    if (/comp[eé]tence|skill|technolog|outil|expertise/i.test(t)) {
      const items: string[] = []
      for (const raw of sec.lines) {
        let l = cleanBullet(raw)
        if (!l) continue
        if (l.includes(':') && (l.includes(',') || l.includes(';') || l.split(':')[0]!.split(/\s+/).length <= 3)) {
          const after = l.slice(l.indexOf(':') + 1).trim()
          if (after) l = after
        }
        if (/^[-•*]\s/.test(raw) && !l.includes(',') && !l.includes(';') && !l.includes('|')) {
          items.push(l)
        } else {
          for (const part of l.split(/[,;•|]/)) {
            const item = part.trim()
            if (item) items.push(item)
          }
        }
      }
      if (items.length) parsedSections.push({ kind: 'skills', title: t, items })
      continue
    }

    if (/langue|language|int[eé]r[eê]t|interest|loisir/i.test(t)) {
      const items: string[] = []
      for (const raw of sec.lines) {
        const l = cleanBullet(raw)
        if (!l) continue
        const parts = l.includes('|') ? l.split('|') : l.includes(';') ? l.split(';') : [l]
        for (const p of parts) {
          const item = p.trim().replace(/\s*:\s*/, ' : ')
          if (item) items.push(item)
        }
      }
      if (items.length) parsedSections.push({ kind: 'languages', title: t, items })
      continue
    }

    if (/formation|education|[eé]tudes|academic|dipl[oô]me|certification|licen[cs]e/i.test(t)) {
      const items: AtsEduItem[] = []
      for (const raw of sec.lines) {
        const line = raw.trim()
        if (!line) continue
        const isBullet = /^[-•*]\s/.test(line)
        const clean = cleanBullet(line)
        const hasPipe = clean.includes('|')
        const lastEdu = items[items.length - 1]

        if (!isBullet && hasPipe) {
          const pIdx = clean.lastIndexOf('|')
          const left = clean.slice(0, pIdx).trim()
          const right = clean.slice(pIdx + 1).trim()
          let degree = left
          let school = ''
          const cIdx = left.indexOf(', ')
          if (cIdx > 0) {
            degree = left.slice(0, cIdx).trim()
            school = left.slice(cIdx + 2).replace(/\s*—\s*/g, ', ').trim()
          } else if (left.includes(' — ')) {
            const dIdx = left.indexOf(' — ')
            degree = left.slice(0, dIdx).trim()
            school = left.slice(dIdx + 3).trim()
          }
          items.push({ degree, dates: right, school, details: [] })
        } else if (
          !isBullet &&
          lastEdu &&
          !lastEdu.school &&
          lastEdu.details.length === 0 &&
          !/^(projet|project|key|cours|mention|gpa)/i.test(clean)
        ) {
          lastEdu.school = clean.replace(/\s*—\s*/g, ', ')
        } else if (lastEdu) {
          lastEdu.details.push(clean)
        } else {
          items.push({ degree: clean, dates: '', school: '', details: [] })
        }
      }
      if (items.length) parsedSections.push({ kind: 'education', title: t, items })
      continue
    }

    // Default: Work Experience / Projects
    const expItems: AtsExpItem[] = []
    for (const raw of sec.lines) {
      const line = raw.trim()
      if (!line) continue
      if (/^[-•*]\s/.test(line)) {
        if (expItems.length === 0) {
          expItems.push({ role: '', company: '', location: '', dates: '', bullets: [] })
        }
        expItems[expItems.length - 1]!.bullets.push(cleanBullet(line))
      } else {
        const prev = expItems[expItems.length - 1]
        if (prev && prev.bullets.length === 0 && !prev.company && (!prev.dates || !prev.location)) {
          const sub = parseExpEntryLine(line)
          prev.company = sub.role
          if (sub.dates && !prev.dates) prev.dates = sub.dates
          if (sub.location && !prev.location) prev.location = sub.location
        } else {
          expItems.push({ ...parseExpEntryLine(line), bullets: [] })
        }
      }
    }
    if (expItems.length) parsedSections.push({ kind: 'experience', title: t, items: expItems })
  }

  if (!jobTitle) {
    const firstExp = parsedSections.find((s): s is ParsedAtsSection & { kind: 'experience' } => s.kind === 'experience')
    if (firstExp?.items[0]?.role) jobTitle = firstExp.items[0].role
    else jobTitle = 'INTITULÉ DU POSTE'
  }

  const contacts: { kind: ContactIconKind; text: string }[] = []
  if (location) contacts.push({ kind: 'pin', text: location })
  if (phone) contacts.push({ kind: 'phone', text: phone })
  if (email) contacts.push({ kind: 'mail', text: email })
  if (contacts.length < 3 && extraLinks[0]) contacts.push({ kind: 'link', text: extraLinks[0] })

  return { name, jobTitle, contacts, sections: parsedSections }
}

const iconCache: Partial<Record<ContactIconKind, string>> = {}

function getContactIconPng(kind: ContactIconKind): string {
  if (iconCache[kind]) return iconCache[kind]!
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')!
  ctx.scale(128 / 24, 128 / 24)
  ctx.fillStyle = '#0f0f0f'
  ctx.strokeStyle = '#0f0f0f'
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  if (kind === 'pin') {
    ctx.fill(
      new Path2D(
        'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z'
      ),
      'evenodd'
    )
  } else if (kind === 'phone') {
    ctx.fill(
      new Path2D(
        'M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z'
      )
    )
  } else if (kind === 'mail') {
    ctx.lineWidth = 1.8
    ctx.strokeRect(2, 4, 20, 16)
    ctx.stroke(new Path2D('M2 4l10 9 10-9M2 20l7-7M22 20l-7-7'))
  } else {
    ctx.lineWidth = 1.8
    ctx.stroke(new Path2D('M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18'))
  }

  const url = canvas.toDataURL('image/png')
  iconCache[kind] = url
  return url
}

async function exportAtsPdf(body: string, title: string, photoDataUrl?: string | null) {
  const { jsPDF } = await import('jspdf')
  const pdf = new jsPDF({ unit: 'mm', format: 'a4' })
  const cv = parseAtsCv(body, title)

  const M = 12.5
  const W = 210 - M * 2 // 185mm
  const SLATE: [number, number, number] = [125, 146, 159] // #7d929f exact template slate blue-grey
  const BLACK: [number, number, number] = [15, 15, 15] // #0f0f0f crisp black rules & body ink
  const MUTED: [number, number, number] = [85, 85, 85] // #555555 right-aligned location & dates

  const measureBody = (s: number): number => {
    let h = 0
    for (const sec of cv.sections) {
      h += (7.2 + 2.1 + 5.2) * s
      if (sec.kind === 'profile') {
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(9.4 * s)
        for (const p of sec.paragraphs) {
          const lines = pdf.splitTextToSize(p, W) as string[]
          h += lines.length * 4.15 * s + 1.2 * s
        }
      } else if (sec.kind === 'experience') {
        sec.items.forEach((it, idx) => {
          pdf.setFont('helvetica', 'bold')
          pdf.setFontSize(9.8 * s)
          const rLines = pdf.splitTextToSize(it.role, W - 48).length
          pdf.setFont('helvetica', 'normal')
          pdf.setFontSize(9.4 * s)
          const cLines = it.company ? pdf.splitTextToSize(it.company, W - 48).length : 0
          const headerRows = Math.max(rLines + cLines, it.location && it.dates ? 2 : 1, 1)
          h += headerRows * 4.5 * s + 1.4 * s
          for (const b of it.bullets) {
            const bLines = pdf.splitTextToSize(b, W - 3.6).length
            h += bLines * 4.15 * s
          }
          if (idx < sec.items.length - 1) h += 4.2 * s
        })
      } else if (sec.kind === 'education') {
        sec.items.forEach((it, idx) => {
          const topText = it.dates ? `${it.degree} | ${it.dates}` : it.degree
          pdf.setFont('helvetica', 'bold')
          pdf.setFontSize(9.8 * s)
          h += pdf.splitTextToSize(topText, W).length * 4.5 * s
          if (it.school) {
            pdf.setFont('helvetica', 'normal')
            pdf.setFontSize(9.4 * s)
            h += pdf.splitTextToSize(it.school, W).length * 4.4 * s
          }
          for (const d of it.details) {
            pdf.setFont('helvetica', 'normal')
            pdf.setFontSize(9.4 * s)
            h += pdf.splitTextToSize(d, W).length * 4.3 * s + 0.5 * s
          }
          if (idx < sec.items.length - 1) h += 4.5 * s
        })
      } else if (sec.kind === 'skills') {
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(9.4 * s)
        const maxLen = Math.max(...sec.items.map((i) => i.length), 1)
        const cols = maxLen <= 24 ? 4 : 3
        const colW = W / cols
        for (let i = 0; i < sec.items.length; i += cols) {
          let rowLines = 1
          for (const it of sec.items.slice(i, i + cols)) {
            rowLines = Math.max(rowLines, pdf.splitTextToSize(it, colW - 4.5).length)
          }
          h += rowLines * 4.2 * s + 1.6 * s
        }
      } else if (sec.kind === 'languages') {
        const rows = Math.ceil(sec.items.length / 3)
        h += rows * 5.2 * s
      }
    }
    return h
  }

  const startBodyY = 51
  const availH = 285 - startBodyY
  let s = 1
  for (let i = 0; i < 5; i++) {
    const needed = measureBody(s)
    if (needed <= availH) break
    const next = Math.max(0.62, s * (availH / needed) * 0.99)
    if (Math.abs(next - s) < 0.005) break
    s = next
  }

  // ---- Header (with optional top-left portrait photo matching template) ---
  const hasPhoto = Boolean(photoDataUrl)
  if (photoDataUrl) {
    try {
      pdf.addImage(photoDataUrl, 'JPEG', M, 10, 35, 35, undefined, 'FAST')
    } catch {}
  }

  const hx1 = hasPhoto ? 63 : 22
  const hx2 = hasPhoto ? 194.5 : 188
  const hcx = (hx1 + hx2) / 2

  // PRÉNOM NOM (large uppercase serif in slate blue-grey)
  pdf.setFont('times', 'bold')
  pdf.setFontSize(24 * Math.max(s, 0.85))
  pdf.setTextColor(SLATE[0], SLATE[1], SLATE[2])
  pdf.setCharSpace(0.75)
  pdf.text(cv.name.toUpperCase(), hcx, 20, { align: 'center' })
  pdf.setCharSpace(0)

  // INTITULÉ DU POSTE (uppercase sans-serif subtitle above rule)
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(10 * Math.max(s, 0.85))
  pdf.setTextColor(BLACK[0], BLACK[1], BLACK[2])
  pdf.setCharSpace(0.45)
  pdf.text(cv.jobTitle.toUpperCase(), hcx, 27.5, { align: 'center' })
  pdf.setCharSpace(0)

  // Black horizontal header rule
  pdf.setDrawColor(BLACK[0], BLACK[1], BLACK[2])
  pdf.setLineWidth(0.45)
  pdf.line(hx1, 30.6, hx2, 30.6)

  // Contact row with vector icons centered below header rule
  if (cv.contacts.length > 0) {
    const cFontSize = 9.2 * Math.max(s, 0.85)
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(cFontSize)
    pdf.setTextColor(BLACK[0], BLACK[1], BLACK[2])
    const iconSz = 3.5
    const iconTextGap = 2.3
    const itemGap = 8.5
    const widths = cv.contacts.map((c) => iconSz + iconTextGap + pdf.getTextWidth(c.text))
    const totalW = widths.reduce((a, b) => a + b, 0) + itemGap * (cv.contacts.length - 1)
    let cx = hcx - totalW / 2
    const cy = 36.2
    cv.contacts.forEach((c, idx) => {
      try {
        const iconUrl = getContactIconPng(c.kind)
        pdf.addImage(iconUrl, 'PNG', cx, cy - 2.95, iconSz, iconSz)
      } catch {}
      pdf.text(c.text, cx + iconSz + iconTextGap, cy)
      cx += widths[idx]! + itemGap
    })
  }

  let y = startBodyY
  const ensure = (h: number) => {
    if (y + h > 286) {
      pdf.addPage()
      y = 16
    }
  }

  for (let sIdx = 0; sIdx < cv.sections.length; sIdx++) {
    const sec = cv.sections[sIdx]!
    ensure(16 * s)
    if (sIdx > 0) y += 7.2 * s
    else y += 5.5 * s

    // Section heading in uppercase slate blue-grey + crisp black full-width underline
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(11 * s)
    pdf.setTextColor(SLATE[0], SLATE[1], SLATE[2])
    pdf.setCharSpace(0.55)
    pdf.text(sec.title.toUpperCase(), M, y)
    pdf.setCharSpace(0)
    y += 2.1 * s
    pdf.setDrawColor(BLACK[0], BLACK[1], BLACK[2])
    pdf.setLineWidth(0.45)
    pdf.line(M, y, M + W, y)
    y += 5.4 * s

    if (sec.kind === 'profile') {
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(9.4 * s)
      pdf.setTextColor(BLACK[0], BLACK[1], BLACK[2])
      for (const p of sec.paragraphs) {
        const lines = pdf.splitTextToSize(p, W) as string[]
        for (const l of lines) {
          ensure(4.5 * s)
          pdf.text(l, M, y)
          y += 4.15 * s
        }
      }
    } else if (sec.kind === 'experience') {
      sec.items.forEach((it, idx) => {
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(9.8 * s)
        const roleArr = pdf.splitTextToSize(it.role, W - 48) as string[]
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(9.4 * s)
        const compArr = it.company ? (pdf.splitTextToSize(it.company, W - 48) as string[]) : []
        const rows = Math.max(roleArr.length + compArr.length, it.location && it.dates ? 2 : 1, 1)
        ensure((rows * 4.5 + 5) * s)

        // Right-aligned location & dates in muted grey
        if (it.location) {
          pdf.setFont('helvetica', 'normal')
          pdf.setFontSize(9.2 * s)
          pdf.setTextColor(MUTED[0], MUTED[1], MUTED[2])
          pdf.text(it.location, M + W, y, { align: 'right' })
        }
        if (it.dates) {
          pdf.setFont('helvetica', 'normal')
          pdf.setFontSize(9.2 * s)
          pdf.setTextColor(MUTED[0], MUTED[1], MUTED[2])
          pdf.text(it.dates, M + W, y + (it.location ? 4.6 * s : 0), { align: 'right' })
        }

        // Left-aligned bold role + normal company
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(9.8 * s)
        pdf.setTextColor(BLACK[0], BLACK[1], BLACK[2])
        for (const r of roleArr) {
          pdf.text(r, M, y)
          y += 4.6 * s
        }
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(9.4 * s)
        pdf.setTextColor(BLACK[0], BLACK[1], BLACK[2])
        for (const c of compArr) {
          pdf.text(c, M, y)
          y += 4.5 * s
        }
        if (roleArr.length + compArr.length === 1 && it.location && it.dates) {
          y += 4.5 * s
        }

        if (it.bullets.length > 0) {
          y += 1.2 * s
          for (const b of it.bullets) {
            pdf.setFont('helvetica', 'normal')
            pdf.setFontSize(9.4 * s)
            pdf.setTextColor(BLACK[0], BLACK[1], BLACK[2])
            const bArr = pdf.splitTextToSize(b, W - 3.6) as string[]
            bArr.forEach((line, bIdx) => {
              ensure(4.5 * s)
              if (bIdx === 0) {
                pdf.setFillColor(BLACK[0], BLACK[1], BLACK[2])
                pdf.circle(M + 0.9, y - 1.05 * s, 0.52 * s, 'F')
              }
              pdf.text(line, M + 3.4, y)
              y += 4.15 * s
            })
          }
        }
        if (idx < sec.items.length - 1) y += 4.2 * s
      })
    } else if (sec.kind === 'education') {
      sec.items.forEach((it, idx) => {
        ensure(14 * s)
        const topLine = it.dates ? `${it.degree} | ${it.dates}` : it.degree
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(9.8 * s)
        pdf.setTextColor(BLACK[0], BLACK[1], BLACK[2])
        const topArr = pdf.splitTextToSize(topLine, W) as string[]
        for (const l of topArr) {
          pdf.text(l, M, y)
          y += 4.6 * s
        }
        if (it.school) {
          pdf.setFont('helvetica', 'normal')
          pdf.setFontSize(9.4 * s)
          pdf.setTextColor(BLACK[0], BLACK[1], BLACK[2])
          const sArr = pdf.splitTextToSize(it.school, W) as string[]
          for (const l of sArr) {
            pdf.text(l, M, y)
            y += 4.6 * s
          }
        }
        if (it.details.length > 0) {
          y += 0.6 * s
          for (const d of it.details) {
            ensure(5 * s)
            const colonMatch = d.match(/^([^:]{2,32}\s*:)\s*(.+)$/)
            if (colonMatch?.[1] && colonMatch[2]) {
              const label = `${colonMatch[1]} `
              const rest = colonMatch[2]
              pdf.setFont('helvetica', 'bold')
              pdf.setFontSize(9.4 * s)
              pdf.setTextColor(BLACK[0], BLACK[1], BLACK[2])
              const labelW = pdf.getTextWidth(label)
              pdf.text(label, M, y)
              pdf.setFont('helvetica', 'normal')
              const firstLineAvail = W - labelW
              const restWords = rest.split(/\s+/)
              let firstLine = ''
              let wIdx = 0
              while (wIdx < restWords.length) {
                const candidate = firstLine ? `${firstLine} ${restWords[wIdx]}` : restWords[wIdx]!
                if (pdf.getTextWidth(candidate) <= firstLineAvail) {
                  firstLine = candidate
                  wIdx++
                } else break
              }
              pdf.text(firstLine, M + labelW, y)
              y += 4.2 * s
              const remaining = restWords.slice(wIdx).join(' ')
              if (remaining) {
                const remArr = pdf.splitTextToSize(remaining, W) as string[]
                for (const rl of remArr) {
                  pdf.text(rl, M, y)
                  y += 4.2 * s
                }
              }
            } else {
              pdf.setFont('helvetica', 'normal')
              pdf.setFontSize(9.4 * s)
              pdf.setTextColor(BLACK[0], BLACK[1], BLACK[2])
              const dArr = pdf.splitTextToSize(d, W) as string[]
              for (const dl of dArr) {
                pdf.text(dl, M, y)
                y += 4.2 * s
              }
            }
          }
        }
        if (idx < sec.items.length - 1) y += 4.5 * s
      })
    } else if (sec.kind === 'skills') {
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(9.4 * s)
      const maxLen = Math.max(...sec.items.map((i) => i.length), 1)
      const cols = maxLen <= 24 ? 4 : 3
      const colOffsets = cols === 4 ? [0, 0.318 * W, 0.595 * W, 0.845 * W] : [0, 0.34 * W, 0.68 * W]
      const colWidths =
        cols === 4 ? [0.31 * W, 0.27 * W, 0.24 * W, 0.155 * W] : [0.33 * W, 0.33 * W, 0.32 * W]
      for (let i = 0; i < sec.items.length; i += cols) {
        const row = sec.items.slice(i, i + cols)
        let rowLines = 1
        const cells = row.map((it, cIdx) => {
          pdf.setFont('helvetica', 'normal')
          pdf.setFontSize(9.4 * s)
          const arr = pdf.splitTextToSize(it, (colWidths[cIdx] ?? W / cols) - 4) as string[]
          rowLines = Math.max(rowLines, arr.length)
          return arr
        })
        ensure(rowLines * 4.2 * s + 1.6 * s)
        cells.forEach((cell, cIdx) => {
          const cx = M + (colOffsets[cIdx] ?? cIdx * (W / cols))
          pdf.setFillColor(BLACK[0], BLACK[1], BLACK[2])
          pdf.circle(cx + 0.9, y - 1.05 * s, 0.52 * s, 'F')
          pdf.setFont('helvetica', 'normal')
          pdf.setFontSize(9.4 * s)
          pdf.setTextColor(BLACK[0], BLACK[1], BLACK[2])
          pdf.text(cell, cx + 3.4, y)
        })
        y += rowLines * 4.2 * s + 1.8 * s
      }
    } else if (sec.kind === 'languages') {
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(9.4 * s)
      pdf.setTextColor(BLACK[0], BLACK[1], BLACK[2])
      for (let i = 0; i < sec.items.length; i += 3) {
        const row = sec.items.slice(i, i + 3)
        ensure(5.5 * s)
        if (row.length === 3) {
          pdf.text(row[0]!, M, y, { align: 'left' })
          pdf.text(row[1]!, M + W / 2, y, { align: 'center' })
          pdf.text(row[2]!, M + W, y, { align: 'right' })
        } else if (row.length === 2) {
          pdf.text(row[0]!, M, y, { align: 'left' })
          pdf.text(row[1]!, M + W, y, { align: 'right' })
        } else if (row[0]) {
          pdf.text(row[0], M, y, { align: 'left' })
        }
        y += 5.2 * s
      }
    }
  }

  pdf.save(`${cv.name.replace(/[^\w -]/g, '').trim().slice(0, 60) || 'ats-cv'} - ATS CV.pdf`)
}

function ContactIconSvg({ kind }: { kind: ContactIconKind }) {
  if (kind === 'pin') {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-[#0f0f0f]" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
      </svg>
    )
  }
  if (kind === 'phone') {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-[#0f0f0f]" fill="currentColor">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
      </svg>
    )
  }
  if (kind === 'mail') {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-[#0f0f0f]" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="1" />
        <path d="m2 4 10 9 10-9M2 20l7-7M22 20l-7-7" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-[#0f0f0f]" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  )
}

function AtsCvPreview({
  body,
  title,
  photo,
  onPickPhoto,
  onClearPhoto,
}: {
  body: string
  title: string
  photo: string | null
  onPickPhoto: () => void
  onClearPhoto: () => void
}) {
  const cv = parseAtsCv(body, title)
  return (
    <div className="mx-auto w-full max-w-[680px] bg-white px-5 py-7 font-sans text-[13px] leading-[1.45] text-[#0f0f0f] sm:px-8 sm:py-9">
      {/* Header matching reference image */}
      <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="group relative h-[108px] w-[108px] shrink-0 overflow-hidden bg-neutral-100">
          {photo ? (
            <>
              <img src={photo} alt={cv.name} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={onClearPhoto}
                title="Remove photo"
                className="absolute right-1 top-1 hidden rounded-full bg-black/65 p-1 text-white hover:bg-black group-hover:block"
              >
                <X className="h-3 w-3" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onPickPhoto}
              className="flex h-full w-full flex-col items-center justify-center gap-1 border border-dashed border-neutral-300 text-[11px] font-medium text-neutral-400 transition-colors hover:border-[#7d929f] hover:text-[#7d929f]"
            >
              <ImagePlus className="h-4 w-4" />
              <span>Photo</span>
            </button>
          )}
        </div>
        <div className="min-w-0 flex-1 text-center">
          <h1
            id="doc-h-0"
            className="font-serif text-[27px] font-bold uppercase tracking-[0.06em] text-[#7d929f] sm:text-[30px]"
            style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif", border: 'none', margin: 0, padding: 0 }}
          >
            {cv.name}
          </h1>
          <p className="mt-1 text-center text-[13px] font-normal uppercase tracking-[0.08em] text-[#0f0f0f]">
            {cv.jobTitle}
          </p>
          <div className="my-2.5 h-[1.5px] w-full bg-[#0f0f0f]" />
          {cv.contacts.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-[12.5px] text-[#0f0f0f]">
              {cv.contacts.map((c, idx) => (
                <span key={idx} className="inline-flex items-center gap-2">
                  <ContactIconSvg kind={c.kind} />
                  <span>{c.text}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sections */}
      {cv.sections.map((sec, idx) => (
        <section key={idx} className="mt-5">
          <h2
            id={`doc-h-${idx + 1}`}
            className="border-b-[1.5px] border-[#0f0f0f] pb-1 text-[14px] font-bold uppercase tracking-[0.06em] text-[#7d929f]"
            style={{ margin: '0 0 10px 0' }}
          >
            {sec.title}
          </h2>

          {sec.kind === 'profile' && (
            <div className="space-y-2">
              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="m-0 text-start text-[12.8px] leading-[1.5] text-[#0f0f0f]">
                  {p}
                </p>
              ))}
            </div>
          )}

          {sec.kind === 'experience' && (
            <div className="space-y-4">
              {sec.items.map((it, eIdx) => (
                <div key={eIdx}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[13.2px] font-bold text-[#0f0f0f]">{it.role}</span>
                    {it.location && <span className="shrink-0 text-[12.5px] text-[#555555]">{it.location}</span>}
                  </div>
                  {(it.company || it.dates) && (
                    <div className="mt-0.5 flex items-baseline justify-between gap-4">
                      <span className="text-[12.8px] text-[#0f0f0f]">{it.company}</span>
                      {it.dates && <span className="shrink-0 text-[12.5px] text-[#555555]">{it.dates}</span>}
                    </div>
                  )}
                  {it.bullets.length > 0 && (
                    <ul className="mt-1.5 list-none space-y-0.5 p-0">
                      {it.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="relative pl-3.5 text-start text-[12.8px] leading-[1.45] text-[#0f0f0f]">
                          <span className="absolute left-0 top-0 font-bold text-[#0f0f0f]">•</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {sec.kind === 'education' && (
            <div className="space-y-3.5">
              {sec.items.map((it, edIdx) => (
                <div key={edIdx}>
                  <div className="text-[13.2px] font-bold text-[#0f0f0f]">
                    {it.dates ? `${it.degree} | ${it.dates}` : it.degree}
                  </div>
                  {it.school && <div className="mt-0.5 text-[12.8px] text-[#0f0f0f]">{it.school}</div>}
                  {it.details.map((d, dIdx) => {
                    const colonMatch = d.match(/^([^:]{2,32}\s*:)\s*(.+)$/)
                    return (
                      <div key={dIdx} className="mt-1 text-[12.8px] leading-[1.45] text-[#0f0f0f]">
                        {colonMatch?.[1] && colonMatch[2] ? (
                          <>
                            <strong className="font-bold text-[#0f0f0f]">{colonMatch[1]}</strong> {colonMatch[2]}
                          </>
                        ) : (
                          d
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          )}

          {sec.kind === 'skills' && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-4">
              {sec.items.map((sk, sIdx) => (
                <div key={sIdx} className="relative pl-3.5 text-[12.8px] text-[#0f0f0f]">
                  <span className="absolute left-0 top-0 font-bold text-[#0f0f0f]">•</span>
                  {sk}
                </div>
              ))}
            </div>
          )}

          {sec.kind === 'languages' && (
            <div className="flex flex-wrap items-center justify-between gap-4 text-[12.8px] text-[#0f0f0f]">
              {sec.items.map((lg, lIdx) => (
                <span key={lIdx}>{lg}</span>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  )
}

function docsKey(username: string) {
  return `ai-hunt-chat-docs::${username}`
}

function loadDocs(username: string): ChatDoc[] {
  try {
    const raw = localStorage.getItem(docsKey(username))
    const list = raw ? (JSON.parse(raw) as ChatDoc[]) : []
    return Array.isArray(list) ? list.filter((d) => d.id && d.title && d.body) : []
  } catch {
    return []
  }
}

function loadSessions(username: string): ChatSession[] {
  try {
    const raw = localStorage.getItem(sessionsKey(username))
    const list = raw ? (JSON.parse(raw) as ChatSession[]) : []
    return list.filter((s) => s.id && Array.isArray(s.messages) && s.messages.length > 0)
  } catch {
    return []
  }
}

function persist(username: string | null, sessions: ChatSession[], activeId: string) {
  if (!username) return
  try {
    localStorage.setItem(sessionsKey(username), JSON.stringify(sessions.slice(0, 40)))
    localStorage.setItem(`ai-hunt-chat-active::${username}`, activeId)
  } catch {}
}

export default function ChatPage() {
  // ---- Account requirement ------------------------------------------------
  const [username, setUsername] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [accountChecked, setAccountChecked] = useState(false)
  const [signupName, setSignupName] = useState('')
  const [signupError, setSignupError] = useState<string | null>(null)

  // ---- Chat state ---------------------------------------------------------
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [activeId, setActiveId] = useState('greet')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [docs, setDocs] = useState<ChatDoc[]>([])
  const [openDocId, setOpenDocId] = useState<string | null>(null)
  const [exportingPdf, setExportingPdf] = useState(false)
  const [tocOpen, setTocOpen] = useState(false)
  const [toc, setToc] = useState<{ id: string; level: number; text: string }[]>([])
  const [copied, setCopied] = useState(false)
  // Attached CV: file bytes are parsed to text once (PDF via the transient
  // parse endpoint) and live ONLY in this state — never written to disk,
  // localStorage, or the server. Removing the chip or reloading discards it.
  const [cvName, setCvName] = useState<string | null>(null)
  const [cvText, setCvText] = useState('')
  const [cvBusy, setCvBusy] = useState(false)
  const [cvError, setCvError] = useState<string | null>(null)
  const [cvPhoto, setCvPhoto] = useState<string | null>(null)
  const cvInputRef = useRef<HTMLInputElement>(null)
  const photoInputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const docsRef = useRef<ChatDoc[]>([])
  const pdfRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)
  const activeIdRef = useRef<string>('greet')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const active = sessions.find((s) => s.id === activeId) ?? greeting()
  const messages = active.messages

  // ---- Account bootstrapping ---------------------------------------------
  const signIn = useCallback((rawName: string) => {
    const clean = rawName.trim().toLowerCase().replace(/[^a-z0-9_]/g, '')
    if (clean.length < 2) return false
    try {
      // Ensure the account also exists in the main site's state so the
      // profile/votes system sees the same identity on next load.
      const rawState = localStorage.getItem(STATE_KEY)
      if (rawState) {
        const delta = JSON.parse(rawState) as {
          users?: { id: string; username: string; avatarUrl?: string; [k: string]: unknown }[]
          currentUserId?: string | null
          [k: string]: unknown
        }
        const users = Array.isArray(delta.users) ? delta.users : []
        const existing = users.find(
          (u) => typeof u?.username === 'string' && u.username.toLowerCase() === clean
        )
        if (!existing) {
          users.push({
            id: `chat-${clean}-${uuidShort()}`,
            username: clean,
            displayName: rawName.trim().slice(0, 32) || clean,
            avatarUrl: '',
            bio: '',
            upvotedItems: [],
            bookmarkedItems: [],
            submittedTools: [],
            submittedDevTools: [],
            submittedRepos: [],
            submittedPrompts: [],
            karma: 0,
            createdAt: new Date().toISOString(),
          })
        }
        delta.users = users
        const last = users[users.length - 1]
        delta.currentUserId = existing?.id ?? (last ? last.id : null)
        localStorage.setItem(STATE_KEY, JSON.stringify(delta))
        // Same profile photo as the site's profile page (falls back to the
        // same deterministic fruit avatar — Avatar must get displayName,
        // the exact input the profile page feeds it).
        const me = existing ?? last
        setAvatarUrl(typeof me?.avatarUrl === 'string' ? me.avatarUrl : '')
        setDisplayName(
          typeof me?.displayName === 'string' ? me.displayName : rawName.trim().slice(0, 32) || clean
        )
      }
      localStorage.setItem(USERNAME_KEY, clean)
      setUsername(clean)
      const stored = loadSessions(clean)
      const storedActive = localStorage.getItem(`ai-hunt-chat-active::${clean}`)
      setSessions(stored.length > 0 ? stored : [greeting()])
      setDocs(loadDocs(clean))
      const firstStored: ChatSession | undefined = stored[0]
      setActiveId(
        storedActive && stored.some((s) => s.id === storedActive)
          ? storedActive
          : firstStored
            ? firstStored.id
            : 'greet'
      )
      return true
    } catch {
      return false
    }
  }, [])

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 767px)').matches)
    const mobile = window.matchMedia('(max-width: 767px)').matches
    setSidebarOpen(!mobile)
    try {
      // Already logged in on the site? Derive the username from the site
      // state (currentUserId) — never re-ask for a name.
      let name = localStorage.getItem(USERNAME_KEY)
      if (!name) {
        const rawState = localStorage.getItem(STATE_KEY)
        if (rawState) {
          const delta = JSON.parse(rawState) as {
            users?: { id: string; username: string }[]
            currentUserId?: string | null
          }
          const users = Array.isArray(delta.users) ? delta.users : []
          const cu = delta.currentUserId
            ? users.find((u) => u.id === delta.currentUserId)
            : null
          if (typeof cu?.username === 'string') name = cu.username
        }
      }
      if (name && name.length >= 2) signIn(name)
    } catch {}
    // Prefill from the widget handoff: /chat?q=<question>
    try {
      const q = new URLSearchParams(window.location.search).get('q')
      if (q) setInput(q)
    } catch {}
    setAccountChecked(true)
  }, [signIn])

  useEffect(() => {
    if (!username) return
    // Skip only the first render (sessions just loaded from storage) —
    // every later change is saved to the local browser storage.
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    persist(username, sessions, activeId)
  }, [sessions, activeId, username])

  useEffect(() => {
    if (!username) return
    try {
      localStorage.setItem(docsKey(username), JSON.stringify(docs.slice(0, 30)))
    } catch {}
  }, [docs, username])

  useEffect(() => {
    if (!isMobile) inputRef.current?.focus()
  }, [activeId, isMobile])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Keep a mirrored ref of activeId for streaming handlers.
  activeIdRef.current = activeId
  docsRef.current = docs

  const docScrollRef = useRef<HTMLDivElement>(null)

  const openDoc = docs.find((d) => d.id === openDocId) ?? null

  // Build the outline (Contents) from the rendered doc headings.
  useEffect(() => {
    if (!openDoc) return
    const raf = requestAnimationFrame(() => {
      const el = pdfRef.current
      if (!el) return
      const heads = Array.from(el.querySelectorAll('h1, h2')) as HTMLElement[]
      const items: { id: string; level: number; text: string }[] = []
      heads.forEach((h) => {
        const text = (h.textContent || '').trim()
        if (!text) return
        const id = `doc-h-${items.length}`
        h.id = id
        items.push({ id, level: h.tagName === 'H1' ? 1 : 2, text })
      })
      setToc(items)
    })
    return () => cancelAnimationFrame(raf)
  }, [openDoc])

  // Store (or refresh) a document captured from a chat message; returns its id.
  const ensureDoc = (rawBody: string): string => {
    const title = docTitleFrom(rawBody)
    const body = normalizeAtsBody(title, rawBody)
    const existing = docsRef.current.find((d) => d.title === title)
    if (existing) {
      if (existing.body !== body) {
        setDocs((prev) => prev.map((d) => (d.title === title ? { ...d, body } : d)))
      }
      return existing.id
    }
    const id = `d${Date.now()}`
    setDocs((prev) => [{ id, title, body, createdAt: Date.now() }, ...prev].slice(0, 30))
    return id
  }

  const deleteDoc = (id: string) => {
    setDocs((prev) => prev.filter((d) => d.id !== id))
    if (openDocId === id) setOpenDocId(null)
  }

  const copyDoc = async () => {
    if (!openDoc) return
    try {
      await navigator.clipboard.writeText(openDoc.body)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  const docWordCount = openDoc ? openDoc.body.replace(/[#|\-*`>]/g, ' ').split(/\s+/).filter(Boolean).length : 0
  const docBodyNoH1 = openDoc ? openDoc.body.replace(/^#\s+[^\n]+\n?/, '') : ''

  const handlePhotoFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const size = 420
        const c = document.createElement('canvas')
        c.width = size
        c.height = size
        const ctx = c.getContext('2d')
        if (!ctx) return
        const minSide = Math.min(img.width, img.height)
        const sx = (img.width - minSide) / 2
        const sy = (img.height - minSide) / 2
        ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size)
        setCvPhoto(c.toDataURL('image/jpeg', 0.9))
      }
      if (typeof reader.result === 'string') img.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  // ---- PDF export (client-side: html2canvas + jsPDF, A4 multi-page) -------
  const exportPdf = async () => {
    if (!openDoc) return
    if (/ats/i.test(openDoc.title)) {
      setExportingPdf(true)
      try {
        await exportAtsPdf(openDoc.body, openDoc.title, cvPhoto)
      } catch (err) {
        console.error('[pdf-export]', err)
      } finally {
        setExportingPdf(false)
      }
      return
    }
    const el = pdfRef.current
    if (!el) return
    setExportingPdf(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const { jsPDF } = await import('jspdf')
      const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#ffffff', useCORS: true })
      const pdf = new jsPDF({ unit: 'mm', format: 'a4' })
      const margin = 10
      const imgW = 210 - margin * 2
      const pageH = 297 - margin * 2
      const chunkPx = Math.floor((canvas.width * pageH) / imgW)
      const pages = Math.ceil(canvas.height / chunkPx)
      for (let p = 0; p < pages; p++) {
        if (p > 0) pdf.addPage()
        const h = Math.min(chunkPx, canvas.height - p * chunkPx)
        const tmp = document.createElement('canvas')
        tmp.width = canvas.width
        tmp.height = h
        const ctx = tmp.getContext('2d')
        if (!ctx) break
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, tmp.width, tmp.height)
        ctx.drawImage(canvas, 0, p * chunkPx, canvas.width, h, 0, 0, canvas.width, h)
        pdf.addImage(tmp.toDataURL('image/jpeg', 0.92), 'JPEG', margin, margin, imgW, (h * imgW) / canvas.width, undefined, 'FAST')
      }
      pdf.save(`${openDoc.title.replace(/[^\w -]/g, '').trim().slice(0, 80) || 'roadmap'}.pdf`)
    } catch (err) {
      console.error('[pdf-export]', err)
    } finally {
      setExportingPdf(false)
    }
  }

  // ---- Session management -------------------------------------------------
  const newChat = () => {
    const s = greeting()
    setSessions((prev) => [s, ...prev.filter((p) => p.id !== 'greet')])
    setActiveId(s.id)
    setError('')
    setInput('')
    if (isMobile) setSidebarOpen(false)
    inputRef.current?.focus()
  }

  const selectChat = (id: string) => {
    setActiveId(id)
    setError('')
    if (isMobile) setSidebarOpen(false)
  }

  const deleteChat = (id: string) => {
    setSessions((prev) => {
      const remaining = prev.filter((s) => s.id !== id)
      if (activeIdRef.current === id) setActiveId(remaining[remaining.length - 1]?.id ?? 'greet')
      return remaining
    })
  }

  const shownSessions = sessions.filter(
    (s) => !search || s.title.toLowerCase().includes(search.toLowerCase())
  )

  // ---- CV attach (parse in memory, never store) ---------------------------
  const handleCvFile = async (file: File) => {
    setCvError(null)
    const lower = file.name.toLowerCase()
    if (!lower.endsWith('.pdf') && !lower.endsWith('.txt') && !lower.endsWith('.md')) {
      setCvError('Please attach a PDF or TXT file (export DOCX to PDF first).')
      return
    }
    if (file.size > 4 * 1024 * 1024) {
      setCvError('File too large (max 4MB).')
      return
    }
    setCvBusy(true)
    try {
      let text: string
      if (lower.endsWith('.pdf')) {
        const form = new FormData()
        form.append('file', file)
        const res = await fetch('/api/chat/cv', { method: 'POST', body: form })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
        text = data.text as string
      } else {
        text = await file.text()
      }
      setCvName(file.name)
      setCvText(text)
      inputRef.current?.focus()
    } catch (err: any) {
      setCvError(err?.message || 'Could not read this file.')
    } finally {
      setCvBusy(false)
      if (cvInputRef.current) cvInputRef.current.value = ''
    }
  }

  // ---- Streaming fetch ----------------------------------------------------
  const sendMessage = async (override?: string) => {
    const text = (typeof override === 'string' ? override : input).trim()
    if ((!text && !cvText) || loading) return

    const isSeed = activeIdRef.current === 'greet'
    const sid = isSeed ? `c${Date.now()}` : activeIdRef.current
    const title = isSeed ? (text || 'CV analysis').slice(0, 48) : active.title
    const withUser: Message[] = [...messages, { role: 'user', content: text || 'Please analyse the CV I attached.' }]

    const placeholder: ChatSession = {
      id: sid,
      title,
      messages: [...withUser, { role: 'assistant', content: '' }],
      updatedAt: Date.now(),
    }
    setSessions((prev) =>
      isSeed ? [placeholder, ...prev.filter((p) => p.id !== 'greet')] : prev.map((p) => (p.id === sid ? placeholder : p))
    )
    if (isSeed) setActiveId(sid)

    const patch = (content: string) =>
      setSessions((prev) =>
        prev.map((s) =>
          s.id === sid
            ? { ...s, messages: [...s.messages.slice(0, -1), { role: 'assistant' as const, content }] }
            : s
        )
      )

    setInput('')
    if (isMobile) inputRef.current?.blur()
    setLoading(true)

    const runOnce = async (): Promise<string> => {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cv: cvText || undefined,
          messages: withUser
            .map(({ role, content }) => ({ role, content: content.length > 18_000 ? content.slice(0, 18_000) : content }))
            .slice(-MAX_CONTEXT_MESSAGES),
        }),
      })
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.details || errorData.error || `HTTP ${res.status}`)
      }
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let acc = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''
        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed.startsWith('data: ')) continue
          const data = trimmed.slice(6)
          if (data === '[DONE]') break
          let json: { error?: string; choices?: { delta?: { content?: string } }[] }
          try {
            json = JSON.parse(data)
          } catch {
            continue
          }
          if (json.error) throw new Error(json.error)
          const chunk = json.choices?.[0]?.delta?.content
          if (chunk) {
            acc += chunk
            patch(acc)
          }
        }
      }
      if (!acc) throw new Error('Empty response from AI')
      return acc
    }

    let assistantMsg = ''
    try {
      try {
        assistantMsg = await runOnce()
      } catch (firstErr) {
        assistantMsg = await runOnce()
      }
      // A complete roadmap in this reply becomes a document (auto-opens, ChatGPT-like)
      const docBody = extractDocBody(assistantMsg)
      if (docBody) setOpenDocId(ensureDoc(docBody))
    } catch (err: any) {
      const msg = err?.message || 'Something went wrong. Please try again.'
      setError(msg)
      patch(`Sorry, I encountered an error: ${msg}`)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      sendMessage()
    }
  }

  const stillLoadingEmpty = loading && !messages.some((m) => m.role === 'assistant' && m.content === '')
  const isFresh = active.id === 'greet'
  // Attached-CV chip: rendered above the composer. This text lives in memory
  // only (column above) — the file is never uploaded to long-term storage.
  const CvChip = cvName ? (
    <div className="mx-auto mb-2 flex w-full max-w-3xl items-center gap-2 rounded-xl border border-border bg-muted/60 px-3 py-1.5 text-xs text-foreground">
      <FileText className="h-3.5 w-3.5 shrink-0 text-brand-orange" />
      <span className="truncate font-medium">{cvName}</span>
      <span className="ml-auto shrink-0 text-muted-foreground">attached · not stored</span>
      <button
        onClick={() => {
          if (!cvText) return
          sendMessage(
            'Rewrite my CV as a clean 1-page ATS CV matching our executive template: include Contact Information (Role, Location, Phone, Email), Profil professionnel / Professional Summary (one cohesive paragraph), Expériences professionnelles / Work Experience (reverse-chronological: Job Title, Company — City, Country | Dates + 3-4 concise action bullets), Formation / Education (Degree | Dates on line 1, School, City, Country on line 2, Projet réalisé : ... on line 3), Compétences / Skills (8 concise standalone skills), and Langues / Languages (Language : Level). Keep it strictly truthful to my CV and in the same language. Output the complete ATS CV as a document.'
          )
        }}
        disabled={loading || cvBusy}
        className="shrink-0 rounded-full border border-brand-orange/40 px-2.5 py-1 text-[11px] font-semibold text-brand-orange transition-colors hover:bg-brand-orange/10 disabled:opacity-40"
        title="Generate an ATS-friendly version of the attached CV"
      >
        ATS
      </button>
      <button
        onClick={() => {
          setCvName(null)
          setCvText('')
          setCvError(null)
        }}
        className="shrink-0 rounded-full p-0.5 text-muted-foreground hover:bg-muted"
        aria-label="Remove CV"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  ) : null

  const CvErrorChip = cvError ? (
    <div className="mx-auto mb-2 flex w-full max-w-3xl items-center gap-2 rounded-xl bg-red-500/10 px-3 py-1.5 text-xs text-red-500">
      <SearchX className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate">{cvError}</span>
      <button
        onClick={() => setCvError(null)}
        className="ml-auto shrink-0 rounded-full p-0.5 hover:bg-red-500/10"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  ) : null

  const ComposerPill = (
    <div className="flex items-end gap-2 rounded-[24px] border border-border bg-card px-3 py-2.5 shadow-[0_2px_12px_hsl(var(--foreground)/0.06)] focus-within:shadow-[0_2px_16px_hsl(var(--foreground)/0.1)] sm:rounded-[28px] sm:px-4">
      <button
        onClick={newChat}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
        aria-label="New chat"
        title="New chat"
      >
        <Plus className="h-4 w-4" />
      </button>
      <input
        ref={cvInputRef}
        type="file"
        accept=".pdf,.txt,.md,application/pdf,text/plain"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) handleCvFile(f)
        }}
      />
      <button
        onClick={() => cvInputRef.current?.click()}
        disabled={cvBusy || loading}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted disabled:opacity-60"
        aria-label="Attach CV"
        title="Attach CV (PDF or TXT) — parsed in memory, never stored"
      >
        {cvBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Paperclip className="h-4 w-4" />}
      </button>
      <textarea
        ref={inputRef}
        rows={1}
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          e.target.style.height = 'auto'
          e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px'
        }}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything"
        disabled={loading}
        className="max-h-40 min-h-[1.5rem] flex-1 resize-none border-0 bg-transparent text-base text-foreground outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 placeholder:text-muted-foreground disabled:opacity-60 sm:text-sm"
      />
      <button
        onClick={() => sendMessage()}
        disabled={(!input.trim() && !cvText) || loading}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange text-white transition-colors hover:bg-orange-600 disabled:opacity-30"
        aria-label="Send"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      </button>
    </div>
  )
  const sidebarToggle = () => {
    if (isMobile) {
      setSidebarOpen((v) => !v)
      return
    }
    setSidebarOpen((v) => !v)
  }

  const SidebarInner = (
    <div className="flex h-full w-[280px] max-w-[85vw] flex-col bg-background">
      {/* Top: mascot + badge + collapse */}
      <div className="flex items-center justify-between gap-1 px-3 py-3">
        <span className="flex min-w-0 items-center gap-2 pl-0.5">
          <img src="/chatbot-mascot.svg" alt="AI Hunt" className="h-8 w-8 shrink-0" />
          <span className="inline-flex shrink-0 items-center rounded-full border border-brand-orange/30 bg-brand-orange/10 px-2.5 py-1 text-xs font-semibold text-brand-orange">
            AI Career Advisor
          </span>
        </span>
        <button
          onClick={sidebarToggle}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
          aria-label="Toggle sidebar"
        >
          {isMobile ? <X className="h-5 w-5" /> : sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
        </button>
      </div>

      {/* New chat / Search */}
      <div className="px-2 pt-1">
        <button
          onClick={newChat}
          title="New chat"
          className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.06]"
        >
          <Plus className="h-4 w-4 shrink-0" />
          New chat
        </button>
        <button
          onClick={() => setSearchOpen((v) => !v)}
          title="Search chats"
          className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.06]"
        >
          <Search className="h-4 w-4 shrink-0" />
          Search chats
        </button>
        {searchOpen && (
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search chats"
            className="mt-1 w-full rounded-xl border border-border bg-card px-2.5 py-1.5 text-sm outline-none focus:border-brand-orange/50"
          />
        )}
      </div>

      {/* Chats list */}
      <nav className="mt-1 flex-1 overflow-y-auto px-2 pb-3">
        <div className="px-2.5 pb-1 pt-4 text-xs font-medium text-muted-foreground">Your chats</div>
        {shownSessions.length === 0 && (
          <div className="px-2.5 py-1.5 text-xs text-muted-foreground">No chats found</div>
        )}
        {shownSessions.map((s) => (
          <div
            key={s.id}
            className={cn(
              'group relative flex w-full items-center rounded-xl px-2.5 py-2 text-sm text-foreground/90 transition-colors hover:bg-foreground/[0.06]',
              active.id === s.id && 'bg-foreground/[0.08] font-medium text-foreground'
            )}
          >
            <button onClick={() => selectChat(s.id)} className="min-w-0 flex-1 truncate pr-6 text-left">
              {s.title || 'New chat'}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                deleteChat(s.id)
              }}
              className="absolute right-1.5 hidden rounded p-1 text-muted-foreground transition-colors hover:bg-foreground/[0.08] hover:text-foreground group-hover:block"
              aria-label="Delete chat"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {docs.length > 0 && (
          <>
            <div className="px-2.5 pb-1 pt-4 text-xs font-medium text-muted-foreground">Documents</div>
            {docs.map((d) => (
              <div
                key={d.id}
                className={cn(
                  'group relative flex w-full items-center rounded-xl px-2.5 py-2 text-sm text-foreground/90 transition-colors hover:bg-foreground/[0.06]',
                  openDocId === d.id && 'bg-foreground/[0.08] font-medium text-foreground'
                )}
              >
                <FileText className="mr-2 h-4 w-4 shrink-0 text-brand-orange" />
                <button
                  onClick={() => {
                    setOpenDocId(d.id)
                    if (isMobile) setSidebarOpen(false)
                  }}
                  className="min-w-0 flex-1 truncate pr-6 text-left"
                  title={d.title}
                >
                  {d.title}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteDoc(d.id)
                  }}
                  className="absolute right-1.5 hidden rounded p-1 text-muted-foreground transition-colors hover:bg-foreground/[0.08] hover:text-foreground group-hover:block"
                  aria-label="Delete document"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </>
        )}
      </nav>

      {/* Bottom: per-user identity */}
      <div className="p-2" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
        {username && (
          <div className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-sm transition-colors hover:bg-foreground/[0.06]">
            <Avatar
              name={displayName || username}
              src={avatarUrl || undefined}
              size={28}
              className="shrink-0 rounded-full"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">@{username}</p>
              <p className="text-[11px] text-muted-foreground">Chats saved to your account</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  // ---- Not signed in: require the account --------------------------------
  if (accountChecked && !username) {
    return (
      <div className="flex h-dvh items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10">
            <MessageSquare className="h-6 w-6 text-brand-orange" />
          </div>
          <h1 className="text-center text-lg font-bold text-foreground">Create your account</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Pick a username to keep your advisor chats saved with your account far beyond this tab.
          </p>
          <input
            value={signupName}
            onChange={(e) => {
              setSignupName(e.target.value)
              setSignupError(null)
            }}
            placeholder="e.g. aimar_dev"
            className="mt-5 w-full rounded-xl border border-input bg-card px-4 py-2.5 text-sm outline-none focus:border-brand-orange/60"
          />
          {signupError && <p className="mt-2 text-center text-xs text-red-500">{signupError}</p>}
          <button
            onClick={() => {
              if (!signIn(signupName)) setSignupError('Use at least 2 letters, numbers or underscores.')
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Save chats to this account
          </button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Same username as on the site — your profile and chats stay linked.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-dvh overflow-hidden bg-background text-foreground">
      {/* ---- SIDEBAR (static column on desktop, slide-in drawer on mobile) ---- */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/50"
          />
        )}
        {isMobile && sidebarOpen && (
          <motion.aside
            key="drawer"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-y-0 left-0 z-50 shadow-2xl"
          >
            {SidebarInner}
          </motion.aside>
        )}
      </AnimatePresence>
      {!isMobile && sidebarOpen && <aside className="shrink-0">{SidebarInner}</aside>}
      {/* Minimized sidebar: ChatGPT-style icon rail */}
      {!isMobile && !sidebarOpen && (
        <aside className="flex w-[76px] shrink-0 flex-col items-center gap-1 py-4">
          <img src="/chatbot-mascot.svg" alt="AI Hunt" className="mx-0 mb-2 h-8 w-8" />
          <button
            onClick={sidebarToggle}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Open sidebar"
            title="Open sidebar"
          >
            <PanelLeft className="h-5 w-5" />
          </button>
          <button
            onClick={newChat}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="New chat"
            title="New chat"
          >
            <Plus className="h-5 w-5" />
          </button>
          <button
            onClick={() => {
              setSidebarOpen(true)
              setSearchOpen(true)
            }}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Search chats"
            title="Search chats"
          >
            <Search className="h-5 w-5" />
          </button>
          {username && (
            <button
              onClick={sidebarToggle}
              className="mt-auto rounded-full transition-opacity hover:opacity-80"
              aria-label="Open sidebar"
              title={username}
            >
              <Avatar name={displayName || username} src={avatarUrl || undefined} size={32} />
            </button>
          )}
        </aside>
      )}

      {/* ---- MAIN ---- */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center justify-between px-3 py-2.5 sm:px-4">
          <div className="flex min-w-0 items-center gap-1.5">
            {isMobile && !sidebarOpen && (
              <button
                onClick={sidebarToggle}
                className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
                aria-label="Open sidebar"
              >
                <PanelLeft className="h-5 w-5" />
              </button>
            )}
            {/* When the sidebar is minimized the badge lives in the header;
                otherwise it sits at the top of the sidebar itself. */}
            {!sidebarOpen && (
              <span className="inline-flex shrink-0 items-center rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 py-1 text-sm font-semibold text-brand-orange">
                AI Career Advisor
              </span>
            )}
          </div>
          {isMobile && (
            <button
              onClick={newChat}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
              aria-label="New chat"
            >
              <SquarePen className="h-5 w-5" />
            </button>
          )}
        </header>

        {isFresh ? (
          /* Fresh chat: ChatGPT-style centered composer with the mascot */
          <div className="flex flex-1 flex-col items-center justify-center px-4 pb-16">
            <img src="/chatbot-mascot.svg" alt="" className="mb-4 h-16 w-16" />
            <h2 className="mb-6 text-center font-heading text-2xl font-semibold text-foreground sm:text-[28px]">
              What can I help with?
            </h2>
            <div className="w-full max-w-3xl">
              {CvChip}
              {CvErrorChip}
              {ComposerPill}
              <p className="mt-2 text-center text-[11px] text-muted-foreground">
                AI can make mistakes. Verify courses and offers on their official pages.
              </p>
            </div>
          </div>
        ) : (
          <>
            <main className="flex-1 overflow-y-auto bg-background">
              <div className="mx-auto flex w-full max-w-3xl flex-col px-3 py-5 sm:px-6">
                {messages.map((msg, i) => {
                  const docBody = msg.role === 'assistant' ? extractDocBody(msg.content) : null
                  return (
                  <div key={i} className={cn('mb-6 sm:mb-7', msg.role === 'user' && 'flex justify-end')}>
                    {msg.role === 'assistant' ? (
                      <div className="flex gap-2.5 sm:gap-3">
                        <img src="/chatbot-mascot.svg" alt="" className="mt-0.5 h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
                        <div className="min-w-0 flex-1 pt-0.5">
                          {msg.content === '' && loading ? (
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                          ) : (
                            <>
                              <Markdown className="text-[15px] sm:text-sm">{docBody ? msg.content.replace(ROADMAP_FENCE, '') : msg.content}</Markdown>
                              {docBody && (
                                <button
                                  onClick={() => {
                                    const id = ensureDoc(docBody)
                                    setOpenDocId(id)
                                    if (isMobile) setSidebarOpen(false)
                                  }}
                                  className="mt-3 flex w-full items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-3 text-left text-sm transition-colors hover:border-brand-orange/50 hover:bg-muted/70"
                                >
                                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10">
                                    <FileText className="h-4 w-4 text-brand-orange" />
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className="block truncate font-medium text-foreground">{docTitleFrom(docBody)}</span>
                                    <span className="block text-xs text-muted-foreground">Document — view in panel · download as PDF</span>
                                  </span>
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="max-w-[88%] rounded-3xl bg-muted px-3.5 py-2 text-[15px] leading-relaxed text-foreground sm:max-w-[80%] sm:px-4 sm:py-2.5 sm:text-sm">
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    )}
                  </div>
                  )
                })}
                {stillLoadingEmpty && (
                  <div className="mb-6 flex gap-2.5 sm:mb-7 sm:gap-3">
                    <img src="/chatbot-mascot.svg" alt="" className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
                    <div className="pt-2">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
                {error && !loading && (
                  <div className="mb-5 flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2.5 text-sm text-red-500">
                    <SearchX className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </main>

            {/* Composer (docked bottom) */}
            <div
              className="shrink-0 px-3 pt-1 sm:px-6"
              style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
            >
              <div className="mx-auto w-full max-w-3xl">
                {CvChip}
                {CvErrorChip}
                {ComposerPill}
                <p className="mt-2 text-center text-[11px] text-muted-foreground">
                  AI can make mistakes. Verify courses and offers on their official pages.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ---- Document pane (ChatGPT canvas-style: sits beside the chat on
            desktop, full-screen on mobile) ---------------------------------- */}
      <AnimatePresence>
        {openDoc && (
          <motion.div
            key="doc-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-y-0 right-0 z-40 flex w-full flex-col bg-background md:relative md:z-auto md:h-full md:shrink-0 md:shadow-none md:w-[min(680px,55vw)]"
          >
            {/* Canvas header: doc-type chip + title, actions live in the floating bar */}
            <div
              className="flex shrink-0 items-center gap-2.5 border-b border-border/70 bg-background px-4 py-2.5"
              style={{ paddingTop: 'max(0.6rem, env(safe-area-inset-top))' }}
            >
              <span className="shrink-0 rounded-md bg-brand-orange/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-orange">
                {/ats/i.test(openDoc.title) ? 'ATS CV' : /cv|resume/i.test(openDoc.title) ? 'CV' : 'Roadmap'}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{openDoc.title}</p>
              </div>
              <button
                onClick={() => {
                  setOpenDocId(null)
                  setTocOpen(false)
                }}
                className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close document"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div ref={docScrollRef} className="relative flex-1 overflow-y-auto bg-white">
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) handlePhotoFile(f)
                  e.target.value = ''
                }}
              />
              {/ats/i.test(openDoc.title) ? (
                <div ref={pdfRef}>
                  <AtsCvPreview
                    body={openDoc.body}
                    title={openDoc.title}
                    photo={cvPhoto}
                    onPickPhoto={() => photoInputRef.current?.click()}
                    onClearPhoto={() => setCvPhoto(null)}
                  />
                </div>
              ) : (
                <div
                  ref={pdfRef}
                  className="doc-body mx-auto w-full max-w-2xl px-6 py-10 text-neutral-900 sm:px-8 sm:py-14"
                >
                  <Markdown>{docBodyNoH1}</Markdown>
                  <div className="mt-16 border-t border-neutral-200 pt-5 text-[12.5px] leading-relaxed text-neutral-400">
                    Generated for you by the AI Hunt Career Advisor ·{' '}
                    {new Date(openDoc.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                    <br />
                    Verify courses and offers on their official pages before enrolling.
                  </div>
                </div>
              )}
              {/* Floating document toolbar (canvas style) */}
              <div
                className="pointer-events-none sticky bottom-0 z-10 flex justify-center px-4"
                style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
              >
                <div className="pointer-events-auto relative flex items-center gap-0.5 rounded-full border border-border bg-card/95 p-1 shadow-[0_8px_30px_hsl(var(--foreground)/0.14)] backdrop-blur">
                  <button
                    onClick={() => setTocOpen((v) => !v)}
                    disabled={toc.length === 0}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full px-3 py-2 text-[12.5px] font-medium text-foreground/90 transition-colors hover:bg-foreground/[0.06] disabled:opacity-40',
                      tocOpen && 'bg-foreground/[0.08] text-foreground'
                    )}
                  >
                    <ListTree className="h-4 w-4" />
                    Contents
                  </button>
                  {/ats/i.test(openDoc.title) && (
                    <button
                      onClick={() => photoInputRef.current?.click()}
                      className="flex items-center gap-1.5 rounded-full px-3 py-2 text-[12.5px] font-medium text-foreground/90 transition-colors hover:bg-foreground/[0.06]"
                      title="Add or change portrait photo on CV"
                    >
                      <ImagePlus className="h-4 w-4" />
                      {cvPhoto ? 'Change photo' : 'Photo'}
                    </button>
                  )}
                  <button
                    onClick={copyDoc}
                    className="flex items-center gap-1.5 rounded-full px-3 py-2 text-[12.5px] font-medium text-foreground/90 transition-colors hover:bg-foreground/[0.06]"
                  >
                    {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                  <button
                    onClick={exportPdf}
                    disabled={exportingPdf}
                    className="flex items-center gap-1.5 rounded-full bg-brand-orange px-3.5 py-2 text-[12.5px] font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-70"
                  >
                    {exportingPdf ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                    PDF
                  </button>
                  {tocOpen && (
                    <div className="absolute bottom-full left-0 z-50 mb-2 max-h-[50vh] w-72 overflow-y-auto rounded-xl border border-border bg-card p-1.5 shadow-xl">
                      <p className="px-2.5 pb-1 pt-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                        Contents
                      </p>
                      {toc.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            document.getElementById(t.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            setTocOpen(false)
                          }}
                          className={cn(
                            'block w-full truncate rounded-lg px-2.5 py-1.5 text-left text-[13px] text-foreground/90 transition-colors hover:bg-muted',
                            t.level === 1 && 'font-medium'
                          )}
                          style={t.level === 2 ? { paddingLeft: '1.4rem' } : undefined}
                        >
                          {t.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function uuidShort(): string {
  return Math.random().toString(36).slice(2, 10)
}
