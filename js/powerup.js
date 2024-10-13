// js/powerup.js

export class PowerUp {
    constructor(x, y, type, assets) {
      this.x = x;
      this.y = y;
      this.width = 120;  // Increased from 60 to 120 (2x larger)
      this.height = 120; // Increased from 60 to 120 (2x larger)
      this.type = type; // 'health', 'laser', etc.
      this.image = assets.getAsset(`${type}.png`);
      this.creationTime = Date.now();
      this.lifetime = 20000; // 30 seconds lifetime
    }
  
    draw(ctx, camera) {
      ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y, this.width, this.height);
    }
  
    isExpired() {
      return Date.now() - this.creationTime > this.lifetime;
    }
}
