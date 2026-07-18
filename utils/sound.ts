"use client";

class SoundManager {
  private ctx: AudioContext | null = null;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private muted: boolean = false;

  private init() {
    if (this.ctx) return;
    const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      this.ctx = new AudioContextClass();
    }
  }

  setMuted(val: boolean) {
    this.muted = val;
    if (this.ctx) {
      try {
        if (val) {
          this.ctx.suspend();
        } else {
          this.ctx.resume();
          // Resume ambient loop if started
          this.playAmbient();
        }
      } catch (e) {}
    }
  }

  isMuted() {
    return this.muted;
  }

  playAmbient() {
    this.init();
    if (!this.ctx || this.muted) return;
    if (this.ambientOsc) return;

    try {
      // Force resume in case browser auto-suspended context
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Deep space sub-hum (55Hz sine wave)
      osc.type = "sine";
      osc.frequency.setValueAtTime(55, this.ctx.currentTime);

      // Low pass filter to keep it sub-bass
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(120, this.ctx.currentTime);

      // Soft background volume
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      this.ambientOsc = osc;
      this.ambientGain = gain;
    } catch (e) {}
  }

  stopAmbient() {
    if (this.ambientOsc) {
      try {
        this.ambientOsc.stop();
        this.ambientOsc.disconnect();
      } catch (e) {}
      this.ambientOsc = null;
    }
  }

  playHover() {
    this.init();
    if (!this.ctx || this.muted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      // Quick pitch sweep up representing a hover signal sweep
      osc.frequency.setValueAtTime(550, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(820, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.004, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {}
  }

  playSelect() {
    this.init();
    if (!this.ctx || this.muted) return;
    try {
      const now = this.ctx.currentTime;
      // High-end sci-fi digital chord sweep (Major triads)
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.035);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.35, now + idx * 0.035 + 0.22);

        gain.gain.setValueAtTime(0.012, now + idx * 0.035);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.035 + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.035);
        osc.stop(now + idx * 0.035 + 0.22);
      });
    } catch (e) {}
  }

  playReturn() {
    this.init();
    if (!this.ctx || this.muted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      // Deep frequency swoop representing engine decelerations
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(95, this.ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.016, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch (e) {}
  }

  playClick() {
    this.init();
    if (!this.ctx || this.muted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(920, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }
}

export const sound = new SoundManager();
