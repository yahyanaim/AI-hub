import type { Metadata } from 'next'
import { CalendarClock, UserRound } from 'lucide-react'
import { SITE_URL } from '@/lib/site'

const baseUrl = SITE_URL
const CALENDLY_URL = 'https://calendly.com/yahyanaim2001/30min'
const FOUNDER_PHOTO_URL: string | null =
  'https://avatars.githubusercontent.com/u/57252787?v=4'

export const metadata: Metadata = {
  title: 'Book a 30-min Call with AI Hunt',
  description:
    'Book a free 30-minute call with Yahia Naim, founder of AI Hunt. Questions about AI tools, courses, or the platform — pick a time on Calendly.',
  openGraph: {
    title: 'Book a 30-min Call - AI Hunt',
    description:
      'Book a free 30-minute call with the founder of AI Hunt. Pick a time that suits you.',
    url: `${baseUrl}/booking`,
    siteName: 'AI Hunt',
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${baseUrl}/og.png`, width: 1200, height: 630, alt: 'Book a call with AI Hunt' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a 30-min Call - AI Hunt',
    description: 'Book a free 30-minute call with the founder of AI Hunt.',
    images: [`${baseUrl}/og.png`],
  },
  alternates: { canonical: `${baseUrl}/booking` },
}

export default function BookingPage() {
  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-xl">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Booking
        </p>
        <h1 className="mt-3 text-center font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Book a 30 min call
        </h1>
        <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-muted-foreground">
          If you have any questions, just book a 30-minute call with us
          before subscribing.
        </p>

        <div className="mt-8 flex flex-col items-center rounded-2xl border border-brand-orange/20 bg-card p-8 text-center shadow-sm">
          {FOUNDER_PHOTO_URL ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={FOUNDER_PHOTO_URL}
              alt="Yahia Naim, founder of AI Hunt"
              className="size-28 rounded-full object-cover"
            />
          ) : (
            <span className="flex size-28 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
              <UserRound className="size-12" />
            </span>
          )}
          <h2 className="mt-4 font-heading text-xl font-bold text-foreground">
            Yahia Naim — Founder, AI Hunt
          </h2>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-orange-600 hover:shadow-lg active:scale-[0.98]"
          >
            <CalendarClock className="size-4" />
            Book a Call
          </a>
          <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
            After you book, we&apos;ll contact you to arrange the payment.
            Once you pay, send us the payment proof (a screenshot of your
            transaction receipt) on WhatsApp to continue the process.
          </p>
        </div>
      </div>
    </div>
  )
}
