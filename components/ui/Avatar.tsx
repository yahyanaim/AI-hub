'use client'

import { cn, getInitials, colorFromString } from '@/lib/utils'

interface AvatarProps {
  name: string
  src?: string
  size?: number
  className?: string
}

export function Avatar({ name, src, size = 32, className }: AvatarProps) {
  const initials = getInitials(name) || '?'
  const bg = colorFromString(name)
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className={cn('rounded-full object-cover', className)}
        style={{ width: size, height: size }}
      />
    )
  }
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full font-heading text-xs font-semibold text-white',
        className
      )}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${bg}, ${bg}cc)`,
      }}
      aria-hidden
    >
      {initials}
    </div>
  )
}
