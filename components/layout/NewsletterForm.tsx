'use client'

import { useState } from 'react'
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react'

type Status = 'idle' | 'loading' | 'done' | 'error'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const value = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      })
      const data = (await res.json().catch(() => ({}))) as { message?: string }
      if (!res.ok) throw new Error(data.message || 'Subscription failed. Try again.')
      setStatus('done')
      setMessage(data.message || 'Subscribed! Check your inbox to confirm.')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md" aria-label="Newsletter signup">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          disabled={status === 'loading' || status === 'done'}
          aria-label="Email address"
          className="h-10 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-brand-orange/60 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'done'}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
        >
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : status === 'done' ? (
            <Check className="h-4 w-4" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {status === 'done' ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>
      {message && (
        <p
          role={status === 'error' ? 'alert' : 'status'}
          className={`mt-2 flex items-center gap-1.5 text-xs ${status === 'error' ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'}`}
        >
          {status === 'error' && <AlertCircle className="h-3.5 w-3.5" />}
          {message}
        </p>
      )}
    </form>
  )
}
