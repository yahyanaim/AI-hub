import type { Metadata } from 'next'
import { LeaderboardView } from '@/components/leaderboard/LeaderboardView'

const baseUrl = 'https://aihubtools.vercel.app'

export const metadata: Metadata = {
  title: 'Leaderboard — Top Ranked Tools & Resources',
  description: 'See the top upvoted AI tools, developer tools, open-source repos, and coding courses. Community-ranked leaderboard of the best developer resources.',
  openGraph: {
    title: 'Leaderboard — Top Ranked Tools & Resources — AI Hunt',
    description: 'See the top upvoted AI tools, dev tools, repos, and courses ranked by the community.',
    url: `${baseUrl}/leaderboard`,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'AI Hunt Leaderboard' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leaderboard — Top Ranked Tools & Resources — AI Hunt',
    description: 'Top upvoted AI tools, dev tools, repos, and courses ranked by the community.',
    images: ['/og.png'],
  },
  alternates: { canonical: `${baseUrl}/leaderboard` },
}

export default function LeaderboardPage() {
  return <LeaderboardView />
}
