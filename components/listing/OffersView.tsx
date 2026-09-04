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
    <>
      <div className="container-page pt-2 text-center text-xs text-muted-foreground">
        مرّر فوق أي نص للترجمة للعربية · Hover any text to see Arabic · انقر على الجوال للتبديل
      </div>
      <ListingView<Offer>
        items={offers}
        config={{
          title: 'Offers & Deals',
          eyebrow: 'Offers',
          description:
            'Free programs, developer tools, and API access worth claiming. Each offer includes a step-by-step guide - student vs non-student paths + how to get EDU proof. Hover any title or description to auto-translate to Arabic.',
          categoryLabel: 'Category',
          categoryOptions,
          itemLabel: 'offers',
          defaultSort: 'new',
        }}
        renderCard={(o) => <OfferCard offer={o} />}
        getCategory={(o) => o.category}
        getUpvotes={(o) => o.upvotes}
        getBookmarks={(o) => o.bookmarks}
        getCreatedAt={(o) => o.createdAt}
        getTrendingScore={(o) => o.upvotes + (o.featured ? 100 : 0)}
      />
    </>
  )
}