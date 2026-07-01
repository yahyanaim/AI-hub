'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  Search,
  Plus,
  Menu,
  X,
  LogOut,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useApp } from '@/lib/store'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/button'

const NAV_LINKS = [
  { href: '/tools', label: 'Tools' },
  { href: '/devtool', label: 'Dev Tools' },
  { href: '/edittools', label: 'Editing Tools' },
  { href: '/courses', label: 'Courses' },
  { href: '/books', label: 'Books' },
  { href: '/leaderboard', label: 'Leaderboard' },
]

export function Navbar() {
  const pathname = usePathname()
  const { setPaletteOpen, currentUser, setAuthModalOpen, signOut } = useApp()
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
        'sticky top-0 z-40 w-full border-b transition-all duration-200',
        scrolled
          ? 'border-border bg-background/80 backdrop-blur-xl'
          : 'border-transparent bg-background/40 backdrop-blur-sm'
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        {/* Left side: Logo */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="group flex items-center gap-2"
            aria-label="AI Hunt home"
          >
            <span className="flex h-16 w-16 items-center justify-center overflow-hidden bg-transparent shadow-sm transition-transform group-hover:scale-105">
              <Image src="/logo.png" alt="AI Hunt" width={60} height={60} className="h-full w-full object-contain" />
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== '/' && pathname?.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    active
                      ? 'bg-secondary text-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Center: Search */}
        <div className="hidden flex-1 max-w-xs mx-auto sm:block">
          <button
            onClick={() => setPaletteOpen(true)}
            className="flex w-full items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm transition-colors hover:border-brand-orange/30 hover:text-foreground"
            aria-label="Search"
          >
            <Search className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-left">Search tools, repos...</span>
            <kbd className="hidden shrink-0 rounded-md border border-border bg-muted px-1.5 py-0.5 font-sans text-[10px] font-medium text-muted-foreground lg:inline">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right side: actions */}
        <div className="flex items-center gap-1.5">
          {/* Mobile search */}
          <button
            onClick={() => setPaletteOpen(true)}
            className="btn-ghost sm:hidden"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Submit button */}
          <Link href="/submit" className="hidden sm:inline-flex rounded-full bg-brand-orange px-4 py-1.5 text-sm font-semibold text-white transition-all hover:bg-orange-600 active:scale-[0.97]">
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
