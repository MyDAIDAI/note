/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
class ListNode {
  constructor(val) {
    this.val = val
    this.next = null
  }
}
/**
 * @param {ListNode} root
 * @param {number} k
 * @return {ListNode[]}
 */
var splitListToParts = function(root, k) {
  if(root == null) return null
  if(k == 1) return root
  let len = 0
  let node = root
  while(node != null) {
    node = node.next
    len++
  }
  let res = []
  let avarage = Math.floor(len / k)
  let residue = len % k
  node = root

  while(k != 0) {
    let item = []
    let count = avarage
    if(residue > 0) {
      count = avarage + 1
      residue--
    }
    while(count != 0) {
      let val = node ? node.val : null
      item.push(val)
      node = node && node.next ? node.next : null
      count--
    }

    res.push(item)
    k--
  }

  return res
};
let root = new ListNode(1)
root.next = new ListNode(2)
root.next.next = new ListNode(3)
root.next.next.next = new ListNode(4)
root.next.next.next.next = new ListNode(5)
root.next.next.next.next.next = new ListNode(6)
root.next.next.next.next.next.next = new ListNode(7)
root.next.next.next.next.next.next.next = new ListNode(8)
root.next.next.next.next.next.next.next.next = new ListNode(9)
root.next.next.next.next.next.next.next.next.next = new ListNode(10)
console.log(splitListToParts(root, 3))
