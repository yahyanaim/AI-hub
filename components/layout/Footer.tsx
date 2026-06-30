import Link from 'next/link'
import Image from 'next/image'
import { Github, Twitter, Heart } from 'lucide-react'

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
              <li><Link href="/devtool" className="text-muted-foreground hover:text-foreground">Dev Tools</Link></li>
              <li><Link href="/edittools" className="text-muted-foreground hover:text-foreground">Editing Tools</Link></li>
              <li><Link href="/courses" className="text-muted-foreground hover:text-foreground">Courses</Link></li>
              <li><Link href="/books" className="text-muted-foreground hover:text-foreground">Books</Link></li>
              <li><Link href="/leaderboard" className="text-muted-foreground hover:text-foreground">Leaderboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Community
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/submit" className="text-muted-foreground hover:text-foreground">Submit</Link></li>
              <li><Link href="/search" className="text-muted-foreground hover:text-foreground">Search</Link></li>
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
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              Made with <Heart className="h-3 w-3 fill-red-500 text-red-500" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
