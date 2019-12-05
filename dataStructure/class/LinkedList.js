function Node(val) {
  this.val = val
  this.next = null
}
// 链表类
function LinkedList() {
  this.head = new Node('head')
}

/**
 * 根据值查找元素
 * @param val
 */
LinkedList.prototype.findByValue = function (val) {
  let currentNode = this.head.next
  while (currentNode != null && currentNode.val !== val) {
    currentNode = currentNode.next
  }
  return currentNode == null ? -1 : currentNode
}
/**
 * 在某个值后插入元素
 * @param newVal
 * @param val
 */
LinkedList.prototype.insert = function (newVal, val) {
  let currentNode = this.find(val)
  if (currentNode === -1) {
    throw new Error('未找到插入值')
  }
  let node = new Node(val)
  node.next = currentNode.next
  currentNode.next = node
}
/**
 * 在链表最后插入元素
 * @param val
 */
LinkedList.prototype.append = function (val) {
  let currentNode = this.head.next
  while (currentNode != null && currentNode.next != null) {
    currentNode = currentNode.next
  }
  let node = new Node(val)
  currentNode.next = node
}
/**
 * 查找当前值的前一个节点
 * @param val
 */
LinkedList.prototype.findPrev = function (val) {
  let currentNode = this.head
  while (currentNode.next != null && currentNode.next.val !== val) {
    currentNode = currentNode.next
  }
  // 找到最后都没有发现值
  if (currentNode.next == null) {
    return -1
  }

  return currentNode
}
/**
 * 根据值删除一个元素
 * @param val
 */
LinkedList.prototype.remove = function (val) {
  let prevNode = this.findPrev(val)
  if (prevNode === -1) {
    throw new Error('未查找到删除元素')
  }
  prevNode.next = prevNode.next.next
}
LinkedList.prototype.isEmpty = function () {
  if (this.head.next == null) {
    return true
  }
  return false
}
export default LinkedList
