class BinarySearchST {
  constructor() {
    this.count = 0
    this.keys = []
    this.values = []
  }
  isEmpty() {
    return this.count === 0
  }
  size() {
    return this.count
  }

  /**
   * 进行二分查找
   * 返回值：
   * 1. 表中存在该键，rank()返回该键的位置，也就是表中小于它的键的数量
   * 2. 表中不存在该键，rank()还是应该返回表中小于它的键的数量
   * @param key
   * @return {number}
   */
  rank(key) {
    let lo = 0
    let hi = this.keys.length - 1
    while (lo <= hi) {
      let mid = lo + ((hi - lo) >> 1)
      if(this.keys[mid] < key) {
        lo = mid + 1
      } else if(this.keys[mid] > key) {
        hi = mid - 1
      } else {
        return mid
      }
    }
    return lo
  }
  get(key) {
    if(this.isEmpty()) return null
    let index = this.rank(key)
    if(index < this.count && this.keys[index] === key) return index
    return null
  }
  put(key, val) {
    let index = this.rank(key)
    if(index < this.count && this.keys[index] === key) {
      this.keys[index] = key
      this.values[index] = val
      return
    }
    // 从后往前依次移动一个位置，然后将index的位置插入值
    for (let j = this.count; j > index; j--) {
      this.keys[j] = this.keys[j - 1]
      this.values[j] = this.values[j - 1]
    }
    this.keys[index] = key
    this.values[index] = val
    this.count++
  }
}

let arr = [0, 1, 2, 4, 6, 8]
let bst = new BinarySearchST()
arr.forEach(ele => {
  bst.put(ele, ele)
})
console.log(bst.keys, bst.get(5), bst.put(5, 5), bst.keys)