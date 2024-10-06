// js/laser.js
export class Laser {
    constructor(x, y, targetX, targetY, speed, assets) {
      this.x = x;
      this.y = y;
      this.width = 30;  // Increased from 10
      this.height = 30; // Increased from 10
      this.speed = speed;
      this.angle = Math.atan2(targetY - y, targetX - x);
      this.creationTime = Date.now();
      this.lifetime = 3000; // milliseconds
      this.isHit = false; // Flag to check if the laser has hit a target
      this.hitPosition = null; // Position where the laser hit
      // Optional: If using an image
    }
  
    update() {
      if (!this.isHit) {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
      }
    }
  
    draw(ctx, camera) {
      if (!this.isHit) {
        // Draw the laser as a brighter red line
        ctx.strokeStyle = 'rgb(255, 50, 50)';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(this.x - camera.x, this.y - camera.y);
        ctx.lineTo(
          this.x + Math.cos(this.angle) * 60 - camera.x,
          this.y + Math.sin(this.angle) * 60 - camera.y
        );
        ctx.stroke();
      } else if (this.hitPosition) {
        // Optionally, draw the laser up to the hit position
        ctx.strokeStyle = 'rgb(255, 50, 50)';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(this.x - camera.x, this.y - camera.y);
        ctx.lineTo(
          this.hitPosition.x - camera.x,
          this.hitPosition.y - camera.y
        );
        ctx.stroke();
      }
    }
  
    isExpired() {
      return Date.now() - this.creationTime > this.lifetime || this.isHit;
    }
  
    // Call this method when the laser hits a target
    hit(position) {
      this.isHit = true;
      this.hitPosition = position;
    }
  }
