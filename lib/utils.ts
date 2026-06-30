import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  return n.toString()
}

export function relativeTime(date: string | Date): string {
  const now = Date.now()
  const then = new Date(date).getTime()
  const diff = now - then
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  const years = Math.floor(months / 12)
  return `${years}y ago`
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function uuid(): string {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + '...' : str
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function colorFromString(str: string): string {
  const colors = [
    '#FF6B00', '#2563EB', '#7C3AED', '#DB2777', '#DC2626',
    '#EA580C', '#D97706', '#65A30D', '#0891B2', '#4F46E5',
  ]
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

// Derive a stable 1-decimal star rating (4.0–5.0) from upvotes/bookmarks
export function ratingFor(upvotes: number, bookmarks: number): number {
  const score = (upvotes + bookmarks * 1.5) % 10
  const base = 4 + (score / 10) // 4.0 .. 4.9
  return Math.round(base * 10) / 10
}

export function downloadRoadmapPlan(course: { name: string; slug: string; tagline?: string; duration: string; difficulty: string; category: string; pricing: string; roadmap: { title: string; duration: string; url?: string; topics: string[] }[] }) {
  const el = document.createElement('div')
  el.style.cssText = 'position:fixed;left:-9999px;top:0;width:800px;background:#ffffff;padding:44px 48px;font-family:Inter,system-ui,sans-serif;color:#1e293b;line-height:1.5'

  const formatLabel = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ')

  el.innerHTML = `
    <div style="border-bottom:2px solid #FF6B00;padding-bottom:20px;margin-bottom:28px">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div>
          <div style="font-size:22px;font-weight:700;color:#0f172a;letter-spacing:-0.02em">${course.name}</div>
          ${course.tagline ? `<div style="font-size:13px;color:#64748b;margin-top:3px">${course.tagline}</div>` : ''}
        </div>
        <div style="background:#FF6B00;color:#fff;font-size:11px;font-weight:600;padding:4px 12px;border-radius:4px;letter-spacing:0.3px;text-transform:uppercase">${course.difficulty ? formatLabel(course.difficulty) : ''}</div>
      </div>
      <div style="display:flex;gap:20px;margin-top:12px;font-size:12px;color:#64748b">
        <span style="display:flex;align-items:center;gap:4px">
          <span style="font-weight:600;color:#475569">Duration:</span> ${course.duration}
        </span>
        <span style="display:flex;align-items:center;gap:4px">
          <span style="font-weight:600;color:#475569">Category:</span> ${course.category ? formatLabel(course.category) : ''}
        </span>
        <span style="display:flex;align-items:center;gap:4px">
          <span style="font-weight:600;color:#475569">Pricing:</span> ${course.pricing ? formatLabel(course.pricing) : ''}
        </span>
      </div>
    </div>

    <div style="display:flex;align-items:center;gap:8px;margin-bottom:20px">
      <div style="font-size:15px;font-weight:700;color:#0f172a">Learning Roadmap</div>
      <div style="font-size:12px;color:#94a3b8;font-weight:500">${course.roadmap.length} steps ${course.duration ? '· ' + course.duration : ''}</div>
    </div>

    ${course.roadmap.map((step, i) => `
      <div style="display:flex;gap:16px;padding:18px 0;${i > 0 ? 'border-top:1px solid #f1f5f9' : ''}">
        <div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0">
          <div style="display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:${i === 0 ? '#FF6B00' : '#f1f5f9'};color:${i === 0 ? '#fff' : '#64748b'};font-size:12px;font-weight:700">${i + 1}</div>
          ${i < course.roadmap.length - 1 ? `<div style="width:2px;flex:1;min-height:20px;background:#e2e8f0;margin:4px 0"></div>` : ''}
        </div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
            <span style="font-size:15px;font-weight:600;color:#0f172a">${step.title}</span>
            <span style="font-size:11px;color:#94a3b8;font-weight:500;white-space:nowrap;background:#f8fafc;padding:2px 8px;border-radius:3px">${step.duration}</span>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:9px">
            ${step.topics.map(t => `<span style="display:inline-block;padding:3px 10px;border-radius:3px;background:#fef3e7;color:#9a3412;font-size:11px;font-weight:500;border:1px solid #fed7aa">${t}</span>`).join('')}
          </div>
          ${step.url ? `<div style="margin-top:7px;font-size:11px;color:#FF6B00;font-weight:500">${step.url}</div>` : ''}
        </div>
      </div>`).join('')}

    <div style="margin-top:32px;padding-top:18px;border-top:1px solid #e2e8f0;font-size:10px;color:#94a3b8;text-align:center">
      Generated by AI Hunt — ${course.name} Roadmap Plan
    </div>
  `

  document.body.appendChild(el)

  import('html2canvas').then(({ default: html2canvas }) => {
    html2canvas(el, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true,
    }).then((canvas) => {
      document.body.removeChild(el)
      import('jspdf').then(({ default: jsPDF }) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('p', 'mm', 'a4')
        const pdfW = pdf.internal.pageSize.getWidth()
        const pdfH = (canvas.height * pdfW) / canvas.width

        let heightLeft = pdfH
        let position = 0

        pdf.addImage(imgData, 'PNG', 0, position, pdfW, pdfH)
        heightLeft -= pdf.internal.pageSize.getHeight()

        while (heightLeft > 0) {
          position = heightLeft - pdfH
          pdf.addPage()
          pdf.addImage(imgData, 'PNG', 0, position, pdfW, pdfH)
          heightLeft -= pdf.internal.pageSize.getHeight()
        }

        pdf.save(`${course.slug}-roadmap.pdf`)
      })
    })
  }).catch(() => {
    document.body.removeChild(el)
  })
}

