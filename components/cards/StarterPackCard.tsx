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
}

const TOOL_LOGOS: Record<string, string> = {
  'VS Code': 'https://code.visualstudio.com/favicon.ico',
  'VS Code / PyCharm': 'https://code.visualstudio.com/favicon.ico',
  'IntelliJ IDEA': 'https://www.jetbrains.com/favicon.ico',
  'Node.js': 'https://nodejs.org/favicon.ico',
  'npm / yarn': 'https://npmjs.com/favicon.ico',
  'React': 'https://react.dev/favicon.ico',
  'ESLint': 'https://eslint.org/favicon.ico',
  'Prettier': 'https://prettier.io/favicon.ico',
  'Jest': 'https://jestjs.io/favicon.ico',
  'Webpack / Vite': 'https://vite.dev/favicon.ico',
  'Git': 'https://git-scm.com/favicon.ico',
  'Postman': 'https://www.postman.com/favicon.ico',
  'JDK 21': 'https://www.oracle.com/favicon.ico',
  'Maven / Gradle': 'https://gradle.org/favicon.ico',
  'Spring Boot': 'https://spring.io/favicon.ico',
  'Angular CLI': 'https://angular.dev/favicon.ico',
  'TypeScript': 'https://www.typescriptlang.org/favicon.ico',
  'Docker': 'https://www.docker.com/favicon.ico',
  'PostgreSQL': 'https://www.postgresql.org/favicon.ico',
  'PgAdmin': 'https://www.pgadmin.org/favicon.ico',
  'Python 3.12': 'https://www.python.org/favicon.ico',
  'Anaconda / Miniconda': 'https://www.anaconda.com/favicon.ico',
  'Jupyter Lab': 'https://jupyter.org/favicon.ico',
  'NumPy': 'https://numpy.org/favicon.ico',
  'Pandas': 'https://pandas.pydata.org/favicon.ico',
  'Matplotlib': 'https://matplotlib.org/favicon.ico',
  'Scikit-learn': 'https://scikit-learn.org/favicon.ico',
  'TensorFlow / PyTorch': 'https://pytorch.org/favicon.ico',
  'Kubernetes (Minikube)': 'https://kubernetes.io/favicon.ico',
  'Terraform': 'https://www.terraform.io/favicon.ico',
  'GitHub Actions': 'https://github.githubassets.com/favicons/favicon.svg',
  'Prometheus': 'https://prometheus.io/favicon.ico',
  'Grafana': 'https://grafana.com/favicon.ico',
  'kubectl': 'https://kubernetes.io/favicon.ico',
  'Helm': 'https://helm.sh/favicon.ico',
  'Ansible': 'https://www.ansible.com/favicon.ico',
  'AWS CLI': 'https://aws.amazon.com/favicon.ico',
  'React Native CLI': 'https://reactnative.dev/favicon.ico',
  'Xcode (iOS Simulator)': 'https://developer.apple.com/favicon.ico',
  'Android Studio (Emulator)': 'https://developer.android.com/favicon.ico',
  'Expo': 'https://expo.dev/favicon.ico',
  'React Navigation': 'https://reactnavigation.org/favicon.ico',
  'Metro Bundler': 'https://reactnative.dev/favicon.ico',
  'Flipper (Debugger)': 'https://fbflipper.com/favicon.ico',
  'Composer': 'https://getcomposer.org/favicon.ico',
  'PHPUnit': 'https://phpunit.de/favicon.ico',
  'Xdebug': 'https://xdebug.org/favicon.ico',
  'XAMPP / Laragon': 'https://www.apachefriends.org/favicon.ico',
  'Symfony CLI': 'https://symfony.com/favicon.ico',
  'Doctrine ORM': 'https://www.doctrine-project.org/favicon.ico',
  'Twig': 'https://twig.symfony.com/favicon.ico',
  'PHP 8.x': 'https://php.net/favicon.ico',
  'API Platform': 'https://api-platform.com/favicon.ico',
  'PHPStorm': 'https://www.jetbrains.com/favicon.ico',
  'VS Code / PHPStorm': 'https://code.visualstudio.com/favicon.ico',
  'PHPUnit / Panther': 'https://phpunit.de/favicon.ico',
  'MongoDB': 'https://icons.duckduckgo.com/ip3/mongodb.com.ico',
  'MySQL': 'https://icons.duckduckgo.com/ip3/mysql.com.ico',
  'Redis': 'https://icons.duckduckgo.com/ip3/redis.io.ico',
  'DBeaver': 'https://icons.duckduckgo.com/ip3/dbeaver.io.ico',
  'Kali Linux': 'https://icons.duckduckgo.com/ip3/kali.org.ico',
  'Wireshark': 'https://icons.duckduckgo.com/ip3/wireshark.org.ico',
  'Nmap': 'https://icons.duckduckgo.com/ip3/nmap.org.ico',
  'Burp Suite': 'https://icons.duckduckgo.com/ip3/portswigger.net.ico',
  'Metasploit': 'https://icons.duckduckgo.com/ip3/rapid7.com.ico',
  'Tableau': 'https://icons.duckduckgo.com/ip3/tableau.com.ico',
  'Power BI': 'https://icons.duckduckgo.com/ip3/powerbi.microsoft.com.ico',
  'TablePlus': 'https://icons.duckduckgo.com/ip3/tableplus.com.ico',
  'Metabase': 'https://icons.duckduckgo.com/ip3/metabase.com.ico',
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
