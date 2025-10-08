import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#00D9C0',
          border: '3px solid black',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 900,
            color: 'black',
            fontFamily: 'sans-serif',
            display: 'flex',
            letterSpacing: '-0.05em',
          }}
        >
          H
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

