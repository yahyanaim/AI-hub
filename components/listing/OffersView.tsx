'use client'
import { ListingView, ListingCrawlLinks, type FilterOption } from '@/components/listing/ListingView'
import { OfferCard } from '@/components/cards/OfferCard'
import { useApp } from '@/lib/store'
import { OFFER_CATEGORY_LABELS, type Offer } from '@/types'
import { GUIDES_ENABLED, isPaidGuide } from '@/lib/guides'
import { offerTrendingScore } from '@/lib/listing-order'
import { useRouter } from 'next/navigation'
const categoryOptions: FilterOption[] = Object.entries(OFFER_CATEGORY_LABELS).map(
  ([value, label]) => ({ value, label })
)
export function OffersView({
  initialCategory,
  initialItems = [],
}: {
  initialCategory?: string
  initialItems?: Offer[]
}) {
  const { offers } = useApp()
  const router = useRouter()
  // Server-prerendered first page (see lib/listing-order.ts). Guides stay hidden
  // from it while GUIDES_ENABLED is false, matching the client filter below.
  const source = offers.length ? offers : initialItems
  const visibleOffers = GUIDES_ENABLED ? source : source.filter((o) => !isPaidGuide(o))
  return (
    <>
      <div className="container-page pt-2 text-center text-xs text-muted-foreground">
        مرّر فوق أي نص للترجمة للعربية · Hover any text to see Arabic · انقر على الجوال للتبديل
      </div>
        {/* Server-rendered crawl links: cards open modals on plain click, so
            this invisible nav is what ships real item URLs to non-JS crawlers. */}
        <ListingCrawlLinks
          items={visibleOffers}
          label="Offers quick links"
          getHref={(o) => `/offers/${o.category}/${o.slug}`}
        />
    <ListingView<Offer>
      items={visibleOffers}
      config={{
      title: 'Offers & Deals',
      eyebrow: 'Offers',
      description:
      'Free programs, developer tools, and API access worth claiming. Each offer includes a step-by-step guide - student vs non-student paths + how to get EDU proof. Hover any title or description to auto-translate to Arabic.',
      categoryLabel: 'Category',
      categoryOptions,
      itemLabel: 'offers',
      defaultSort: 'new',
      initialCategory,
      onCategoryChange: (cat) => {
      router.push(cat === 'all' ? '/offers' : `/offers/${cat}`)
      },
      }}
      renderCard={(o) => <OfferCard offer={o} />}
      getCategory={(o) => o.category}
      getUpvotes={(o) => o.upvotes}
      getBookmarks={(o) => o.bookmarks}
      getCreatedAt={(o) => o.createdAt}
      getTrendingScore={offerTrendingScore}
    />
    </>
  )
}
