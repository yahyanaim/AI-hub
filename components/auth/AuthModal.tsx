'use client'

import { useEffect, useState } from 'react'
import { X, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { useApp } from '@/lib/store'

export function AuthModal() {
  const { authModalOpen, setAuthModalOpen, signIn, resolvePendingAction } = useApp()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [nameError, setNameError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (authModalOpen) {
      setUsername('')
      setPassword('')
      setNameError(null)
      setSubmitting(false)
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

  const handleSignIn = async () => {
    if (submitting) return
    const name = username
    if (!name.trim()) {
      setNameError('Enter a username first.')
      return
    }
    const clean = name.trim().toLowerCase().replace(/[^a-z0-9_]/g, '')
    if (clean.length < 2) {
      setNameError('Use at least 2 letters, numbers or underscores.')
      return
    }
    if (password.length < 6) {
      setNameError('Password must be at least 6 characters.')
      return
    }
    setNameError(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name.trim(), password, mode }),
      })
      const data = (await res.json().catch(() => ({}))) as {
        user?: { username: string; displayName?: string }
        error?: string
        code?: string
      }
      if (!res.ok || !data.user?.username) {
        if (data.code === 'account-not-migrated') {
          setMode('signup')
        }
        const normalizedAttempt = name.trim().toLowerCase().replace(/[^a-z0-9_]/g, '')
        const baseError = data.error || 'Authentication failed.'
        if (res.status === 409 && normalizedAttempt === 'yahianaim') {
          setNameError(
            `${baseError} If you are the admin without a password, sign in via /admin/login to use one-time recovery.`
          )
        } else {
          setNameError(baseError)
        }
        return
      }
      signIn(data.user.username, {
        skipSignupPing: true,
        displayName: data.user.displayName,
      })
      window.dispatchEvent(new Event('aihunt-auth-changed'))
      setAuthModalOpen(false)
      setTimeout(() => resolvePendingAction(), 0)
    } catch {
      setNameError('Network error — please try again.')
    } finally {
      setSubmitting(false)
    }
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
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-border/50">
              <Image src="/logo.png" alt="AI Hunt" width={36} height={36} className="object-contain" />
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Join AI Hunt
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to upvote, bookmark, and submit.
            </p>
          </div>

          <div className="mb-4 flex rounded-lg border border-border bg-muted/40 p-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => { setMode('login'); setNameError(null) }}
              className={`flex-1 rounded-md py-1.5 transition-colors ${
                mode === 'login' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setNameError(null) }}
              className={`flex-1 rounded-md py-1.5 transition-colors ${
                mode === 'signup' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Create account
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              void handleSignIn()
            }}
            className="space-y-3"
          >
            <label htmlFor="auth-username" className="sr-only">Username</label>
            <input
              id="auth-username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setNameError(null) }}
              placeholder="your-username"
              maxLength={32}
              autoComplete="username"
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-input"
              autoFocus
            />
            <label htmlFor="auth-password" className="sr-only">Password</label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setNameError(null) }}
              placeholder="Password (min. 6 characters)"
              maxLength={128}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-input"
            />
            {nameError && (
              <p className="text-xs text-red-500" role="alert">{nameError}</p>
            )}
            <button
              type="submit"
              disabled={!username.trim() || password.length < 6 || submitting}
              className="btn-primary w-full"
            >
              <Sparkles className="h-4 w-4" />
              {submitting ? 'Please wait...' : mode === 'signup' ? 'Create account' : 'Sign in'}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Your account &amp; AI quota stay synced across browsers.
          </p>
        </div>
      </div>
    </div>
  )
}
