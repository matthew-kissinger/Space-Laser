export class ObjectPool {
  constructor(objectType, initialSize = 100) {
    this.objectType = objectType;
    this.pool = [];
    this.grow(initialSize);
  }

  grow(size) {
    for (let i = 0; i < size; i++) {
      this.pool.push(new this.objectType());
    }
  }

  get() {
    if (this.pool.length === 0) {
      this.grow(10); // Grow pool if empty
    }
    return this.pool.pop();
  }

  release(object) {
    object.reset(); // Assume objects have a reset method
    this.pool.push(object);
  }
}