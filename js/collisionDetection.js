import { player, base, hives, aliens, lasers, powerUps, explosions, addScore } from './gameObjects.js';
import { rectCollision } from './utils.js';
import { Explosion } from './explosion.js';
import { setGameState, GameState } from './gameState.js';
import { soundManager } from './soundManager.js';

export function checkCollisions() {
  checkLaserAlienCollisions();
  checkLaserHiveCollisions();
  checkAlienPlayerCollisions();
  checkAlienBaseCollisions();
  checkPlayerPowerUpCollisions();
}

function checkLaserAlienCollisions() {
  for (let i = lasers.length - 1; i >= 0; i--) {
    const laser = lasers[i];
    for (let j = aliens.length - 1; j >= 0; j--) {
      const alien = aliens[j];
      if (rectCollision(laser, alien)) {
        alien.health -= 10;
        lasers.splice(i, 1);
        if (alien.health <= 0) {
          aliens.splice(j, 1);
          explosions.push(new Explosion(alien.x + alien.width / 2, alien.y + alien.height / 2));
          soundManager.playAlienDead();
          addScore(10); // Add 10 points for destroying an alien
        }
        break;
      }
    }
  }
}

function checkLaserHiveCollisions() {
  for (let i = lasers.length - 1; i >= 0; i--) {
    const laser = lasers[i];
    for (let j = hives.length - 1; j >= 0; j--) {
      const hive = hives[j];
      if (rectCollision(laser, hive)) {
        hive.health -= 10;
        lasers.splice(i, 1);
        if (hive.health <= 0) {
          hives.splice(j, 1);
          explosions.push(new Explosion(hive.x + hive.width / 2, hive.y + hive.height / 2));
          soundManager.playCollapse();
          addScore(50); // Add 50 points for destroying a hive
        }
        break;
      }
    }
  }
}

function checkAlienPlayerCollisions() {
  for (let i = aliens.length - 1; i >= 0; i--) {
    const alien = aliens[i];
    if (rectCollision(alien, player)) {
      player.health -= 10;
      aliens.splice(i, 1);
      explosions.push(new Explosion(alien.x + alien.width / 2, alien.y + alien.height / 2));
      if (player.health <= 0) {
        setGameState(GameState.GAMEOVER);
      }
    }
  }
}

function checkAlienBaseCollisions() {
  for (let i = aliens.length - 1; i >= 0; i--) {
    const alien = aliens[i];
    if (rectCollision(alien, base)) {
      base.health -= 10;
      aliens.splice(i, 1);
      explosions.push(new Explosion(alien.x + alien.width / 2, alien.y + alien.height / 2));
      if (base.health <= 0) {
        setGameState(GameState.GAMEOVER);
      }
    }
  }
}

function checkPlayerPowerUpCollisions() {
  for (let i = powerUps.length - 1; i >= 0; i--) {
    const powerUp = powerUps[i];
    if (rectCollision(powerUp, player)) {
      switch (powerUp.type) {
        case 'health':
          player.health = Math.min(player.health + 50, 100);
          break;
        case 'basehealth':
          base.health = 500; // Heal base to full health
          break;
        case 'laserpowerup':
          player.activateLaserPowerUp();
          break;
      }
      powerUps.splice(i, 1);
      soundManager.playPowerup(); // Play power-up sound
    }
  }
}