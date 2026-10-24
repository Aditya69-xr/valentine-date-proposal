/**
 * romanticAudio.js
 * Synthesizes a soft, gentle romantic melody and harp/chime tones using the browser Web Audio API.
 * 100% offline, requires zero external mp3 files, never breaks on CORS.
 */

let audioCtx = null;
let isPlaying = false;
let loopTimeout = null;

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
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
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
    console.warn('Audio not allowed yet:', e);
  }
}

export function startRomanticMusic() {
  if (isPlaying) return;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    isPlaying = true;

    // Romantic chord progression (Canon in D / Love Theme feel)
    // Frequencies for a soothing warm harp/music box
    const melody = [
      { f: 523.25, d: 0.6 }, // C5
      { f: 587.33, d: 0.6 }, // D5
      { f: 659.25, d: 0.8 }, // E5
      { f: 783.99, d: 1.0 }, // G5
      { f: 659.25, d: 0.6 }, // E5
      { f: 523.25, d: 1.2 }, // C5
      { f: 440.00, d: 0.8 }, // A4
      { f: 523.25, d: 1.4 }  // C5
    ];

    let noteIdx = 0;
    const playNextNote = () => {
      if (!isPlaying || !audioCtx) return;
      const note = melody[noteIdx];
      noteIdx = (noteIdx + 1) % melody.length;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle'; // Warm, soft sound
      osc.frequency.setValueAtTime(note.f, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + note.d);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + note.d);

      loopTimeout = setTimeout(playNextNote, note.d * 900);
    };

    playNextNote();
  } catch (e) {
    console.warn('Web Audio error:', e);
  }
}

export function stopRomanticMusic() {
  isPlaying = false;
  if (loopTimeout) clearTimeout(loopTimeout);
  if (audioCtx) {
    try {
      audioCtx.close();
    } catch {
      // ignore
    }
    audioCtx = null;
  }
}
