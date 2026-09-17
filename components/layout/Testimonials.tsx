import { ThumbsUp, MessageCircle, Repeat2, Send } from 'lucide-react'

interface WallPost {
  quote: string
  name: string
  role: string
  time: string
}

// Sample posts — replace with real community posts when available.
const POSTS: WallPost[] = [
  {
    quote: '🚀 J\'ai trouvé mon stage en 2 semaines grâce à AI Hunt ! Après avoir exploré les outils IA et les cours, j\'ai tout appris au même endroit. La plateforme m\'a bluffé par la qualité des ressources... see more',
    name: 'Yasmine B. • 1st',
    role: 'CS Student chez UM6P',
    time: '2w •',
  },
  {
    quote: '💡 Les guides étape par étape pour les crédits cloud, c\'est juste génial ! J\'ai réclamé mes crédits Azure étudiants du premier coup. Merci AI Hunt 🙌 ...see more',
    name: 'Mehdi R. • 1st',
    role: 'Full-stack Developer chez Fintech',
    time: '1mo •',
  },
  {
    quote: '😎 J\'ai eu l\'occasion de tester Union Alpha Free via OpenCode — gratuit pendant 7 jours, sans carte bancaire ! Une pépite pour les devs au Maroc 👏 ...see more',
    name: 'Salma E. • 2nd',
    role: 'AI Enthusiast',
    time: '1w •',
  },
  {
    quote: '🎓 En tant que freelance, la section AI Perks s\'est rentabilisée toute seule. Des dizaines d\'outils que je paie maintenant zéro dirham ! ...see more',
    name: 'Omar T. • 1st',
    role: 'Freelance Designer',
    time: '3w •',
  },
  {
    quote: 'J\'ai tout trouvé pour choisir les bons outils IA pour mon équipe ! Merci AI Hunt 🙌 La section dev-tools est une mine d\'or... see more',
    name: 'Khadija M. • 2nd',
    role: 'Engineering Lead',
    time: '1mo •',
  },
  {
    quote: 'Merci d\'avoir créé AI Hunt, une plateforme qui va beaucoup aider les étudiants ! 🎓 Simple, rapide, gratuit. Efficacité au top ! ...see more',
    name: 'Anas K. • 1st',
    role: 'Content Creator chez Media',
    time: '2mo •',
  },
]

function initials(name: string) {
  return name
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

function PostCard({ post, hidden }: { post: WallPost; hidden?: boolean }) {
  return (
    <article
      aria-hidden={hidden}
      className="flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-navy font-heading text-sm font-bold text-white"
        >
          {initials(post.name)}
        </span>
        <div className="min-w-0">
          <div className="truncate text-sm font-bold text-foreground">{post.name}</div>
          <div className="truncate text-xs text-muted-foreground">{post.role}</div>
          <div className="text-xs text-muted-foreground/70">{post.time}</div>
        </div>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">{post.quote}</p>
      <div className="mt-3 text-xs text-muted-foreground/70">0 comments</div>
      <div className="mt-2 flex items-center gap-5 border-t border-border/60 pt-2.5 text-muted-foreground">
        <span className="flex items-center gap-1.5 text-xs font-medium">
          <ThumbsUp className="h-4 w-4" /> Like
        </span>
        <span className="flex items-center gap-1.5 text-xs font-medium">
          <MessageCircle className="h-4 w-4" /> Comment
        </span>
        <span className="flex items-center gap-1.5 text-xs font-medium">
          <Repeat2 className="h-4 w-4" /> Share
        </span>
        <span className="flex items-center gap-1.5 text-xs font-medium">
          <Send className="h-4 w-4" /> Send
        </span>
      </div>
    </article>
  )
}

export function Testimonials() {
  const loop = [...POSTS, ...POSTS]
  return (
    <section aria-label="Wall of Love" className="relative mt-12">
      <h2 className="text-center font-heading text-2xl font-bold text-foreground md:text-3xl">
        Wall of Love
      </h2>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        What the community says about their experience on AI Hunt
      </p>
      <div className="group relative mt-8 overflow-hidden" role="region" aria-roledescription="carousel">
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
            {loop.map((post, i) => (
              <div key={`${post.name}-${i}`} role="group" aria-roledescription="slide" className="w-[340px] shrink-0 grow-0 px-3 md:w-[440px]">
                <PostCard post={post} hidden={i >= POSTS.length} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
