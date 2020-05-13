class ArrayStack {
  constructor(size) {
    if(size < 0) {
      throw new Error('the array stack is min 0')
    }
    this.arr = []
    this.size = 0
    this.index = 0
    this.initialSize = size
  }
  push(obj) {
    if(this.size === this.initialSize){
      throw new Error('the stack is full')
    }
    this.size++
    this.arr[this.index++] = obj
  }
  pop() {
    if(this.size === 0) {
      throw new Error('the stack is null')
    }
    this.size--
    return this.arr[--this.index]
  }
  peek() {
    if(this.size === 0) return null
    return this.arr[this.index - 1]
  }
  isEmpty() {
    return this.size === 0
  }
  isFull() {
    return this.size === this.initialSize
  }
}
class GetMinStack{
  constructor(size) {
    this.dataStack = new ArrayStack(size)
    this.minStack = new ArrayStack(size)
  }
  push(obj) {
    if(this.dataStack.isFull()) {
      throw new Error('the get min stack is full')
    }

    this.dataStack.push(obj)
    let minData = this.minStack.peek()
    if(this.minStack.size === 0 || obj < minData) {
      this.minStack.push(obj)
    } else {
      this.minStack.push(minData)
    }
  }
  pop() {
    if(this.dataStack.isEmpty()) {
      throw new Error('the get min stack is null')
    }
    this.minStack.pop()
    return this.dataStack.pop()
  }
  getMin() {
    return this.minStack.peek()
  }
}
let arrayStack = new GetMinStack(5);
let arr = [3, 7, 2, -1, 0]
arr.forEach(ele => arrayStack.push(ele))
console.log(arrayStack.getMin())