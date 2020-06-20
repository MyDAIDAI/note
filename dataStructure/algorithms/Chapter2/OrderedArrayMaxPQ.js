// 数组有序的优先队列
class OrderedArrayMaxPQ {
  constructor(size) {
    this.size = size
    this.pq = []
    this.count = 0
  }
  isEmpty() {
    return this.count === 0
  }
  isFull() {
    return this.count === this.size
  }
  insert(val) {
    if(val == undefined) return
    let i = this.count - 1
    while (i >= 0 && this.pq[i] > val) {
      this.pq[i+1] = this.pq[i]
      i--
    }
    this.pq[i+1] = val
    this.count++
  }
  deleteMax() {
    if(this.isEmpty()) return
    return this.pq[--this.count]
  }
}
function main() {
  let qp = new OrderedArrayMaxPQ(10)
  qp.insert(9)
  qp.insert(3)
  qp.insert(1)
  qp.insert(2)
  while (!qp.isEmpty()) {
    console.log(qp.deleteMax(), JSON.stringify(qp.pq))
  }
}
main()