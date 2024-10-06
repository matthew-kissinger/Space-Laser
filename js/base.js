// js/base.js
export class Base {
    constructor(x, y, assets) {
      this.x = x;
      this.y = y;
      this.width = 400; // Increased from 200
      this.height = 400; // Increased from 200
      this.health = 500;
      this.maxHealth = 500; // Add this line to explicitly define max health
      this.image = assets.getAsset('base.png');
    }
  
    draw(ctx, camera) {
      ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y, this.width, this.height);
      // Draw Health Bar
      const healthBarWidth = this.width;
      const healthBarHeight = 10;
      const healthRatio = this.health / this.maxHealth; // Use maxHealth here
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x - camera.x, this.y - camera.y - 15, healthBarWidth, healthBarHeight);
      ctx.fillStyle = 'blue';
      ctx.fillRect(this.x - camera.x, this.y - camera.y - 15, healthRatio * healthBarWidth, healthBarHeight);
    }
}
