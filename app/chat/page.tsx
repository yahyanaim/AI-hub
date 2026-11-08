'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Send, Loader2, SearchX, MessageSquare, Lock, Plus, Search,
  PanelLeft, PanelLeftClose, Trash2, ChevronDown, Coffee, Settings, UserRound, X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Markdown } from '@/components/ui/Markdown'
import { DonationGateChat } from '@/components/chat/DonationGateChat'

// Standalone AI Career Advisor (opened from the widget header logo). Mirrors
// the ChatGPT layout: collapsible left sidebar with the per-account chat
// history, bare content column, floating rounded composer. Requires the site
// account (username) so chats persist per user across sessions.

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type ChatSession = {
  id: string
  title: string
  messages: Message[]
  updatedAt: number
}

const GREETING =
  "Hey! I'm your AI Career Advisor from AI Hunt. I'll help you build your skills, find the right tools and courses, and create a learning plan that actually works for you. What are you looking to achieve?"

const STATE_KEY = 'ai-hunt-state-v4'
const USERNAME_KEY = 'ai-hunt-username'
const MAX_CONTEXT_MESSAGES = 40

function greeting(): ChatSession {
  return { id: 'greet', title: 'New chat', messages: [{ role: 'assistant', content: GREETING }], updatedAt: Date.now() }
}

function sessionsKey(username: string) {
  return `ai-hunt-chat-sessions::${username}`
}

function loadSessions(username: string): ChatSession[] {
  try {
    const raw = localStorage.getItem(sessionsKey(username))
    const list = raw ? (JSON.parse(raw) as ChatSession[]) : []
    return list.filter((s) => s.id && Array.isArray(s.messages) && s.messages.length > 0)
  } catch {
    return []
  }
}

function persist(username: string | null, sessions: ChatSession[], activeId: string) {
  if (!username) return
  try {
    localStorage.setItem(sessionsKey(username), JSON.stringify(sessions.slice(0, 40)))
    localStorage.setItem(`ai-hunt-chat-active::${username}`, activeId)
  } catch {}
}

