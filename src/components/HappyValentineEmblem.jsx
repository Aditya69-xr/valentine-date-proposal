import React from 'react';

/**
 * HappyValentineEmblem
 * Extensively decorated romantic centerpiece:
 * - Ornate Golden Cupid Wings embracing the 3D heart
 * - Royal Love Crown/Tiara topping the heart
 * - Entwined golden laurel wreath and sparkling pearls
 * - "Happy Valentine's" script ribbon with glowing drop shadow
 */
export default function HappyValentineEmblem({ size = 180 }) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '12px auto 20px auto'
      }}
    >
      {/* Outer Breathing Heartbeat Aura */}
      <div
        className="animate-heartbeat"
        style={{
          position: 'absolute',
          width: size * 1.35,
          height: size * 1.35,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 42, 109, 0.45) 0%, rgba(230, 0, 57, 0.18) 52%, transparent 75%)',
          filter: 'blur(14px)',
          pointerEvents: 'none'
        }}
      />

      {/* SVG Container */}
      <div
        className="animate-float"
        style={{
          position: 'relative',
          width: size * 1.25,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 16px 30px rgba(230, 0, 57, 0.32))'
        }}
      >
        <svg
          width={size * 1.25}
          height={size}
          viewBox="0 0 250 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Heart 3D Gradient */}
            <linearGradient id="vibrantHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff4d6d" />
              <stop offset="35%" stopColor="#e60039" />
              <stop offset="100%" stopColor="#800020" />
            </linearGradient>

            {/* Cupid Wings Gold Gradient */}
            <linearGradient id="goldWingsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff8e7" />
              <stop offset="30%" stopColor="#ffd166" />
              <stop offset="70%" stopColor="#e5a93c" />
              <stop offset="100%" stopColor="#c58c85" />
            </linearGradient>

            {/* Soft Glow filter */}
            <filter id="superGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#ff0055" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Cupid Angel Wings (Left Wing) */}
          <g transform="translate(10, 20)" opacity="0.95">
            <path
              d="M100 70 C70 30, 30 40, 10 70 C-5 95, 20 120, 55 110 C35 118, 25 130, 40 140 C60 145, 80 120, 100 95 Z"
              fill="url(#goldWingsGrad)"
              filter="url(#superGlow)"
            />
            {/* Left Wing Feathers */}
            <path d="M75 55 C50 45, 25 60, 20 80" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
            <path d="M85 75 C60 70, 35 85, 35 105" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            <path d="M90 95 C75 95, 55 110, 50 125" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          </g>

          {/* Cupid Angel Wings (Right Wing - Mirrored) */}
          <g transform="translate(140, 20) scale(-1, 1)" opacity="0.95">
            <path
              d="M-10 70 C-40 30, -80 40, -100 70 C-115 95, -90 120, -55 110 C-75 118, -85 130, -70 140 C-50 145, -30 120, -10 95 Z"
              fill="url(#goldWingsGrad)"
              filter="url(#superGlow)"
            />
            {/* Right Wing Feathers */}
            <path d="M-35 55 C-60 45, -85 60, -90 80" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
            <path d="M-25 75 C-50 70, -75 85, -75 105" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </g>

          {/* Golden Laurel Wreath Ring */}
          <circle
            cx="125"
            cy="105"
            r="70"
            stroke="url(#goldWingsGrad)"
            strokeWidth="2.5"
            strokeDasharray="5 7"
            opacity="0.85"
          />

          {/* Royal Tiara/Crown just above the heart */}
          <g transform="translate(125, 34)">
            {/* Crown Base */}
            <path
              d="M-24 16 L-20 2 L-10 10 L0 -2 L10 10 L20 2 L24 16 Z"
              fill="url(#goldWingsGrad)"
              filter="url(#superGlow)"
            />
            {/* Crown Jewels */}
            <circle cx="-20" cy="1" r="3" fill="#ff0055" />
            <circle cx="0" cy="-3" r="4" fill="#ff0055" />
            <circle cx="20" cy="1" r="3" fill="#ff0055" />
            <circle cx="-10" cy="10" r="2" fill="#ffd166" />
            <circle cx="10" cy="10" r="2" fill="#ffd166" />
          </g>

          {/* Central 3D Glowing Heart */}
          <path
            d="M125 152 C85 118, 55 90, 55 64 C55 44, 73 30, 95 30 C109 30, 121 38, 125 48 C129 38, 141 30, 155 30 C177 30, 195 44, 195 64 C195 90, 165 118, 125 152 Z"
            fill="url(#vibrantHeartGrad)"
            filter="url(#superGlow)"
          />

          {/* 3D Specular Curved Highlight */}
          <path
            d="M90 40 C75 40, 65 50, 65 64 C65 76, 77 92, 99 111 C95 101, 87 82, 87 66 C87 52, 95 44, 103 42 C98 40, 94 40, 90 40 Z"
            fill="rgba(255, 255, 255, 0.48)"
          />

          {/* Floating Twinkling Golden Sparkles */}
          <polygon points="125,18 127,24 133,26 127,28 125,34 123,28 117,26 123,24" fill="#fff8e7" />
          <polygon points="58,50 59,54 63,55 59,56 58,60 57,56 53,55 57,54" fill="#ffd166" />
          <polygon points="192,50 193,54 197,55 193,56 192,60 191,56 187,55 191,54" fill="#ffd166" />
        </svg>
      </div>

      {/* "Happy Valentine's" Decorated Script Ribbon */}
      <div
        style={{
          marginTop: '-12px',
          background: 'linear-gradient(135deg, #a4161a 0%, #e60039 45%, #ff2a6d 100%)',
          padding: '7px 26px',
          borderRadius: '999px',
          color: '#ffffff',
          fontFamily: 'var(--font-script)',
          fontSize: '26px',
          fontWeight: 700,
          boxShadow: '0 8px 24px rgba(230, 0, 57, 0.42), 0 0 12px rgba(255, 255, 255, 0.35)',
          border: '2px solid #fff5f7',
          letterSpacing: '1px',
          textShadow: '0 1px 3px rgba(0,0,0,0.3)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span>✨</span>
        <span>Happy Valentine's</span>
        <span>✨</span>
      </div>
    </div>
  );
}
