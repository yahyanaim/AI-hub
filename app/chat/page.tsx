'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Send, Sparkles, Loader2, SearchX, RotateCcw } from 'lucide-react'
import { Markdown } from '@/components/ui/Markdown'
import { DonationGateChat } from '@/components/chat/DonationGateChat'

// Full-page ChatGPT-style layout for the AI Career Advisor. Opened by the
// floating widget as a popup window (window.open) and reachable at /chat.

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: `Hey! I'm your Fullstack Development Advisor. I'll help you build your skills, find the right courses, and create a learning plan that actually works for you. What are you looking to achieve?`,
}

const WELCOME = { messages: [INITIAL_MESSAGE], error: '' } as const

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasDonated, setHasDonated] = useState<boolean | null>(null)
  const [gateOpen, setGateOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    try {
      const donated = localStorage.getItem('ai-hunt-donated') === 'true'
      setHasDonated(donated)
      if (!donated) setGateOpen(true)
    } catch {
      setHasDonated(false)
      setGateOpen(true)
    }
  }, [])

  useEffect(() => {
    if (hasDonated) inputRef.current?.focus()
  }, [hasDonated])

  // Prefill from the launcher (?q=...) once donation state resolves.
  useEffect(() => {
    if (hasDonated !== true) return
    const q = new URLSearchParams(window.location.search).get('q')?.trim()
    if (!q) return
    setInput(q)
    inputRef.current?.focus()
    window.history.replaceState({}, '', '/chat')
  }, [hasDonated])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const newChat = () => {
    setMessages([INITIAL_MESSAGE])
    setError('')
    setInput('')
    inputRef.current?.focus()
  }

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return
    setError('')

    const updated: Message[] = [...messages, { role: 'user' as const, content: text }]
    setMessages(updated)
    setInput('')
    setLoading(true)

    let assistantMsg = ''
    setMessages((prev) => [...prev, { role: 'assistant' as const, content: '' }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated.map(({ role, content }) => ({
            role,
            content: content.length > 18_000 ? content.slice(0, 18_000) : content,
          })),
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
              setMessages((prev) => {
                const next = [...prev]
                next[next.length - 1] = { role: 'assistant', content: assistantMsg }
                return next
              })
            }
          } catch {}
        }
      }

      if (!assistantMsg) throw new Error('Empty response from AI')
    } catch (err: any) {
      const msg = err?.message || 'Something went wrong. Please try again.'
      setError(msg)
      setMessages((prev) => {
        const next = [...prev]
        if (prev[prev.length - 1]?.role === 'assistant' && prev[prev.length - 1]?.content === '') {
          next[next.length - 1] = { role: 'assistant', content: `Sorry, I encountered an error: ${msg}` }
        } else {
          next.push({ role: 'assistant', content: `Sorry, I encountered an error: ${msg}` })
        }
        return next
      })
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

  return (
    <div className="flex h-dvh flex-col bg-background">
      <DonationGateChat open={gateOpen && hasDonated === false} onDismiss={() => setGateOpen(false)} />

      {/* Top bar */}
      <header className="flex shrink-0 items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="AI Hunt" className="h-8 w-8 rounded-full" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground">AI Career Advisor</span>
              <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
            </div>
            <p className="text-[11px] text-muted-foreground">Personalized roadmaps, powered by NVIDIA AI</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={newChat}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            New chat
          </button>
        </div>
      </header>

      {/* Conversation column */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-3xl flex-col px-4 py-6 sm:px-6">
          {messages.map((msg, i) => (
            <div key={i} className={cn('mb-8', msg.role === 'user' && 'flex justify-end')}>
              {msg.role === 'assistant' ? (
                <div className="flex gap-3.5">
                  <img src="/logo.png" alt="AI Hunt" className="mt-0.5 h-8 w-8 shrink-0 rounded-full border border-border" />
                  <div className="min-w-0 flex-1 pt-0.5">
                    <span className="mb-1.5 block text-sm font-semibold text-foreground">AI Career Advisor</span>
                    {msg.content === '' && loading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    ) : (
                      <Markdown className="text-sm">{msg.content}</Markdown>
                    )}
                  </div>
                </div>
              ) : (
                <div className="max-w-[85%] rounded-3xl bg-muted px-4 py-2.5 text-sm leading-relaxed text-foreground">
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              )}
            </div>
          ))}
          {stillLoadingEmpty && (
            <div className="mb-8 flex gap-3.5">
              <img src="/logo.png" alt="AI Hunt" className="h-8 w-8 rounded-full border border-border" />
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

      {/* Composer */}
      <div className="shrink-0 bg-gradient-to-t from-background via-background to-transparent px-4 pb-4 pt-2 sm:px-6">
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex items-end gap-2 rounded-3xl border border-border bg-card px-4 py-2.5 focus-within:border-brand-orange/50 shadow-sm">
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
              placeholder="Describe your career goal, current skills, and constraints..."
              className="max-h-40 min-h-[1.5rem] flex-1 resize-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-60"
              disabled={loading || hasDonated === false}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading || hasDonated === false}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange text-white transition-colors hover:bg-orange-600 disabled:opacity-40"
              aria-label="Send"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            AI can make mistakes — verify courses and prices on their official pages.
          </p>
        </div>
      </div>
    </div>
  )
}