export default function ChatPage() {
  // ---- Account requirement ------------------------------------------------
  const [username, setUsername] = useState<string | null>(null)
  const [accountChecked, setAccountChecked] = useState(false)
  const [signupName, setSignupName] = useState('')
  const [signupError, setSignupError] = useState<string | null>(null)

  // ---- Donation unlock (gate is informational + dismissible) --------------
  const [hasDonated, setHasDonated] = useState<boolean | null>(null)
  const [unlocked, setUnlocked] = useState(false)
  const [gateOpen, setGateOpen] = useState(false)
  const unlock = () => {
    setUnlocked(true)
    setGateOpen(false)
  }

  // ---- Chat state ---------------------------------------------------------
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [activeId, setActiveId] = useState('greet')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)
  const activeIdRef = useRef<string>('greet')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const active = sessions.find((s) => s.id === activeId) ?? greeting()
  const messages = active.messages

  // ---- Account bootstrapping ---------------------------------------------
  const signIn = useCallback((rawName: string) => {
    const clean = rawName.trim().toLowerCase().replace(/[^a-z0-9_]/g, '')
    if (clean.length < 2) return false
    try {
      // Ensure the account also exists in the main site's state so the
      // profile/votes system sees the same identity on next load.
      const rawState = localStorage.getItem(STATE_KEY)
      if (rawState) {
        const delta = JSON.parse(rawState) as {
          users?: { id: string; username: string; [k: string]: unknown }[]
          currentUserId?: string | null
          [k: string]: unknown
        }
        const users = Array.isArray(delta.users) ? delta.users : []
        const existing = users.find(
          (u) => typeof u?.username === 'string' && u.username.toLowerCase() === clean
        )
        if (!existing) {
          users.push({
            id: `chat-${clean}-${uuidShort()}`,
            username: clean,
            displayName: rawName.trim().slice(0, 32) || clean,
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
          })
        }
        delta.users = users
        const last = users[users.length - 1]
        delta.currentUserId = existing?.id ?? (last ? last.id : null)
        localStorage.setItem(STATE_KEY, JSON.stringify(delta))
      }
      localStorage.setItem(USERNAME_KEY, clean)
      setUsername(clean)
      const stored = loadSessions(clean)
      const storedActive = localStorage.getItem(`ai-hunt-chat-active::${clean}`)
      setSessions(stored.length > 0 ? stored : [greeting()])
      const firstStored: ChatSession | undefined = stored[0]
      setActiveId(
        storedActive && stored.some((s) => s.id === storedActive)
          ? storedActive
          : firstStored
            ? firstStored.id
            : 'greet'
      )
      return true
    } catch {
      return false
    }
  }, [])

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 767px)').matches)
    setSidebarOpen(!window.matchMedia('(max-width: 767px)').matches)
    try {
      setHasDonated(localStorage.getItem('ai-hunt-donated') === 'true')
      // NOTE: donation flag does not gate typing — the gate is dismissible
      // (parité with the inline widget). Account presence gates persistence.
    } catch {}
    try {
      const name = localStorage.getItem(USERNAME_KEY)
      if (name && name.length >= 2) signIn(name)
    } catch {}
    setAccountChecked(true)
  }, [signIn])

  useEffect(() => {
    if (!username || firstRender.current) return
    persist(username, sessions, activeId)
  }, [sessions, activeId, username])

  useEffect(() => {
    if (unlocked && !isMobile) inputRef.current?.focus()
  }, [unlocked, activeId, isMobile])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Keep a mirrored ref of activeId for streaming handlers.
  activeIdRef.current = activeId

  // ---- Session management -------------------------------------------------
  const newChat = () => {
    const s = greeting()
    setSessions((prev) => [s, ...prev.filter((p) => p.id !== 'greet')])
    setActiveId(s.id)
    setError('')
    setInput('')
    if (isMobile) setSidebarOpen(false)
    inputRef.current?.focus()
  }

  const selectChat = (id: string) => {
    setActiveId(id)
    setError('')
    if (isMobile) setSidebarOpen(false)
  }

  const deleteChat = (id: string) => {
    setSessions((prev) => {
      const remaining = prev.filter((s) => s.id !== id)
      if (activeIdRef.current === id) setActiveId(remaining[remaining.length - 1]?.id ?? 'greet')
      return remaining
    })
  }

  const shownSessions = sessions.filter(
    (s) => !search || s.title.toLowerCase().includes(search.toLowerCase())
  )

  // ---- Streaming fetch ----------------------------------------------------
  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading || !unlocked) return

    const isSeed = activeIdRef.current === 'greet'
    const sid = isSeed ? `c${Date.now()}` : activeIdRef.current
    const title = isSeed ? text.slice(0, 48) : active.title
    const withUser: Message[] = [...messages, { role: 'user', content: text }]

    const placeholder: ChatSession = {
      id: sid,
      title,
      messages: [...withUser, { role: 'assistant', content: '' }],
      updatedAt: Date.now(),
    }
    setSessions((prev) =>
      isSeed ? [placeholder, ...prev.filter((p) => p.id !== 'greet')] : prev.map((p) => (p.id === sid ? placeholder : p))
    )
    if (isSeed) setActiveId(sid)

    const patch = (content: string) =>
      setSessions((prev) =>
        prev.map((s) =>
          s.id === sid
            ? { ...s, messages: [...s.messages.slice(0, -1), { role: 'assistant' as const, content }] }
            : s
        )
      )

    setInput('')
    if (isMobile) inputRef.current?.blur()
    setLoading(true)

    let assistantMsg = ''
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: withUser
            .map(({ role, content }) => ({ role, content: content.length > 18_000 ? content.slice(0, 18_000) : content }))
            .slice(-MAX_CONTEXT_MESSAGES),
        }),
      })
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.details || errorData.error || `HTTP ${res.status}`)
      }
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''
        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed.startsWith('data: ')) continue
          const data = trimmed.slice(6)
          if (data === '[DONE]') break
          try {
            const json = JSON.parse(data)
            const chunk = json.choices?.[0]?.delta?.content
            if (chunk) {
              assistantMsg += chunk
              patch(assistantMsg)
            }
          } catch {}
        }
      }
      if (!assistantMsg) throw new Error('Empty response from AI')
    } catch (err: any) {
      const msg = err?.message || 'Something went wrong. Please try again.'
      setError(msg)
      patch(`Sorry, I encountered an error: ${msg}`)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      sendMessage()
    }
  }

  const stillLoadingEmpty = loading && !messages.some((m) => m.role === 'assistant' && m.content === '')
  const sidebarToggle = () => {
    if (isMobile) {
      setSidebarOpen((v) => !v)
      return
    }
    setSidebarOpen((v) => !v)
  }

  const SidebarInner = (
    <div className="flex h-full w-[268px] max-w-[85vw] flex-col border-r border-border bg-muted/60 @[680px]/sidebar:rounded-none">
      {/* Top: logo + collapse */}
      <div className="flex items-center justify-between px-3 py-3">
        <img src="/logo.png" alt="AI Hunt" className="h-8 w-8 rounded-lg" />
        <button
          onClick={sidebarToggle}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
          aria-label="Toggle sidebar"
        >
          {isMobile ? <X className="h-5 w-5" /> : sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
        </button>
      </div>

      {/* New chat / Search */}
      <div className="px-2 pt-1">
        <button
          onClick={newChat}
          title="New chat"
          className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-foreground hover:bg-muted"
        >
          <Plus className="h-4 w-4 shrink-0" />
          New chat
        </button>
        <button
          onClick={() => setSearchOpen((v) => !v)}
          title="Search chats"
          className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-foreground hover:bg-muted"
        >
          <Search className="h-4 w-4 shrink-0" />
          Search chats
        </button>
        {searchOpen && (
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search chats"
            className="mt-1 w-full rounded-lg border border-border bg-card px-2.5 py-1.5 text-sm outline-none focus:border-brand-orange/50"
          />
        )}
      </div>

      {/* Chats list */}
      <nav className="mt-2 flex-1 overflow-y-auto px-2 pb-3">
        <div className="px-2.5 pb-1 pt-3 text-xs font-medium text-muted-foreground">Your chats</div>
        {shownSessions.length === 0 && (
          <div className="px-2.5 py-1.5 text-xs text-muted-foreground">No chats found</div>
        )}
        {shownSessions.map((s) => (
          <div
            key={s.id}
            className={cn(
              'group relative flex w-full items-center rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-muted',
              active.id === s.id && 'bg-muted/80 font-medium'
            )}
          >
            <button onClick={() => selectChat(s.id)} className="min-w-0 flex-1 truncate pr-6 text-left">
              {s.title || 'New chat'}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                deleteChat(s.id)
              }}
              className="absolute right-1.5 hidden rounded p-1 text-muted-foreground hover:bg-muted group-hover:block"
              aria-label="Delete chat"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </nav>

      {/* Bottom: per-user identity + support */}
      <div className="border-t border-border/60 p-2">
        {username && (
          <div className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm">
            <UserRound className="h-6 w-6 rounded-full bg-muted p-1 text-foreground" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">@{username}</p>
              <p className="text-[11px] text-muted-foreground">Chats saved to your account</p>
            </div>
            <Settings className="h-4 w-4 shrink-0 text-muted-foreground" />
          </div>
        )}
        <a
          href="https://ko-fi.com/yahianaim"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-muted"
        >
          <Coffee className="h-4 w-4 shrink-0 text-brand-orange" />
          <span>Support API costs</span>
        </a>
      </div>
    </div>
  )

  // ---- Not signed in: require the account --------------------------------
  if (accountChecked && !username) {
    return (
      <div className="flex h-dvh items-center justify-center bg-background px-4">
        <DonationGateChat open={gateOpen && hasDonated === false} onDismiss={unlock} />
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10">
            <MessageSquare className="h-6 w-6 text-brand-orange" />
          </div>
          <h1 className="text-center text-lg font-bold text-foreground">Create your account</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Pick a username to keep your advisor chats saved with your account far beyond this tab.
          </p>
          <input
            value={signupName}
            onChange={(e) => {
              setSignupName(e.target.value)
              setSignupError(null)
            }}
            placeholder="e.g. aimar_dev"
            className="mt-5 w-full rounded-xl border border-input bg-card px-4 py-2.5 text-sm outline-none focus:border-brand-orange/60"
          />
          {signupError && <p className="mt-2 text-center text-xs text-red-500">{signupError}</p>}
          <button
            onClick={() => {
              if (!signIn(signupName)) setSignupError('Use at least 2 letters, numbers or underscores.')
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Save chats to this account
          </button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Same username as on the site — your profile and chats stay linked.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-dvh overflow-hidden bg-background text-foreground">
      <DonationGateChat open={gateOpen && hasDonated === false} onDismiss={unlock} />

      {/* ---- SIDEBAR (static column on desktop, drawer on mobile) ---- */}
      {isMobile && sidebarOpen && (
        <>
          <button
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          />
          <aside className="fixed inset-y-0 left-0 z-50">{SidebarInner}</aside>
        </>
      )}
      {!isMobile && sidebarOpen && <aside className="shrink-0">{SidebarInner}</aside>}

      {/* ---- MAIN ---- */}
      <div className="flex min-w-0 flex-1 flex-col bg-background">
        <header className="flex shrink-0 items-center justify-between px-3 py-2.5 sm:px-4">
          <div className="flex min-w-0 items-center gap-1.5">
            {!sidebarOpen && (
              <button
                onClick={sidebarToggle}
                className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
                aria-label="Open sidebar"
              >
                {isMobile ? <MessageSquare className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
              </button>
            )}
            <span className="flex items-center gap-1 truncate text-[15px] font-semibold">
              AI Career Advisor
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </span>
          </div>
          {(hasDonated === false || hasDonated === null) && !unlocked && (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-muted px-2 py-1 text-[11px] text-muted-foreground">
              <Lock className="h-3 w-3" /> Donate to unlock
            </span>
          )}
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-3xl flex-col px-3 py-5 sm:px-6">
            {messages.map((msg, i) => (
              <div key={i} className={cn('mb-6 sm:mb-7', msg.role === 'user' && 'flex justify-end')}>
                {msg.role === 'assistant' ? (
                  <div className="flex gap-2.5 sm:gap-3">
                    <img src="/logo.png" alt="" className="mt-0.5 h-7 w-7 shrink-0 rounded-full border border-border sm:h-8 sm:w-8" />
                    <div className="min-w-0 flex-1 pt-0.5">
                      {msg.content === '' && loading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      ) : (
                        <Markdown className="text-sm">{msg.content}</Markdown>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[88%] rounded-3xl bg-muted px-3.5 py-2 text-sm leading-relaxed text-foreground sm:max-w-[80%] sm:px-4 sm:py-2.5">
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                )}
              </div>
            ))}
            {stillLoadingEmpty && (
              <div className="mb-6 flex gap-2.5 sm:mb-7 sm:gap-3">
                <img src="/logo.png" alt="" className="h-7 w-7 rounded-full border border-border sm:h-8 sm:w-8" />
                <div className="pt-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            {error && !loading && (
              <div className="mb-5 flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2.5 text-sm text-red-500">
                <SearchX className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </main>

        {/* Composer */}
        <div className="shrink-0 px-3 pb-3 pt-1 sm:px-6 sm:pb-4">
          <div className="mx-auto w-full max-w-3xl">
            <div
              className={cn(
                'flex items-end gap-2 rounded-[24px] border border-border bg-card px-3 py-2.5 shadow-[0_2px_12px_hsl(var(--foreground)/0.06)] focus-within:border-brand-orange/50 sm:rounded-[28px] sm:px-4',
                !unlocked && 'opacity-90'
              )}
            >
              <button
                onClick={newChat}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
                aria-label="New chat"
                title="New chat"
              >
                <Plus className="h-4 w-4" />
              </button>
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  e.target.style.height = 'auto'
                  e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px'
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything"
                disabled={loading || !unlocked}
                className="max-h-40 min-h-[1.5rem] flex-1 resize-none bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-60 sm:text-sm"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading || !unlocked}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-80 disabled:opacity-30"
                aria-label="Send"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              AI can make mistakes. Verify courses and offers on their official pages.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function uuidShort(): string {
  return Math.random().toString(36).slice(2, 10)
}
