import 'server-only'
import { SEED_COURSES } from '@/lib/seed/courses'
import { SEED_DEV_TOOLS } from '@/lib/seed/dev-tools'
import { SEED_OFFERS } from '@/lib/seed/offers'
import { SEED_REPOS } from '@/lib/seed/repos'
import { SEED_TOOLS } from '@/lib/seed/tools'
import {
  ACTIVE_HLL_PREFIX,
  buildEmptyDailyRow,
  getMemMetricsSnapshot,
  getMemTrackingStartedAt,
  getTopPages,
  METRIC_FIELDS,
  METRICS_DAY_PREFIX,
  METRICS_STARTED_KEY,
  type AdminMetricField,
  type DailyMetricRow,
} from '@/lib/server/admin-metrics'
import { getBudgetConfig, isAiEmergencyDisabled } from '@/lib/server/budget-config'
import { CHAT_LOCK_KEY } from '@/lib/server/chat-lock'
import { nextUtcMonthResetIso, utcDayKey, utcMonthKey } from '@/lib/server/quota'
import { isFailClosedMode, isRedisConfigured, redisPipeline, SIGNUP_COUNT_KEY } from '@/lib/server/redis'
import { listSafeUsersPage, type SafeUserSummary } from '@/lib/server/user-auth'

export type DateRangePreset = 'today' | '7d' | '30d' | '90d' | 'custom'

export type PeriodTotals = {
  signups: number
  chatOk: number
  chatErr: number
  chatTotal: number
  goalOk: number
  goalErr: number
  goalTotal: number
  cvOk: number
  cvBlocked429: number
  cvRefunded: number
  rl429: number
  bot403: number
  err503: number
  conc429: number
  authFail: number
  adminUnauth: number
  pageviews: number
  aiTotal: number
  aiSuccessRate: number | null
  apiErrorRate: number | null
}

function buildDayList(endDate: Date, count: number): string[] {
  const out: string[] = []
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(endDate.getTime() - i * 86_400_000)
    out.push(utcDayKey(d))
  }
  return out
}

export function resolveDateRange(opts?: {
  range?: string | null
  from?: string | null
  to?: string | null
}): { preset: DateRangePreset; days: string[]; prevDays: string[] } {
  const now = new Date()
  const rawRange = opts?.range ?? '30d'
  const preset: DateRangePreset =
    rawRange === 'today' || rawRange === '7d' || rawRange === '30d' || rawRange === '90d' || rawRange === 'custom'
      ? rawRange
      : '30d'

  if (preset === 'custom' && opts?.from && opts?.to) {
    const fromMs = Date.parse(`${opts.from}T00:00:00Z`)
    const toMs = Date.parse(`${opts.to}T00:00:00Z`)
    if (Number.isFinite(fromMs) && Number.isFinite(toMs) && toMs >= fromMs) {
      const span = Math.min(90, Math.max(1, Math.floor((toMs - fromMs) / 86_400_000) + 1))
      const end = new Date(toMs)
      const days = buildDayList(end, span)
      const prevEnd = new Date(fromMs - 86_400_000)
      const prevDays = buildDayList(prevEnd, span)
      return { preset, days, prevDays }
    }
  }

  const count = preset === 'today' ? 1 : preset === '7d' ? 7 : preset === '90d' ? 90 : 30
  const days = buildDayList(now, count)
  const prevEnd = new Date(now.getTime() - count * 86_400_000)
  const prevDays = buildDayList(prevEnd, count)
  return { preset, days, prevDays }
}

