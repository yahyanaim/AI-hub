// Presentation contract when the goal-match AI roundtrip fails at the
// HTTP level (4xx / 5xx / network error / aborted request).
//
// The technical-failure state ALWAYS shows temporary unavailability and
// a visible retry action. It never substitutes keyword-derived results:
// lexical coverage is not verified task support (it once matched
// "remove backgrounds from videos" via a photo tool's description, and
// a paid tool's free trial for a "free" query). An AI abstention is a
// successful response handled before this contract applies, so it can
// never be refilled either.
export const AI_FAILURE_PRESENTATION: {
  state: 'unavailable'
  retry: true
  presentsLocalResults: false
} = {
  state: 'unavailable',
  retry: true,
  presentsLocalResults: false,
}
