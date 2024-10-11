// js/startScreen.js

import { getScore } from './gameObjects.js';
import { WIDTH, HEIGHT } from './gameConfig.js';

let showInstructions = false;
let assetLoader;
let stars = [];

export function initStartScreen(loader) {
    assetLoader = loader;
    createStars();
}

function createStars() {
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * WIDTH,
            y: Math.random() * HEIGHT,
            size: Math.random() * 2 + 1,
            speed: Math.random() * 0.5 + 0.1
        });
    }
}

export function drawStartScreen(ctx, WIDTH, HEIGHT) {
    // Space background
    const spaceGradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    spaceGradient.addColorStop(0, '#000428');
    spaceGradient.addColorStop(1, '#004e92');
    ctx.fillStyle = spaceGradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Draw stars
    drawStars(ctx);

    // Game Title
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 80px "Orbitron", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Space Laser', WIDTH / 2, HEIGHT / 3);

    // Subtitle
    ctx.fillStyle = '#ADD8E6';
    ctx.font = '24px "Orbitron", sans-serif';
    ctx.fillText('Earth\'s Last Hope - 2184', WIDTH / 2, HEIGHT / 3 + 50);

    // ATLAS-7 Image
    const atlasImage = assetLoader.getAsset('spaceship.png');
    if (atlasImage) {
        ctx.drawImage(atlasImage, WIDTH / 2 - 100, HEIGHT / 2 - 100, 200, 200);
    }

    // Buttons
    drawButton(ctx, WIDTH / 2, HEIGHT * 3 / 4, 200, 50, 'Start Mission');
    drawButton(ctx, WIDTH / 2, HEIGHT * 3 / 4 + 70, 200, 50, 'Briefing');
}


export function drawInstructionsScreen(ctx, WIDTH, HEIGHT) {
    // Space background
    const spaceGradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    spaceGradient.addColorStop(0, '#000428');
    spaceGradient.addColorStop(1, '#004e92');
    ctx.fillStyle = spaceGradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Draw stars
    drawStars(ctx);

    // Title
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 40px "Orbitron", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Mission Briefing', WIDTH / 2, 80);

    // Instructions text
    ctx.font = '20px Arial';
    ctx.fillStyle = '#ADD8E6';
    ctx.textAlign = 'left';
    const instructions = [
        "Pilot Controls:",
        "- WASD / Arrow Keys: Navigate the ATLAS-7",
        "- Left Mouse Button: Fire Laser System",
        "- P: Pause Mission",
        "",
        "Objectives:",
        "- Destroy Hive structures to halt the alien invasion",
        "- Collect power-ups to enhance ATLAS-7 capabilities",
        "- Protect Earth's last base at all costs",
        "",
        "Remember, you're humanity's last hope. Good luck, pilot."
    ];
    instructions.forEach((instruction, index) => {
        ctx.fillText(instruction, WIDTH / 4, 150 + index * 30);
    });

    // Power-ups
    ctx.font = 'bold 24px "Orbitron", sans-serif';
    ctx.fillStyle = '#FFD700';
    ctx.fillText('Power-up Intel:', WIDTH / 4, 500);
    
    const powerUps = [
        { name: 'Shield Boost', image: 'health.png' },
        { name: 'Base Reinforcement', image: 'basehealth.png' },
        { name: 'Weapon Overcharge', image: 'laserpowerup.png' }
    ];
    
    powerUps.forEach((powerUp, index) => {
        const img = assetLoader.getAsset(powerUp.image);
        ctx.drawImage(img, WIDTH / 4, 520 + index * 70, 50, 50);
        ctx.font = '20px Arial';
        ctx.fillStyle = '#ADD8E6';
        ctx.fillText(powerUp.name, WIDTH / 4 + 70, 555 + index * 70);
    });

    // Back button
    drawButton(ctx, WIDTH / 2, HEIGHT - 100, 200, 50, 'Back to Hangar');
}

export function drawGameOverScreen(ctx, WIDTH, HEIGHT) {
    // Space background with red tint
    const gameOverGradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    gameOverGradient.addColorStop(0, '#4a0000');
    gameOverGradient.addColorStop(1, '#000000');
    ctx.fillStyle = gameOverGradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Draw faded stars
    drawStars(ctx, 0.5);

    ctx.fillStyle = '#FF0000';
    ctx.font = 'bold 60px "Orbitron", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Mission Failed', WIDTH / 2, HEIGHT / 2 - 80);

    ctx.fillStyle = '#ADD8E6';
    ctx.font = 'bold 40px "Orbitron", sans-serif';
    ctx.fillText(`Final Score: ${getScore()}`, WIDTH / 2, HEIGHT / 2);

    ctx.font = '30px Arial';
    ctx.fillText('Press ENTER or CLICK to Return to Base', WIDTH / 2, HEIGHT / 2 + 60);
}

export function drawPauseScreen(ctx, WIDTH, HEIGHT) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 60px "Orbitron", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Mission Paused', WIDTH / 2, HEIGHT / 2 - 30);

    ctx.fillStyle = '#ADD8E6';
    ctx.font = '30px Arial';
    ctx.fillText('Press P to Resume', WIDTH / 2, HEIGHT / 2 + 20);
}

function drawButton(ctx, x, y, width, height, text) {
    ctx.fillStyle = 'rgba(173, 216, 230, 0.2)';
    ctx.fillRect(x - width / 2, y - height / 2, width, height);
    ctx.strokeStyle = '#ADD8E6';
    ctx.lineWidth = 2;
    ctx.strokeRect(x - width / 2, y - height / 2, width, height);
    ctx.fillStyle = '#FFD700';
    ctx.font = '24px "Orbitron", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
}

function drawStars(ctx, alpha = 1) {
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Move stars
        star.y += star.speed;
        if (star.y > HEIGHT) {
            star.y = 0;
            star.x = Math.random() * WIDTH;
        }
    });
}

export function handleStartScreenClick(x, y, WIDTH, HEIGHT) {
    if (showInstructions) {
        if (isInside(x, y, WIDTH / 2 - 100, HEIGHT - 125, 200, 50)) {
            showInstructions = false;
        }
    } else {
        if (isInside(x, y, WIDTH / 2 - 100, HEIGHT * 3 / 4 - 25, 200, 50)) {
            return 'start';
        } else if (isInside(x, y, WIDTH / 2 - 100, HEIGHT * 3 / 4 + 45, 200, 50)) {
            showInstructions = true;
        }
    }
    return null;
}

function isInside(x, y, left, top, width, height) {
    return x > left && x < left + width && y > top && y < top + height;
}

export function isShowingInstructions() {
    return showInstructions;
}