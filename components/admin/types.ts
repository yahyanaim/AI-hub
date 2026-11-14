export type DateRangePreset = 'today' | '7d' | '30d' | '90d' | 'custom'

export type AdminSectionId =
  | 'overview'
  | 'analytics'
  | 'users'
  | 'ai-usage'
  | 'cv-quotas'
  | 'content'
  | 'infrastructure'
  | 'security'
  | 'settings'

export type DailyMetricRow = {
  date: string
  signups: number
  chat_ok: number
  chat_err: number
  goal_ok: number
  goal_err: number
  cv_ok: number
  cv_blocked_429: number
  cv_refunded: number
  rl_429: number
  bot_403: number
  err_503: number
  conc_429: number
  auth_fail: number
  admin_unauth: number
  pageviews: number
  aiChatTotal: number
  goalMatchTotal: number
  cvUploadsTotal: number
  dau: number
}

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

export type SafeUserSummary = {
  username: string
  displayName: string
  createdAt: string
  cvUsedThisMonth: number
  cvMonthlyLimit: number
}

export type UsersPageResponse = {
  users: SafeUserSummary[]
  total: number
  page: number
  limit: number
  quotaDistribution: { zero: number; partial: number; maxed: number }
}

export type AdminDashboardPayload = {
  generatedAt: string
  range: {
    preset: DateRangePreset
    from: string
    to: string
    daysCount: number
    trackingStartedAt: string | null
  }
  overview: {
    totalRegisteredUsers: number
    indexedAccountsCount: number
    activeUsers: { dau: number; wau: number; mau: number }
    totals: PeriodTotals
    previousTotals: PeriodTotals | null
  }
  series: DailyMetricRow[]
  aiUsage: {
    limits: {
      globalDailyLimit: number
      globalMonthlyLimit: number
      globalMaxConcurrent: number
      cvMonthlyLimit: number
      cvIpMonthlyLimit: number
      cvAbusePerMinuteLimit: number
      chatPerMinuteLimit: number
      chatPerHourLimit: number
      chatPerDayLimit: number
      chatPerMonthLimit: number
      chatMaxConcurrent: number
      goalPerMinuteLimit: number
      goalPerDayLimit: number
      goalPerMonthLimit: number
      goalMaxConcurrent: number
      goalCacheTtlSeconds: number
    }
    globalDailyUsed: number
    globalMonthlyUsed: number
    chatDailyUsed: number
    chatMonthlyUsed: number
    goalDailyUsed: number
    goalMonthlyUsed: number
    emergencyDisabled: boolean
    chatLocked: boolean
  }
  cvQuotas: {
    monthlyLimitPerUser: number
    ipMonthlyLimit: number
    nextResetAt: string
    pendingReservations: number
    quotaDistribution: { zero: number; partial: number; maxed: number }
    accountsAtLimit: number
  }
  usersPreview: UsersPageResponse
  content: {
    counts: {
      tools: number
      devTools: number
      repos: number
      courses: number
      offers: number
      total: number
    }
    toolCategories: Array<{ category: string; count: number }>
    devToolCategories: Array<{ category: string; count: number }>
    pushSubscribers: number
    lastBroadcastAt: string | null
  }
  topPages: Array<{ path: string; views: number }>
  infrastructure: {
    vercel: {
      plan: string
      meteredBudgetUsd: number
      environment: string
      region: string
      commitSha: string | null
      buildTime: string | null
      billingApiConnected: boolean
      billingNote: string
      currentMonthChargesUsd: number | null
      recentDeployments: Array<{
        uid: string
        url: string | null
        state: string
        target: string | null
        createdAt: number
        buildDurationSec: number | null
        commitSha: string | null
        commitMessage: string | null
      }>
    }
    redis: {
      configured: boolean
      healthy: boolean
      latencyMs: number | null
      failClosed: boolean
    }
    aiProvider: {
      configured: boolean
      provider: string
      billingApiConnected: boolean
      billingNote: string
    }
  }
  controls: {
    chatLocked: boolean
    recoveryUsed: boolean
    pushSubscribers: number
    lastBroadcastAt: string | null
  }
}
