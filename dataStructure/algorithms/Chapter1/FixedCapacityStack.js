class FixedCapacityStack {
  constructor(cap) {
    this.stack = []
    this.cap = cap
    this.N = 0
  }
  isEmpty() {
    return this.N === 0
  }
  isFull() {
    return this.N === this.cap
  }
  push(val) {
    if(this.isFull()) {
      throw new Error('stack is full')
    }
    if(val == null) {
      throw new Error('val is null or undefined')
    }
    this.stack[this.N++] = val
  }
  pop() {
    if(this.isEmpty()) {
      throw new Error('stack is empty')
    }
    return this.stack[--this.N]
  }
  peek() {
    return this.stack[this.N - 1]
  }
}
