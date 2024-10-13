// js/alien.js
export class Alien {
    constructor(x, y, target, assets) {
      this.x = x;
      this.y = y;
      this.target = target; // Could be Player or Base
      this.alienType = this.getRandomAlienType();
      this.setAlienProperties(assets);
    }
  
    getRandomAlienType() {
      const types = ['alien1', 'alien2', 'alien3'];
      return types[Math.floor(Math.random() * types.length)];
    }

    setAlienProperties(assets) {
      switch(this.alienType) {
        case 'alien1':
          this.width = 150;
          this.height = 150;
          this.speed = 1;
          this.health = 50;
          this.damage = 20;
          break;
        case 'alien2':
          this.width = 90;
          this.height = 90;
          this.speed = 3;
          this.health = 20;
          this.damage = 5;
          break;
        case 'alien3':
          this.width = 120;
          this.height = 120;
          this.speed = 2;
          this.health = 30;
          this.damage = 10;
          break;
      }
      this.image = assets.getAsset(`${this.alienType}.png`);
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
      const healthRatio = this.health / this.getMaxHealth();
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x - camera.x, this.y - camera.y - 10, healthBarWidth, healthBarHeight);
      ctx.fillStyle = 'green';
      ctx.fillRect(this.x - camera.x, this.y - camera.y - 10, healthRatio * healthBarWidth, healthBarHeight);
    }

    getMaxHealth() {
      switch(this.alienType) {
        case 'alien1': return 50;
        case 'alien2': return 20;
        case 'alien3': return 30;
      }
    }
}
