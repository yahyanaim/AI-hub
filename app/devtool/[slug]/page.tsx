import type { Metadata } from 'next'
import { SEED_DEV_TOOLS, SEED_USERS } from '@/lib/seed'
import { DevToolDetail } from '@/components/detail/DevToolDetail'

export async function generateStaticParams() {
  return SEED_DEV_TOOLS.map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tool = SEED_DEV_TOOLS.find((t) => t.slug === params.slug)
  if (!tool) return { title: 'Dev Tool Not Found' }
  return {
    title: tool.name,
    description: tool.tagline,
    openGraph: {
      title: tool.name,
      description: tool.tagline,
      type: 'article',
    },
  }
}

export default async function DevToolDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params

  return <DevToolDetail slug={slug} />
}
