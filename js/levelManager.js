import { Hive } from './hive.js';
import { Alien } from './alien.js';
import { PowerUp } from './powerup.js';
import { MAP_WIDTH, MAP_HEIGHT } from './gameConfig.js';
import { hives, aliens, powerUps, player, base } from './gameObjects.js';
import { setLevel, setLevelTransition, level, GameState, setGameState } from './gameState.js';
import { addUpgrade } from './gameObjects.js';

let assetLoader;
let spawnInterval;
let isTransitioning = false;
let powerUpSpawnInterval;

export function initLevelManager(loader) {
  assetLoader = loader;
}

export function startLevel(currentLevel) {
  // Clear existing hives
  hives.length = 0;

  // Adjust the number of hives based on the level, but ensure there's always at least one
  const hivesToSpawn = Math.max(1, Math.min(currentLevel, 10));
  for (let i = 0; i < hivesToSpawn; i++) {
    const x = Math.random() * (MAP_WIDTH - 200) + 100;
    const y = Math.random() * (MAP_HEIGHT - 200) + 100;
    hives.push(new Hive(x, y, assetLoader));
  }

  if (hives.length === 0) {
    const x = MAP_WIDTH / 2;
    const y = MAP_HEIGHT / 2;
    hives.push(new Hive(x, y, assetLoader));
  }

  // Start spawning aliens
  clearInterval(spawnInterval);
  spawnInterval = setInterval(spawnAliens, 2000); // Spawn aliens every 2 seconds

  // Start spawning power-ups
  clearInterval(powerUpSpawnInterval);
  powerUpSpawnInterval = setInterval(spawnPowerUp, 10000); // Spawn power-up every 10 seconds

  isTransitioning = false;
}

export function spawnAliens() {
  hives.forEach(hive => {
    if (hive.health > 0) {
      const alienTarget = Math.random() < 0.5 ? player : base;
      aliens.push(new Alien(hive.x, hive.y, alienTarget, assetLoader));
    }
  });
  console.log(`Spawned aliens. Total aliens: ${aliens.length}`);
}

export function spawnPowerUp() {
  if (powerUps.length < 10) {
    const types = ['health', 'basehealth', 'laserpowerup'];
    const type = types[Math.floor(Math.random() * types.length)];
    const x = Math.random() * (MAP_WIDTH - 60);
    const y = Math.random() * (MAP_HEIGHT - 60);
    powerUps.push(new PowerUp(x, y, type, assetLoader));
  }
}

export function checkLevelCompletion() {
  if (hives.length === 0 && !isTransitioning) {
    isTransitioning = true;
    setLevelTransition(true);
    setTimeout(() => {
      const newLevel = level + 1;
      setLevel(newLevel);
      addUpgrade();  // This will increment the upgrades
      startLevel(newLevel);
      setLevelTransition(false);
    }, 3000);
  }
}