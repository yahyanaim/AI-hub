'use client'

import { motion } from 'framer-motion'
import { Bookmark } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useApp } from '@/lib/store'
import type { ItemType } from '@/types'

interface BookmarkButtonProps {
  itemType: ItemType
  itemId: string
  variant?: 'icon' | 'detail'
  className?: string
}

export function BookmarkButton({
  itemType,
  itemId,
  variant = 'icon',
  className,
}: BookmarkButtonProps) {
  const { currentUser, hasBookmarked, toggleBookmark, setAuthModalOpen, setPendingAction } =
    useApp()
  const active = hasBookmarked(itemId)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!currentUser) {
      setPendingAction({ type: 'bookmark', itemType, itemId })
      setAuthModalOpen(true)
      return
    }
    toggleBookmark(itemType, itemId)
  }

  if (variant === 'detail') {
    return (
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors',
          active
            ? 'border-[#7c3aed]/40 bg-[#7c3aed]/10 text-[#7c3aed]'
            : 'border-border bg-secondary text-muted-foreground hover:border-[#7c3aed]/40 hover:text-[#7c3aed]',
          className
        )}
        aria-pressed={active}
        aria-label={active ? 'Remove bookmark' : 'Bookmark'}
      >
        <Bookmark className="h-4 w-4" fill={active ? 'currentColor' : 'none'} />
        {active ? 'Saved' : 'Save'}
      </motion.button>
    )
  }

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.9 }}
      className={cn(
        'rounded-lg border border-border bg-card p-1.5 text-muted-foreground shadow-sm transition-colors hover:border-[#7c3aed]/40 hover:text-[#7c3aed]',
        active && 'border-[#7c3aed]/40 text-[#7c3aed]',
        className
      )}
      aria-pressed={active}
      aria-label={active ? 'Remove bookmark' : 'Bookmark'}
    >
      <motion.span
        initial={false}
        animate={active ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <Bookmark className="h-4 w-4" fill={active ? 'currentColor' : 'none'} />
      </motion.span>
    </motion.button>
  )
}
