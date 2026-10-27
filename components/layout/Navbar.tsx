'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import {
  Plus,
  Menu,
  X,
  LogOut,
  Sparkles,
  Coffee,
  Search,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useApp } from '@/lib/store'
import { Avatar } from '@/components/ui/Avatar'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { NotificationBell } from '@/components/layout/NotificationBell'

/** All catalogue pages grouped behind a single desktop nav selector. */
const TOOLS_SELECTOR = [
  { href: '/tools', label: 'AI Tools' },
  { href: '/dev-tools', label: 'Dev Tools' },
  { href: '/edittools', label: 'Editing Tools' },
]

const NAV_LINKS = [
  { href: '/courses', label: 'Courses' },
  { href: '/offers', label: 'Offers' },
  { href: '/find-by-goal', label: 'Find by Goal' },
  { href: '/support', label: 'Support' },
]

export function Navbar() {
  const pathname = usePathname()
  const { currentUser, setAuthModalOpen, signOut, setPaletteOpen } = useApp()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const toolsRef = useRef<HTMLDivElement>(null)
  // Global search lives on every page except /support.
  const showSearch = pathname !== '/support'
  const toolsActive = TOOLS_SELECTOR.some(
    (t) => pathname === t.href || pathname?.startsWith(t.href)
  )

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Close the tools selector on outside click / Escape.
  useEffect(() => {
    if (!toolsOpen) return
    const onPointerDown = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setToolsOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [toolsOpen])

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 rounded-2xl border border-brand-orange/20 bg-background/80 px-4 py-2.5 shadow-[0_6px_24px_-12px_rgba(249,115,22,0.25)] backdrop-blur-xl">
        {/* Left side: Logo */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 text-base font-semibold tracking-tight text-foreground"
            aria-label="AI Hunt home"
          >
            <span className="flex size-14 items-center justify-center overflow-hidden bg-transparent transition-transform group-hover:scale-105">
              <Image src="/logo.png" alt="AI Hunt" width={56} height={56} className="h-full w-full object-contain" />
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="ml-4 hidden items-center gap-1 lg:flex">
            {/* Grouped catalogue selector: AI Tools / Dev Tools / Editing Tools */}
            <div ref={toolsRef} className="relative">
              <button
                onClick={() => setToolsOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={toolsOpen}
                className={cn(
                  'flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm transition-colors',
                  toolsActive
                    ? 'bg-secondary font-semibold text-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                AI Tools
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 transition-transform',
                    toolsOpen && 'rotate-180'
                  )}
                />
              </button>
              {toolsOpen && (
                <div className="absolute left-0 top-10 z-50 w-44 overflow-hidden rounded-xl border border-border bg-background p-1 shadow-xl">
                  {TOOLS_SELECTOR.map((t) => {
                    const active = pathname === t.href || pathname?.startsWith(t.href)
                    return (
                      <Link
                        key={t.href}
                        href={t.href}
                        onClick={() => setToolsOpen(false)}
                        className={cn(
                          'block rounded-lg px-3 py-2 text-sm transition-colors',
                          active
                            ? 'bg-secondary font-semibold text-foreground'
                            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                        )}
                      >
                        {t.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
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
          <ThemeToggle />
          <NotificationBell />

          {/* Global search (opens the command palette) */}
          {showSearch && (
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden h-9 items-center gap-2 rounded-xl border border-border bg-muted/50 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
            >
              <Search className="h-4 w-4" />
              <span className="hidden lg:inline">Search…</span>
              <kbd className="hidden rounded-md border border-border bg-background px-1.5 py-0.5 font-sans text-[11px] xl:inline-block">
                ⌘K
              </kbd>
            </button>
          )}

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
            className="inline-flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted lg:hidden"
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
        <div id="mobile-nav" className="mx-auto mt-2 w-full max-w-7xl rounded-2xl border border-border bg-background/90 p-2 shadow-lg backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {showSearch && (
              <button
                onClick={() => {
                  setMobileOpen(false)
                  setPaletteOpen(true)
                }}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <Search className="h-4 w-4" /> Search
              </button>
            )}
            {[...TOOLS_SELECTOR, ...NAV_LINKS].map((link) => (
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
