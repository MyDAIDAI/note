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
function findMin(node) {
  if (!node) {
    return false
  }
  let currentNode = node
  while (currentNode && currentNode.left) {
    currentNode = currentNode.left
  }
  return currentNode
}
function findMax(node) {
  if (!node) {
    return false
  }
  let currentNode = node
  while (currentNode && currentNode.right) {
    currentNode = currentNode.right
  }
  return currentNode
}
function deleteTree(node, val) {
  if (!node) {
    return
  }
  if (val < node.data) {
    node.left = deleteTree(node.left, val)
  } else if (val > node.data) {
    node.right = deleteTree(node.right, val)
  } else {
    // 找到当前要删除的节点
    // 1) 左右子节点都存在, 在右子树中查找最小值插入当前位置
    if (node.left && node.right) {
      let rightMin = findMin(node.right)
      node.value = rightMin.value
      node.right = deleteTree(node.right, rightMin.value)
    } else {
      let tmp = node
      // 2) 左子节点为空，则将右子节点返回
      if (!node.left) {
        node = node.right
      } else if (!node.right) { // 右子节点为空，则将左子节点返回
        node = node.left
      }
    }
  }
  return node
}
let node = new Node(6, 1)
let arr = [7, 8, 1, 3, 5, 0, 4]
for (let index = 0; index < arr.length; index++) {
  const element = arr[index];
  put(node, element)
}

console.log('node', JSON.stringify(node), deleteTree(node, 8), JSON.stringify(node))