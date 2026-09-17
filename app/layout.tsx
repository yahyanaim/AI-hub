import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Inter, Noto_Kufi_Arabic } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { AppProvider } from '@/lib/store'
import { SITE_URL } from '@/lib/site'
import { Navbar } from '@/components/layout/Navbar'
import { FooterGate } from '@/components/layout/FooterGate'
import { PartnersMarquee } from '@/components/layout/PartnersMarquee'
import { SupportReminder } from '@/components/layout/SupportReminder'
import { ReferralDonateModal } from '@/components/layout/ReferralDonateModal'
import { CommandPalette } from '@/components/search/CommandPalette'
import { AuthModal } from '@/components/auth/AuthModal'
import { ToolDetailModal } from '@/components/detail/ToolDetailModal'
import { RepoDetailModal } from '@/components/detail/RepoDetail'
import { CourseDetailModal } from '@/components/detail/CourseDetail'
import { Analytics } from '@vercel/analytics/react'
import { ChatBot } from '@/components/chat/ChatBot'
import { safeJsonLd } from '@/lib/json-ld'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const arabic = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
})

const geist = GeistSans

const baseUrl = SITE_URL

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'AI Hunt - Discover AI Tools, Dev Tools & Learning Resources',
    template: '%s - AI Hunt',
  },
  description:
    'AI Hunt is a community-driven platform to discover and share the best AI tools, n8n automation, developer tools, open-source GitHub repos, and coding courses. Learn AI skills, development, and freelancing with top-rated resources for developers and students in Morocco and worldwide, ranked by the community.',
  keywords: [
    'AI tools', 'AI Hunt', 'developer tools', 'dev tools', 'open source', 'GitHub repos',
    'best AI tools 2026', 'free AI tools', 'AI for developers',
    'LLM tools', 'machine learning tools', 'AI SaaS',
    'code editors', 'AI search', 'coding courses', 'developer platform',
    'n8n', 'n8n automation', 'n8n Morocco', 'workflow automation', 'AI automation',
    'AI skills', 'learn AI', 'AI courses Morocco', 'online courses Morocco',
    'freelancing', 'freelancing skills', 'freelance Morocco', 'development skills',
    'Moroccan developers', 'Morocco tech', 'تعلم الذكاء الاصطناعي',
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
    icon: [
      { url: '/icons/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/icon-180.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'AI Hunt - Discover AI Tools, n8n Automation & Developer Resources',
    description:
      'Community-driven platform to discover and share AI tools, n8n workflows, dev tools, GitHub repos, and coding courses. Learn AI, automation, and freelancing skills - trusted by developers in Morocco and worldwide.',
    url: baseUrl,
    siteName: 'AI Hunt',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fr_FR', 'ar_SA'],
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'AI Hunt - Discover AI Tools & Developer Resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Hunt - AI Tools, n8n Automation & Courses',
    description:
      'Community-driven platform for AI tools, n8n automation, dev tools, courses, and freelancing skills - Morocco and worldwide.',
    images: ['/og.png'],
    creator: '@yahianaim',
  },
  alternates: {
    canonical: baseUrl,
  },
  other: {
    'geo.region': 'MA',
    'geo.placename': 'Morocco',
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
    : undefined,
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
    <html lang="en" className={`${inter.variable} ${arabic.variable} ${geist.variable}`} suppressHydrationWarning>
      <head>
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'AI Hunt',
              url: baseUrl,
              description: 'Community-driven discovery platform for AI tools, n8n automation, developer tools, open-source repos, coding courses, and freelancing skills - popular with developers and students in Morocco.',
              keywords: 'AI tools, n8n, automation, coding courses, freelancing, development, AI skills, Morocco',
              inLanguage: ['en', 'fr', 'ar'],
              audience: {
                '@type': 'Audience',
                audienceType: ['Developers', 'AI Practitioners', 'Tech Enthusiasts', 'Students in Morocco', 'Freelancers'],
                geographicArea: {
                  '@type': 'Country',
                  name: 'Morocco',
                },
              },
            }),
          }}
        />
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd({
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
        <Script
          id="schema-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              name: 'AI Hunt Breadcrumb',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
                { '@type': 'ListItem', position: 2, name: 'AI Tools', item: `${baseUrl}/tools` },
                { '@type': 'ListItem', position: 3, name: 'Dev Tools', item: `${baseUrl}/dev-tools` },
                { '@type': 'ListItem', position: 4, name: 'Courses', item: `${baseUrl}/courses` },
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
            <div className="container-page">
              <SupportReminder />
            </div>
            <div className="container-page">
              <PartnersMarquee />
            </div>
            <FooterGate />
          </div>
          <CommandPalette />
          <AuthModal />
          <ReferralDonateModal />
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
