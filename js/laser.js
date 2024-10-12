// js/laser.js
export class Laser {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = 0;
        this.y = 0;
        this.width = 30;
        this.height = 30;
        this.speed = 0;
        this.angle = 0;
        this.creationTime = 0;
        this.lifetime = 3000;
        this.isHit = false;
        this.hitPosition = null;
    }

    init(x, y, targetX, targetY, speed) {
        console.log('Laser init values:', { x, y, targetX, targetY, speed });
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.angle = Math.atan2(targetY - y, targetX - x);
        this.creationTime = Date.now();
        this.isHit = false;
        this.hitPosition = null;
        console.log('Laser after init:', this);
    }

    update() {
        if (!this.isHit) {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            console.log(`Laser updated - x: ${this.x}, y: ${this.y}`); // Add this line
        }
    }

    draw(ctx, camera) {
        if (!this.isHit) {
            ctx.save();
            
            // Define laser properties
            const laserLength = this.width * 2; // Make the laser longer
            const laserWidth = 6; // Increase the width of the laser
            const glowWidth = 12; // Width of the glow effect
            
            // Calculate end points
            const endX = this.x + Math.cos(this.angle) * laserLength;
            const endY = this.y + Math.sin(this.angle) * laserLength;
            
            // Draw the glow effect
            const gradient = ctx.createLinearGradient(
                this.x - camera.x, this.y - camera.y,
                endX - camera.x, endY - camera.y
            );
            gradient.addColorStop(0, 'rgba(255, 50, 50, 0)');
            gradient.addColorStop(0.5, 'rgba(255, 100, 100, 0.7)');
            gradient.addColorStop(1, 'rgba(255, 50, 50, 0)');
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = glowWidth;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(this.x - camera.x, this.y - camera.y);
            ctx.lineTo(endX - camera.x, endY - camera.y);
            ctx.stroke();
            
            // Draw the core of the laser
            ctx.strokeStyle = 'rgb(255, 50, 50)';
            ctx.lineWidth = laserWidth;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(this.x - camera.x, this.y - camera.y);
            ctx.lineTo(endX - camera.x, endY - camera.y);
            ctx.stroke();
            
            // Draw pointed ends
            ctx.fillStyle = 'rgb(255, 50, 50)';
            ctx.beginPath();
            ctx.arc(this.x - camera.x, this.y - camera.y, laserWidth / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(endX - camera.x, endY - camera.y, laserWidth / 2, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        } else if (this.hitPosition) {
            // Draw hit laser (you may want to adjust this part as well)
            ctx.strokeStyle = 'rgb(255, 50, 50)';
            ctx.lineWidth = 2;
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
