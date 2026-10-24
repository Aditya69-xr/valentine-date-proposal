import React, { useState } from 'react';
import { Calendar, Clock, Utensils, MessageSquareHeart, Check, ArrowRight, Heart, Sparkles } from 'lucide-react';

/**
 * Interface I2_Availability: "Planning Our Date"
 * Features:
 * - Premium polished Date Picker (defaults to 2026-02-14, clean UI without redundant chips)
 * - Time Availability with Candlelight dinner presets
 * - Food Selection (Matcha removed, Pizza, Coffee Date, Burger, Noodles, Ramen, Date included)
 * - Other Suggestions box
 */
export default function AvailabilityScreen({ onSubmit, onBack }) {
  const today = new Date().toISOString().split('T')[0];
  const maxDate = '2026-12-31';

  // State
  const [selectedDate, setSelectedDate] = useState('2026-02-14');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('7:00 PM (Candlelight Dinner 🕯️)');
  const [customTime, setCustomTime] = useState('');
  const [selectedFoods, setSelectedFoods] = useState(['Pizza', 'Coffee Date']);
  const [suggestion, setSuggestion] = useState('');

  // Food options strictly respecting user feedback (Matcha removed)
  const foodOptions = [
    { id: 'Pizza', label: 'Pizza', icon: '🍕', desc: 'Cheesy & romantic slice' },
    { id: 'Coffee Date', label: 'Coffee Date', icon: '☕', desc: 'Deep talks & latte art' },
    { id: 'Burger', label: 'Burger', icon: '🍔', desc: 'Juicy, cheesy & fun' },
    { id: 'Noodles', label: 'Noodles', icon: '🍜', desc: 'Lady & the Tramp style' },
    { id: 'Ramen', label: 'Ramen', icon: '🍲', desc: 'Warm, cozy soul soup' },
    { id: 'Date', label: 'Date', icon: '🌴', desc: 'Sweet treats & romance' }
  ];

  const timePresets = [
    { label: '5:00 PM', desc: 'Golden Sunset Walk 🌅' },
    { label: '7:00 PM', desc: 'Candlelight Dinner 🕯️' },
    { label: '8:30 PM', desc: 'Dessert & Stargazing ✨' }
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

  // Human-readable date preview
  const formattedDatePreview = (() => {
    try {
      const d = new Date(selectedDate + 'T00:00:00');
      return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    } catch {
      return selectedDate;
    }
  })();

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalTime = customTime.trim() ? customTime : selectedTimeSlot;
    onSubmit({
      date: selectedDate,
      formattedDate: formattedDatePreview,
      time: finalTime,
      foods: selectedFoods,
      suggestion: suggestion.trim() || 'A magical surprise moment'
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
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(18px)',
          borderRadius: '34px',
          border: '2px solid rgba(255, 182, 193, 0.6)',
          boxShadow: '0 25px 60px rgba(220, 20, 60, 0.16)',
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
              border: '1px solid #ffccd5',
              padding: '6px 16px',
              borderRadius: '999px',
              color: '#c9184a',
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1.2px',
              marginBottom: '10px'
            }}
          >
            <Heart size={14} fill="#c9184a" color="#c9184a" />
            <span>Planning Our Date</span>
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
            When are you free?
          </h1>
          <p style={{ color: '#6e4b52', fontSize: '14.5px', fontWeight: 500 }}>
            Choose our special date, time slot, and food cravings!
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Section 1: Refined Date Selection */}
          <div
            style={{
              backgroundColor: '#fffbfb',
              padding: '22px',
              borderRadius: '22px',
              border: '1.5px solid #f9ccd4',
              boxShadow: '0 4px 15px rgba(201, 24, 74, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={20} color="#c9184a" />
                <label
                  style={{
                    fontWeight: 800,
                    fontSize: '16px',
                    color: '#800e26',
                    fontFamily: 'var(--font-serif)'
                  }}
                >
                  Date Selection (2026)
                </label>
              </div>
              <span
                style={{
                  fontSize: '12px',
                  backgroundColor: '#ffe5eb',
                  color: '#a4161a',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontWeight: 700
                }}
              >
                {formattedDatePreview}
              </span>
            </div>

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
                borderRadius: '14px',
                border: '2px solid #ffccd5',
                backgroundColor: '#ffffff',
                color: '#2a0b12',
                fontWeight: 700,
                outline: 'none',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)',
                cursor: 'pointer'
              }}
            />
          </div>

          {/* Section 2: Time Availability (Candlelight Dinner preset) */}
          <div
            style={{
              backgroundColor: '#fffbfb',
              padding: '22px',
              borderRadius: '22px',
              border: '1.5px solid #f9ccd4',
              boxShadow: '0 4px 15px rgba(201, 24, 74, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Clock size={20} color="#c9184a" />
              <label
                style={{
                  fontWeight: 800,
                  fontSize: '16px',
                  color: '#800e26',
                  fontFamily: 'var(--font-serif)'
                }}
              >
                Time Availability
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: '10px' }}>
              {timePresets.map((t) => {
                const fullLabel = `${t.label} (${t.desc})`;
                const isSelected = selectedTimeSlot.startsWith(t.label) && !customTime;
                return (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => {
                      setSelectedTimeSlot(fullLabel);
                      setCustomTime('');
                    }}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '16px',
                      textAlign: 'left',
                      border: isSelected ? '2px solid #e60039' : '1.5px solid #f5d6dc',
                      backgroundColor: isSelected ? '#fff0f3' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 6px 16px rgba(230, 0, 57, 0.18)' : 'none'
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '14.5px', color: isSelected ? '#c9184a' : '#2a0b12' }}>
                      {t.label}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#6e4b52', marginTop: '3px', fontWeight: 500 }}>
                      {t.desc}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Time */}
            <div style={{ marginTop: '12px' }}>
              <input
                type="text"
                placeholder="Or specify custom time (e.g. 7:30 PM, Sunset Walk, Midnight brunch)"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: customTime ? '2px solid #e60039' : '1.5px solid #f5d6dc',
                  backgroundColor: '#ffffff',
                  fontSize: '13.5px',
                  outline: 'none',
                  color: '#2a0b12',
                  fontWeight: 600
                }}
              />
            </div>
          </div>

          {/* Section 3: Food Selection (Matcha Removed) */}
          <div
            style={{
              backgroundColor: '#fffbfb',
              padding: '22px',
              borderRadius: '22px',
              border: '1.5px solid #f9ccd4',
              boxShadow: '0 4px 15px rgba(201, 24, 74, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Utensils size={20} color="#c9184a" />
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
                gap: '12px'
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
                      padding: '14px 10px',
                      borderRadius: '18px',
                      border: isSelected ? '2px solid #e60039' : '1.5px solid #f5d6dc',
                      backgroundColor: isSelected ? '#ffe5eb' : '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      boxShadow: isSelected ? '0 8px 18px rgba(230, 0, 57, 0.16)' : 'none'
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
                    <span style={{ fontSize: '28px', marginBottom: '4px' }}>{item.icon}</span>
                    <span style={{ fontSize: '13.5px', fontWeight: 800, color: isSelected ? '#a4161a' : '#2a0b12' }}>
                      {item.label}
                    </span>
                    <span style={{ fontSize: '10.5px', color: '#7a5259', marginTop: '2px', fontWeight: 500 }}>
                      {item.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Other Suggestions */}
          <div
            style={{
              backgroundColor: '#fffbfb',
              padding: '22px',
              borderRadius: '22px',
              border: '1.5px solid #f9ccd4',
              boxShadow: '0 4px 15px rgba(201, 24, 74, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <MessageSquareHeart size={20} color="#c9184a" />
              <label
                style={{
                  fontWeight: 800,
                  fontSize: '16px',
                  color: '#800e26',
                  fontFamily: 'var(--font-serif)'
                }}
              >
                Other Suggestions
              </label>
            </div>
            <input
              type="text"
              placeholder="[Your suggestion]"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              style={{
                width: '100%',
                padding: '13px 18px',
                fontSize: '14.5px',
                borderRadius: '14px',
                border: '1.5px solid #ffccd5',
                backgroundColor: '#ffffff',
                outline: 'none',
                color: '#2a0b12',
                fontWeight: 600
              }}
            />
          </div>

          {/* Submit Action */}
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
