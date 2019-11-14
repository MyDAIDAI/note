// 链表
// 单向链表
function SingleLinkNode(val, next) {
  this.value = val
  this.next = next || null
}
SingleLinkNode.prototype.setNext = function (singleLinkNode) {
  this.next = singleLinkNode
}
let head = new SingleLinkNode() // 头部节点
let POINTER = null  // 游标指针
for (let i = 0; i < 5; i++) {
  let singleNode = new SingleLinkNode(i)
  if (i === 0) {
    head.setNext(singleNode)
  } else {
    if (POINTER) {
      POINTER.setNext(singleNode)
    }
  }
  POINTER = singleNode
}
// {"next":{"value":0,"next":{"value":1,"next":{"value":2,"next":{"value":3,"next":{"value":4,"next":null}}}}}}
console.log('singleLinkNode', JSON.stringify(head))
