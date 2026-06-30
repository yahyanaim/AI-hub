'use client'

import { useEffect, useState } from 'react'
import { X, Github, Mail, Sparkles } from 'lucide-react'
import { useApp } from '@/lib/store'

export function AuthModal() {
  const { authModalOpen, setAuthModalOpen, signIn, resolvePendingAction } = useApp()
  const [username, setUsername] = useState('')
  const [mode, setMode] = useState<'signin' | 'pending'>('signin')

  useEffect(() => {
    if (authModalOpen) {
      setUsername('')
      setMode('signin')
    }
  }, [authModalOpen])

  useEffect(() => {
    if (!authModalOpen) return
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAuthModalOpen(false)
    }
    window.addEventListener('keydown', onEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onEsc)
      document.body.style.overflow = ''
    }
  }, [authModalOpen, setAuthModalOpen])

  if (!authModalOpen) return null

  const handleSignIn = (provider?: 'github' | 'google' | 'email') => {
    const name =
      provider === 'github'
        ? username || 'dev'
        : provider === 'google'
          ? username || 'user'
          : username
    if (!name.trim()) return
    signIn(name.trim())
    setAuthModalOpen(false)
    setTimeout(() => resolvePendingAction(), 0)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Sign in"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={() => setAuthModalOpen(false)}
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-slide-up">
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-brand-orange/10 blur-[100px]" />
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute right-3 top-3 z-10 rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-orange font-heading text-xl font-bold text-white shadow-lg shadow-brand-orange/25">
              A
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Join AI Hunt
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to upvote, bookmark, and submit.
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleSignIn('github')}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-muted px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:border-brand-orange/30"
            >
              <Github className="h-4 w-4" />
              Continue with GitHub
            </button>
            <button
              onClick={() => handleSignIn('google')}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-muted px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:border-brand-orange/30"
            >
              <Mail className="h-4 w-4" />
              Continue with Google
            </button>
          </div>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or pick a username</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSignIn('email')
            }}
            className="space-y-3"
          >
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your-username"
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-input"
              autoFocus
            />
            <button
              type="submit"
              disabled={!username.trim()}
              className="btn-primary w-full"
            >
              <Sparkles className="h-4 w-4" />
              Continue
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Demo build &mdash; no real OAuth. Your session lives in this browser only.
          </p>
        </div>
      </div>
    </div>
  )
}
