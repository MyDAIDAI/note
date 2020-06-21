class MaxPriorQueue {
  constructor() {
    this.pq = []
    this.count = 0
  }
  size () {
    return this.count
  }
  isEmpty() {
    return this.count === 0
  }
  insert(val) {
    if(val == undefined) return
    this.pq[++this.count] = val
    this.swim(this.count)
  }
  // 上浮
  swim(k) {
    while (k > 1 && this.pq[k] > this.pq[k >> 1]) {
      this.exchange(k, k >> 1)
      k = k >> 1
    }
  }
  // 删除大顶堆中的最大元素
  // 1. 拿到最大元素
  // 2. 将最大元素与最后一个元素进行交换，放在第一个
  // 3. 将第一个位置元素下沉
  deleteMax() {
    let max = this.pq[1]
    this.exchange(1, this.count--)
    this.pq[this.count + 1] = undefined
    this.sink(1)
    return max
  }
  sink(k) {
    debugger
    while ( 2 * k <= this.count) {
      let child = 2 * k
      if(child < this.count && this.pq[child] < this.pq[child + 1]) {
        child++
      }
      if(this.pq[k] > this.pq[child]) {
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
  let maxPQ = new MaxPriorQueue()
  let arr = [1, 3, 4, 7, 0, 5]
  arr.forEach(ele => {
    maxPQ.insert(ele)
  })
  while (!maxPQ.isEmpty()) {
    console.log(maxPQ.deleteMax())
  }
}
main()