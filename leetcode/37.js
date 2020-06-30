// 面试题37. 序列化二叉树
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
  let queue = []
  queue.push(root)
  let res = []
  while(queue.length > 0) {
    let node = queue.shift()
    res.push(node.val)
    queue.push(node.left)
    queue.push(node.right)
  }
  return JSON.stringify(res)
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
  data = JSON.parse(data)

};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
