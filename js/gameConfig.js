export const SCALE_FACTOR = 4; // Increased scale factor for a larger game area
export const SPAWN_RATE = 12000; // in milliseconds
export const FIRE_RATE = 200; // in milliseconds
export const LASER_SPEED = 20;

// Remove the MAX_LEVEL constant

export const MINIMAP_WIDTH = 200;
export const MINIMAP_HEIGHT = 200;
export const MINIMAP_PADDING = 20;

export let WIDTH = window.innerWidth;
export let HEIGHT = window.innerHeight;
export let MAP_SIZE = Math.max(WIDTH, HEIGHT) * SCALE_FACTOR; // Square map size
export let MAP_WIDTH = MAP_SIZE;
export let MAP_HEIGHT = MAP_SIZE;

export function updateDimensions() {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  MAP_SIZE = Math.max(WIDTH, HEIGHT) * SCALE_FACTOR;
  MAP_WIDTH = MAP_SIZE;
  MAP_HEIGHT = MAP_SIZE;
}
