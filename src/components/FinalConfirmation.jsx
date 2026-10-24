import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import HappyValentineEmblem from './HappyValentineEmblem';
import { playChime } from '../utils/romanticAudio';
import { 
  CheckCircle2, MessageCircle, Calendar, Clock, Utensils, 
  Sparkles, Copy, Check, Ticket, Send, Heart 
} from 'lucide-react';

/**
 * Interface Final_Confirmation_Send:
 * message_to_user: "You are done. You will get a message on your WhatsApp number."
 * action: "Trigger_WhatsApp_Notification"
 * (Replay Proposal button removed as requested)
 */
export default function FinalConfirmation({ planData }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Play celebratory romantic chime
    playChime();

    // Grand celebration fireworks!
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: ['#ff0055', '#ff5483', '#ffccd5', '#ffd166', '#a4161a']
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: ['#ff0055', '#ff5483', '#ffccd5', '#ffd166', '#a4161a']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Slide in the realistic WhatsApp push notification banner
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 600);

    // Save proposal to localStorage
    try {
      const payload = {
        id: Date.now(),
        ...planData,
        status: 'Accepted',
        timestamp: new Date().toISOString()
      };
      const existing = JSON.parse(localStorage.getItem('proposals') || '[]');
      existing.push(payload);
      localStorage.setItem('proposals', JSON.stringify(existing));
    } catch {
      // ignore
    }

    return () => clearTimeout(timer);
  }, [planData]);

  const displayDate = planData.formattedDate || planData.date;

  const messageText = `🌹 *Valentine's Date Proposal Confirmed!* 💖\n\n` +
    `💍 *Status:* Accepted with all my heart!\n` +
    `📅 *Scheduled Date:* ${displayDate}\n` +
    `⏰ *Time Slot:* ${planData.time}\n` +
    `🍽️ *Food Preferences:* ${planData.foods.join(', ')}\n` +
    `💌 *Sweet Note:* "${planData.suggestion}"\n\n` +
    `Can't wait for our special date! 💕✨`;

  const handleWhatsAppTrigger = () => {
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    let url = `https://api.whatsapp.com/send?text=${encodeURIComponent(messageText)}`;
    if (cleanNumber.length >= 10) {
      url = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodeURIComponent(messageText)}`;
    }
    window.open(url, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '88vh',
        padding: '30px 16px',
        position: 'relative',
        zIndex: 10
      }}
    >
      {/* Realistic WhatsApp Push Notification Banner */}
      {showNotification && (
        <div
          style={{
            position: 'fixed',
            top: '25px',
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: '470px',
            width: '92%',
            backgroundColor: '#ffffff',
            borderRadius: '22px',
            padding: '14px 20px',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            zIndex: 100,
            animation: 'slideDownNotification 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div
            style={{
              backgroundColor: '#25D366',
              borderRadius: '14px',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              flexShrink: 0
            }}
          >
            <MessageCircle size={26} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#111b21' }}>
                WhatsApp Notification
              </span>
              <span style={{ fontSize: '10.5px', color: '#667781' }}>Just now</span>
            </div>
            <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#3b4a54', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              💖 Valentine Date Confirmed! Candlelight dinner & memories locked in.
            </p>
          </div>
        </div>
      )}

      {/* Main Confirmation Glass Card */}
      <div
        style={{
          maxWidth: '620px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(20px)',
          borderRadius: '36px',
          border: '2px solid rgba(255, 182, 193, 0.7)',
          boxShadow: '0 25px 65px rgba(220, 20, 60, 0.18)',
          padding: '40px 30px',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        {/* Success Icon */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            backgroundColor: '#e8f5e9',
            border: '2.5px solid #81c784',
            color: '#2e7d32',
            marginBottom: '14px'
          }}
        >
          <CheckCircle2 size={38} />
        </div>

        {/* Happy Valentine's Emblem */}
        <HappyValentineEmblem size={130} />

        {/* The Exact Message to User from JSON */}
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '32px',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #800020 0%, #c9184a 50%, #ff0055 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px',
            lineHeight: 1.25
          }}
        >
          You are done.
        </h2>

        <p
          style={{
            fontSize: '16.5px',
            fontWeight: 700,
            color: '#800e26',
            backgroundColor: '#ffe5eb',
            padding: '12px 22px',
            borderRadius: '16px',
            display: 'inline-block',
            marginBottom: '24px',
            border: '1.5px solid #ffccd5'
          }}
        >
          You will get a message on your WhatsApp number. 💌
        </p>

        {/* Romantic VIP Boarding Pass / Ticket Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #fff7f8 100%)',
            borderRadius: '24px',
            border: '2px dashed #ff8fa3',
            padding: '24px',
            textAlign: 'left',
            marginBottom: '24px',
            boxShadow: '0 10px 25px rgba(201, 24, 74, 0.08)',
            position: 'relative'
          }}
        >
          {/* Ticket Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #f9ccd4',
              paddingBottom: '12px',
              marginBottom: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Ticket size={20} color="#e60039" />
              <span style={{ fontWeight: 800, fontSize: '14px', letterSpacing: '1px', color: '#c9184a', textTransform: 'uppercase' }}>
                VIP Valentine Date Pass
              </span>
            </div>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#800e26', backgroundColor: '#ffe5eb', padding: '4px 10px', borderRadius: '8px', fontWeight: 700 }}>
              #VAL-2026-LOVE
            </span>
          </div>

          {/* Ticket Body */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '11px', color: '#7a5259', textTransform: 'uppercase', display: 'block', fontWeight: 600 }}>Date</span>
              <strong style={{ fontSize: '15px', color: '#2a0b12' }}>{displayDate}</strong>
            </div>

            <div>
              <span style={{ fontSize: '11px', color: '#7a5259', textTransform: 'uppercase', display: 'block', fontWeight: 600 }}>Time Slot</span>
              <strong style={{ fontSize: '15px', color: '#2a0b12' }}>{planData.time}</strong>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <span style={{ fontSize: '11px', color: '#7a5259', textTransform: 'uppercase', display: 'block', fontWeight: 600 }}>Menu Selection</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                {planData.foods.map((food) => (
                  <span
                    key={food}
                    style={{
                      backgroundColor: '#ffe5eb',
                      color: '#a4161a',
                      fontSize: '12px',
                      fontWeight: 700,
                      padding: '4px 12px',
                      borderRadius: '12px',
                      border: '1px solid #ffccd5'
                    }}
                  >
                    {food}
                  </span>
                ))}
              </div>
            </div>

            {planData.suggestion && (
              <div style={{ gridColumn: 'span 2', backgroundColor: '#fdf2f4', padding: '12px 16px', borderRadius: '14px', border: '1px solid #f9ccd4' }}>
                <span style={{ fontSize: '11px', color: '#7a5259', textTransform: 'uppercase', display: 'block', fontWeight: 600 }}>Sweet Note</span>
                <span style={{ fontSize: '13.5px', fontStyle: 'italic', color: '#800e26', fontWeight: 600 }}>
                  "{planData.suggestion}"
                </span>
              </div>
            )}
          </div>

          {/* Ticket Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid #f9ccd4',
              paddingTop: '12px',
              fontSize: '11.5px',
              color: '#8b6f75',
              fontWeight: 500
            }}
          >
            <span>Destination: Romantic Forever 💖</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#16a34a', fontWeight: 700 }}>
              <Check size={14} /> Confirmed & Locked
            </span>
          </div>
        </div>

        {/* WhatsApp Direct Action Banner */}
        <div
          style={{
            backgroundColor: '#f0fdf4',
            border: '2px solid #86efac',
            borderRadius: '22px',
            padding: '20px',
            marginBottom: '20px'
          }}
        >
          <label
            style={{
              display: 'block',
              fontSize: '13.5px',
              fontWeight: 800,
              color: '#166534',
              marginBottom: '10px',
              textAlign: 'left'
            }}
          >
            Send Direct WhatsApp Confirmation Message:
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="tel"
              placeholder="WhatsApp Number (e.g. 9876543210)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={{
                flex: 1,
                padding: '13px 16px',
                borderRadius: '14px',
                border: '1.5px solid #86efac',
                backgroundColor: '#ffffff',
                fontSize: '14.5px',
                outline: 'none',
                fontWeight: 600
              }}
            />
            <button
              onClick={handleWhatsAppTrigger}
              style={{
                padding: '13px 22px',
                borderRadius: '14px',
                backgroundColor: '#25D366',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '15px',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 6px 16px rgba(37, 211, 102, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              <Send size={18} />
              <span>Send</span>
            </button>
          </div>
        </div>

        {/* Action Button: Copy Summary */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={handleCopy}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 24px',
              borderRadius: '999px',
              border: '1.5px solid #ffccd5',
              backgroundColor: '#ffffff',
              color: '#800e26',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
            }}
          >
            {copied ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Date Summary'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
