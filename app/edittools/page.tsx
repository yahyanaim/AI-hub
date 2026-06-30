import type { Metadata } from 'next'
import { ReposView } from '@/components/listing/ReposView'

export const metadata: Metadata = {
  title: 'Editing Tools',
  description: 'Explore top online editing tools.',
}

export default function EditToolsPage() {
  return <ReposView />
}
