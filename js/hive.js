// js/hive.js
export class Hive {
    constructor(x, y, assets) {
      this.x = x;
      this.y = y;
      this.width = 300; // Increased from 200
      this.height = 300; // Increased from 200
      this.health = 100;
      this.hiveType = this.getRandomHiveType();
      this.image = assets.getAsset(`${this.hiveType}.png`);
    }
  
    getRandomHiveType() {
      const types = ['hive1', 'hive2', 'hive3', 'hive4'];
      return types[Math.floor(Math.random() * types.length)];
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
