
function findNextNodeInBinaryTrees(node) {
  if(node == undefined) return
  let nextNode = null
  if(node.right != undefined) { // 第一种情况，存在右子树
    let leftNode = node.right
    while (leftNode !== null && leftNode.left !== null) {
      leftNode = leftNode.left
    }
    nextNode = leftNode
  } else {
    // 第二种情况，该节点是否是父节点的左子节点
    if(node === node.parent.left) {
      nextNode = node.parent
    } else {
      let parent = node.parent
      let child = node
      while (parent && parent.left !== child) {
        child = parent
        parent = parent.parent
      }
      nextNode = parent
    }
  }
  return nextNode
}