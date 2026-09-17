import Link from 'next/link'
import { SEED_TOOLS, SEED_DEV_TOOLS, SEED_OFFERS } from '@/lib/seed'
import { Logo } from '@/components/ui/Logo'

interface MarqueeItem {
  href: string
  name: string
  logoUrl: string
}

const LOGO_ROW: MarqueeItem[] = [
  ...[...SEED_TOOLS]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 6)
    .map((t) => ({ href: `/tools/${t.category}/${t.slug}`, name: t.name, logoUrl: t.logoUrl })),
  ...[...SEED_DEV_TOOLS]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 6)
    .map((t) => ({ href: `/dev-tools/${t.category}/${t.slug}`, name: t.name, logoUrl: t.logoUrl })),
]

const PERK_ROW = [...SEED_OFFERS]
  .sort((a, b) => b.upvotes - a.upvotes)
  .slice(0, 8)
  .map((o) => ({
    href: `/offers/${o.category}/${o.slug}`,
    name: o.name,
    tagline: o.tagline,
    logoUrl: o.logoUrl,
  }))

function LogoRow({ items }: { items: MarqueeItem[] }) {
  const loop = [...items, ...items, ...items, ...items]
  return (
    <div className="group relative overflow-hidden" role="region" aria-roledescription="carousel" aria-label="Top tools">
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
          {loop.map((item, i) => (
            <div key={`${item.href}-${i}`} role="group" aria-roledescription="slide" className="shrink-0 grow-0 px-4">
              <Link
                href={item.href}
                aria-hidden={i >= items.length}
                tabIndex={i >= items.length ? -1 : undefined}
                title={item.name}
                className="flex shrink-0 items-center gap-2.5 opacity-90 transition duration-300 hover:opacity-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- tiny remote favicons in a decorative marquee */}
                <img src={item.logoUrl} alt="" loading="lazy" className="h-12 w-12 shrink-0 object-contain" />
                <span className="truncate text-sm font-semibold text-foreground">{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PerkRow({ items }: { items: typeof PERK_ROW }) {
  const loop = [...items, ...items]
  return (
    <div className="group relative overflow-hidden" role="region" aria-roledescription="carousel" aria-label="Featured perks">
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee-reverse motion-reduce:animate-none group-hover:[animation-play-state:paused]">
          {loop.map((item, i) => (
            <div key={`${item.href}-${i}`} role="group" aria-roledescription="slide" className="w-96 shrink-0 grow-0 px-4">
              <Link
                href={item.href}
                aria-hidden={i >= items.length}
                tabIndex={i >= items.length ? -1 : undefined}
                className="flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Logo src={item.logoUrl} name={item.name} size={56} />
                <span className="min-w-0">
                  <span className="block truncate font-heading text-base font-bold text-foreground">{item.name}</span>
                  <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-muted-foreground">{item.tagline}</span>
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
    <section aria-label="Trusted across the AI ecosystem" className="relative mt-6 md:mt-8">
      <h2 className="text-center font-heading text-2xl font-bold text-foreground md:text-3xl">
        Trusted across the AI ecosystem
      </h2>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Top-rated tools and perks, ranked by the community
      </p>
      <div className="mx-auto mt-6 max-w-6xl space-y-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <LogoRow items={LOGO_ROW} />
        <PerkRow items={PERK_ROW} />
      </div>
    </section>
  )
}
