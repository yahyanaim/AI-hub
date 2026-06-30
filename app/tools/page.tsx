import type { Metadata } from 'next'
import { ToolsView } from '@/components/listing/ToolsView'

export const metadata: Metadata = {
  title: 'AI Tools',
  description: 'Browse the best AI tools, ranked by the community.',
}

export default function ToolsPage() {
  return <ToolsView />
}
