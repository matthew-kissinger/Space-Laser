// js/alien.js
export class Alien {
    constructor(x, y, target, assets) {
      this.x = x;
      this.y = y;
      this.width = 80; // Increased from 40
      this.height = 80; // Increased from 40
      this.speed = 2;
      this.target = target; // Could be Player or Base
      this.health = 30;
      this.alienType = Math.random() < 0.5 ? 'melee' : 'ranged'; // For varying behaviors
      this.image = assets.getAsset('alien.png');
    }
  
    update() {
      // Move towards the target
      const dx = this.target.x + this.target.width / 2 - (this.x + this.width / 2);
      const dy = this.target.y + this.target.height / 2 - (this.y + this.height / 2);
      const distance = Math.hypot(dx, dy);
      if (distance > 0) {
        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
      }
    }
  
    draw(ctx, camera) {
      ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y, this.width, this.height);
      // Draw Health Bar
      const healthBarWidth = this.width;
      const healthBarHeight = 5;
      const healthRatio = this.health / 30;
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x - camera.x, this.y - camera.y - 10, healthBarWidth, healthBarHeight);
      ctx.fillStyle = 'green';
      ctx.fillRect(this.x - camera.x, this.y - camera.y - 10, healthRatio * healthBarWidth, healthBarHeight);
    }
  }
