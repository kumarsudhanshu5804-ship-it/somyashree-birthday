// Web Audio API Sound Effects and Ambient Romantic Music Engine

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Sound Effects
export const playKeySound = () => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    // Gentle soft key pop
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.08);
    
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    // Ignore audio error
  }
};

export const playPasscodeSuccessSound = () => {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
      
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + i * 0.1 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.4);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + i * 0.1);
      osc.stop(ctx.currentTime + i * 0.1 + 0.4);
    });
  } catch (e) {
    // Ignore
  }
};

export const playPullCordSound = () => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {
    // Ignore
  }
};

export const playLampIgniteSound = () => {
  try {
    const ctx = getAudioContext();
    // Warm gentle bell sound
    const notes = [440, 659.25, 880];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);
      gain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.05 + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.05);
      osc.stop(ctx.currentTime + idx * 0.05 + 0.8);
    });
  } catch (e) {
    // Ignore
  }
};

export const playCakeSliceSound = () => {
  try {
    const ctx = getAudioContext();
    // Sparkly chime glissando
    const chimes = [587.33, 739.99, 880, 1174.66, 1318.51, 1567.98];
    chimes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06);
      gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.06 + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.06);
      osc.stop(ctx.currentTime + i * 0.06 + 0.5);
    });
  } catch (e) {
    // Ignore
  }
};

export const playBlowCandlesSound = () => {
  try {
    const ctx = getAudioContext();
    // Wind blow whoosh (noise/filtered oscillator)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(240, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.55);

    // Celebratory fanfare arpeggio
    const fanfare = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C E G C E
    fanfare.forEach((freq, i) => {
      const fOsc = ctx.createOscillator();
      const fGain = ctx.createGain();
      fOsc.type = 'triangle';
      fOsc.frequency.setValueAtTime(freq, ctx.currentTime + 0.3 + i * 0.09);
      fGain.gain.setValueAtTime(0, ctx.currentTime + 0.3 + i * 0.09);
      fGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.3 + i * 0.09 + 0.03);
      fGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3 + i * 0.09 + 0.6);
      fOsc.connect(fGain);
      fGain.connect(ctx.destination);
      fOsc.start(ctx.currentTime + 0.3 + i * 0.09);
      fOsc.stop(ctx.currentTime + 0.3 + i * 0.09 + 0.6);
    });
  } catch (e) {
    // Ignore
  }
};

export const playCandleLightSound = () => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {}
};

export const playPopSound = () => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {}
};

export const playEnvelopeOpenSound = () => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {
    // Ignore
  }
};

// Ambient Romantic Melody & YouTube Music Engine
type MusicListener = (isPlaying: boolean) => void;

export function extractYouTubeVideoId(url?: string): string | null {
  if (!url) return null;
  const cleanUrl = url.trim();
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = cleanUrl.match(regExp);
  if (match && match[1]) return match[1];
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) return cleanUrl;
  return null;
}

