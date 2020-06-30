var MaxQueue = function() {
  this.queue = []
  this.helpQueue = []
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function() {
  if(this.helpQueue.length === 0) return -1
  return this.helpQueue[this.helpQueue.length - 1]
};

/**
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function(value) {
  if(value == null) return
  this.queue.push(value)
  let peekData = this.helpQueue.length === 0 ? Number.MIN_SAFE_INTEGER: this.helpQueue[this.helpQueue.length - 1]
  if(peekData > value) {
    this.helpQueue.push(peekData)
  } else {
    this.helpQueue.push(value)
  }

};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function() {
  if(this.queue.length === 0) return -1
  let data = this.queue.shift()
  this.helpQueue.shift()
  return data
};

/**
 * Your MaxQueue object will be instantiated and called as such:
 * var obj = new MaxQueue()
 * var param_1 = obj.max_value()
 * obj.push_back(value)
 * var param_3 = obj.pop_front()
 */
let obj = new MaxQueue()
obj.push_back(1)
obj.push_back(2)
console.log(obj.max_value())
console.log(obj.pop_front())
console.log(obj.max_value())
