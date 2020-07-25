const RED = 'red'
const BLACK = 'black'
class Node {
  constructor(key, val, color) {
    this.key = key
    this.val = val
    this.color = color
    this.left = null
    this.right = null
  }
}

class RedBlackTree {
  constructor(root) {
    this.root = root
  }
  isRed(node) {
    if(node == null) return false
    return node.color === RED
  }
  rotateLeft(node) {
    let h = node
    let x = h.right
    h.right = x.left
    x.left = h
    x.color = h.color
    h.color = RED
    console.log(`${node.key} 左旋`)
    return x
  }
  rotateRight(node) {
    let h = node
    let x = h.left
    x.color = h.color
    h.color = RED
    h.left = x.right
    x.right = h
    console.log(`${node.key} 右旋`)
    return x
  }
  flipColors(node) {
    if(node == null) return
    node.color = RED
    node.left.color = node.right.color = BLACK

    console.log(`${node.key} 变色`)
  }
  put(node, key, val) {
    debugger
    if(node == null) {
      return new Node(key, val, RED)
    }
    if(key < node.key) {
      node.left = this.put(node.left, key, val)
    } else if(key > node.key) {
      node.right = this.put(node.right, key, val)
    } else {
      node.val = val
    }
    // 右链接为红，左旋
    if(this.isRed(node.right) && !this.isRed(node.left)) {
      node = this.rotateLeft(node)
    }
    // 左子节点为红并且左左也为红
    if(this.isRed(node.left) && this.isRed(node.left.left)) {
      node = this.rotateRight(node)
    }
    // 左右都为红，直接变色
    if(this.isRed(node.left) && this.isRed(node.right)) {
      this.flipColors(node)
    }
    return node
  }
}
let arr = [1, 2, 3, 4, 5, 6, 7]
let root = new Node(0,0, BLACK)
let rbt = new RedBlackTree(root)
for (let i = 0; i < arr.length; i++) {
  root = rbt.put(root, arr[i], arr[i])
}
console.log(root)
console.log('result', JSON.stringify(rbt.root))