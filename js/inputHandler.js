import { gameState, GameState, setGameState } from './gameState.js';
import { startLevel } from './levelManager.js';
import { restartGame } from './gameLoop.js';
import { handleStartScreenClick, isShowingInstructions } from './startScreen.js';
import { player, base, laserTowers, useUpgrade, addUpgrade, assetLoader } from './gameObjects.js';
import { LaserTower } from './laserTower.js';
import { soundManager } from './soundManager.js'; // Add this import
import { startNewGame } from './main.js';

export const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  w: false,
  a: false,
  s: false,
  d: false
};

export let mouseX = 0;
export let mouseY = 0;
export let isMousePressed = false;

export function setupEventListeners(canvas, camera) {
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  canvas.addEventListener('mousedown', (e) => handleMouseDown(e, canvas, camera));
  canvas.addEventListener('mouseup', handleMouseUp);
  canvas.addEventListener('mousemove', (e) => handleMouseMove(e, canvas, camera));
}

function handleKeyDown(e) {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = true;
  }

  if (gameState === GameState.PLAYING) {
    if (e.key === '1' && useUpgrade() && player.laserCount < player.maxLasers) {
      player.addLaser();
      console.log('Laser added. Total lasers:', player.laserCount);
    } else if (e.key === '2' && useUpgrade()) {
      if (assetLoader) {
        laserTowers.push(new LaserTower(player.x, player.y, assetLoader));
        console.log('Laser tower added');
      } else {
        console.error('assetLoader is not defined');
      }
    } else if (e.key === '3' && useUpgrade()) {
      base.health = base.maxHealth;
      console.log('Base healed to full health:', base.health);
    } else if (e.key === '1' && player.laserCount >= player.maxLasers) {
      console.log('Maximum number of lasers reached');
      addUpgrade(); // Refund the upgrade if it wasn't used
    }
  }

  if (gameState === GameState.START && (e.key === 'Enter' || e.key === ' ')) {
    setGameState(GameState.PLAYING);
    startLevel(1);
  } else if (gameState === GameState.GAMEOVER && (e.key === 'Enter' || e.key === ' ')) {
    restartGame();
  } else if (e.key === 'p' || e.key === 'P') {
    togglePause();
  }
}

function handleKeyUp(e) {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = false;
  }
}

function handleMouseDown(e, canvas, camera) {
  if (gameState === GameState.START) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const action = handleStartScreenClick(x, y, canvas.width, canvas.height);
    if (action === 'start') {
      startNewGame(); // Call the new function to start the game
    }
  } else {
    isMousePressed = true;
    updateMousePosition(e, canvas, camera);
  }
}

function handleMouseUp() {
  isMousePressed = false;
}

function handleMouseMove(e, canvas, camera) {
  updateMousePosition(e, canvas, camera);
}

function updateMousePosition(e, canvas, camera) {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left + camera.x;
  mouseY = e.clientY - rect.top + camera.y;
  console.log('Mouse position updated:', mouseX, mouseY);
}

function togglePause() {
  if (gameState === GameState.PLAYING) {
    setGameState(GameState.PAUSED);
  } else if (gameState === GameState.PAUSED) {
    setGameState(GameState.PLAYING);
  }
}