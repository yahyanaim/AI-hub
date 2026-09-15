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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b bg-background',
        scrolled ? 'border-border shadow-[0_1px_0_0_var(--border)]' : 'border-border'
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Left side: Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="group flex items-center gap-2"
            aria-label="AI Hunt home"
          >
            <span className="flex h-8 w-8 items-center justify-center overflow-hidden bg-transparent transition-transform group-hover:scale-105">
              <Image src="/logo.png" alt="AI Hunt" width={32} height={32} className="h-full w-full object-contain" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              AI Hunt
            </span>
          </Link>

          {/* Desktop nav — FounderFare style: plain text links */}
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== '/' && pathname?.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1.5 text-sm transition-colors',
                    active
                      ? 'font-semibold text-foreground'
                      : 'font-medium text-muted-foreground hover:text-foreground'
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
        <div className="flex items-center gap-2">

          {/* Submit button */}
          <Link href="/submit" className="hidden sm:inline-flex rounded-full border border-brand-orange px-4 py-1.5 text-sm font-semibold text-brand-orange transition-all hover:bg-brand-orange/10 active:scale-[0.97]">
            <Plus className="mr-1 h-4 w-4" />
            Submit
          </Link>

          {/* Auth */}
          {currentUser ? (
            <div className="flex items-center gap-1">
              <Link
                href={`/profile/${currentUser.username}`}
                className="rounded-full ring-2 ring-transparent transition hover:ring-brand-orange/40"
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
                className="btn-ghost"
                aria-label="Sign out"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="inline-flex items-center rounded-full bg-brand-orange px-4 py-1.5 text-sm font-semibold text-white transition-all hover:bg-orange-600 active:scale-[0.97]"
            >
              Sign in
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="btn-ghost md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="container-page flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/submit"
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-brand-orange hover:bg-secondary"
            >
              <Sparkles className="h-4 w-4" /> Submit
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