class RomanticMusicPlayer {
  private isPlaying = false;
  private timer: number | null = null;
  private noteIndex = 0;
  private volume = 0.8;
  private audioElement: HTMLAudioElement | null = null;
  private ytPlayer: any = null;
  private ytReady = false;
  private currentYouTubeId: string | null = null;
  private isCustomAudio = false;
  private listeners: Set<MusicListener> = new Set();
  private pendingPlay = false;
  private apiPollTimer: number | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initYouTubeAPI();
      this.setupWindowMessageListener();
    }
  }

  private initYouTubeAPI() {
    if (typeof window === 'undefined') return;

    // Check if script already injected
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const prevReady = (window as any).onYouTubeIframeAPIReady;
    (window as any).onYouTubeIframeAPIReady = () => {
      if (typeof prevReady === 'function') {
        try { prevReady(); } catch (e) {}
      }
      this.onYouTubeAPIReady();
    };

    // If YT is already available
    if ((window as any).YT && (window as any).YT.Player) {
      this.onYouTubeAPIReady();
    } else {
      // Poll a few times just in case the ready event fired before listener
      let attempts = 0;
      this.apiPollTimer = window.setInterval(() => {
        attempts++;
        if ((window as any).YT && (window as any).YT.Player) {
          if (this.apiPollTimer) clearInterval(this.apiPollTimer);
          this.onYouTubeAPIReady();
        } else if (attempts > 30) {
          if (this.apiPollTimer) clearInterval(this.apiPollTimer);
        }
      }, 200);
    }
  }

  private setupWindowMessageListener() {
    if (typeof window === 'undefined') return;

    window.addEventListener('message', (event) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data && data.event === 'infoDelivery' && data.info) {
          if (typeof data.info.playerState === 'number') {
            const state = data.info.playerState;
            if (state === 1) {
              // Playing
              this.isPlaying = true;
              this.notify(true);
            } else if (state === 2) {
              // Paused
              this.isPlaying = false;
              this.notify(false);
            } else if (state === 0) {
              // Ended -> Loop playback
              this.sendIframeCommand('seekTo', [0, true]);
              this.sendIframeCommand('playVideo');
            }
          }
        }
      } catch (e) {
        // Ignore unparseable postMessage
      }
    });
  }

  private onYouTubeAPIReady() {
    if (this.currentYouTubeId && !this.ytPlayer) {
      this.bindYTPlayer(this.currentYouTubeId);
    }
  }

  private ensureIframeExists(videoId: string): HTMLIFrameElement {
    let host = document.getElementById('youtube-audio-host');
    if (!host) {
      host = document.createElement('div');
      host.id = 'youtube-audio-host';
      host.style.position = 'fixed';
      host.style.bottom = '-150px';
      host.style.right = '-150px';
      host.style.width = '64px';
      host.style.height = '64px';
      host.style.opacity = '0.001';
      host.style.pointerEvents = 'auto';
      host.style.zIndex = '-9999';
      document.body.appendChild(host);
    }

    let iframe = host.querySelector<HTMLIFrameElement>('iframe#youtube-audio-iframe');
    const targetSrc = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&loop=1&playlist=${videoId}&playsinline=1&controls=0&disablekb=1&fs=0&rel=0&modestbranding=1&origin=${encodeURIComponent(
      window.location.origin
    )}`;

    if (!iframe) {
      // Clear host contents
      host.innerHTML = '';
      iframe = document.createElement('iframe');
      iframe.id = 'youtube-audio-iframe';
      iframe.width = '64';
      iframe.height = '64';
      iframe.src = targetSrc;
      iframe.allow = 'autoplay; encrypted-media';
      iframe.style.border = 'none';
      host.appendChild(iframe);
    } else if (!iframe.src.includes(videoId)) {
      iframe.src = targetSrc;
    }

    return iframe;
  }

  private bindYTPlayer(videoId: string) {
    if (typeof window === 'undefined') return;
    if (!(window as any).YT || !(window as any).YT.Player) return;

    const iframe = this.ensureIframeExists(videoId);

    try {
      this.ytPlayer = new (window as any).YT.Player(iframe, {
        events: {
          onReady: (event: any) => {
            this.ytReady = true;
            try {
              event.target.unMute();
              event.target.setVolume(Math.round(this.volume * 100));
            } catch (e) {}
            if (this.pendingPlay || this.isPlaying) {
              try {
                event.target.playVideo();
              } catch (e) {}
            }
          },
          onStateChange: (event: any) => {
            if (event.data === 1) {
              this.isPlaying = true;
              this.notify(true);
            } else if (event.data === 2) {
              this.isPlaying = false;
              this.notify(false);
            } else if (event.data === 0) {
              try {
                event.target.seekTo(0);
                event.target.playVideo();
              } catch (e) {}
            }
          },
        },
      });
    } catch (e) {
      // Direct postMessage fallback will handle playback
    }
  }

  private sendIframeCommand(func: string, args: any[] = []) {
    try {
      const iframe = document.querySelector<HTMLIFrameElement>('#youtube-audio-host iframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: func,
            args: args,
          }),
          '*'
        );
      }
    } catch (e) {
      // Ignore
    }
  }

  subscribe(listener: MusicListener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(playing: boolean) {
    this.listeners.forEach((l) => {
      try {
        l(playing);
      } catch (e) {
        // Ignore listener error
      }
    });
  }

  // Romantic progression: Cmaj7 -> Am7 -> Fmaj7 -> G7 (sweet arpeggio)
  private chords = [
    [261.63, 329.63, 392.00, 493.88], // C E G B
    [220.00, 261.63, 329.63, 392.00], // A C E G
    [174.61, 220.00, 261.63, 329.63], // F A C E
    [196.00, 246.94, 293.66, 392.00], // G B D G
  ];

  setCustomAudio(url?: string) {
    if (!url || url.trim() === '') {
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement = null;
      }
      this.isCustomAudio = false;
      this.currentYouTubeId = null;
      return;
    }

    const ytId = extractYouTubeVideoId(url);
    if (ytId) {
      this.currentYouTubeId = ytId;
      this.isCustomAudio = true;
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement = null;
      }

      // Immediately create or update iframe
      this.ensureIframeExists(ytId);

      if ((window as any).YT && (window as any).YT.Player) {
        if (!this.ytPlayer) {
          this.bindYTPlayer(ytId);
        } else if (this.ytReady) {
          try {
            this.ytPlayer.loadVideoById(ytId);
            this.ytPlayer.unMute();
            this.ytPlayer.setVolume(Math.round(this.volume * 100));
            if (this.isPlaying || this.pendingPlay) {
              this.ytPlayer.playVideo();
            }
          } catch (e) {}
        }
      } else {
        this.initYouTubeAPI();
      }

      if (this.isPlaying || this.pendingPlay) {
        this.sendIframeCommand('unMute');
        this.sendIframeCommand('setVolume', [Math.round(this.volume * 100)]);
        this.sendIframeCommand('playVideo');
      }
      return;
    }

    // Regular HTML5 audio URL
    this.currentYouTubeId = null;
    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.loop = true;
    }
    this.audioElement.src = url;
    this.audioElement.volume = this.volume;
    this.isCustomAudio = true;
    if (this.isPlaying) {
      this.audioElement.play().catch(() => {});
    }
  }

  setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
    if (this.ytPlayer && this.ytReady) {
      try {
        this.ytPlayer.setVolume(Math.round(this.volume * 100));
      } catch (e) {}
    }
    this.sendIframeCommand('setVolume', [Math.round(this.volume * 100)]);
  }

  getVolume() {
    return this.volume;
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  play() {
    this.pendingPlay = true;
    this.isPlaying = true;
    this.notify(true);

    try {
      getAudioContext();
    } catch (e) {}

    // 1. YouTube audio playback
    if (this.currentYouTubeId) {
      // Ensure iframe is in DOM
      this.ensureIframeExists(this.currentYouTubeId);

      if (this.ytPlayer && this.ytReady) {
        try {
          this.ytPlayer.unMute();
          this.ytPlayer.setVolume(Math.round(this.volume * 100));
          this.ytPlayer.playVideo();
        } catch (e) {}
      } else {
        this.initYouTubeAPI();
      }

      // Guaranteed postMessage playback trigger
      this.sendIframeCommand('unMute');
      this.sendIframeCommand('setVolume', [Math.round(this.volume * 100)]);
      this.sendIframeCommand('playVideo');
      return;
    }

    // 2. Custom MP3 audio element
    if (this.isCustomAudio && this.audioElement) {
      this.audioElement.play().catch(() => {});
      return;
    }

    // 3. Synthesized romantic melody fallback
    const scheduleNextNote = () => {
      if (!this.isPlaying || this.isCustomAudio) return;
      try {
        const ctx = getAudioContext();
        const chordIdx = Math.floor((this.noteIndex / 8) % this.chords.length);
        const chord = this.chords[chordIdx];
        const pitch = chord[this.noteIndex % chord.length] * (this.noteIndex % 2 === 0 ? 1 : 2);

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = this.noteIndex % 4 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(pitch, ctx.currentTime);

        const noteVol = this.volume * 0.08;
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(noteVol, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.85);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.9);

        this.noteIndex++;
      } catch (e) {
        // Audio suspended or disabled
      }

      this.timer = window.setTimeout(scheduleNextNote, 320);
    };

    scheduleNextNote();
  }

  pause() {
    this.pendingPlay = false;
    this.isPlaying = false;
    this.notify(false);

    if (this.currentYouTubeId) {
      if (this.ytPlayer && this.ytReady) {
        try {
          this.ytPlayer.pauseVideo();
        } catch (e) {}
      }
      this.sendIframeCommand('pauseVideo');
      return;
    }

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }
}

export const musicPlayer = new RomanticMusicPlayer();
