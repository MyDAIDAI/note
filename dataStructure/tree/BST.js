// 二叉查找树 BST
class Node {
  constructor(value, N) {
    this.value = value
    this.N = N
    this.left = undefined
    this.right = undefined
  }
}
function get(node, val) {
  if (node == null) {
    return null
  }
  let cmp = node.value - val
  if (cmp < 0) {
    return get(node.right, val)
  } else if(cmp > 0) {
    return get(node.left, val)
  } else {
    return node
  }
}
function put(node, val) {
  if (node == null) {
    return new Node(val, 1)
  }
  let cmp = node.value - val
  // console.log('node', node, cmp)
  if (cmp < 0) {
    node.right = put(node.right, val)
  } else if(cmp > 0) {
    node.left = put(node.left, val)
  } else {
    console.log('值重复', node)
  }
  return node
}
let node = new Node(6, 1)
let arr = [7, 8, 1, 3, 5, 0, 4]
for (let index = 0; index < arr.length; index++) {
  const element = arr[index];
  put(node, element)
}

console.log('node', JSON.stringify(node), get(node, 3))