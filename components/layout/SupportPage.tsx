'use client'

import { useState } from 'react'
import { Code2, Mail, Copy, Check, Landmark, User, Hash } from 'lucide-react'

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

export function SupportPage() {
  return (
    <div className="container-page py-8">
      <div className="mx-auto max-w-3xl">
        {/* Hero */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/10">
            <Code2 className="h-7 w-7 text-brand-orange" />
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Buy me a coffee
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            AI Hunt is free and ad-free. Your support keeps it running, growing,
            and independent — every contribution matters.
          </p>
        </div>

        {/* Options */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {/* PayPal */}
          <div className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              <Mail className="h-4 w-4" />
              PayPal
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Fast one-click donation worldwide — you don&apos;t need a PayPal account to pay by card.
            </p>
            <a
              href={PAYPAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              <Mail className="h-5 w-5" />
              Donate via PayPal
            </a>
            <div className="mt-3">
              <CopyRow icon={<Mail className="h-3.5 w-3.5" />} label="Email" value={PAYPAL_EMAIL} />
            </div>
          </div>

          {/* CIH Bank */}
          <div className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              <Landmark className="h-4 w-4" />
              Bank transfer
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Direct transfer from Morocco or abroad via SWIFT. Tap any row to copy.
            </p>
            <div className="space-y-2">
              <CopyRow icon={<User className="h-3.5 w-3.5" />} label="Holder" value={BANK.holder} />
              <CopyRow icon={<Landmark className="h-3.5 w-3.5" />} label="Bank" value={`${BANK.bank} · ${BANK.swift}`} />
              <CopyRow icon={<Hash className="h-3.5 w-3.5" />} label="RIB" value={BANK.rib} />
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          شكراً لدعمك · Thank you for your support 🧡
        </p>
      </div>
    </div>
  )
}
