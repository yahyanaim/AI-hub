import type { Metadata } from 'next'
import { DevToolsView } from '@/components/listing/DevToolsView'

export const metadata: Metadata = {
  title: 'Dev Tools',
  description: 'Essential tools for developers — IDEs, testing, CI/CD, monitoring, and more.',
}

export default function DevToolsPage() {
  return <DevToolsView />
}
