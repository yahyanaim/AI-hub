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
  User,
  Comment,
  ItemType,
  Pricing,
} from '@/types'
import {
  SEED_TOOLS,
  SEED_DEV_TOOLS,
  SEED_PROMPTS,
  SEED_REPOS,
  SEED_COURSES,
  SEED_USERS,
  SEED_COMMENTS,
} from '@/lib/seed'
import { uuid, slugify } from '@/lib/utils'

const STORAGE_KEY = 'ai-hunt-state-v1'

interface PersistedState {
  tools: Tool[]
  devTools: DevTool[]
  prompts: Prompt[]
  repos: Repo[]
  courses: Course[]
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

interface AppContextValue {
  // data
  tools: Tool[]
  devTools: DevTool[]
  prompts: Prompt[]
  repos: Repo[]
  courses: Course[]
  users: User[]
  comments: Comment[]
  currentUser: User | null
  recentSearches: string[]

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
  getItemById: (itemType: ItemType, id: string) => Tool | DevTool | Prompt | Repo | Course | undefined
  getItemBySlug: (itemType: ItemType, slug: string) => Tool | DevTool | Prompt | Repo | Course | undefined

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

function freshSeed(): PersistedState {
  return {
    tools: SEED_TOOLS,
    devTools: SEED_DEV_TOOLS,
    prompts: SEED_PROMPTS,
    repos: SEED_REPOS,
    courses: SEED_COURSES,
    users: SEED_USERS,
    comments: SEED_COMMENTS,
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
  const [detailModalToolId, setDetailModalToolId] = useState<string | null>(null)
  const [detailModalRepoId, setDetailModalRepoId] = useState<string | null>(null)
  const [detailModalCourseId, setDetailModalCourseId] = useState<string | null>(null)
  const openDetailModalForCourse = useCallback((id: string) => setDetailModalCourseId(id), [])
  const closeDetailModalForCourse = useCallback(() => setDetailModalCourseId(null), [])

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedState
        // Merge seed updates into stored data (seed content wins for matching IDs, user-added items preserved)
        const mergeSeeds = <T extends { id: string }>(stored: T[] | undefined, seeds: T[]) =>
          stored?.length
            ? [
                ...seeds.filter((s) => !stored.some((d) => d.id === s.id)),
                ...stored.filter((d) => !seeds.some((s) => s.id === d.id)),
                ...seeds.filter((s) => stored.some((d) => d.id === s.id)),
              ]
            : seeds
        setState({
          ...parsed,
          tools: mergeSeeds(parsed.tools, SEED_TOOLS),
          devTools: mergeSeeds(parsed.devTools, SEED_DEV_TOOLS),
          prompts: mergeSeeds(parsed.prompts, SEED_PROMPTS),
          repos: mergeSeeds(parsed.repos, SEED_REPOS),
          courses: mergeSeeds(parsed.courses, SEED_COURSES),
          users: parsed.users?.length ? parsed.users : SEED_USERS,
          comments: parsed.comments ?? SEED_COMMENTS,
        })
      }
    } catch {
      // ignore corrupt state
    }
    setHydrated(true)
  }, [])

  // Persist (debounced via microtask)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (!hydrated) return
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      } catch {
        // storage full / unavailable
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
        }
      })
    },
    []
  )

  const toggleBookmark = useCallback(
    (itemType: ItemType, itemId: string) => {
      setState((prev) => {
        if (!prev.currentUserId) return prev
        const nextUsers = prev.users.map((u) => {
          if (u.id !== prev.currentUserId) return u
          const already = u.bookmarkedItems.includes(itemId)
          return {
            ...u,
            bookmarkedItems: already
              ? u.bookmarkedItems.filter((id) => id !== itemId)
              : [...u.bookmarkedItems, itemId],
          }
        })
        const bump = (arr: Array<{ id: string; bookmarks?: number }>) =>
          arr.map((item) => {
            if (item.id !== itemId) return item
            const cur = item.bookmarks ?? 0
            const exists = (nextUsers.find((u) => u.id === prev.currentUserId)?.bookmarkedItems ?? []).includes(itemId)
            return { ...item, bookmarks: exists ? cur + 1 : Math.max(0, cur - 1) }
          })
        return {
          ...prev,
          users: nextUsers,
          tools: bump(prev.tools) as Tool[],
          devTools: bump(prev.devTools) as DevTool[],
          prompts: prev.prompts,
          repos: bump(prev.repos) as Repo[],
          courses: bump(prev.courses) as Course[],
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
      const comment: Comment = {
        id: uuid(),
        itemId,
        userId: prev.currentUserId,
        body: body.trim(),
        createdAt: new Date().toISOString(),
      }
      return { ...prev, comments: [comment, ...prev.comments] }
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
    setState((prev) => {
      const existing = prev.users.find(
        (u) => u.username.toLowerCase() === username.toLowerCase()
      )
      if (existing) return { ...prev, currentUserId: existing.id }
      const newUser: User = {
        id: uuid(),
        username: username.toLowerCase().replace(/[^a-z0-9_]/g, ''),
        displayName: username,
        avatarUrl: '',
        bio: '',
        upvotedItems: [],
        bookmarkedItems: [],
        submittedTools: [],
        submittedDevTools: [],
        submittedRepos: [],
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
    const slug = slugify(input.name) || `tool-${id.slice(0, 6)}`
    const now = new Date().toISOString()
    const tool: Tool = {
      id,
      slug,
      name: input.name,
      tagline: input.tagline,
      description: input.description,
      url: input.url,
      logoUrl: input.logoUrl || '/placeholder-logo.svg',
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
    setState((prev) => {
      const submitter = prev.currentUserId
        ? prev.users.find((u) => u.id === prev.currentUserId)
        : undefined
      const finalTool = { ...tool, submittedBy: submitter?.id ?? '' }
      const users = submitter
        ? prev.users.map((u) =>
            u.id === submitter.id
              ? { ...u, submittedTools: [...u.submittedTools, finalTool.id] }
              : u
          )
        : prev.users
      return { ...prev, tools: [finalTool, ...prev.tools], users }
    })
    return tool
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
              ? { ...u, submittedDevTools: [...u.submittedDevTools, final.id] }
              : u
          )
        : prev.users
      return { ...prev, prompts: [final, ...prev.prompts], users }
    })
    return prompt
  }, [])

  const submitDevTool = useCallback((input: SubmitDevToolInput): DevTool => {
    const id = uuid()
    const slug = slugify(input.name) || `devtool-${id.slice(0, 6)}`
    const now = new Date().toISOString()
    const devTool: DevTool = {
      id,
      slug,
      name: input.name,
      tagline: input.tagline,
      description: input.description,
      url: input.url,
      logoUrl: input.logoUrl || '/placeholder-logo.svg',
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
    setState((prev) => {
      const submitter = prev.currentUserId
        ? prev.users.find((u) => u.id === prev.currentUserId)
        : undefined
      const final = { ...devTool, submittedBy: submitter?.id ?? '' }
      const users = submitter
        ? prev.users.map((u) =>
            u.id === submitter.id
              ? { ...u, submittedDevTools: [...u.submittedDevTools, final.id] }
              : u
          )
        : prev.users
      return { ...prev, devTools: [final, ...prev.devTools], users }
    })
    return devTool
  }, [])

  const submitRepo = useCallback((input: SubmitRepoInput): Repo => {
    const id = uuid()
    const slug = slugify(input.name) || `repo-${id.slice(0, 6)}`
    const now = new Date().toISOString()
    const repo: Repo = {
      id,
      slug,
      name: input.name,
      tagline: input.tagline,
      description: input.description,
      url: input.url,
      logoUrl: input.logoUrl,
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
    setState((prev) => {
      const submitter = prev.currentUserId
        ? prev.users.find((u) => u.id === prev.currentUserId)
        : undefined
      const final = { ...repo, submittedBy: submitter?.id ?? '' }
      const users = submitter
        ? prev.users.map((u) =>
            u.id === submitter.id
              ? { ...u, submittedRepos: [...u.submittedRepos, final.id] }
              : u
          )
        : prev.users
      return { ...prev, repos: [final, ...prev.repos], users }
    })
    return repo
  }, [])

  // ---------------- Delete ----------------
  const deleteTool = useCallback((id: string) => {
    setState((prev) => {
      const item = prev.tools.find((t) => t.id === id)
      if (!item || item.submittedBy !== prev.currentUserId) return prev
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
      if (!item || item.submittedBy !== prev.currentUserId) return prev
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
      if (!item || item.submittedBy !== prev.currentUserId) return prev
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
      return state.repos.find((r) => r.id === id)
    },
    [state.tools, state.devTools, state.prompts, state.courses, state.repos]
  )
  const getItemBySlug = useCallback(
    (itemType: ItemType, slug: string) => {
      if (itemType === 'tool') return state.tools.find((t) => t.slug === slug)
      if (itemType === 'devtool') return state.devTools.find((d) => d.slug === slug)
      if (itemType === 'prompt') return state.prompts.find((p) => p.slug === slug)
      if (itemType === 'course') return state.courses.find((c) => c.slug === slug)
      return state.repos.find((r) => r.slug === slug)
    },
    [state.tools, state.devTools, state.prompts, state.courses, state.repos]
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

  const value: AppContextValue = {
    tools: state.tools,
    devTools: state.devTools,
    prompts: state.prompts,
    repos: state.repos,
    users: state.users,
    comments: state.comments,
    currentUser,
    recentSearches: state.recentSearches,
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
    detailModalCourseId,
    openDetailModalForCourse,
    closeDetailModalForCourse,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
