import type { Metadata } from 'next'
import { FreeAlternativesView } from '@/components/listing/FreeAlternativesView'

export const metadata: Metadata = {
  title: 'Free Alternative AI Tools',
  description:
    'Discover the best free and open-source AI tools for text generation, deep search, video, and image — all free to use.',
}

export default function FreeAlternativePage() {
  return <FreeAlternativesView />
}
