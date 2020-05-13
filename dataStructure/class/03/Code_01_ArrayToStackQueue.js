// 使用数组实现大小固定的队列和栈

/**
 * 数组栈结构
 */
class ArrayStack{
  constructor(size) {
    if(size < 0) {
      throw new Error('Array Stack size not can be 0')
    }
    this.arr = []
    this.size = 0
    this.initialSize = size
    this.index = 0 // 将要添加元素与删除元素的索引
  }
  peek() {
    if(this.size === 0) {
      return null
    }
    return this.arr[this.index - 1]
  }
  push(obj) {
    if(this.initialSize === this.size) {
      throw new Error('Array Stack is full')
    }
    this.arr[this.index++] = obj
    this.size++
  }
  pop() {
    if(this.size === 0) return null
    this.size--
    return this.arr[--this.index]
  }
  isEmpty() {
    return this.size === 0
  }
  isFull() {
    return this.size === this.initialSize
  }
  getSize() {
    return this.size
  }
}

/**
 *  数组队列结构
 */
class ArrayQueue {
  constructor(size) {
    if (size < 0) {
      throw new Error('Array Queue size not can be 0')
    }
    this.size = 0
    this.arr = []
    this.start = 0
    this.end = 0
    this.initialSize = size
  }
  push(obj) {
    if(this.size === this.initialSize) {
      throw new Error('the array queue is full')
    }
    this.arr[this.end++] = obj
    this.size++
    this.end = this.end === this.initialSize ? 0 : this.end
  }
  poll() {
    if(this.size === 0) {
      throw new Error('this array queue is null')
    }
    this.size--
    let tmp = this.start
    let data = this.arr[this.start++]
    this.start = this.start === this.initialSize ? 0 : this.start
    return data
  }
  isEmpty() {
    return this.size === 0
  }
  isFull() {
    return this.size === this.initialSize
  }
  getSize() {
    return this.size
  }
}
module.exports = {
  ArrayStack,
  ArrayQueue
}
