// Provider roundtrip decision engine for Find-by-Goal.
//
// Semantics (all live-verified behaviors encoded here):
// - All configured providers run IN PARALLEL, each with its own full
//   per-attempt budget owned by `send`.
// - A validated NON-EMPTY pick-set is returned immediately when it
//   becomes available. A first valid EMPTY response (`[]`) is an
//   abstention — it NEVER cancels an in-flight sibling provider and
//   never wins the race while a non-empty result may still arrive.
// - If at least one provider abstains, the request parks until every
//   provider settles or the shared deadline expires; abstention then
//   wins (and is distinguishable via `deadlineExpired`).
// - Deadline expiry with no valid provider output is a distinct failure
//   (cause 'deadline'), separate from provider errors and unparseable
//   model output.
// - Cancellation on early matches or deadline: upstream cost for tokens
//   already processed may still be incurred — cancellation is a latency
//   measure, not a billing guarantee.
import { parseModelOutput } from './goal-output'

export interface ProviderResult {
  ok: boolean
  model: string
  /** Raw model content; present only when ok. */
  text?: string
  finishReason?: string
  /** Failure metadata. */
  httpStatus?: number
  errName?: string
}

type Outcome = ReturnType<typeof parseModelOutput>

export type RoundtripResult =
  | { kind: 'ok'; picks: { id: string; reason: string }[]; dropped: number; finishReason: string }
  | { kind: 'abstain'; deadlineExpired: boolean; abstentions: number }
  | { kind: 'failure'; cause: 'provider-error' | 'invalid-output' | 'deadline'; deadlineExpired: boolean }

export interface RoundtripDeps {
  models: string[]
  /** Launch one provider attempt; owns its own per-attempt timeout. */
  send: (model: string) => Promise<ProviderResult>
  /** Shared deadline for the whole fan-out (ms). */
  totalMs: number
  validIds: Set<string>
  /** Abort in-flight sibling attempts (best effort; latency only). */
  cancelInFlight?: () => void
  onEvent?: (event: string, meta: Record<string, unknown>) => void
}

type Winner =
  | { kind: 'ok'; picks: { id: string; reason: string }[]; dropped: number; finishReason: string }
  | { kind: 'abstain' }
  | { kind: 'failure'; cause: 'provider-error' | 'invalid-output' }

export function runProviderRoundtrip(deps: RoundtripDeps): Promise<RoundtripResult> {
  let pending = deps.models.length
  let abstentions = 0
  let invalids = 0
  let finished = false

  let resolveWinner!: (w: Winner) => void
  const winner = new Promise<Winner>((resolve) => {
    resolveWinner = resolve
  })
  const finish = (w: Winner) => {
    if (!finished) {
      finished = true
      resolveWinner(w)
    }
  }

  for (const model of deps.models) {
    deps
      .send(model)
      .then((res) => {
        if (!res.ok || !res.text) {
          deps.onEvent?.('provider-failed', { model, httpStatus: res.httpStatus, errName: res.errName })
          return
        }
        const outcome = parseModelOutput(res.text, deps.validIds)
        if (outcome.kind === 'ok') {
          // Validated non-empty matches: return immediately. A sibling
          // response that already resolved with `[]` was parked, not
          // cancellable — and this result outranks it once it exists.
          deps.cancelInFlight?.()
          finish({ kind: 'ok', picks: outcome.picks, dropped: outcome.dropped, finishReason: res.finishReason ?? '' })
        } else if (outcome.kind === 'abstain') {
          abstentions++
        } else {
          invalids++
          deps.onEvent?.('provider-invalid-output', { model, reason: outcome.reason })
        }
      })
      .catch((err: unknown) => {
        deps.onEvent?.('provider-failed', { model, errName: err instanceof Error ? err.name : 'unknown' })
      })
      .finally(() => {
        pending--
        if (pending === 0 && !finished) {
          if (abstentions > 0) {
            finish({ kind: 'abstain' })
          } else {
            finish({
              kind: 'failure',
              cause: invalids > 0 ? 'invalid-output' : 'provider-error',
            })
          }
        }
      })
  }

  const deadline = new Promise<{ deadline: true }>((resolve) => {
    const t = setTimeout(() => resolve({ deadline: true }), deps.totalMs)
    if (typeof t === 'object' && typeof t.unref === 'function') t.unref()
  })

  return Promise.race([winner, deadline]).then((r): RoundtripResult => {
    if ('kind' in r) {
      if (r.kind === 'ok') {
        return { kind: 'ok', picks: r.picks, dropped: r.dropped, finishReason: r.finishReason }
      }
      if (r.kind === 'abstain') return { kind: 'abstain', deadlineExpired: false, abstentions }
      {
        const cause = r.cause
        return { kind: 'failure', cause, deadlineExpired: false }
      }
    }
    // Deadline expiry: let the deadline fully cancel in-flight attempts
    // so the route stops paying for the request.
    deps.cancelInFlight?.()
    if (abstentions > 0) {
      deps.onEvent?.('deadline-after-abstention', { abstentions })
      return { kind: 'abstain', deadlineExpired: true, abstentions }
    }
    deps.onEvent?.('deadline-expired', { invalids })
    return { kind: 'failure', cause: 'deadline', deadlineExpired: true }
  })
}
