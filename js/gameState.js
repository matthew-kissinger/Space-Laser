export const GameState = {
  START: 'start',
  PLAYING: 'playing',
  GAMEOVER: 'gameover',
  PAUSED: 'paused'
};

export let gameState = GameState.START;
export let level = 1;
export let levelTransition = false;

export function setGameState(newState) {
  gameState = newState;
}

export function setLevel(newLevel) {
  level = newLevel;
  console.log(`Level set to: ${level}`); // Add this line for debugging
}

export function setLevelTransition(isTransitioning) {
  levelTransition = isTransitioning;
}