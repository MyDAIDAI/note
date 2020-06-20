// 无序数组表示的优先队列
// deleteMax：拿到最大元素的索引，并与最后元素进行交换，然后删除
class UnorderedArrayMaxPQ {
  constructor(size) {
    this.size = size
    this.pq = []
    this.count = 0 // 元素的数量
  }
  isEmpty() {
    return this.count === 0
  }
  isFull() {
    return this.count === this.size
  }
  insert(val) {
    if(val == undefined) return
    if(this.isFull()) return
    this.pq[this.count++] = val
  }
  deleteMax() {
    if(this.isEmpty()) return
    let max = 0
    for (let i = 1; i < this.count; i++) {
      if(this.pq[i] > this.pq[max]) {
        max = i
      }
    }
    this.exchange(max, this.count - 1)
    return this.pq[--this.count]
  }
  exchange(i, j) {
    let tmp = this.pq[i]
    this.pq[i] = this.pq[j]
    this.pq[j] = tmp
  }
}

function main() {
  let qp = new UnorderedArrayMaxPQ(10)
  qp.insert(9)
  qp.insert(3)
  qp.insert(1)
  qp.insert(2)
  while (!qp.isEmpty()) {
    console.log(qp.deleteMax())
  }
}
main()