'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Download } from 'lucide-react'
import type { DevTool } from '@/types'

const INSTALL_LINKS: Record<string, string> = {
  'VS Code': 'https://code.visualstudio.com/download',
  'VS Code / PyCharm': 'https://code.visualstudio.com/download',
  'IntelliJ IDEA': 'https://www.jetbrains.com/idea/download',
  'Node.js': 'https://nodejs.org/download',
  'npm / yarn': 'https://nodejs.org/download',
  'React': 'https://react.dev',
  'ESLint': 'https://eslint.org/docs/user-guide/getting-started',
  'Prettier': 'https://prettier.io/docs/en/install',
  'Jest': 'https://jestjs.io/docs/getting-started',
  'Webpack / Vite': 'https://vite.dev/guide',
  'Git': 'https://git-scm.com/downloads',
  'Postman': 'https://www.postman.com/downloads',
  'JDK 21': 'https://jdk.java.net/21/',
  'Maven / Gradle': 'https://gradle.org/install',
  'Spring Boot': 'https://spring.io/quickstart',
  'Angular CLI': 'https://angular.dev/installation',
  'TypeScript': 'https://www.typescriptlang.org/download',
  'Docker': 'https://docs.docker.com/get-docker',
  'PostgreSQL': 'https://www.postgresql.org/download',
  'PgAdmin': 'https://www.pgadmin.org/download',
  'Python 3.12': 'https://www.python.org/downloads',
  'Anaconda / Miniconda': 'https://docs.conda.io/projects/conda/en/latest/user-guide/install',
  'Jupyter Lab': 'https://jupyter.org/install',
  'NumPy': 'https://numpy.org/install',
  'Pandas': 'https://pandas.pydata.org/docs/getting_started/install.html',
  'Matplotlib': 'https://matplotlib.org/stable/users/installing/index.html',
  'Scikit-learn': 'https://scikit-learn.org/stable/install.html',
  'TensorFlow / PyTorch': 'https://pytorch.org/get-started/locally',
  'Kubernetes (Minikube)': 'https://minikube.sigs.k8s.io/docs/start',
  'Terraform': 'https://developer.hashicorp.com/terraform/install',
  'GitHub Actions': 'https://docs.github.com/en/actions',
  'Prometheus': 'https://prometheus.io/download',
  'Grafana': 'https://grafana.com/grafana/download',
  'kubectl': 'https://kubernetes.io/docs/tasks/tools',
  'Helm': 'https://helm.sh/docs/intro/install',
  'Ansible': 'https://docs.ansible.com/ansible/latest/installation_guide',
  'AWS CLI': 'https://aws.amazon.com/cli',
  'React Native CLI': 'https://reactnative.dev/docs/environment-setup',
  'Xcode (iOS Simulator)': 'https://developer.apple.com/xcode',
  'Android Studio (Emulator)': 'https://developer.android.com/studio',
  'Expo': 'https://docs.expo.dev/get-started/installation',
  'React Navigation': 'https://reactnavigation.org/docs/getting-started',
  'Metro Bundler': 'https://reactnative.dev/docs/metro',
  'Flipper (Debugger)': 'https://fbflipper.com/docs/getting-started',
  'Composer': 'https://getcomposer.org/download',
  'PHPUnit': 'https://phpunit.de/getting-started',
  'Xdebug': 'https://xdebug.org/docs/install',
  'XAMPP / Laragon': 'https://www.apachefriends.org/download.html',
  'Symfony CLI': 'https://symfony.com/download',
  'Doctrine ORM': 'https://www.doctrine-project.org/projects/doctrine-orm/en/current/tutorials/getting-started.html',
  'Twig': 'https://twig.symfony.com/doc/3.x/intro.html',
  'PHP 8.x': 'https://www.php.net/downloads',
  'API Platform': 'https://api-platform.com/docs/distribution',
  'PHPStorm': 'https://www.jetbrains.com/phpstorm/download',
  'VS Code / PHPStorm': 'https://code.visualstudio.com/download',
  'PHPUnit / Panther': 'https://phpunit.de/getting-started',
  'MongoDB': 'https://www.mongodb.com/try/download/community',
  'MySQL': 'https://dev.mysql.com/downloads/',
  'Redis': 'https://redis.io/download',
  'DBeaver': 'https://dbeaver.io/download/',
  'Kali Linux': 'https://www.kali.org/get-kali/',
  'Wireshark': 'https://www.wireshark.org/download.html',
  'Nmap': 'https://nmap.org/download.html',
  'Burp Suite': 'https://portswigger.net/burp/communitydownload',
  'Metasploit': 'https://www.metasploit.com/download',
  'Tableau': 'https://www.tableau.com/products/desktop',
  'Power BI': 'https://powerbi.microsoft.com/downloads/',
  'TablePlus': 'https://tableplus.com/download',
  'Metabase': 'https://www.metabase.com/start/',
}

