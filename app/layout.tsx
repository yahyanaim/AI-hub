import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
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
import { ChatBot } from '@/components/chat/ChatBot'

const baseUrl = 'https://ai-hunt.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'AI Hunt — Discover AI Tools, Dev Tools & Learning Resources',
    template: '%s — AI Hunt',
  },
  description:
    'AI Hunt is a community-driven discovery platform for AI tools, developer tools, open-source repos, and coding courses. Find the best resources for developers in Morocco, Algeria, France, Egypt, Saudi Arabia, and Qatar — and worldwide.',
  keywords: [
    'AI tools', 'AI Hunt', 'developer tools', 'dev tools', 'open source', 'GitHub repos',
    'Morocco AI', 'Algeria tech', 'France developer tools', 'Egypt AI tools',
    'Saudi Arabia tech', 'Qatar tech', 'North Africa developers',
    'AI tools Maroc', 'outils IA', 'أدوات الذكاء الاصطناعي',
    'best AI tools 2026', 'free AI tools', 'AI for developers',
    'LLM tools', 'machine learning tools', 'AI SaaS',
  ],
  authors: [{ name: 'Yahia Naim' }],
  creator: 'Yahia Naim',
  publisher: 'AI Hunt',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'AI Hunt — Discover AI Tools & Developer Resources',
    description:
      'Community-driven platform for AI tools, dev tools, GitHub repos, and coding courses. Trusted by developers worldwide.',
    url: baseUrl,
    siteName: 'AI Hunt',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fr_FR', 'ar_SA'],
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'AI Hunt',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Hunt — Discover AI Tools & Developer Resources',
    description:
      'Community-driven platform for AI tools, dev tools, GitHub repos, and coding courses.',
    images: ['/api/og'],
    creator: '@yahianaim',
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      en: baseUrl,
      fr: baseUrl,
      ar: baseUrl,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
  category: 'technology',
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
        <link rel="alternate" hrefLang="en" href={baseUrl} />
        <link rel="alternate" hrefLang="fr" href={baseUrl} />
        <link rel="alternate" hrefLang="ar" href={baseUrl} />
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'AI Hunt',
              url: baseUrl,
              description: 'Community-driven discovery platform for AI tools, developer tools, open-source repos, and coding courses.',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${baseUrl}/search?q={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
              inLanguage: ['en', 'fr', 'ar'],
              audience: {
                '@type': 'Audience',
                audienceType: ['Developers', 'AI Practitioners', 'Tech Enthusiasts'],
              },
            }),
          }}
        />
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'AI Hunt',
              url: baseUrl,
              logo: `${baseUrl}/logo.png`,
              founder: {
                '@type': 'Person',
                name: 'Yahia Naim',
              },
              sameAs: [
                'https://github.com/yahyanaim/AI-hub',
              ],
            }),
          }}
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
          <ChatBot />
        </AppProvider>
      </body>
    </html>
  )
}
