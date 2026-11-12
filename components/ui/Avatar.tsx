'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { FruitAvatar } from '@/components/ui/FruitAvatar'

interface AvatarProps {
  name: string
  src?: string
  size?: number
  className?: string
}

export function Avatar({ name, src, size = 32, className }: AvatarProps) {
  const [failed, setFailed] = useState(false)
  if (src && !failed) {
    return (
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        unoptimized
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={cn('rounded-full object-cover', className)}
        style={{ width: size, height: size }}
      />
    )
  }
  return <FruitAvatar name={name} size={size} className={cn('rounded-full', className)} />
}
