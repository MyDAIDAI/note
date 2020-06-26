class HeapSort {
  constructor(arr) {
    this.count = arr.length
    this.arr = arr
    for(let k = this.count >> 1; k >= 1; k--) {
      this.sink(k, this.count)
    }
    let n = this.count
    while (n > 1) {
      this.exchange(1, n--)
      this.sink(1, n)
    }
  }
  less(i, j) {
    return this.arr[i - 1] < this.arr[j - 1]
  }
  /**
   * 下沉
   * @param k： 数组中元素下沉位置
   */
  sink(k, n) {
    while (k * 2 <= n) {
      let child = k * 2
      if(child < n && this.less(child, child + 1)) {
        child++
      }
      if(!this.less(k, child)) {
        break
      }
      this.exchange(k, child)
      k = child
    }
  }
  exchange(i, j) {
    let tmp = this.arr[i - 1]
    this.arr[i - 1] = this.arr[j - 1]
    this.arr[j - 1] = tmp
  }
}

let arr = [0, 1, 3, 4, 2, 7, 8]
let heapSort = new HeapSort(arr)
console.log(heapSort.arr)