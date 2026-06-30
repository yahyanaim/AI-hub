import type { Metadata } from 'next'
import { LeaderboardView } from '@/components/leaderboard/LeaderboardView'

export const metadata: Metadata = {
  title: 'Leaderboard',
  description: 'Top upvoted AI tools, dev tools, and GitHub repos.',
}

export default function LeaderboardPage() {
  return <LeaderboardView />
}
