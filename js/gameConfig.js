export const SCALE_FACTOR = 3;
export const SPAWN_RATE = 12000; // in milliseconds
export const FIRE_RATE = 200; // in milliseconds
export const LASER_SPEED = 20;

// Remove the MAX_LEVEL constant

export const MINIMAP_WIDTH = 200;
export const MINIMAP_HEIGHT = 200;
export const MINIMAP_PADDING = 20;

export let WIDTH = window.innerWidth;
export let HEIGHT = window.innerHeight;
export let MAP_WIDTH = WIDTH * SCALE_FACTOR;
export let MAP_HEIGHT = HEIGHT * SCALE_FACTOR;

export function updateDimensions() {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  MAP_WIDTH = WIDTH * SCALE_FACTOR;
  MAP_HEIGHT = HEIGHT * SCALE_FACTOR;
}