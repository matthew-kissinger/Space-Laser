// js/laserTower.js
import { laserPool } from './gameObjects.js';
import { soundManager } from './soundManager.js';

export class LaserTower {
  constructor(x, y, assets) {
    this.x = x;
    this.y = y;
    this.width = 150; // Increased from 50 (3x)
    this.height = 150; // Increased from 50 (3x)
    this.range = 900; // Increased from 300 (3x)
    this.fireRate = 800; // Decreased from 1000 (3x faster)
    this.lastFireTime = 0;
    this.image = assets.getAsset('laser_tower.png');
    this.shootEffect = { active: false, timer: 0 };
  }

  update(aliens, lasers, currentTime) {
    if (currentTime - this.lastFireTime >= this.fireRate) {
      const target = this.findNearestAlien(aliens);
      if (target) {
        const angle = Math.atan2(target.y - this.y, target.x - this.x);
        const laserStartX = this.x + this.width / 2;
        const laserStartY = this.y + this.height / 4; // Lowered the shooting point
        const targetX = laserStartX + Math.cos(angle) * 1000;
        const targetY = laserStartY + Math.sin(angle) * 1000;

        const laser = laserPool.get();
        laser.init(laserStartX, laserStartY, targetX, targetY, 10);
        lasers.push(laser);

        this.lastFireTime = currentTime;
        soundManager.playLaser();
        this.activateShootEffect();
      }
    }

    this.updateShootEffect();
  }

  findNearestAlien(aliens) {
    return aliens.reduce((nearest, alien) => {
      const distance = Math.hypot(alien.x - this.x, alien.y - this.y);
      if (distance <= this.range && (!nearest || distance < nearest.distance)) {
        return { alien, distance };
      }
      return nearest;
    }, null)?.alien;
  }

  draw(ctx, camera) {
    // Draw the tower half its height lower
    ctx.drawImage(
      this.image, 
      this.x - camera.x, 
      this.y - camera.y + this.height / 2, 
      this.width, 
      this.height
    );

    // Draw shoot effect
    if (this.shootEffect.active) {
      ctx.fillStyle = `rgba(255, 0, 0, ${1 - this.shootEffect.timer / 10})`;
      ctx.beginPath();
      ctx.arc(
        this.x + this.width / 2 - camera.x,
        this.y + this.height / 4 - camera.y,
        this.shootEffect.timer * 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }

  activateShootEffect() {
    this.shootEffect.active = true;
    this.shootEffect.timer = 0;
  }

  updateShootEffect() {
    if (this.shootEffect.active) {
      this.shootEffect.timer++;
      if (this.shootEffect.timer >= 10) {
        this.shootEffect.active = false;
      }
    }
  }
}
