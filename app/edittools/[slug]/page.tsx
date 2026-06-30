import type { Metadata } from 'next'
import { SEED_REPOS } from '@/lib/seed'
import { RepoDetail } from '@/components/detail/RepoDetail'

export async function generateStaticParams() {
  return SEED_REPOS.map((repo) => ({ slug: repo.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const repo = SEED_REPOS.find((r) => r.slug === params.slug)
  if (!repo) return { title: 'Editing Tool Not Found' }
  return {
    title: repo.name,
    description: repo.description,
    openGraph: {
      title: repo.name,
      description: repo.description,
      type: 'article',
    },
  }
}

export default function EditToolDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params

  return <RepoDetail slug={slug} />
}
