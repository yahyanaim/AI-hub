// Shared timeout budgets for the Find-by-Goal AI matching round trip.
//
// RULE: the client must never abort while the server is still making a
// legitimate fallback-provider attempt. The server's TOTAL budget for all
// provider attempts must therefore be smaller than the client's budget.
//
// Live-verified (Oct 2026, integrate.api.nvidia.com):
// - openai/gpt-oss-20b completes in 16–40s depending on payload
//   (22s budgets aborted legitimate attempts mid-run)
// - provider attempts therefore run IN PARALLEL, each with its own full
//   PROVIDER_ATTEMPT_MS ceiling, instead of sequentially — no provider
//   is starved by the other's slow turnaround.

/** Per-provider attempt budget (ms), enforced independently per model. */
export const PROVIDER_ATTEMPT_MS = 45_000

/** Hard ceiling for the whole provider fan-out (safety envelope). */
export const SERVER_TOTAL_MS = 55_000

/** Client-side fetch budget (ms) — must stay above SERVER_TOTAL_MS. */
export const CLIENT_TIMEOUT_MS = 65_000
