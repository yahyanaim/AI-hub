import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

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
  return {
    title: `${cat.charAt(0).toUpperCase() + cat.slice(1)}`,
    description: `Browse ${cat} AI tools, dev tools, and repos.`,
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
