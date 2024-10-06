// js/assetLoader.js

export class AssetLoader {
    constructor() {
      this.assets = {};
    }
  
    loadImages(imagePaths) {
      const promises = imagePaths.map(path => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = `assets/${path}`;
          img.onload = () => {
            this.assets[path] = img;
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load image: ${path}`);
            // Resolve with a placeholder or default image instead of rejecting
            this.assets[path] = this.createPlaceholderImage();
            resolve();
          };
        });
      });
      return Promise.all(promises);
    }
  
    getAsset(name) {
      if (this.assets[name]) {
        return this.assets[name];
      } else {
        console.warn(`Asset not found: ${name}`);
        return this.createPlaceholderImage();
      }
    }
  
    createPlaceholderImage() {
      const canvas = document.createElement('canvas');
      canvas.width = 50;
      canvas.height = 50;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'purple';
      ctx.fillRect(0, 0, 50, 50);
      ctx.fillStyle = 'white';
      ctx.font = '10px Arial';
      ctx.fillText('Missing', 5, 25);
      ctx.fillText('Asset', 10, 40);
      return canvas;
    }
  }
