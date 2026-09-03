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
import type {
  Tool,
  DevTool,
  Prompt,
  Repo,
  Course,
  Offer,
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
const MIN_USERNAME_LENGTH = 2
const MAX_USERNAME_LENGTH = 24

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
interface StoredDelta {
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

  // Hydrate lang from localStorage + URL ?lang=ar
  useEffect(() => {
    try {
      const urlLang = new URLSearchParams(window.location.search).get('lang') as OffersLang | null
      if (urlLang === 'ar' || urlLang === 'en') setOffersLang(urlLang)
      else {
        const saved = localStorage.getItem('ai-hunt-offers-lang') as OffersLang | null
        if (saved === 'ar' || saved === 'en') setOffersLang(saved)
      }
    } catch {}
  }, [])
  useEffect(() => {
    try { localStorage.setItem('ai-hunt-offers-lang', offersLang); } catch {}
    // keep URL in sync without reload
    try {
      const url = new URL(window.location.href)
      if (offersLang === 'ar') url.searchParams.set('lang', 'ar')
      else url.searchParams.delete('lang')
      window.history.replaceState({}, '', url.toString())
    } catch {}
  }, [offersLang])

  // Seed id registry - lets the saver strip seed items and store only user deltas
  const seedIdsRef = useRef<Record<
    'tools' | 'devTools' | 'prompts' | 'repos' | 'courses' | 'offers' | 'comments',
    Set<string>
  > | null>(null)

  // Hydrate: fresh seed data from code + user deltas from localStorage on mount
  useEffect(() => {
    const load = async () => {
      let raw: string | null = null
      try {
        raw = localStorage.getItem(STORAGE_KEY)
      } catch {}
      // Dynamically import large seed data (keeps client bundles small)
      const seedMod = await import('@/lib/seed')
      const seedTools = seedMod.SEED_TOOLS as Tool[]
      const seedDevTools = seedMod.SEED_DEV_TOOLS as DevTool[]
      const seedRepos = seedMod.SEED_REPOS as Repo[]
      const seedCourses = seedMod.SEED_COURSES as Course[]
      const seedOffers = seedMod.SEED_OFFERS as Offer[]
      const seedPrompts = seedMod.SEED_PROMPTS as Prompt[]
      const seedComments = seedMod.SEED_COMMENTS as Comment[]

      seedIdsRef.current = {
        tools: new Set(seedTools.map((t) => t.id)),
        devTools: new Set(seedDevTools.map((d) => d.id)),
        prompts: new Set(seedPrompts.map((p) => p.id)),
        repos: new Set(seedRepos.map((r) => r.id)),
        courses: new Set(seedCourses.map((c) => c.id)),
        offers: new Set(seedOffers.map((o) => o.id)),
        comments: new Set(seedComments.map((c) => c.id)),
      }

      let delta: StoredDelta | null = null
      if (raw) {
        try {
          delta = JSON.parse(raw) as StoredDelta
        } catch {
          delta = null // corrupt state - start clean
        }
      }

      // Seed data always wins; only user-created extras are appended.
      const mergeAdded = <T extends { id: string }>(seedItems: T[], added?: T[]) =>
        added?.length
          ? [...seedItems, ...added.filter((a) => !seedItems.some((s) => s.id === a.id))]
          : seedItems

      setState({
        tools: mergeAdded(seedTools, delta?.addedTools),
        devTools: mergeAdded(seedDevTools, delta?.addedDevTools),
        prompts: mergeAdded(seedPrompts, delta?.addedPrompts),
        repos: mergeAdded(seedRepos, delta?.addedRepos),
        courses: mergeAdded(seedCourses, delta?.addedCourses),
        offers: mergeAdded(seedOffers, delta?.addedOffers),
        users: delta?.users?.length ? delta.users : SEED_USERS,
        comments: mergeAdded(seedComments, delta?.addedComments),
        currentUserId: delta?.currentUserId ?? null,
        recentSearches: delta?.recentSearches ?? [],
      })
      setHydrated(true)
    }
    load()
  }, [])

  // Cross-tab sync: when another tab writes deltas, merge them in.
  useEffect(() => {
    if (!hydrated) return
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY || !e.newValue) return
      try {
        const delta = JSON.parse(e.newValue) as StoredDelta
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
          tools: prev.tools.map(bumpUpvotes),
          devTools: prev.devTools.map(bumpUpvotes),
          prompts: prev.prompts.map(bumpUpvotes),
          repos: prev.repos.map(bumpUpvotes),
          courses: prev.courses.map(bumpUpvotes),
          offers: prev.offers.map(bumpUpvotes),
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
          tools: prev.tools.map(bumpBookmarks),
          devTools: prev.devTools.map(bumpBookmarks),
          repos: prev.repos.map(bumpBookmarks),
          courses: prev.courses.map(bumpBookmarks),
          offers: prev.offers.map(bumpBookmarks),
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
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
    [state.comments]
  )

  // ---------------- Auth (local mock) ----------------
  const signIn = useCallback((username: string) => {
    const raw = username.trim().slice(0, MAX_USERNAME_LENGTH)
    const clean = raw.toLowerCase().replace(/[^a-z0-9_]/g, '')
    // Reject empty/short handles (e.g. '___' sanitizes to '') and cap the
    // local user list so fake accounts can't grow localStorage unboundedly.
    if (clean.length < MIN_USERNAME_LENGTH) return
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
  }, [])

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
    const tool: Tool = {
      id,
      slug: slugBase,
      name: input.name,
      tagline: input.tagline,
      description: input.description,
      url,
      logoUrl: logoUrl || '/placeholder-logo.svg',
      category: input.category,
      tags: input.tags,
      pricing: input.pricing,
      upvotes: 0,
      bookmarks: 0,
      submittedBy: '',
      featured: false,
      createdAt: now,
      updatedAt: now,
    }
    let result = tool
    setState((prev) => {
      const submitter = prev.currentUserId
        ? prev.users.find((u) => u.id === prev.currentUserId)
        : undefined
      const slug = uniqueSlug(slugBase, new Set(prev.tools.map((t) => t.slug)))
      const finalTool = { ...tool, slug, submittedBy: submitter?.id ?? '' }
      result = finalTool
      const users = submitter
        ? prev.users.map((u) =>
            u.id === submitter.id
              ? { ...u, submittedTools: [...u.submittedTools, finalTool.id] }
              : u
          )
        : prev.users
      return { ...prev, tools: [finalTool, ...prev.tools], users }
    })
    return result
  }, [])

  const submitPrompt = useCallback((input: SubmitPromptInput): Prompt => {
    const id = uuid()
    const slug = slugify(input.title) || `prompt-${id.slice(0, 6)}`
    const now = new Date().toISOString()
    const prompt: Prompt = {
      id,
      slug,
      title: input.title,
      description: input.description,
      promptText: input.promptText,
      model: input.model,
      category: input.category,
      tags: input.tags,
      upvotes: 0,
      copies: 0,
      submittedBy: '',
      featured: false,
      variables: input.variables,
      exampleOutput: input.exampleOutput,
      createdAt: now,
      updatedAt: now,
    }
    setState((prev) => {
      const submitter = prev.currentUserId
        ? prev.users.find((u) => u.id === prev.currentUserId)
        : undefined
      const final = { ...prompt, submittedBy: submitter?.id ?? '' }
      const users = submitter
        ? prev.users.map((u) =>
            u.id === submitter.id
              ? { ...u, submittedPrompts: [...(u.submittedPrompts ?? []), final.id] }
              : u
          )
        : prev.users
      return { ...prev, prompts: [final, ...prev.prompts], users }
    })
    return prompt
  }, [])

  const submitDevTool = useCallback((input: SubmitDevToolInput): DevTool => {
    const id = uuid()
    const url = assertHttpUrl(input.url, 'website URL')
    const logoUrl = input.logoUrl.trim()
    if (logoUrl) assertHttpUrl(logoUrl, 'logo URL')
    const slugBase = slugify(input.name) || `devtool-${id.slice(0, 6)}`
    const now = new Date().toISOString()
    const devTool: DevTool = {
      id,
      slug: slugBase,
      name: input.name,
      tagline: input.tagline,
      description: input.description,
      url,
      logoUrl: logoUrl || '/placeholder-logo.svg',
      category: input.category,
      tags: input.tags,
      pricing: input.pricing,
      upvotes: 0,
      bookmarks: 0,
      submittedBy: '',
      featured: false,
      createdAt: now,
      updatedAt: now,
    }
    let result = devTool
    setState((prev) => {
      const submitter = prev.currentUserId
        ? prev.users.find((u) => u.id === prev.currentUserId)
        : undefined
      const slug = uniqueSlug(slugBase, new Set(prev.devTools.map((d) => d.slug)))
      const final = { ...devTool, slug, submittedBy: submitter?.id ?? '' }
      result = final
      const users = submitter
        ? prev.users.map((u) =>
            u.id === submitter.id
              ? { ...u, submittedDevTools: [...u.submittedDevTools, final.id] }
              : u
          )
        : prev.users
      return { ...prev, devTools: [final, ...prev.devTools], users }
    })
    return result
  }, [])

  const submitRepo = useCallback((input: SubmitRepoInput): Repo => {
    const id = uuid()
    const url = assertHttpUrl(input.url, 'website URL')
    const logoUrl = input.logoUrl.trim()
    if (logoUrl) assertHttpUrl(logoUrl, 'logo URL')
    const slugBase = slugify(input.name) || `repo-${id.slice(0, 6)}`
    const now = new Date().toISOString()
    const repo: Repo = {
      id,
      slug: slugBase,
      name: input.name,
      tagline: input.tagline,
      description: input.description,
      url,
      logoUrl,
      category: input.category,
      tags: input.tags,
      pricing: input.pricing,
      upvotes: 0,
      bookmarks: 0,
      submittedBy: '',
      featured: false,
      createdAt: now,
      updatedAt: now,
    }
    let result = repo
    setState((prev) => {
      const submitter = prev.currentUserId
        ? prev.users.find((u) => u.id === prev.currentUserId)
        : undefined
      const slug = uniqueSlug(slugBase, new Set(prev.repos.map((r) => r.slug)))
      const final = { ...repo, slug, submittedBy: submitter?.id ?? '' }
      result = final
      const users = submitter
        ? prev.users.map((u) =>
            u.id === submitter.id
              ? { ...u, submittedRepos: [...u.submittedRepos, final.id] }
              : u
          )
        : prev.users
      return { ...prev, repos: [final, ...prev.repos], users }
    })
    return result
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
    if (!pendingAction || !state.currentUserId) {
      setPendingAction(null)
      return
    }
    if (pendingAction.type === 'upvote') {
      toggleUpvote(pendingAction.itemType, pendingAction.itemId)
    } else if (pendingAction.type === 'bookmark') {
      toggleBookmark(pendingAction.itemType, pendingAction.itemId)
    }
    setPendingAction(null)
  }, [pendingAction, state.currentUserId, toggleUpvote, toggleBookmark])

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
      deleteTool,
      deleteDevTool,
      deleteRepo,
      getItemById,
      getItemBySlug,
      addRecentSearch,
      clearRecentSearches,
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
      deleteTool,
      deleteDevTool,
      deleteRepo,
      getItemById,
      getItemBySlug,
      addRecentSearch,
      clearRecentSearches,
      resolvePendingAction,
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
