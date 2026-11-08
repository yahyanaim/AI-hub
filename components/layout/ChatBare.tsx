'use client'

import { usePathname } from 'next/navigation'

// The standalone advisor at /chat renders ChatGPT-style in its own tab with
// no site chrome — strip Navbar, footer, support bar and the widget there.
export function ChatBare({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname === '/chat') return null
  return <>{children}</>
}
