// 题目描述
// 输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复数字
// 例如：输入的前序遍历序列[1, 2, 4, 7, 3, 5, 6, 8]和中序遍历序列[4, 7, 2, 1, 5, 3, 8, 6]

function BinaryTreeNode(val) {
  this.val = val
  this.left = null
  this.right = null
}

function buildTree(preOrder, inOrder) {
  if(preOrder == undefined || !Array.isArray(preOrder)) return
  if(inOrder == undefined || !Array.isArray(inOrder)) return
  if(preOrder.length === 0 || inOrder.length === 0) return

  let root = preOrder[0]
  let rootNode = new BinaryTreeNode(root)

  let rootIndex = inOrder.findIndex(ele => ele === root)
  rootNode.left = buildTree(preOrder.slice(1, rootIndex + 1), inOrder.slice(0, rootIndex))
  rootNode.right = buildTree(preOrder.slice(rootIndex + 1), inOrder.slice(rootIndex + 1))
  return rootNode
}

let tree = buildTree([1, 2, 4, 7, 3, 5, 6, 8], [4, 7, 2, 1, 5, 3, 8, 6])
console.log('tree', JSON.stringify(tree))