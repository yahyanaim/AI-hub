'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Database,
  FileText,
  FolderKanban,
  Info,
  KeyRound,
  LayoutDashboard,
  Lock,
  LogOut,
  Megaphone,
  Menu,
  MessageSquare,
  Moon,
  RefreshCw,
  Search,
  Server,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sun,
  Target,
  TrendingUp,
  Unlock,
  Users,
  X,
} from 'lucide-react'
import { cn, formatNumber } from '@/lib/utils'
import { BarTrendChart, HorizontalBreakdown, MiniSparkline } from '@/components/admin/AdminCharts'
import type {
  AdminDashboardPayload,
  AdminSectionId,
  DateRangePreset,
  UsersPageResponse,
} from '@/components/admin/types'

const NAV_ITEMS: Array<{
  id: AdminSectionId
  label: string
  group: 'Overview' | 'Users' | 'Operations' | 'Security'
  subtitle: string
  icon: typeof LayoutDashboard
}> = [
  { id: 'overview', label: 'Overview', group: 'Overview', subtitle: 'Executive summary of registrations, active users, AI usage, and platform health.', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', group: 'Overview', subtitle: 'Daily active actors (DAU/WAU/MAU), signups, and endpoint breakdown.', icon: BarChart3 },
  { id: 'users', label: 'Users', group: 'Users', subtitle: 'Registered accounts, safe metadata, and monthly CV quota consumption.', icon: Users },
  { id: 'cv-quotas', label: 'CV Quotas', group: 'Users', subtitle: 'Monthly CV upload usage, blocks, refunds, and limit distribution.', icon: FileText },
  { id: 'ai-usage', label: 'AI Usage', group: 'Operations', subtitle: 'AI Chat and Goal Match throughput, success rates, and rejections.', icon: Cpu },
  { id: 'content', label: 'Content', group: 'Operations', subtitle: 'Catalog counts across tools, dev tools, courses, offers, and repos.', icon: FolderKanban },
  { id: 'infrastructure', label: 'Infrastructure & Costs', group: 'Operations', subtitle: 'Upstash Redis, AI provider health, and Vercel Pro budget guardrails.', icon: Server },
  { id: 'security', label: 'Security', group: 'Security', subtitle: 'Rate limits (429), anti-bot blocks (403), auth failures, and protections.', icon: ShieldAlert },
  { id: 'settings', label: 'Settings', group: 'Security', subtitle: 'Global AI chat lock, push broadcasts, and one-time account recovery.', icon: Settings },
]

const TOP_GROUPS: Array<{
  label: 'Overview' | 'Users' | 'Operations' | 'Security'
  defaultSection: AdminSectionId
}> = [
  { label: 'Overview', defaultSection: 'overview' },
  { label: 'Users', defaultSection: 'users' },
  { label: 'Operations', defaultSection: 'ai-usage' },
  { label: 'Security', defaultSection: 'security' },
]

function pctDelta(current: number, prev: number | null | undefined): string | null {
  if (prev === null || prev === undefined) return null
  if (prev === 0) return current === 0 ? '0%' : null
  const pct = Math.round(((current - prev) / prev) * 1000) / 10
  return `${pct > 0 ? '+' : ''}${pct}%`
}

function KpiCard({
  label,
  value,
  sub,
  delta,
  icon: Icon,
  sparkline,
  tone = 'default',
}: {
  label: string
  value: string
  sub: string
  delta?: string | null
  icon: typeof Users
  sparkline?: number[]
  tone?: 'default' | 'orange' | 'emerald' | 'rose'
}) {
  const iconTone =
    tone === 'orange'
      ? 'bg-brand-orange/12 text-brand-orange'
      : tone === 'emerald'
      ? 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-400'
      : tone === 'rose'
      ? 'bg-rose-500/12 text-rose-600 dark:text-rose-400'
      : 'bg-secondary text-foreground'

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-colors hover:border-slate-300/90 dark:border-white/10 dark:bg-[#13161E] dark:hover:border-white/20">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 font-heading text-2xl font-bold tracking-tight text-slate-900 tabular-nums dark:text-white sm:text-[26px]">
            {value}
          </p>
        </div>
        <span className={cn('inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl', iconTone)}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-3 flex items-end justify-between gap-2">
        <div className="min-w-0">
          {delta && (
            <span
              className={cn(
                'mr-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums',
                delta.startsWith('+')
                  ? 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-400'
                  : delta.startsWith('-')
                  ? 'bg-rose-500/12 text-rose-600 dark:text-rose-400'
                  : 'bg-secondary text-muted-foreground'
              )}
            >
              {delta}
            </span>
          )}
          <span className="text-[11px] text-slate-500 dark:text-slate-400">{sub}</span>
        </div>
        {sparkline && sparkline.length >= 2 && <MiniSparkline values={sparkline} />}
      </div>
    </div>
  )
}

export function AdminDashboardClient({ adminName }: { adminName: string }) {
  const router = useRouter()
  const [section, setSection] = useState<AdminSectionId>('overview')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showHowItWorks, setShowHowItWorks] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [quotaFilter, setQuotaFilter] = useState<'all' | 'zero' | 'partial' | 'maxed'>('all')

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const applyTheme = (dark: boolean) => {
    setIsDark(dark)
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {}
  }

  const [preset, setPreset] = useState<DateRangePreset>('30d')
  const [customFrom, setCustomFrom] = useState('')
  const [customTo, setCustomTo] = useState('')

  const [data, setData] = useState<AdminDashboardPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Paginated users state
  const [usersQuery, setUsersQuery] = useState('')
  const [usersPage, setUsersPage] = useState(1)
  const [usersData, setUsersData] = useState<UsersPageResponse | null>(null)
  const [usersLoading, setUsersLoading] = useState(false)

  // Admin control actions
  const [confirmAction, setConfirmAction] = useState<'chat-lock' | 'push-broadcast' | null>(null)
  const [actionBusy, setActionBusy] = useState(false)
  const [actionFeedback, setActionFeedback] = useState<{ text: string; ok: boolean } | null>(null)
  const [recoverPassword, setRecoverPassword] = useState('')
  const [recoverBusy, setRecoverBusy] = useState(false)

  const fetchDashboard = useCallback(
    async (opts?: { silent?: boolean }) => {
      if (opts?.silent) setRefreshing(true)
      else setLoading(true)
      setError(null)
      try {
        const params = new URLSearchParams({ range: preset })
        if (preset === 'custom' && customFrom && customTo) {
          params.set('from', customFrom)
          params.set('to', customTo)
        }
        const res = await fetch(`/api/admin/dashboard?${params.toString()}`, {
          cache: 'no-store',
        })
        if (res.status === 401) {
          router.replace('/admin/login')
          return
        }
        if (!res.ok) {
          setError('Could not load dashboard metrics.')
          return
        }
        const json = (await res.json()) as AdminDashboardPayload
        setData(json)
        setUsersData((prev) => prev ?? json.usersPreview)
      } catch {
        setError('Network error while loading dashboard.')
      } finally {
        setLoading(false)
        setRefreshing(false)
      }
    },
    [preset, customFrom, customTo, router]
  )

  useEffect(() => {
    if (preset === 'custom' && (!customFrom || !customTo)) return
    void fetchDashboard()
  }, [fetchDashboard, preset, customFrom, customTo])

  const fetchUsers = useCallback(
    async (q: string, page: number) => {
      setUsersLoading(true)
      try {
        const params = new URLSearchParams({
          q,
          page: String(page),
          limit: '15',
        })
        const res = await fetch(`/api/admin/users?${params.toString()}`, {
          cache: 'no-store',
        })
        if (res.status === 401) {
          router.replace('/admin/login')
          return
        }
        if (res.ok) {
          const json = (await res.json()) as UsersPageResponse
          setUsersData(json)
        }
      } finally {
        setUsersLoading(false)
      }
    },
    [router]
  )

  useEffect(() => {
    if (section !== 'users') return
    const t = setTimeout(() => {
      void fetchUsers(usersQuery, usersPage)
    }, 200)
    return () => clearTimeout(t)
  }, [section, usersQuery, usersPage, fetchUsers])

  const handleLogout = async () => {
    await fetch('/api/auth/admin-logout', { method: 'POST', cache: 'no-store' }).catch(() => {})
    try {
      sessionStorage.removeItem('aihub_admin_ping_v1')
    } catch {}
    router.replace('/admin/login')
    router.refresh()
  }

  const runConfirmedAction = async () => {
    if (!confirmAction || !data || actionBusy) return
    setActionBusy(true)
    setActionFeedback(null)
    try {
      if (confirmAction === 'chat-lock') {
        const nextLocked = !data.controls.chatLocked
        const res = await fetch('/api/admin/chat-lock', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ locked: nextLocked }),
        })
        if (res.status === 401) {
          router.replace('/admin/login')
          return
        }
        if (!res.ok) {
          setActionFeedback({ text: 'Failed to update AI chat lock state.', ok: false })
          return
        }
        setActionFeedback({
          text: nextLocked ? 'AI Chat is now locked for visitors.' : 'AI Chat is now unlocked.',
          ok: true,
        })
        await fetchDashboard({ silent: true })
      } else if (confirmAction === 'push-broadcast') {
        const res = await fetch('/api/admin/push-broadcast', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        })
        const json = (await res.json().catch(() => ({}))) as {
          sent?: number
          total?: number
          error?: string
        }
        if (res.status === 401) {
          router.replace('/admin/login')
          return
        }
        if (!res.ok) {
          setActionFeedback({ text: json.error || 'Push broadcast failed.', ok: false })
          return
        }
        setActionFeedback({
          text: `Sent push notification to ${json.sent ?? 0} of ${json.total ?? 0} subscribers.`,
          ok: true,
        })
        await fetchDashboard({ silent: true })
      }
    } finally {
      setActionBusy(false)
      setConfirmAction(null)
    }
  }

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault()
    if (recoverBusy || recoverPassword.length < 6) return
    setRecoverBusy(true)
    setActionFeedback(null)
    try {
      const res = await fetch('/api/admin/recover-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: recoverPassword }),
      })
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setActionFeedback({ text: json.error || 'Could not set password.', ok: false })
      } else {
        setRecoverPassword('')
        setActionFeedback({ text: 'One-time password set for yahianaim.', ok: true })
      }
      await fetchDashboard({ silent: true })
    } finally {
      setRecoverBusy(false)
    }
  }

  const activeNav = NAV_ITEMS.find((n) => n.id === section) ?? NAV_ITEMS[0]!

  const sparklines = useMemo(() => {
    const s = data?.series ?? []
    return {
      signups: s.map((r) => r.signups),
      dau: s.map((r) => r.dau),
      chat: s.map((r) => r.aiChatTotal),
      cv: s.map((r) => r.cvUploadsTotal),
      goal: s.map((r) => r.goalMatchTotal),
    }
  }, [data])

  const renderMobileNav = () => (
    <nav className="flex-1 space-y-1 p-3">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon
        const active = section === item.id
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setSection(item.id)
              setMobileOpen(false)
            }}
            className={cn(
              'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors',
              active
                ? 'bg-brand-orange text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )

  return (
    <div className="min-h-screen bg-[#F5F6FA] text-slate-900 dark:bg-[#0B0D12] dark:text-slate-100">
      {/* Confirmation dialog */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl">
            <h3 className="font-heading text-base font-semibold">
              {confirmAction === 'chat-lock'
                ? data?.controls.chatLocked
                  ? 'Unlock AI Chat?'
                  : 'Lock AI Chat for all visitors?'
                : 'Send Push Broadcast?'}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {confirmAction === 'chat-lock'
                ? data?.controls.chatLocked
                  ? 'Visitors will be able to send AI Chat and CV requests again.'
                  : 'All visitor AI Chat and CV upload requests will be blocked with HTTP 423 until unlocked.'
                : `This will send a push notification about the newest tools to ${formatNumber(data?.content.pushSubscribers ?? 0)} active subscribers.`}
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmAction(null)}
                disabled={actionBusy}
                className="rounded-lg border border-border px-3.5 py-2 text-xs font-medium text-foreground hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={runConfirmedAction}
                disabled={actionBusy}
                className="btn-primary px-4 py-2 text-xs"
              >
                {actionBusy ? 'Applying…' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Floating Header Bar */}
      <header className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-3 px-4 pt-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-700 shadow-sm lg:hidden dark:border-white/10 dark:bg-[#13161E] dark:text-slate-200"
            aria-label="Open navigation"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden">
              <Image
                src="/logo.png"
                alt="AIhubtools"
                width={40}
                height={40}
                className="h-full w-full object-contain"
                priority
              />
            </span>
            <span className="font-heading text-base font-bold tracking-tight text-slate-900 dark:text-white">
              AIhubtools
            </span>
          </div>
        </div>

        {/* Center Top-Level Pill Navigation */}
        <nav
          aria-label="Admin workspace sections"
          className="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-white p-1 shadow-[0_1px_2px_rgba(16,24,40,0.04)] md:inline-flex dark:border-white/10 dark:bg-[#13161E]"
        >
          {TOP_GROUPS.map((g) => {
            const isActiveGroup = activeNav.group === g.label
            return (
              <button
                key={g.label}
                type="button"
                onClick={() => setSection(g.defaultSection)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-xs font-semibold transition-all',
                  isActiveGroup
                    ? 'bg-brand-orange text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                )}
              >
                {g.label}
              </button>
            )
          })}
        </nav>

        {/* Right Floating Utility Pill */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1 rounded-full border border-slate-200/80 bg-white p-1 shadow-[0_1px_2px_rgba(16,24,40,0.04)] dark:border-white/10 dark:bg-[#13161E]">
            <button
              type="button"
              onClick={() => void fetchDashboard({ silent: true })}
              disabled={refreshing}
              title="Refresh metrics"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50 dark:text-slate-300 dark:hover:bg-white/10"
            >
              <RefreshCw className={cn('h-4 w-4', refreshing && 'animate-spin')} />
            </button>
            <button
              type="button"
              onClick={() => setSection('users')}
              title="Search users"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setSection('security')}
              title="Security alerts"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10"
            >
              <ShieldAlert className="h-4 w-4" />
            </button>
          </div>
          <div className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200/80 bg-white pl-1.5 pr-3.5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] dark:border-white/10 dark:bg-[#13161E]">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange/15 text-xs font-bold text-brand-orange">
              {adminName.slice(0, 1).toUpperCase()}
            </span>
            <span className="hidden text-xs font-semibold text-slate-700 sm:inline dark:text-slate-200">
              {adminName}
            </span>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-10 flex w-72 flex-col border-r border-slate-200 bg-white dark:border-white/10 dark:bg-[#13161E]">
            <div className="flex h-14 items-center justify-between border-b border-slate-200 px-4 dark:border-white/10">
              <span className="font-heading text-sm font-bold">AIhubtools Admin</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {renderMobileNav()}
            <div className="flex items-center justify-between border-t border-slate-200 p-3 dark:border-white/10">
              <button
                type="button"
                onClick={handleLogout}
                className="flex flex-1 items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-500/10 dark:text-rose-400"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
              <button
                type="button"
                onClick={() => applyTheme(!isDark)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 dark:border-white/10 dark:text-slate-300"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Layout: Left Floating Icon Rail + Content Workspace */}
      <div className="mx-auto flex w-full max-w-[1440px] gap-5 px-4 py-5 sm:px-6">
        {/* Left Floating Vertical Icon Rail (Nexora-style) */}
        <aside
          aria-label="Admin section rail"
          className="sticky top-5 hidden h-[calc(100vh-7rem)] w-[62px] shrink-0 flex-col items-center justify-between rounded-[28px] border border-slate-200/80 bg-white py-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)] lg:flex dark:border-white/10 dark:bg-[#13161E]"
        >
          {/* Theme Toggle Pill */}
          <div className="flex flex-col items-center gap-1 rounded-full bg-slate-100 p-1 dark:bg-white/5">
            <button
              type="button"
              onClick={() => applyTheme(false)}
              title="Light mode"
              className={cn(
                'inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors',
                !isDark
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <Sun className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => applyTheme(true)}
              title="Dark mode"
              className={cn(
                'inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors',
                isDark
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-700'
              )}
            >
              <Moon className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Section Icons */}
          <nav className="flex flex-col items-center gap-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const active = section === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSection(item.id)}
                  title={item.label}
                  aria-label={item.label}
                  className={cn(
                    'group relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-all',
                    active
                      ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/25'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white'
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" />
                  <span className="pointer-events-none absolute left-14 z-40 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 dark:bg-slate-800">
                    {item.label}
                  </span>
                </button>
              )
            })}
          </nav>

          {/* Logout Icon */}
          <button
            type="button"
            onClick={handleLogout}
            title="Log out"
            aria-label="Log out"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
          >
            <LogOut className="h-[18px] w-[18px]" />
          </button>
        </aside>

        {/* Main Content Workspace */}
        <main className="min-w-0 flex-1 space-y-5">
          {/* Identity & Environment Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-2.5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] dark:border-white/10 dark:bg-[#13161E]">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <ShieldCheck className="h-4 w-4 text-slate-400" />
              <span className="font-semibold text-slate-900 dark:text-white">{adminName}</span>
              <span className="rounded-full bg-brand-orange/12 px-2.5 py-0.5 text-[11px] font-semibold text-brand-orange">
                Platform admin
              </span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span className="text-slate-500 dark:text-slate-400">Environment</span>
              <span className="rounded-full bg-emerald-500/12 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                Production (Upstash Redis)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center rounded-full border border-slate-200/80 bg-slate-50 p-0.5 text-[11px] dark:border-white/10 dark:bg-white/5">
                {(['today', '7d', '30d', '90d', 'custom'] as DateRangePreset[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPreset(p)}
                    className={cn(
                      'rounded-full px-2.5 py-1 font-medium transition-colors',
                      preset === p
                        ? 'bg-brand-orange text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    )}
                  >
                    {p === 'today' ? 'Today' : p === 'custom' ? 'Custom' : p.toUpperCase()}
                  </button>
                ))}
              </div>
              {preset === 'custom' && (
                <div className="flex items-center gap-1.5 text-xs">
                  <input
                    type="date"
                    value={customFrom}
                    onChange={(e) => setCustomFrom(e.target.value)}
                    className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs dark:border-white/10 dark:bg-[#0B0D12]"
                  />
                  <span className="text-slate-400">–</span>
                  <input
                    type="date"
                    value={customTo}
                    onChange={(e) => setCustomTo(e.target.value)}
                    className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs dark:border-white/10 dark:bg-[#0B0D12]"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Page Header Card */}
          <div className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-6 dark:border-white/10 dark:bg-[#13161E]">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>{activeNav.group}</span>
                <span>›</span>
                <span className="font-medium text-slate-600 dark:text-slate-300">{activeNav.label}</span>
              </div>
              <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {activeNav.label}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">{activeNav.subtitle}</p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowHowItWorks((v) => !v)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-medium text-brand-orange transition-colors hover:bg-brand-orange/15"
                >
                  <Info className="h-3.5 w-3.5" />
                  How metrics work
                  <ChevronDown className={cn('h-3 w-3 transition-transform', showHowItWorks && 'rotate-180')} />
                </button>
                {showHowItWorks && data && (
                  <p className="mt-2 max-w-2xl rounded-xl border border-slate-200/80 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                    Range: <strong>{data.range.from}</strong> to <strong>{data.range.to}</strong> ({data.range.daysCount}d).{' '}
                    {data.range.trackingStartedAt
                      ? `Time-series tracking started on ${data.range.trackingStartedAt}; prior days are zero and never fabricated.`
                      : 'Time-series tracking starts on first recorded event; lifetime totals reflect existing Redis data.'}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => void fetchDashboard({ silent: true })}
              disabled={refreshing}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs transition-colors hover:bg-slate-50 disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              <RefreshCw className={cn('h-3.5 w-3.5', refreshing && 'animate-spin')} />
              {refreshing ? 'Refreshing…' : 'Refresh metrics'}
            </button>
          </div>

          {actionFeedback && (
            <div
              className={cn(
                'flex items-center justify-between rounded-2xl border px-4 py-3 text-xs font-medium',
                actionFeedback.ok
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                  : 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300'
              )}
            >
              <span>{actionFeedback.text}</span>
              <button type="button" onClick={() => setActionFeedback(null)}>
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-600 dark:text-rose-300">
              {error}
            </div>
          )}

          {loading && !data ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-28 animate-pulse rounded-2xl border border-slate-200/80 bg-white dark:border-white/10 dark:bg-[#13161E]" />
              ))}
            </div>
          ) : data ? (
              <>
                {/* 1. OVERVIEW */}
                {section === 'overview' && (
                  <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      <KpiCard
                        label="Total Registered Users"
                        value={formatNumber(data.overview.totalRegisteredUsers)}
                        sub="Lifetime Redis signup counter"
                        icon={Users}
                        tone="orange"
                      />
                      <KpiCard
                        label="New Registrations"
                        value={formatNumber(data.overview.totals.signups)}
                        sub={`In selected ${data.range.daysCount}d window`}
                        delta={pctDelta(data.overview.totals.signups, data.overview.previousTotals?.signups)}
                        icon={TrendingUp}
                        sparkline={sparklines.signups}
                      />
                      <KpiCard
                        label="Active Users (DAU / WAU / MAU)"
                        value={`${formatNumber(data.overview.activeUsers.dau)} / ${formatNumber(data.overview.activeUsers.wau)} / ${formatNumber(data.overview.activeUsers.mau)}`}
                        sub="Privacy-safe HyperLogLog uniques"
                        icon={Activity}
                        sparkline={sparklines.dau}
                        tone="emerald"
                      />
                      <KpiCard
                        label="Total AI Chat Requests"
                        value={formatNumber(data.overview.totals.chatTotal)}
                        sub={`${formatNumber(data.aiUsage.chatDailyUsed)} today (live)`}
                        delta={pctDelta(data.overview.totals.chatTotal, data.overview.previousTotals?.chatTotal)}
                        icon={MessageSquare}
                        sparkline={sparklines.chat}
                      />
                      <KpiCard
                        label="Total CV Uploads"
                        value={formatNumber(data.overview.totals.cvOk)}
                        sub={`${formatNumber(data.overview.totals.cvBlocked429)} blocked · ${formatNumber(data.overview.totals.cvRefunded)} refunded`}
                        delta={pctDelta(data.overview.totals.cvOk, data.overview.previousTotals?.cvOk)}
                        icon={FileText}
                        sparkline={sparklines.cv}
                      />
                      <KpiCard
                        label="Total Goal Match Requests"
                        value={formatNumber(data.overview.totals.goalTotal)}
                        sub={`${formatNumber(data.aiUsage.goalDailyUsed)} today (live)`}
                        delta={pctDelta(data.overview.totals.goalTotal, data.overview.previousTotals?.goalTotal)}
                        icon={Target}
                        sparkline={sparklines.goal}
                      />
                      <KpiCard
                        label="AI Request Success Rate"
                        value={
                          data.overview.totals.aiSuccessRate !== null
                            ? `${data.overview.totals.aiSuccessRate}%`
                            : '—'
                        }
                        sub={`${formatNumber(data.overview.totals.aiTotal)} total evaluated`}
                        icon={CheckCircle2}
                        tone="emerald"
                      />
                      <KpiCard
                        label="API Error Rate"
                        value={
                          data.overview.totals.apiErrorRate !== null
                            ? `${data.overview.totals.apiErrorRate}%`
                            : '—'
                        }
                        sub={`${formatNumber(data.overview.totals.err503)} 503 · ${formatNumber(data.overview.totals.chatErr + data.overview.totals.goalErr)} 5xx`}
                        icon={AlertTriangle}
                        tone="rose"
                      />
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                      <BarTrendChart
                        title="User Registrations Over Time"
                        subtitle="Daily new account signups"
                        data={data.series}
                        series={[
                          { key: 'signups', label: 'Signups', colorClass: 'bg-brand-orange', dotClass: 'bg-brand-orange' },
                        ]}
                      />
                      <BarTrendChart
                        title="AI Usage Over Time"
                        subtitle="AI Chat & Goal Match executions"
                        data={data.series}
                        series={[
                          { key: 'aiChatTotal', label: 'AI Chat', colorClass: 'bg-brand-orange', dotClass: 'bg-brand-orange' },
                          { key: 'goalMatchTotal', label: 'Goal Match', colorClass: 'bg-emerald-500', dotClass: 'bg-emerald-500' },
                        ]}
                      />
                      <BarTrendChart
                        title="CV Uploads Over Time"
                        subtitle="Successful vs blocked 4th-upload attempts"
                        data={data.series}
                        series={[
                          { key: 'cv_ok', label: 'Processed', colorClass: 'bg-emerald-500', dotClass: 'bg-emerald-500' },
                          { key: 'cv_blocked_429', label: 'Blocked (429)', colorClass: 'bg-amber-500', dotClass: 'bg-amber-500' },
                        ]}
                      />
                      <BarTrendChart
                        title="Successful vs Rejected AI Requests"
                        subtitle="Rate-limits (429), anti-bot (403), infra (503)"
                        data={data.series}
                        series={[
                          { key: 'chat_ok', label: 'Chat OK', colorClass: 'bg-emerald-500', dotClass: 'bg-emerald-500' },
                          { key: 'rl_429', label: '429 Limit', colorClass: 'bg-amber-500', dotClass: 'bg-amber-500' },
                          { key: 'bot_403', label: '403 Bot', colorClass: 'bg-rose-500', dotClass: 'bg-rose-500' },
                          { key: 'err_503', label: '503 Infra', colorClass: 'bg-slate-500', dotClass: 'bg-slate-500' },
                        ]}
                      />
                    </div>
                  </div>
                )}

                {/* 2. ANALYTICS */}
                {section === 'analytics' && (
                  <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <KpiCard label="DAU (Today)" value={formatNumber(data.overview.activeUsers.dau)} sub="Unique active actors today" icon={Activity} tone="orange" />
                      <KpiCard label="WAU (7 Days)" value={formatNumber(data.overview.activeUsers.wau)} sub="Unique active actors (7d HLL)" icon={Activity} tone="emerald" />
                      <KpiCard label="MAU (30 Days)" value={formatNumber(data.overview.activeUsers.mau)} sub="Unique active actors (30d HLL)" icon={Activity} />
                    </div>
                    <BarTrendChart
                      title="Daily Active Actors & Signups"
                      subtitle="HyperLogLog daily uniques vs new signups"
                      data={data.series}
                      series={[
                        { key: 'dau', label: 'DAU', colorClass: 'bg-emerald-500', dotClass: 'bg-emerald-500' },
                        { key: 'signups', label: 'Signups', colorClass: 'bg-brand-orange', dotClass: 'bg-brand-orange' },
                      ]}
                    />
                    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] dark:border-white/10 dark:bg-[#13161E]">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-4 dark:border-white/10">
                        <div>
                          <h3 className="font-heading text-base font-semibold text-slate-900 dark:text-white">
                            Daily Activity Breakdown
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            UTC daily counters for active actors, signups, AI endpoints, and rejections.
                          </p>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:border-white/10">
                            <tr>
                              <th className="px-6 py-3.5">Date (UTC)</th>
                              <th className="px-4 py-3.5">DAU</th>
                              <th className="px-4 py-3.5">Signups</th>
                              <th className="px-4 py-3.5">AI Chat</th>
                              <th className="px-4 py-3.5">Goal Match</th>
                              <th className="px-4 py-3.5">CV Uploads</th>
                              <th className="px-6 py-3.5">429 / 403 / 503</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {[...data.series].reverse().slice(0, 30).map((row) => (
                              <tr key={row.date} className="transition-colors hover:bg-slate-50/80 dark:hover:bg-white/[0.03]">
                                <td className="px-6 py-3.5 font-mono text-xs font-semibold text-slate-900 tabular-nums dark:text-white">
                                  {row.date}
                                </td>
                                <td className="px-4 py-3.5 tabular-nums text-slate-700 dark:text-slate-300">{formatNumber(row.dau)}</td>
                                <td className="px-4 py-3.5 tabular-nums text-slate-700 dark:text-slate-300">{formatNumber(row.signups)}</td>
                                <td className="px-4 py-3.5 tabular-nums text-slate-700 dark:text-slate-300">{formatNumber(row.aiChatTotal)}</td>
                                <td className="px-4 py-3.5 tabular-nums text-slate-700 dark:text-slate-300">{formatNumber(row.goalMatchTotal)}</td>
                                <td className="px-4 py-3.5 tabular-nums text-slate-700 dark:text-slate-300">{formatNumber(row.cv_ok)}</td>
                                <td className="px-6 py-3.5 tabular-nums">
                                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-white/10 dark:text-slate-300">
                                    {row.rl_429} / {row.bot_403} / {row.err_503}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. USERS */}
                {section === 'users' && (
                  <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <KpiCard label="Total Signups Counter" value={formatNumber(data.overview.totalRegisteredUsers)} sub="Redis signup counter" icon={Users} tone="orange" />
                      <KpiCard label="Indexed Accounts" value={formatNumber(usersData?.total ?? data.usersPreview.total)} sub="Accounts in Redis index" icon={Database} />
                      <KpiCard label="Accounts at 3/3 CV Limit" value={formatNumber(data.cvQuotas.accountsAtLimit)} sub="Current UTC month" icon={FileText} tone="rose" />
                    </div>

                    <HorizontalBreakdown
                      title="Monthly CV Quota Consumption Distribution"
                      subtitle="Safe aggregate across indexed accounts"
                      items={[
                        { label: '0 uploads used', value: data.cvQuotas.quotaDistribution.zero, colorClass: 'bg-slate-400' },
                        { label: '1–2 uploads used', value: data.cvQuotas.quotaDistribution.partial, colorClass: 'bg-brand-orange' },
                        { label: '3/3 limit reached', value: data.cvQuotas.quotaDistribution.maxed, colorClass: 'bg-rose-500' },
                      ]}
                    />

                    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] dark:border-white/10 dark:bg-[#13161E]">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-4 dark:border-white/10">
                        <div>
                          <h3 className="font-heading text-base font-semibold text-slate-900 dark:text-white">
                            Registered Accounts
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Safe metadata only — hashes, salts, tokens, and IPs are never exposed.
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="relative w-full sm:w-64">
                            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                            <input
                              type="search"
                              value={usersQuery}
                              onChange={(e) => {
                                setUsersQuery(e.target.value)
                                setUsersPage(1)
                              }}
                              placeholder="Search username or display name…"
                              className="w-full rounded-full border border-slate-200 bg-slate-50/70 py-2 pl-9 pr-3.5 text-xs outline-none transition-colors focus:border-brand-orange focus:bg-white dark:border-white/10 dark:bg-white/5 dark:focus:bg-[#0B0D12]"
                            />
                          </div>
                          <select
                            value={quotaFilter}
                            onChange={(e) => setQuotaFilter(e.target.value as typeof quotaFilter)}
                            aria-label="Filter by CV quota status"
                            className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 outline-none focus:border-brand-orange dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                          >
                            <option value="all">All quotas</option>
                            <option value="zero">0 used</option>
                            <option value="partial">1–2 used</option>
                            <option value="maxed">3/3 maxed</option>
                          </select>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:border-white/10">
                            <tr>
                              <th className="px-6 py-3.5">Username</th>
                              <th className="px-4 py-3.5">Display Name</th>
                              <th className="px-4 py-3.5">Registered</th>
                              <th className="px-4 py-3.5">CV Quota (UTC Month)</th>
                              <th className="px-6 py-3.5 text-right">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {(() => {
                              const filteredUsers = (usersData?.users ?? []).filter((u) => {
                                if (quotaFilter === 'zero') return u.cvUsedThisMonth === 0
                                if (quotaFilter === 'partial') return u.cvUsedThisMonth > 0 && u.cvUsedThisMonth < u.cvMonthlyLimit
                                if (quotaFilter === 'maxed') return u.cvUsedThisMonth >= u.cvMonthlyLimit
                                return true
                              })
                              if (usersLoading) {
                                return (
                                  <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                                      Loading accounts…
                                    </td>
                                  </tr>
                                )
                              }
                              if (filteredUsers.length === 0) {
                                return (
                                  <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                                      No matching accounts found.
                                    </td>
                                  </tr>
                                )
                              }
                              return filteredUsers.map((u) => {
                                const maxed = u.cvUsedThisMonth >= u.cvMonthlyLimit
                                const partial = u.cvUsedThisMonth > 0 && !maxed
                                return (
                                  <tr key={u.username} className="transition-colors hover:bg-slate-50/80 dark:hover:bg-white/[0.03]">
                                    <td className="px-6 py-3.5 font-mono text-xs font-semibold text-slate-900 dark:text-white">
                                      @{u.username}
                                    </td>
                                    <td className="px-4 py-3.5 font-medium text-slate-700 dark:text-slate-200">{u.displayName}</td>
                                    <td className="px-4 py-3.5 text-slate-500 tabular-nums dark:text-slate-400">
                                      {u.createdAt ? u.createdAt.slice(0, 10) : '—'}
                                    </td>
                                    <td className="px-4 py-3.5 font-medium tabular-nums text-slate-700 dark:text-slate-200">
                                      {u.cvUsedThisMonth} / {u.cvMonthlyLimit} uploads
                                    </td>
                                    <td className="px-6 py-3.5 text-right">
                                      <span
                                        className={cn(
                                          'inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                                          maxed
                                            ? 'bg-rose-500/12 text-rose-600 dark:text-rose-400'
                                            : partial
                                            ? 'bg-brand-orange/12 text-brand-orange'
                                            : 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-400'
                                        )}
                                      >
                                        {maxed ? 'Limit reached' : partial ? 'Active' : 'Available'}
                                      </span>
                                    </td>
                                  </tr>
                                )
                              })
                            })()}
                          </tbody>
                        </table>
                      </div>

                      {usersData && usersData.total > usersData.limit && (
                        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-3.5 text-xs text-slate-500 dark:border-white/10">
                          <span>
                            Page {usersData.page} of {Math.max(1, Math.ceil(usersData.total / usersData.limit))} ({formatNumber(usersData.total)} total)
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              disabled={usersPage <= 1}
                              onClick={() => setUsersPage((p) => Math.max(1, p - 1))}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/5"
                            >
                              <ChevronLeft className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={usersPage >= Math.ceil(usersData.total / usersData.limit)}
                              onClick={() => setUsersPage((p) => p + 1)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/5"
                            >
                              <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 4. AI USAGE */}
                {section === 'ai-usage' && (
                  <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      <KpiCard label="Global Daily Requests" value={`${formatNumber(data.aiUsage.globalDailyUsed)} / ${formatNumber(data.aiUsage.limits.globalDailyLimit)}`} sub="Current UTC day" icon={Cpu} tone="orange" />
                      <KpiCard label="Global Monthly Requests" value={`${formatNumber(data.aiUsage.globalMonthlyUsed)} / ${formatNumber(data.aiUsage.limits.globalMonthlyLimit)}`} sub="Current UTC month" icon={Cpu} />
                      <KpiCard label="HTTP 429 Rate Limits" value={formatNumber(data.overview.totals.rl429)} sub={`${formatNumber(data.overview.totals.conc429)} concurrency rejections`} icon={AlertTriangle} tone="rose" />
                      <KpiCard label="HTTP 403 / 503 Rejections" value={`${formatNumber(data.overview.totals.bot403)} / ${formatNumber(data.overview.totals.err503)}`} sub="Anti-bot / infra failures" icon={Bot} />
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                      <HorizontalBreakdown
                        title="Live Global & Endpoint Utilization"
                        subtitle="Configured budget caps vs live UTC counters"
                        items={[
                          { label: 'Global Daily AI Budget', value: data.aiUsage.globalDailyUsed, max: data.aiUsage.limits.globalDailyLimit },
                          { label: 'Global Monthly AI Budget', value: data.aiUsage.globalMonthlyUsed, max: data.aiUsage.limits.globalMonthlyLimit },
                          { label: 'AI Chat Today', value: data.aiUsage.chatDailyUsed, max: data.aiUsage.limits.globalDailyLimit, colorClass: 'bg-emerald-500' },
                          { label: 'Goal Match Today', value: data.aiUsage.goalDailyUsed, max: data.aiUsage.limits.globalDailyLimit, colorClass: 'bg-sky-500' },
                        ]}
                      />
                      <BarTrendChart
                        title="AI Executions vs Rejections"
                        subtitle="Successful executions separated from blocked traffic"
                        data={data.series}
                        series={[
                          { key: 'chat_ok', label: 'Chat OK', colorClass: 'bg-emerald-500', dotClass: 'bg-emerald-500' },
                          { key: 'goal_ok', label: 'Goal OK', colorClass: 'bg-brand-orange', dotClass: 'bg-brand-orange' },
                          { key: 'rl_429', label: '429', colorClass: 'bg-amber-500', dotClass: 'bg-amber-500' },
                          { key: 'bot_403', label: '403', colorClass: 'bg-rose-500', dotClass: 'bg-rose-500' },
                        ]}
                      />
                    </div>
                  </div>
                )}

                {/* 5. CV QUOTAS */}
                {section === 'cv-quotas' && (
                  <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      <KpiCard label="Successful CV Uploads" value={formatNumber(data.overview.totals.cvOk)} sub={`Limit: ${data.cvQuotas.monthlyLimitPerUser}/account/month`} icon={FileText} tone="emerald" />
                      <KpiCard label="Accounts at Monthly Limit" value={formatNumber(data.cvQuotas.accountsAtLimit)} sub="Reached 3/3 this UTC month" icon={Users} tone="rose" />
                      <KpiCard label="Blocked 4th-Upload Attempts" value={formatNumber(data.overview.totals.cvBlocked429)} sub={`${formatNumber(data.overview.totals.cvRefunded)} invalid uploads refunded`} icon={AlertTriangle} tone="orange" />
                      <KpiCard label="Next UTC Monthly Reset" value={data.cvQuotas.nextResetAt.slice(0, 10)} sub={`${data.cvQuotas.pendingReservations} pending reservations`} icon={Calendar} />
                    </div>
                    <div className="grid gap-4 lg:grid-cols-2">
                      <BarTrendChart
                        title="CV Uploads, Blocks & Refunds"
                        subtitle="No CV files or extracted resume contents are ever stored"
                        data={data.series}
                        series={[
                          { key: 'cv_ok', label: 'Processed', colorClass: 'bg-emerald-500', dotClass: 'bg-emerald-500' },
                          { key: 'cv_blocked_429', label: 'Blocked (429)', colorClass: 'bg-rose-500', dotClass: 'bg-rose-500' },
                          { key: 'cv_refunded', label: 'Refunded', colorClass: 'bg-amber-500', dotClass: 'bg-amber-500' },
                        ]}
                      />
                      <HorizontalBreakdown
                        title="Account Quota Distribution"
                        subtitle={`Enforced per authenticated account (${data.cvQuotas.monthlyLimitPerUser}/month) & IP cap (${data.cvQuotas.ipMonthlyLimit}/month)`}
                        items={[
                          { label: '0 / 3 used', value: data.cvQuotas.quotaDistribution.zero, colorClass: 'bg-slate-400' },
                          { label: '1–2 / 3 used', value: data.cvQuotas.quotaDistribution.partial, colorClass: 'bg-brand-orange' },
                          { label: '3 / 3 maxed out', value: data.cvQuotas.quotaDistribution.maxed, colorClass: 'bg-rose-500' },
                        ]}
                      />
                    </div>
                  </div>
                )}

                {/* 6. CONTENT */}
                {section === 'content' && (
                  <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                      <KpiCard label="AI Tools" value={formatNumber(data.content.counts.tools)} sub="Curated catalog" icon={FolderKanban} tone="orange" />
                      <KpiCard label="Dev Tools" value={formatNumber(data.content.counts.devTools)} sub="Developer ecosystem" icon={FolderKanban} />
                      <KpiCard label="GitHub Repos" value={formatNumber(data.content.counts.repos)} sub="Open-source index" icon={FolderKanban} />
                      <KpiCard label="Courses" value={formatNumber(data.content.counts.courses)} sub="Learning tracks" icon={FolderKanban} />
                      <KpiCard label="Offers" value={formatNumber(data.content.counts.offers)} sub={`${formatNumber(data.content.pushSubscribers)} push subscribers`} icon={Megaphone} tone="emerald" />
                    </div>
                    <div className="grid gap-4 lg:grid-cols-2">
                      <HorizontalBreakdown title="Top AI Tool Categories" items={data.content.toolCategories.map((c) => ({ label: c.category, value: c.count }))} />
                      <HorizontalBreakdown title="Top Dev Tool Categories" items={data.content.devToolCategories.map((c) => ({ label: c.category, value: c.count, colorClass: 'bg-emerald-500' }))} />
                    </div>
                  </div>
                )}

                {/* 7. INFRASTRUCTURE & COSTS */}
                {section === 'infrastructure' && (
                  <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      <KpiCard label="Vercel Plan & Budget" value={data.infrastructure.vercel.plan} sub={`Metered budget: $${data.infrastructure.vercel.meteredBudgetUsd}/mo`} icon={Server} tone="orange" />
                      <KpiCard
                        label="Redis Health"
                        value={data.infrastructure.redis.healthy ? 'Healthy' : data.infrastructure.redis.configured ? 'Degraded' : 'Memory Fallback'}
                        sub={data.infrastructure.redis.latencyMs !== null ? `PING ${data.infrastructure.redis.latencyMs}ms · Fail-closed: ${data.infrastructure.redis.failClosed ? 'ON' : 'OFF'}` : 'Upstash REST'}
                        icon={Database}
                        tone={data.infrastructure.redis.healthy ? 'emerald' : 'rose'}
                      />
                      <KpiCard
                        label="Deployment"
                        value={data.infrastructure.vercel.environment.toUpperCase()}
                        sub={`${data.infrastructure.vercel.region}${data.infrastructure.vercel.commitSha ? ` · ${data.infrastructure.vercel.commitSha}` : ''}`}
                        icon={Activity}
                      />
                      <KpiCard
                        label="AI Provider"
                        value={data.infrastructure.aiProvider.provider}
                        sub={data.infrastructure.aiProvider.configured ? 'API key configured' : 'API key missing'}
                        icon={Cpu}
                        tone={data.infrastructure.aiProvider.configured ? 'emerald' : 'rose'}
                      />
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                      <div className="rounded-xl border border-border bg-card p-5">
                        <h3 className="font-heading text-sm font-semibold">Vercel Spend & Usage API</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Status:{' '}
                          <strong className="text-foreground">
                            {data.infrastructure.vercel.billingApiConnected ? 'Connected' : 'Not connected'}
                          </strong>
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          {data.infrastructure.vercel.billingNote}
                        </p>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-5">
                        <h3 className="font-heading text-sm font-semibold">AI Provider Spend Visibility</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Status:{' '}
                          <strong className="text-foreground">
                            {data.infrastructure.aiProvider.billingApiConnected ? 'Connected' : 'Not connected'}
                          </strong>
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          {data.infrastructure.aiProvider.billingNote}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 8. SECURITY */}
                {section === 'security' && (
                  <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                      <KpiCard label="Rate-Limited (429)" value={formatNumber(data.overview.totals.rl429)} sub="Window + abuse limits" icon={AlertTriangle} tone="orange" />
                      <KpiCard label="Anti-Bot Rejections (403)" value={formatNumber(data.overview.totals.bot403)} sub="Turnstile + origin + UA" icon={Bot} tone="rose" />
                      <KpiCard label="Auth Failures (401)" value={formatNumber(data.overview.totals.authFail)} sub="Failed user/admin logins" icon={Lock} />
                      <KpiCard label="Unauthorized Admin (401)" value={formatNumber(data.overview.totals.adminUnauth)} sub="Blocked /api/admin/* calls" icon={ShieldAlert} tone="rose" />
                      <KpiCard label="Infra / Redis (503)" value={formatNumber(data.overview.totals.err503)} sub="Fail-closed / budget blocks" icon={Database} />
                    </div>
                    <BarTrendChart
                      title="Security & Protection Events Over Time"
                      subtitle="Privacy-preserving aggregates only — zero raw IPs or credentials stored"
                      data={data.series}
                      series={[
                        { key: 'rl_429', label: '429 Rate Limit', colorClass: 'bg-amber-500', dotClass: 'bg-amber-500' },
                        { key: 'bot_403', label: '403 Anti-Bot', colorClass: 'bg-rose-500', dotClass: 'bg-rose-500' },
                        { key: 'auth_fail', label: '401 Auth Fail', colorClass: 'bg-brand-orange', dotClass: 'bg-brand-orange' },
                        { key: 'admin_unauth', label: '401 Admin Probe', colorClass: 'bg-slate-500', dotClass: 'bg-slate-500' },
                      ]}
                    />
                  </div>
                )}

                {/* 9. SETTINGS */}
                {section === 'settings' && (
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                      <div>
                        <h3 className="font-heading text-sm font-semibold">AI Chat Access Control</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Current status:{' '}
                          <strong className={data.controls.chatLocked ? 'text-amber-500' : 'text-emerald-500'}>
                            {data.controls.chatLocked ? 'Locked for visitors' : 'Open for visitors'}
                          </strong>
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setConfirmAction('chat-lock')}
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-xs font-semibold hover:bg-secondary"
                      >
                        {data.controls.chatLocked ? <Unlock className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                        {data.controls.chatLocked ? 'Unlock AI Chat' : 'Lock AI Chat'}
                      </button>
                    </div>

                    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                      <div>
                        <h3 className="font-heading text-sm font-semibold">Push Notification Broadcast</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatNumber(data.controls.pushSubscribers)} subscribers · Last sent:{' '}
                          {data.controls.lastBroadcastAt ? data.controls.lastBroadcastAt.slice(0, 16).replace('T', ' ') + ' UTC' : 'Never'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setConfirmAction('push-broadcast')}
                        className="btn-primary inline-flex items-center gap-2 px-4 py-2 text-xs"
                      >
                        <Megaphone className="h-3.5 w-3.5" />
                        Push New Tools Notification
                      </button>
                    </div>

                    {!data.controls.recoveryUsed && (
                      <form onSubmit={handleRecovery} className="rounded-xl border border-border bg-card p-5 space-y-3">
                        <div className="flex items-center gap-2">
                          <KeyRound className="h-4 w-4 text-brand-orange" />
                          <h3 className="font-heading text-sm font-semibold">One-Time `yahianaim` Account Recovery</h3>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Sets a password for the existing `yahianaim` Redis account once while preserving display name and CV quotas.
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="password"
                            minLength={6}
                            maxLength={128}
                            value={recoverPassword}
                            onChange={(e) => setRecoverPassword(e.target.value)}
                            placeholder="New password (min 6 chars)"
                            className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-brand-orange"
                            required
                          />
                          <button
                            type="submit"
                            disabled={recoverBusy || recoverPassword.length < 6}
                            className="btn-primary px-4 py-2 text-xs"
                          >
                            {recoverBusy ? 'Saving…' : 'Set Password'}
                          </button>
                        </div>
                      </form>
                    )}

                    <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                      <h3 className="font-heading text-sm font-semibold">Administrator Session</h3>
                      <p className="text-xs text-muted-foreground">
                        Signed in as <strong>{adminName}</strong> via HttpOnly `aihunt_admin` JWT.
                      </p>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-500/20 dark:text-rose-400"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        Log out of Admin Dashboard
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </main>
        </div>
    </div>
  )
}
