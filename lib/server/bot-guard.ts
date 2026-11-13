import 'server-only'

const AUTOMATED_UA_RE =
  /\b(curl|wget|python-requests|python-urllib|httpx|aiohttp|go-http-client|libwww-perl|scrapy|httpclient|java\/|okhttp|node-fetch|undici|postmanruntime|insomnia)\b/i

export type BotCheckResult =
  | { ok: true }
  | { ok: false; status: number; error: string }

export function isTurnstileServerConfigured(): boolean {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim()
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim()
  if (!secret) return false
  if (siteKey) return true
  return process.env.TURNSTILE_ENFORCE_WITHOUT_SITE_KEY === '1'
}

function hasRiskSignals(request: Request): boolean {
  const secFetchSite = request.headers.get('sec-fetch-site')?.trim().toLowerCase()
  const acceptLang = request.headers.get('accept-language')?.trim()
  if (!secFetchSite || secFetchSite === 'none') return true
  if (!acceptLang) return true
  return false
}

/**
 * Layered anti-bot and payload-size guard for expensive AI POST endpoints.
 * Never applied to public GET catalog/SEO pages so Googlebot, Bingbot, and
 * normal search crawlers are completely unaffected.
 */
export async function checkExpensiveAiBotGuard(
  request: Request,
  options: { maxContentLengthBytes?: number } = {}
): Promise<BotCheckResult> {
  if (options.maxContentLengthBytes) {
    const rawLen = request.headers.get('content-length')
    if (rawLen) {
      const len = Number.parseInt(rawLen, 10)
      if (Number.isFinite(len) && len > options.maxContentLengthBytes) {
        return { ok: false, status: 413, error: 'Request payload too large.' }
      }
    }
  }

  // Reject explicit cross-site browser requests and mismatched Origin headers.
  const secFetchSite = request.headers.get('sec-fetch-site')?.trim().toLowerCase()
  if (secFetchSite === 'cross-site') {
    return {
      ok: false,
      status: 403,
      error: 'Cross-site requests to this AI endpoint are not permitted.',
    }
  }

  const origin = request.headers.get('origin')?.trim()
  const host = (request.headers.get('x-forwarded-host') || request.headers.get('host'))?.trim()
  if (origin && host) {
    try {
      const originHost = new URL(origin).host.toLowerCase()
      if (originHost !== host.toLowerCase()) {
        return {
          ok: false,
          status: 403,
          error: 'Origin mismatch on AI endpoint request.',
        }
      }
    } catch {
      return { ok: false, status: 403, error: 'Invalid Origin header.' }
    }
  }

  const strictUa = process.env.AI_BOT_STRICT !== 'false'
  if (strictUa) {
    const ua = request.headers.get('user-agent')?.trim() ?? ''
    const requireUa =
      process.env.AI_BOT_REQUIRE_UA === '1' ||
      process.env.VERCEL_ENV === 'production' ||
      process.env.NODE_ENV === 'production'
    if (ua ? ua.length < 8 || AUTOMATED_UA_RE.test(ua) : requireUa) {
      return {
        ok: false,
        status: 403,
        error: 'Automated requests to this AI endpoint are not permitted.',
      }
    }
  }

  // Optional Cloudflare Turnstile verification.
  // Only enforced when BOTH TURNSTILE_SECRET_KEY and NEXT_PUBLIC_TURNSTILE_SITE_KEY
  // are configured (so legitimate client requests always have a widget to solve),
  // unless TURNSTILE_ENFORCE_WITHOUT_SITE_KEY=1 is explicitly set.
  if (isTurnstileServerConfigured()) {
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY!.trim()
    const mode = process.env.TURNSTILE_MODE?.trim().toLowerCase() === 'risk' ? 'risk' : 'always'
    const token = request.headers.get('x-turnstile-token')?.trim()

    if (mode === 'always' || token || hasRiskSignals(request)) {
      if (!token) {
        return {
          ok: false,
          status: 403,
          error: 'Human verification token required.',
        }
      }
      try {
        const form = new URLSearchParams({
          secret: turnstileSecret,
          response: token,
        })
        const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          body: form,
        })
        const verified = (await verifyRes.json()) as { success?: boolean }
        if (!verified.success) {
          return {
            ok: false,
            status: 403,
            error: 'Human verification failed. Please refresh and try again.',
          }
        }
      } catch {
        return {
          ok: false,
          status: 503,
          error: 'Verification service temporarily unavailable.',
        }
      }
    }
  }

  return { ok: true }
}
