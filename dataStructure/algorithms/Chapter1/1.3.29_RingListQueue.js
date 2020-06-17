// 用环形链表实现`Queue`。环形链表也是一条链表，只是没有任何结点的链接为空，且只要链表非空则`last.next`的值为`first`。只能使用一个`Node`类型的实例变量(`last`)
class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}
class RingListQueue {
  constructor(size) {
    this.size = size
    this.count = 0
    let first = new Node('head')
    first.next = first
    this.last = first
    this.list = first
  }
  enqueue(val) {
    if(this.count >= this.size) {
      return
    }
    let node = new Node(val)
    node.next = this.last.next
    this.last.next = node
    this.last = node
    this.count++
  }
  dequeue() {
    if(this.count === 0) {
      return
    }
    this.list = this.list.next
    let first = this.last.next
    this.last.next = this.last.next.next
    this.count--
    first.next = null
    return first
  }
}
function main() {
  let arr = [1, 2, 3, 4, 5]
  let list = new RingListQueue(10)
  arr.forEach(ele => {
    list.enqueue(ele)
  })
  console.log(list.dequeue())
  console.log(list.dequeue())
  // console.log('list', JSON.stringify(list))
}
main()