import React, { useState } from 'react';
import { Calendar, Clock, Utensils, MessageSquareHeart, Check, ArrowRight, Heart, Sparkles } from 'lucide-react';

/**
 * Interface I2_Availability: "Planning Our Date"
 * Updated according to user instructions:
 * - Date Picker beautifully decorated with hearts & badges
 * - Custom time text box removed; replaced with standard time picker & heart presets
 * - "Date" food option removed; replaced with "Your suggestion food based on your suggestion"
 * - Other Suggestions moved directly into the dining section
 */
export default function AvailabilityScreen({ onSubmit, onBack }) {
  const today = new Date().toISOString().split('T')[0];
  const maxDate = '2026-12-31';

  // State
  const [selectedDate, setSelectedDate] = useState('2026-02-14');
  const [selectedTime, setSelectedTime] = useState('19:00'); // 7:00 PM default
  const [selectedFoods, setSelectedFoods] = useState(['Pizza', 'Coffee Date']);
  const [suggestion, setSuggestion] = useState('');

  // 6 Food options strictly as requested (Date removed, custom suggestion card added)
  const foodOptions = [
    { id: 'Pizza', label: 'Pizza', icon: '🍕', desc: 'Cheesy & romantic slice' },
    { id: 'Coffee Date', label: 'Coffee Date', icon: '☕', desc: 'Deep talks & latte art' },
    { id: 'Burger', label: 'Burger', icon: '🍔', desc: 'Juicy, cheesy & fun' },
    { id: 'Noodles', label: 'Noodles', icon: '🍜', desc: 'Lady & the Tramp style' },
    { id: 'Ramen', label: 'Ramen', icon: '🍲', desc: 'Warm, cozy soul soup' },
    { id: 'CustomFood', label: 'Food based on your suggestion', icon: '🍽️', desc: 'Whatever your heart desires' }
  ];

  const timePresets = [
    { time: '17:00', label: '5:00 PM', desc: 'Sunset Walk 🌅' },
    { time: '19:00', label: '7:00 PM', desc: 'Candlelight Dinner 🕯️' },
    { time: '20:30', label: '8:30 PM', desc: 'Dessert & Stargazing ✨' }
  ];

  const toggleFood = (id) => {
    if (selectedFoods.includes(id)) {
      if (selectedFoods.length > 1) {
        setSelectedFoods(selectedFoods.filter((f) => f !== id));
      }
    } else {
      setSelectedFoods([...selectedFoods, id]);
    }
  };

  const formattedDatePreview = (() => {
    try {
      const d = new Date(selectedDate + 'T00:00:00');
      return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    } catch {
      return selectedDate;
    }
  })();

  const formattedTimePreview = (() => {
    if (!selectedTime) return '7:00 PM (Candlelight Dinner)';
    const [h, m] = selectedTime.split(':');
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  })();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      date: selectedDate,
      formattedDate: formattedDatePreview,
      time: formattedTimePreview,
      foods: selectedFoods.map(f => f === 'CustomFood' ? 'Your suggestion food based on your suggestion' : f),
      suggestion: suggestion.trim() || 'A magical surprise moment together'
    });
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
        zIndex: 5
      }}
    >
      <div
        style={{
          maxWidth: '680px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(22px)',
          borderRadius: '36px',
          border: '2px solid rgba(255, 182, 193, 0.75)',
          boxShadow: '0 25px 65px rgba(220, 20, 60, 0.18)',
          padding: '38px 30px',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '26px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#fff0f3',
              border: '1.5px solid #ffccd5',
              padding: '6px 18px',
              borderRadius: '999px',
              color: '#c9184a',
              fontSize: '12.5px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1.2px',
              marginBottom: '10px'
            }}
          >
            <Heart size={14} fill="#c9184a" color="#c9184a" />
            <span>Planning Our Date</span>
            <Heart size={14} fill="#c9184a" color="#c9184a" />
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '34px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #800020 0%, #c9184a 50%, #ff0055 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 6px 0'
            }}
          >
            When are you free? 💖
          </h1>
          <p style={{ color: '#6e4b52', fontSize: '14.5px', fontWeight: 500 }}>
            Choose our romantic date, time, and comfort cravings!
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          {/* Section 1: Date Selection Decorated with Hearts */}
          <div
            style={{
              backgroundColor: '#fff8f9',
              padding: '22px',
              borderRadius: '24px',
              border: '2px solid #ffccd5',
              boxShadow: '0 6px 18px rgba(220, 20, 60, 0.06)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Heart size={18} fill="#ff4d6d" color="#ff4d6d" className="animate-pulse" />
                <Calendar size={18} color="#c9184a" />
                <label
                  style={{
                    fontWeight: 800,
                    fontSize: '16px',
                    color: '#800e26',
                    fontFamily: 'var(--font-serif)'
                  }}
                >
                  Choose Date (2026)
                </label>
              </div>
              <span
                style={{
                  fontSize: '12px',
                  backgroundColor: '#ffe5eb',
                  color: '#a4161a',
                  padding: '4px 12px',
                  borderRadius: '14px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>🌹</span>
                <span>{formattedDatePreview}</span>
              </span>
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type="date"
                min={today}
                max={maxDate}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  fontSize: '16px',
                  borderRadius: '16px',
                  border: '2px solid #ffccd5',
                  backgroundColor: '#ffffff',
                  color: '#2a0b12',
                  fontWeight: 700,
                  outline: 'none',
                  cursor: 'pointer',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                }}
              />
            </div>
          </div>

          {/* Section 2: Time Selection (Same clean input like Date, with Candlelight presets) */}
          <div
            style={{
              backgroundColor: '#fff8f9',
              padding: '22px',
              borderRadius: '24px',
              border: '2px solid #ffccd5',
              boxShadow: '0 6px 18px rgba(220, 20, 60, 0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Heart size={18} fill="#ff4d6d" color="#ff4d6d" className="animate-pulse" />
                <Clock size={18} color="#c9184a" />
                <label
                  style={{
                    fontWeight: 800,
                    fontSize: '16px',
                    color: '#800e26',
                    fontFamily: 'var(--font-serif)'
                  }}
                >
                  Choose Time
                </label>
              </div>
              <span
                style={{
                  fontSize: '12px',
                  backgroundColor: '#ffe5eb',
                  color: '#a4161a',
                  padding: '4px 12px',
                  borderRadius: '14px',
                  fontWeight: 800
                }}
              >
                🕯️ {formattedTimePreview}
              </span>
            </div>

            {/* Clean Time Input */}
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px 18px',
                fontSize: '16px',
                borderRadius: '16px',
                border: '2px solid #ffccd5',
                backgroundColor: '#ffffff',
                color: '#2a0b12',
                fontWeight: 700,
                outline: 'none',
                cursor: 'pointer',
                marginBottom: '12px'
              }}
            />

            {/* Quick Heart Time Presets */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {timePresets.map((t) => {
                const isSelected = selectedTime === t.time;
                return (
                  <button
                    key={t.time}
                    type="button"
                    onClick={() => setSelectedTime(t.time)}
                    style={{
                      padding: '10px 8px',
                      borderRadius: '14px',
                      textAlign: 'center',
                      border: isSelected ? '2px solid #e60039' : '1.5px solid #ffccd5',
                      backgroundColor: isSelected ? '#ffe5eb' : '#ffffff',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: isSelected ? '#a4161a' : '#555',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>{t.label}</div>
                    <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>{t.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Food Selection + Other Suggestions merged right here */}
          <div
            style={{
              backgroundColor: '#fff8f9',
              padding: '22px',
              borderRadius: '24px',
              border: '2px solid #ffccd5',
              boxShadow: '0 6px 18px rgba(220, 20, 60, 0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Heart size={18} fill="#ff4d6d" color="#ff4d6d" />
                <Utensils size={18} color="#c9184a" />
                <label
                  style={{
                    fontWeight: 800,
                    fontSize: '16px',
                    color: '#800e26',
                    fontFamily: 'var(--font-serif)'
                  }}
                >
                  What should we eat?
                </label>
              </div>
              <span style={{ fontSize: '11.5px', color: '#c9184a', fontWeight: 700 }}>
                Select your favorites
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))',
                gap: '10px',
                marginBottom: '16px'
              }}
            >
              {foodOptions.map((item) => {
                const isSelected = selectedFoods.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleFood(item.id)}
                    style={{
                      padding: '12px 10px',
                      borderRadius: '16px',
                      border: isSelected ? '2px solid #e60039' : '1.5px solid #ffccd5',
                      backgroundColor: isSelected ? '#ffe5eb' : '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      boxShadow: isSelected ? '0 6px 15px rgba(230, 0, 57, 0.16)' : 'none'
                    }}
                  >
                    {isSelected && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          backgroundColor: '#e60039',
                          borderRadius: '50%',
                          width: '18px',
                          height: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff'
                        }}
                      >
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                    <span style={{ fontSize: '26px', marginBottom: '3px' }}>{item.icon}</span>
                    <span style={{ fontSize: '12.5px', fontWeight: 800, color: isSelected ? '#a4161a' : '#2a0b12', lineHeight: 1.2 }}>
                      {item.label}
                    </span>
                    <span style={{ fontSize: '10px', color: '#7a5259', marginTop: '2px' }}>
                      {item.desc}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Other Suggestions Box (Merged directly with food) */}
            <div style={{ borderTop: '1px dashed #ffccd5', paddingTop: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <MessageSquareHeart size={16} color="#c9184a" />
                <label style={{ fontSize: '13.5px', fontWeight: 700, color: '#800e26' }}>
                  Other Suggestions / Special Wish
                </label>
              </div>
              <input
                type="text"
                placeholder="[Your suggestion: e.g. Candlelight dessert, rooftop view, flowers]"
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '13.5px',
                  borderRadius: '12px',
                  border: '1.5px solid #ffccd5',
                  backgroundColor: '#ffffff',
                  outline: 'none',
                  color: '#2a0b12',
                  fontWeight: 600
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginTop: '6px' }}>
            <button
              type="button"
              onClick={onBack}
              style={{
                padding: '15px 24px',
                borderRadius: '999px',
                border: '1.5px solid #ffccd5',
                backgroundColor: '#ffffff',
                color: '#800e26',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Back
            </button>

            <button
              type="submit"
              style={{
                flex: 1,
                padding: '16px 28px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #a4161a 0%, #e60039 50%, #ff2a6d 100%)',
                color: '#ffffff',
                fontSize: '16.5px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 12px 30px rgba(230, 0, 57, 0.4)',
                transition: 'all 0.3s ease'
              }}
            >
              <span>Confirm & Lock in Our Date 💌</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
