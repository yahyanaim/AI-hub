'use client'

import { ListingView, type FilterOption } from '@/components/listing/ListingView'
import { OfferCard } from '@/components/cards/OfferCard'
import { useApp } from '@/lib/store'
import { OFFER_CATEGORY_LABELS, type Offer } from '@/types'

const categoryOptions: FilterOption[] = Object.entries(OFFER_CATEGORY_LABELS).map(
  ([value, label]) => ({ value, label })
)

export function OffersView() {
  const { offers, offersLang, setOffersLang } = useApp()
  const isAr = offersLang === 'ar'

  return (
    <div dir={isAr ? 'rtl' : 'ltr'}>
      <div className="container-page">
        <div className="flex justify-end pt-4">
          <div className="inline-flex rounded-full border border-border bg-muted p-1 text-sm">
            <button
              onClick={() => setOffersLang('en')}
              className={`rounded-full px-4 py-1.5 font-medium transition ${!isAr ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              aria-pressed={!isAr}
            >
              EN
            </button>
            <button
              onClick={() => setOffersLang('ar')}
              className={`rounded-full px-4 py-1.5 font-medium transition ${isAr ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              aria-pressed={isAr}
            >
              عربي
            </button>
          </div>
        </div>
      </div>
      <ListingView<Offer>
        items={offers}
        config={{
          title: isAr ? 'العروض والصفقات' : 'Offers & Deals',
          eyebrow: isAr ? 'العروض' : 'Offers',
          description: isAr
            ? 'برامج مجانية وأدوات للمطورين ووصول API يستحق الحصول عليه. كل عرض يأتي مع دليل خطوة بخطوة بالعربية والإنجليزية — مع مسار للطلاب وغير الطلاب وكيفية الحصول على إثبات طالب.'
            : 'Free programs, developer tools, and API access worth claiming. Each offer includes a step-by-step guide showing exactly how to get it — student vs non-student paths + how to get EDU proof.',
          categoryLabel: isAr ? 'الفئة' : 'Category',
          categoryOptions,
          itemLabel: isAr ? 'عرض' : 'offers',
        }}
        renderCard={(o) => <OfferCard offer={o} lang={offersLang} />}
        getCategory={(o) => o.category}
        getUpvotes={(o) => o.upvotes}
        getBookmarks={(o) => o.bookmarks}
        getCreatedAt={(o) => o.createdAt}
        getTrendingScore={(o) => o.upvotes + (o.featured ? 100 : 0)}
      />
    </div>
  )
}