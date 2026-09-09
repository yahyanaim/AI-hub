import { redirect } from 'next/navigation'
import { SEED_OFFERS } from '@/lib/seed'

// Legacy one-segment offer URLs (/offers/<slug>) now live at
// /offers/<category>/<slug>. The route param is named `category` to satisfy
// Next.js (same-level dynamic segments must share a name), but a bare segment
// here is always treated as a legacy slug. This mirrors ToolRedirectPage.
export async function generateStaticParams() {
  return SEED_OFFERS.map((offer) => ({ category: offer.slug }))
}

export default async function OfferRedirectPage({
  params,
}: {
  params: { category: string }
}) {
  const offer = SEED_OFFERS.find((o) => o.slug === params.category)
  if (offer) redirect(`/offers/${offer.category}/${offer.slug}`)
  redirect('/offers')
}
