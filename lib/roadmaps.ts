// ============================================================
// CS roadmap tracks (roadmap.sh-style, Mermaid-rendered).
//
// Every node links to a REAL course from the catalogue when one exists
// (courseSlug + courseCategory → /courses/<category>/<slug>). Nodes without
// a catalogue match fall back to a Coursera search (courseraQuery) — never
// a fabricated course. Keep in sync with lib/seed/courses.ts slugs.
// ============================================================

export interface RoadmapNode {
  id: string
  label: string
  hint: string
  courseSlug?: string
  courseCategory?: string
  courseraQuery?: string
}

export interface RoadmapTrack {
  id: string
  title: string
  tagline: string
  nodes: RoadmapNode[]
}

/** Public Coursera search — used only when no catalogue course covers a node. */
export function courseraUrl(query: string): string {
  return `https://www.coursera.org/search?query=${encodeURIComponent(query)}`
}

export function nodeHref(node: RoadmapNode): string {
  if (node.courseSlug && node.courseCategory) {
    return `/courses/${node.courseCategory}/${node.courseSlug}`
  }
  return courseraUrl(node.courseraQuery ?? node.label)
}

export function nodeSourceLabel(node: RoadmapNode): string {
  return node.courseSlug ? 'AI Hunt course' : 'Coursera'
}

