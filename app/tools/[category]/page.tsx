import { redirect } from 'next/navigation'
import { SEED_TOOLS } from '@/lib/seed'

// Legacy one-segment tool URLs (/tools/<legacy-slug>) now live at
// /tools/<category>/<slug>. This route keeps old links working via a real
// 307 + Location header (`dynamic = 'force-dynamic'` below disables static
// prerendering, which is where Next.js turns redirect() into an HTTP 200 +
// meta refresh page). A genuine 3xx has no content to index, so no robots
// directive and no canonical belong here at all.
export const dynamic = 'force-dynamic'

export default async function ToolRedirectPage({
  params,
}: {
  params: { category: string }
}) {
  const tool = SEED_TOOLS.find((t) => t.slug === params.category)
  redirect(tool ? `/tools/${tool.category}/${tool.slug}` : '/tools')
}
