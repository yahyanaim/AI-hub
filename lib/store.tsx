'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import { usePathname } from 'next/navigation'
import type {
  Tool,
  DevTool,
  Prompt,
  Repo,
  Course,
  Offer,
  OfferCategory,
  User,
  Comment,
  ItemType,
  Pricing,
} from '@/types'
import { SEED_USERS } from '@/lib/seed/users'
import { uuid, slugify } from '@/lib/utils'

const STORAGE_KEY = 'ai-hunt-state-v4' // v4+: stores only user deltas, not seed data

// Local-only abuse guards (all data is per-browser localStorage).
const MAX_COMMENT_LENGTH = 2000
const MAX_COMMENTS_STORED = 500
const MAX_USERS_STORED = 100
const MAX_NOTIFICATIONS_STORED = 30
/** Catalogue ("published") notifications expire after 24h — the bell only
 * carries items the site shipped in the last day. */
const NOTIFICATION_TTL_MS = 24 * 3600 * 1000
const MAX_SEEN_IDS_PER_SLICE = 2500
const MAX_CATALOG_NOTIFICATIONS_PER_LOAD = 10
const MIN_USERNAME_LENGTH = 2
const MAX_USERNAME_LENGTH = 24

/** Catalogue slices that generate bell notifications when the site ships new content. */
const SEEN_CATALOG_SLICES = ['tools', 'devTools', 'repos', 'offers'] as const
type SeenCatalogSlice = (typeof SEEN_CATALOG_SLICES)[number]

/**
 * When a slice is first registered (fresh visitor / version migration) the
 * already-shipped catalogue is marked seen SILENTLY except for the newest
 * few entries at the tail of its seed array — that's where the admin appends
 * new items — which DO notify. This keeps "only the last added tools" true
 * even for people who install during a migration.
 */
const BASELINE_NOTIFY_LAST = 3

/** Which detail page a notification opens (canonical card hrefs). */
export function notificationHref(n: AppNotification): string {
  switch (n.itemType) {
    case 'offer':
      return `/offers/${n.category}/${n.slug}`
    case 'devtool':
      return `/dev-tools/${n.category}/${n.slug}`
    case 'repo':
      return `/edittools/${n.slug}`
    default:
      return `/tools/${n.category}/${n.slug}`
  }
}

/**
 * One notification entry. `source` says who produced it:
 * 'submission' — the visitor added it themselves; 'catalog' — the site
 * published it (new seed item), pushed to every signed-in visitor.
 */
export interface AppNotification {
  id: string
  itemType: 'tool' | 'devtool' | 'repo' | 'offer'
  name: string
  category: string
  slug: string
  createdAt: string
  read: boolean
  source?: 'submission' | 'catalog'
}

/** Milliseconds for a notification/service timestamp (guards sorting on bad data). */
function dateValue(iso: string): number {
  const t = new Date(iso).getTime()
  return Number.isNaN(t) ? 0 : t
}

/** Accept only http(s) URLs to avoid javascript:/data: payloads in submissions. */
function assertHttpUrl(value: string, field: string): string {
  const trimmed = value.trim()
  try {
    const parsed = new URL(trimmed)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') throw new Error()
    return trimmed
  } catch {
    throw new Error(`Invalid ${field}: must be an http(s) URL`)
  }
}

/** Ensure a slug is unique within a collection by suffixing on collision. */
function uniqueSlug(base: string, taken: Set<string>): string {
  if (!taken.has(base)) return base
  let i = 2
  while (taken.has(`${base}-${i}`)) i++
  return `${base}-${i}`
}

/**
 * What we persist: ONLY user-specific data. Seed content (tools, courses,
 * offers…) always comes fresh from lib/seed so code updates reach everyone.
 */
const STORED_DELTA_VERSION = 6

interface StoredDelta {
  v?: number
  currentUserId: string | null
  users: User[] // includes upvotedItems / bookmarkedItems / karma
  recentSearches: string[]
  addedTools: Tool[] // user-submitted items (ids not present in seed)
  addedDevTools: DevTool[]
  addedPrompts: Prompt[]
  addedRepos: Repo[]
  addedCourses: Course[]
  addedOffers: Offer[]
  addedComments: Comment[] // user comments on any item
  notifications: AppNotification[] // bell entries for submitted items
  /** Per-browser registry of catalogue ids already seen/registered. Used to
   * detect newly-published seed items on later visits (push notifications). */
  seenCatalogIds?: Partial<Record<SeenCatalogSlice, string[]>>
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null
}

function isValidUser(u: unknown): u is User {
  if (!isRecord(u)) return false
  return (
    typeof u.id === 'string' &&
    typeof u.username === 'string' &&
    Array.isArray(u.upvotedItems) &&
    Array.isArray(u.bookmarkedItems)
  )
}

function pickNotifications(v: unknown): AppNotification[] {
  if (!Array.isArray(v)) return []
  const valid = v.filter(
    (x) =>
      isRecord(x) &&
      typeof x.id === 'string' &&
      typeof x.itemType === 'string' &&
      typeof x.slug === 'string' &&
      typeof x.createdAt === 'string'
  ) as Record<string, unknown>[]
  return valid
    .slice(0, MAX_NOTIFICATIONS_STORED)
    .map((x) => ({
      ...(x as unknown as AppNotification),
      read: Boolean(x.read),
      name: String(x.name ?? ''),
      category: String(x.category ?? ''),
    }))
}

function pickSeenCatalogIds(v: unknown): Partial<Record<SeenCatalogSlice, string[]>> {
  if (!isRecord(v)) return {}
  const out: Partial<Record<SeenCatalogSlice, string[]>> = {}
  for (const key of SEEN_CATALOG_SLICES) {
    const arr = v[key]
    if (Array.isArray(arr)) {
      out[key] = arr.filter((s): s is string => typeof s === 'string').slice(-MAX_SEEN_IDS_PER_SLICE)
    }
  }
  return out
}

/** Union of two seen-id registries (cross-tab sync), capped per slice. */
function mergeSeenCatalog(
  a: Partial<Record<SeenCatalogSlice, string[]>>,
  b: Partial<Record<SeenCatalogSlice, string[]>>
): Partial<Record<SeenCatalogSlice, string[]>> {
  const out: Partial<Record<SeenCatalogSlice, string[]>> = {}
  for (const key of SEEN_CATALOG_SLICES) {
    if (!a[key] && !b[key]) continue
    out[key] = [...new Set([...(a[key] ?? []), ...(b[key] ?? [])])].slice(-MAX_SEEN_IDS_PER_SLICE)
  }
  return out
}

