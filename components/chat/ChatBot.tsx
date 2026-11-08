'use client'

import { useEffect, useState } from 'react'
import { MessageSquare, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DonationGateChat } from './DonationGateChat'

// Floating widget only: donation gate + popup launcher. The conversation UI
// itself lives on /chat (app/chat/page.tsx) so clicking the widget opens a
// dedicated ChatGPT-style window; same-name window.open refocuses it.
export function ChatBot() {
  const [showDonationGate, setShowDonationGate] = useState(false)
  const [hasDonated, setHasDonated] = useState(false)

  useEffect(() => {
    try {
      setHasDonated(localStorage.getItem('ai-hunt-donated') === 'true')
    } catch {}
  }, [])

  // External entry point: pages like /find-by-goal dispatch
  // `new CustomEvent('ai-hunt:ask', { detail: { question } })` — prefill it
  // via ?q= so the popup starts with the asked question.
  useEffect(() => {
    const onAsk = (e: Event) => {
      const q = (e as CustomEvent<{ question?: string }>).detail?.question?.trim()
      if (!q) return
      if (!hasDonated) setShowDonationGate(true)
      else openChatWindow(q)
    }
    window.addEventListener('ai-hunt:ask', onAsk)
    return () => window.removeEventListener('ai-hunt:ask', onAsk)
  }, [hasDonated])

  const openChatWindow = (question?: string) => {
    const url = question ? `/chat?q=${encodeURIComponent(question)}` : '/chat'
    const win = window.open(url, 'aihunt-chat', 'popup=yes,width=780,height=880')
    try {
      win?.focus()
    } catch {}
  }

  const openChat = () => (hasDonated ? openChatWindow() : setShowDonationGate(true))
  const onDonationDismiss = () => {
    setShowDonationGate(false)
    openChatWindow()
  }

  return (
    <>
      <button
        onClick={openChat}
        className={cn(
          'fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-200',
          hasDonated ? 'bg-brand-orange text-white hover:bg-orange-600' : 'bg-muted text-muted-foreground hover:bg-muted/80'
        )}
        aria-label="Open chat"
      >
        {hasDonated ? <MessageSquare className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
      </button>
      {!hasDonated && (
        <div className="fixed bottom-6 right-6 z-50 mb-16 flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-[11px] text-muted-foreground shadow-lg">
          <Lock className="h-3 w-3" />
          Donate to unlock
        </div>
      )}

      <DonationGateChat open={showDonationGate} onDismiss={onDonationDismiss} />
    </>
  )
}
