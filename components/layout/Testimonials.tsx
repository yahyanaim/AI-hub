import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react'

interface Testimonial {
  quote: string
  name: string
  role: string
}

// Sample quotes — replace with real community testimonials when available.
const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'I found three AI tools in one evening that replaced paid subscriptions I had for months. AI Hunt is now my first stop.',
    name: 'Yasmine',
    role: 'Startup founder · Casablanca',
  },
  {
    quote: 'The step-by-step offer guides actually work. Claimed cloud credits on my first try.',
    name: 'Mehdi',
    role: 'Full-stack developer · Rabat',
  },
  {
    quote: 'Best directory for free dev resources. The courses section alone saved my semester.',
    name: 'Salma',
    role: 'CS student · Marrakech',
  },
  {
    quote: 'As a freelancer, the AI perks section paid for itself many times over.',
    name: 'Omar',
    role: 'Freelance designer · Tangier',
  },
  {
    quote: 'Clean, fast, no ads. I send every junior on my team here first.',
    name: 'Khadija',
    role: 'Engineering lead · Agadir',
  },
  {
    quote: 'The editing tools collection replaced five bookmarks I used daily.',
    name: 'Anas',
    role: 'Content creator · Fes',
  },
]

function initials(name: string) {
  return name.slice(0, 1).toUpperCase()
}

function PostCard({ t, hidden }: { t: Testimonial; hidden?: boolean }) {
  return (
      <article
      aria-hidden={hidden}
      className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-xl"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-navy font-heading text-base font-bold text-white"
        >
          {initials(t.name)}
        </span>
        <div className="min-w-0">
          <div className="truncate text-sm font-bold text-foreground">{t.name}</div>
          <div className="truncate text-xs text-muted-foreground">{t.role}</div>
        </div>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">&ldquo;{t.quote}&rdquo;</p>
      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-foreground">
        <div className="flex items-center gap-4">
          <Heart className="h-5 w-5 cursor-pointer transition hover:scale-110 hover:text-red-500" aria-label="Like" />
          <MessageCircle className="h-5 w-5 cursor-pointer transition hover:scale-110" aria-label="Comment" />
          <Send className="h-5 w-5 cursor-pointer transition hover:scale-110" aria-label="Share" />
        </div>
        <Bookmark className="h-5 w-5 cursor-pointer transition hover:scale-110" aria-label="Save" />
      </div>
    </article>
  )
}

export function Testimonials() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]
  return (
    <section aria-label="Trusted by founders across the ecosystem" className="relative mt-12">
      <h2 className="text-center font-heading text-2xl font-bold text-foreground md:text-3xl">
        Trusted by founders across the ecosystem
      </h2>
      <div className="group relative mt-8 overflow-hidden" role="region" aria-roledescription="carousel">
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
            {loop.map((t, i) => (
              <div key={`${t.name}-${i}`} role="group" aria-roledescription="slide" className="w-[320px] shrink-0 grow-0 px-3 md:w-[480px]">
                <PostCard t={t} hidden={i >= TESTIMONIALS.length} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
