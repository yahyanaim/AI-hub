'use client'

import { motion } from 'framer-motion'
import { Heart, ExternalLink } from 'lucide-react'
import { cn, formatNumber } from '@/lib/utils'
import type { DevTool } from '@/types'

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
  'laravel-vue-stack': 'https://icons.duckduckgo.com/ip3/laravel.com.ico',
}

const TOOL_LOGOS: Record<string, string> = {
  'VS Code': 'https://www.google.com/s2/favicons?domain=code.visualstudio.com&sz=64',
  'VS Code / PyCharm': 'https://www.google.com/s2/favicons?domain=code.visualstudio.com&sz=64',
  'IntelliJ IDEA': 'https://www.google.com/s2/favicons?domain=jetbrains.com&sz=64',
  'Node.js': 'https://www.google.com/s2/favicons?domain=nodejs.org&sz=64',
  'npm / yarn': 'https://www.google.com/s2/favicons?domain=npmjs.com&sz=64',
  'React': 'https://www.google.com/s2/favicons?domain=react.dev&sz=64',
  'ESLint': 'https://www.google.com/s2/favicons?domain=eslint.org&sz=64',
  'ESLint / Prettier': 'https://icons.duckduckgo.com/ip3/eslint.org.ico',
  'Prettier': 'https://www.google.com/s2/favicons?domain=prettier.io&sz=64',
  'Jest': 'https://www.google.com/s2/favicons?domain=jestjs.io&sz=64',
  'Vite': 'https://icons.duckduckgo.com/ip3/vite.dev.ico',
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
  'Laravel': 'https://icons.duckduckgo.com/ip3/laravel.com.ico',
  'Vue.js': 'https://icons.duckduckgo.com/ip3/vuejs.org.ico',
  'Inertia.js': 'https://icons.duckduckgo.com/ip3/inertiajs.com.ico',
  'Tailwind CSS': 'https://icons.duckduckgo.com/ip3/tailwindcss.com.ico',
  'MySQL / PostgreSQL': 'https://icons.duckduckgo.com/ip3/mysql.com.ico',
  'Laravel Herd / Valet': 'https://icons.duckduckgo.com/ip3/laravel.com.ico',
}

export function StarterPackCard({
  devtool,
  className,
  rank,
  onPackClick,
}: {
  devtool: DevTool
  className?: string
  rank?: number
  onPackClick?: (pack: DevTool) => void
}) {
  return (
    <motion.article
      onClick={() => onPackClick?.(devtool)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onPackClick?.(devtool)
        }
      }}
      className={cn(
        'group relative flex cursor-pointer flex-col rounded-2xl border border-border bg-gradient-to-br from-card to-muted/30 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-orange/30 hover:shadow-xl hover:shadow-brand-orange/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40',
        className
      )}
    >
      {/* Header */}
      <div className="relative mb-3 flex items-start gap-3.5">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white shadow-lg ring-1 ring-border">
          {PACK_LOGOS[devtool.slug] ? (
            <img
              src={PACK_LOGOS[devtool.slug]}
              alt=""
              className="h-8 w-8 rounded object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          ) : null}
          {rank && (
            <span className="absolute -left-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-orange text-[11px] font-bold text-white shadow-md ring-2 ring-background">
              {rank}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-heading text-base font-bold text-foreground transition-colors group-hover:text-brand-orange">
              {devtool.name}
            </h3>
            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <p className="mt-0.5 text-xs font-medium text-brand-orange">Starter Pack</p>
        </div>
      </div>

      {/* Description */}
      <p className="mb-3 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-muted-foreground">
        {devtool.tagline}
      </p>

      {/* Tool logos row */}
      {devtool.tools && devtool.tools.length > 0 && (
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          {devtool.tools.slice(0, 6).map((tool) => {
            const logo = TOOL_LOGOS[tool]
            return (
              <div
                key={tool}
                className="flex items-center gap-1 rounded-md border border-border bg-card px-1.5 py-1"
                title={tool}
              >
                {logo ? (
                  <img
                    src={logo}
                    alt=""
                    className="h-4 w-4 rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                ) : null}
                <span className="max-w-[70px] truncate text-[11px] text-muted-foreground">{tool}</span>
              </div>
            )
          })}
          {devtool.tools.length > 6 && (
            <span className="text-[11px] text-muted-foreground/60">+{devtool.tools.length - 6}</span>
          )}
        </div>
      )}

      {/* Tags */}
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        {devtool.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Heart className="h-3.5 w-3.5 fill-brand-orange text-brand-orange" />
          <span className="font-semibold text-brand-orange">{formatNumber(devtool.upvotes)}</span>
        </div>
        <div className="rounded-lg bg-brand-orange px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-orange-600">
          View details
        </div>
      </div>
    </motion.article>
  )
}
