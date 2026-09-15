'use client'

import Link from 'next/link'

interface MarqueeTool {
  slug: string
  name: string
  category: string
  logoUrl: string
}

// 20 popular AI tools - logo strip under the hero (Jobzyn-style infinite marquee)
const MARQUEE_TOOLS: MarqueeTool[] = [
  { slug: 'chatgpt', name: 'ChatGPT', category: 'other', logoUrl: 'https://icons.duckduckgo.com/ip3/chatgpt.com.ico' },
  { slug: 'claude', name: 'Claude', category: 'other', logoUrl: 'https://icons.duckduckgo.com/ip3/claude.ai.ico' },
  { slug: 'gemini', name: 'Gemini', category: 'research', logoUrl: 'https://icons.duckduckgo.com/ip3/gemini.google.com.ico' },
  { slug: 'cursor', name: 'Cursor', category: 'coding', logoUrl: 'https://www.cursor.com/favicon.ico' },
  { slug: 'perplexity', name: 'Perplexity', category: 'research', logoUrl: 'https://icons.duckduckgo.com/ip3/perplexity.ai.ico' },
  { slug: 'midjourney', name: 'Midjourney', category: 'image', logoUrl: 'https://icons.duckduckgo.com/ip3/midjourney.com.ico' },
  { slug: 'github-copilot', name: 'GitHub Copilot', category: 'coding', logoUrl: 'https://icons.duckduckgo.com/ip3/github.com.ico' },
  { slug: 'hugging-face', name: 'Hugging Face', category: 'data', logoUrl: 'https://icons.duckduckgo.com/ip3/huggingface.co.ico' },
  { slug: 'runway', name: 'Runway', category: 'video', logoUrl: 'https://icons.duckduckgo.com/ip3/runwayml.com.ico' },
  { slug: 'elevenlabs', name: 'ElevenLabs', category: 'audio', logoUrl: 'https://icons.duckduckgo.com/ip3/elevenlabs.io.ico' },
  { slug: 'suno', name: 'Suno', category: 'audio', logoUrl: 'https://icons.duckduckgo.com/ip3/suno.com.ico' },
  { slug: 'notion-ai', name: 'Notion AI', category: 'productivity', logoUrl: 'https://icons.duckduckgo.com/ip3/notion.so.ico' },
  { slug: 'gamma', name: 'Gamma', category: 'productivity', logoUrl: 'https://icons.duckduckgo.com/ip3/gamma.app.ico' },
  { slug: 'synthesia', name: 'Synthesia', category: 'video', logoUrl: 'https://icons.duckduckgo.com/ip3/synthesia.io.ico' },
  { slug: 'leonardo-ai', name: 'Leonardo.ai', category: 'image', logoUrl: 'https://icons.duckduckgo.com/ip3/leonardo.ai.ico' },
  { slug: 'jasper', name: 'Jasper', category: 'marketing', logoUrl: 'https://icons.duckduckgo.com/ip3/jasper.ai.ico' },
  { slug: 'copy-ai', name: 'Copy.ai', category: 'marketing', logoUrl: 'https://icons.duckduckgo.com/ip3/copy.ai.ico' },
  { slug: 'descript', name: 'Descript', category: 'video', logoUrl: 'https://icons.duckduckgo.com/ip3/descript.com.ico' },
  { slug: 'otter-ai', name: 'Otter.ai', category: 'productivity', logoUrl: 'https://icons.duckduckgo.com/ip3/otter.ai.ico' },
  { slug: 'grammarly', name: 'Grammarly', category: 'writing', logoUrl: 'https://icons.duckduckgo.com/ip3/grammarly.com.ico' },
]

export function ToolsMarquee() {
  const loop = [...MARQUEE_TOOLS, ...MARQUEE_TOOLS]

  return (
    <section aria-label="Popular AI tools" className="relative mt-8 md:mt-12">
      <div className="mb-6 flex items-center justify-center gap-4">
        <div className="h-px max-w-[80px] flex-1 bg-gradient-to-r from-transparent to-foreground/10" />
        <p
          className="text-center font-sans font-medium text-muted-foreground"
          style={{ fontSize: '11px', letterSpacing: '0.03em', lineHeight: 1.4 }}
        >
          Loved by builders using the best AI tools
        </p>
        <div className="h-px max-w-[80px] flex-1 bg-gradient-to-l from-transparent to-foreground/10" />
      </div>
      <div className="mx-auto max-w-5xl [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="group relative overflow-hidden" role="region" aria-roledescription="carousel">
          <div className="mt-4 flex w-max animate-marquee [animation-duration:55s] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {loop.map((tool, i) => (
              <div key={`${tool.slug}-${i}`} role="group" aria-roledescription="slide" className="min-w-0 shrink-0 grow-0 basis-auto pl-16">
                <Link
                  href={`/tools/${tool.category}/${tool.slug}`}
                  aria-hidden={i >= MARQUEE_TOOLS.length}
                  tabIndex={i >= MARQUEE_TOOLS.length ? -1 : undefined}
                  title={tool.name}
                  className="block"
                >
                  <img
                    src={tool.logoUrl}
                    alt={tool.name}
                    loading="lazy"
                    className="h-16 w-auto object-contain grayscale opacity-70 transition duration-300 hover:grayscale-0 hover:opacity-100"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
