import Link from 'next/link'
import { SEED_TOOLS, SEED_DEV_TOOLS } from '@/lib/seed'

interface MarqueeItem {
  href: string
  name: string
  logoUrl: string
}

const ROW_ONE: MarqueeItem[] = [...SEED_TOOLS]
  .sort((a, b) => b.upvotes - a.upvotes)
  .slice(0, 10)
  .map((t) => ({ href: `/tools/${t.category}/${t.slug}`, name: t.name, logoUrl: t.logoUrl }))

const ROW_TWO: MarqueeItem[] = [...SEED_DEV_TOOLS]
  .sort((a, b) => b.upvotes - a.upvotes)
  .slice(0, 10)
  .map((t) => ({ href: `/dev-tools/${t.category}/${t.slug}`, name: t.name, logoUrl: t.logoUrl }))

function LogoRow({ items, reverse = false }: { items: MarqueeItem[]; reverse?: boolean }) {
  const loop = [...items, ...items, ...items, ...items]
  return (
    <div className="group relative overflow-hidden" role="region" aria-roledescription="carousel" aria-label="Top tools">
      <div className="overflow-hidden">
        <div className={`flex w-max motion-reduce:animate-none group-hover:[animation-play-state:paused] ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
          {loop.map((item, i) => (
            <div key={`${item.href}-${i}`} role="group" aria-roledescription="slide" className="shrink-0 grow-0 px-3">
              <Link
                href={item.href}
                aria-hidden={i >= items.length}
                tabIndex={i >= items.length ? -1 : undefined}
                title={item.name}
                className="flex shrink-0 items-center gap-2 opacity-50 grayscale drop-shadow-xl transition duration-300 hover:opacity-100 hover:grayscale-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- tiny remote favicons in a decorative marquee */}
                <img src={item.logoUrl} alt="" loading="lazy" className="h-8 w-8 shrink-0 object-contain" />
                <span className="whitespace-nowrap text-sm font-semibold text-foreground">{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PartnersMarquee() {
  return (
    <section aria-label="Top tools and perks" className="relative mt-12 py-10">
      <div className="mx-auto max-w-6xl space-y-8 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <LogoRow items={ROW_ONE} />
        <LogoRow items={ROW_TWO} reverse />
      </div>
    </section>
  )
}
