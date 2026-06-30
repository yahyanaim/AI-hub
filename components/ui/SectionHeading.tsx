import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: React.ReactNode
  title: string
  description?: string
  href?: string
  hrefLabel?: string
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  hrefLabel = 'View all',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-5 flex items-end justify-between gap-4',
        className
      )}
    >
      <div>
        {eyebrow && (
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
            {eyebrow}
          </div>
        )}
        <h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group flex shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground hover:text-accent"
        >
          {hrefLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}
