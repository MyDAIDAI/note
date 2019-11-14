// 链表
// 单向链表
function SingleLinkNode(val, next) {
  this.value = val
  this.next = next || null
}
// 生成单向链表
function generateSingleLinkList () {
  let head = new SingleLinkNode() // 头部节点
  let POINTER = null  // 游标指针
  for (let i = 0; i < 5; i++) {
    let singleNode = new SingleLinkNode(i)
    if (i === 0) {
      head.next = singleNode
    } else {
      if (POINTER) {
        POINTER.next = singleNode
      }
    }
    POINTER = singleNode
  }
  return {
    head: head
  }
}
// {"head":{"next":{"value":0,"next":{"value":1,"next":{"value":2,"next":{"value":3,"next":{"value":4,"next":null}}}}}}}
console.log('singleLinkNode', JSON.stringify(generateSingleLinkList()))

// 单向列表反转
function singleLinkListReverse () {
  let pre = null
  let next = null
  let singleLinkReverse = generateSingleLinkList()
  let POINTER = singleLinkReverse.head
  while (POINTER) {
    next = POINTER.next
    POINTER.next = pre
    pre = POINTER
    POINTER = next
  }
  return pre
}
var reverseSingleLinkList = singleLinkListReverse()
console.log('singleLinkListReverse', JSON.stringify(reverseSingleLinkList))
