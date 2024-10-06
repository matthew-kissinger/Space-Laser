// js/hive.js
export class Hive {
    constructor(x, y, assets) {
      this.x = x;
      this.y = y;
      this.width = 200; // Increased from 100
      this.height = 200; // Increased from 100
      this.health = 100;
      this.image = assets.getAsset('hive.png');
    }
  
    draw(ctx, camera) {
      ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y, this.width, this.height);
      // Draw Health Bar
      const healthBarWidth = this.width;
      const healthBarHeight = 5;
      const healthRatio = this.health / 100;
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x - camera.x, this.y - camera.y - 10, healthBarWidth, healthBarHeight);
      ctx.fillStyle = 'green';
      ctx.fillRect(this.x - camera.x, this.y - camera.y - 10, healthRatio * healthBarWidth, healthBarHeight);
    }
  }
