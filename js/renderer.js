import { player, base, hives, aliens, lasers, powerUps, explosions, laserTowers } from './gameObjects.js';
import { camera } from './main.js';
import { WIDTH, HEIGHT, MINIMAP_WIDTH, MINIMAP_HEIGHT, MINIMAP_PADDING, MAP_WIDTH, MAP_HEIGHT } from './gameConfig.js';
import { drawUI } from './ui.js';

let backgroundImage;

export function initRenderer(assetLoader) {
  backgroundImage = assetLoader.getAsset('background.png');
}

export function draw(ctx) {
  // Clear Canvas
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Draw Background
  drawBackground(ctx);

  // Draw Game Objects
  base.draw(ctx, camera);
  hives.forEach(hive => hive.draw(ctx, camera));
  aliens.forEach(alien => alien.draw(ctx, camera));
  laserTowers.forEach(tower => tower.draw(ctx, camera));
  lasers.forEach(laser => laser.draw(ctx, camera));
  explosions.forEach(explosion => explosion.draw(ctx, camera));
  powerUps.forEach(powerUp => powerUp.draw(ctx, camera));
  player.draw(ctx, camera);

  // Draw UI Elements (including FPS counter)
  drawUI(ctx, player, base);

  // Draw Minimap
  drawMinimap(ctx);

  // Debug: Log number of aliens
  console.log(`Number of aliens: ${aliens.length}`);

  console.log('Drawing lasers. Count:', lasers.length);
  console.log('Camera position:', camera.x, camera.y);
  lasers.forEach((laser, index) => {
    console.log(`Laser ${index}:`, laser);
    laser.draw(ctx, camera);
  });

  // ... rest of the drawing code ...
}

function drawBackground(ctx) {
  if (backgroundImage) {
    ctx.drawImage(backgroundImage, -camera.x, -camera.y, MAP_WIDTH, MAP_HEIGHT);
  } else {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }
}

function drawMinimap(ctx) {
  // Draw minimap background
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(WIDTH - MINIMAP_WIDTH - MINIMAP_PADDING, HEIGHT - MINIMAP_HEIGHT - MINIMAP_PADDING, MINIMAP_WIDTH, MINIMAP_HEIGHT);

  // Define scaling factors
  const scaleX = MINIMAP_WIDTH / MAP_WIDTH;
  const scaleY = MINIMAP_HEIGHT / MAP_HEIGHT;

  // Draw Player on minimap
  ctx.fillStyle = 'green';
  ctx.fillRect(
    WIDTH - MINIMAP_WIDTH - MINIMAP_PADDING + player.x * scaleX,
    HEIGHT - MINIMAP_HEIGHT - MINIMAP_PADDING + player.y * scaleY,
    player.width * scaleX,
    player.height * scaleY
  );

  // Draw Base on minimap
  ctx.fillStyle = 'blue';
  ctx.fillRect(
    WIDTH - MINIMAP_WIDTH - MINIMAP_PADDING + base.x * scaleX,
    HEIGHT - MINIMAP_HEIGHT - MINIMAP_PADDING + base.y * scaleY,
    base.width * scaleX,
    base.height * scaleY
  );

  // Draw Hives on minimap
  ctx.fillStyle = 'red';
  hives.forEach(hive => {
    ctx.fillRect(
      WIDTH - MINIMAP_WIDTH - MINIMAP_PADDING + hive.x * scaleX,
      HEIGHT - MINIMAP_HEIGHT - MINIMAP_PADDING + hive.y * scaleY,
      hive.width * scaleX,
      hive.height * scaleY
    );
  });

  // Draw Aliens on minimap
  ctx.fillStyle = 'orange';
  aliens.forEach(alien => {
    ctx.fillRect(
      WIDTH - MINIMAP_WIDTH - MINIMAP_PADDING + alien.x * scaleX,
      HEIGHT - MINIMAP_HEIGHT - MINIMAP_PADDING + alien.y * scaleY,
      alien.width * scaleX,
      alien.height * scaleY
    );
  });
}