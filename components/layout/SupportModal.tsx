'use client'

import { useEffect, useState } from 'react'
import { Code2, X, Mail, Copy, Check, Landmark, User, Hash } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const PAYPAL_EMAIL = 'yahyanaim2001@gmail.com'
const PAYPAL_LINK = `https://www.paypal.com/myaccount/transfer/homepage/pay?recipient=${PAYPAL_EMAIL}`
const BANK = {
  holder: 'Yahia Naim',
  rib: 'MA64 2305 9035 0524 0211 0025 0072',
  swift: 'CIHMMAMC',
  bank: 'CIH Bank',
}

function CopyRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable
    }
  }
  return (
    <button
      onClick={handleCopy}
      className="flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-left transition-colors hover:bg-muted"
    >
      <span className="flex min-w-0 items-center gap-2">
        <span className="text-muted-foreground">{icon}</span>
        <span className="shrink-0 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <span className="truncate font-mono text-xs text-foreground">{value}</span>
      </span>
      {copied ? (
        <Check className="h-4 w-4 shrink-0 text-green-600" />
      ) : (
        <Copy className="h-4 w-4 shrink-0 text-muted-foreground" />
      )}
    </button>
  )
}

export function SupportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

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
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            className="relative flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-card shadow-xl"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="overflow-y-auto px-6 pb-6 pt-8">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/10">
                <Code2 className="h-7 w-7 text-brand-orange" />
              </div>

              <h2 className="text-center font-heading text-xl font-bold text-foreground">
                Buy me a code?
              </h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                AI Hunt is free and ad-free. Your support keeps it running, growing, and independent.
              </p>

              {/* PayPal */}
              <a
                href={PAYPAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#0070BA] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#003087]"
              >
                <Mail className="h-5 w-5" />
                Donate via PayPal
              </a>
              <div className="mt-2 space-y-2">
                <CopyRow icon={<Mail className="h-3.5 w-3.5" />} label="PayPal" value={PAYPAL_EMAIL} />
              </div>

              {/* Divider */}
              <div className="my-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <span className="text-xs uppercase tracking-wider text-muted-foreground">or bank transfer</span>
                <span className="h-px flex-1 bg-border" />
              </div>

              {/* CIH Bank */}
              <div className="rounded-xl border border-border p-3">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Landmark className="h-4 w-4 text-brand-orange" />
                  {BANK.bank} — Direct transfer
                </div>
                <div className="space-y-2">
                  <CopyRow icon={<User className="h-3.5 w-3.5" />} label="Holder" value={BANK.holder} />
                  <CopyRow icon={<Hash className="h-3.5 w-3.5" />} label="RIB" value={BANK.rib} />
                  <CopyRow icon={<Landmark className="h-3.5 w-3.5" />} label="SWIFT" value={BANK.swift} />
                </div>
                <p className="mt-2 text-[11px] leading-snug text-muted-foreground">
                  Tap any row to copy. International donations welcome via SWIFT.
                </p>
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                شكراً لدعمك · Thank you for your support 🧡
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
