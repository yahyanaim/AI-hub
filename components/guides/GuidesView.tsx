'use client'

import { ListingView, type FilterOption } from '@/components/listing/ListingView'
import { OfferCard } from '@/components/cards/OfferCard'
import { useApp } from '@/lib/store'
import { isPaidGuide } from '@/lib/guides'

const categoryOptions: FilterOption[] = [{ value: 'guide', label: 'Guide' }]

export function GuidesView() {
  const { offers } = useApp()
  const guides = offers.filter(isPaidGuide)

  return (
    <ListingView
      items={guides}
      config={{
        title: 'Paid Guides',
        eyebrow: 'Guides',
        description:
          'Premium PDF playbooks. Pay by virement, send the receipt with “Hi, I paid” on WhatsApp, and receive the PDF on WhatsApp. Free glimpse chapter on every guide.',
        categoryLabel: 'Category',
        categoryOptions,
        itemLabel: 'guides',
        defaultSort: 'new',
      }}
      renderCard={(o) => <OfferCard offer={o} />}
      getCategory={() => 'guide'}
      getUpvotes={(o) => o.upvotes}
      getBookmarks={(o) => o.bookmarks}
      getCreatedAt={(o) => o.createdAt}
      getTrendingScore={(o) => o.upvotes + (o.featured ? 100 : 0)}
    />
  )
}