export const ROADMAP_TRACKS: RoadmapTrack[] = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    tagline: 'HTML, CSS, JavaScript, frameworks and professional workflow.',
    nodes: [
      { id: 'html-css', label: 'HTML & CSS', hint: 'Responsive layouts and modern CSS.', courseSlug: 'responsive-web-design', courseCategory: 'frontend' },
      { id: 'js', label: 'JavaScript', hint: 'The language of the browser, in depth.', courseSlug: 'javascript30', courseCategory: 'frontend' },
      { id: 'frameworks', label: 'React & Next.js', hint: 'Components, routing and rendering.', courseSlug: 'learn-nextjs', courseCategory: 'frontend' },
      { id: 'meta', label: 'Meta Front-End Path', hint: 'Guided professional certificate track.', courseSlug: 'intro-to-frontend-dev-meta', courseCategory: 'frontend' },
      { id: 'workflow', label: 'Pro Workflow', hint: 'Tooling, testing and deployment habits.', courseSlug: 'frontend-engineering', courseCategory: 'frontend' },
      { id: 'portfolio', label: 'Portfolio Projects', hint: 'Ship 3 polished apps to get hired.', courseraQuery: 'front end web development capstone' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    tagline: 'APIs, databases, Java/Node and enterprise patterns.',
    nodes: [
      { id: 'node', label: 'Node.js Backend', hint: 'APIs, Express and async patterns.', courseSlug: 'backend-engineering-nodejs', courseCategory: 'backend' },
      { id: 'java', label: 'Java Core', hint: 'OOP, collections and JVM basics.', courseSlug: 'java-programming-mooc', courseCategory: 'backend' },
      { id: 'spring', label: 'Spring Boot', hint: 'Production Java services.', courseSlug: 'hyperskill-java-backend-spring-boot', courseCategory: 'backend' },
      { id: 'mongo', label: 'MongoDB + Node', hint: 'Document modeling and drivers.', courseSlug: 'mongodb-nodejs-developer-path', courseCategory: 'backend' },
      { id: 'enterprise', label: 'Enterprise MVC', hint: 'Large-app patterns with Laravel.', courseSlug: 'adding-enterprise-features-laravel', courseCategory: 'backend' },
      { id: 'system', label: 'System Design', hint: 'Scale APIs like a senior engineer.', courseSlug: 'system-design-primer', courseCategory: 'computer-science' },
    ],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Developer',
    tagline: 'Front to back: the complete web path.',
    nodes: [
      { id: 'web', label: 'Web Foundations', hint: 'HTML, CSS, JS and Git basics.', courseSlug: 'intro-to-web-dev-simplilearn', courseCategory: 'fullstack' },
      { id: 'odin', label: 'The Odin Project', hint: 'Full curriculum, project-based.', courseSlug: 'the-odin-project', courseCategory: 'fullstack' },
      { id: 'fso', label: 'Full Stack Open', hint: 'React, Node, testing and DevOps.', courseSlug: 'full-stack-open', courseCategory: 'fullstack' },
      { id: 'cert', label: 'Certified Path', hint: 'Structured certification track.', courseSlug: 'certified-full-stack-developer', courseCategory: 'fullstack' },
      { id: 'catalog', label: 'Codecademy Catalog', hint: 'Interactive web development track.', courseSlug: 'codecademy-web-development', courseCategory: 'fullstack' },
      { id: 'deploy', label: 'Ship & Deploy', hint: 'CI/CD, hosting and domains.', courseraQuery: 'full stack deployment devops' },
    ],
  },
  {
    id: 'python',
    title: 'Python Developer',
    tagline: 'From syntax to data, DevOps and automation.',
    nodes: [
      { id: 'essentials', label: 'Python Essentials', hint: 'Syntax, OOP and stdlib.', courseSlug: 'cisco-python-essentials', courseCategory: 'python' },
      { id: 'intro', label: 'Intro to Python', hint: 'Hands-on beginner track.', courseSlug: 'datacamp-intro-to-python', courseCategory: 'python' },
      { id: 'ds', label: 'Data Structures', hint: 'Lists, trees, graphs in Python.', courseSlug: 'python-data-structures', courseCategory: 'python' },
      { id: 'data-ai', label: 'Python for Data & AI', hint: 'NumPy, pandas and ML basics.', courseSlug: 'python-for-data-science-ai', courseCategory: 'python' },
      { id: 'devops', label: 'Python for DevOps', hint: 'Scripting, APIs and automation.', courseSlug: 'python-for-devops', courseCategory: 'python' },
      { id: 'projects', label: 'Real Projects', hint: 'Build and publish 3 tools.', courseraQuery: 'python projects portfolio' },
    ],
  },
  {
    id: 'data-science',
    title: 'Data Scientist',
    tagline: 'SQL, Python, statistics and machine learning.',
    nodes: [
      { id: 'sql', label: 'SQL', hint: 'Query any database with confidence.', courseSlug: 'sql-for-data-science-simplilearn', courseCategory: 'data-science' },
      { id: 'pandas', label: 'Pandas & Analysis', hint: 'Wrangle real datasets.', courseSlug: 'kaggle-pandas', courseCategory: 'data-science' },
      { id: 'analytics', label: 'Google Data Analytics', hint: 'Professional certificate path.', courseSlug: 'google-data-analytics', courseCategory: 'data-science' },
      { id: 'ml', label: 'Machine Learning', hint: 'The classic Stanford specialization.', courseSlug: 'machine-learning-specialization', courseCategory: 'data-science' },
      { id: 'mle', label: 'ML Engineering', hint: 'Ship models to production.', courseSlug: 'machine-learning-engineer', courseCategory: 'data-science' },
      { id: 'portfolio', label: 'Kaggle Portfolio', hint: 'Compete and publish notebooks.', courseraQuery: 'kaggle data science portfolio' },
    ],
  },
  {
    id: 'ai-engineering',
    title: 'AI Engineer',
    tagline: 'LLMs, agents, RAG and shipping AI products.',
    nodes: [
      { id: 'basics', label: 'AI For Everyone', hint: 'What AI can and cannot do.', courseSlug: 'ai-for-everyone', courseCategory: 'ai-engineering' },
      { id: 'genai', label: 'Generative AI Intro', hint: 'LLMs, prompts and use cases.', courseSlug: 'intro-to-generative-ai', courseCategory: 'ai-engineering' },
      { id: 'fastai', label: 'Practical Deep Learning', hint: 'Code-first neural networks.', courseSlug: 'fastai-practical-deep-learning', courseCategory: 'ai-engineering' },
      { id: 'roadmap', label: 'AI Engineering Roadmap', hint: 'RAG, agents and evals.', courseSlug: 'ai-engineering', courseCategory: 'ai-engineering' },
      { id: 'career', label: 'Microsoft AI Engineer', hint: 'Career path with labs.', courseSlug: 'microsoft-ai-engineer', courseCategory: 'ai-engineering' },
      { id: 'ship', label: 'Ship an AI App', hint: 'Deploy your first agent.', courseraQuery: 'build llm apps deploy' },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    tagline: 'Linux, AWS, containers and Kubernetes.',
    nodes: [
      { id: 'linux', label: 'Linux Basics', hint: 'Terminal, files and permissions.', courseSlug: 'intro-to-linux', courseCategory: 'cloud' },
      { id: 'aws', label: 'AWS Fundamentals', hint: 'Core cloud concepts.', courseSlug: 'aws-intro-cloud-computing', courseCategory: 'cloud' },
      { id: 'containers', label: 'Containers & K8s', hint: 'Docker, OpenShift, orchestration.', courseSlug: 'containers-kubernetes-openshift', courseCategory: 'cloud' },
      { id: 'oracle', label: 'Oracle Cloud', hint: 'OCI services in practice.', courseSlug: 'oracle-cloud-engineering', courseCategory: 'cloud' },
      { id: 'devops', label: 'IBM DevOps Path', hint: 'CI/CD and SRE practices.', courseSlug: 'ibm-devops-software-engineering', courseCategory: 'cloud' },
      { id: 'cert', label: 'Get Certified', hint: 'Validate with a cloud cert.', courseraQuery: 'aws certified solutions architect' },
    ],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    tagline: 'Security foundations and API defense.',
    nodes: [
      { id: 'intro', label: 'Security Intro', hint: 'Threats, crypto and defense basics.', courseSlug: 'intro-to-cybersecurity', courseCategory: 'cybersecurity' },
      { id: 'owasp', label: 'OWASP API Top 10', hint: 'Secure your APIs and beyond.', courseSlug: 'owasp-api-security-top-10', courseCategory: 'cybersecurity' },
      { id: 'network', label: 'Networking Basics', hint: 'How traffic really moves.', courseSlug: 'networking-basics-cisco', courseCategory: 'computer-science' },
      { id: 'linux-sec', label: 'Linux for Security', hint: 'Harden and audit systems.', courseSlug: 'intro-to-linux', courseCategory: 'cloud' },
      { id: 'pentest', label: 'Ethical Hacking', hint: 'Test systems legally.', courseraQuery: 'ethical hacking penetration testing' },
      { id: 'cert', label: 'Security+ Path', hint: 'Industry certification track.', courseraQuery: 'comptia security+ certification' },
    ],
  },
  {
    id: 'computer-science',
    title: 'CS Fundamentals',
    tagline: 'The timeless core: systems, algorithms, networks.',
    nodes: [
      { id: 'nand', label: 'Nand to Tetris', hint: 'Build a computer from gates.', courseSlug: 'nand-to-tetris', courseCategory: 'computer-science' },
      { id: 'dsa', label: 'Data Structures & Algorithms', hint: 'Think in complexity.', courseSlug: 'dsa-in-java-scaler', courseCategory: 'computer-science' },
      { id: 'missing', label: 'Missing Semester', hint: 'Shell, Git, debugging mastery.', courseSlug: 'missing-semester', courseCategory: 'computer-science' },
      { id: 'networking', label: 'Networking', hint: 'Protocols and the internet.', courseSlug: 'networking-basics-cisco', courseCategory: 'computer-science' },
      { id: 'systems', label: 'System Design', hint: 'Architecture at scale.', courseSlug: 'system-design-primer', courseCategory: 'computer-science' },
      { id: 'math', label: 'Math for CS', hint: 'Discrete math foundations.', courseraQuery: 'discrete mathematics computer science' },
    ],
  },
  {
    id: 'testing',
    title: 'QA & Testing',
    tagline: 'Manual QA to automated E2E pipelines.',
    nodes: [
      { id: 'manual', label: 'Software Testing & QA', hint: 'Test plans and bug craft.', courseSlug: 'software-testing', courseCategory: 'testing' },
      { id: 'playwright', label: 'Playwright E2E', hint: 'Modern browser automation.', courseSlug: 'playwright-testing', courseCategory: 'testing' },
      { id: 'api', label: 'REST API Automation', hint: 'Test backends with RestAssured.', courseSlug: 'rest-api-automation-rest-assured', courseCategory: 'testing' },
      { id: 'selenium', label: 'Selenium Grid', hint: 'Classic cross-browser suites.', courseraQuery: 'selenium webdriver testing' },
      { id: 'ci', label: 'Testing in CI/CD', hint: 'Gate every deploy on green.', courseraQuery: 'continuous testing ci cd' },
      { id: 'istqb', label: 'ISTQB Path', hint: 'Certified tester track.', courseraQuery: 'istqb certification' },
    ],
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    tagline: 'Steer LLMs with precision, from chat to agents.',
    nodes: [
      { id: 'chatgpt', label: 'ChatGPT Basics', hint: 'Everyday prompting that works.', courseSlug: 'chatgpt-for-everyone', courseCategory: 'prompt-engineering' },
      { id: 'mastery', label: 'Prompt Mastery', hint: 'Patterns and techniques.', courseSlug: 'prompt-engineering', courseCategory: 'prompt-engineering' },
      { id: 'advanced', label: 'Advanced Prompting', hint: 'Chains, roles and constraints.', courseSlug: 'advanced-prompting', courseCategory: 'prompt-engineering' },
      { id: 'free', label: 'Free Academy Track', hint: 'Zero-cost deep dive.', courseSlug: 'prompt-engineering-freeacademy', courseCategory: 'prompt-engineering' },
      { id: 'free-adv', label: 'Advanced Free Track', hint: 'Level up for free.', courseSlug: 'advanced-prompt-engineering-freeacademy', courseCategory: 'prompt-engineering' },
      { id: 'agents', label: 'Prompting for Agents', hint: 'Prompts that act, not just chat.', courseraQuery: 'prompt engineering ai agents' },
    ],
  },
  {
    id: 'automation',
    title: 'Automation & n8n',
    tagline: 'Workflows, integrations and AI agents with n8n.',
    nodes: [
      { id: 'academy', label: 'n8n Academy', hint: 'Official interactive courses.', courseSlug: 'n8n-academy', courseCategory: 'automation' },
      { id: 'beginner', label: 'n8n Beginner Course', hint: 'First workflows that work.', courseSlug: 'n8n-beginner-course', courseCategory: 'automation' },
      { id: 'learn', label: 'Learn n8n Workflows', hint: 'Hands-on automation practice.', courseSlug: 'grasp-learn-n8n-workflow-automation', courseCategory: 'automation' },
      { id: 'markets', label: 'n8n Markets Course', hint: 'Real automation scenarios.', courseSlug: 'n8n-markets-learn-automation', courseCategory: 'automation' },
      { id: 'agents', label: 'AI Agents with n8n', hint: 'Free hands-on agent training.', courseSlug: 'build-ai-agents-n8n-udemy', courseCategory: 'automation' },
      { id: 'zapier', label: 'Beyond n8n', hint: 'Zapier, Make and comparisons.', courseraQuery: 'workflow automation zapier make' },
    ],
  },
]

/** Mermaid flowchart for a track, styled like roadmap.sh: dark canvas with
 *  yellow topic nodes and dark text. Vertical flow like the reference. */
export function roadmapMermaid(track: RoadmapTrack): string {
  const lines = ['flowchart TD']
  track.nodes.forEach((n, i) => {
    const id = `n${i}`
    lines.push(`    ${id}["${n.label}"]`)
    lines.push(`    class ${id} topic`)
    if (i > 0) lines.push(`    n${i - 1} --> ${id}`)
  })
  lines.push('    classDef topic fill:#FFD43B,stroke:#0F172A,stroke-width:2px,color:#111827,rx:10,py:10;')
  lines.push('    linkStyle default stroke:#94A3B8,stroke-width:2px;')
  return lines.join('\n')
}
