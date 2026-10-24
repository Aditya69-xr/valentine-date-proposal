import React from 'react';

/**
 * WatercolorFlowers
 * Elegant watercolor roses, peonies, and leafy botanical accents
 * framing the viewport corners and borders.
 */
export default function WatercolorFlowers() {
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
      {/* Top-Left Watercolor Floral Bouquet */}
      <div
        style={{
          position: 'absolute',
          top: -20,
          left: -20,
          opacity: 0.9,
          filter: 'drop-shadow(0 10px 15px rgba(103, 13, 30, 0.08))'
        }}
      >
        <svg width="260" height="260" viewBox="0 0 200 200" fill="none">
          <defs>
            {/* Peony Gradient */}
            <radialGradient id="peonyGrad1" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#fff0f3" />
              <stop offset="45%" stopColor="#ffb3c1" />
              <stop offset="85%" stopColor="#c9184a" />
              <stop offset="100%" stopColor="#800f2f" />
            </radialGradient>
            {/* Deep Rose Gradient */}
            <radialGradient id="roseGrad1" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffccd5" />
              <stop offset="50%" stopColor="#a4161a" />
              <stop offset="100%" stopColor="#590d22" />
            </radialGradient>
            {/* Leaf Gradient */}
            <linearGradient id="leafGrad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#b7c4a1" />
              <stop offset="100%" stopColor="#52796f" />
            </linearGradient>
            {/* Soft Watercolor filter */}
            <filter id="softWatercolor1" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" />
            </filter>
          </defs>

          {/* Leaves */}
          <path d="M40 85 C30 110, 60 140, 85 130 C100 115, 80 85, 40 85 Z" fill="url(#leafGrad1)" opacity="0.65" />
          <path d="M90 40 C115 30, 140 60, 130 85 C115 100, 85 80, 90 40 Z" fill="url(#leafGrad1)" opacity="0.55" />
          <path d="M25 45 C15 70, 35 100, 60 90 C75 75, 55 45, 25 45 Z" fill="url(#leafGrad1)" opacity="0.45" />

          {/* Peony outer petals */}
          <circle cx="65" cy="65" r="48" fill="url(#peonyGrad1)" opacity="0.88" />
          <path d="M35 60 C30 40, 55 30, 75 40 C95 30, 110 50, 100 70 C105 90, 85 105, 65 95 C45 105, 30 85, 35 60 Z" fill="url(#peonyGrad1)" opacity="0.9" />
          {/* Peony center swirl */}
          <circle cx="65" cy="65" r="24" fill="url(#roseGrad1)" opacity="0.95" />
          <circle cx="68" cy="63" r="12" fill="#fff0f3" opacity="0.8" />

          {/* Small Accent Rosebud */}
          <circle cx="118" cy="52" r="22" fill="url(#roseGrad1)" opacity="0.85" />
          <path d="M110 46 C115 38, 128 40, 130 48 C132 56, 122 62, 116 58 Z" fill="#ff758f" opacity="0.9" />

          {/* Gold dust accents */}
          <circle cx="95" cy="98" r="3" fill="#e5a93c" opacity="0.8" />
          <circle cx="120" cy="85" r="2" fill="#e5a93c" opacity="0.7" />
          <circle cx="50" cy="115" r="2.5" fill="#e5a93c" opacity="0.75" />
        </svg>
      </div>

      {/* Bottom-Right Watercolor Floral Bouquet */}
      <div
        style={{
          position: 'absolute',
          bottom: -20,
          right: -20,
          opacity: 0.9,
          transform: 'rotate(180deg)',
          filter: 'drop-shadow(0 10px 15px rgba(103, 13, 30, 0.08))'
        }}
      >
        <svg width="260" height="260" viewBox="0 0 200 200" fill="none">
          {/* Leaves */}
          <path d="M40 85 C30 110, 60 140, 85 130 C100 115, 80 85, 40 85 Z" fill="url(#leafGrad1)" opacity="0.65" />
          <path d="M90 40 C115 30, 140 60, 130 85 C115 100, 85 80, 90 40 Z" fill="url(#leafGrad1)" opacity="0.55" />

          {/* Peony & Rose */}
          <circle cx="65" cy="65" r="48" fill="url(#peonyGrad1)" opacity="0.88" />
          <path d="M35 60 C30 40, 55 30, 75 40 C95 30, 110 50, 100 70 C105 90, 85 105, 65 95 C45 105, 30 85, 35 60 Z" fill="url(#peonyGrad1)" opacity="0.9" />
          <circle cx="65" cy="65" r="24" fill="url(#roseGrad1)" opacity="0.95" />
          <circle cx="68" cy="63" r="12" fill="#fff0f3" opacity="0.8" />

          <circle cx="118" cy="52" r="22" fill="url(#roseGrad1)" opacity="0.85" />
          <circle cx="95" cy="98" r="3" fill="#e5a93c" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
}
