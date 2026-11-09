'use client'

import { useEffect } from 'react'

// Floating launcher: every click takes the visitor to the standalone ChatGPT-style
// advisor at /chat, opened in a new window/tab — there is no inline panel anymore.
export function ChatBot() {
  useEffect(() => {
    // External entry point: pages like /find-by-goal dispatch
    // `new CustomEvent('ai-hunt:ask', { detail: { question } })`. The question
    // travels along as the ?q= URL param so /chat prefills the composer.
    const onAsk = (e: Event) => {
      const q = (e as CustomEvent<{ question?: string }>).detail?.question?.trim()
      window.open(q ? `/chat?q=${encodeURIComponent(q)}` : '/chat', '_blank', 'noopener')
    }
    window.addEventListener('ai-hunt:ask', onAsk)
    return () => window.removeEventListener('ai-hunt:ask', onAsk)
  }, [])

  return (
    <button
      onClick={() => window.open('/chat', '_blank', 'noopener')}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl active:scale-95"
      aria-label="Open the AI Career Advisor"
      title="Open the AI Career Advisor"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/chatbot-mascot.svg" alt="" className="h-11 w-11 object-contain" />
    </button>
  )
}
