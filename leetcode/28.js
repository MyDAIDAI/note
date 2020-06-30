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
 * @return {boolean}
 */
var isSymmetric = function(root) {
  if(!root) return true
  let arr1 = []
  let arr2 = []
  inOrderFn1(root, arr1)
  inOrderFn2(root, arr2)
  let res = true
  for(let index = 0; index < arr1.length; index++) {
    if(arr1[index] != arr2[index]) {
      return false
    }
  }
  return res
};
// 中序遍历：左根右
function inOrderFn1(node, arr = []) {
  if(!node) return
  inOrderFn1(node.left, arr)
  arr.push(node.val)
  inOrderFn1(node.right, arr)
}
// 右根左
function inOrderFn2(node, arr = []) {
  if(!node) return
  inOrderFn2(node.right, arr)
  arr.push(node.val)
  inOrderFn2(node.left, arr)
}
let node = new TreeNode(1)
node.left = new TreeNode(2)
node.right = new TreeNode(2)
node.left.right = new TreeNode(3)
node.right.right = new TreeNode(3)
console.log(isSymmetric(node))
