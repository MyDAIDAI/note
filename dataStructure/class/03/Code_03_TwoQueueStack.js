// 仅使用队列实现栈结构：使用两个队列
const {ArrayQueue, ArrayStack} = require('./Code_01_ArrayToStackQueue')
class TwoQueueStack {
  constructor(size) {
    this.queue = new ArrayQueue(size)
    this.help = new ArrayQueue(size)
  }
  push(obj) {
    if(this.queue.isFull()) {
      throw new Error('the stack is full')
    }
    this.queue.push(obj)
  }
  pop() {
    while (this.queue.getSize() > 1) {
      this.help.push(this.queue.poll())
    }
    let data = this.queue.poll()
    this.swap()
    return data
  }
  swap() {
    let tmp = this.queue
    this.queue = this.help
    this.help = tmp
  }
}
// 仅使用栈结构实现队列：使用两个栈
class TwoStackQueue {
  constructor(size) {
    this.stackPush = new ArrayStack(size)
    this.stackPop = new ArrayStack(size)
  }
  push(obj) {
    if(this.stackPush.isFull()) {
      throw new Error('the queue is full')
    }
    this.stackPush.push(obj)
  }
  poll() {
    if (this.stackPop.isEmpty() && this.stackPush.isEmpty()) {
      throw new Error('the queue is empty')
    }
    if(this.stackPop.isEmpty()) {
      while (!this.stackPush.isEmpty()) {
        this.stackPop.push(this.stackPush.pop())
      }
    }
    return this.stackPop.pop()
  }
}
