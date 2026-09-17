'use client'

import { usePathname } from 'next/navigation'
import { PartnersMarquee } from '@/components/layout/PartnersMarquee'
import { Testimonials } from '@/components/layout/Testimonials'

export function MarqueeGate() {
  const pathname = usePathname()
  if (pathname !== '/') return null
  return (
    <div className="container-page">
      <PartnersMarquee />
      <Testimonials />
    </div>
  )
}
