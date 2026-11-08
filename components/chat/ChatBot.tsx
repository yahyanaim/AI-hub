'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, Loader2, X, MessageSquare, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Markdown } from '@/components/ui/Markdown'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: `Hey! I'm your Fullstack Development Advisor. I'll help you build your skills, find the right courses, and create a learning plan that actually works for you. What are you looking to achieve?`,
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const openChat = () => {
    setOpen(true)
  }

  // External entry point: pages like /find-by-goal dispatch
  // `new CustomEvent('ai-hunt:ask', { detail: { question } })`. The question
  // is prefilled and the widget opens directly.
  useEffect(() => {
    const onAsk = (e: Event) => {
      const q = (e as CustomEvent<{ question?: string }>).detail?.question?.trim()
      if (!q) return
      setInput(q)
      setOpen(true)
    }
    window.addEventListener('ai-hunt:ask', onAsk)
    return () => window.removeEventListener('ai-hunt:ask', onAsk)
  }, [])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    setError('')

    const userMsg: Message = { role: 'user', content: input.trim() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)

    let assistantMsg = ''
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Long assistant turns (full roadmap phase replies) can blow past
          // the server's per-message cap — clip defensively so the payload
          // never rejects mid-conversation.
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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={openChat}
          className={cn(
            'fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-white shadow-xl transition-all duration-200 hover:bg-orange-600'
          )}
          aria-label="Open chat"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 flex w-[400px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            style={{ height: 'min(600px, calc(100vh - 160px))' }}
          >
            {/* Header with logo */}
            <div className="flex items-center gap-2.5 border-b border-border bg-muted/50 px-4 py-3">
              <a
                href="/chat"
                target="_blank"
                rel="noopener"
                title="Open the full advisor in a new tab"
                aria-label="Open the full advisor in a new tab"
                className="shrink-0 transition-transform hover:scale-110"
                onClick={(e) => {
                  // keep the inline panel open underneath; the full advisor
                  // lives independently in the new tab
                }}
              >
                <img
                  src="/icons/push-icon-192.png"
                  alt="AI Hunt"
                  className="h-7 w-7 rounded-full"
                />
              </a>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-foreground">AI Career Advisor</span>
                  <Sparkles className="h-3 w-3 text-brand-orange" />
                </div>
                <p className="text-[11px] text-muted-foreground">Powered by NVIDIA AI</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-brand-orange/[0.05] via-transparent to-brand-orange/[0.12] px-4 py-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    'mb-4 flex gap-3',
                    msg.role === 'user' && 'flex-row-reverse'
                  )}
                >
                  <img
                    src="/icons/push-icon-192.png"
                    alt=""
                    className="h-7 w-7 shrink-0 rounded-full"
                  />
                  <div
                    className={cn(
                      'max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed',
                      msg.role === 'assistant'
                        ? 'bg-muted/50 text-foreground'
                        : 'bg-brand-orange/10 text-foreground'
                    )}
                  >
                    {msg.role === 'assistant' ? (
                      <Markdown className="text-left text-sm">{msg.content}</Markdown>
                    ) : (
                      <p className="whitespace-pre-wrap text-left">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}
              {loading && !messages.some(m => m.role === 'assistant' && m.content === '') && (
                <div className="mb-4 flex gap-3">
                  <img src="/icons/push-icon-192.png" alt="AI Hunt" className="h-5 w-5 rounded-full" />
                  <div className="rounded-lg bg-muted/50 px-3.5 py-2.5">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              {error && !loading && (
                <div className="mb-2 flex items-center gap-1.5 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-500">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  <span>Error: {error}</span>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border bg-muted/30 p-3">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about courses, paths, or anything..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  disabled={loading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-orange text-white transition-colors hover:bg-orange-600 disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
