// js/main.js

import { AssetLoader } from './assetLoader.js';
import { updateDimensions, WIDTH, HEIGHT, MAP_WIDTH, MAP_HEIGHT } from './gameConfig.js';
import { gameLoop } from './gameLoop.js';
import { setupEventListeners } from './inputHandler.js';
import { initializeGameObjects } from './gameObjects.js';
import { initLevelManager, startLevel } from './levelManager.js';
import { setGameState, GameState } from './gameState.js';
import { initRenderer } from './renderer.js';
import { soundManager } from './soundManager.js';
import { initStartScreen } from './startScreen.js';

// Initialize Canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;

// Define Camera Object
export const camera = {
  x: 0,
  y: 0,
  width: WIDTH,
  height: HEIGHT
};

// Function to Handle Window Resize
function resizeCanvas() {
  updateDimensions();
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  camera.width = WIDTH;
  camera.height = HEIGHT;
}

// Event Listener for Window Resize
window.addEventListener('resize', resizeCanvas);

// Initialize Asset Loader and Load Assets
const assetLoader = new AssetLoader();
const imagePaths = [
  'spaceship.png',
  'alien.png',
  'health.png',
  'basehealth.png',
  'laserpowerup.png',
  'background.png',
  'base.png',
  'hive.png',
  'laser_tower.png',
];

// Load assets and initialize the game
assetLoader.loadImages(imagePaths).then(() => {
  initializeGameObjects(assetLoader);
  initLevelManager(assetLoader);
  initRenderer(assetLoader);
  initStartScreen(assetLoader);
  setupEventListeners(canvas, camera);
  setGameState(GameState.START);
  gameLoop(ctx);
}).catch(err => {
  console.error(err);
});

// Add this new function to start a new game
export function startNewGame() {
  initializeGameObjects(assetLoader);
  setGameState(GameState.PLAYING);
  startLevel(1);
  soundManager.playBackground();
}