class MinPriorQueue {
  constructor() {
    this.pq = []
    this.count = 0
  }
  isEmpty() {
    return this.count === 0
  }
  insert(val) {
    if(val == undefined) return
    this.pq[++this.count] = val
    this.swim(this.count)
  }
  deleteMin() {
    let min = this.pq[1]
    this.exchange(1, this.count--)
    this.pq[this.count + 1] = undefined
    this.sink(1)
    return min
  }
  // 上浮
  swim(k) {
    let parent = k >> 1
    while (k > 1 && this.pq[k] < this.pq[parent]) {
      this.exchange(k, parent)
      k = k >> 1
      parent = k >> 1
    }
  }
  // 下沉
  sink(k) {
    while (k * 2 <= this.count) {
      let child = k * 2
      if(child <= this.count && this.pq[child + 1] < this.pq[child]) {
        child++
      }
      if(this.pq[k] < this.pq[child]) {
        break
      }
      this.exchange(k, child)
      k = child
    }
  }
  exchange(i, j) {
    let tmp = this.pq[i]
    this.pq[i] = this.pq[j]
    this.pq[j] = tmp
  }
}

function main() {
  let minPQ = new MinPriorQueue()
  let arr = [1, 3, 4, 7, 0, 5]
  arr.forEach(ele => {
    minPQ.insert(ele)
  })
  while (!minPQ.isEmpty()) {
    console.log(minPQ.deleteMin())
  }
}
main()