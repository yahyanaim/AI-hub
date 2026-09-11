import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import { HomeView } from '@/components/home/HomeView'

export const metadata: Metadata = {
  title: 'AI Hunt - AI Tools, n8n Automation, Courses & Freelancing Skills in Morocco',
  description:
    'Morocco-first directory to learn AI, n8n automation, development, and freelancing: discover AI tools, follow coding courses, and build job-ready skills. Free community-curated resources for Moroccan developers and students.',
  openGraph: {
    title: 'AI Hunt - Learn AI, Automation & Freelancing in Morocco',
    description:
      'Discover AI tools, master n8n automation, take coding courses, and build freelancing skills. Free resources for Morocco.',
    url: SITE_URL,
  },
  alternates: { canonical: SITE_URL },
}

export default function HomePage() {
  return <HomeView />
}
