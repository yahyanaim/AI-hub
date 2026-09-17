import Link from 'next/link'
import Image from 'next/image'
import { Github, Heart, Instagram, Facebook } from 'lucide-react'
import { NewsletterForm } from '@/components/layout/NewsletterForm'

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-foreground">
      <span className="mr-2 inline-block h-3 w-1 rounded-full bg-brand-orange align-baseline" />
      {children}
    </h4>
  )
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-orange/40 hover:shadow-md"
    >
      {children}
    </a>
  )
}

export function Footer() {
  return (
    <footer className="relative z-10 mt-12 border-t border-border bg-card/50">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange/60 to-transparent" />
      <div className="container-page py-12">
        <div className="mb-10 flex flex-col items-start justify-between gap-5 border-b border-border/70 pb-8 lg:flex-row lg:items-center">
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground">Get the best new tools first</h3>
            <p className="mt-1 text-sm text-muted-foreground">One short email when something worth knowing drops. No spam.</p>
          </div>
          <NewsletterForm />
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-16 w-16 items-center justify-center overflow-hidden bg-transparent">
                <Image src="/logo.png" alt="AI Hunt" width={60} height={60} className="h-full w-full object-contain" />
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Discover AI tools, dev tools, courses and many resources for developers to level up your skills.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              <SocialLink href="https://github.com/yahyanaim" label="GitHub - yahyanaim">
                <Github className="h-4 w-4 text-foreground" />
              </SocialLink>
              <SocialLink href="https://x.com/yahianaim" label="X - yahianaim">
                <XLogo className="h-4 w-4 text-foreground" />
              </SocialLink>
              <SocialLink href="https://www.instagram.com/yahia_naiiiim/" label="Instagram - yahia_naiiiim">
                <Instagram className="h-4 w-4 text-pink-600 dark:text-pink-500" />
              </SocialLink>
              <SocialLink href="https://www.facebook.com/yaaahya.naim/" label="Facebook - yaaahya.naim">
                <Facebook className="h-4 w-4 text-[#1877F2]" />
              </SocialLink>
            </div>
          </div>

          <div>
            <FooterHeading>Discover</FooterHeading>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/tools" className="text-muted-foreground transition-all hover:pl-1 hover:text-brand-orange">Tools</Link></li>
              <li><Link href="/dev-tools" className="text-muted-foreground transition-all hover:pl-1 hover:text-brand-orange">Dev Tools</Link></li>
              <li><Link href="/edittools" className="text-muted-foreground transition-all hover:pl-1 hover:text-brand-orange">Editing Tools</Link></li>
              <li><Link href="/courses" className="text-muted-foreground transition-all hover:pl-1 hover:text-brand-orange">Courses</Link></li>
              <li><Link href="/offers" className="text-muted-foreground transition-all hover:pl-1 hover:text-brand-orange">Offers</Link></li>
            </ul>
          </div>

          <div>
            <FooterHeading>Community</FooterHeading>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/submit" className="text-muted-foreground transition-all hover:pl-1 hover:text-brand-orange">Submit</Link></li>
              <li><Link href="/support" className="text-muted-foreground transition-all hover:pl-1 hover:text-brand-orange">Support</Link></li>
            </ul>
          </div>

          <div>
            <FooterHeading>About</FooterHeading>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A demonstration build. Data is stored locally in your browser.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} AI Hunt. Built for the AI community.
          </p>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Made with <Heart className="h-3 w-3 fill-red-500 text-red-500" /> by Yahia Naim
          </span>
        </div>
      </div>
    </footer>
  )
}
