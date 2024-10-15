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
        this.glowIntensity = 1;
    }

    init(x, y, targetX, targetY, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.angle = Math.atan2(targetY - y, targetX - x);
        this.creationTime = Date.now();
        this.isHit = false;
        this.hitPosition = null;
        this.glowIntensity = 1;
    }

    update() {
        if (!this.isHit) {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            this.glowIntensity = 0.7 + Math.sin(Date.now() * 0.01) * 0.3; // Pulsating glow effect
        }
    }

    draw(ctx, camera) {
        if (!this.isHit) {
            ctx.save();
            
            const laserLength = this.width * 2;
            const laserWidth = 4;
            const glowWidth = 12;
            
            const endX = this.x + Math.cos(this.angle) * laserLength;
            const endY = this.y + Math.sin(this.angle) * laserLength;
            
            // Draw the glow effect
            const gradient = ctx.createLinearGradient(
                this.x - camera.x, this.y - camera.y,
                endX - camera.x, endY - camera.y
            );
            gradient.addColorStop(0, `rgba(255, 50, 50, 0)`);
            gradient.addColorStop(0.5, `rgba(255, 100, 100, ${0.7 * this.glowIntensity})`);
            gradient.addColorStop(1, `rgba(255, 50, 50, 0)`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = glowWidth;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(this.x - camera.x, this.y - camera.y);
            ctx.lineTo(endX - camera.x, endY - camera.y);
            ctx.stroke();
            
            // Draw the core of the laser
            ctx.strokeStyle = `rgb(255, ${50 + 205 * this.glowIntensity}, ${50 + 205 * this.glowIntensity})`;
            ctx.lineWidth = laserWidth;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(this.x - camera.x, this.y - camera.y);
            ctx.lineTo(endX - camera.x, endY - camera.y);
            ctx.stroke();
            
            // Draw energy particles
            this.drawEnergyParticles(ctx, camera);
            
            ctx.restore();
        } else if (this.hitPosition) {
            // Draw hit effect
            ctx.save();
            ctx.translate(this.hitPosition.x - camera.x, this.hitPosition.y - camera.y);
            ctx.fillStyle = `rgba(255, 100, 100, ${0.8 * this.glowIntensity})`;
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    drawEnergyParticles(ctx, camera) {
        const particleCount = 3;
        for (let i = 0; i < particleCount; i++) {
            const t = i / (particleCount - 1);
            const x = this.x + (Math.cos(this.angle) * this.width * 2 * t);
            const y = this.y + (Math.sin(this.angle) * this.width * 2 * t);
            const size = 2 + Math.random() * 2;
            
            ctx.fillStyle = `rgba(255, 200, 200, ${0.7 * this.glowIntensity})`;
            ctx.beginPath();
            ctx.arc(x - camera.x, y - camera.y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    isExpired() {
        return Date.now() - this.creationTime > this.lifetime || this.isHit;
    }

    hit(position) {
        this.isHit = true;
        this.hitPosition = position;
    }
}