function sanitizeDelta(raw: unknown): StoredDelta | null {
  if (!isRecord(raw)) return null
  const pick = <T extends { id: string }>(v: unknown): T[] =>
    Array.isArray(v) ? (v.filter((x) => isRecord(x) && typeof x.id === 'string') as T[]) : []
  const users = Array.isArray(raw.users) ? (raw.users.filter(isValidUser) as User[]) : []
  const recentSearches = Array.isArray(raw.recentSearches)
    ? (raw.recentSearches.filter((s) => typeof s === 'string') as string[]).slice(0, 20)
    : []
  return {
    v: typeof raw.v === 'number' ? raw.v : undefined,
    currentUserId: typeof raw.currentUserId === 'string' ? raw.currentUserId : null,
    users,
    recentSearches,
    addedTools: pick<Tool>(raw.addedTools),
    addedDevTools: pick<DevTool>(raw.addedDevTools),
    addedPrompts: pick<Prompt>(raw.addedPrompts),
    addedRepos: pick<Repo>(raw.addedRepos),
    addedCourses: pick<Course>(raw.addedCourses),
    addedOffers: pick<Offer>(raw.addedOffers),
    addedComments: pick<Comment>(raw.addedComments),
    notifications: pickNotifications(raw.notifications),
    /**
     * v5+ only: v4 visitors carry short (500-capped) legacy registries that
     * marked only the newest 500 seed ids "seen" — treating them as valid
     * would resurrect hundreds of old items as notifications on every load.
     * Their registries are thrown away and re-baselined silently instead.
     */
    seenCatalogIds:
      (typeof raw.v === 'number' ? raw.v : 0) === STORED_DELTA_VERSION
        ? pickSeenCatalogIds(raw.seenCatalogIds)
        : {},
  }
}

interface PersistedState {
  tools: Tool[]
  devTools: DevTool[]
  prompts: Prompt[]
  repos: Repo[]
  courses: Course[]
  offers: Offer[]
  users: User[]
  comments: Comment[]
  currentUserId: string | null
  recentSearches: string[]
  notifications: AppNotification[]
  seenCatalogIds: Partial<Record<SeenCatalogSlice, string[]>>
}

interface SubmitToolInput {
  name: string
  tagline: string
  description: string
  url: string
  logoUrl: string
  category: Tool['category']
  tags: string[]
  pricing: Tool['pricing']
}
interface SubmitPromptInput {
  title: string
  description: string
  promptText: string
  model: string[]
  category: Prompt['category']
  tags: string[]
  variables?: Prompt['variables']
  exampleOutput?: string
}
interface SubmitDevToolInput {
  name: string
  tagline: string
  description: string
  url: string
  logoUrl: string
  category: DevTool['category']
  tags: string[]
  pricing: DevTool['pricing']
}

interface SubmitRepoInput {
  name: string
  tagline: string
  description: string
  url: string
  logoUrl: string
  category: Repo['category']
  tags: string[]
  pricing: Pricing
}

interface SubmitOfferInput {
  name: string
  tagline: string
  description: string
  url: string
  logoUrl: string
  category: OfferCategory
  tags: string[]
}

export type OffersLang = 'en' | 'ar'

interface AppContextValue {
  // data
  tools: Tool[]
  devTools: DevTool[]
  prompts: Prompt[]
  repos: Repo[]
  courses: Course[]
  offers: Offer[]
  users: User[]
  comments: Comment[]
  currentUser: User | null
  recentSearches: string[]
  hydrated: boolean
  // i18n - offers only (Option A)
  offersLang: OffersLang
  setOffersLang: (lang: OffersLang) => void

  // auth
  signIn: (username: string) => void
  signOut: () => void
  getUser: (id: string) => User | undefined
  getUserByUsername: (username: string) => User | undefined

  // interactions
  toggleUpvote: (itemType: ItemType, itemId: string) => void
  toggleBookmark: (itemType: ItemType, itemId: string) => void
  hasUpvoted: (itemId: string) => boolean
  hasBookmarked: (itemId: string) => boolean
  incrementCopies: (promptId: string) => void
  addComment: (itemId: string, body: string) => void
  getComments: (itemId: string) => Comment[]

  // submit
  submitTool: (input: SubmitToolInput) => Tool
  submitDevTool: (input: SubmitDevToolInput) => DevTool
  submitPrompt: (input: SubmitPromptInput) => Prompt
  submitRepo: (input: SubmitRepoInput) => Repo
  submitOffer: (input: SubmitOfferInput) => Offer

  // notifications (bell)
  notifications: AppNotification[]
  unreadNotificationCount: number
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  clearNotifications: () => void

  // delete
  deleteTool: (id: string) => void
  deleteDevTool: (id: string) => void
  deleteRepo: (id: string) => void

  // lookups
  getItemById: (itemType: ItemType, id: string) => Tool | DevTool | Prompt | Repo | Course | Offer | undefined
  getItemBySlug: (itemType: ItemType, slug: string) => Tool | DevTool | Prompt | Repo | Course | Offer | undefined

  // search
  addRecentSearch: (q: string) => void
  clearRecentSearches: () => void

  // ui flags
  authModalOpen: boolean
  setAuthModalOpen: (open: boolean) => void
  paletteOpen: boolean
  setPaletteOpen: (open: boolean) => void
  pendingAction: { type: string; itemType: ItemType; itemId: string } | null
  setPendingAction: (a: AppContextValue['pendingAction']) => void
  resolvePendingAction: () => void

