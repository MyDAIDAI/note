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
 delete(node, key) {
   if(key == null || node == null) return
   // 先查找到该值
   if(node.key < key) {
     node.right = this.delete(node.right, key)
   } else if(node.key > key) {
     node.left = this.delete(node.left, key)
   } else {
     // 如果只有一个子节点或者没有节点
     if(node.left == null) return node.right
     if(node.right == null) return node.left
     // 存在大于1个的子节点
     // 拿到右子树中最小的节点，将当前位置替换
     let t = node
     let x = this.min(node.right)
     x.right = this.deleteMin(node.right)
     x.left = t.left
   }
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