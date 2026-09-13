import { SectionHeading } from '@/components/ui/SectionHeading'

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
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Quick answers about AI Hunt, rankings, submissions, and support."
      />
      <div className="grid gap-3">
        {HOME_FAQS.map((faq) => (
          <details
            key={faq.q}
            className="group rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-accent/40"
          >
            <summary className="cursor-pointer list-none text-sm font-semibold text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {faq.q}
                <span className="shrink-0 text-lg font-normal text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
