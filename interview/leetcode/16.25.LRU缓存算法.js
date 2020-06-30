// 1. 由于 js 原生的 map 结构是有序的，并且插入与读取的时间复杂度都比较低
class LRUCacheByMap {
  constructor(size) {
    this.size = size
    this.map = new Map()
  }
  get(key) {
    if(!this.map.has(key)) return -1
    let data = this.map.get(key)
    this.map.delete(key)
    this.map.set(key, data)
    return data
  }
  put(key, value) {
    if(this.map.has(key)) {
      this.map.delete(key)
    } else {
      if(this.map.size === this.size) {
        let keys = this.map.keys()
        this.map.delete(keys.next().value)
      }
    }
    this.map.set(key, value)
  }
}
// 2. 使用双向链表

class LRUCacheByList {
  constructor(size) {
    this.size = size
  }
}
