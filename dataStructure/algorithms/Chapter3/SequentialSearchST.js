// 基于链表的顺序查找

class Node {
  constructor(key, val, next) {
    this.val = val
    this.key = key
    this.next = next || null
  }
}

class SequentialSearchST {
  constructor(first) {
    this.first = first // 链表首节点
  }
  get(key) {
    if (key == null || this.first == null) {
      return
    }
    let node = this.first
    while (node != null && node.key !== key) {
      node = node.next
    }
    return node || null
  }
  put(key, val) {
    if(this.get(key)) {
      node.val = val
      return
    }
    this.first = new Node(key, val, this.first)
  }
}

let arr = [1, 2, 4, 5]
let first = new Node(0, 0)
let st = new SequentialSearchST(first)
arr.forEach(ele => {
  st.put(ele, ele)
})
// st.get(4)
console.log(st.get(4))

