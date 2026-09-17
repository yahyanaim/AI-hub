import { Star, Quote } from 'lucide-react'

interface Testimonial {
  quote: string
  name: string
  role: string
}

// Sample quotes — replace with real community testimonials when available.
const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'I found three AI tools in one evening that replaced paid subscriptions I had for months.',
    name: 'Yasmine',
    role: 'Startup founder, Casablanca',
  },
  {
    quote: 'The step-by-step offer guides actually work. Claimed cloud credits on my first try.',
    name: 'Mehdi',
    role: 'Full-stack developer, Rabat',
  },
  {
    quote: 'Best directory for free dev resources. The courses section alone saved my semester.',
    name: 'Salma',
    role: 'CS student, Marrakech',
  },
  {
    quote: 'As a freelancer, the AI perks section paid for itself many times over.',
    name: 'Omar',
    role: 'Freelance designer, Tangier',
  },
  {
    quote: 'Clean, fast, no ads. I send every junior on my team here first.',
    name: 'Khadija',
    role: 'Engineering lead, Agadir',
  },
  {
    quote: 'The editing tools collection replaced five bookmarks I used daily.',
    name: 'Anas',
    role: 'Content creator, Fes',
  },
]

function Stars() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

export function Testimonials() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS]
  return (
    <section aria-label="Community testimonials" className="relative mt-12 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-orange via-[#e65c00] to-[#cc5200] px-6 py-10 md:py-12">
      <Quote className="pointer-events-none absolute -top-2 left-6 h-20 w-20 text-white/10" aria-hidden="true" />
      <h2 className="text-center font-heading text-2xl font-bold text-white md:text-3xl">
        Loved by builders across Morocco
      </h2>
      <p className="mt-2 text-center text-sm text-white/80">
        Real feedback from the AI Hunt community
      </p>
      <div className="group relative mt-8 overflow-hidden" role="region" aria-roledescription="carousel">
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
            {loop.map((t, i) => (
              <div key={`${t.name}-${i}`} role="group" aria-roledescription="slide" className="w-80 shrink-0 grow-0 px-3 md:w-96">
                <figure
                  aria-hidden={i >= TESTIMONIALS.length}
                  className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-lg"
                >
                  <Stars />
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 border-t border-slate-100 pt-3">
                    <div className="text-sm font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
