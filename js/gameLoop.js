import { gameState, GameState, setGameState } from './gameState.js';
import { update } from './update.js';
import { draw } from './renderer.js';
import { drawStartScreen, drawGameOverScreen, drawPauseScreen, drawInstructionsScreen, isShowingInstructions } from './startScreen.js';
import { WIDTH, HEIGHT } from './gameConfig.js';
import { initializeGameObjects } from './gameObjects.js';
import { startLevel } from './levelManager.js';

export function gameLoop(ctx) {
  if (gameState === GameState.START) {
    if (isShowingInstructions()) {
      drawInstructionsScreen(ctx, WIDTH, HEIGHT);
    } else {
      drawStartScreen(ctx, WIDTH, HEIGHT);
    }
  } else if (gameState === GameState.PLAYING) {
    update();
    draw(ctx);
  } else if (gameState === GameState.PAUSED) {
    drawPauseScreen(ctx, WIDTH, HEIGHT);
  } else if (gameState === GameState.GAMEOVER) {
    drawGameOverScreen(ctx, WIDTH, HEIGHT);
  }
  requestAnimationFrame(() => gameLoop(ctx));
}

export function restartGame() {
  initializeGameObjects();
  startLevel(1);
  setGameState(GameState.PLAYING);
}