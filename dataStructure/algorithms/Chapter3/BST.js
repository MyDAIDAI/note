class Node {
  constructor(key, val, n) {
    this.key = key
    this.val = val
    this.n = n || 1
    this.left = null
    this.right = null
  }
}
class BST {
 constructor(root) {
   this.root = root
 }
 size(node) {
   if(node == null) return 0
   return node.n
 }
 get(node, key) {
   if(node == null) return
   if(node.key < key) {
     this.get(node.right, key)
   } else if(node.key > key) {
     this.get(node.left, key)
   } else {
     return node.val
   }
 }
 put(node, key, val) {
   if(node == null) {
     return new Node(key, val, 1)
   }
   if(node.key < key) {
     node.right = this.put(node.right, key, val)
   } else if(node.key > key) {
     node.left = this.put(node.left, key, val)
   } else {
     node.val = val
   }
   node.n = this.size(node.left) + this.size(node.right) + 1
   return node
 }

  /**
   * 删除最小值
   * 一直递归遍历左子树, 如果其左子树不存在，则当前值为最小值，将当前节点的右子树放到父节点
   */
 deleteMin(node) {
   if(node.left == null) return node.right
    node.left = this.deleteMin(node.left)
    node.n = this.size(node.left) + this.size(node.right) + 1
    return node
 }

  /**
   * 删除最大值
   * @param node
   * @return {{right}|*}
   */
 deleteMax(node) {
   if(node.right == null) return node.left
   node.right = this.deleteMax(node.right)
   node.n = this.size(node.left) + this.size(node.right) + 1
   return node
 }
 min(node) {
   if(node.left == null) return node
   this.min(node.left)
 }
 max(node) {
   if(node.right == null) return node
   this.max(node.right)
 }
}

let root = new Node(6, 6)
let bst = new BST(root)
let arr = [1, 4, 3, 5, 2, 7, 9]
arr.forEach(ele => {
  bst.put(root, ele, ele)
})
console.log('min', bst.min(root))

console.log('bst', bst)