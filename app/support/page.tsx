import type { Metadata } from 'next'
import { SupportPage } from '@/components/layout/SupportPage'

const baseUrl = 'https://aihubtools.vercel.app'

export const metadata: Metadata = {
  title: 'Support AI Hunt — Buy me a code?',
  description: 'Support AI Hunt via PayPal or direct bank transfer (CIH). Keep the platform free, ad-free, and independent.',
  openGraph: {
    title: 'Support AI Hunt — Buy me a code?',
    description: 'Support AI Hunt via PayPal or direct bank transfer (CIH).',
    url: `${baseUrl}/support`,
  },
  alternates: { canonical: `${baseUrl}/support` },
}

export default function Support() {
  return <SupportPage />
}
