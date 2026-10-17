// Decision for whether the client may run the conservative local
// fallback after an AI roundtrip failure.
//
// Contract (independently testable):
// - 5xx (AI unavailable / unparseable / deadline expiry) → local
//   conservative evaluation is allowed, labelled "not AI-verified".
// - 0 = no HTTP response at all (network error or client-side timeout
//   while the server was still inside its budget) → treated as a
//   technical AI failure, local refill allowed.
// - 4xx is a request problem — never refilled with local results.
// - A successful AI response is handled BEFORE this check in the caller:
//   an AI abstention (valid empty array, `abstained:true`) must never be
//   refilled by local keyword evidence.
export function shouldRefillLocally(httpStatus: number): boolean {
  return httpStatus === 0 || httpStatus >= 500
}
