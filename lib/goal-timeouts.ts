// Shared timeout budgets for the Find-by-Goal AI matching round trip.
//
// RULE: the client must never abort while the server is still making a
// legitimate fallback-provider attempt. The server's TOTAL budget for all
// provider attempts must therefore be smaller than the client's budget.
//
// Live-verified (Oct 2026, integrate.api.nvidia.com, production payload
// for the reported false-empty query "turn youtube videos into short
// clips"):
// - openai/gpt-oss-20b (reasoning_effort=medium, max_tokens=3000): valid
//   generations measured at 14.7-67.5s (low effort 14.7s; medium draws
//   25.1s, 31.9s, 48.2s, 52s, 62.8s, 67.5s — the endpoint's draws
//   widened over the session (later draws slower). Budgets are aligned
//   to the OBSERVED maximum valid generation (67.5s) with a small
//   margin; anything past the attempt ceiling surfaces as the honest
//   unavailable state with UI retry, never as fake results.
// - z-ai/glm-5.3-flash: 45s, 60s, and 90s ceilings all aborted — never
//   delivered inside ANY budget (thinking-disabled variants >60s), so
//   it was removed from the fan-out (measured net-negative; replace
//   only with a model measured FASTER on the exact payload).

/** Per-provider attempt budget (ms), enforced independently per model. */
export const PROVIDER_ATTEMPT_MS = 75_000

/** Hard ceiling for the whole provider fan-out (safety envelope). */
export const SERVER_TOTAL_MS = 80_000

/** Client-side fetch budget (ms) — must stay above SERVER_TOTAL_MS. */
export const CLIENT_TIMEOUT_MS = 90_000
