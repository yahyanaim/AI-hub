'use client'

import { useEffect, useState } from 'react'
import { Code2, ArrowRight, Mail, Copy, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const PAYPAL_EMAIL = 'yahyanaim2001@gmail.com'
const PAYPAL_LINK = `https://www.paypal.com/myaccount/transfer/homepage/pay?recipient=${PAYPAL_EMAIL}`

export function DonationGate({ onDismiss }: { onDismiss: () => void }) {
  const [open, setOpen] = useState(true)
  const [supported, setSupported] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleSupport = () => {
    setSupported(true)
    localStorage.setItem('ai-hunt-donated', 'true')
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PAYPAL_EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable
    }
  }

  const handleDismiss = () => {
    if (!supported) return
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
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/10">
                <Code2 className={`h-8 w-8 ${supported ? 'text-brand-orange' : 'text-brand-orange'}`} />
              </div>

              <h2 className="text-center font-heading text-xl font-bold text-foreground">
                Buy me a coffee
              </h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                A small donation is required to submit. Your support keeps this project running and improving.
              </p>

              <a
                href={PAYPAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSupport}
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              >
                <Mail className="h-5 w-5" />
                Donate via PayPal
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                onClick={handleCopy}
                className="mt-3 flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-left transition-colors hover:bg-muted"
              >
                <span className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{PAYPAL_EMAIL}</span>
                </span>
                {copied ? (
                  <Check className="h-4 w-4 shrink-0 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
              </button>

              <button
                onClick={handleDismiss}
                disabled={!supported}
                className="mt-3 w-full rounded-lg border border-border bg-card py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                {supported ? "I've supported — continue" : 'Donate via PayPal first'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
