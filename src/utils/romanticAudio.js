/**
 * romanticAudio.js
 * Synthesizes a lush, polyphonic acoustic romantic love song (Canon / Pop Love Ballad progression).
 * Features:
 * - Rich bass harmony chords (C - G - Am - F)
 * - Shimmering acoustic piano & harp arpeggio melody
 * - Reverb and soft harmonics
 * - 100% browser native Web Audio API (zero external mp3 download needed, never fails)
 */

let audioCtx = null;
let isPlaying = false;
let loopInterval = null;
let activeNodes = [];

export function toggleRomanticMusic(onStateChange) {
  if (isPlaying) {
    stopRomanticMusic();
    if (onStateChange) onStateChange(false);
    return false;
  } else {
    startRomanticMusic();
    if (onStateChange) onStateChange(true);
    return true;
  }
}

export function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.7);
    });
  } catch (e) {
    console.warn('Audio notice:', e);
  }
}

export function startRomanticMusic() {
  if (isPlaying) return;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    isPlaying = true;

    // Master Volume & Compressor for rich cinematic sound
    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.18, audioCtx.currentTime);

    const compressor = audioCtx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-24, audioCtx.currentTime);
    compressor.knee.setValueAtTime(30, audioCtx.currentTime);
    compressor.ratio.setValueAtTime(12, audioCtx.currentTime);
    compressor.attack.setValueAtTime(0.003, audioCtx.currentTime);
    compressor.release.setValueAtTime(0.25, audioCtx.currentTime);

    masterGain.connect(compressor);
    compressor.connect(audioCtx.destination);

    // Love Ballad Chords: C -> G -> Am -> F
    const chords = [
      { bass: 130.81, notes: [261.63, 329.63, 392.00, 523.25], arps: [523.25, 659.25, 783.99, 659.25] }, // C Major
      { bass: 98.00,  notes: [246.94, 293.66, 392.00, 493.88], arps: [493.88, 587.33, 783.99, 587.33] }, // G Major
      { bass: 110.00, notes: [220.00, 261.63, 329.63, 440.00], arps: [440.00, 523.25, 659.25, 523.25] }, // A Minor
      { bass: 87.31,  notes: [174.61, 261.63, 349.23, 440.00], arps: [349.23, 440.00, 523.25, 659.25] }  // F Major
    ];

    let chordIdx = 0;
    const chordDuration = 3.2; // seconds per chord measure

    const playChordMeasure = () => {
      if (!isPlaying || !audioCtx) return;

      const chord = chords[chordIdx];
      chordIdx = (chordIdx + 1) % chords.length;
      const now = audioCtx.currentTime;

      // 1. Warm Bass Note (Sine + Soft Triangle)
      const bassOsc = audioCtx.createOscillator();
      const bassGain = audioCtx.createGain();
      bassOsc.type = 'triangle';
      bassOsc.frequency.setValueAtTime(chord.bass, now);
      bassGain.gain.setValueAtTime(0.001, now);
      bassGain.gain.linearRampToValueAtTime(0.14, now + 0.3);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + chordDuration);
      bassOsc.connect(bassGain);
      bassGain.connect(masterGain);
      bassOsc.start(now);
      bassOsc.stop(now + chordDuration);

      // 2. Polyphonic Pad Chords (Harmony Strings)
      chord.notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.06 / (idx + 1), now + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.001, now + chordDuration);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + chordDuration);
      });

      // 3. Shimmering Acoustic Harp / Piano Melody Arpeggio
      chord.arps.forEach((freq, i) => {
        const noteTime = now + i * (chordDuration / 4);
        const arpOsc = audioCtx.createOscillator();
        const arpGain = audioCtx.createGain();

        arpOsc.type = 'sine';
        arpOsc.frequency.setValueAtTime(freq, noteTime);

        arpGain.gain.setValueAtTime(0.001, noteTime);
        arpGain.gain.linearRampToValueAtTime(0.12, noteTime + 0.05);
        arpGain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.9);

        arpOsc.connect(arpGain);
        arpGain.connect(masterGain);
        arpOsc.start(noteTime);
        arpOsc.stop(noteTime + 1.0);
      });
    };

    playChordMeasure();
    loopInterval = setInterval(playChordMeasure, chordDuration * 1000);
  } catch (e) {
    console.warn('Web Audio error:', e);
  }
}

export function stopRomanticMusic() {
  isPlaying = false;
  if (loopInterval) {
    clearInterval(loopInterval);
    loopInterval = null;
  }
  if (audioCtx) {
    try {
      audioCtx.close();
    } catch {
      // ignore
    }
    audioCtx = null;
  }
}
