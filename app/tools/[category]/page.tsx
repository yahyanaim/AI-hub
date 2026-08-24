import { redirect } from 'next/navigation'
import { SEED_TOOLS } from '@/lib/seed'

// Legacy one-segment tool URLs (/tools/<legacy-slug>) now live at
// /tools/<category>/<slug>. This route keeps old links working via redirect.
export async function generateStaticParams() {
  return SEED_TOOLS.map((tool) => ({ category: tool.slug }))
}

export default async function ToolRedirectPage({
  params,
}: {
  params: { category: string }
}) {
  const tool = SEED_TOOLS.find((t) => t.slug === params.category)
  if (tool) redirect(`/tools/${tool.category}/${tool.slug}`)
  redirect('/tools')
}
