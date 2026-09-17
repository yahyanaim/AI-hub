'use client'

import { usePathname } from 'next/navigation'
import { PartnersMarquee } from '@/components/layout/PartnersMarquee'

export function MarqueeGate() {
  const pathname = usePathname()
  if (pathname !== '/') return null
  return (
    <div className="container-page">
      <PartnersMarquee />
    </div>
  )
}
