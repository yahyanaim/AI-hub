'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Heart,
  Mail,
  Copy,
  Check,
  Landmark,
  ExternalLink,
} from 'lucide-react'

function PayPalLogo({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#003087"
        d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"
      />
      <path
        fill="#0079C1"
        d="M23.048 7.667c-.028.179-.06.362-.096.55-1.237 6.351-5.469 8.545-10.874 8.545H9.326c-.661 0-1.218.48-1.321 1.132l-1.337 8.474-.378 2.4a.584.584 0 0 0 .576.675h4.05c.579 0 1.07-.42 1.16-.99l.048-.248.92-5.833.06-.323c.09-.57.581-.99 1.16-.99h.73c4.73 0 8.433-1.922 9.515-7.479.452-2.323.218-4.262-.983-5.622a4.68 4.68 0 0 0-1.486-1.091z"
      />
    </svg>
  )
}

const PAYPAL_EMAIL = 'yahyanaim2001@gmail.com'
const PAYPAL_LINK = `https://www.paypal.com/myaccount/transfer/homepage/pay?recipient=${PAYPAL_EMAIL}`

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

      <div className="container-page mx-auto max-w-4xl">
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
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {/* PayPal */}
          <div className="flex flex-col items-center justify-between rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0079C1]/10">
                <PayPalLogo className="h-5 w-5" />
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

            <div className="my-5 flex items-center justify-center rounded-2xl bg-[#0079C1]/5 p-3.5 ring-1 ring-[#0079C1]/15">
              <PayPalLogo className="h-44 w-44" />
            </div>

            <div className="w-full space-y-3">
              <p className="text-xs leading-relaxed text-muted-foreground">
                One-click support from anywhere in the world. Credit and debit cards are accepted
                even without a PayPal account.
              </p>
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

          {/* CIH Bank QR */}
          <div className="flex flex-col items-center justify-between rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-heading text-base font-bold text-foreground">
                  CIH Bank Transfer
                </h2>
                <p className="text-xs text-muted-foreground">
                  Scan QR with CIH Mobile
                </p>
              </div>
            </div>

            <div className="my-5 overflow-hidden rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-black/5">
              <Image
                src="/cih-qr.png"
                alt="CIH Bank QR Code"
                width={184}
                height={184}
                className="h-44 w-44 object-contain"
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Open <span className="font-medium text-foreground">CIH Mobile</span> and scan the QR
              code to transfer instantly.
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          شكراً لدعمك · Thank you for keeping AIHubTools free &amp; independent
        </p>
      </div>
    </div>
  )
}
