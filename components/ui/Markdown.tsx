'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { cn } from '@/lib/utils'

/**
 * Allow only safe link targets. react-markdown doesn't execute raw HTML
 * (no rehype-raw), but link URLs from untrusted sources (e.g. LLM output)
 * could still carry javascript:/data:/vbscript: payloads - neuter them.
 */
function safeUrlTransform(url: string): string {
  const trimmed = url.trim()
  if (
    trimmed === '' ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('/') ||
    /^(https?|mailto):/i.test(trimmed)
  ) {
    return url
  }
  return '#'
}

export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cn('prose-hunt', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { detect: true, ignoreMissing: true }]]}
        urlTransform={safeUrlTransform}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
