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
    quote: "🚀 J'ai trouvé mon stage en 2 semaines grâce à AI Hunt ! Après avoir exploré les outils IA et les cours, j'ai tout appris au même endroit.",
    name: 'Yasmine B. • 1st',
    role: 'CS Student',
    time: '2w •',
  },
  {
    quote: "💡 Les guides étape par étape pour les crédits cloud, c'est juste génial ! J'ai réclamé mes crédits Azure étudiants du premier coup. Merci AI Hunt 🙌",
    name: 'Mehdi R. • 1st',
    role: 'Full-stack Developer',
    time: '1mo •',
  },
  {
    quote: "😎 J'ai testé Union Alpha Free via OpenCode — gratuit pendant 7 jours, sans carte bancaire ! Une pépite pour les devs 👏",
    name: 'Salma E. • 2nd',
    role: 'AI Enthusiast',
    time: '1w •',
  },
  {
    quote: '🎓 En tant que freelance, la section AI Perks s\'est rentabilisée toute seule. Des outils que je paie maintenant zéro dirham !',
    name: 'Omar T. • 1st',
    role: 'Freelance Designer',
    time: '3w •',
  },
  {
    quote: "J'ai tout trouvé pour choisir les bons outils IA pour mon équipe ! La section dev-tools est une mine d'or.",
    name: 'Khadija M. • 2nd',
    role: 'Engineering Lead',
    time: '1mo •',
  },
  {
    quote: 'Merci AI Hunt, une plateforme qui va beaucoup aider les étudiants ! 🎓 Simple, rapide, gratuit. Efficacité au top !',
    name: 'Anas K. • 1st',
    role: 'Content Creator',
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

function PostCard({ post }: { post: WallPost }) {
  return (
    <article className="mx-auto h-full w-full max-w-lg rounded-lg border border-gray-200 bg-white p-4 pb-1 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
      <div className="mb-3 flex gap-3">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-navy font-heading text-sm font-bold text-white"
        >
          {initials(post.name)}
        </span>
        <div className="flex min-w-0 flex-col leading-tight">
          <div className="cursor-pointer truncate text-[15px] font-semibold text-gray-900 hover:text-blue-600">
            {post.name}
          </div>
          <div className="truncate text-sm text-gray-500">{post.role}</div>
          <div className="mt-[2px] text-xs text-gray-500">{post.time}</div>
        </div>
      </div>
      <p className="mb-3 text-left text-sm leading-relaxed text-gray-900">
        {post.quote}{' '}
        <span className="ml-1 cursor-pointer font-medium text-gray-500 hover:text-gray-700">
          ...see more
        </span>
      </p>
      <div className="flex items-center justify-between border-b border-gray-100 py-2 text-xs text-gray-500">
        <span>0 likes</span>
        <span>0 comments</span>
      </div>
      <div className="flex items-center justify-between px-2 py-1.5 text-gray-500">
        <span className="flex cursor-pointer items-center gap-1.5 text-[13px] font-medium hover:text-gray-900">
          <ThumbsUp className="h-4 w-4" /> Like
        </span>
        <span className="flex cursor-pointer items-center gap-1.5 text-[13px] font-medium hover:text-gray-900">
          <MessageCircle className="h-4 w-4" /> Comment
        </span>
        <span className="flex cursor-pointer items-center gap-1.5 text-[13px] font-medium hover:text-gray-900">
          <Repeat2 className="h-4 w-4" /> Share
        </span>
        <span className="flex cursor-pointer items-center gap-1.5 text-[13px] font-medium hover:text-gray-900">
          <Send className="h-4 w-4" /> Send
        </span>
      </div>
    </article>
  )
}

export function Testimonials() {
  return (
    <section aria-label="Wall of Love" className="mx-auto mt-16 max-w-5xl px-4 text-center md:mt-20">
      <h2
        className="mb-4 font-heading font-bold text-foreground"
        style={{ fontSize: 'clamp(30px, 4.5vw, 50px)', lineHeight: 1.15, letterSpacing: '-0.028em' }}
      >
        Wall of <span className="text-orange-500">Love</span>
      </h2>
      <p
        className="mx-auto mb-10 max-w-2xl font-normal text-black/60 dark:text-white/60"
        style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', lineHeight: 1.72 }}
      >
        What the community says about their experience on AI Hunt
      </p>
      <div className="grid grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((post) => (
          <PostCard key={post.name} post={post} />
        ))}
      </div>
    </section>
  )
}
