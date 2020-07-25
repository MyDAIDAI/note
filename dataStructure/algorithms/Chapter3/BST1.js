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
  deleteMin(node) {
    if(node == null) return
    if(node.left == null) return node.right
    node.left = this.deleteMin(node.left)
    return node
  }
  deleteMax(node) {
    if(node == null) return
    if(node.right == null) return node.left
    node.right = this.deleteMax(node.right)
    return node
  }
  delete(node, key) {
    if(node == null) return
    if(node.key < key) {
      node.right = this.delete(node.right, key)
    } else if(node.key > key) {
      node.left = this.delete(node.left, key)
    } else {
      // 没有左子树，则把右子树直接返回
      if(node.left == null) return node.right
      // 没有右子树，则把左子树直接返回
      if(node.right == null) return node.left
      // 左右子树都存在
      let t = node
      let x = this.getMin(node.right)
      x.right = this.deleteMin(node.right)
      x.left = t.left
      return x
    }
  }
}