// Vinyl crackle synthesized via Web Audio API.
// Creates a looping noise buffer with sparse random pops, filtered to a
// high-frequency vinyl-like character. Volume can be ramped in/out.

export function createVinylCrackle(ctx) {
  const seconds = 4;
  const buffer = ctx.createBuffer(1, seconds * ctx.sampleRate, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    // soft continuous hiss
    data[i] = (Math.random() * 2 - 1) * 0.06;
    // sparse pops
    if (Math.random() < 0.0007) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }
    // occasional bigger crackle clusters
    if (Math.random() < 0.00012) {
      for (let k = 0; k < 60 && i + k < data.length; k++) {
        data[i + k] += (Math.random() * 2 - 1) * 0.4 * (1 - k / 60);
      }
    }
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const highpass = ctx.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 1800;

  const lowpass = ctx.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = 8000;

  const gain = ctx.createGain();
  gain.gain.value = 0;

  source.connect(highpass).connect(lowpass).connect(gain).connect(ctx.destination);
  source.start();

  return {
    setVolume(v, fadeMs = 600) {
      const now = ctx.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(v, now + fadeMs / 1000);
    },
    stop() {
      try { source.stop(); } catch (e) { /* noop */ }
    },
  };
}
