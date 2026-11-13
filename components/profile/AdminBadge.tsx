'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, LogOut, Loader2, Megaphone, Lock, Unlock } from 'lucide-react'
import { cn, formatNumber } from '@/lib/utils'

/**
 * Admin-only signup counter badge. The number is served exclusively by
 * /api/admin/signups after the server verifies the HttpOnly admin JWT cookie —
 * a forged admin state in the browser shows nothing.
 */
export function AdminBadge({
  username,
  canSee = true,
}: {
  username: string
  canSee?: boolean
}) {
  const [count, setCount] = useState<number | null>(null)
  const [status, setStatus] = useState<'loading' | 'authed' | 'auth' | 'unavailable'>(
    'loading'
  )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [open, setOpen] = useState(false)
  // Push broadcast state: idle -> sending -> done/error message (inline).
  const [pushState, setPushState] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  )
  const [pushMsg, setPushMsg] = useState<string | null>(null)
  const [chatLocked, setChatLocked] = useState<boolean | null>(null)
  const [chatLockPending, setChatLockPending] = useState(false)
  const [chatLockMsg, setChatLockMsg] = useState<string | null>(null)

  const broadcast = async () => {
    setPushState('sending')
    setPushMsg(null)
    try {
      const res = await fetch('/api/admin/push-broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
      const data = (await res.json()) as {
        prepared?: number
        sent?: number
        pruned?: number
        total?: number
        error?: string
      }
      if (!res.ok) {
        setPushState('error')
        setPushMsg(data.error === 'push-not-configured' ? 'Push env not set.' : 'Broadcast failed.')
        return
      }
      setPushState('sent')
      setPushMsg(
        `${data.prepared} notification(s) → sent ${data.sent}/${data.total} device(s)${data.pruned ? `, pruned ${data.pruned}` : ''}.`
      )
    } catch {
      setPushState('error')
      setPushMsg('Broadcast failed — network error.')
    }
  }

  const toggleChatLock = async () => {
    if (chatLockPending) return
    const nextLocked = !(chatLocked ?? false)
    setChatLockPending(true)
    setChatLockMsg(null)
    try {
      const res = await fetch('/api/admin/chat-lock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locked: nextLocked }),
      })
      const data = (await res.json()) as { locked?: boolean; error?: string }
      if (!res.ok) {
        setChatLockMsg(data.error ?? 'Failed to update chat lock.')
        return
      }
      setChatLocked(Boolean(data.locked))
      setChatLockMsg(data.locked ? 'Chat locked.' : 'Chat unlocked.')
    } catch {
      setChatLockMsg('Failed to update chat lock — network error.')
    } finally {
      setChatLockPending(false)
    }
  }

  const load = useCallback(async () => {
    try {
      const [res, lockRes] = await Promise.all([
        fetch('/api/admin/signups', { cache: 'no-store' }),
        fetch('/api/admin/chat-lock', { cache: 'no-store' }),
      ])
      if (res.status === 401) {
        setStatus('auth')
        return
      }
      if (!res.ok) {
        setStatus('unavailable')
        return
      }
      const data = (await res.json()) as { count: number; name: string }
      setCount(data.count)
      if (lockRes.ok) {
        const lockData = (await lockRes.json()) as { locked: boolean }
        setChatLocked(Boolean(lockData.locked))
      }
      setStatus('authed')
    } catch {
      setStatus('unavailable')
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  // Refresh the count while the admin stays on the profile page.
  useEffect(() => {
    if (status !== 'authed') return
    const t = setInterval(load, 30_000)
    return () => clearInterval(t)
  }, [status, load])

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
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
        setError('Server not set up yet. Add the env vars and redeploy.')
        return
      }
      setEmail('')
      setPassword('')
      setOpen(false)
      try { sessionStorage.removeItem('aihub_admin_ping_v1') } catch {}
      await load()
    } catch {
      setError('Network error, try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const logout = async () => {
    await fetch('/api/auth/admin-logout', { method: 'POST' }).catch(() => {})
    try { sessionStorage.removeItem('aihub_admin_ping_v1') } catch {}
    setCount(null)
    setStatus('auth')
  }

  if (!open && status === 'loading') return null

  // Hidden from regular users: only the site owner sees any admin UI.
  if (!canSee) return null

  if (status === 'auth') {
    if (!open) {
      return (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1 rounded-full border border-dashed border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
          title="Admin login"
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          Admin
        </button>
      )
    }
    return (
      <form
        onSubmit={login}
        className="mt-3 w-full max-w-sm rounded-lg border border-border bg-card p-4 text-left"
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5" />
            Admin login
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
        </div>
        <input
          type="email"
          autoComplete="email"
          placeholder="Admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          required
        />
        <input
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          required
        />
        {error && <p className="mb-2 text-xs text-red-500">{error}</p>}
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? 'Checking…' : 'Sign in'}
        </button>
      </form>
    )
  }

  if (status === 'unavailable') {
    return (
      <span className="rounded-full border border-orange-300 bg-orange-50 px-3 py-1 text-xs text-orange-600 dark:border-orange-500/40 dark:bg-orange-500/10 dark:text-orange-300">
        Counter setup pending (env vars)
      </span>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <AnimatePresence mode="wait">
        <motion.span
          key={count}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-3 py-1 text-xs font-semibold text-white shadow-sm"
          title="Total signups — only visible to the admin"
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          {count === null ? '…' : formatNumber(count)}{' '}
          {count === 1 ? 'signup' : 'signups'}
        </motion.span>
      </AnimatePresence>
      <button
        onClick={logout}
        className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        title="End admin session"
      >
        <LogOut className="h-3.5 w-3.5" />
        Log out
      </button>
      <button
        onClick={broadcast}
        disabled={pushState === 'sending'}
        className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground disabled:opacity-60"
        title="Send the newest tools as a push notification to all subscribers"
      >
        {pushState === 'sending' ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Megaphone className="h-3.5 w-3.5" />
        )}
        Push new tools
      </button>
      <button
        onClick={toggleChatLock}
        disabled={chatLockPending}
        className={cn(
          'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors disabled:opacity-60',
          chatLocked
            ? 'border-amber-500/40 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 dark:text-amber-400'
            : 'border-border text-muted-foreground hover:text-foreground'
        )}
        title={chatLocked ? 'Unlock AI chat for visitors' : 'Lock AI chat for all visitors'}
      >
        {chatLockPending ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : chatLocked ? (
          <Unlock className="h-3.5 w-3.5" />
        ) : (
          <Lock className="h-3.5 w-3.5" />
        )}
        {chatLocked ? 'Unlock Chat' : 'Lock Chat'}
      </button>
      {chatLockMsg && (
        <span className="text-[11px] text-muted-foreground">{chatLockMsg}</span>
      )}
      {pushMsg && (
        <span
          className={cn(
            'text-[10px]',
            pushState === 'error' ? 'text-red-500' : 'text-brand-green'
          )}
        >
          {pushMsg}
        </span>
      )}
    </div>
  )
}
