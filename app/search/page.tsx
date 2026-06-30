import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SearchView } from '@/components/search/SearchView'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search AI tools, dev tools, and repos across the platform.',
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-page py-16 text-center text-muted-foreground">Loading…</div>}>
      <SearchView />
    </Suspense>
  )
}
