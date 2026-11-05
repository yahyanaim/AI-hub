// Shared timeout budgets for the Find-by-Goal AI matching round trip.
//
// RULE: the client must never abort while the server is still making a
// legitimate fallback-provider attempt. The server's TOTAL budget for all
// provider attempts must therefore be smaller than the client's budget.
//
// Live-verified (Nov 2026 audit, integrate.api.nvidia.com, production
// host, real 30-candidate payload for the clip query; budget race with
// 8000-token headroom):
// - openai/gpt-oss-20b: hangs forever, no response, no error (removed).
// - deepseek-v4.1-flash: hangs forever, no response (removed).
// - nvidia/nemotron-3.5-lightning-30b-a3b: valid JSON at 21.4s.
// - minimaxai/minimax-m3.1-flash: valid JSON at 26.4s.
// - moonshotai/kimi-k2.6: 404 not available to this account.
// z-ai/glm-5.3-flash (Oct measure): never delivered inside any budget.
// Attempt budget 75s covers the observed real draw range with margin;
// anything past it surfaces the honest unavailable state with UI retry.

/** Per-provider attempt budget (ms), enforced independently per model. */
export const PROVIDER_ATTEMPT_MS = 75_000

/** Hard ceiling for the whole provider fan-out (safety envelope). */
export const SERVER_TOTAL_MS = 80_000

/** Client-side fetch budget (ms) — must stay above SERVER_TOTAL_MS. */
export const CLIENT_TIMEOUT_MS = 90_000
