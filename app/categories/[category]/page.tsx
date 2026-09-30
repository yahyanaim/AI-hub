import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

// Redirect-only route: middleware.ts serves a real 308 for /categories/<cat>,
// so this page is only a runtime fallback.
// NOTE: keep `generateMetadata` minimal — this route ships no indexable content.
export const dynamic = 'force-dynamic'

const CATEGORY_TO_TYPE: Record<string, string> = {
  coding: '/tools',
  writing: '/tools',
  image: '/tools',
  video: '/tools',
  audio: '/tools',
  productivity: '/tools',
  research: '/tools',
  marketing: '/tools',
  data: '/tools',
  agents: '/tools',
  education: '/tools',
  ide: '/prompts',
  debugging: '/prompts',
  testing: '/prompts',
  'ci-cd': '/prompts',
  monitoring: '/prompts',
  database: '/prompts',
  api: '/prompts',
  cli: '/prompts',
  containers: '/prompts',
  collaboration: '/prompts',
  llm: '/edittools',
  'fine-tuning': '/edittools',
  tooling: '/edittools',
  datasets: '/edittools',
  evaluation: '/edittools',
  'ui-frameworks': '/edittools',
  infrastructure: '/edittools',
  rag: '/edittools',
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const cat = params.category
  const name = cat.charAt(0).toUpperCase() + cat.slice(1)
  return {
    title: `${name} Tools & Resources`,
    robots: { index: false, follow: false },
  }
}

export default function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const type = CATEGORY_TO_TYPE[params.category]
  if (type) {
    redirect(`${type}?category=${params.category}`)
  }
  redirect('/tools')
}
