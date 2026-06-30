'use client'

import { motion } from 'framer-motion'
import { ArrowBigUp, ThumbsUp } from 'lucide-react'
import { cn, formatNumber } from '@/lib/utils'
import { useApp } from '@/lib/store'
import type { ItemType } from '@/types'

interface UpvoteButtonProps {
  itemType: ItemType
  itemId: string
  count: number
  variant?: 'card' | 'detail'
  className?: string
}

export function UpvoteButton({
  itemType,
  itemId,
  count,
  variant = 'card',
  className,
}: UpvoteButtonProps) {
  const { currentUser, hasUpvoted, toggleUpvote, setAuthModalOpen, setPendingAction } =
    useApp()
  const active = hasUpvoted(itemId)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!currentUser) {
      setPendingAction({ type: 'upvote', itemType, itemId })
      setAuthModalOpen(true)
      return
    }
    toggleUpvote(itemType, itemId)
  }

  const activeCls = 'border-[#FF6B00]/40 bg-[#FF6B00]/10 text-[#FF6B00]'
  const idleCls =
    'border-border bg-secondary text-muted-foreground hover:border-brand-orange/40 hover:text-brand-orange'

  if (variant === 'detail') {
    return (
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors',
          active ? activeCls : idleCls,
          className
        )}
        aria-pressed={active}
        aria-label={active ? 'Remove upvote' : 'Upvote'}
      >
        <motion.span
          initial={false}
          animate={active ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ThumbsUp className="h-4 w-4" fill={active ? 'currentColor' : 'none'} />
        </motion.span>
        {formatNumber(count)}
      </motion.button>
    )
  }

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.9 }}
      className={cn(
        'flex flex-col items-center gap-0 rounded-md border px-2.5 py-1.5 transition-colors',
        active ? activeCls : idleCls,
        className
      )}
      aria-pressed={active}
      aria-label={active ? 'Remove upvote' : 'Upvote'}
    >
      <motion.span
        initial={false}
        animate={active ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowBigUp className="h-4 w-4" fill={active ? 'currentColor' : 'none'} />
      </motion.span>
      <span className="text-xs font-semibold">{formatNumber(count)}</span>
    </motion.button>
  )
}
