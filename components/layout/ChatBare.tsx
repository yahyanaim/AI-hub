'use client'

import { usePathname } from 'next/navigation'

// The standalone advisor at /chat and private /admin/* pages render in their own
// shell with no public site chrome — strip Navbar, footer, support bar and widget.
export function ChatBare({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname === '/chat' || pathname?.startsWith('/admin')) return null
  return <>{children}</>
}
