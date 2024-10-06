// js/utils.js

export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  
  export function rectCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }
  