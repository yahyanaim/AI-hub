'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  Plus,
  Menu,
  X,
  LogOut,
  Sparkles,
  Coffee,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useApp } from '@/lib/store'
import { Avatar } from '@/components/ui/Avatar'

const NAV_LINKS = [
  { href: '/tools', label: 'Tools' },
  { href: '/dev-tools', label: 'Dev Tools' },
  { href: '/edittools', label: 'Editing Tools' },
  { href: '/courses', label: 'Courses' },
  { href: '/offers', label: 'Offers' },
  { href: '/support', label: 'Support' },
]

export function Navbar() {
  const pathname = usePathname()
  const { currentUser, setAuthModalOpen, signOut } = useApp()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 rounded-2xl border border-brand-orange/20 bg-background/80 px-4 py-2.5 shadow-[0_10px_36px_-12px_rgba(249,115,22,0.45)] backdrop-blur-xl">
        {/* Left side: Logo */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 text-base font-semibold tracking-tight text-foreground"
            aria-label="AI Hunt home"
          >
            <span className="flex size-8 items-center justify-center overflow-hidden bg-transparent transition-transform group-hover:scale-105">
              <Image src="/logo.png" alt="AI Hunt" width={32} height={32} className="h-full w-full object-contain" />
            </span>
            <span className="text-base font-semibold tracking-tight">
              AI Hunt
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="ml-4 hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== '/' && pathname?.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors',
                    active
                      ? 'bg-secondary font-semibold text-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  )}
                >
                  {link.href === '/support' && <Coffee className="h-3.5 w-3.5 text-brand-orange" />}
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right side: actions */}
        <div className="ml-auto flex items-center gap-2">

          {/* Submit button */}
          <Link href="/submit" className="hidden h-9 items-center rounded-xl border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:inline-flex">
            <Plus className="mr-1 h-4 w-4" />
            Submit
          </Link>

          {/* Auth */}
          {currentUser ? (
            <div className="flex items-center gap-1">
              <Link
                href={`/profile/${currentUser.username}`}
                className="rounded-xl ring-2 ring-transparent transition hover:ring-brand-orange/40"
                aria-label="Your profile"
              >
                <Avatar
                  name={currentUser.displayName}
                  src={currentUser.avatarUrl}
                  size={32}
                />
              </Link>
              <button
                onClick={signOut}
                className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Sign out"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="inline-flex h-9 items-center rounded-xl bg-brand-orange px-3 text-sm font-medium text-white transition-colors hover:bg-orange-600"
            >
              Sign in
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted md:hidden"
            aria-label="Menu"
            aria-controls="mobile-nav"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div id="mobile-nav" className="mx-auto mt-2 w-full max-w-6xl rounded-2xl border border-border bg-background/90 p-2 shadow-lg backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/submit"
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-brand-orange hover:bg-secondary"
            >
              <Sparkles className="h-4 w-4" /> Submit
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
