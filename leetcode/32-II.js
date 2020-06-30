/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  if(!root) return []
  let queue = []
  let res = []
  let node = root
  queue.push({
    node,
    level: 0
  })
  while(queue.length > 0) {
    let data = queue.shift()
    node = data.node
    let level = data.level
    let currentArr = !res[level] ? [] : res[level]
    currentArr.push(node.val)
    res[level] = currentArr
    if(node.left != null) {
      queue.push({
        node: node.left,
        level: level + 1
      })
    }
    if(node.right  != null) {
      queue.push({
        node: node.right,
        level: level + 1
      })
    }
  }
  return res
};
function main() {
  let node = new TreeNode(3)
  node.left = new TreeNode(9)
  node.right = new TreeNode(20)
  node.right.left = new TreeNode(15)
  node.right.right = new TreeNode(7)
  console.log(levelOrder(node))
}
main()
