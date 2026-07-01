'use client'

import { useState } from 'react'
import { Coffee, ArrowRight, Bot, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function DonationGateChat({ open, onDismiss }: { open: boolean; onDismiss: () => void }) {
  const [supported, setSupported] = useState(false)

  const handleSupport = () => {
    setSupported(true)
    localStorage.setItem('ai-hunt-donated', 'true')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            <motion.div
              className="relative flex w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-card shadow-xl"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                onClick={() => { setSupported(false); onDismiss() }}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            <div className="px-6 pb-6 pt-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/10">
                <Bot className={`h-8 w-8 ${supported ? 'text-brand-orange' : 'text-brand-orange'}`} />
              </div>

              <h2 className="text-center font-heading text-xl font-bold text-foreground">
                AI Career Advisor
              </h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                The AI advisor uses the NVIDIA API which costs money per request. A small donation helps cover these costs and keeps the tool running for everyone.
              </p>

              <a
                href="https://ko-fi.com/yahianaim"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSupport}
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              >
                <Coffee className="h-5 w-5" />
                Support API costs on Ko-fi
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                onClick={onDismiss}
                disabled={!supported}
                className="mt-3 w-full rounded-lg border border-border bg-card py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                {supported ? "I've supported — start chatting" : 'Click Ko-fi link above first'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
