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

function generateCircleSingelLinkList () {
  let head = new SingleLinkNode(0)
  let pre = head
  let penultimateNode = null
  let lastNode = null
  for (let i = 1; i < 6; i++) {
    let currentNode = new SingleLinkNode(i)
    pre.next = currentNode
    pre = currentNode
    if (i === 4) {
      penultimateNode = currentNode
    }
    if (i === 5) {
      lastNode = currentNode
      currentNode.next = penultimateNode
    }
  }
  return head
}
let circleSingleLinkList = generateCircleSingelLinkList()
console.log('generateCircleSingelLinkList', circleSingleLinkList)
// 链表中环的检测
// 1. 可以向链表中的节点添加是否访问字段 visited , 为1则存在环
// 2. 使用一个数组来保存已经遍历了的节点，如果下次访问该节点存在，则存在环
// 3. 使用快慢指针
function isCheckCircle (linkList) {
  let singeLink = linkList
  let fast = singeLink.next
  let slow = singeLink
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
      return true
    }
  }
  return false
}

console.log('isCheckCircle', isCheckCircle(generateSingleLinkList().head)) // false
console.log('isCheckCircle', isCheckCircle(circleSingleLinkList)) // true

// 两个有序的链表合并
function mergeLinkList(l1, l2) {
  let mergedLinkList = new SingleLinkNode()
  let POINTER1 = l1
  let POINTER2 = l2
  let POINTER = mergedLinkList
  while (POINTER1.next && POINTER2.next) {
    // let node =
  }
}
