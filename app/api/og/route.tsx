import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
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
            marginBottom: 40,
          }}
        >
          Discover AI Tools, Developer Resources & Learning Paths
        </div>
        <div
          style={{
            display: 'flex',
            gap: 12,
          }}
        >
          {['AI Tools', 'Dev Tools', 'Courses', 'Repos'].map((label, i) => (
            <div
              key={label}
              style={{
                background: i === 0 ? '#FF6B00' : 'rgba(255,255,255,0.1)',
                color: i === 0 ? '#fff' : '#e2e8f0',
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
    {
      width: 1200,
      height: 630,
    }
  )
}
