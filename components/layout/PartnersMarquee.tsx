import Link from 'next/link'
import { SEED_TOOLS, SEED_DEV_TOOLS } from '@/lib/seed'

interface MarqueeItem {
  href: string
  name: string
  logoUrl: string
}

// Top-voted entries keep the strip fresh as the directory grows.
const ROW_ONE: MarqueeItem[] = [...SEED_TOOLS]
  .sort((a, b) => b.upvotes - a.upvotes)
  .slice(0, 10)
  .map((t) => ({ href: `/tools/${t.category}/${t.slug}`, name: t.name, logoUrl: t.logoUrl }))

const ROW_TWO: MarqueeItem[] = [...SEED_DEV_TOOLS]
  .sort((a, b) => b.upvotes - a.upvotes)
  .slice(0, 10)
  .map((t) => ({ href: `/dev-tools/${t.category}/${t.slug}`, name: t.name, logoUrl: t.logoUrl }))

function MarqueeRow({ items, reverse = false }: { items: MarqueeItem[]; reverse?: boolean }) {
  const loop = [...items, ...items]

  return (
    <div className="group relative overflow-hidden" role="region" aria-roledescription="carousel">
      <div className="overflow-hidden">
        <div
          className={`mt-4 flex w-max motion-reduce:animate-none ${
            reverse ? 'animate-marquee-reverse' : 'animate-marquee'
          } group-hover:[animation-play-state:paused]`}
        >
          {loop.map((item, i) => (
            <div key={`${item.href}-${i}`} role="group" aria-roledescription="slide" className="min-w-0 shrink-0 grow-0 basis-auto pl-16">
              <Link
                href={item.href}
                aria-hidden={i >= items.length}
                tabIndex={i >= items.length ? -1 : undefined}
                title={item.name}
                className="flex shrink-0 items-center gap-2.5 opacity-90 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- tiny remote favicons in a decorative marquee; next/image cost not justified */}
                <img
                  src={item.logoUrl}
                  alt=""
                  loading="lazy"
                  className="h-8 w-8 object-contain"
                />
                <span
                  className="whitespace-nowrap font-sans font-medium text-black/55 dark:text-white/60"
                  style={{ fontSize: '17px', letterSpacing: '-0.01em' }}
                >
                  {item.name}
                </span>
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
    <section aria-label="Top tools on AI Hunt" className="relative mt-8 md:mt-12">
      <div className="mb-6 mt-16 flex items-center justify-center gap-4">
        <div className="h-px max-w-[80px] flex-1 bg-gradient-to-r from-transparent to-foreground/10" />
        <p className="text-center font-sans text-sm font-medium text-muted-foreground">
          Loved by builders using the best AI tools
        </p>
        <div className="h-px max-w-[80px] flex-1 bg-gradient-to-l from-transparent to-foreground/10" />
      </div>
      <div className="mx-auto max-w-5xl [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <MarqueeRow items={ROW_ONE} />
        <MarqueeRow items={ROW_TWO} reverse />
      </div>
    </section>
  )
}
