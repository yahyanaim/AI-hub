'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Heart,
  Mail,
  Copy,
  Check,
  Landmark,
  User,
  Hash,
  Globe,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react'

const PAYPAL_EMAIL = 'yahyanaim2001@gmail.com'
const PAYPAL_LINK = `https://www.paypal.com/myaccount/transfer/homepage/pay?recipient=${PAYPAL_EMAIL}`

const BANK = {
  holder: 'MONSIEUR YAHIA NAIM',
  account: '3505240211002500',
  rib: '230 590 3505240211002500 72',
  iban: 'MA64 2305 9035 0524 0211 0025 0072',
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
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-background/60 px-3 py-2.5 text-left transition-all hover:border-brand-orange/40 hover:bg-muted/60"
      title={`Copy ${label}`}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:text-brand-orange">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
          <span className="block truncate font-mono text-xs font-medium text-foreground">
            {value}
          </span>
        </span>
      </span>
      <span className="shrink-0 rounded-md px-1.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors group-hover:text-foreground">
        {copied ? (
          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <Check className="h-3.5 w-3.5" />
            Copied
          </span>
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </span>
    </button>
  )
}

export function SupportPage() {
  return (
    <div className="relative overflow-hidden py-10 sm:py-14">
      {/* Subtle AI Hunt ambient accent */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-brand-orange/10 blur-[120px]" />

      <div className="container-page mx-auto max-w-5xl">
        {/* Hero */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 py-1 text-xs font-semibold text-brand-orange">
            <Heart className="h-3.5 w-3.5" />
            Independent &amp; Ad-Free
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Support AIHubTools
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            AIHubTools is free, curated, and ad-free. Your contribution directly covers server,
            database, and AI inference costs so the platform stays open for everyone.
          </p>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 grid gap-5 lg:grid-cols-5">
          {/* PayPal */}
          <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-heading text-base font-bold text-foreground">
                  PayPal
                </h2>
                <p className="text-xs text-muted-foreground">
                  International · Card or PayPal balance
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              One-click support from anywhere in the world. Credit and debit cards are accepted
              even without a PayPal account.
            </p>

            <div className="mt-auto space-y-3 pt-6">
              <a
                href={PAYPAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600"
              >
                Donate via PayPal
                <ExternalLink className="h-4 w-4" />
              </a>
              <CopyRow
                icon={<Mail className="h-3.5 w-3.5" />}
                label="PayPal Email"
                value={PAYPAL_EMAIL}
              />
            </div>
          </div>

          {/* CIH Bank Transfer */}
          <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
                  <Landmark className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-heading text-base font-bold text-foreground">
                    Bank Transfer — CIH Bank
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Morocco (RIB) or International (IBAN / SWIFT)
                  </p>
                </div>
              </div>
              <span className="hidden items-center gap-1 rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground sm:inline-flex">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-orange" />
                Verified
              </span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-stretch">
              <div className="space-y-2">
                <CopyRow
                  icon={<User className="h-3.5 w-3.5" />}
                  label="Account Holder"
                  value={BANK.holder}
                />
                <CopyRow
                  icon={<Landmark className="h-3.5 w-3.5" />}
                  label="Bank · SWIFT Code"
                  value={`${BANK.bank} · ${BANK.swift}`}
                />
                <CopyRow
                  icon={<Hash className="h-3.5 w-3.5" />}
                  label="Account Number"
                  value={BANK.account}
                />
                <CopyRow
                  icon={<Hash className="h-3.5 w-3.5" />}
                  label="RIB"
                  value={BANK.rib}
                />
                <CopyRow
                  icon={<Globe className="h-3.5 w-3.5" />}
                  label="IBAN"
                  value={BANK.iban}
                />
              </div>

              {/* QR Code Card */}
              <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-muted/30 p-4 text-center sm:w-44">
                <div className="overflow-hidden rounded-xl bg-white p-2 shadow-sm ring-1 ring-black/5">
                  <Image
                    src="/cih-qr.png"
                    alt="CIH Bank QR Code for MONSIEUR YAHIA NAIM"
                    width={136}
                    height={136}
                    className="h-32 w-32 object-contain"
                  />
                </div>
                <p className="mt-2.5 text-xs font-semibold text-foreground">
                  Scan with CIH Mobile
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                  Instant local transfer
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          شكراً لدعمك · Thank you for keeping AIHubTools free &amp; independent
        </p>
      </div>
    </div>
  )
}
