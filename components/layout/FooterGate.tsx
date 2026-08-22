'use client'

import { usePathname } from 'next/navigation'
import { Footer } from '@/components/layout/Footer'

const FOOTERLESS_ROUTES = ['/support']

export function FooterGate() {
  const pathname = usePathname()
  if (pathname && FOOTERLESS_ROUTES.includes(pathname)) return null
  return <Footer />
}