function parseHgetall(raw: unknown): Partial<Record<AdminMetricField, number>> {
  const out: Partial<Record<AdminMetricField, number>> = {}
  if (Array.isArray(raw)) {
    for (let i = 0; i < raw.length - 1; i += 2) {
      const k = String(raw[i]) as AdminMetricField
      const v = Number.parseInt(String(raw[i + 1] ?? '0'), 10)
      if (METRIC_FIELDS.includes(k) && Number.isFinite(v)) {
        out[k] = v
      }
    }
  } else if (raw && typeof raw === 'object') {
    for (const f of METRIC_FIELDS) {
      const v = Number.parseInt(String((raw as Record<string, unknown>)[f] ?? '0'), 10)
      if (Number.isFinite(v)) out[f] = v
    }
  }
  return out
}

function summarizeRows(rows: DailyMetricRow[]): PeriodTotals {
  let signups = 0
  let chatOk = 0
  let chatErr = 0
  let goalOk = 0
  let goalErr = 0
  let cvOk = 0
  let cvBlocked429 = 0
  let cvRefunded = 0
  let rl429 = 0
  let bot403 = 0
  let err503 = 0
  let conc429 = 0
  let authFail = 0
  let adminUnauth = 0
  let pageviews = 0

  for (const r of rows) {
    signups += r.signups
    chatOk += r.chat_ok
    chatErr += r.chat_err
    goalOk += r.goal_ok
    goalErr += r.goal_err
    cvOk += r.cv_ok
    cvBlocked429 += r.cv_blocked_429
    cvRefunded += r.cv_refunded
    rl429 += r.rl_429
    bot403 += r.bot_403
    err503 += r.err_503
    conc429 += r.conc_429
    authFail += r.auth_fail
    adminUnauth += r.admin_unauth
    pageviews += r.pageviews
  }

  const chatTotal = chatOk + chatErr
  const goalTotal = goalOk + goalErr
  const aiSuccess = chatOk + goalOk + cvOk
  const aiRejectedOrFailed = chatErr + goalErr + rl429 + bot403 + err503 + conc429
  const aiTotal = aiSuccess + aiRejectedOrFailed
  const aiSuccessRate = aiTotal > 0 ? Math.round((aiSuccess / aiTotal) * 1000) / 10 : null
  const apiErrorRate = aiTotal > 0 ? Math.round(((chatErr + goalErr + err503) / aiTotal) * 1000) / 10 : null

  return {
    signups,
    chatOk,
    chatErr,
    chatTotal,
    goalOk,
    goalErr,
    goalTotal,
    cvOk,
    cvBlocked429,
    cvRefunded,
    rl429,
    bot403,
    err503,
    conc429,
    authFail,
    adminUnauth,
    pageviews,
    aiTotal,
    aiSuccessRate,
    apiErrorRate,
  }
}

