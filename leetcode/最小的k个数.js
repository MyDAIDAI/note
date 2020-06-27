/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function(arr, k) {
  let maxPQ = new MaxPriorQueue(k)
  for (let i = 0; i < arr.length; i++) {
    maxPQ.insert(arr[i])
  }
  return maxPQ.pq.slice(1)
};

class MaxPriorQueue {
  constructor(size) {
    this.size = size
    this.count = 0
    this.pq = []
  }
  size() {
    return this.count
  }
  isEmpty() {
    return this.count === 0
  }
  max() {
    return this.pq[1]
  }
  insert(val) {
    if(val == undefined) return
    if(this.count < this.size) {
      this.pq[++this.count] = val
      debugger
      this.swim(this.count)
    } else {
      if(val < this.max()) {
        this.pq[1] = val
        this.sink(1)
      }
    }
  }
  sink(k) {
    while (k * 2 < this.count) {
      let child = k * 2
      if(child < this.count && (this.pq[child] < this.pq[child + 1])) {
        child++
      }
      if(this.pq[k] > this.pq[child]) {
        break
      }
      this.exchange(k, child)
      k = child
    }
  }
  swim(k) {
    while (k > 1) {
      let parent = k >> 1
      if(this.pq[k] < this.pq[parent]) {
        break
      }
      this.exchange(k, parent)
      k = parent
    }
  }
  exchange(i, j) {
    let tmp = this.pq[i]
    this.pq[i] = this.pq[j]
    this.pq[j] = tmp
  }
}
let arr = [1, 3, 4, 7, 6, 2, 0]
console.log(getLeastNumbers(arr, 3))