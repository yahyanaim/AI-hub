import type { Metadata } from 'next'

// Static metadata for the standalone advisor so shared /chat links show the
// mascot OG card on Facebook/WhatsApp/X previews. (page.tsx itself is a client
// component and cannot export metadata.)
export const metadata: Metadata = {
  title: 'AI Career Advisor',
  description:
    'Chat with the free AI Career Advisor on AI Hunt: build your career roadmap and discover the AI tools, dev tools and courses that fit your goals.',
  openGraph: {
    title: 'AI Career Advisor — AI Hunt',
    description:
      'Your free AI coach for skills, tools and courses — powered by the AI Hunt community.',
    url: 'https://www.aihubtools.ma/chat',
    siteName: 'AI Hunt',
    type: 'website',
    images: [
      {
        url: '/og/chat-advisor.png',
        width: 1200,
        height: 630,
        alt: 'AI Career Advisor — AI Hunt',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Career Advisor — AI Hunt',
    description:
      'Your free AI coach for skills, tools and courses — powered by the AI Hunt community.',
    images: ['/og/chat-advisor.png'],
  },
}

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return children
}
