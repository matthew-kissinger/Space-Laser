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
}

function drawBackground(ctx) {
  if (backgroundImage) {
    const bgAspectRatio = backgroundImage.width / backgroundImage.height;
    const mapAspectRatio = MAP_WIDTH / MAP_HEIGHT;
    
    let drawWidth, drawHeight, offsetX = 0, offsetY = 0;
    
    if (bgAspectRatio > mapAspectRatio) {
      // Background is wider, scale to height
      drawHeight = MAP_HEIGHT;
      drawWidth = MAP_HEIGHT * bgAspectRatio;
      offsetX = (MAP_WIDTH - drawWidth) / 2;
    } else {
      // Background is taller, scale to width
      drawWidth = MAP_WIDTH;
      drawHeight = MAP_WIDTH / bgAspectRatio;
      offsetY = (MAP_HEIGHT - drawHeight) / 2;
    }
    
    ctx.drawImage(
      backgroundImage, 
      -camera.x + offsetX, 
      -camera.y + offsetY, 
      drawWidth, 
      drawHeight
    );
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

  // Adjust object scales
  const playerScale = 3;
  const baseScale = 1;
  const hiveScale = 1.5;
  const alienScale = 1.5;
  const powerUpScale = 2;

  // Draw Player on minimap
  ctx.fillStyle = 'green';
  ctx.fillRect(
    WIDTH - MINIMAP_WIDTH - MINIMAP_PADDING + player.x * scaleX - (player.width * scaleX * playerScale) / 2,
    HEIGHT - MINIMAP_HEIGHT - MINIMAP_PADDING + player.y * scaleY - (player.height * scaleY * playerScale) / 2,
    player.width * scaleX * playerScale,
    player.height * scaleY * playerScale
  );

  // Draw Base on minimap
  ctx.fillStyle = 'blue';
  ctx.fillRect(
    WIDTH - MINIMAP_WIDTH - MINIMAP_PADDING + base.x * scaleX - (base.width * scaleX * baseScale) / 2,
    HEIGHT - MINIMAP_HEIGHT - MINIMAP_PADDING + base.y * scaleY - (base.height * scaleY * baseScale) / 2,
    base.width * scaleX * baseScale,
    base.height * scaleY * baseScale
  );

  // Draw Hives on minimap
  ctx.fillStyle = 'red';
  hives.forEach(hive => {
    ctx.fillRect(
      WIDTH - MINIMAP_WIDTH - MINIMAP_PADDING + hive.x * scaleX - (hive.width * scaleX * hiveScale) / 2,
      HEIGHT - MINIMAP_HEIGHT - MINIMAP_PADDING + hive.y * scaleY - (hive.height * scaleY * hiveScale) / 2,
      hive.width * scaleX * hiveScale,
      hive.height * scaleY * hiveScale
    );
  });

  // Draw Aliens on minimap
  ctx.fillStyle = 'orange';
  aliens.forEach(alien => {
    ctx.fillRect(
      WIDTH - MINIMAP_WIDTH - MINIMAP_PADDING + alien.x * scaleX - (alien.width * scaleX * alienScale) / 2,
      HEIGHT - MINIMAP_HEIGHT - MINIMAP_PADDING + alien.y * scaleY - (alien.height * scaleY * alienScale) / 2,
      alien.width * scaleX * alienScale,
      alien.height * scaleY * alienScale
    );
  });

  // Draw Power-ups on minimap
  ctx.fillStyle = '#00FFFF'; // Bright cyan color for power-ups
  powerUps.forEach(powerUp => {
    ctx.fillRect(
      WIDTH - MINIMAP_WIDTH - MINIMAP_PADDING + powerUp.x * scaleX - (powerUp.width * scaleX * powerUpScale) / 2,
      HEIGHT - MINIMAP_HEIGHT - MINIMAP_PADDING + powerUp.y * scaleY - (powerUp.height * scaleY * powerUpScale) / 2,
      powerUp.width * scaleX * powerUpScale,
      powerUp.height * scaleY * powerUpScale
    );
  });
}