const TOOL_LOGOS: Record<string, string> = {
  'VS Code': 'https://www.google.com/s2/favicons?domain=code.visualstudio.com&sz=64',
  'VS Code / PyCharm': 'https://www.google.com/s2/favicons?domain=code.visualstudio.com&sz=64',
  'IntelliJ IDEA': 'https://www.google.com/s2/favicons?domain=jetbrains.com&sz=64',
  'Node.js': 'https://www.google.com/s2/favicons?domain=nodejs.org&sz=64',
  'npm / yarn': 'https://www.google.com/s2/favicons?domain=npmjs.com&sz=64',
  'React': 'https://www.google.com/s2/favicons?domain=react.dev&sz=64',
  'ESLint': 'https://www.google.com/s2/favicons?domain=eslint.org&sz=64',
  'Prettier': 'https://www.google.com/s2/favicons?domain=prettier.io&sz=64',
  'Jest': 'https://www.google.com/s2/favicons?domain=jestjs.io&sz=64',
  'Webpack / Vite': 'https://www.google.com/s2/favicons?domain=vite.dev&sz=64',
  'Git': 'https://www.google.com/s2/favicons?domain=git-scm.com&sz=64',
  'Postman': 'https://www.google.com/s2/favicons?domain=postman.com&sz=64',
  'JDK 21': 'https://www.google.com/s2/favicons?domain=oracle.com&sz=64',
  'Maven / Gradle': 'https://www.google.com/s2/favicons?domain=gradle.org&sz=64',
  'Spring Boot': 'https://www.google.com/s2/favicons?domain=spring.io&sz=64',
  'Angular CLI': 'https://www.google.com/s2/favicons?domain=angular.dev&sz=64',
  'TypeScript': 'https://www.google.com/s2/favicons?domain=typescriptlang.org&sz=64',
  'Docker': 'https://www.google.com/s2/favicons?domain=docker.com&sz=64',
  'PostgreSQL': 'https://www.google.com/s2/favicons?domain=postgresql.org&sz=64',
  'PgAdmin': 'https://www.google.com/s2/favicons?domain=pgadmin.org&sz=64',
  'Python 3.12': 'https://www.google.com/s2/favicons?domain=python.org&sz=64',
  'Anaconda / Miniconda': 'https://www.google.com/s2/favicons?domain=anaconda.com&sz=64',
  'Jupyter Lab': 'https://www.google.com/s2/favicons?domain=jupyter.org&sz=64',
  'NumPy': 'https://www.google.com/s2/favicons?domain=numpy.org&sz=64',
  'Pandas': 'https://www.google.com/s2/favicons?domain=pandas.pydata.org&sz=64',
  'Matplotlib': 'https://www.google.com/s2/favicons?domain=matplotlib.org&sz=64',
  'Scikit-learn': 'https://www.google.com/s2/favicons?domain=scikit-learn.org&sz=64',
  'TensorFlow / PyTorch': 'https://www.google.com/s2/favicons?domain=pytorch.org&sz=64',
  'Kubernetes (Minikube)': 'https://www.google.com/s2/favicons?domain=kubernetes.io&sz=64',
  'Terraform': 'https://www.google.com/s2/favicons?domain=terraform.io&sz=64',
  'GitHub Actions': 'https://www.google.com/s2/favicons?domain=github.com&sz=64',
  'Prometheus': 'https://www.google.com/s2/favicons?domain=prometheus.io&sz=64',
  'Grafana': 'https://www.google.com/s2/favicons?domain=grafana.com&sz=64',
  'kubectl': 'https://www.google.com/s2/favicons?domain=kubernetes.io&sz=64',
  'Helm': 'https://www.google.com/s2/favicons?domain=helm.sh&sz=64',
  'Ansible': 'https://www.google.com/s2/favicons?domain=ansible.com&sz=64',
  'AWS CLI': 'https://www.google.com/s2/favicons?domain=aws.amazon.com&sz=64',
  'React Native CLI': 'https://www.google.com/s2/favicons?domain=reactnative.dev&sz=64',
  'Xcode (iOS Simulator)': 'https://www.google.com/s2/favicons?domain=developer.apple.com&sz=64',
  'Android Studio (Emulator)': 'https://www.google.com/s2/favicons?domain=developer.android.com&sz=64',
  'Expo': 'https://www.google.com/s2/favicons?domain=expo.dev&sz=64',
  'React Navigation': 'https://www.google.com/s2/favicons?domain=reactnavigation.org&sz=64',
  'Metro Bundler': 'https://www.google.com/s2/favicons?domain=reactnative.dev&sz=64',
  'Flipper (Debugger)': 'https://www.google.com/s2/favicons?domain=fbflipper.com&sz=64',
  'Composer': 'https://www.google.com/s2/favicons?domain=getcomposer.org&sz=64',
  'PHPUnit': 'https://www.google.com/s2/favicons?domain=phpunit.de&sz=64',
  'Xdebug': 'https://www.google.com/s2/favicons?domain=xdebug.org&sz=64',
  'XAMPP / Laragon': 'https://www.google.com/s2/favicons?domain=apachefriends.org&sz=64',
  'Symfony CLI': 'https://www.google.com/s2/favicons?domain=symfony.com&sz=64',
  'Doctrine ORM': 'https://www.google.com/s2/favicons?domain=doctrine-project.org&sz=64',
  'Twig': 'https://www.google.com/s2/favicons?domain=twig.symfony.com&sz=64',
  'PHP 8.x': 'https://www.google.com/s2/favicons?domain=php.net&sz=64',
  'API Platform': 'https://www.google.com/s2/favicons?domain=api-platform.com&sz=64',
  'PHPStorm': 'https://www.google.com/s2/favicons?domain=jetbrains.com&sz=64',
  'VS Code / PHPStorm': 'https://www.google.com/s2/favicons?domain=code.visualstudio.com&sz=64',
  'PHPUnit / Panther': 'https://www.google.com/s2/favicons?domain=phpunit.de&sz=64',
  'MongoDB': 'https://www.google.com/s2/favicons?domain=mongodb.com&sz=64',
  'MySQL': 'https://www.google.com/s2/favicons?domain=mysql.com&sz=64',
  'Redis': 'https://www.google.com/s2/favicons?domain=redis.io&sz=64',
  'DBeaver': 'https://www.google.com/s2/favicons?domain=dbeaver.io&sz=64',
  'Kali Linux': 'https://www.google.com/s2/favicons?domain=kali.org&sz=64',
  'Wireshark': 'https://www.google.com/s2/favicons?domain=wireshark.org&sz=64',
  'Nmap': 'https://www.google.com/s2/favicons?domain=nmap.org&sz=64',
  'Burp Suite': 'https://www.google.com/s2/favicons?domain=portswigger.net&sz=64',
  'Metasploit': 'https://www.google.com/s2/favicons?domain=rapid7.com&sz=64',
  'Tableau': 'https://www.google.com/s2/favicons?domain=tableau.com&sz=64',
  'Power BI': 'https://www.google.com/s2/favicons?domain=powerbi.microsoft.com&sz=64',
  'TablePlus': 'https://www.google.com/s2/favicons?domain=tableplus.com&sz=64',
  'Metabase': 'https://www.google.com/s2/favicons?domain=metabase.com&sz=64',
}

