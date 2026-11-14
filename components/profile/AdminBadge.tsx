'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, LogOut, Loader2, Megaphone, Lock, Unlock, KeyRound } from 'lucide-react'
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
  const router = useRouter()
  const [count, setCount] = useState<number | null>(null)
  const [status, setStatus] = useState<'loading' | 'authed' | 'unauth' | 'unavailable'>(
    'loading'
  )
  // Push broadcast state: idle -> sending -> done/error message (inline).
  const [pushState, setPushState] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  )
  const [pushMsg, setPushMsg] = useState<string | null>(null)
  const [chatLocked, setChatLocked] = useState<boolean | null>(null)
  const [chatLockPending, setChatLockPending] = useState(false)
  const [chatLockMsg, setChatLockMsg] = useState<string | null>(null)
  const [recoveryUsed, setRecoveryUsed] = useState<boolean | null>(null)
  const [recoverOpen, setRecoverOpen] = useState(false)
  const [recoverPassword, setRecoverPassword] = useState('')
  const [recoverPending, setRecoverPending] = useState(false)
  const [recoverMsg, setRecoverMsg] = useState<{ text: string; ok: boolean } | null>(null)

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

  const submitRecovery = async (e: React.FormEvent) => {
    e.preventDefault()
    if (recoverPending) return
    setRecoverPending(true)
    setRecoverMsg(null)
    try {
      const res = await fetch('/api/admin/recover-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: recoverPassword }),
      })
      const data = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok) {
        setRecoverMsg({ text: data.error || 'Could not set password.', ok: false })
        if (res.status === 409) setRecoveryUsed(true)
        return
      }
      setRecoverPassword('')
      setRecoverOpen(false)
      setRecoveryUsed(true)
      setRecoverMsg({ text: 'Password set for yahianaim. You are signed in.', ok: true })
      window.dispatchEvent(new Event('aihunt-auth-changed'))
    } catch {
      setRecoverMsg({ text: 'Network error, try again.', ok: false })
    } finally {
      setRecoverPending(false)
    }
  }

  const clearAdminState = useCallback(() => {
    setCount(null)
    setChatLocked(null)
    setRecoveryUsed(null)
    setRecoverOpen(false)
    setRecoverPassword('')
    setRecoverMsg(null)
    setPushMsg(null)
    setChatLockMsg(null)
  }, [])

  const load = useCallback(async () => {
    try {
      const sessionRes = await fetch('/api/admin/session', { cache: 'no-store' })
      if (!sessionRes.ok) {
        clearAdminState()
        setStatus('unauth')
        return
      }
      const sessionData = (await sessionRes.json()) as { authenticated?: boolean }
      if (!sessionData.authenticated) {
        clearAdminState()
        setStatus('unauth')
        return
      }

      const [res, lockRes, recoverRes] = await Promise.all([
        fetch('/api/admin/signups', { cache: 'no-store' }),
        fetch('/api/admin/chat-lock', { cache: 'no-store' }),
        fetch('/api/admin/recover-account', { cache: 'no-store' }),
      ])
      if (res.status === 401 || lockRes.status === 401 || recoverRes.status === 401) {
        clearAdminState()
        setStatus('unauth')
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
      if (recoverRes.ok) {
        const recoverData = (await recoverRes.json()) as { used: boolean }
        setRecoveryUsed(Boolean(recoverData.used))
      }
      setStatus('authed')
    } catch {
      clearAdminState()
      setStatus('unauth')
    }
  }, [clearAdminState])

  useEffect(() => {
    load()
  }, [load])

  // Refresh the count & verify admin session while the admin stays on the profile page.
  useEffect(() => {
    if (status !== 'authed') return
    const t = setInterval(load, 30_000)
    return () => clearInterval(t)
  }, [status, load])

  const logout = async () => {
    await fetch('/api/auth/admin-logout', { method: 'POST', cache: 'no-store' }).catch(() => {})
    try { sessionStorage.removeItem('aihub_admin_ping_v1') } catch {}
    clearAdminState()
    setStatus('unauth')
    router.refresh()
  }

  // Hidden from all guests, ordinary users, and unauthenticated visitors.
  if (!canSee || status === 'loading' || status === 'unauth') return null

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
      {recoveryUsed === false && (
        <button
          type="button"
          onClick={() => {
            setRecoverOpen((v) => !v)
            setRecoverMsg(null)
          }}
          className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-500/20 dark:text-emerald-400"
          title="One-time password setup for your yahianaim user account"
        >
          <KeyRound className="h-3.5 w-3.5" />
          Set yahianaim password
        </button>
      )}
      {chatLockMsg && (
        <span className="text-[11px] text-muted-foreground">{chatLockMsg}</span>
      )}
      {recoverMsg && (
        <span
          className={cn(
            'text-[11px]',
            recoverMsg.ok ? 'text-brand-green' : 'text-red-500'
          )}
        >
          {recoverMsg.text}
        </span>
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
      {recoverOpen && recoveryUsed === false && (
        <form
          onSubmit={submitRecovery}
          className="mt-2 flex w-full max-w-sm items-center gap-2 rounded-lg border border-border bg-card p-2.5"
        >
          <input
            type="password"
            minLength={6}
            maxLength={128}
            autoComplete="new-password"
            placeholder="New yahianaim password (min 6)"
            value={recoverPassword}
            onChange={(e) => setRecoverPassword(e.target.value)}
            className="min-w-0 flex-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs outline-none focus:border-accent"
            required
          />
          <button
            type="submit"
            disabled={recoverPending || recoverPassword.length < 6}
            className="btn-primary shrink-0 px-3 py-1.5 text-xs"
          >
            {recoverPending ? 'Saving…' : 'Save'}
          </button>
        </form>
      )}
    </div>
  )
}