function topCategories(items: Array<{ category: string }>): Array<{ category: string; count: number }> {
  const map = new Map<string, number>()
  for (const item of items) {
    const cat = item.category || 'Other'
    map.set(cat, (map.get(cat) ?? 0) + 1)
  }
  return Array.from(map.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
}

export async function buildAdminDashboardPayload(opts?: {
  range?: string | null
  from?: string | null
  to?: string | null
}) {
  const { preset, days, prevDays } = resolveDateRange(opts)
  const now = new Date()
  const today = utcDayKey(now)
  const month = utcMonthKey(now)
  const cfg = getBudgetConfig()
  const redisConfigured = isRedisConfigured()

  let redisHealthy = false
  let redisLatencyMs: number | null = null
  let totalSignups = 0
  let trackingStartedAt: string | null = null
  let chatLocked = false
  let pushSubscribers = 0
  let lastBroadcastAt: string | null = null
  let recoveryUsed = false
  let pendingCvReservations = 0
  let globalDailyUsed = 0
  let globalMonthlyUsed = 0
  let chatDailyUsed = 0
  let chatMonthlyUsed = 0
  let goalDailyUsed = 0
  let goalMonthlyUsed = 0
  let dau = 0
  let wau = 0
  let mau = 0
  let series: DailyMetricRow[] = []
  let prevRows: DailyMetricRow[] = []

  if (!redisConfigured) {
    trackingStartedAt = getMemTrackingStartedAt()
    const snap = getMemMetricsSnapshot(days)
    const prevSnap = getMemMetricsSnapshot(prevDays)
    series = snap.rows.map((r) => ({
      ...r,
      aiChatTotal: r.chat_ok + r.chat_err,
      goalMatchTotal: r.goal_ok + r.goal_err,
      cvUploadsTotal: r.cv_ok,
    }))
    prevRows = prevSnap.rows
    dau = series[series.length - 1]?.dau ?? 0
    wau = snap.wau
    mau = snap.mau
  } else {
    const last7Keys = buildDayList(now, 7).map((d) => `${ACTIVE_HLL_PREFIX}${d}`)
    const last30Keys = buildDayList(now, 30).map((d) => `${ACTIVE_HLL_PREFIX}${d}`)
    const cmds: string[][] = [
      ['PING'],
      ['GET', SIGNUP_COUNT_KEY],
      ['GET', METRICS_STARTED_KEY],
      ['GET', CHAT_LOCK_KEY],
      ['SCARD', 'aihunt:push:subs'],
      ['GET', 'aihunt:push:last-broadcast'],
      ['GET', 'aihunt:user:yahianaim:recovery_used'],
      ['ZCARD', 'aihunt:cv:pending'],
      ['GET', `aihunt:ai:global:d:${today}`],
      ['GET', `aihunt:ai:global:m:${month}`],
      ['GET', `aihunt:ai:ep:chat:d:${today}`],
      ['GET', `aihunt:ai:ep:chat:m:${month}`],
      ['GET', `aihunt:ai:ep:goal:d:${today}`],
      ['GET', `aihunt:ai:ep:goal:m:${month}`],
      ['PFCOUNT', `${ACTIVE_HLL_PREFIX}${today}`],
      ['PFCOUNT', ...last7Keys],
      ['PFCOUNT', ...last30Keys],
    ]
    const hgetStart = cmds.length
    for (const d of prevDays) cmds.push(['HGETALL', `${METRICS_DAY_PREFIX}${d}`])
    for (const d of days) cmds.push(['HGETALL', `${METRICS_DAY_PREFIX}${d}`])
    const dauStart = cmds.length
    for (const d of days) cmds.push(['PFCOUNT', `${ACTIVE_HLL_PREFIX}${d}`])

    const t0 = Date.now()
    const pipe = await redisPipeline(cmds)
    redisLatencyMs = Date.now() - t0

    if (pipe.length > 0) {
      const num = (idx: number) => Math.max(0, Number.parseInt(String(pipe[idx]?.result ?? '0'), 10) || 0)
      redisHealthy = String(pipe[0]?.result ?? '').toUpperCase() === 'PONG'
      totalSignups = num(1)
      trackingStartedAt = typeof pipe[2]?.result === 'string' ? pipe[2].result : null
      chatLocked = pipe[3]?.result === '1'
      pushSubscribers = num(4)
      lastBroadcastAt = typeof pipe[5]?.result === 'string' ? pipe[5].result : null
      recoveryUsed = Boolean(pipe[6]?.result)
      pendingCvReservations = num(7)
      globalDailyUsed = num(8)
      globalMonthlyUsed = num(9)
      chatDailyUsed = num(10)
      chatMonthlyUsed = num(11)
      goalDailyUsed = num(12)
      goalMonthlyUsed = num(13)
      dau = num(14)
      wau = num(15)
      mau = num(16)

      prevRows = prevDays.map((d, i) => {
        const row = buildEmptyDailyRow(d)
        const parsed = parseHgetall(pipe[hgetStart + i]?.result)
        for (const f of METRIC_FIELDS) row[f] = parsed[f] ?? 0
        return row
      })

      series = days.map((d, i) => {
        const row = buildEmptyDailyRow(d)
        const parsed = parseHgetall(pipe[hgetStart + prevDays.length + i]?.result)
        for (const f of METRIC_FIELDS) row[f] = parsed[f] ?? 0
        row.dau = num(dauStart + i)
        row.aiChatTotal = row.chat_ok + row.chat_err
        row.goalMatchTotal = row.goal_ok + row.goal_err
        row.cvUploadsTotal = row.cv_ok
        return row
      })
    } else {
      series = days.map((d) => buildEmptyDailyRow(d))
      prevRows = prevDays.map((d) => buildEmptyDailyRow(d))
    }
  }

  const totals = summarizeRows(series)
  const hasPreviousData = Boolean(
    trackingStartedAt && prevDays.length > 0 && prevDays[prevDays.length - 1]! >= trackingStartedAt
  )
  const previousTotals = hasPreviousData ? summarizeRows(prevRows) : null

  const usersPage: {
    users: SafeUserSummary[]
    total: number
    page: number
    limit: number
    quotaDistribution: { zero: number; partial: number; maxed: number }
  } = await listSafeUsersPage({
    page: 1,
    limit: 10,
    cvMonthlyLimit: cfg.cvMonthlyLimit,
  })

  const content = {
    counts: {
      tools: SEED_TOOLS.length,
      devTools: SEED_DEV_TOOLS.length,
      repos: SEED_REPOS.length,
      courses: SEED_COURSES.length,
      offers: SEED_OFFERS.length,
      total:
        SEED_TOOLS.length +
        SEED_DEV_TOOLS.length +
        SEED_REPOS.length +
        SEED_COURSES.length +
        SEED_OFFERS.length,
    },
    toolCategories: topCategories(SEED_TOOLS),
    devToolCategories: topCategories(SEED_DEV_TOOLS),
    pushSubscribers,
    lastBroadcastAt,
  }

  const vercelToken = process.env.VERCEL_API_TOKEN?.trim() || ''
  const vercelTokenPresent = Boolean(vercelToken)
  const vercelProjectId = process.env.VERCEL_PROJECT_ID?.trim() || 'prj_9qTZMmBcU2JDjMM0udwVHQ7UaLJo'
  const vercelTeamId = process.env.VERCEL_TEAM_ID?.trim() || 'team_OwAXtSrjrocoxww4Z1plwxVj'

  type VercelDeploymentRow = {
    uid: string
    url: string | null
    state: string
    target: string | null
    createdAt: number
    buildDurationSec: number | null
    commitSha: string | null
    commitMessage: string | null
  }

  let recentDeployments: VercelDeploymentRow[] = []
  let currentMonthChargesUsd: number | null = null
  let billingApiConnected = vercelTokenPresent
  let billingNote = vercelTokenPresent
    ? 'Connected to Vercel REST API.'
    : 'Not connected — add a read-only VERCEL_API_TOKEN env var to pull live Vercel deployments and Spend Management.'

  if (vercelTokenPresent) {
    const headers = { Authorization: `Bearer ${vercelToken}` }
    const [depRes, chargesRes] = await Promise.all([
      fetch(
        `https://api.vercel.com/v6/deployments?projectId=${encodeURIComponent(vercelProjectId)}&teamId=${encodeURIComponent(vercelTeamId)}&limit=8`,
        { headers, cache: 'no-store', signal: AbortSignal.timeout(4000) }
      ).catch(() => null),
      fetch(
        `https://api.vercel.com/v1/billing/charges?teamId=${encodeURIComponent(vercelTeamId)}`,
        { headers, cache: 'no-store', signal: AbortSignal.timeout(4000) }
      ).catch(() => null),
    ])

    if (depRes?.ok) {
      const depJson = (await depRes.json().catch(() => null)) as {
        deployments?: Array<{
          uid?: string
          url?: string
          state?: string
          readyState?: string
          target?: string | null
          created?: number
          buildingAt?: number
          ready?: number
          meta?: Record<string, string>
        }>
      } | null
      recentDeployments = (depJson?.deployments ?? []).map((d) => {
        const startMs = typeof d.buildingAt === 'number' ? d.buildingAt : d.created ?? 0
        const endMs = typeof d.ready === 'number' ? d.ready : 0
        const dur = startMs > 0 && endMs > startMs ? Math.round((endMs - startMs) / 1000) : null
        return {
          uid: String(d.uid ?? ''),
          url: d.url ? `https://${d.url}` : null,
          state: String(d.readyState || d.state || 'UNKNOWN'),
          target: d.target ?? null,
          createdAt: Number(d.created ?? 0),
          buildDurationSec: dur,
          commitSha: d.meta?.githubCommitSha ? d.meta.githubCommitSha.slice(0, 7) : null,
          commitMessage: d.meta?.githubCommitMessage ? d.meta.githubCommitMessage.slice(0, 80) : null,
        }
      })
    } else if (depRes) {
      billingApiConnected = false
      billingNote = `Vercel API returned HTTP ${depRes.status} — verify VERCEL_API_TOKEN permissions.`
    }

    if (chargesRes?.ok) {
      const chargesJson = (await chargesRes.json().catch(() => null)) as {
        charges?: Array<{ total?: number; amount?: number }>
        total?: number
      } | null
      if (typeof chargesJson?.total === 'number') {
        currentMonthChargesUsd = Math.round(chargesJson.total * 100) / 100
      } else if (Array.isArray(chargesJson?.charges)) {
        const sum = chargesJson.charges.reduce((s, c) => s + Number(c.total ?? c.amount ?? 0), 0)
        currentMonthChargesUsd = Math.round(sum * 100) / 100
      }
    }
  }

  const topPages = await getTopPages(days, 10)

  return {
    generatedAt: now.toISOString(),
    range: {
      preset,
      from: days[0] ?? today,
      to: days[days.length - 1] ?? today,
      daysCount: days.length,
      trackingStartedAt,
    },
    overview: {
      totalRegisteredUsers: totalSignups,
      indexedAccountsCount: usersPage.total,
      activeUsers: { dau, wau, mau },
      totals,
      previousTotals,
    },
    series,
    aiUsage: {
      limits: cfg,
      globalDailyUsed,
      globalMonthlyUsed,
      chatDailyUsed,
      chatMonthlyUsed,
      goalDailyUsed,
      goalMonthlyUsed,
      emergencyDisabled: isAiEmergencyDisabled(),
      chatLocked,
    },
    cvQuotas: {
      monthlyLimitPerUser: cfg.cvMonthlyLimit,
      ipMonthlyLimit: cfg.cvIpMonthlyLimit,
      nextResetAt: nextUtcMonthResetIso(now),
      pendingReservations: pendingCvReservations,
      quotaDistribution: usersPage.quotaDistribution,
      accountsAtLimit: usersPage.quotaDistribution.maxed,
    },
    usersPreview: usersPage,
    content,
    topPages,
    infrastructure: {
      vercel: {
        plan: 'Vercel Pro ($20/month)',
        meteredBudgetUsd: 1,
        environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
        region: process.env.VERCEL_REGION || 'local',
        commitSha: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || null,
        buildTime: process.env.NEXT_PUBLIC_BUILD_TIME || null,
        billingApiConnected,
        billingNote,
        currentMonthChargesUsd,
        recentDeployments,
      },
      redis: {
        configured: redisConfigured,
        healthy: redisHealthy,
        latencyMs: redisLatencyMs,
        failClosed: isFailClosedMode(),
      },
      aiProvider: {
        configured: Boolean(process.env.NVIDIA_API_KEY?.trim()),
        provider: 'NVIDIA NIM',
        billingApiConnected: false,
        billingNote: 'Not connected — NVIDIA NIM does not expose a live spend API; usage is tracked via request counters.',
      },
    },
    controls: {
      chatLocked,
      recoveryUsed,
      pushSubscribers,
      lastBroadcastAt,
    },
  }
}
