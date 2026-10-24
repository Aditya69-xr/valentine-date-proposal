import React from 'react';

/**
 * DelicateBirds
 * Animated SVG silhouette of delicate love birds (swallows / doves)
 * gliding smoothly across the romantic canvas.
 */
export default function DelicateBirds() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden'
      }}
    >
      {/* Bird 1: Lead dove */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          left: '-80px',
          animation: 'flyBird 18s linear infinite',
          animationDelay: '0s'
        }}
      >
        <svg width="48" height="40" viewBox="0 0 64 64" fill="none">
          <path
            d="M10 32 C18 20, 32 16, 44 22 C48 16, 56 12, 60 14 C58 18, 52 22, 50 26 C56 28, 58 32, 54 36 C46 34, 38 36, 32 44 C26 42, 18 38, 10 32 Z"
            fill="url(#birdGrad1)"
            opacity="0.85"
          />
          {/* Wing flutter animation */}
          <path
            d="M32 20 C36 8, 48 4, 52 8 C46 16, 38 22, 32 22 Z"
            fill="url(#birdGrad1)"
            opacity="0.75"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 32 22; -18 32 22; 10 32 22; 0 32 22"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </path>
          <defs>
            <linearGradient id="birdGrad1" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#b76e79" />
              <stop offset="1" stopColor="#800e26" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bird 2: Companion dove following slightly behind */}
      <div
        style={{
          position: 'absolute',
          top: '16%',
          left: '-120px',
          animation: 'flyBird 18s linear infinite',
          animationDelay: '1.4s'
        }}
      >
        <svg width="38" height="32" viewBox="0 0 64 64" fill="none">
          <path
            d="M10 32 C18 20, 32 16, 44 22 C48 16, 56 12, 60 14 C58 18, 52 22, 50 26 C56 28, 58 32, 54 36 C46 34, 38 36, 32 44 C26 42, 18 38, 10 32 Z"
            fill="url(#birdGrad2)"
            opacity="0.75"
          />
          <path
            d="M32 20 C36 8, 48 4, 52 8 C46 16, 38 22, 32 22 Z"
            fill="url(#birdGrad2)"
            opacity="0.65"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 32 22; -22 32 22; 12 32 22; 0 32 22"
              dur="1.1s"
              repeatCount="indefinite"
            />
          </path>
          <defs>
            <linearGradient id="birdGrad2" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#d48372" />
              <stop offset="1" stopColor="#a81838" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
