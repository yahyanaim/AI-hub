import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'AI Hunt — Discover AI Tools & Developer Resources'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          fontFamily: 'Inter, system-ui, sans-serif',
          padding: '60px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,0,0.1) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '24px',
          }}
        >
          <img
            src="https://ai-hunt.vercel.app/logo.png"
            alt="AI Hunt"
            width={80}
            height={80}
            style={{
              borderRadius: '20px',
              border: '3px solid #FF6B00',
            }}
          />
        </div>
        <div
          style={{
            fontSize: '56px',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.03em',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: '16px',
          }}
        >
          AI Hunt
        </div>
        <div
          style={{
            fontSize: '24px',
            color: '#94a3b8',
            textAlign: 'center',
            lineHeight: 1.4,
            maxWidth: '700px',
          }}
        >
          Discover AI Tools, Developer Resources & Learning Paths
        </div>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '32px',
          }}
        >
          <span
            style={{
              background: '#FF6B00',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 600,
              padding: '8px 20px',
              borderRadius: '8px',
            }}
          >
            AI Tools
          </span>
          <span
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#e2e8f0',
              fontSize: '16px',
              fontWeight: 600,
              padding: '8px 20px',
              borderRadius: '8px',
            }}
          >
            Dev Tools
          </span>
          <span
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#e2e8f0',
              fontSize: '16px',
              fontWeight: 600,
              padding: '8px 20px',
              borderRadius: '8px',
            }}
          >
            Courses
          </span>
          <span
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#e2e8f0',
              fontSize: '16px',
              fontWeight: 600,
              padding: '8px 20px',
              borderRadius: '8px',
            }}
          >
            Repos
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
