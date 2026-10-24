import React from 'react';

/**
 * CentralMonogramB
 * "A very large, stylized initial 'B' (Bold and romantic)"
 * Designed with regal calligraphy flourishes, rose gold metallic gradient,
 * glowing aura, and floral laurel wreath.
 */
export default function CentralMonogramB({ size = 180 }) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px auto 25px auto'
      }}
    >
      {/* Outer Glowing Halo / Pulse */}
      <div
        className="animate-heartbeat"
        style={{
          position: 'absolute',
          width: size * 1.35,
          height: size * 1.35,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(235, 150, 165, 0.35) 0%, rgba(201, 24, 74, 0.12) 55%, transparent 75%)',
          filter: 'blur(10px)',
          pointerEvents: 'none'
        }}
      />

      {/* SVG Container with Laurel Wreath and Stylized 'B' */}
      <div
        className="animate-float"
        style={{
          position: 'relative',
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 15px 25px rgba(103, 13, 30, 0.22))'
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Rose Gold Gradient */}
            <linearGradient id="roseGoldGradB" x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor="#fff2eb" />
              <stop offset="25%" stopColor="#e5a99e" />
              <stop offset="50%" stopColor="#b76e79" />
              <stop offset="75%" stopColor="#7a0f28" />
              <stop offset="100%" stopColor="#4e0617" />
            </linearGradient>

            {/* Laurel Wreath Gold Gradient */}
            <linearGradient id="goldWreath" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f7d08a" />
              <stop offset="50%" stopColor="#c58c85" />
              <stop offset="100%" stopColor="#9e1432" />
            </linearGradient>

            <filter id="monogramGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#800e26" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Decorative Romantic Ring / Laurel Wreath */}
          <circle
            cx="100"
            cy="100"
            r="88"
            stroke="url(#goldWreath)"
            strokeWidth="2.5"
            strokeDasharray="4 6"
            opacity="0.8"
          />
          <circle
            cx="100"
            cy="100"
            r="82"
            stroke="url(#roseGoldGradB)"
            strokeWidth="1.2"
            opacity="0.5"
          />

          {/* Small wreath leaves */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => {
            const rad = (angle * Math.PI) / 180;
            const lx = 100 + 88 * Math.cos(rad);
            const ly = 100 + 88 * Math.sin(rad);
            return (
              <circle
                key={idx}
                cx={lx}
                cy={ly}
                r={idx % 2 === 0 ? "3.2" : "2"}
                fill={idx % 3 === 0 ? "#ffd166" : "#c9184a"}
                opacity="0.85"
              />
            );
          })}

          {/* The Large, Stylized, Romantic 'B' */}
          <text
            x="96"
            y="136"
            fontFamily="'Cinzel Decorative', 'Playfair Display', Georgia, serif"
            fontSize="105"
            fontWeight="900"
            textAnchor="middle"
            fill="url(#roseGoldGradB)"
            filter="url(#monogramGlow)"
            style={{
              letterSpacing: '-2px'
            }}
          >
            B
          </text>

          {/* Elegant Calligraphic Heart Flourish topping the 'B' */}
          <path
            d="M96 35 C90 28, 78 30, 78 40 C78 52, 96 62, 96 62 C96 62, 114 52, 114 40 C114 30, 102 28, 96 35 Z"
            fill="url(#roseGoldGradB)"
            opacity="0.95"
          />
        </svg>
      </div>
    </div>
  );
}
