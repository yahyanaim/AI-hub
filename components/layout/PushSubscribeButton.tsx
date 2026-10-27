'use client'

import { useCallback, useEffect, useState } from 'react'
import { BellRing, Loader2, Smartphone } from 'lucide-react'

type PushState = 'checking' | 'unsupported' | 'unpermitted' | 'granted' | 'asking' | 'error'

const isIOS =
  typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !('MSStream' in window)

/** Waits for the SW to activate, with a hard timeout so the UI never hangs. */
function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, rej) => setTimeout(() => rej(new Error('timeout')), ms)),
  ])
}

/**
 * "Turn on notifications" — registers /sw.js, requests the browser push
 * permission (must happen inside a click), then saves the subscription
 * server-side so the admin can broadcast new tools to this device.
 */
export function PushSubscribeButton() {
  const [state, setState] = useState<PushState>('checking')
  const [busy, setBusy] = useState(false)
  const [hint, setHint] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        setState('unsupported')
        return
      }
      const perm = Notification.permission
      if (perm === 'granted') {
        // Already allowed — make sure the SW + subscription + server record
        // all exist (a permission can be granted from browser settings with
        // no subscription ever created).
        try {
          const reg = await withTimeout(navigator.serviceWorker.register('/sw.js'), 10_000)
          if (!reg.active) await withTimeout(navigator.serviceWorker.ready, 10_000)
          const keyRes = await fetch('/api/push/public-key')
          const { key } = keyRes.ok
            ? ((await keyRes.json()) as { key: string })
            : { key: '' }
          const existing = await reg.pushManager.getSubscription()
          const sub =
            existing ??
            (key
              ? await reg.pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array(key),
                })
              : null)
          if (sub) {
            await fetch('/api/push/subscribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ subscription: sub.toJSON() }),
            }).catch(() => {})
          }
        } catch {
          /* ignore */
        }
        setState('granted')
        return
      }
      if (perm === 'denied') {
        setState('unpermitted')
        return
      }
      setState('asking')
    })()
    return () => {
      alive = false
    }
  }, [])

  const enable = useCallback(async () => {
    setBusy(true)
    setHint(null)
    try {
      // iOS Safari (16.4+) first shows the permission prompt for push only
      // inside the check that works — but OS-level: requestPermission must
      // run in the click task.
      const perm = await Notification.requestPermission()
      if (perm !== 'granted') {
        setState('unpermitted')
        return
      }
      const reg = await withTimeout(navigator.serviceWorker.register('/sw.js'), 10_000)
      if (!reg.active) await withTimeout(navigator.serviceWorker.ready, 10_000)
      const keyRes = await fetch('/api/push/public-key')
      if (!keyRes.ok) throw new Error('key')
      const { key } = (await keyRes.json()) as { key: string }
      const existing = await reg.pushManager.getSubscription()
      const sub =
        existing ??
        (await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(key),
        }))
      const save = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription: sub.toJSON() }),
      })
      if (!save.ok) throw new Error('save')
      setState('granted')
    } catch {
      setState('error')
      setHint('Could not enable push. Try again or check browser settings.')
    } finally {
      setBusy(false)
    }
  }, [])

  if (state === 'checking' || state === 'granted') {
    return state === 'granted' ? (
      <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
        <BellRing className="h-3 w-3" />
        Push on
      </span>
    ) : null
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={enable}
        disabled={busy || state === 'unsupported'}
        className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-accent hover:text-foreground disabled:opacity-60"
        title={
          state === 'unsupported'
            ? 'Push not supported in this browser'
            : 'Get a notification when new tools are added'
        }
      >
        {busy ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <BellRing className="h-3 w-3" />
        )}
        {state === 'unpermitted' ? 'Push blocked' : 'Turn on notifications'}
      </button>
      {state === 'unsupported' && (
        <span className="text-[10px] text-muted-foreground">
          Not supported in this browser.
        </span>
      )}
      {state === 'unpermitted' && (
        <span className="text-[10px] text-muted-foreground">
          Blocked in browser settings — enable there, then reopen.
        </span>
      )}
      {state === 'error' && hint && (
        <span className="text-[10px] text-red-500">{hint}</span>
      )}
      {state !== 'unsupported' && isIOS && (
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Smartphone className="h-3 w-3" />
          iPhone: Add to Home Screen first (Share → Add to Home Screen).
        </span>
      )}
    </div>
  )
}

// Chrome/Firefox accept the VAPID key as URL-safe base64.
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw = atob(base64)
  const out = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i)
  return out
}
