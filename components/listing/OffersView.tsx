'use client'

import { ListingView, type FilterOption } from '@/components/listing/ListingView'
import { OfferCard } from '@/components/cards/OfferCard'
import { useApp } from '@/lib/store'
import { OFFER_CATEGORY_LABELS, type Offer } from '@/types'

const categoryOptions: FilterOption[] = Object.entries(OFFER_CATEGORY_LABELS).map(
  ([value, label]) => ({ value, label })
)

export function OffersView() {
  const { offers } = useApp()

  return (
    <ListingView<Offer>
      items={offers}
      config={{
        title: 'Offers & Deals',
        eyebrow: 'Offers',
        description:
          'Free programs, fellowship opportunities, and developer resources worth claiming. Each offer includes a step-by-step guide to get it.',
        categoryLabel: 'Category',
        categoryOptions,
        itemLabel: 'offers',
      }}
      renderCard={(o) => <OfferCard offer={o} />}
      getCategory={(o) => o.category}
      getUpvotes={(o) => o.upvotes}
      getBookmarks={(o) => o.bookmarks}
      getCreatedAt={(o) => o.createdAt}
      getTrendingScore={(o) => o.upvotes + (o.featured ? 100 : 0)}
    />
  )
}