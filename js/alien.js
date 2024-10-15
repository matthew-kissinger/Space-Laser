// js/alien.js
export class Alien {
    constructor(x, y, target, assets) {
      this.x = x;
      this.y = y;
      this.target = target; // Could be Player or Base
      this.alienType = this.getRandomAlienType();
      this.setAlienProperties(assets);
      this.burstCooldown = 0;
      this.burstDuration = 0;
      this.burstSpeed = this.speed * 2; // Reduced burst speed multiplier
      this.normalSpeed = this.speed;
      this.contortionPhase = 0;
      this.angle = 0; // Add this to track the alien's angle
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
          this.speed = 0.5; // Reduced speed
          this.health = 50;
          this.damage = 20;
          break;
        case 'alien2':
          this.width = 90;
          this.height = 90;
          this.speed = 1.5; // Reduced speed
          this.health = 20;
          this.damage = 5;
          break;
        case 'alien3':
          this.width = 120;
          this.height = 120;
          this.speed = 1; // Reduced speed
          this.health = 30;
          this.damage = 10;
          break;
      }
      this.image = assets.getAsset(`${this.alienType}.png`);
    }
  
    update() {
      const dx = this.target.x + this.target.width / 2 - (this.x + this.width / 2);
      const dy = this.target.y + this.target.height / 2 - (this.y + this.height / 2);
      const distance = Math.hypot(dx, dy);
      
      if (distance > 0) {
        this.angle = Math.atan2(dy, dx); // Update the angle

        if (this.burstCooldown <= 0 && this.burstDuration <= 0) {
          // Start a new burst
          this.burstDuration = Math.random() * 30 + 20;
          this.burstCooldown = Math.random() * 120 + 120; // Increased cooldown
        }

        let currentSpeed = this.normalSpeed;
        if (this.burstDuration > 0) {
          currentSpeed = this.burstSpeed;
          this.burstDuration--;
        } else {
          this.burstCooldown--;
        }

        this.x += Math.cos(this.angle) * currentSpeed;
        this.y += Math.sin(this.angle) * currentSpeed;
      }

      // Update contortion
      this.contortionPhase += 0.1;
    }
  
    draw(ctx, camera) {
      ctx.save();
      ctx.translate(this.x - camera.x + this.width / 2, this.y - camera.y + this.height / 2);
      ctx.rotate(this.angle + Math.PI / 2); // Rotate the alien to face its movement direction
      
      // Apply contortion effect
      const contortionX = Math.sin(this.contortionPhase) * 0.1;
      const contortionY = Math.cos(this.contortionPhase * 1.5) * 0.05;
      ctx.transform(1 + contortionX, 0, 0, 1 + contortionY, 0, 0);
      
      // Draw the alien
      ctx.drawImage(
        this.image,
        -this.width / 2, -this.height / 2,
        this.width, this.height
      );

      ctx.restore();

      // Draw Health Bar (not rotated)
      ctx.save();
      ctx.translate(this.x - camera.x + this.width / 2, this.y - camera.y + this.height / 2);
      const healthBarWidth = this.width;
      const healthBarHeight = 5;
      const healthRatio = this.health / this.getMaxHealth();
      ctx.fillStyle = 'red';
      ctx.fillRect(-healthBarWidth / 2, -this.height / 2 - 10, healthBarWidth, healthBarHeight);
      ctx.fillStyle = 'green';
      ctx.fillRect(-healthBarWidth / 2, -this.height / 2 - 10, healthRatio * healthBarWidth, healthBarHeight);
      ctx.restore();
    }

    getMaxHealth() {
      switch(this.alienType) {
        case 'alien1': return 50;
        case 'alien2': return 20;
        case 'alien3': return 30;
      }
    }
}
