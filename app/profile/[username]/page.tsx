import type { Metadata } from 'next'
import { SEED_USERS } from '@/lib/seed'
import { ProfileView } from '@/components/profile/ProfileView'

export async function generateStaticParams() {
  return SEED_USERS.map((user) => ({ username: user.username }))
}

const baseUrl = 'https://aihubtools.vercel.app'

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  const user = SEED_USERS.find((u) => u.username === params.username)
  if (!user) return { title: 'User Not Found' }
  return {
    title: user.displayName,
    description: user.bio ?? `Profile of ${user.displayName} on AI Hunt`,
    openGraph: {
      title: user.displayName,
      description: user.bio ?? `Profile of ${user.displayName} on AI Hunt`,
      type: 'profile',
      url: `${baseUrl}/profile/${user.username}`,
    },
    twitter: {
      card: 'summary',
      title: user.displayName,
      description: user.bio ?? `Profile of ${user.displayName} on AI Hunt`,
    },
    alternates: { canonical: `${baseUrl}/profile/${user.username}` },
  }
}

export default async function ProfilePage({
  params,
}: {
  params: { username: string }
}) {
  const { username } = params
  return <ProfileView username={username} />
}
