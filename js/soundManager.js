export class SoundManager {
  constructor() {
    this.sounds = {};
    this.loadSound('background', 'assets/background.wav', true);
    this.loadSound('powerup', 'assets/powerup.wav');
    this.loadSound('collapse', 'assets/collapse.wav');
    this.loadSound('aliendead', 'assets/aliendead.wav');
    this.loadSound('laser', 'assets/laser.wav');
  }

  loadSound(name, path, loop = false) {
    const audio = new Audio();
    audio.src = path;
    audio.loop = loop;
    audio.onerror = () => {
      console.error(`Failed to load sound: ${path}`);
      this.sounds[name] = null; // Set to null if loading fails
    };
    audio.oncanplaythrough = () => {
      this.sounds[name] = audio;
    };
  }

  playSound(name) {
    if (this.sounds[name]) {
      // Create a new Audio instance for each play to allow overlapping sounds
      const sound = this.sounds[name].cloneNode();
      sound.play().catch(e => console.error(`Error playing sound ${name}:`, e));
    } else {
      console.warn(`Sound not found or failed to load: ${name}`);
    }
  }

  playBackground() { 
    if (this.sounds.background) {
      this.sounds.background.play().catch(e => console.error('Error playing background music:', e));
    } else {
      console.warn('Background music not loaded');
    }
  }
  playPowerup() { this.playSound('powerup'); }
  playCollapse() { this.playSound('collapse'); }
  playAlienDead() { this.playSound('aliendead'); }
  playLaser() { this.playSound('laser'); }
}

export const soundManager = new SoundManager();