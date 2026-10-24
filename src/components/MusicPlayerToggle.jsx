import React, { useState } from 'react';
import { VolumeX, Volume2 } from 'lucide-react';
import { toggleRomanticMusic } from '../utils/romanticAudio';

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
        right: '250px',
        zIndex: 40
      }}
    >
      <button
        onClick={handleToggle}
        title={isPlaying ? "Mute romantic melody" : "Play romantic melody"}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 18px',
          backgroundColor: isPlaying ? '#c9184a' : 'rgba(255, 255, 255, 0.92)',
          color: isPlaying ? '#ffffff' : '#c9184a',
          backdropFilter: 'blur(10px)',
          border: '1.5px solid var(--rose-gold)',
          borderRadius: '999px',
          fontSize: '13px',
          fontWeight: 700,
          boxShadow: isPlaying
            ? '0 8px 20px rgba(201, 24, 74, 0.35)'
            : '0 8px 20px rgba(103, 13, 30, 0.12)',
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
        {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
        <span>{isPlaying ? 'Music: ON 🎵' : 'Romantic Music 🎵'}</span>
      </button>
    </div>
  );
}
