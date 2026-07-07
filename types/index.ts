// ============================================================
// AI Hunt — Core domain types
// ============================================================

export type ToolCategory =
  | 'writing'
  | 'coding'
  | 'image'
  | 'video'
  | 'audio'
  | 'productivity'
  | 'research'
  | 'marketing'
  | 'data'
  | 'agents'
  | 'sales-leads'
  | 'automation'
  | 'social-community'
  | 'design-ui-ux'
  | 'finance'
  | 'api-backend'
  | 'engineering-data'
  | 'no-code'
  | 'open-source-ai'
  | 'seo'
  | 'free-alternatives'
  | 'other'

export type DevToolCategory =
  | 'ide'
  | 'debugging'
  | 'testing'
  | 'ci-cd'
  | 'monitoring'
  | 'database'
  | 'api'
  | 'cli'
  | 'containers'
  | 'collaboration'
  | 'library'
  | 'framework'
  | 'starter-pack'
  | 'templates'
  | 'hosting'
  | 'conception'
  | 'other'

export type EditToolCategory =
  | 'pdf'
  | 'image-editing'
  | 'converter'
  | 'design'
  | 'video'
  | 'text'
  | 'file'
  | 'other'

export type Pricing = 'free' | 'freemium' | 'paid' | 'open-source'

export type ItemType = 'tool' | 'devtool' | 'prompt' | 'repo' | 'course'

export interface DevTool {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  url: string
  logoUrl: string
  category: DevToolCategory
  tags: string[]
  pricing: Pricing
  upvotes: number
  bookmarks: number
  submittedBy: string
  featured: boolean
  featuredDate?: string
  createdAt: string
  updatedAt: string
  tools?: string[]
}

export interface Tool {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  url: string
  logoUrl: string
  category: ToolCategory
  tags: string[]
  pricing: Pricing
  upvotes: number
  bookmarks: number
  submittedBy: string
  featured: boolean
  featuredDate?: string
  createdAt: string
  updatedAt: string
  screenshots?: string[]
  relatedDevTools?: string[]
  relatedRepos?: string[]
}

export interface Prompt {
  id: string
  slug: string
  title: string
  description: string
  promptText: string
  model: string[]
  category: string
  tags: string[]
  upvotes: number
  copies: number
  submittedBy: string
  featured: boolean
  variables?: Array<{ name: string; description: string; defaultValue?: string }>
  exampleOutput?: string
  createdAt: string
  updatedAt: string
}

export type CourseCategory =
  | 'fullstack'
  | 'backend'
  | 'frontend'
  | 'testing'
  | 'cloud'
  | 'data-science'
  | 'prompt-engineering'
  | 'ai-engineering'
  | 'python'
  | 'computer-science'
  | 'cybersecurity'
  | 'math'
  | 'writing'
  | 'automation'

export interface RoadmapStep {
  title: string
  topics: string[]
  duration: string
  url?: string
  description?: string
}

export interface Course {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  url: string
  logoUrl: string
  category: CourseCategory
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  pricing: Pricing
  roadmap: RoadmapStep[]
  upvotes: number
  bookmarks: number
  submittedBy: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface Repo {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  url: string
  logoUrl: string
  category: EditToolCategory
  tags: string[]
  pricing: Pricing
  upvotes: number
  bookmarks: number
  submittedBy: string
  featured: boolean
  featuredDate?: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  username: string
  displayName: string
  avatarUrl?: string
  bio?: string
  website?: string
  twitterHandle?: string
  githubHandle?: string
  upvotedItems: string[]
  bookmarkedItems: string[]
  submittedTools: string[]
  submittedDevTools: string[]
  submittedRepos: string[]
  karma: number
  createdAt: string
}

export type AnyItem = Tool | Repo | DevTool

export interface Comment {
  id: string
  itemId: string
  userId: string
  body: string
  createdAt: string
}

// ============================================================
// Label / display maps
// ============================================================

export const TOOL_CATEGORY_LABELS: Record<ToolCategory, string> = {
  writing: 'Writing',
  coding: 'Coding',
  image: 'Image',
  video: 'Video',
  audio: 'Audio',
  productivity: 'Productivity',
  research: 'Research',
  marketing: 'Marketing',
  data: 'Data',
  agents: 'Agents',
  'sales-leads': 'Sales & Leads',
  automation: 'AI Automation',
  'social-community': 'Social Community',
  'design-ui-ux': 'Design UI/UX',
  finance: 'Finance',
  'api-backend': 'API Backend',
  'engineering-data': 'Engineering & Data',
  'no-code': 'No Code Platform',
  'open-source-ai': 'Open Source AI',
  seo: 'SEO Tools',
  'free-alternatives': 'Free Alternative AI Tools',
  other: 'Other',
}

export const DEVTOOL_CATEGORY_LABELS: Record<DevToolCategory, string> = {
  ide: 'IDE',
  debugging: 'Debugging',
  testing: 'Testing',
  'ci-cd': 'CI/CD',
  monitoring: 'Monitoring',
  database: 'Database',
  api: 'API',
  cli: 'CLI',
  containers: 'Containers',
  collaboration: 'Collaboration',
  library: 'Library',
  framework: 'Framework',
  'starter-pack': 'Starter Packs',
  templates: 'Templates',
  hosting: 'Hosting & VPS',
  conception: 'Conception',
  other: 'Other',
}

export const REPO_CATEGORY_LABELS: Record<EditToolCategory, string> = {
  pdf: 'PDF',
  'image-editing': 'Image',
  converter: 'Converter',
  design: 'Design',
  video: 'Video',
  text: 'Text',
  file: 'File',
  other: 'Other',
}

export const COURSE_CATEGORY_LABELS: Record<CourseCategory, string> = {
  fullstack: 'Fullstack',
  backend: 'Back End',
  frontend: 'Front End',
  testing: 'Testing',
  cloud: 'Cloud (AWS & Oracle)',
  'data-science': 'Data Science',
  'prompt-engineering': 'Prompt Engineering',
  'ai-engineering': 'AI Engineering',
  python: 'Python',
  'computer-science': 'Computer Science',
  cybersecurity: 'Cybersecurity',
  math: 'Math',
  writing: 'Writing & Communication',
  automation: 'Automation & No-Code',
}

export const PRICING_LABELS: Record<Pricing, string> = {
  free: 'Free',
  freemium: 'Freemium',
  paid: 'Paid',
  'open-source': 'Open Source',
}
