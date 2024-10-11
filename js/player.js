// js/player.js
import { clamp } from './utils.js';
import { FIRE_RATE } from './gameConfig.js';
import { soundManager } from './soundManager.js';
import { laserPool } from './gameObjects.js';

export class Player {
  constructor(x, y, assets) {
    this.x = x;
    this.y = y;
    this.width = 100; // Increased from 50
    this.height = 100; // Increased from 50
    this.speed = 5;
    this.health = 100;
    this.laserCount = 1;
    this.maxLasers = 8; // Add this line to set the maximum number of lasers
    this.image = assets.getAsset('spaceship.png');
    this.laserPowerUpActive = false;
    this.laserPowerUpEndTime = 0;
    this.lastFireTime = 0;
  }

  update(keys, mapWidth, mapHeight) {
    if (keys.ArrowUp || keys.w) {
      this.y -= this.speed;
    }
    if (keys.ArrowDown || keys.s) {
      this.y += this.speed;
    }
    if (keys.ArrowLeft || keys.a) {
      this.x -= this.speed;
    }
    if (keys.ArrowRight || keys.d) {
      this.x += this.speed;
    }

    // Clamp the player's position within the map boundaries
    this.x = clamp(this.x, 0, mapWidth - this.width);
    this.y = clamp(this.y, 0, mapHeight - this.height);

    // Check if laser power-up has ended
    if (this.laserPowerUpActive && Date.now() > this.laserPowerUpEndTime) {
      this.deactivateLaserPowerUp();
    }
  }

  draw(ctx, camera) {
    ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y, this.width, this.height);
  }

  addLaser() {
    if (this.laserCount < this.maxLasers) {
      this.laserCount += 1;
      return true; // Return true if a laser was successfully added
    }
    return false; // Return false if the laser limit has been reached
  }

  getLaserAngles() {
    if (this.laserPowerUpActive) {
      return Array.from({ length: 12 }, (_, i) => (i * Math.PI * 2) / 12);
    }
    if (this.laserCount === 1) {
      return [0];
    }
    const angleStep = (2 * Math.PI) / this.laserCount;
    return Array.from({ length: this.laserCount }, (_, i) => i * angleStep);
  }

  fireLasers(lasers, angle) {
    const currentTime = Date.now();
    const fireRate = this.laserPowerUpActive ? FIRE_RATE / 2 : FIRE_RATE;
    
    if (currentTime - this.lastFireTime < fireRate) return;

    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    const angles = this.getLaserAngles();
    
    angles.forEach((offsetAngle, index) => {
      const finalAngle = angle + offsetAngle;
      
      const laserStartX = centerX + Math.cos(finalAngle) * (this.width / 2);
      const laserStartY = centerY + Math.sin(finalAngle) * (this.height / 2);
      
      const targetX = laserStartX + Math.cos(finalAngle) * 1000;
      const targetY = laserStartY + Math.sin(finalAngle) * 1000;
      
      console.log('Laser creation values:', {
        centerX, centerY, finalAngle, laserStartX, laserStartY, targetX, targetY
      });
      
      const laser = laserPool.get();
      laser.init(laserStartX, laserStartY, targetX, targetY, 10);
      lasers.push(laser);
      console.log(`Laser ${index} created:`, laser);
    });

    console.log('Total lasers after firing:', lasers.length);

    soundManager.playLaser();
    if (this.laserPowerUpActive) {
      soundManager.playPowerup();
    }

    this.lastFireTime = currentTime;
  }

  activateLaserPowerUp() {
    this.laserPowerUpActive = true;
    this.laserPowerUpEndTime = Date.now() + 10000; // 10 seconds duration
  }

  deactivateLaserPowerUp() {
    this.laserPowerUpActive = false;
  }
}
