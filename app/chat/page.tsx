'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Send, Sparkles, Loader2, SearchX, RotateCcw, Lock, Plus, Search,
  PanelLeft, PanelLeftClose, Trash2, ChevronDown, Coffee, Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Markdown } from '@/components/ui/Markdown'
import { DonationGateChat } from '@/components/chat/DonationGateChat'

// Standalone AI Career Advisor, intentionally mirroring the ChatGPT
// layout: collapsible left sidebar with saved chats, bare content column
// (no site navbar/footer), rounded floating composer with the standard
// disclaimer line below.

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

const GREETING_EN =
  "Hey! I'm your AI Career Advisor from AI Hunt. I'll help you build your skills, find the right tools and courses, and create a learning plan that actually works for you. What are you looking to achieve?"

const SESSIONS_KEY = 'ai-hunt-chat-sessions'
const ACTIVE_KEY = 'ai-hunt-chat-active'
const MAX_CONTEXT_MESSAGES = 40

function greeting(): ChatSession {
  return {
    id: 'greet',
    title: 'New chat',
    messages: [{ role: 'assistant', content: GREETING_EN }],
    updatedAt: Date.now(),
  }
}

function loadSessions(): ChatSession[] {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY)
    const list = raw ? (JSON.parse(raw) as ChatSession[]) : []
    return list.filter((s) => s.id && Array.isArray(s.messages) && s.messages.length > 0)
  } catch {
    return []
  }
}

function persist(sessions: ChatSession[], activeId: string) {
  try {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions.slice(0, 40)))
    localStorage.setItem(ACTIVE_KEY, activeId)
  } catch {}
}

