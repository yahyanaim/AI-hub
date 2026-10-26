'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Gift, Package, Share2, Wrench, Check, Trash2 } from 'lucide-react'
import { useApp, notificationHref, type AppNotification } from '@/lib/store'
import { cn, relativeTime } from '@/lib/utils'

const ICONS: Record<AppNotification['itemType'], typeof Bell> = {
  tool: Wrench,
  devtool: Package,
  repo: Share2,
  offer: Gift,
}

const LABELS: Record<AppNotification['itemType'], string> = {
  tool: 'AI Tool added',
  devtool: 'Dev Tool added',
  repo: 'Editing Tool added',
  offer: 'Offer added',
}

const CATALOG_LABELS: Record<AppNotification['itemType'], string> = {
  tool: 'New AI Tool',
  devtool: 'New Dev Tool',
  repo: 'New Editing Tool',
  offer: 'New Offer',
}

const labelFor = (n: AppNotification) =>
  (n.source === 'catalog' ? CATALOG_LABELS : LABELS)[n.itemType]

/** Short two-tone chime via Web Audio (no asset, no autoplay policy issue
 * after a user gesture — submissions happen on click so the context resumes). */
function playNotificationSound() {
  try {
    const w = window as Window & { webkitAudioContext?: typeof AudioContext }
    const Ctx = window.AudioContext ?? w.webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, ctx.currentTime)
    osc.frequency.setValueAtTime(1174.7, ctx.currentTime + 0.12)
    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.5)
    osc.onended = () => ctx.close().catch(() => {})
  } catch {}
}

export function NotificationBell() {
  const router = useRouter()
  const {
    currentUser,
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
  } = useApp()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  // Notifications are a signed-in feature: signed-out visitors get no bell,
  // no sound, nothing. Hook order stays stable — the gate sits below all hooks.
  const prevUnreadRef = useRef<number | null>(null)

  // Chime whenever the unread count GROWS (a new item was just submitted or
  // arrived via another tab). The first observed value is skipped so a page
  // load with old unread entries never beeps on open.
  useEffect(() => {
    const prev = prevUnreadRef.current
    prevUnreadRef.current = unreadNotificationCount
    if (prev === null) return
    if (unreadNotificationCount > prev) playNotificationSound()
  }, [unreadNotificationCount])

  // Reset the panel when signed out.
  useEffect(() => {
    if (!currentUser) setOpen(false)
  }, [currentUser])

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  if (!currentUser) return null

  const openNotification = (n: AppNotification) => {
    markNotificationRead(n.id)
    setOpen(false)
    router.push(notificationHref(n))
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'relative inline-flex size-9 items-center justify-center rounded-lg transition-colors',
          open ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        )}
        aria-label={`Notifications${unreadNotificationCount ? ` (${unreadNotificationCount} unread)` : ''}`}
        title="Notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadNotificationCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white">
            {unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className={cn(
            'z-50 overflow-hidden rounded-xl border border-border bg-background shadow-xl',
            // Mobile: fixed sheet matching the navbar pill's exact width
            // (12px insets like the navbar container) with a 8px breathing
            // gap below it — the pill is 88px tall (56px logo + padding).
            'fixed left-3 right-3 top-[6rem]',
            // Desktop+: anchored dropdown from the bell.
            'sm:absolute sm:inset-x-auto sm:right-0 sm:top-11 sm:w-80'
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <span className="text-sm font-semibold text-foreground">Notifications</span>
            {notifications.length > 0 && (
              <div className="flex items-center gap-2">
                {unreadNotificationCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    title="Mark all as read"
                  >
                    <Check className="h-3 w-3" />
                    Mark all read
                  </button>
                )}
                <button
                  onClick={clearNotifications}
                  className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-red-500"
                  title="Clear all notifications"
                >
                  <Trash2 className="h-3 w-3" />
                  Clear
                </button>
              </div>
            )}
          </div>

          {notifications.length === 0 ? (
            <p className="flex min-h-20 items-center justify-center px-4 py-6 text-center text-xs text-muted-foreground">
              Nothing here yet.
            </p>
          ) : (
            <ul className="max-h-[min(20rem,50vh)] overflow-y-auto overscroll-contain">
              {notifications.map((n) => {
                const Icon = ICONS[n.itemType]
                return (
                  <li key={n.id}>
                    <button
                      onClick={() => openNotification(n)}
                      className={cn(
                        'flex w-full items-start gap-2.5 px-3 py-2.5 text-left transition-colors hover:bg-muted/60',
                        !n.read && 'bg-brand-orange/5'
                      )}
                    >
                      <span
                        className={cn(
                          'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg',
                          n.source === 'catalog'
                            ? 'bg-accent/10 text-accent'
                            : n.itemType === 'offer'
                              ? 'bg-brand-green/10 text-brand-green'
                              : 'bg-secondary text-muted-foreground'
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5">
                          <span className="truncate text-xs font-medium text-muted-foreground">
                            {labelFor(n)}
                          </span>
                          {!n.read && (
                            <span className="size-1.5 shrink-0 rounded-full bg-brand-orange" aria-label="Unread" />
                          )}
                        </span>
                        <span className="mt-0.5 block truncate text-sm font-medium text-foreground">
                          {n.name}
                        </span>
                        <span className="mt-0.5 block text-[11px] text-muted-foreground">
                          {relativeTime(n.createdAt)}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
