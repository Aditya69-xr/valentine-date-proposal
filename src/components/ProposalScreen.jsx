import React, { useState } from 'react';
import HappyValentineEmblem from './HappyValentineEmblem';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, AlertCircle } from 'lucide-react';

/**
 * Interface I1_Proposal: "A Special Invitation"
 * Features:
 * - Happy Valentine's emblem with royal tiara & cupid wings
 * - Full-page evasion for "No" button: teleports anywhere across the entire browser viewport!
 * - Progressive massive growth for "Yes" button
 * - Clean footer: "Drafted With Pure Love ✨"
 */
export default function ProposalScreen({ onYes }) {
  const [noCount, setNoCount] = useState(0);
  const [isEscaped, setIsEscaped] = useState(false);
  const [noFixedPos, setNoFixedPos] = useState({ top: '50%', left: '50%' });
  const [wittyMessage, setWittyMessage] = useState('');

  const playfulMessages = [
    "Wait, are you really sure? 🥺",
    "Think about it again! Candlelight dinner awaits 🕯️",
    "Cupid says: No option rejected! 💘",
    "You can run, but love will find you! 🌹",
    "Did your cursor slip? 'Yes' is right here! 😉",
    "Pretty please with strawberries & chocolate? 🍓",
    "Look how grand the YES button is becoming! 🥰",
    "Resistance is futile, say Yes! 💖"
  ];

  const noButtonLabels = [
    "No 💔",
    "Are you sure? 🥺",
    "Think again! 🌹",
    "Wrong button! 😉",
    "Cupid blocked that! 💘",
    "Catch me if you can! 🏃💨",
    "Still No? Impossible! 💕",
    "Just click Yes! 💖"
  ];

  const handleNoInteraction = (e) => {
    if (e) e.preventDefault();
    const nextCount = noCount + 1;
    setNoCount(nextCount);
    setIsEscaped(true);

    const msg = playfulMessages[(nextCount - 1) % playfulMessages.length];
    setWittyMessage(msg);

    // Full-page viewport dodge: calculate random coordinate anywhere across entire screen
    const pad = 40;
    const btnW = 160;
    const btnH = 50;
    const maxW = typeof window !== 'undefined' ? window.innerWidth : 800;
    const maxH = typeof window !== 'undefined' ? window.innerHeight : 600;

    const randX = Math.floor(Math.random() * (maxW - btnW - pad * 2)) + pad;
    const randY = Math.floor(Math.random() * (maxH - btnH - pad * 2)) + pad;

    setNoFixedPos({ top: `${randY}px`, left: `${randX}px` });
  };

  const handleYesClick = () => {
    // Grand celebration confetti burst!
    confetti({
      particleCount: 120,
      spread: 110,
      origin: { y: 0.6 },
      colors: ['#ff0055', '#ff5483', '#ffccd5', '#ffd166', '#a4161a']
    });

    onYes();
  };

  // Yes button scale grows smoothly as No is chased across screen
  const isSuperYes = noCount >= 4;
  const yesScale = Math.min(1 + noCount * 0.16, 1.8);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '88vh',
        padding: '20px 14px',
        position: 'relative',
        zIndex: 5
      }}
    >
      {/* Vibrant Luxury Glass Card */}
      <div
        style={{
          maxWidth: '590px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          borderRadius: '36px',
          border: '2px solid rgba(255, 182, 193, 0.7)',
          boxShadow: '0 25px 65px rgba(220, 20, 60, 0.18), 0 4px 15px rgba(255, 77, 109, 0.14)',
          padding: '42px 34px',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        {/* Top Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#fff0f3',
            border: '1.5px solid #ffccd5',
            padding: '7px 22px',
            borderRadius: '999px',
            color: '#c9184a',
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}
        >
          <Sparkles size={14} color="#ff0055" />
          <span>A Special Invitation</span>
        </div>

        {/* Central Element: Decorated Happy Valentine's Emblem */}
        <HappyValentineEmblem size={175} />

        {/* Romantic Salutation */}
        <p
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: '36px',
            color: '#c9184a',
            marginBottom: '4px',
            letterSpacing: '1px',
            lineHeight: 1.1
          }}
        >
          Dear One,
        </p>

        {/* The Question */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '38px',
            fontWeight: 800,
            lineHeight: 1.25,
            margin: '0 0 16px 0',
            letterSpacing: '-0.5px',
            background: 'linear-gradient(135deg, #800020 0%, #c9184a 50%, #ff0055 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Will you go on a date with me?
        </h1>

        <p
          style={{
            fontSize: '15.5px',
            color: '#6e4b52',
            maxWidth: '430px',
            margin: '0 auto 26px auto',
            lineHeight: 1.6,
            fontWeight: 500
          }}
        >
          Under the starry night and fluttering rose petals, I'd love to make this Valentine's unforgettable with you.
        </p>

        {/* Playful Evasion Dialog Alert */}
        {wittyMessage && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#fff1f4',
              border: '1.5px dashed #ff4d6d',
              padding: '10px 20px',
              borderRadius: '20px',
              color: '#a4161a',
              fontSize: '14px',
              fontWeight: 700,
              marginBottom: '26px',
              animation: 'pulseGlow 1.4s infinite'
            }}
          >
            <AlertCircle size={16} color="#ff0055" />
            <span>{wittyMessage}</span>
          </div>
        )}

        {/* Yes Button Container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            minHeight: '80px',
            position: 'relative',
            marginTop: '10px'
          }}
        >
          {/* YES BUTTON */}
          <button
            onClick={handleYesClick}
            style={{
              transform: `scale(${yesScale})`,
              transformOrigin: 'center center',
              transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              padding: isSuperYes ? '18px 44px' : '16px 38px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #a4161a 0%, #e60039 40%, #ff2a6d 100%)',
              color: '#ffffff',
              fontSize: isSuperYes ? '19px' : '17px',
              fontWeight: 800,
              border: '2px solid #ffe5eb',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: isSuperYes
                ? '0 16px 45px rgba(230, 0, 57, 0.65), 0 0 35px rgba(255, 42, 109, 0.55)'
                : '0 12px 30px rgba(230, 0, 57, 0.4), 0 0 18px rgba(255, 77, 109, 0.3)',
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 18px 45px rgba(230, 0, 57, 0.7), 0 0 35px rgba(255, 42, 109, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = isSuperYes
                ? '0 16px 45px rgba(230, 0, 57, 0.65), 0 0 35px rgba(255, 42, 109, 0.55)'
                : '0 12px 30px rgba(230, 0, 57, 0.4), 0 0 18px rgba(255, 77, 109, 0.3)';
            }}
          >
            <Heart size={isSuperYes ? 24 : 20} fill="#ffffff" />
            <span>{isSuperYes ? "YES! A THOUSAND TIMES YES! 💖" : "Yes, absolutely! 💖"}</span>
          </button>

          {/* NO BUTTON (Initial State inside card before any escape) */}
          {!isEscaped && (
            <button
              onClick={handleNoInteraction}
              onMouseEnter={handleNoInteraction}
              onTouchStart={handleNoInteraction}
              style={{
                padding: '12px 24px',
                borderRadius: '999px',
                backgroundColor: '#fff0f3',
                color: '#800e26',
                fontSize: '14px',
                fontWeight: 700,
                border: '1.5px solid #ffccd5',
                cursor: 'pointer',
                zIndex: 5,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
              }}
            >
              No 💔
            </button>
          )}
        </div>

        {/* Footer */}
        <p
          style={{
            marginTop: '32px',
            fontSize: '12.5px',
            color: '#b76e79',
            letterSpacing: '0.8px',
            fontWeight: 600
          }}
        >
          Drafted With Pure Love ✨
        </p>
      </div>

      {/* FULL-PAGE DODGING "NO" BUTTON (Teleports anywhere on the entire screen!) */}
      {isEscaped && (
        <button
          onClick={handleNoInteraction}
          onMouseEnter={handleNoInteraction}
          onTouchStart={handleNoInteraction}
          style={{
            position: 'fixed',
            top: noFixedPos.top,
            left: noFixedPos.left,
            transform: 'translate(-50%, -50%)',
            transition: 'top 0.22s ease-out, left 0.22s ease-out',
            padding: '12px 26px',
            borderRadius: '999px',
            backgroundColor: '#ffffff',
            color: '#a4161a',
            fontSize: '14px',
            fontWeight: 800,
            border: '2px solid #ff4d6d',
            cursor: 'pointer',
            zIndex: 9999,
            whiteSpace: 'nowrap',
            boxShadow: '0 10px 30px rgba(220, 20, 60, 0.35)',
            animation: 'pulseGlow 1.5s infinite'
          }}
        >
          {noButtonLabels[Math.min(noCount, noButtonLabels.length - 1)]}
        </button>
      )}
    </div>
  );
}
