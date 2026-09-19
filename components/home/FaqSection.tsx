import { CalendarClock, UserRound } from 'lucide-react'

// Founder booking: photo + Calendly link
const CALENDLY_URL = 'https://calendly.com/yahyanaim2001/30min'
const FOUNDER_PHOTO_URL: string | null =
  'https://avatars.githubusercontent.com/u/57252787?v=4'

export const HOME_FAQS = [
  {
    q: 'What is AI Hunt?',
    a: 'AI Hunt is a free, community-driven directory to discover AI tools, developer tools, open-source repos, coding courses, and offers. It is built Morocco-first, for developers and students in Morocco and worldwide.',
  },
  {
    q: 'Is AI Hunt free to use?',
    a: 'Yes, 100% free. No ads, no tracking, no data collection. You can browse tools, courses, and offers without an account.',
  },
  {
    q: 'How are tools ranked?',
    a: 'Tools are ranked by community upvotes, bookmarks, and curation. The most upvoted AI tools, dev tools, and repos surface in Today\u2019s top tools and trending sections.',
  },
  {
    q: 'How do I submit a tool or resource?',
    a: 'Go to the Submit page, fill in the name, URL, category, and description. New submissions are reviewed by the community before going live.',
  },
  {
    q: 'What will I find for n8n and automation?',
    a: 'A dedicated automation focus: n8n workflows, AI agents, and no-code platforms to automate tasks and build job-ready freelancing skills.',
  },
  {
    q: 'Are the courses good for beginners?',
    a: 'Yes. Courses cover fullstack, backend, frontend, AI engineering, Python, and prompt engineering, from beginner to advanced, with roadmaps and durations.',
  },
  {
    q: 'How can I support AI Hunt?',
    a: 'Share the platform with a friend, upvote your favorite tools, or donate via the Support page to keep it free and independent.',
  },
]

export function FaqSection() {
  return (
    <section aria-label="Frequently asked questions" className="mt-4">
      <div className="rounded-3xl bg-[#F4F4F6] p-6 sm:p-10 dark:bg-muted/20">
      <div className="grid items-stretch gap-8 lg:grid-cols-5">
        {/* Left: heading + book-a-call card */}
        <div className="flex flex-col lg:col-span-2">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <span className="inline-block size-1.5 rounded-full bg-brand-orange" />
            FAQs
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>

          <div className="mt-6 flex flex-1 flex-col items-center rounded-2xl border border-black/5 bg-white p-6 text-center shadow-sm dark:border-border dark:bg-card">
            {FOUNDER_PHOTO_URL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={FOUNDER_PHOTO_URL}
                alt="Founder"
                className="size-28 rounded-full object-cover"
              />
            ) : (
              <span className="flex size-28 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                <UserRound className="size-12" />
              </span>
            )}
            <h3 className="mt-4 text-xl font-bold text-foreground">
              Book a 30 min call
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              If you have any questions, just book a 30-minute call with us
              before subscribing.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-orange-600 hover:shadow-lg active:scale-[0.98]"
            >
              <CalendarClock className="size-4" />
              Book a Call
            </a>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground text-justify">
              After you book, we&apos;ll contact you to arrange the payment.
              Once you pay, send us the payment proof (a screenshot of your
              transaction receipt) on WhatsApp to continue the process.
            </p>
          </div>
        </div>

        {/* Right: accordion */}
        <div className="grid content-start gap-3 lg:col-span-3">
          {HOME_FAQS.map((faq, i) => (
            <details
              key={faq.q}
              open={i === 0}
              className="group rounded-2xl border border-transparent bg-[#FBEDEC] px-5 py-4 transition-colors open:border-[#F5D9D4] open:bg-white open:shadow-sm dark:border-border dark:bg-card"
            >
              <summary className="cursor-pointer list-none text-[15px] font-semibold text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {faq.q}
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-black/5 bg-white text-base font-normal text-muted-foreground shadow-sm transition-transform group-open:rotate-45 dark:border-border dark:bg-background">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-2 pr-10 text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}
