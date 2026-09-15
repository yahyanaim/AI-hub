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
  { slug: 'chatgpt', name: 'ChatGPT', category: 'other', logoUrl: 'https://www.google.com/s2/favicons?domain=chatgpt.com&sz=128' },
  { slug: 'claude', name: 'Claude', category: 'other', logoUrl: 'https://www.google.com/s2/favicons?domain=claude.ai&sz=128' },
  { slug: 'gemini', name: 'Gemini', category: 'research', logoUrl: 'https://www.google.com/s2/favicons?domain=gemini.google.com&sz=128' },
  { slug: 'cursor', name: 'Cursor', category: 'coding', logoUrl: 'https://www.google.com/s2/favicons?domain=cursor.com&sz=128' },
  { slug: 'perplexity', name: 'Perplexity', category: 'research', logoUrl: 'https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128' },
  { slug: 'midjourney', name: 'Midjourney', category: 'image', logoUrl: 'https://www.google.com/s2/favicons?domain=midjourney.com&sz=128' },
  { slug: 'github-copilot', name: 'GitHub Copilot', category: 'coding', logoUrl: 'https://www.google.com/s2/favicons?domain=github.com&sz=128' },
  { slug: 'hugging-face', name: 'Hugging Face', category: 'data', logoUrl: 'https://www.google.com/s2/favicons?domain=huggingface.co&sz=128' },
  { slug: 'runway', name: 'Runway', category: 'video', logoUrl: 'https://www.google.com/s2/favicons?domain=runwayml.com&sz=128' },
  { slug: 'elevenlabs', name: 'ElevenLabs', category: 'audio', logoUrl: 'https://www.google.com/s2/favicons?domain=elevenlabs.io&sz=128' },
  { slug: 'suno', name: 'Suno', category: 'audio', logoUrl: 'https://www.google.com/s2/favicons?domain=suno.com&sz=128' },
  { slug: 'notion-ai', name: 'Notion AI', category: 'productivity', logoUrl: 'https://www.google.com/s2/favicons?domain=notion.so&sz=128' },
  { slug: 'gamma', name: 'Gamma', category: 'productivity', logoUrl: 'https://www.google.com/s2/favicons?domain=gamma.app&sz=128' },
  { slug: 'synthesia', name: 'Synthesia', category: 'video', logoUrl: 'https://www.google.com/s2/favicons?domain=synthesia.io&sz=128' },
  { slug: 'leonardo-ai', name: 'Leonardo.ai', category: 'image', logoUrl: 'https://www.google.com/s2/favicons?domain=leonardo.ai&sz=128' },
  { slug: 'jasper', name: 'Jasper', category: 'marketing', logoUrl: 'https://www.google.com/s2/favicons?domain=jasper.ai&sz=128' },
  { slug: 'copy-ai', name: 'Copy.ai', category: 'marketing', logoUrl: 'https://www.google.com/s2/favicons?domain=copy.ai&sz=128' },
  { slug: 'descript', name: 'Descript', category: 'video', logoUrl: 'https://www.google.com/s2/favicons?domain=descript.com&sz=128' },
  { slug: 'otter-ai', name: 'Otter.ai', category: 'productivity', logoUrl: 'https://www.google.com/s2/favicons?domain=otter.ai&sz=128' },
  { slug: 'grammarly', name: 'Grammarly', category: 'writing', logoUrl: 'https://www.google.com/s2/favicons?domain=grammarly.com&sz=128' },
]

export function ToolsMarquee() {
  const loop = [...MARQUEE_TOOLS, ...MARQUEE_TOOLS]

  return (
    <section aria-label="Popular AI tools" className="relative mt-8 md:mt-12">
      <div className="mb-6 mt-16 flex items-center justify-center gap-4">
        <div className="h-px max-w-[80px] flex-1 bg-gradient-to-r from-transparent to-foreground/10" />
        <p
          className="text-center font-geist font-medium text-muted-foreground"
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
