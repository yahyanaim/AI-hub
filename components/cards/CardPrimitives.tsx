'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export function cardVariants() {
  return {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: 'easeOut' as const },
    },
  }
}

// A single card wrapping content in a link with hover glow
export function CardLink({ href, children, className }: CardLinkProps) {
  return (
    <motion.div variants={cardVariants()}>
      <Link
        href={href}
        className={cn(
          'group relative flex h-full flex-col rounded-md border border-border bg-muted p-4 transition-all duration-200 hover:border-accent/40 hover:shadow-[0_0_24px_var(--accent-glow)]',
          className
        )}
      >
        {children}
      </Link>
    </motion.div>
  )
}

export function CardGrid({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
      initial="hidden"
      animate="show"
      className={cn(
        'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3',
        className
      )}
      role="list"
    >
      {children}
    </motion.div>
  )
}
