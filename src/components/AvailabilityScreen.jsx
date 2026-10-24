import React, { useState } from 'react';
import { Calendar, Clock, Utensils, MessageSquareHeart, Check, ArrowRight, Heart, Sparkles } from 'lucide-react';

/**
 * Interface I2_Availability: "Planning Our Date"
 * Features:
 * - Date Range updated: 2026 to 2030 with year quick-jump buttons
 * - Time picker made super easy with 1-click popular romantic time slots + smooth time picker
 * - Food Selection: 6 items (Pizza, Coffee Date, Burger, Noodles, Ramen, Food based on your suggestion)
 * - Merged Other Suggestions box
 */
export default function AvailabilityScreen({ onSubmit, onBack }) {
  const minDate = '2026-01-01';
  const maxDate = '2030-12-31';

  // State
  const [selectedDate, setSelectedDate] = useState('2026-02-14');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('7:00 PM (Candlelight Dinner 🕯️)');
  const [customTime, setCustomTime] = useState('');
  const [selectedFoods, setSelectedFoods] = useState(['Pizza', 'Coffee Date']);
  const [suggestion, setSuggestion] = useState('');

  // 6 Food options
  const foodOptions = [
    { id: 'Pizza', label: 'Pizza', icon: '🍕', desc: 'Cheesy & romantic slice' },
    { id: 'Coffee Date', label: 'Coffee Date', icon: '☕', desc: 'Deep talks & latte art' },
    { id: 'Burger', label: 'Burger', icon: '🍔', desc: 'Juicy, cheesy & fun' },
    { id: 'Noodles', label: 'Noodles', icon: '🍜', desc: 'Lady & the Tramp style' },
    { id: 'Ramen', label: 'Ramen', icon: '🍲', desc: 'Warm, cozy soul soup' },
    { id: 'CustomFood', label: 'Food based on your suggestion', icon: '🍽️', desc: 'Whatever your heart desires' }
  ];

  // Easy 1-click romantic time slots
  const timePresets = [
    { label: '5:00 PM', desc: 'Sunset Walk 🌅' },
    { label: '7:00 PM', desc: 'Candlelight Dinner 🕯️' },
    { label: '8:30 PM', desc: 'Dessert & Stargazing ✨' },
    { label: '10:00 PM', desc: 'Late Night Long Drive 🌙' }
  ];

  const yearsList = ['2026', '2027', '2028', '2029', '2030'];

  const handleYearChange = (yr) => {
    // Preserve current month and day, swap year
    const parts = selectedDate.split('-');
    const newMonth = parts[1] || '02';
    const newDay = parts[2] || '14';
    setSelectedDate(`${yr}-${newMonth}-${newDay}`);
  };

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

  const currentYear = selectedDate.split('-')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalTime = customTime.trim() ? customTime : selectedTimeSlot;
    onSubmit({
      date: selectedDate,
      formattedDate: formattedDatePreview,
      time: finalTime,
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
            Choose our special date (2026 - 2030), easy time slot, and food cravings!
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          {/* Section 1: Date Selection (2026 - 2030) */}
          <div
            style={{
              backgroundColor: '#fff8f9',
              padding: '22px',
              borderRadius: '24px',
              border: '2px solid #ffccd5',
              boxShadow: '0 6px 18px rgba(220, 20, 60, 0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
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
                  Date Selection (2026 - 2030)
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

            {/* Quick Year Selector Buttons (2026 to 2030) */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: '#8b5a64', fontWeight: 700, alignSelf: 'center' }}>
                Quick Year:
              </span>
              {yearsList.map((yr) => {
                const isSelected = currentYear === yr;
                return (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => handleYearChange(yr)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #e60039' : '1px solid #ffccd5',
                      backgroundColor: isSelected ? '#e60039' : '#ffffff',
                      color: isSelected ? '#ffffff' : '#800e26',
                      fontWeight: 800,
                      fontSize: '13px',
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 4px 12px rgba(230, 0, 57, 0.25)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {yr}
                  </button>
                );
              })}
            </div>

            {/* Native Calendar Input (Bounded 2026 to 2030) */}
            <input
              type="date"
              min={minDate}
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

          {/* Section 2: Easy Time Selection */}
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
                  Select Time
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
                🕯️ {customTime.trim() ? customTime : selectedTimeSlot}
              </span>
            </div>

            {/* 1-Click Easy Popular Romantic Time Presets */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))', gap: '8px', marginBottom: '14px' }}>
              {timePresets.map((t) => {
                const fullText = `${t.label} (${t.desc})`;
                const isSelected = selectedTimeSlot.startsWith(t.label) && !customTime;
                return (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => {
                      setSelectedTimeSlot(fullText);
                      setCustomTime('');
                    }}
                    style={{
                      padding: '12px 10px',
                      borderRadius: '16px',
                      textAlign: 'center',
                      border: isSelected ? '2px solid #e60039' : '1.5px solid #ffccd5',
                      backgroundColor: isSelected ? '#ffe5eb' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 6px 15px rgba(230, 0, 57, 0.18)' : 'none'
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '13.5px', color: isSelected ? '#a4161a' : '#2a0b12' }}>
                      {t.label}
                    </div>
                    <div style={{ fontSize: '11px', color: '#6e4b52', marginTop: '2px', fontWeight: 500 }}>
                      {t.desc}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Time Option */}
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Or type custom time (e.g. 6:30 PM, Sunset, Midnight brunch)"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: customTime ? '2px solid #e60039' : '1.5px solid #ffccd5',
                  backgroundColor: '#ffffff',
                  fontSize: '13px',
                  outline: 'none',
                  color: '#2a0b12',
                  fontWeight: 600
                }}
              />
            </div>
          </div>

          {/* Section 3: Food Selection + Other Suggestions */}
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

            {/* Other Suggestions Box */}
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
