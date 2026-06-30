'use client'

import { useEffect, useState } from 'react'
import { Coffee, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function DonationGate({ onDismiss }: { onDismiss: () => void }) {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleDismiss = () => {
    setOpen(false)
    setTimeout(onDismiss, 200)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
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
            <div className="px-6 pb-6 pt-8">
              <button
                onClick={handleDismiss}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FF5E5B]/10">
                <Coffee className="h-8 w-8 text-[#FF5E5B]" />
              </div>

              <h2 className="text-center font-heading text-xl font-bold text-foreground">
                Buy me a coffee?
              </h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                If AI Hunt helped you, consider supporting it with a small donation. Every bit helps keep this project running and improving.
              </p>

              <a
                href="https://ko-fi.com/yahianaim"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#FF5E5B] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e04a48]"
              >
                <Coffee className="h-5 w-5" />
                Support on Ko-fi
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                onClick={handleDismiss}
                className="mt-3 w-full rounded-lg border border-border bg-card py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                No thanks, continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
