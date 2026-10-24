import React, { useState } from 'react';
import { VolumeX, Volume2, Sparkles, Heart } from 'lucide-react';
import { toggleRomanticMusic } from '../utils/romanticAudio';

/**
 * MusicPlayerToggle
 * Positioned on Top-Right, symmetrically balanced with Wikipedia Lore on Top-Left.
 * Controls rich polyphonic romantic love song symphony.
 */
export default function MusicPlayerToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    toggleRomanticMusic((state) => {
      setIsPlaying(state);
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '24px',
        zIndex: 40
      }}
    >
      <button
        onClick={handleToggle}
        title={isPlaying ? "Mute romantic soundtrack" : "Play romantic soundtrack"}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          backgroundColor: isPlaying
            ? 'linear-gradient(135deg, #a4161a 0%, #e60039 100%)'
            : 'rgba(255, 255, 255, 0.94)',
          background: isPlaying
            ? 'linear-gradient(135deg, #a4161a 0%, #e60039 100%)'
            : 'rgba(255, 255, 255, 0.94)',
          color: isPlaying ? '#ffffff' : '#c9184a',
          backdropFilter: 'blur(12px)',
          border: '1.8px solid #ff9ebb',
          borderRadius: '999px',
          fontSize: '13.5px',
          fontWeight: 800,
          boxShadow: isPlaying
            ? '0 8px 25px rgba(230, 0, 57, 0.45), 0 0 15px rgba(255, 42, 109, 0.35)'
            : '0 8px 22px rgba(103, 13, 30, 0.12)',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {isPlaying ? (
          <>
            <Volume2 size={18} color="#ffffff" className="animate-pulse" />
            <span>Romantic Song Playing 🎶</span>
          </>
        ) : (
          <>
            <VolumeX size={18} color="#c9184a" />
            <span>Play Romantic Music 🎵</span>
          </>
        )}
      </button>
    </div>
  );
}