const TOOL_DESC: Record<string, string> = {
  'VS Code': 'Code editor for JS/TS with rich extensions',
  'VS Code / PyCharm': 'Dual editor for general dev & Python data science',
  'IntelliJ IDEA': 'Full-featured IDE for Java & JVM languages',
  'Node.js': 'JavaScript runtime for building server-side apps',
  'npm / yarn': 'Package managers for installing JS dependencies',
  'React': 'UI library for building component-based web apps',
  'ESLint': 'Linter that catches code quality & style issues',
  'Prettier': 'Auto-formatter that keeps code style consistent',
  'Jest': 'Testing framework for unit & integration tests',
  'Webpack / Vite': 'Bundlers that compile & optimize frontend assets',
  'Git': 'Version control system for tracking code changes',
  'Postman': 'API client for testing & debugging HTTP endpoints',
  'JDK 21': 'Java development kit for building JVM applications',
  'Maven / Gradle': 'Build automation tools for Java projects',
  'Spring Boot': 'Framework for production-ready Java web services',
  'Angular CLI': 'Scaffolding & build tool for Angular projects',
  'TypeScript': 'Typed superset of JavaScript for safer code',
  'Docker': 'Container platform for consistent dev environments',
  'PostgreSQL': 'Relational database with advanced SQL features',
  'PgAdmin': 'GUI admin tool for managing PostgreSQL databases',
  'Python 3.12': 'General-purpose language for dev, data & scripting',
  'Anaconda / Miniconda': 'Python environment & package manager for data science',
  'Jupyter Lab': 'Interactive notebook environment for data exploration',
  'NumPy': 'Numerical computing library for array operations',
  'Pandas': 'Data manipulation library for tabular datasets',
  'Matplotlib': 'Plotting library for creating static visualizations',
  'Scikit-learn': 'ML library for classification, regression & clustering',
  'TensorFlow / PyTorch': 'Deep learning frameworks for neural network training',
  'Kubernetes (Minikube)': 'Local K8s cluster for testing container orchestration',
  'Terraform': 'Infrastructure-as-code tool for cloud provisioning',
  'GitHub Actions': 'CI/CD platform for automated testing & deployment',
  'Prometheus': 'Monitoring system for collecting metrics & alerts',
  'Grafana': 'Dashboard tool for visualizing infrastructure metrics',
  'kubectl': 'CLI for managing Kubernetes clusters & deployments',
  'Helm': 'Package manager for deploying K8s applications',
  'Ansible': 'Automation tool for config management & provisioning',
  'AWS CLI': 'Command-line interface for managing AWS services',
  'React Native CLI': 'Build tool for compiling React Native mobile apps',
  'Xcode (iOS Simulator)': 'Apple IDE & simulator for iOS app testing',
  'Android Studio (Emulator)': 'Google IDE & emulator for Android app testing',
  'Expo': 'Framework for rapid React Native development without native builds',
  'React Navigation': 'Routing & navigation library for React Native apps',
  'Metro Bundler': 'JavaScript bundler optimized for React Native',
  'Flipper (Debugger)': 'Debugging tool for inspecting React Native apps',
  'Composer': 'Dependency manager for PHP libraries',
  'PHPUnit': 'Testing framework for PHP unit & integration tests',
  'Xdebug': 'Debugger & profiler for PHP code inspection',
  'XAMPP / Laragon': 'Local PHP/MySQL server environment for development',
  'Symfony CLI': 'Command-line tool for scaffolding Symfony projects',
  'Doctrine ORM': 'Object-relational mapper for PHP database interactions',
  'Twig': 'Template engine for clean PHP view rendering',
  'PHP 8.x': 'Server-side scripting language for dynamic web apps',
  'API Platform': 'Framework for building REST/GraphQL APIs with PHP',
  'PHPStorm': 'JetBrains IDE specialized for PHP development',
  'VS Code / PHPStorm': 'Dual editor choice for PHP & general web dev',
  'PHPUnit / Panther': 'Testing tools for PHP unit & browser tests',
  'MongoDB': 'NoSQL document database for flexible data storage',
  'MySQL': 'Popular relational database for web applications',
  'Redis': 'In-memory cache & message broker for fast data access',
  'DBeaver': 'Universal database GUI for multiple DB engines',
  'Kali Linux': 'Security-focused Linux distro for penetration testing',
  'Wireshark': 'Network protocol analyzer for packet inspection',
  'Nmap': 'Network scanner for discovering hosts & open ports',
  'Burp Suite': 'Web app security testing proxy & scanner',
  'Metasploit': 'Exploit development framework for security testing',
  'Tableau': 'BI platform for interactive data visualization',
  'Power BI': 'Microsoft analytics tool for business reporting',
  'TablePlus': 'Modern GUI client for multiple database types',
  'Metabase': 'Open-source BI tool for SQL queries & dashboards',
}

