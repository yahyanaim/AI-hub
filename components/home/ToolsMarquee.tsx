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
    <section aria-label="Popular AI tools" className="relative -mt-4 pb-2 md:-mt-8">
      <p className="mb-5 text-center font-heading text-base text-foreground">
        Loved by builders using the best AI tools
      </p>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {loop.map((tool, i) => (
            <Link
              key={`${tool.slug}-${i}`}
              href={`/tools/${tool.category}/${tool.slug}`}
              aria-hidden={i >= MARQUEE_TOOLS.length}
              tabIndex={i >= MARQUEE_TOOLS.length ? -1 : undefined}
              className="flex shrink-0 items-center gap-2.5 opacity-60 transition-opacity hover:opacity-100"
            >
              <img
                src={tool.logoUrl}
                alt=""
                loading="lazy"
                className="h-7 w-7 rounded-md object-contain"
              />
              <span className="whitespace-nowrap text-sm font-semibold text-foreground">
                {tool.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
