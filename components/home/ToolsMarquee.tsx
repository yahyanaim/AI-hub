'use client'

import Link from 'next/link'

interface MarqueeTool {
  slug: string
  name: string
  category: string
  logoUrl: string
}

// Row 1 - first 10 AI tools
const ROW_ONE: MarqueeTool[] = [
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
]

// Row 2 - next 10 AI tools (scrolls opposite direction)
const ROW_TWO: MarqueeTool[] = [
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

function MarqueeRow({ tools, reverse = false }: { tools: MarqueeTool[]; reverse?: boolean }) {
  const loop = [...tools, ...tools]

  return (
    <div className="group relative overflow-hidden" role="region" aria-roledescription="carousel">
      <div className="overflow-hidden">
        <div
          className={`mt-4 flex w-max motion-reduce:animate-none ${
            reverse ? 'animate-marquee-reverse' : 'animate-marquee'
          } group-hover:[animation-play-state:paused]`}
        >
          {loop.map((tool, i) => (
            <div key={`${tool.slug}-${i}`} role="group" aria-roledescription="slide" className="min-w-0 shrink-0 grow-0 basis-auto pl-16">
              <Link
                href={`/tools/${tool.category}/${tool.slug}`}
                aria-hidden={i >= tools.length}
                tabIndex={i >= tools.length ? -1 : undefined}
                title={tool.name}
                className="flex shrink-0 items-center gap-3 opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              >
                <img
                  src={tool.logoUrl}
                  alt=""
                  loading="lazy"
                  className="h-9 w-9 object-contain"
                />
                <span
                  className="whitespace-nowrap font-geist font-medium text-black/55"
                  style={{ fontSize: '19px', letterSpacing: '-0.01em' }}
                >
                  {tool.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ToolsMarquee() {
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
        <MarqueeRow tools={ROW_ONE} />
        <MarqueeRow tools={ROW_TWO} reverse />
      </div>
    </section>
  )
}
