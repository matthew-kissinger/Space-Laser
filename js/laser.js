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
        this.gradient = null; // Add this line
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
        this.createGradient(); // Add this line
        console.log('Laser after init:', this);
    }

    createGradient() {
        // Create a canvas for the gradient
        const gradientCanvas = document.createElement('canvas');
        gradientCanvas.width = 60; // Length of the laser
        gradientCanvas.height = 6; // Width of the laser
        const gradientCtx = gradientCanvas.getContext('2d');

        // Create a gradient
        const gradient = gradientCtx.createLinearGradient(0, 0, 60, 0);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0)');
        gradient.addColorStop(0.3, 'rgba(255, 0, 0, 0.5)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.7, 'rgba(255, 0, 0, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

        // Apply the gradient
        gradientCtx.fillStyle = gradient;
        gradientCtx.fillRect(0, 0, 60, 6);

        // Store the gradient canvas
        this.gradient = gradientCanvas;
    }

    update() {
        if (!this.isHit) {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            console.log(`Laser updated - x: ${this.x}, y: ${this.y}`); // Add this line
        }
    }

    draw(ctx, camera) {
        console.log(`Drawing laser - x: ${this.x}, y: ${this.y}, camera: ${camera.x}, ${camera.y}`); // Add this line
        if (!this.isHit && this.gradient) {
            ctx.save();
            ctx.translate(this.x - camera.x, this.y - camera.y);
            ctx.rotate(this.angle);
            ctx.drawImage(this.gradient, 0, -3);
            ctx.restore();
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
