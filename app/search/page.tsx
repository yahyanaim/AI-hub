import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SearchView } from '@/components/search/SearchView'

const baseUrl = 'https://aihubtools.vercel.app'

export const metadata: Metadata = {
  title: 'Search AI Tools & Developer Resources',
  description: 'Search across AI tools, developer tools, open-source GitHub repos, and coding courses. Find the best developer resources on AI Hunt.',
  alternates: { canonical: `${baseUrl}/search` },
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-page py-16 text-center text-muted-foreground">Loading…</div>}>
      <SearchView />
    </Suspense>
  )
}
