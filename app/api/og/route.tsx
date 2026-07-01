import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f172a',
          color: 'white',
          fontSize: 80,
          fontWeight: 700,
        }}>
          AI Hunt
        </div>
      ),
      { width: 1200, height: 630 }
    )
  } catch (e) {
    return new Response('error', { status: 500 })
  }
}
