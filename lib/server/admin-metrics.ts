import 'server-only'
import { isRedisConfigured, redisPipeline } from '@/lib/server/redis'

export type AdminMetricField =
  | 'signups'
  | 'chat_ok'
  | 'chat_err'
  | 'goal_ok'
  | 'goal_err'
  | 'cv_ok'
  | 'cv_blocked_429'
  | 'cv_refunded'
  | 'rl_429'
  | 'bot_403'
  | 'err_503'
  | 'conc_429'
  | 'auth_fail'
  | 'admin_unauth'

export const METRIC_FIELDS: readonly AdminMetricField[] = [
  'signups',
  'chat_ok',
  'chat_err',
  'goal_ok',
  'goal_err',
  'cv_ok',
  'cv_blocked_429',
  'cv_refunded',
  'rl_429',
  'bot_403',
  'err_503',
  'conc_429',
  'auth_fail',
  'admin_unauth',
]

export const METRICS_STARTED_KEY = 'aihunt:metrics:started_at'
export const METRICS_DAY_PREFIX = 'aihunt:metrics:d:'
export const ACTIVE_HLL_PREFIX = 'aihunt:metrics:active:d:'
export const USERS_INDEX_KEY = 'aihunt:users:index'

const METRICS_TTL_SECONDS = 60 * 60 * 24 * 120 // 120 days

export type DailyMetricRow = Record<AdminMetricField, number> & {
  date: string
  aiChatTotal: number
  goalMatchTotal: number
  cvUploadsTotal: number
  dau: number
}

const memMetricsByDay = new Map<string, Partial<Record<AdminMetricField, number>>>()
const memActiveByDay = new Map<string, Set<string>>()
let memTrackingStartedAt: string | null = null

export function utcDayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10)
}

export function buildEmptyDailyRow(date: string): DailyMetricRow {
  return {
    date,
    signups: 0,
    chat_ok: 0,
    chat_err: 0,
    goal_ok: 0,
    goal_err: 0,
    cv_ok: 0,
    cv_blocked_429: 0,
    cv_refunded: 0,
    rl_429: 0,
    bot_403: 0,
    err_503: 0,
    conc_429: 0,
    auth_fail: 0,
    admin_unauth: 0,
    aiChatTotal: 0,
    goalMatchTotal: 0,
    cvUploadsTotal: 0,
    dau: 0,
  }
}

export async function recordAdminMetric(
  field: AdminMetricField,
  amount = 1,
  date = new Date()
): Promise<void> {
  if (!Number.isFinite(amount) || amount <= 0) return
  const day = utcDayKey(date)

  if (!isRedisConfigured()) {
    if (!memTrackingStartedAt) memTrackingStartedAt = day
    const entry = memMetricsByDay.get(day) ?? {}
    entry[field] = (entry[field] ?? 0) + amount
    memMetricsByDay.set(day, entry)
    return
  }

  const key = `${METRICS_DAY_PREFIX}${day}`
  await redisPipeline([
    ['SET', METRICS_STARTED_KEY, day, 'NX'],
    ['HINCRBY', key, field, String(amount)],
    ['EXPIRE', key, String(METRICS_TTL_SECONDS)],
  ]).catch(() => null)
}

export async function recordActiveVisitor(
  opaqueActorId: string,
  date = new Date()
): Promise<void> {
  if (!opaqueActorId) return
  const day = utcDayKey(date)

  if (!isRedisConfigured()) {
    if (!memTrackingStartedAt) memTrackingStartedAt = day
    const set = memActiveByDay.get(day) ?? new Set<string>()
    set.add(opaqueActorId)
    memActiveByDay.set(day, set)
    return
  }

  const key = `${ACTIVE_HLL_PREFIX}${day}`
  await redisPipeline([
    ['PFADD', key, opaqueActorId],
    ['EXPIRE', key, String(METRICS_TTL_SECONDS)],
  ]).catch(() => null)
}

export async function indexUserAccount(
  username: string,
  createdAtMs: number
): Promise<void> {
  if (!username || !isRedisConfigured()) return
  await redisPipeline([
    ['ZADD', USERS_INDEX_KEY, String(createdAtMs), username],
  ]).catch(() => null)
}

export function getMemTrackingStartedAt(): string | null {
  return memTrackingStartedAt
}

export function getMemMetricsSnapshot(days: string[]): {
  rows: DailyMetricRow[]
  wau: number
  mau: number
} {
  const rows = days.map((day) => {
    const row = buildEmptyDailyRow(day)
    const entry = memMetricsByDay.get(day)
    if (entry) {
      for (const f of METRIC_FIELDS) {
        row[f] = entry[f] ?? 0
      }
    }
    row.dau = memActiveByDay.get(day)?.size ?? 0
    return row
  })

  const wauSet = new Set<string>()
  const mauSet = new Set<string>()
  const last7 = new Set(days.slice(-7))
  const last30 = new Set(days.slice(-30))
  for (const day of days) {
    const set = memActiveByDay.get(day)
    if (!set) continue
    if (last7.has(day)) set.forEach((v) => wauSet.add(v))
    if (last30.has(day)) set.forEach((v) => mauSet.add(v))
  }

  return { rows, wau: wauSet.size, mau: mauSet.size }
}

export function __resetAdminMetricsForTests(): void {
  memMetricsByDay.clear()
  memActiveByDay.clear()
  memTrackingStartedAt = null
}
