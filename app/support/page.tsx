import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import { SupportPage } from '@/components/layout/SupportPage'

const baseUrl = SITE_URL

export const metadata: Metadata = {
  title: 'Support AI Hunt - Buy me a coffee',
  description: 'Support AI Hunt via PayPal or direct bank transfer (CIH). Keep the platform free, ad-free, and independent.',
  openGraph: {
    title: 'Support AI Hunt - Buy me a coffee',
    description: 'Support AI Hunt via PayPal or direct bank transfer (CIH).',
    url: `${baseUrl}/support`,
    siteName: 'AI Hunt',
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${baseUrl}/og.png`, width: 1200, height: 630, alt: 'Support AI Hunt' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Support AI Hunt - Buy me a coffee',
    description: 'Support AI Hunt via PayPal or direct bank transfer (CIH).',
    images: [`${baseUrl}/og.png`],
  },
  alternates: { canonical: `${baseUrl}/support` },
}

export default function Support() {
  return <SupportPage />
}
