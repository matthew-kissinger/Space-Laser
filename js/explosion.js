// js/explosion.js
export class Explosion {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 10;
      this.maxRadius = 20;
      this.expansionRate = 2; // pixels per frame
      this.alpha = 1.0; // Opacity
      this.fadeRate = 0.05; // Opacity decrease per frame
      this.isFinished = false;
    }
  
    update() {
      if (this.radius < this.maxRadius) {
        this.radius += this.expansionRate;
      } else {
        this.alpha -= this.fadeRate;
        if (this.alpha <= 0) {
          this.isFinished = true;
        }
      }
    }
  
    draw(ctx, camera) {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(this.x - camera.x, this.y - camera.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