  // detail modals
  detailModalToolId: string | null
  openDetailModal: (toolId: string) => void
  closeDetailModal: () => void
  detailModalRepoId: string | null
  openDetailModalForRepo: (repoId: string) => void
  closeDetailModalForRepo: () => void
  detailModalCourseId: string | null
  openDetailModalForCourse: (courseId: string) => void
  closeDetailModalForCourse: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

const EMPTY_TOOLS: Tool[] = []
const EMPTY_DEV_TOOLS: DevTool[] = []
const EMPTY_REPOS: Repo[] = []
const EMPTY_COURSES: Course[] = []
const EMPTY_OFFERS: Offer[] = []
const EMPTY_PROMPTS: Prompt[] = []
const EMPTY_COMMENTS: Comment[] = []

// ---------------- Seed slices (perf: audit §6.1) ----------------
// The catalogue is ~2.8 MB of source. A single `import('@/lib/seed')` bundles
// it into one ~2.3 MB client chunk downloaded by every visitor — including a
// tool detail page that needs one record. Instead each section file is
// imported separately so webpack emits one chunk per slice, and only the
// slices for the current route load immediately; the rest stream in on idle.
// Listing/detail pages already render from server-provided
// `initialItems`/`initial`, so a not-yet-loaded slice only means "no live
// vote deltas yet" — never empty content.
type SliceKey =
  | 'tools'
  | 'devTools'
  | 'prompts'
  | 'repos'
  | 'courses'
  | 'offers'
  | 'comments'

const SLICE_LOADERS: Record<SliceKey, () => Promise<{ id: string }[]>> = {
  tools: () => import('@/lib/seed/tools').then((m) => m.SEED_TOOLS),
  devTools: () => import('@/lib/seed/dev-tools').then((m) => m.SEED_DEV_TOOLS),
  prompts: () => import('@/lib/seed/prompts').then((m) => m.SEED_PROMPTS),
  repos: () => import('@/lib/seed/repos').then((m) => m.SEED_REPOS),
  courses: () => import('@/lib/seed/courses').then((m) => m.SEED_COURSES),
  offers: () => import('@/lib/seed/offers').then((m) => m.SEED_OFFERS),
  comments: () => import('@/lib/seed/comments').then((m) => m.SEED_COMMENTS),
}

const ALL_SLICES = Object.keys(SLICE_LOADERS) as SliceKey[]

/** Slices needed for first interaction on a route; the rest are idle-loaded. */
function prioritySlicesFor(pathname: string | null): SliceKey[] {
  const tiny: SliceKey[] = ['prompts', 'comments'] // ~8 KB combined, always worth it
  if (!pathname) return ALL_SLICES
  if (pathname.startsWith('/tools')) return ['tools', ...tiny]
  if (pathname.startsWith('/dev-tools')) return ['devTools', ...tiny]
  if (pathname.startsWith('/edittools')) return ['repos', ...tiny]
  if (pathname.startsWith('/courses')) return ['courses', ...tiny]
  if (pathname.startsWith('/offers') || pathname.startsWith('/guides')) return ['offers', ...tiny]
  // Home, search, submit, profile, command palette: need the full catalogue.
  // Exception: the homepage itself only renders tools/dev-tools/repos (counts
  // arrive via server props), so courses/offers stream in on idle instead of
  // competing with first paint. The palette/search show their loading state
  // until the idle step completes.
  if (pathname === '/') return ['tools', 'devTools', 'repos', ...tiny]
  return ALL_SLICES
}

/** Seed data always wins; only user-created extras (by id) are appended. */
function mergeSeedAdded<T extends { id: string }>(seedItems: T[], added?: T[]): T[] {
  return added?.length
    ? [...seedItems, ...added.filter((a) => a && typeof a.id === 'string' && !seedItems.some((s) => s.id === a.id))]
    : seedItems
}

function freshSeed(): PersistedState {
  return {
    tools: EMPTY_TOOLS,
    devTools: EMPTY_DEV_TOOLS,
    prompts: EMPTY_PROMPTS,
    repos: EMPTY_REPOS,
    courses: EMPTY_COURSES,
    offers: EMPTY_OFFERS,
    users: SEED_USERS,
    comments: EMPTY_COMMENTS,
    currentUserId: null,
    recentSearches: [],
    notifications: [],
    seenCatalogIds: {},
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(freshSeed)
  const [hydrated, setHydrated] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<
    AppContextValue['pendingAction']
  >(null)
  const [offersLang, setOffersLang] = useState<OffersLang>('en')
  const [detailModalToolId, setDetailModalToolId] = useState<string | null>(null)
  const [detailModalRepoId, setDetailModalRepoId] = useState<string | null>(null)
  const [detailModalCourseId, setDetailModalCourseId] = useState<string | null>(null)
  const openDetailModalForCourse = useCallback((id: string) => setDetailModalCourseId(id), [])
  const closeDetailModalForCourse = useCallback(() => setDetailModalCourseId(null), [])

  // Hydrate lang from localStorage only (never ?lang= — query variants would
  // create duplicate indexable URLs; canonical always stays clean).
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ai-hunt-offers-lang') as OffersLang | null
      if (saved === 'ar' || saved === 'en') setOffersLang(saved)
      // Clean up legacy ?lang=ar links: strip without reload, keep canonical.
      const url = new URL(window.location.href)
      if (url.searchParams.has('lang')) {
        url.searchParams.delete('lang')
        window.history.replaceState({}, '', url.toString())
      }
    } catch {}
  }, [])
  useEffect(() => {
    try { localStorage.setItem('ai-hunt-offers-lang', offersLang); } catch {}
  }, [offersLang])

  // Seed id registry - lets the saver strip seed items and store only user deltas.
  // Initialized with empty sets so slices can register incrementally as they load.
  type SeedIdRegistry = Record<
    'tools' | 'devTools' | 'prompts' | 'repos' | 'courses' | 'offers' | 'comments',
    Set<string>
  >
  const seedIdsRef = useRef<SeedIdRegistry>({
    tools: new Set(),
    devTools: new Set(),
    prompts: new Set(),
    repos: new Set(),
    courses: new Set(),
    offers: new Set(),
    comments: new Set(),
  })
  // Slices already merged into state / currently downloading. Both the mount
  // load and the route-change load fire on first render, so without this guard
  // the priority slices would download twice.
  const loadedSlicesRef = useRef<Set<SliceKey>>(new Set())
  const inflightSlicesRef = useRef<Set<SliceKey>>(new Set())
  // LocalStorage delta, read once on mount and reused for every slice merge.
  const deltaRef = useRef<StoredDelta | null>(null)
  const restoredUsersRef = useRef(false)

  // Synchronous mirror of state for submit callbacks: useState updaters run
  // during render (not synchronously inside setState), so values computed
  // inside an updater (unique slugs, submitter id) can't be returned. Reading
  // the ref gives submit functions the latest committed state deterministically.
  const stateRef = useRef(state)
  useEffect(() => {
    stateRef.current = state
  }, [state])

  // Hydrate: fresh seed slices from code + user deltas from localStorage on mount
  const pathname = usePathname()

  // Download + merge one set of seed slices. Safe to call repeatedly and from
  // multiple effects: already-loaded and in-flight slices are skipped.
  const loadSliceSet = useCallback(async (want: Set<SliceKey>) => {
    const missing = [...want].filter(
      (k) => !loadedSlicesRef.current.has(k) && !inflightSlicesRef.current.has(k)
    )
    if (missing.length === 0) return
    missing.forEach((k) => inflightSlicesRef.current.add(k))
    try {
      const pairs = await Promise.all(
        missing.map(async (k) => ({ key: k, items: await SLICE_LOADERS[k]() }))
      )
      const delta = deltaRef.current
      const addedBySlice: Record<SliceKey, { id: string }[] | undefined> = {
        tools: delta?.addedTools,
        devTools: delta?.addedDevTools,
        prompts: delta?.addedPrompts,
        repos: delta?.addedRepos,
        courses: delta?.addedCourses,
        offers: delta?.addedOffers,
        comments: delta?.addedComments,
      }
      const ids = seedIdsRef.current
      for (const { key, items } of pairs) {
        loadedSlicesRef.current.add(key)
        ids[key] = new Set(items.map((i) => i.id))
      }
      const restoreUsers = !restoredUsersRef.current && delta !== null
      if (restoreUsers) restoredUsersRef.current = true
      setState((prev) => {
        const next = { ...prev }
        for (const { key, items } of pairs) {
          next[key] = mergeSeedAdded(items, addedBySlice[key] as never[]) as never
        }
        // Keep the comments cap from the old full-load path: one browser tab
        // can't grow the stored list past localStorage quota.
        next.comments = next.comments.slice(0, MAX_COMMENTS_STORED)
        if (restoreUsers && delta) {
          next.users = delta.users?.length ? delta.users : next.users
          next.currentUserId = delta.currentUserId ?? next.currentUserId
          next.recentSearches = delta.recentSearches ?? next.recentSearches
          next.notifications = delta.notifications
            ? [...delta.notifications].sort((a, b) => dateValue(b.createdAt) - dateValue(a.createdAt))
            : next.notifications
          // Restore the seen-catalogue registry so a partial slice load can't
          // drop registries for slices not in this batch (a lost registry
          // would trigger a silent re-baseline and swallow notifications).
          next.seenCatalogIds = { ...next.seenCatalogIds, ...delta.seenCatalogIds }
        }
        // ---------------- Catalogue push notifications ----------------
        // New seed content shipped by the site (e.g. the admin adding a tool
        // to lib/seed and deploying) generates bell notifications for every
        // signed-in visitor: each load diffs the just-downloaded seed slices
        // against a per-browser "seen ids" registry. Anonymous visits never
        // record seen state, so signing in later triggers a one-time baseline
        // (everything marks as seen, nothing spams) and from then on each new
        // deploy shows only its genuinely new items.
        const signedIn = !!next.currentUserId
        if (signedIn) {
          type CatalogItem = { id: string; slug: string; name: string; category: string }
          const seenDelta = delta?.seenCatalogIds
          const nextSeenCatalog: Partial<Record<SeenCatalogSlice, string[]>> = {
            ...next.seenCatalogIds,
          }
          const notifsToAdd: AppNotification[] = []
          const itemTypeBySlice: Record<SeenCatalogSlice, AppNotification['itemType']> = {
            tools: 'tool',
            devTools: 'devtool',
            repos: 'repo',
            offers: 'offer',
          }
          for (const { key, items } of pairs) {
            const slice = key as SeenCatalogSlice
            if (!(SEEN_CATALOG_SLICES as readonly string[]).includes(slice)) continue
            const prior = seenDelta?.[slice] ?? next.seenCatalogIds[slice]
            if (!prior || prior.length === 0) {
              // Baseline: first load of this slice with no registry. Register
              // the full catalogue silently, EXCEPT the newest few entries at
              // the tail (where the admin appends) which notify — so migrations
              // still surface the last added items instead of swallowing them.
              const notifyItems = (items as unknown as CatalogItem[]).slice(-BASELINE_NOTIFY_LAST)
              const itemType = itemTypeBySlice[slice]
              for (const item of notifyItems) {
                const dupe =
                  notifsToAdd.some((n) => n.itemType === itemType && n.slug === item.slug) ||
                  next.notifications.some((n) => n.itemType === itemType && n.slug === item.slug)
                if (!dupe) {
                  notifsToAdd.push({
                    id: uuid(),
                    itemType,
                    name: item.name,
                    category: item.category ?? '',
                    slug: item.slug,
                    createdAt: new Date().toISOString(),
                    read: false,
                    source: 'catalog',
                  })
                }
              }
              nextSeenCatalog[slice] = items.map((i) => i.id).slice(-MAX_SEEN_IDS_PER_SLICE)
              continue
            }
            const priorSet = new Set(prior)
            const fresh = (items as unknown as CatalogItem[]).filter((i) => !priorSet.has(i.id))
            if (fresh.length === 0) continue
            const itemType = itemTypeBySlice[slice]
            for (const item of fresh.slice(-MAX_CATALOG_NOTIFICATIONS_PER_LOAD)) {
              const dupe =
                notifsToAdd.some((n) => n.itemType === itemType && n.slug === item.slug) ||
                next.notifications.some((n) => n.itemType === itemType && n.slug === item.slug)
              if (!dupe) {
                notifsToAdd.push({
                  id: uuid(),
                  itemType,
                  name: item.name,
                  category: item.category ?? '',
                  slug: item.slug,
                  createdAt: new Date().toISOString(),
                  read: false,
                  source: 'catalog',
                })
              }
            }
            nextSeenCatalog[slice] = [...prior, ...fresh.map((i) => i.id)].slice(
              -MAX_SEEN_IDS_PER_SLICE
            )
          }
          if (notifsToAdd.length > 0) {
            next.notifications = [...notifsToAdd, ...next.notifications].slice(
              0,
              MAX_NOTIFICATIONS_STORED
            )
          }
          next.seenCatalogIds = nextSeenCatalog
        }
        return next
      })
    } finally {
      missing.forEach((k) => inflightSlicesRef.current.delete(k))
    }
  }, [])

  // Mount: user deltas from localStorage + the current route's seed slices.
  // Route slices load immediately; everything else follows on idle so a tool
  // detail page fetches ~0.8 MB instead of ~2.3 MB before becoming
  // interactive. `hydrated` still means "full library ready" (search and the
  // command palette depend on it), so it flips only after the idle step.
  useEffect(() => {
    let cancelled = false
    const load = async () => {
      let raw: string | null = null
      try {
        raw = localStorage.getItem(STORAGE_KEY)
      } catch {}
      let delta: StoredDelta | null = null
      if (raw) {
        try {
          delta = sanitizeDelta(JSON.parse(raw))
        } catch {
          delta = null // corrupt state - start clean
        }
      }
      if (cancelled) return
      deltaRef.current = delta
      await loadSliceSet(new Set(prioritySlicesFor(pathname)))
      if (cancelled) return
      const scheduleIdle = (cb: () => void) => {
        try {
          const w = window as Window & {
            requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
          }
          if (typeof w.requestIdleCallback === 'function') {
            w.requestIdleCallback(cb, { timeout: 2500 })
            return
          }
        } catch {}
        setTimeout(cb, 800)
      }
      scheduleIdle(() => {
        if (cancelled) return
        void loadSliceSet(new Set(ALL_SLICES)).then(() => {
          if (!cancelled) setHydrated(true)
        })
      })
    }
    load()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Client-side navigation between sections: fetch slices the new route needs
  // (deduped against the mount load by loadedSlicesRef/inflightSlicesRef).
  // Views render server-provided initialItems meanwhile, so there is no flash.
  useEffect(() => {
    const want = new Set(prioritySlicesFor(pathname))
    if ([...want].some((k) => !loadedSlicesRef.current.has(k))) {
      void loadSliceSet(want)
    }
  }, [pathname, loadSliceSet])

  // Cross-tab sync: when another tab writes deltas, merge them in.
  useEffect(() => {
    if (!hydrated) return
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY || !e.newValue) return
      try {
        const delta = sanitizeDelta(JSON.parse(e.newValue))
        if (!delta) return
        setState((prev) => {
          const mergeAdded = <T extends { id: string }>(current: T[], added?: T[]) =>
            added?.length
              ? [...current, ...added.filter((a) => !current.some((s) => s.id === a.id))]
              : current
          return {
            ...prev,
            users: delta.users?.length ? delta.users : prev.users,
            currentUserId: delta.currentUserId ?? prev.currentUserId,
            recentSearches: delta.recentSearches ?? prev.recentSearches,
            tools: mergeAdded(prev.tools, delta.addedTools),
            devTools: mergeAdded(prev.devTools, delta.addedDevTools),
            prompts: mergeAdded(prev.prompts, delta.addedPrompts),
            repos: mergeAdded(prev.repos, delta.addedRepos),
            courses: mergeAdded(prev.courses, delta.addedCourses),
            offers: mergeAdded(prev.offers, delta.addedOffers),
            comments: mergeAdded(prev.comments, delta.addedComments).slice(0, MAX_COMMENTS_STORED),
            // Sort notifications newest-first after every cross-tab merge:
            // the generic id-merge above appends, which would rank older
            // (already-present) entries above freshly arrived ones.
            notifications: mergeAdded(prev.notifications, delta.notifications)
              .sort((a, b) => dateValue(b.createdAt) - dateValue(a.createdAt))
              .slice(0, MAX_NOTIFICATIONS_STORED),
            seenCatalogIds: mergeSeenCatalog(delta.seenCatalogIds ?? {}, prev.seenCatalogIds),
          }
        })
      } catch {
        // Ignore corrupt cross-tab payloads.
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [hydrated])

  // Persist ONLY user deltas (debounced 200ms). Seed content is never written.
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (!hydrated) return
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      const ids = seedIdsRef.current
      if (!ids) return
      const delta: StoredDelta = {
        v: STORED_DELTA_VERSION,
        currentUserId: state.currentUserId,
        users: state.users, // small (~10 entries); carries votes/bookmarks/karma
        recentSearches: state.recentSearches,
        addedTools: state.tools.filter((t) => !ids.tools.has(t.id)),
        addedDevTools: state.devTools.filter((d) => !ids.devTools.has(d.id)),
        addedPrompts: state.prompts.filter((p) => !ids.prompts.has(p.id)),
        addedRepos: state.repos.filter((r) => !ids.repos.has(r.id)),
        addedCourses: state.courses.filter((c) => !ids.courses.has(c.id)),
        addedOffers: state.offers.filter((o) => !ids.offers.has(o.id)),
        addedComments: state.comments.filter((c) => !ids.comments.has(c.id)),
        notifications: state.notifications,
        seenCatalogIds: state.seenCatalogIds,
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(delta))
      } catch (err) {
        console.warn(
          '[AI Hunt] Could not save your changes locally (storage full or blocked). ' +
            'New submissions/votes may be lost after refresh.',
          err
        )
      }
    }, 200)
  }, [state, hydrated])

  const currentUser = useMemo(
    () => state.users.find((u) => u.id === state.currentUserId) ?? null,
    [state.users, state.currentUserId]
  )

  // ---------------- Interactions ----------------
  const toggleUpvote = useCallback(
    (itemType: ItemType, itemId: string) => {
      setState((prev) => {
        if (!prev.currentUserId) return prev
        const user = prev.users.find((u) => u.id === prev.currentUserId)
        if (!user) return prev
        const already = user.upvotedItems.includes(itemId)
        const nextUsers = prev.users.map((u) =>
          u.id === user.id
            ? {
                ...u,
                upvotedItems: already
                  ? u.upvotedItems.filter((id) => id !== itemId)
                  : [...u.upvotedItems, itemId],
              }
            : u
        )
        const delta = already ? -1 : 1
        const bumpUpvotes = <T extends { id: string; upvotes: number }>(item: T): T =>
          item.id === itemId ? { ...item, upvotes: item.upvotes + delta } : item
        return {
          ...prev,
          users: nextUsers,
          tools: itemType === 'tool' ? prev.tools.map(bumpUpvotes) : prev.tools,
          devTools: itemType === 'devtool' ? prev.devTools.map(bumpUpvotes) : prev.devTools,
          prompts: itemType === 'prompt' ? prev.prompts.map(bumpUpvotes) : prev.prompts,
          repos: itemType === 'repo' ? prev.repos.map(bumpUpvotes) : prev.repos,
          courses: itemType === 'course' ? prev.courses.map(bumpUpvotes) : prev.courses,
          offers: itemType === 'offer' ? prev.offers.map(bumpUpvotes) : prev.offers,
        }
      })
    },
    []
  )

  const toggleBookmark = useCallback(
    (itemType: ItemType, itemId: string) => {
      setState((prev) => {
        if (!prev.currentUserId) return prev
        const user = prev.users.find((u) => u.id === prev.currentUserId)
        if (!user) return prev
        const already = user.bookmarkedItems.includes(itemId)
        const delta = already ? -1 : 1
        const nextUsers = prev.users.map((u) =>
          u.id === user.id
            ? {
                ...u,
                bookmarkedItems: already
                  ? u.bookmarkedItems.filter((id) => id !== itemId)
                  : [...u.bookmarkedItems, itemId],
              }
            : u
        )
        const bumpBookmarks = <T extends { id: string; bookmarks?: number }>(item: T): T =>
          item.id === itemId
            ? { ...item, bookmarks: Math.max(0, (item.bookmarks ?? 0) + delta) }
            : item
        return {
          ...prev,
          users: nextUsers,
          tools: itemType === 'tool' ? prev.tools.map(bumpBookmarks) : prev.tools,
          devTools: itemType === 'devtool' ? prev.devTools.map(bumpBookmarks) : prev.devTools,
          repos: itemType === 'repo' ? prev.repos.map(bumpBookmarks) : prev.repos,
          courses: itemType === 'course' ? prev.courses.map(bumpBookmarks) : prev.courses,
          offers: itemType === 'offer' ? prev.offers.map(bumpBookmarks) : prev.offers,
        }
      })
    },
    []
  )

  const hasUpvoted = useCallback(
    (itemId: string) => !!currentUser?.upvotedItems.includes(itemId),
    [currentUser]
  )
  const hasBookmarked = useCallback(
    (itemId: string) => !!currentUser?.bookmarkedItems.includes(itemId),
    [currentUser]
  )

  const incrementCopies = useCallback((promptId: string) => {
    setState((prev) => ({
      ...prev,
      prompts: prev.prompts.map((p) =>
        p.id === promptId ? { ...p, copies: p.copies + 1 } : p
      ),
    }))
  }, [])

  const addComment = useCallback((itemId: string, body: string) => {
    setState((prev) => {
      if (!prev.currentUserId || !body.trim()) return prev
      const trimmed = body.trim().slice(0, MAX_COMMENT_LENGTH)
      const comment: Comment = {
        id: uuid(),
        itemId,
        userId: prev.currentUserId,
        body: trimmed,
        createdAt: new Date().toISOString(),
      }
      // Cap stored comments so one browser can't exhaust localStorage quota.
      const comments = [comment, ...prev.comments].slice(0, MAX_COMMENTS_STORED)
      return { ...prev, comments }
    })
  }, [])

  const getComments = useCallback(
    (itemId: string) =>
      state.comments
        .filter((c) => c.itemId === itemId)
        .sort((a, b) => {
          const ta = new Date(a.createdAt).getTime()
          const tb = new Date(b.createdAt).getTime()
          if (Number.isNaN(ta) && Number.isNaN(tb)) return 0
          if (Number.isNaN(ta)) return 1
          if (Number.isNaN(tb)) return -1
          return tb - ta
        }),
    [state.comments]
  )

  // ---------------- Notifications (bell) ----------------
  const unreadNotificationCount = state.notifications.filter((n) => !n.read).length

  const markNotificationRead = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }))
  }, [])

  const markAllNotificationsRead = useCallback(() => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, read: true })),
    }))
  }, [])

  const clearNotifications = useCallback(() => {
    setState((prev) => ({ ...prev, notifications: [] }))
  }, [])

  // Keep the bell fresh: expired (>24h) catalogue notifications drop quietly
  // once the app has hydrated.
  useEffect(() => {
    if (!hydrated) return
    const cutoff = Date.now() - NOTIFICATION_TTL_MS
    setState((prev) => {
      const next = prev.notifications.filter(
        (n) =>
          n.source !== 'catalog' ||
          Number.isNaN(new Date(n.createdAt).getTime()) ||
          new Date(n.createdAt).getTime() > cutoff
      )
      if (next.length === prev.notifications.length) return prev
      return { ...prev, notifications: next }
    })
  }, [hydrated])

  // ---------------- Auth (local mock) ----------------
  // Signup analytics ping: every genuinely new account bumps the global
  // counter on the server. The returned count doubles as the member's signup
  // number — members 1-1000 earn the orange verified badge. Failures are
  // silently ignored so the local experience is never blocked.
  const pingSignupCount = useCallback(async (username: string) => {
    try {
      const res = await fetch('/api/analytics/signup', {
        method: 'POST',
        keepalive: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'account-created' }),
      })
      if (!res.ok) return
      const data = (await res.json()) as { counted?: boolean; count?: number }
      if (!data.counted || typeof data.count !== 'number') return
      setState((prev) => ({
        ...prev,
        users: prev.users.map((u) =>
          u.username.toLowerCase() === username && !u.signupNumber
            ? { ...u, signupNumber: data.count! }
            : u
        ),
      }))
    } catch {
      /* ignore */
    }
  }, [])

  const signIn = useCallback((username: string) => {
    const raw = username.trim().slice(0, MAX_USERNAME_LENGTH)
    const clean = raw.toLowerCase().replace(/[^a-z0-9_]/g, '')
    // Reject empty/short handles (e.g. '___' sanitizes to '') and cap the
    // local user list so fake accounts can't grow localStorage unboundedly.
    if (clean.length < MIN_USERNAME_LENGTH) return
    // New-account detection happens outside the updater (stateRef mirrors the
    // latest state) so the analytics ping fires exactly once per signup.
    const isNewSignup = !stateRef.current.users.find(
      (u) => u.username.toLowerCase() === clean
    )
    setState((prev) => {
      const existing = prev.users.find(
        (u) => u.username.toLowerCase() === clean
      )
      if (existing) return { ...prev, currentUserId: existing.id }
      if (prev.users.length >= MAX_USERS_STORED) return prev
      const newUser: User = {
        id: uuid(),
        username: clean,
        displayName: raw,
        avatarUrl: '',
        bio: '',
        upvotedItems: [],
        bookmarkedItems: [],
        submittedTools: [],
        submittedDevTools: [],
        submittedRepos: [],
        submittedPrompts: [],
        karma: 0,
        createdAt: new Date().toISOString(),
      }
      return { ...prev, users: [...prev.users, newUser], currentUserId: newUser.id }
    })
    if (isNewSignup) void pingSignupCount(clean)
  }, [pingSignupCount])

  const signOut = useCallback(() => {
    setState((prev) => ({ ...prev, currentUserId: null }))
  }, [])

  const getUser = useCallback(
    (id: string) => state.users.find((u) => u.id === id),
    [state.users]
  )
  const getUserByUsername = useCallback(
    (username: string) =>
      state.users.find(
        (u) => u.username.toLowerCase() === username.toLowerCase()
      ),
    [state.users]
  )

  // ---------------- Submit ----------------
  const submitTool = useCallback((input: SubmitToolInput): Tool => {
    const id = uuid()
    const url = assertHttpUrl(input.url, 'website URL')
    const logoUrl = input.logoUrl.trim()
    if (logoUrl) assertHttpUrl(logoUrl, 'logo URL')
    const slugBase = slugify(input.name) || `tool-${id.slice(0, 6)}`
    const now = new Date().toISOString()
    // Computed synchronously from the ref mirror (see stateRef): the setState
    // updater below must stay pure because its return value can't be read back.
    const prev = stateRef.current
    const submitter = prev.currentUserId
      ? prev.users.find((u) => u.id === prev.currentUserId)
      : undefined
    const finalTool: Tool = {
      id,
      slug: uniqueSlug(slugBase, new Set(prev.tools.map((t) => t.slug))),
      name: input.name.trim().slice(0, 80),
      tagline: input.tagline.trim().slice(0, 140),
      description: input.description.trim().slice(0, 5000),
      url,
      logoUrl: logoUrl || '/placeholder-logo.svg',
      category: input.category,
      tags: input.tags.map((t) => t.trim().slice(0, 30)).filter(Boolean).slice(0, 12),
      pricing: input.pricing,
      upvotes: 0,
      bookmarks: 0,
      submittedBy: submitter?.id ?? '',
      featured: false,
      createdAt: now,
      updatedAt: now,
    }
    const notif: AppNotification = {
      id: uuid(),
      itemType: 'tool',
      name: finalTool.name,
      category: finalTool.category,
      slug: finalTool.slug,
      createdAt: now,
      read: false,
    }
    setState((p) => ({
      ...p,
      tools: [finalTool, ...p.tools],
      notifications: [notif, ...p.notifications].slice(0, MAX_NOTIFICATIONS_STORED),
      users: submitter
        ? p.users.map((u) =>
            u.id === submitter.id
              ? { ...u, submittedTools: [...u.submittedTools, finalTool.id] }
              : u
          )
        : p.users,
    }))
    return finalTool
  }, [])

  const submitPrompt = useCallback((input: SubmitPromptInput): Prompt => {
    const id = uuid()
    const slugBase = slugify(input.title) || `prompt-${id.slice(0, 6)}`
    const now = new Date().toISOString()
    // See submitTool: submitter resolved synchronously so the returned
    // object matches what's stored.
    const prev = stateRef.current
    const submitter = prev.currentUserId
      ? prev.users.find((u) => u.id === prev.currentUserId)
      : undefined
    const final: Prompt = {
      id,
      slug: uniqueSlug(slugBase, new Set(prev.prompts.map((p) => p.slug))),
      title: input.title.trim().slice(0, 120),
      description: input.description.trim().slice(0, 2000),
      promptText: input.promptText.trim().slice(0, 8000),
      model: input.model.map((m) => m.trim()).filter(Boolean).slice(0, 8),
      category: input.category,
      tags: input.tags.map((t) => t.trim().slice(0, 30)).filter(Boolean).slice(0, 12),
      upvotes: 0,
      copies: 0,
      submittedBy: submitter?.id ?? '',
      featured: false,
      variables: input.variables?.slice(0, 20),
      exampleOutput: input.exampleOutput?.slice(0, 4000),
      createdAt: now,
      updatedAt: now,
    }
    setState((p) => ({
      ...p,
      prompts: [final, ...p.prompts],
      users: submitter
        ? p.users.map((u) =>
            u.id === submitter.id
              ? { ...u, submittedPrompts: [...(u.submittedPrompts ?? []), final.id] }
              : u
          )
        : p.users,
    }))
    return final
  }, [])

  const submitDevTool = useCallback((input: SubmitDevToolInput): DevTool => {
    const id = uuid()
    const url = assertHttpUrl(input.url, 'website URL')
    const logoUrl = input.logoUrl.trim()
    if (logoUrl) assertHttpUrl(logoUrl, 'logo URL')
    const slugBase = slugify(input.name) || `devtool-${id.slice(0, 6)}`
    const now = new Date().toISOString()
    // See submitTool: computed synchronously from the ref mirror.
    const prev = stateRef.current
    const submitter = prev.currentUserId
      ? prev.users.find((u) => u.id === prev.currentUserId)
      : undefined
    const final: DevTool = {
      id,
      slug: uniqueSlug(slugBase, new Set(prev.devTools.map((d) => d.slug))),
      name: input.name.trim().slice(0, 80),
      tagline: input.tagline.trim().slice(0, 140),
      description: input.description.trim().slice(0, 5000),
      url,
      logoUrl: logoUrl || '/placeholder-logo.svg',
      category: input.category,
      tags: input.tags.map((t) => t.trim().slice(0, 30)).filter(Boolean).slice(0, 12),
      pricing: input.pricing,
      upvotes: 0,
      bookmarks: 0,
      submittedBy: submitter?.id ?? '',
      featured: false,
      createdAt: now,
      updatedAt: now,
    }
    const notif: AppNotification = {
      id: uuid(),
      itemType: 'devtool',
      name: final.name,
      category: final.category,
      slug: final.slug,
      createdAt: now,
      read: false,
    }
    setState((p) => ({
      ...p,
      devTools: [final, ...p.devTools],
      notifications: [notif, ...p.notifications].slice(0, MAX_NOTIFICATIONS_STORED),
      users: submitter
        ? p.users.map((u) =>
            u.id === submitter.id
              ? { ...u, submittedDevTools: [...u.submittedDevTools, final.id] }
              : u
          )
        : p.users,
    }))
    return final
  }, [])

  const submitRepo = useCallback((input: SubmitRepoInput): Repo => {
    const id = uuid()
    const url = assertHttpUrl(input.url, 'website URL')
    const logoUrl = input.logoUrl.trim()
    if (logoUrl) assertHttpUrl(logoUrl, 'logo URL')
    const slugBase = slugify(input.name) || `repo-${id.slice(0, 6)}`
    const now = new Date().toISOString()
    // See submitTool: computed synchronously from the ref mirror.
    const prev = stateRef.current
    const submitter = prev.currentUserId
      ? prev.users.find((u) => u.id === prev.currentUserId)
      : undefined
    const final: Repo = {
      id,
      slug: uniqueSlug(slugBase, new Set(prev.repos.map((r) => r.slug))),
      name: input.name.trim().slice(0, 80),
      tagline: input.tagline.trim().slice(0, 140),
      description: input.description.trim().slice(0, 5000),
      url,
      logoUrl,
      category: input.category,
      tags: input.tags.map((t) => t.trim().slice(0, 30)).filter(Boolean).slice(0, 12),
      pricing: input.pricing,
      upvotes: 0,
      bookmarks: 0,
      submittedBy: submitter?.id ?? '',
      featured: false,
      createdAt: now,
      updatedAt: now,
    }
    const notif: AppNotification = {
      id: uuid(),
      itemType: 'repo',
      name: final.name,
      category: final.category,
      slug: final.slug,
      createdAt: now,
      read: false,
    }
    setState((p) => ({
      ...p,
      repos: [final, ...p.repos],
      notifications: [notif, ...p.notifications].slice(0, MAX_NOTIFICATIONS_STORED),
      users: submitter
        ? p.users.map((u) =>
            u.id === submitter.id
              ? { ...u, submittedRepos: [...u.submittedRepos, final.id] }
              : u
          )
        : p.users,
    }))
    return final
  }, [])

  const submitOffer = useCallback((input: SubmitOfferInput): Offer => {
    const id = uuid()
    const url = assertHttpUrl(input.url, 'offer URL')
    const logoUrl = input.logoUrl.trim()
    if (logoUrl) assertHttpUrl(logoUrl, 'logo URL')
    const slugBase = slugify(input.name) || `offer-${id.slice(0, 6)}`
    const now = new Date().toISOString()
    // See submitTool: computed synchronously from the ref mirror.
    const prev = stateRef.current
    const submitter = prev.currentUserId
      ? prev.users.find((u) => u.id === prev.currentUserId)
      : undefined
    const final: Offer = {
      id,
      slug: uniqueSlug(slugBase, new Set(prev.offers.map((o) => o.slug))),
      name: input.name.trim().slice(0, 80),
      tagline: input.tagline.trim().slice(0, 140),
      description: input.description.trim().slice(0, 5000),
      url,
      logoUrl: logoUrl || '/placeholder-logo.svg',
      category: input.category,
      tags: input.tags.map((t) => t.trim().slice(0, 30)).filter(Boolean).slice(0, 12),
      steps: [
        {
          title: 'How to participate',
          description: 'Open the offer link and follow the instructions.',
          url,
        },
      ],
      upvotes: 0,
      bookmarks: 0,
      submittedBy: submitter?.id ?? '',
      featured: false,
      createdAt: now,
      updatedAt: now,
    }
    const notif: AppNotification = {
      id: uuid(),
      itemType: 'offer',
      name: final.name,
      category: final.category,
      slug: final.slug,
      createdAt: now,
      read: false,
    }
    setState((p) => ({
      ...p,
      offers: [final, ...p.offers],
      notifications: [notif, ...p.notifications].slice(0, MAX_NOTIFICATIONS_STORED),
    }))
    return final
  }, [])

  // ---------------- Delete ----------------
  // Anonymous submissions (submittedBy === '') are deletable from the same
  // browser while signed out; signed-in users can delete only their own.
  const canDelete = (submittedBy: string, currentUserId: string | null) =>
    submittedBy === currentUserId || (submittedBy === '' && currentUserId === null)

  const deleteTool = useCallback((id: string) => {
    setState((prev) => {
      const item = prev.tools.find((t) => t.id === id)
      if (!item || !canDelete(item.submittedBy, prev.currentUserId)) return prev
      return {
        ...prev,
        tools: prev.tools.filter((t) => t.id !== id),
        users: prev.users.map((u) =>
          u.id === prev.currentUserId
            ? { ...u, submittedTools: u.submittedTools.filter((tid) => tid !== id) }
            : u
        ),
      }
    })
  }, [])

  const deleteDevTool = useCallback((id: string) => {
    setState((prev) => {
      const item = prev.devTools.find((d) => d.id === id)
      if (!item || !canDelete(item.submittedBy, prev.currentUserId)) return prev
      return {
        ...prev,
        devTools: prev.devTools.filter((d) => d.id !== id),
        users: prev.users.map((u) =>
          u.id === prev.currentUserId
            ? { ...u, submittedDevTools: u.submittedDevTools.filter((did) => did !== id) }
            : u
        ),
      }
    })
  }, [])

  const deleteRepo = useCallback((id: string) => {
    setState((prev) => {
      const item = prev.repos.find((r) => r.id === id)
      if (!item || !canDelete(item.submittedBy, prev.currentUserId)) return prev
      return {
        ...prev,
        repos: prev.repos.filter((r) => r.id !== id),
        users: prev.users.map((u) =>
          u.id === prev.currentUserId
            ? { ...u, submittedRepos: u.submittedRepos.filter((rid) => rid !== id) }
            : u
        ),
      }
    })
  }, [])

  // ---------------- Lookups ----------------
  const getItemById = useCallback(
    (itemType: ItemType, id: string) => {
      if (itemType === 'tool') return state.tools.find((t) => t.id === id)
      if (itemType === 'devtool') return state.devTools.find((d) => d.id === id)
      if (itemType === 'prompt') return state.prompts.find((p) => p.id === id)
      if (itemType === 'course') return state.courses.find((c) => c.id === id)
      if (itemType === 'offer') return state.offers.find((o) => o.id === id)
      return state.repos.find((r) => r.id === id)
    },
    [state.tools, state.devTools, state.prompts, state.courses, state.repos, state.offers]
  )
  const getItemBySlug = useCallback(
    (itemType: ItemType, slug: string) => {
      if (itemType === 'tool') return state.tools.find((t) => t.slug === slug)
      if (itemType === 'devtool') return state.devTools.find((d) => d.slug === slug)
      if (itemType === 'prompt') return state.prompts.find((p) => p.slug === slug)
      if (itemType === 'course') return state.courses.find((c) => c.slug === slug)
      if (itemType === 'offer') return state.offers.find((o) => o.slug === slug)
      return state.repos.find((r) => r.slug === slug)
    },
    [state.tools, state.devTools, state.prompts, state.courses, state.repos, state.offers]
  )

  // ---------------- Search ----------------
  const addRecentSearch = useCallback((q: string) => {
    const query = q.trim()
    if (!query) return
    setState((prev) => ({
      ...prev,
      recentSearches: [
        query,
        ...prev.recentSearches.filter((s) => s !== query),
      ].slice(0, 8),
    }))
  }, [])

  const clearRecentSearches = useCallback(() => {
    setState((prev) => ({ ...prev, recentSearches: [] }))
  }, [])

  // ---------------- Pending action (auth gate) ----------------
  const resolvePendingAction = useCallback(() => {
    setState((prev) => {
      if (!pendingAction || !prev.currentUserId) return prev
      return prev // actual mutation happens in the effect below with fresh state
    })
    if (!pendingAction) {
      setPendingAction(null)
      return
    }
    // Use functional updates so we don't depend on stale `state.currentUserId`.
    // The auth modal calls signIn() then this; signIn commits first via its own
    // setState, and React flushes both before this timeout runs.
    setState((prev) => {
      if (!prev.currentUserId) return prev
      const user = prev.users.find((u) => u.id === prev.currentUserId)
      if (!user) return prev
      const { type, itemType, itemId } = pendingAction
      if (type !== 'upvote' && type !== 'bookmark') return prev
      const list = type === 'upvote' ? user.upvotedItems : user.bookmarkedItems
      const already = list.includes(itemId)
      const nextUsers = prev.users.map((u) =>
        u.id === user.id
          ? type === 'upvote'
            ? { ...u, upvotedItems: already ? u.upvotedItems.filter((id) => id !== itemId) : [...u.upvotedItems, itemId] }
            : { ...u, bookmarkedItems: already ? u.bookmarkedItems.filter((id) => id !== itemId) : [...u.bookmarkedItems, itemId] }
          : u
      )
      const d = already ? -1 : 1
      const bump = <T extends { id: string; upvotes: number; bookmarks?: number }>(item: T): T =>
        item.id !== itemId
          ? item
          : type === 'upvote'
            ? { ...item, upvotes: item.upvotes + d }
            : { ...item, bookmarks: Math.max(0, (item.bookmarks ?? 0) + d) }
      const byType = <T extends { id: string; upvotes: number; bookmarks?: number }>(arr: T[], want: ItemType): T[] =>
        pendingAction.itemType === want ? (arr.map(bump) as T[]) : arr
      return {
        ...prev,
        users: nextUsers,
        tools: byType(prev.tools, 'tool'),
        devTools: byType(prev.devTools, 'devtool'),
        prompts: type === 'upvote' && itemType === 'prompt' ? prev.prompts.map(bump) as typeof prev.prompts : prev.prompts,
        repos: byType(prev.repos, 'repo'),
        courses: byType(prev.courses, 'course'),
        offers: byType(prev.offers, 'offer'),
      }
    })
    setPendingAction(null)
  }, [pendingAction])

  // Memoized so provider-local UI state (modals, palette, lang…) doesn't
  // re-render every consumer of useApp(); data consumers still update on
  // state changes, which is unavoidable with a single combined store.
  const value = useMemo<AppContextValue>(
    () => ({
      tools: state.tools,
      devTools: state.devTools,
      prompts: state.prompts,
      repos: state.repos,
      users: state.users,
      comments: state.comments,
      currentUser,
      recentSearches: state.recentSearches,
      offersLang,
      setOffersLang,
      signIn,
      signOut,
      getUser,
      getUserByUsername,
      toggleUpvote,
      toggleBookmark,
      hasUpvoted,
      hasBookmarked,
      incrementCopies,
      addComment,
      getComments,
      submitTool,
      submitDevTool,
      submitPrompt,
      submitRepo,
      submitOffer,
      deleteTool,
      deleteDevTool,
      deleteRepo,
      getItemById,
      getItemBySlug,
      addRecentSearch,
      clearRecentSearches,
      notifications: state.notifications,
      unreadNotificationCount,
      markNotificationRead,
      markAllNotificationsRead,
      clearNotifications,
      authModalOpen,
      setAuthModalOpen,
      paletteOpen,
      setPaletteOpen,
      pendingAction,
      setPendingAction,
      resolvePendingAction,
      detailModalToolId,
      openDetailModal: (toolId: string) => setDetailModalToolId(toolId),
      closeDetailModal: () => setDetailModalToolId(null),
      detailModalRepoId,
      openDetailModalForRepo: (repoId: string) => setDetailModalRepoId(repoId),
      closeDetailModalForRepo: () => setDetailModalRepoId(null),
      courses: state.courses,
      offers: state.offers,
      hydrated,
      detailModalCourseId,
      openDetailModalForCourse,
      closeDetailModalForCourse,
    }),
    [
      state,
      currentUser,
      offersLang,
      signIn,
      signOut,
      getUser,
      getUserByUsername,
      toggleUpvote,
      toggleBookmark,
      hasUpvoted,
      hasBookmarked,
      incrementCopies,
      addComment,
      getComments,
      submitTool,
      submitDevTool,
      submitPrompt,
      submitRepo,
      submitOffer,
      deleteTool,
      deleteDevTool,
      deleteRepo,
      getItemById,
      getItemBySlug,
      addRecentSearch,
      clearRecentSearches,
      resolvePendingAction,
      unreadNotificationCount,
      markNotificationRead,
      markAllNotificationsRead,
      clearNotifications,
      authModalOpen,
      paletteOpen,
      pendingAction,
      detailModalToolId,
      detailModalRepoId,
      detailModalCourseId,
      hydrated,
      openDetailModalForCourse,
      closeDetailModalForCourse,
    ]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
