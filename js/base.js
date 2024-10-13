// js/base.js
export class Base {
    constructor(x, y, assets) {
      this.width = 600;
      this.height = 600;
      this.x = x - this.width / 2; // Adjust x to center the base
      this.y = y - this.height / 2; // Adjust y to center the base
      this.health = 500;
      this.maxHealth = 500;
      this.image = assets.getAsset('base.png');
    }
  
    draw(ctx, camera) {
      ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y, this.width, this.height);
      // Draw Health Bar
      const healthBarWidth = this.width;
      const healthBarHeight = 10;
      const healthRatio = this.health / this.maxHealth;
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x - camera.x, this.y - camera.y - 15, healthBarWidth, healthBarHeight);
      ctx.fillStyle = 'blue';
      ctx.fillRect(this.x - camera.x, this.y - camera.y - 15, healthRatio * healthBarWidth, healthBarHeight);
    }
}
