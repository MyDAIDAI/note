class Node {
  constructor(key, value) {
    this.key = key
    this.value = value
  }
}
class BST1 {
  constructor(root) {
    this.root = root
  }

  /**
   * 从某个节点开始查找键key
   * @param node
   * @param key
   * @return {null|*}
   */
  get(node, key) {
    if(node == undefined) return null
    if(key == undefined) return
    if(node.key > key) {
      return this.get(node.left, key)
    } else if(node.key < key) {
      return this.get(node.right, key)
    } else {
      return node
    }
  }

  /**
   * 插入node
   * @param key
   * @param val
   */
  put(node, key, val) {
    if(node == undefined) return new Node(key, val)
    if(node.key < key) {
      node.right = this.put(node.right, key, val)
    } else if(node.key > key) {
      node.left = this.put(node.left, key, val)
    } else {
      node.value = val
    }
    return node
  }
  getMin(node) {
    if(node == null) return
    if(node.left == null) return node
    return this.getMin(node.left)
  }
  getMax(node) {
    if(node == null) return
    if(node.right == null) return node
    return this.getMax(node.right)
  }
}