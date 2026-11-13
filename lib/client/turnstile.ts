'use client'

export type TurnstileAction = 'chat' | 'cv' | 'goal_match'

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string
          action?: string
          appearance?: 'always' | 'execute' | 'interaction-only'
          execution?: 'render' | 'execute'
          callback?: (token: string) => void
          'before-interactive-callback'?: () => void
          'after-interactive-callback'?: () => void
          'error-callback'?: () => void
          'expired-callback'?: () => void
          'timeout-callback'?: () => void
        }
      ) => string
      execute: (widgetId: string) => void
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

let scriptPromise: Promise<boolean> | null = null
let activeQueue: Promise<unknown> = Promise.resolve()

function loadTurnstileScript(timeoutMs = 4500): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false)
  if (window.turnstile) return Promise.resolve(true)
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise<boolean>((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true

    let done = false
    const finish = (ok: boolean) => {
      if (done) return
      done = true
      window.clearTimeout(timer)
      if (!ok) scriptPromise = null
      resolve(ok)
    }

    const timer = window.setTimeout(() => finish(false), timeoutMs)
    script.onload = () => finish(Boolean(window.turnstile))
    script.onerror = () => finish(false)
    document.head.appendChild(script)
  })
  return scriptPromise
}

async function runTurnstileOnce(options: {
  action: TurnstileAction
  signal?: AbortSignal
}): Promise<Record<string, string>> {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim()
  if (!siteKey || typeof window === 'undefined' || options.signal?.aborted) return {}

  const loaded = await loadTurnstileScript()
  if (!loaded || !window.turnstile || options.signal?.aborted) return {}

  return new Promise<Record<string, string>>((resolve) => {
    // Accessible overlay container (never display:none so Turnstile can render interactive challenges)
    const overlay = document.createElement('div')
    overlay.setAttribute('role', 'dialog')
    overlay.setAttribute('aria-modal', 'true')
    overlay.setAttribute('aria-label', 'Human verification')
    overlay.style.position = 'fixed'
    overlay.style.inset = '0'
    overlay.style.zIndex = '9999'
    overlay.style.display = 'flex'
    overlay.style.alignItems = 'center'
    overlay.style.justifyContent = 'center'
    overlay.style.padding = '16px'
    overlay.style.background = 'rgba(0, 0, 0, 0.55)'
    overlay.style.opacity = '0'
    overlay.style.pointerEvents = 'none'
    overlay.style.transition = 'opacity 150ms ease'

    const card = document.createElement('div')
    card.style.background = '#111827'
    card.style.color = '#f9fafb'
    card.style.borderRadius = '12px'
    card.style.padding = '20px'
    card.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4)'
    card.style.display = 'flex'
    card.style.flexDirection = 'column'
    card.style.alignItems = 'center'
    card.style.gap = '12px'

    const title = document.createElement('p')
    title.textContent = 'Quick security check'
    title.style.margin = '0'
    title.style.fontSize = '14px'
    title.style.fontWeight = '600'

    const widgetHost = document.createElement('div')

    const cancelBtn = document.createElement('button')
    cancelBtn.type = 'button'
    cancelBtn.textContent = 'Cancel'
    cancelBtn.setAttribute('aria-label', 'Cancel verification')
    cancelBtn.style.background = 'transparent'
    cancelBtn.style.color = '#9ca3af'
    cancelBtn.style.border = '1px solid #374151'
    cancelBtn.style.borderRadius = '8px'
    cancelBtn.style.padding = '6px 12px'
    cancelBtn.style.fontSize = '12px'
    cancelBtn.style.cursor = 'pointer'

    card.appendChild(title)
    card.appendChild(widgetHost)
    card.appendChild(cancelBtn)
    overlay.appendChild(card)
    document.body.appendChild(overlay)

    let settled = false
    let retriedExpired = false
    let widgetId = ''

    const showInteractive = () => {
      overlay.style.opacity = '1'
      overlay.style.pointerEvents = 'auto'
    }
    const hideInteractive = () => {
      overlay.style.opacity = '0'
      overlay.style.pointerEvents = 'none'
    }

    const cleanup = () => {
      options.signal?.removeEventListener('abort', onAbort)
      cancelBtn.removeEventListener('click', onCancel)
      window.clearTimeout(timer)
      try {
        if (widgetId && window.turnstile) window.turnstile.remove(widgetId)
      } catch {
        // ignore
      }
      overlay.remove()
    }

    const finish = (headers: Record<string, string>) => {
      if (settled) return
      settled = true
      cleanup()
      resolve(headers)
    }

    const onAbort = () => finish({})
    const onCancel = () => finish({})

    options.signal?.addEventListener('abort', onAbort, { once: true })
    cancelBtn.addEventListener('click', onCancel, { once: true })

    const timer = window.setTimeout(() => finish({}), 20_000)

    try {
      widgetId = window.turnstile!.render(widgetHost, {
        sitekey: siteKey,
        action: options.action,
        appearance: 'interaction-only',
        execution: 'render',
        'before-interactive-callback': () => {
          if (!settled) showInteractive()
        },
        'after-interactive-callback': () => {
          if (!settled) hideInteractive()
        },
        callback: (token: string) => {
          finish(token ? { 'x-turnstile-token': token } : {})
        },
        'expired-callback': () => {
          if (settled) return
          if (!retriedExpired && widgetId && window.turnstile) {
            retriedExpired = true
            try {
              window.turnstile.reset(widgetId)
              return
            } catch {
              // fall through
            }
          }
          finish({})
        },
        'timeout-callback': () => finish({}),
        'error-callback': () => finish({}),
      })
    } catch {
      finish({})
    }
  })
}

/**
 * Serializes Turnstile verification to prevent simultaneous widget leaks and
 * returns `x-turnstile-token` when NEXT_PUBLIC_TURNSTILE_SITE_KEY is configured.
 * Returns `{}` immediately when Turnstile is not enabled.
 */
export function getTurnstileHeaders(options: {
  action?: TurnstileAction
  signal?: AbortSignal
} = {}): Promise<Record<string, string>> {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim()
  if (!siteKey || typeof window === 'undefined' || options.signal?.aborted) {
    return Promise.resolve({})
  }

  const next = activeQueue.then(() =>
    runTurnstileOnce({
      action: options.action ?? 'chat',
      signal: options.signal,
    })
  )
  activeQueue = next.catch(() => ({}))
  return next
}
