import React from 'react';
import { X, Heart, Sparkles } from 'lucide-react';

/**
 * LoveLetterModal
 * An enchanting Valentine's Love Letter parchment featuring:
 * - Cute Teddy Bears 🧸, Fluttering Hearts 💕, Roses 🌹
 * - Heartfelt Romantic Shayaris & Loving Dialogues
 * - Golden seal & wax heart design
 */
export default function LoveLetterModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(30, 5, 12, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '560px',
          width: '100%',
          maxHeight: '90vh',
          backgroundColor: '#fffdf9',
          backgroundImage: 'radial-gradient(#ffe5eb 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          borderRadius: '32px',
          border: '3px solid #ffccd5',
          boxShadow: '0 30px 70px rgba(220, 20, 60, 0.35)',
          overflowY: 'auto',
          position: 'relative',
          padding: '36px 28px',
          animation: 'pulseGlow 2s infinite ease-in-out'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#ffe5eb',
            border: 'none',
            color: '#a4161a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <X size={20} />
        </button>

        {/* Envelope Heart Header */}
        <div style={{ textAlign: 'center', marginBottom: '18px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '75px',
              height: '75px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #a4161a 0%, #e60039 50%, #ff2a6d 100%)',
              color: '#ffffff',
              boxShadow: '0 10px 25px rgba(230, 0, 57, 0.45)',
              margin: '0 auto 12px auto'
            }}
          >
            <Heart size={40} fill="#ffffff" />
          </div>

          <div style={{ fontSize: '32px' }}>
            🧸 🌹 💌 🌹 🧸
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: '38px',
              color: '#a4161a',
              margin: '8px 0 2px 0',
              lineHeight: 1.1
            }}
          >
            A Secret Letter Just For You
          </h3>
          <p style={{ fontSize: '13px', color: '#8b5a64', fontWeight: 600, letterSpacing: '0.5px' }}>
            To the one who makes my world brighter every day ✨
          </p>
        </div>

        {/* Romantic Shayaris & Loving Words */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '1.5px solid #ffccd5',
            padding: '24px 20px',
            marginBottom: '20px',
            boxShadow: '0 6px 20px rgba(201, 24, 74, 0.06)'
          }}
        >
          {/* Shayari 1 */}
          <div
            style={{
              backgroundColor: '#fff5f7',
              padding: '16px',
              borderRadius: '18px',
              borderLeft: '4px solid #e60039',
              marginBottom: '16px',
              textAlign: 'center'
            }}
          >
            <p
              style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: '#800020',
                fontWeight: 700,
                fontFamily: 'var(--font-serif)',
                margin: 0
              }}
            >
              "तेरे बिना अधूरी है ये जिंदगी मेरी,<br />
              तू मिल जाए तो मुकम्मल हो हर ख्वाहिश मेरी...<br />
              चाहत बस इतनी सी है इस वैलेंटाइन पर,<br />
              हाथों में तेरा हाथ हो, और उम्र भर का साथ हो।" 💖
            </p>
          </div>

          {/* Shayari 2 */}
          <div
            style={{
              backgroundColor: '#fff5f7',
              padding: '16px',
              borderRadius: '18px',
              borderLeft: '4px solid #c9184a',
              marginBottom: '18px',
              textAlign: 'center'
            }}
          >
            <p
              style={{
                fontSize: '15.5px',
                lineHeight: '1.7',
                color: '#670d1e',
                fontWeight: 700,
                fontFamily: 'var(--font-serif)',
                margin: 0
              }}
            >
              "रूठो जो कभी तुम, तो मना लेंगे हम,<br />
              आँखों में तुम्हारी अपनी दुनिया बसा लेंगे हम।<br />
              ना शिकवा करेंगे कभी किसी बात का,<br />
              हर जन्म में तुम्हें ही अपना बना लेंगे हम।" 🌹
            </p>
          </div>

          {/* Romantic Quote */}
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '15px',
                fontStyle: 'italic',
                color: '#a4161a',
                lineHeight: 1.6,
                margin: '0 0 10px 0'
              }}
            >
              "In all the world, there is no heart for me like yours.<br />
              In all the world, there is no love for you like mine."
            </p>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 800,
                color: '#e60039',
                backgroundColor: '#ffe5eb',
                padding: '4px 14px',
                borderRadius: '12px'
              }}
            >
              Forever & Always Yours 💕
            </span>
          </div>
        </div>

        {/* Teddy & Hearts Footer Message */}
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: '28px',
              color: '#c9184a',
              margin: '0 0 12px 0'
            }}
          >
            Happy Valentine's Day, My Love! 🧸💖
          </p>
          <button
            onClick={onClose}
            style={{
              padding: '12px 32px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #a4161a 0%, #e60039 100%)',
              color: '#ffffff',
              fontSize: '14.5px',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(230, 0, 57, 0.35)'
            }}
          >
            Fold Letter & Keep in Heart 💌
          </button>
        </div>
      </div>
    </div>
  );
}
