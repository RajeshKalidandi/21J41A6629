class Cache {
  constructor(size) {
    if (!Number.isInteger(size) || size <= 0) {
      throw new Error('Cache size must be a positive integer');
    }
    this.size = size;
    this.data = [];
  }

  add(item) {
    if (item === undefined) {
      throw new Error('Cannot add undefined to cache');
    }
    if (this.data.length >= this.size) {
      this.data.shift(); // Remove oldest item
    }
    this.data.push(item);
  }

  get() {
    return [...this.data]; // Return a shallow copy
  }

  clear() {
    this.data = [];
  }
}

module.exports = Cache;