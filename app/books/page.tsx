import { BookOpen, Construction } from 'lucide-react'
import Link from 'next/link'

export default function BooksPage() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-orange/10">
          <BookOpen className="h-10 w-10 text-brand-orange" />
        </div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
          Books
        </h1>
        <p className="mt-2 text-muted-foreground">
          Curated reading recommendations for developers
        </p>
        <div className="mt-10 rounded-xl border border-dashed border-brand-orange/30 bg-brand-orange/5 p-8">
          <Construction className="mx-auto mb-4 h-12 w-12 text-brand-orange/60" />
          <h2 className="mb-2 font-heading text-xl font-bold text-foreground">
            Stay Tuned
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            We&apos;re curating the best books for developers, engineers, and AI practitioners.
            This section is coming soon with hand-picked titles, community reviews, and learning paths.
          </p>
        </div>
        <Link
          href="/courses"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          Browse Courses Instead
        </Link>
      </div>
    </div>
  )
}
