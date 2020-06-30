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
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
  if(head == null) return null
  if(k == 0 || head.next == null) return head
  let len = 0
  let node = head
  while(node != null) {
    node = node.next
    len++
  }
  k = k % len // 对k取摸，k == len 时即旋转为原位置，只用旋转 k % len 即可
  let n1 = head
  let start = head
  let n2 = n1.next
  while(k > 0) {
    let n3
    while(n2 != null && n2.next != null) {
      n3 = n2.next
      n1 = n2
      n2 = n3
    }
    n1.next = n3 && n3.next ? n3.next : null
    n2.next = start
    start = n2
    n1 = start
    n2 = n1.next ? n1.next : null
    k--
  }
  return start
};
let node = new ListNode(1)
node.next = new ListNode(2)
node.next.next = new ListNode(3)
node.next.next.next = new ListNode(4)
node.next.next.next.next = new ListNode(5)
console.log(rotateRight(node, 2))
