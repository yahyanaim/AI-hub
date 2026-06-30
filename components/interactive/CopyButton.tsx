'use client'

import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
  text: string
  onCopy?: () => void
  variant?: 'icon' | 'button'
  label?: string
  className?: string
}

export function CopyButton({
  text,
  onCopy,
  variant = 'icon',
  label = 'Copy',
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // fallback
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      try {
        document.execCommand('copy')
      } catch {
        /* noop */
      }
      document.body.removeChild(ta)
    }
    setCopied(true)
    onCopy?.()
    setTimeout(() => setCopied(false), 1500)
  }

  if (variant === 'button') {
    return (
      <motion.button
        onClick={handleCopy}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors',
          copied
            ? 'border-brand-green/40 bg-brand-green/10 text-brand-green'
            : 'border-border bg-card text-muted-foreground hover:border-accent/40 hover:text-accent',
          className
        )}
        aria-label={copied ? 'Copied' : label}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied!' : label}
      </motion.button>
    )
  }

  return (
    <motion.button
      onClick={handleCopy}
      whileTap={{ scale: 0.9 }}
      className={cn(
        'rounded-md border border-border bg-card p-1.5 transition-colors',
        copied
          ? 'border-brand-green/40 text-brand-green'
          : 'text-muted-foreground hover:border-accent/40 hover:text-accent',
        className
      )}
      aria-label={copied ? 'Copied' : label}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </motion.button>
  )
}
