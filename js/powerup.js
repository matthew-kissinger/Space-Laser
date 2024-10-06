// js/powerup.js

export class PowerUp {
    constructor(x, y, type, assets) {
      this.x = x;
      this.y = y;
      this.width = 60;
      this.height = 60;
      this.type = type; // 'health', 'laser', etc.
      this.image = assets.getAsset(`${type}.png`);
      this.creationTime = Date.now();
      this.lifetime = 15000; // 15 seconds lifetime
    }
  
    draw(ctx, camera) {
      ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y, this.width, this.height);
    }
  
    isExpired() {
      return Date.now() - this.creationTime > this.lifetime;
    }
}
