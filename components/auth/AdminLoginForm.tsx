'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FacetedGlyph } from '@/components/ui/FacetedGlyph'

export function AdminLoginForm() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/api/admin/session', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : { authenticated: false }))
      .then((data: { authenticated?: boolean }) => {
        if (cancelled) return
        if (data.authenticated) {
          router.replace('/admin/dashboard')
          return
        }
        setChecking(false)
      })
      .catch(() => {
        if (!cancelled) setChecking(false)
      })
    return () => {
      cancelled = true
    }
  }, [router])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (res.status === 401) {
        setError('Wrong email or password.')
        return
      }
      if (res.status === 429) {
        setError('Too many attempts. Try again in an hour.')
        return
      }
      if (!res.ok) {
        setError('Admin authentication is currently unavailable.')
        return
      }
      setEmail('')
      setPassword('')
      try {
        sessionStorage.removeItem('aihub_admin_ping_v1')
      } catch {}
      router.replace('/admin/dashboard')
      router.refresh()
    } catch {
      setError('Network error — please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (checking) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center px-4">
        <FacetedGlyph kind="spinner" className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-[65vh] max-w-md items-center justify-center px-4 py-12">
      <form
        onSubmit={onSubmit}
        className="w-full rounded-xl border border-border bg-card p-6 shadow-sm"
      >
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-orange/15 text-brand-orange">
            <FacetedGlyph kind="shield-check" className="h-4 w-4" />
          </span>
          <div>
            <h1 className="font-heading text-lg font-semibold leading-tight">Admin Sign In</h1>
            <p className="text-xs text-muted-foreground">Private administrator access</p>
          </div>
        </div>

        <label className="mb-3 block">
          <span className="mb-1 block text-xs font-medium text-muted-foreground">Admin email</span>
          <input
            type="email"
            autoComplete="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            required
          />
        </label>

        <label className="mb-4 block">
          <span className="mb-1 block text-xs font-medium text-muted-foreground">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            required
          />
        </label>

        {error && <p className="mb-3 text-xs text-red-500">{error}</p>}

        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? 'Signing in…' : 'Sign in as Admin'}
        </button>
      </form>
    </div>
  )
}
