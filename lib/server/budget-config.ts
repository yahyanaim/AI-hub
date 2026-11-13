import 'server-only'

function envInt(name: string, fallback: number, min = 1): number {
  const raw = process.env[name]?.trim()
  if (!raw) return fallback
  const parsed = Number.parseInt(raw, 10)
  return Number.isFinite(parsed) && parsed >= min ? parsed : fallback
}

export function isAiEmergencyDisabled(): boolean {
  const v = process.env.AI_EMERGENCY_DISABLE?.trim().toLowerCase()
  return v === 'true' || v === '1' || v === 'yes'
}

export function getBudgetConfig() {
  return {
    globalDailyLimit: envInt('AI_GLOBAL_DAILY_REQUEST_LIMIT', 500),
    globalMonthlyLimit: envInt('AI_GLOBAL_MONTHLY_REQUEST_LIMIT', 10_000),
    globalMaxConcurrent: envInt('AI_GLOBAL_MAX_CONCURRENT', 10),

    cvMonthlyLimit: envInt('CV_MONTHLY_LIMIT', 3),
    cvIpMonthlyLimit: envInt('CV_IP_MONTHLY_LIMIT', 12),
    cvAbusePerMinuteLimit: envInt('CV_ABUSE_PER_MINUTE_LIMIT', 10),

    chatPerMinuteLimit: envInt('CHAT_PER_MINUTE_LIMIT', 5),
    chatPerHourLimit: envInt('CHAT_PER_HOUR_LIMIT', 20),
    chatPerDayLimit: envInt('CHAT_PER_DAY_LIMIT', 50),
    chatPerMonthLimit: envInt('CHAT_PER_MONTH_LIMIT', 300),
    chatMaxConcurrent: envInt('CHAT_MAX_CONCURRENT', 1),

    goalPerMinuteLimit: envInt('GOAL_PER_MINUTE_LIMIT', 5),
    goalPerDayLimit: envInt('GOAL_PER_DAY_LIMIT', 20),
    goalPerMonthLimit: envInt('GOAL_PER_MONTH_LIMIT', 100),
    goalMaxConcurrent: envInt('GOAL_MAX_CONCURRENT', 1),
    goalCacheTtlSeconds: envInt('GOAL_CACHE_TTL_SECONDS', 300, 0),
  }
}
