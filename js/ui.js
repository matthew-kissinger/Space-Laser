// js/ui.js

import { clamp } from './utils.js';
import { level } from './gameState.js';
import { getUpgrades, getScore } from './gameObjects.js';
import { WIDTH, HEIGHT } from './gameConfig.js';
import { player } from './gameObjects.js'; // Add this import

const PADDING = 20;
const BAR_HEIGHT = 20;
const BAR_WIDTH = 250;
const CORNER_RADIUS = 5;

let lastTime = performance.now();
let frameCount = 0;
let fps = 0;

export function drawUI(ctx, player, base) {
  drawHealthBars(ctx, player, base);
  drawLevelInfo(ctx);
  drawUpgradeInfo(ctx);
  drawScore(ctx);
  drawFPS(ctx); // Add this line
}

function drawHealthBars(ctx, player, base) {
  const playerHealthPercentage = player.health / 100;
  const baseHealthPercentage = base.health / 500;

  // Player Health Bar
  drawBar(ctx, PADDING, PADDING, BAR_WIDTH, BAR_HEIGHT, playerHealthPercentage, '#4CAF50', '#1B5E20', 'ATLAS-7 Shield');

  // Base Health Bar
  drawBar(ctx, PADDING, PADDING * 2 + BAR_HEIGHT, BAR_WIDTH, BAR_HEIGHT, baseHealthPercentage, '#2196F3', '#0D47A1', 'Base Integrity');
}

function drawBar(ctx, x, y, width, height, fillPercentage, fillColor, strokeColor, label) {
  // Draw label
  ctx.fillStyle = '#ADD8E6';
  ctx.font = 'bold 16px "Orbitron", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(label, x, y - 5);

  // Draw background
  ctx.fillStyle = 'rgba(173, 216, 230, 0.2)';
  roundRect(ctx, x, y, width, height, CORNER_RADIUS, true, false);

  // Draw fill
  ctx.fillStyle = fillColor;
  roundRect(ctx, x, y, width * fillPercentage, height, CORNER_RADIUS, true, false);

  // Draw border
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 2;
  roundRect(ctx, x, y, width, height, CORNER_RADIUS, false, true);
}

function drawLevelInfo(ctx) {
  ctx.fillStyle = '#FFD700';
  ctx.font = 'bold 20px "Orbitron", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`Mission Level: ${level}`, PADDING, PADDING * 3 + BAR_HEIGHT * 2 + 30);
}

function drawUpgradeInfo(ctx) {
  const upgrades = getUpgrades();
  
  ctx.fillStyle = '#FFD700';
  ctx.font = 'bold 20px "Orbitron", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`Available Upgrades: ${upgrades}`, PADDING, PADDING * 4 + BAR_HEIGHT * 2 + 60);

  if (upgrades > 0) {
    ctx.font = 'bold 16px "Orbitron", sans-serif';
    ctx.fillStyle = '#ADD8E6';
    let yOffset = 85;
    if (player.laserCount < player.maxLasers) {
      ctx.fillText('1: Add Laser', PADDING, PADDING * 5 + BAR_HEIGHT * 2 + yOffset);
      yOffset += 25;
    }
    ctx.fillText('2: Add Laser Tower', PADDING, PADDING * 5 + BAR_HEIGHT * 2 + yOffset);
    yOffset += 25;
    ctx.fillText('3: Repair Base', PADDING, PADDING * 5 + BAR_HEIGHT * 2 + yOffset);
  }
}

function drawScore(ctx) {
  const score = getScore();
  ctx.fillStyle = '#FFD700';
  ctx.font = 'bold 24px "Orbitron", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(`Score: ${score}`, WIDTH - PADDING, PADDING + 24);
}

function drawFPS(ctx) {
  const currentTime = performance.now();
  frameCount++;

  if (currentTime - lastTime >= 1000) {
    fps = frameCount;
    frameCount = 0;
    lastTime = currentTime;
  }

  ctx.fillStyle = '#ADD8E6';
  ctx.font = '16px "Orbitron", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`FPS: ${fps}`, 10, HEIGHT - 10);
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}