export default function ChatPage() {
  // ---- Donation unlock (matches the inline widget: gate is dismissible) --
  const [hasDonated, setHasDonated] = useState<boolean | null>(null)
  const [unlocked, setUnlocked] = useState(false)
  const [gateOpen, setGateOpen] = useState(false)
  const unlock = () => {
    setUnlocked(true)
    setGateOpen(false)
  }

  // ---- Chat state --------------------------------------------------------
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [activeId, setActiveId] = useState('greet')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)
  const activeIdRef = useRef<string>('greet')
  activeIdRef.current = activeId

  const active = sessions.find((s) => s.id === activeId) ?? greeting()
  const messages = active.messages

  useEffect(() => {
    try {
      const donated = localStorage.getItem('ai-hunt-donated') === 'true'
      setHasDonated(donated)
      setUnlocked(donated)
      if (!donated) setGateOpen(true)
    } catch {
      setHasDonated(false)
      setGateOpen(true)
    }
    // First paint: hydrate last-session list from localStorage
    const stored = loadSessions()
    try {
      const activeStored = localStorage.getItem(ACTIVE_KEY)
      if (stored.length > 0 && activeStored && stored.some((s) => s.id === activeStored)) {
        setSessions(stored)
        setActiveId(activeStored)
      } else {
        const firstStored = stored[0]
        setSessions(stored.length > 0 ? stored : [greeting()])
        setActiveId(firstStored ? firstStored.id : 'greet')
      }
    } catch {
      setSessions([greeting()])
    }
  }, [])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (search) return
    persist(sessions, activeId)
  }, [sessions, activeId, search])

  useEffect(() => {
    if (unlocked) inputRef.current?.focus()
  }, [unlocked, activeId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const inputRef = useRef<HTMLTextAreaElement>(null)

  // ---- Session management ------------------------------------------------
  const newChat = () => {
    const s = greeting()
    setSessions((prev) => [s, ...prev.filter((p) => p.id !== 'greet')])
    setActiveId(s.id)
    setError('')
    setInput('')
    inputRef.current?.focus()
  }

  const selectChat = (id: string) => {
    setActiveId(id)
    setError('')
    setSidebarOpen(false) // ChatGPT collapses the sidebar after choosing a chat
  }

  const deleteChat = (id: string) => {
    const remaining = sessions.filter((s) => s.id !== id)
    setSessions(remaining)
    if (activeId === id) setActiveId(remaining[remaining.length - 1]?.id ?? 'greet')
  }

  const shownSessions = sessions.filter(
    (s) => !search || s.title.toLowerCase().includes(search.toLowerCase())
  )

  // ---- Streaming fetch (same API as the inline widget) -------------------
  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading || !unlocked) return

    // Figure out the session being written to: a fresh greeting turns into a
    // real, titled session; existing chats update in place.
    const isSeed = activeIdRef.current === 'greet'
    const sid = isSeed ? `c${Date.now()}` : activeIdRef.current
    const title = isSeed ? text.slice(0, 48) : active.title
    const withUser: Message[] = [...messages, { role: 'user', content: text }]

    let next: ChatSession = {
      id: sid,
      title,
      messages: withUser,
      updatedAt: Date.now(),
    }
    // Put the assistant placeholder right away so the loader shows in place.
    next = { ...next, messages: [...withUser, { role: 'assistant', content: '' }] }
    setSessions((prev) =>
      isSeed ? [next, ...prev.filter((p) => p.id !== 'greet')] : prev.map((p) => (p.id === sid ? next : p))
    )
    if (isSeed) setActiveId(sid)

    const patch = (content: string) =>
      setSessions((prev) =>
        prev.map((s) => (s.id === sid ? { ...s, messages: [...s.messages.slice(0, -1), { role: 'assistant' as const, content }] } : s))
      )

    setInput('')
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

  const stillLoadingEmpty =
    loading && !messages.some((m) => m.role === 'assistant' && m.content === '')

  const filtered = searchOpen && search ? shownSessions : sessions

  return (
    <div className="flex h-dvh bg-white text-foreground">
      <DonationGateChat open={gateOpen && hasDonated === false} onDismiss={unlock} />

      {/* ============ LEFT SIDEBAR (ChatGPT-style) ============ */}
      <aside
        className={cn(
          'shrink-0 flex-col justify-between overflow-hidden bg-[#f9f9f9] transition-all duration-200 dark:bg-[#171717]',
          sidebarOpen ? 'w-[268px]' : 'w-14'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar top: collapse toggle */}
          <div className="flex items-center justify-between px-3 py-3">
            <img src="/logo.png" alt="AI Hunt" className="h-8 w-8 rounded-lg" />
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
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
              {sidebarOpen && 'New chat'}
            </button>
            <button
              onClick={() => setSearchOpen((v) => !v)}
              title="Search chats"
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              <Search className="h-4 w-4 shrink-0" />
              {sidebarOpen && 'Search chats'}
            </button>
            {searchOpen && sidebarOpen && (
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search chats"
                className="mt-1 w-full rounded-lg border border-border bg-white px-2.5 py-1.5 text-sm outline-none focus:border-brand-orange/50"
              />
            )}
          </div>

          {/* Chats list */}
          {sidebarOpen && (
            <nav className="mt-2 flex-1 overflow-y-auto px-2 pb-3">
              <div className="px-2.5 pb-1 pt-3 text-xs font-medium text-muted-foreground">Chats</div>
              {filtered.length === 0 && (
                <div className="px-2.5 py-1.5 text-xs text-muted-foreground">No chats found</div>
              )}
              {filtered.map((s) => (
                <div
                  key={s.id}
                  className={cn(
                    'group relative flex w-full items-center rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-muted',
                    active.id === s.id && 'bg-muted/80 font-medium'
                  )}
                >
                  <button onClick={() => selectChat(s.id)} className="min-w-0 flex-1 truncate pr-6 text-left">
                    {s.title === 'New chat' ? 'New chat' : s.title}
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
          )}

          {/* Bottom: donate + account */}
          <div className="border-t border-border/60 p-2">
            <a
              href="https://ko-fi.com/yahianaim"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-muted"
            >
              <Coffee className="h-4 w-4 shrink-0 text-brand-orange" />
              {sidebarOpen && <span>Support API costs</span>}
            </a>
            <div className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm">
              <img src="/logo.png" alt="" className="h-7 w-7 rounded-full" />
              {sidebarOpen && (
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">AI Hunt Advisor</p>
                  <p className="text-[11px] text-muted-foreground">Free plan</p>
                </div>
              )}
              {sidebarOpen && <Settings className="h-4 w-4 shrink-0 text-muted-foreground" />}
            </div>
          </div>
        </div>
      </aside>

      {/* ============ MAIN COLUMN ============ */}
      <div className="flex min-w-0 flex-1 flex-col bg-background">
        {/* Slim top bar inside content */}
        <header className="flex shrink-0 items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            {sidebarOpen ? null : (
              <button
                onClick={() => setSidebarOpen(true)}
                className="mr-1 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
                aria-label="Open sidebar"
              >
                <PanelLeft className="h-5 w-5" />
              </button>
            )}
            <span className="flex items-center gap-1 text-[15px] font-semibold">
              AI Career Advisor
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </span>
          </div>
          <div className="flex items-center gap-2">
            {(hasDonated === false || hasDonated === null) && !unlocked && (
              <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[11px] text-muted-foreground">
                <Lock className="h-3 w-3" /> Donate to unlock
              </span>
            )}
            <Sparkles className="h-4 w-4 text-brand-orange" />
          </div>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-3xl flex-col px-4 py-6 sm:px-6">
            {messages.map((msg, i) => (
              <div key={i} className={cn('mb-7', msg.role === 'user' && 'flex justify-end')}>
                {msg.role === 'assistant' ? (
                  <div className="flex gap-3">
                    <img src="/logo.png" alt="" className="mt-0.5 h-8 w-8 shrink-0 rounded-full border border-border" />
                    <div className="min-w-0 flex-1 pt-0.5">
                      {msg.content === '' && loading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      ) : (
                        <Markdown className="text-sm">{msg.content}</Markdown>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[80%] rounded-3xl bg-[#f4f4f4] px-4 py-2.5 text-sm leading-relaxed text-foreground dark:bg-[#2f2f2f]">
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                )}
              </div>
            ))}
            {stillLoadingEmpty && (
              <div className="mb-7 flex gap-3">
                <img src="/logo.png" alt="" className="h-8 w-8 rounded-full border border-border" />
                <div className="pt-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            {error && !loading && (
              <div className="mb-6 flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2.5 text-sm text-red-500">
                <SearchX className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </main>

        {/* Composer — floating rounded box, ChatGPT-style */}
        <div className="shrink-0 px-4 pb-4 sm:px-6">
          <div className="mx-auto w-full max-w-3xl">
            <div
              className={cn(
                'flex items-end gap-2 rounded-[28px] border border-border bg-white px-4 py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] focus-within:border-black/20 dark:bg-[#2f2f2f]',
                !unlocked && 'opacity-90'
              )}
            >
              <button
                onClick={newChat}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
                aria-label="New chat"
                title="New chat"
              >
                <RotateCcw className="h-4 w-4" />
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
                className="max-h-40 min-h-[1.5rem] flex-1 resize-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-60"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading || !unlocked}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white transition-opacity hover:opacity-80 disabled:opacity-30 dark:bg-white dark:text-black"
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
