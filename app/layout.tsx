import type { Metadata, Viewport } from 'next'
import './globals.css'
import { AppProvider } from '@/lib/store'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CommandPalette } from '@/components/search/CommandPalette'
import { AuthModal } from '@/components/auth/AuthModal'
import { ToolDetailModal } from '@/components/detail/ToolDetailModal'
import { RepoDetailModal } from '@/components/detail/RepoDetail'
import { CourseDetailModal } from '@/components/detail/CourseDetail'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: {
    default: 'AI Hunt — Discover the best AI tools, dev tools & repos',
    template: '%s — AI Hunt',
  },
  description:
    'A curated, community-driven discovery platform for AI tools, developer tools, and open-source GitHub repositories.',
  keywords: ['AI tools', 'dev tools', 'developer tools', 'GitHub repos', 'LLM', 'discovery'],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'AI Hunt',
    description: 'Discover the best AI tools, dev tools & GitHub repos.',
    type: 'website',
    images: [{ url: '/logo.png' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#FF6B00',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppProvider>
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CommandPalette />
          <AuthModal />
          <ToolDetailModal />
          <RepoDetailModal />
          <CourseDetailModal />
          <Analytics />
        </AppProvider>
      </body>
    </html>
  )
}
