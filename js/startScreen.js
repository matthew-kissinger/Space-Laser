// js/startScreen.js

import { getScore } from './gameObjects.js';

let showInstructions = false;
let assetLoader;

export function initStartScreen(loader) {
    assetLoader = loader;
}

export function drawStartScreen(ctx, WIDTH, HEIGHT) {
    // Background
    const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    gradient.addColorStop(0, '#000428');
    gradient.addColorStop(1, '#004e92');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Game Title
    ctx.fillStyle = 'white';
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('SpaceHive Battle', WIDTH / 2, HEIGHT / 3);

    // Buttons
    drawButton(ctx, WIDTH / 2, HEIGHT / 2, 200, 50, 'Start Game');
    drawButton(ctx, WIDTH / 2, HEIGHT / 2 + 70, 200, 50, 'Instructions');
}

export function drawInstructionsScreen(ctx, WIDTH, HEIGHT) {
    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Title
    ctx.fillStyle = 'white';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Instructions', WIDTH / 2, 80);

    // Instructions text
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    const instructions = [
        "Move: WASD or Arrow Keys",
        "Shoot: Left Mouse Button",
        "Pause: P",
        "Destroy all hives to complete a level",
        "Collect power-ups to gain advantages",
        "Use upgrades to improve your defenses",
        "Protect your base and survive!"
    ];
    instructions.forEach((instruction, index) => {
        ctx.fillText(instruction, WIDTH / 4, 150 + index * 40);
    });

    // Power-ups
    ctx.font = 'bold 24px Arial';
    ctx.fillText('Power-ups:', WIDTH / 4, 450);
    
    const powerUps = [
        { name: 'Health', image: 'health.png' },
        { name: 'Base Health', image: 'basehealth.png' },
        { name: 'Laser Power-up', image: 'laserpowerup.png' }
    ];
    
    powerUps.forEach((powerUp, index) => {
        const img = assetLoader.getAsset(powerUp.image);
        ctx.drawImage(img, WIDTH / 4, 470 + index * 70, 50, 50);
        ctx.font = '20px Arial';
        ctx.fillText(powerUp.name, WIDTH / 4 + 70, 505 + index * 70);
    });

    // Upgrades
    ctx.font = 'bold 24px Arial';
    ctx.fillText('Upgrades:', WIDTH * 2 / 3, 450);
    
    const upgrades = [
        '1: Add Laser',
        '2: Place Laser Tower',
        '3: Repair Base'
    ];
    
    upgrades.forEach((upgrade, index) => {
        ctx.font = '20px Arial';
        ctx.fillText(upgrade, WIDTH * 2 / 3, 490 + index * 40);
    });

    // Back button
    drawButton(ctx, WIDTH / 2, HEIGHT - 100, 200, 50, 'Back to Menu');
}

export function drawGameOverScreen(ctx, WIDTH, HEIGHT) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = 'red';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', WIDTH / 2, HEIGHT / 2 - 80);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 40px Arial';
    ctx.fillText(`Score: ${getScore()}`, WIDTH / 2, HEIGHT / 2);

    ctx.font = '30px Arial';
    ctx.fillText('Press ENTER or CLICK to Restart', WIDTH / 2, HEIGHT / 2 + 60);
}

export function drawPauseScreen(ctx, WIDTH, HEIGHT) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Paused', WIDTH / 2, HEIGHT / 2 - 30);

    ctx.font = '30px Arial';
    ctx.fillText('Press P to Resume', WIDTH / 2, HEIGHT / 2 + 20);
}

function drawButton(ctx, x, y, width, height, text) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(x - width / 2, y - height / 2, width, height);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(x - width / 2, y - height / 2, width, height);
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
}

export function handleStartScreenClick(x, y, WIDTH, HEIGHT) {
    if (showInstructions) {
        if (isInside(x, y, WIDTH / 2 - 100, HEIGHT - 125, 200, 50)) {
            showInstructions = false;
        }
    } else {
        if (isInside(x, y, WIDTH / 2 - 100, HEIGHT / 2 - 25, 200, 50)) {
            return 'start';
        } else if (isInside(x, y, WIDTH / 2 - 100, HEIGHT / 2 + 45, 200, 50)) {
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
