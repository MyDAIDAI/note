function Node(data) {
  this.data = data
  this.left = this.right =  null
}
function get(node, val) {
  if (!node) return
  if (val < node.data) {
    return get(node.left, val)
  } else if (val > node.data) {
    return get(node.right, val)
  } else {
    return node
  }
}
function put(node, val) {
  if (!node) {
    return new Node(val)
  }
  if (val > node.data) {
    node.right = put(node.right, val)
  } else if(val < node.data) {
    node.left = put(node.left, val)
  } else {
    throw new Error(`val: ${val}的节点已经存在`)
  }
  return node
}
function del(node, val) {
  if(!node) return
  if (val > node.data) {
    node.right = del(node.right, val)
  } else if(val < node.data) {
    node.left = del(node.left, val)
  } else {
    if (node.left && node.right) {
      let t = node
      node = findMin(node.right)
      node.right = del(t.right, node.data)
      node.left = t.left
    }
    if (!node.left) {
      return node.right
    }
    if (!node.right) {
      return node.left
    }
  }
  return node
}
function findMin(node) {
  if(!node) return
  while (node && node.left) {
    node = node.left
  }
  return node
}
function findMax(node) {
  if(!node) return
  while (node && node.right) {
    node = node.right
  }
  return node
}
function max(a, b) {
  return a > b ? a : b
}
function getHeight(node) {
  if (!node) return 0
  return max(getHeight(node.left), getHeight(node.right)) + 1
}
function getRangeKey(node, queue, lo, hi) {
  if (!node) return
  if (lo < node.data) {
    getRangeKey(node.left, queue, lo, hi)
  }
  if (hi > node.data) {
    getRangeKey(node.right, queue, lo, hi)
  }
  if (node.data >= lo && node.data <= hi) {
    queue.push(node.data)
  }
}
function getPathByValue(node, val, result) {
  if (!node) return
  let delta = val - node.data
  result.push(node.data)
  if (delta > node.data) {
    getPathByValue(node.left, delta, result)
    getPathByValue(node.right, delta, result)
  }
  if (delta < node.data) {
    getPathByValue(node.left, delta, result)
  }
}
let arr = [9, 8, 4, 6, 5, 0, 11, 3, 1, 2, 20]
let tree = null
for (let i = 0; i < arr.length; i++) {
  tree = put(tree, arr[i])
}
// console.log(getPathByValue(tree, 21, []))
// console.log('tree', JSON.stringify(tree), '-------------------------------', JSON.stringify(del(tree, 4)))
// console.log(getRangeKey)
let queue = []
getRangeKey(tree, queue, 5, 20)
console.log('key', queue)
let path = []
getPathByValue(tree,27, path)
console.log('path', path)