import { player, base, hives, aliens, lasers, powerUps, explosions, laserTowers } from './gameObjects.js';
import { keys, mouseX, mouseY, isMousePressed } from './inputHandler.js';
import { MAP_WIDTH, MAP_HEIGHT, FIRE_RATE } from './gameConfig.js';
import { camera } from './main.js';
import { spawnAliens, spawnPowerUp } from './levelManager.js';
import { Laser } from './laser.js';
import { checkCollisions } from './collisionDetection.js';
import { checkLevelCompletion } from './levelManager.js';
import { laserPool } from './gameObjects.js';

let lastShotTime = 0;

export function update() {
  updatePlayer();
  updateCamera();
  handleShooting();
  updateLasers();
  updateAliens();
  updateLaserTowers();  // Make sure this line is present
  updateExplosions();
  updatePowerUps();
  checkCollisions();
  checkLevelCompletion();

  // Update power-ups
  for (let i = powerUps.length - 1; i >= 0; i--) {
    if (powerUps[i].isExpired()) {
      powerUps.splice(i, 1);
    }
  }
}

function updatePlayer() {
  player.update(keys, MAP_WIDTH, MAP_HEIGHT);
}

function updateCamera() {
  camera.x = Math.max(0, Math.min(player.x - camera.width / 2, MAP_WIDTH - camera.width));
  camera.y = Math.max(0, Math.min(player.y - camera.height / 2, MAP_HEIGHT - camera.height));
}

function handleShooting() {
  const currentTime = Date.now();
  if (isMousePressed && currentTime - lastShotTime > FIRE_RATE) {
    console.log('Attempting to fire laser');
    const playerCenterX = player.x + player.width / 2;
    const playerCenterY = player.y + player.height / 2;
    console.log('Mouse position:', mouseX, mouseY);
    console.log('Player center:', playerCenterX, playerCenterY);
    const angle = Math.atan2(mouseY - playerCenterY, mouseX - playerCenterX);
    console.log('Calculated angle:', angle);
    
    player.fireLasers(lasers, angle);
    lastShotTime = currentTime;
  }
}

function updateLasers() {
  console.log('Updating lasers. Count before update:', lasers.length);
  for (let i = lasers.length - 1; i >= 0; i--) {
    const laser = lasers[i];
    laser.update();
    console.log(`Laser ${i} after update:`, laser);
    if (laser.isExpired()) {
      console.log(`Laser ${i} expired, removing`);
      laserPool.release(laser);
      lasers.splice(i, 1);
    }
  }
  console.log('Lasers count after update:', lasers.length);
}

function updateAliens() {
  aliens.forEach(alien => alien.update());
}

function updateLaserTowers() {
  const currentTime = Date.now();
  laserTowers.forEach(tower => tower.update(aliens, lasers, currentTime));
}

function updateExplosions() {
  explosions.forEach((explosion, index) => {
    explosion.update();
    if (explosion.isFinished) {
      explosions.splice(index, 1);
    }
  });
}

function updatePowerUps() {
  for (let i = powerUps.length - 1; i >= 0; i--) {
    if (powerUps[i].isExpired()) {
      powerUps.splice(i, 1);
    }
  }
}