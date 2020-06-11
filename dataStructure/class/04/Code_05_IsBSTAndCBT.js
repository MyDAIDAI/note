class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}
function isBST(head) {
  let data = []
  inOrder(head, data)
  let is = true
  for (let index = 0, len = data.length; index < len; index++) {
    if(data[index] > data[index + 1]) {
      is = false
      break
    }
  }
  return is
}
function inOrder(head, data) {
  if (!head) return
  inOrder(head.left, data)
  data.push(head.value)
  inOrder(head.right, data)
}
function isBSTByInRecur(tree) {
  if(!tree) return false
  let arr = []
  inOrderByRecur(tree, arr)
  let pre = arr[0]
  for (let index = 1; index < arr.length; index++) {
    if(arr[index] < arr[index - 1]) {
      return false
    }
    pre = arr[index]
  }
  return true
}
function inOrderByRecur(tree, arr) {
  if(!tree) return
  inOrderByRecur(tree.left, arr)
  arr.push(tree.val)
  inOrderByRecur(tree.right, arr)
}
function isBSTByInUnRecur(tree) {
  let preVal = Number.MIN_SAFE_INTEGER
  let node = tree
  let stack = []
  while (stack.length != 0 || node != null) {
    if(node != null) {
      stack.push(node)
      node = node.left
    } else {
      node = stack.pop()
      let tmp = node.val
      console.log('val', tmp)
      if(tmp < preVal) {
        return false
      }
      preVal = tmp
      node = node.right
    }
  }
  return true
}
function isCBT(tree) {
  if(!tree) return false
  let node = tree
  let queue = []
  queue.push(node)
  let leaf = false
  while(queue.length > 0) {
    node = queue.shift()
    let leftNode = node.left
    let rightNode = node.right
    if((leaf && (leftNode != null || rightNode != null)) || (leftNode == null && rightNode != null)) return false
    if(leftNode != null) {
      queue.push(leftNode)
    }
    if(rightNode != null) {
      queue.push(rightNode)
    } else {
      leaf = true
    }
  }
  return true
}
function main() {
  let node = new Node(4)
  node.left = new Node(2)
  node.right = new Node(6)
  node.left.left = new  Node(1)
  node.left.right = new Node(3)
  node.right.left = new Node(5)
  console.log(isBST(node))

  node.left.left = new Node(1)
  node.left.right = new Node(3)
  node.right.left = new Node(5)

  console.log(isBSTByInUnRecur(node))
  console.log(isBSTByInRecur(node))
  console.log(isCBT(node))
}
main()
