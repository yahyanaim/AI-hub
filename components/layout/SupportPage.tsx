'use client'

import { FacetedGlyph } from '@/components/ui/FacetedGlyph'

import { useState } from 'react'
import Image from 'next/image'
import { SupportArt } from '@/components/ui/SupportArt'


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
            <FacetedGlyph kind="check" className="h-3.5 w-3.5" />
            Copied
          </span>
        ) : (
          <FacetedGlyph kind="copy" className="h-3.5 w-3.5" />
        )}
      </span>
    </button>
  )
}

export function SupportPage() {
  return (
    <div className="relative overflow-hidden bg-background py-10 sm:py-14">

      <div className="container-page mx-auto max-w-4xl">
        {/* Hero */}
        <div className="mx-auto max-w-2xl text-center">
          <SupportArt kind="heart" size={96} className="mx-auto mb-4 h-24 w-24" />
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 py-1 text-xs font-semibold text-brand-orange">
            <FacetedGlyph kind="heart" className="h-3.5 w-3.5" />
            Independent &amp; Ad-Free
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Support AIHubTools
          </h1>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {/* PayPal */}
          <div className="flex flex-col items-center justify-between rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
            <div className="flex flex-col items-center gap-1">
              <h2 className="font-heading text-base font-bold text-foreground">
                PayPal
              </h2>
              <p className="text-xs text-muted-foreground">
                International · Card or PayPal balance
              </p>
            </div>

            <SupportArt kind="coffee" size={112} className="my-5 h-28 w-28" />

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
                <FacetedGlyph kind="external" onAccent className="h-4 w-4" />
              </a>
              <CopyRow
                icon={<FacetedGlyph kind="mail" className="h-3.5 w-3.5" />}
                label="PayPal Email"
                value={PAYPAL_EMAIL}
              />
            </div>
          </div>

          {/* CIH Bank QR */}
          <div className="flex flex-col items-center justify-between rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
            <div className="flex flex-col items-center gap-2">
              <SupportArt kind="bank" size={40} className="h-10 w-10" />
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
