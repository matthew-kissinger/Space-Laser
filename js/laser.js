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
        console.log(`Drawing laser - x: ${this.x}, y: ${this.y}, camera: ${camera.x}, ${camera.y}`);
        if (!this.isHit) {
            ctx.save();
            ctx.strokeStyle = 'rgb(255, 50, 50)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(this.x - camera.x, this.y - camera.y);
            ctx.lineTo(
                this.x + Math.cos(this.angle) * this.width - camera.x,
                this.y + Math.sin(this.angle) * this.width - camera.y
            );
            ctx.stroke();
            ctx.restore();
        } else if (this.hitPosition) {
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
