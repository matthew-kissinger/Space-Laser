import { Player } from './player.js';
import { Base } from './base.js';
import { MAP_WIDTH, MAP_HEIGHT } from './gameConfig.js';
import { ObjectPool } from './objectPool.js';
import { Laser } from './laser.js';

export let player, base, hives, aliens, lasers, powerUps, explosions, laserTowers, upgrades, assetLoader, laserPool;

let score = 0;

export function initializeGameObjects(loader) {
  assetLoader = loader;
  player = new Player(MAP_WIDTH / 2 - 100, MAP_HEIGHT / 2 - 100, assetLoader);
  base = new Base(MAP_WIDTH / 2 - 200, MAP_HEIGHT / 2 - 200, assetLoader);
  hives = [];
  aliens = [];
  lasers = [];
  powerUps = [];
  explosions = [];
  laserTowers = [];
  upgrades = 0;
  score = 0;
  laserPool = new ObjectPool(Laser);
}

export function addUpgrade() {
  upgrades++;
  console.log(`Upgrades increased to: ${upgrades}`);  // Add this for debugging
}

export function useUpgrade() {
  if (upgrades > 0) {
    upgrades--;
    console.log(`Upgrades decreased to: ${upgrades}`);  // Add this for debugging
    return true;
  }
  return false;
}

export function getUpgrades() {
  return upgrades;
}

export function addScore(points) {
  score += points;
}

export function getScore() {
  return score;
}