interface PackDetailModalProps {
  pack: DevTool | null
  onClose: () => void
}

export function PackDetailModal({ pack, onClose }: PackDetailModalProps) {
  useEffect(() => {
    if (!pack) return
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onEsc)
      document.body.style.overflow = ''
    }
  }, [pack, onClose])

  return (
    <AnimatePresence>
      {pack && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-card shadow-xl"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-4 px-6 pb-0 pt-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-border/50">
                {PACK_LOGOS[pack.slug] ? (
                  <img
                    src={PACK_LOGOS[pack.slug]}
                    alt=""
                    className="h-7 w-7 rounded object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1 pr-6">
                <h2 className="text-lg font-semibold text-foreground">{pack.name}</h2>
                <p className="mt-0.5 text-sm text-muted-foreground">{pack.tagline}</p>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                {pack.description}
              </p>

              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tools included ({pack.tools?.length ?? 0})
              </h3>

              {pack.tools && pack.tools.length > 0 && (
                <div className="space-y-1.5">
                  {pack.tools.map((tool) => {
                    const link = INSTALL_LINKS[tool]
                    const logo = TOOL_LOGOS[tool]
                    return (
                      <div
                        key={tool}
                        className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {logo ? (
                            <img
                              src={logo}
                              alt=""
                              className="h-5 w-5 rounded"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none'
                              }}
                            />
                          ) : (
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-muted text-[10px] font-bold text-muted-foreground">
                              ?
                            </div>
                          )}
                          <div className="min-w-0">
                            <span className="truncate text-sm text-foreground">{tool}</span>
                            {TOOL_DESC[tool] && (
                              <p className="mt-0.5 truncate text-xs text-muted-foreground">{TOOL_DESC[tool]}</p>
                            )}
                          </div>
                        </div>
                        {link && (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-brand-orange transition-colors hover:bg-brand-orange/10"
                          >
                            <Download className="h-3 w-3" />
                            Install
                          </a>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              {pack.tags && pack.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap items-center gap-1.5">
                  {pack.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border px-6 py-4">
              <a
                href={pack.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              >
                <ExternalLink className="h-4 w-4" />
                Get started
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const PACK_LOGOS: Record<string, string> = {
  'node-react-stack': 'https://nodejs.org/favicon.ico',
  'java-angular-stack': 'https://www.oracle.com/favicon.ico',
  'python-ml-stack': 'https://www.python.org/favicon.ico',
  'devops-stack': 'https://www.docker.com/favicon.ico',
  'mobile-react-native-stack': 'https://reactnative.dev/favicon.ico',
  'php-environment-pack': 'https://php.net/favicon.ico',
  'symfony-starter': 'https://symfony.com/favicon.ico',
  'nosql-stack': 'https://icons.duckduckgo.com/ip3/mongodb.com.ico',
  'sql-stack': 'https://icons.duckduckgo.com/ip3/postgresql.org.ico',
  'data-analytics-stack': 'https://icons.duckduckgo.com/ip3/python.org.ico',
  'cybersecurity-stack': 'https://icons.duckduckgo.com/ip3/kali.org.ico',
}
