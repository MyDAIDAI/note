// 平衡二叉树 AVL
// 平衡因子： |BF(T)| = |h(L) - h(R)| <= 1
function Node(val) {
  this.val = val
  this.height = 0
  this.left = undefined
  this.right = undefined
}
function getHeight(node) {
  if (!node) return 0
  return max(getHeight(node.left), getHeight(node.right)) + 1
}
function max(a, b) {
  return a > b ? a : b
}

/**
 * 左左旋转
 * @param node
 */
function singleLeftRotation(node) {
  let avlNode = node.left
  node.left = avlNode.right
  avlNode.right = node
  node.height = max(getHeight(node.left), getHeight(node.right)) + 1
  avlNode.height = max(getHeight(avlNode.left), node.height) + 1
  return avlNode
}

/**
 * 右右旋转
 * @param node
 */
function singleRightRotation(node) {
  let avlNode = node.right
  node.right = avlNode.left
  avlNode.left = node
  node.height = max(getHeight(node.left), getHeight(node.right)) + 1
  avlNode.height = max(getHeight(avlNode.right), node.height) + 1
  return avlNode
}
function doubleLeftRightRotation(node) {
  node.left = singleRightRotation(node.left)
  return singleLeftRotation(node)
}
function doubleRightLeftRotation(node) {
  node.right = singleLeftRotation(node.right)
  return singleRightRotation(node)
}
function insert(node, val) {
  if (!node) return new Node(val)
  if (val < node.val) {
    node.left = insert(node.left, val)
    if (getHeight(node.left) - getHeight(node.right) >= 2) {
      if (val < node.left.val) {
        // 左左旋转
        node = singleLeftRotation(node)
      } else {
        // 左右旋转
        node = doubleLeftRightRotation(node)
      }
    }
  } else if(val > node.val) {
    node.right = insert(node.right, val)
    if (getHeight(node.right) - getHeight(node.left) >= 2) {
      if (val < node.right.val) {
        // 右左旋转
        node = doubleRightLeftRotation(node)
      } else {
        // 右右旋转
        node = singleRightRotation(node)
      }
    }
  }
  return node
}
// RR旋转: 右单旋
// LL旋转：左单旋
// LR旋转：
// RL旋转
let arr = [7, 8, 0, 1, 2, 4, 5, 9, -1];
let tree;
for (let index = 0; index < arr.length; index++) {
  tree = insert(tree, arr[index]);
}
console.log(tree)
