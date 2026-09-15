import Link from 'next/link'
import Image from 'next/image'
import { Github, Heart } from 'lucide-react'

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-border bg-card/50">
      <div className="container-page py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-16 w-16 items-center justify-center overflow-hidden bg-transparent">
                <Image src="/logo.png" alt="AI Hunt" width={60} height={60} className="h-full w-full object-contain" />
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Discover AI tools, dev tools, courses and many resources for developers to level up your skills.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Discover
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools" className="text-muted-foreground hover:text-foreground">Tools</Link></li>
              <li><Link href="/dev-tools" className="text-muted-foreground hover:text-foreground">Dev Tools</Link></li>
              <li><Link href="/edittools" className="text-muted-foreground hover:text-foreground">Editing Tools</Link></li>
              <li><Link href="/courses" className="text-muted-foreground hover:text-foreground">Courses</Link></li>
              <li><Link href="/offers" className="text-muted-foreground hover:text-foreground">Offers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Community
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/submit" className="text-muted-foreground hover:text-foreground">Submit</Link></li>
              <li><Link href="/support" className="text-muted-foreground hover:text-foreground">Support</Link></li>
              <li><Link href="/sitemap.xml" className="text-muted-foreground hover:text-foreground">Sitemap</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              About
            </h4>
            <p className="text-sm text-muted-foreground">
              A demonstration build. Data is stored locally in your browser.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} AI Hunt. Built for the AI community.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/yahyanaim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground transition-colors hover:text-brand-orange"
              aria-label="GitHub - yahyanaim"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/yahianaim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground transition-colors hover:text-brand-orange"
              aria-label="X - yahianaim"
            >
              <XLogo className="h-5 w-5" />
            </a>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              Made with <Heart className="h-3 w-3 fill-red-500 text-red-500" /> by Yahia Naim
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
