import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'AI Hunt — Discover AI Tools & Developer Resources'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f172a',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: -2,
            marginBottom: 16,
          }}
        >
          AI Hunt
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: 700,
          }}
        >
          Discover AI Tools, Developer Resources & Learning Paths
        </div>
        <div
          style={{
            display: 'flex',
            gap: 12,
            marginTop: 40,
          }}
        >
          <div
            style={{
              background: '#FF6B00',
              color: '#fff',
              fontSize: 18,
              fontWeight: 600,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 24,
              paddingRight: 24,
              borderRadius: 8,
            }}
          >
            AI Tools
          </div>
          {['Dev Tools', 'Courses', 'Repos'].map((label) => (
            <div
              key={label}
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#e2e8f0',
                fontSize: 18,
                fontWeight: 600,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 24,
                paddingRight: 24,
                borderRadius: 8,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
