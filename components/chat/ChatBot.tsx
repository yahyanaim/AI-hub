'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Sparkles, Loader2, X, MessageSquare, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: `Welcome to AI Career Advisor! I can help you find courses, assess your level, and build a learning path. What would you like help with?`,
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

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    setError('')

    const userMsg: Message = { role: 'user', content: input.trim() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated.map(({ role, content }) => ({ role, content })),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.details || data.error || `HTTP ${res.status}`)
      }

      const reply = data.choices?.[0]?.message?.content
      if (!reply) throw new Error('Empty response from AI')

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: reply },
      ])
    } catch (err: any) {
      const msg = err?.message || 'Something went wrong. Please try again.'
      setError(msg)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Sorry, I encountered an error: ${msg}`,
        },
      ])
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
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-200',
          open
            ? 'bg-muted hover:bg-muted/80'
            : 'bg-brand-orange text-white hover:bg-orange-600'
        )}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

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
            <div className="flex items-center gap-2.5 border-b border-border bg-muted/50 px-5 py-3">
              <img
                src="/logo.png"
                alt="AI Hunt"
                className="h-7 w-7 rounded-full"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-foreground">AI Career Advisor</span>
                  <Sparkles className="h-3 w-3 text-brand-orange" />
                </div>
                <p className="text-[11px] text-muted-foreground">Powered by NVIDIA AI</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    'mb-4 flex gap-3',
                    msg.role === 'user' && 'flex-row-reverse'
                  )}
                >
                  <div
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                      msg.role === 'assistant'
                        ? 'bg-brand-orange/10 text-brand-orange'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {msg.role === 'assistant' ? (
                      <Bot className="h-3.5 w-3.5" />
                    ) : (
                      <User className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <div
                    className={cn(
                      'max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed',
                      msg.role === 'assistant'
                        ? 'bg-muted/50 text-foreground'
                        : 'bg-brand-orange/10 text-foreground'
                    )}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_ul]:pl-4 [&_li]:text-sm [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="mb-4 flex gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
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
