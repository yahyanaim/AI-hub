// ============================================================
// Strict validation of the AI evaluator's output contract.
//
// Contract: a JSON array only, zero to six entries, each entry exactly
// { "id": string, "reason": string } with non-empty string values, IDs
// drawn from the supplied candidate set, no duplicate products, reasons
// capped at 160 chars.
//
// Malformed output is a TECHNICAL error — never silently converted into
// "no matches". A valid empty array IS a legitimate abstention.
// Structural validation does NOT prove semantic relevance.
// ============================================================

export interface ValidatedPick {
  id: string
  reason: string
}

export type ParsedOutput =
  | { kind: 'abstain' }
  | { kind: 'ok'; picks: ValidatedPick[]; dropped: number }
  | { kind: 'invalid'; reason: string }

const MAX_RESULTS = 6
const MAX_REASON_CHARS = 160

export function parseModelOutput(text: string, validIds: Set<string>): ParsedOutput {
  // No regex recovery of malformed output: JSON.parse only.
  let parsed: unknown
  try {
    const clean = text.replace(/```json|```/g, '').trim()
    parsed = JSON.parse(clean)
  } catch {
    return { kind: 'invalid', reason: 'not JSON' }
  }

  const arr: unknown = Array.isArray(parsed)
    ? parsed
    : parsed && typeof parsed === 'object'
      ? Object.values(parsed as Record<string, unknown>).find(Array.isArray)
      : undefined
  if (!Array.isArray(arr)) {
    return { kind: 'invalid', reason: 'not an array' }
  }

  // Valid empty array: the model found no sufficiently supported match.
  // This is an abstention, NOT a failure and NOT keyword-fallback fodder.
  if (arr.length === 0) return { kind: 'abstain' }

  const picks: ValidatedPick[] = []
  const seenIds = new Set<string>()
  let dropped = 0
  for (const entry of arr) {
    if (picks.length >= MAX_RESULTS) break
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      dropped++
      continue
    }
    const keys = Object.keys(entry as Record<string, unknown>).sort()
    // Exactly the two required fields — no extras, no omissions.
    if (keys.length !== 2 || keys[0] !== 'id' || keys[1] !== 'reason') {
      dropped++
      continue
    }
    const { id, reason } = entry as Record<string, unknown>
    if (typeof id !== 'string' || !id.trim()) { dropped++; continue }
    if (typeof reason !== 'string' || !reason.trim()) { dropped++; continue }
    // IDs must belong to the supplied candidate set.
    if (!validIds.has(id)) { dropped++; continue }
    if (seenIds.has(id)) { dropped++; continue }
    seenIds.add(id)
    picks.push({ id, reason: reason.trim().slice(0, MAX_REASON_CHARS) })
  }

  // An entirely invalid non-empty response is a technical error, not an
  // abstention dressed up as "no matches".
  if (!picks.length) {
    return { kind: 'invalid', reason: 'no valid entries' }
  }
  return { kind: 'ok', picks, dropped }
}
