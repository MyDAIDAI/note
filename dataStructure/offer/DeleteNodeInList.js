function Node(val) {
  this.val = val
  this.next = null
}

/**
 * 删除链表的节点
 * 在O(1)时间内删除链表节点
 * 给定单向链表的头指针和一个节点指针，定义一个函数在O(1)时间内删除该节点
 * @param head
 * @param node
 */
function deleteNodeInList(head, node) {
  // 由于需要在O(1)的时间复杂度内进行删除，所有不能进行顺序遍历（进行遍历的初衷是想找到该节点上面的节点，然后将其上面的节点指向下面的节点）
  // 那我们可以将要删除后面的节点的内容复制给待删除节点，然后删除后面的节点。可以从节点的位置分为三种情况
  // 1. 删除的节点后面为null, 那么需要找到前面的节点，将其指向为null
  // 2. 删除的节点为头节点，那么直接返回null
  // 3. 要删除的节点处于中间某个位置，那么按照上面的方法进行删除
  if(head == null || node == null) return
  if(node && node.next !== null) { // 要删除的节点处于中间某个位置
    let deletedNode = node.next
    node.val = deletedNode.val
    node.next = deletedNode.next
  } else if(head === node) { // 要删除的节点位于头节点
    head = head.next
    node = null
  } else { // 要删除的节点位于尾节点
    let curNode = head
    while (curNode.next !== node) {
      curNode = curNode.next
    }
    curNode.next = null
  }
}

// 先写测试用例
// 功能测试
// 边界测试
// 负面测试

let arr = [1, 2, 3, 4, 5]
let head = new Node(0)
let deleteNode = null
let deleteTailNode = null
arr.reduce((pre, cur, index) => {
  let newNode = new Node(cur)
  if(cur === 3) {
    deleteNode = newNode
  }
  if(cur === 5) {
    deleteTailNode = newNode
  }
  return pre.next = newNode
}, head)

console.log('head', JSON.stringify(head))
deleteNodeInList(head, deleteNode) // 删除中间部分节点
console.log('head', JSON.stringify(head))
deleteNodeInList(head, head)  // 删除头节点
console.log('head', JSON.stringify(head))
deleteNodeInList(head, deleteTailNode) // 删除尾节点
console.log('head', JSON.stringify(head))

// 负面测试
deleteNodeInList(head, null)
console.log('head', JSON.stringify(head))
deleteNodeInList(null, null)
console.log('head', JSON.stringify(head))
deleteNodeInList()
console.log('head', JSON.stringify(head))
