/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
class ListNode {
  constructor(val) {
    this.val = val
    this.next = null
  }
}
var addTwoNumbers = function(l1, l2) {
  if (l1 == null && l2 == null) return null
  if (l1 == null && l2 != null) return l2
  if (l1 != null && l2 == null) return l1
  let result = null
  let node1 = l1
  let node2 = l2
  let add = 0
  let head = null
  while (node1 != null && node2 != null) {
    let val1 = node1.val
    let val2 = node2.val

    let r = val1 + val2 + add
    if (r > 9) {
      add = 1
      r = r.toString()[1]
    } else {
      add = 0
    }
    if (result == null) {
      result = new ListNode(Number(r))
      head = result
    } else {
      result.next = new ListNode(Number(r))
      result = result.next
    }
    node1 = node1.next
    node2 = node2.next
  }
  if (node1 != null) {
    while (node1 != null) {
      let r = node1.val + add
      add = r > 9 ? 1 : 0
      r = r > 9 ? r.toString()[1] : r
      result.next = new ListNode(Number(r))
      node1 = node1.next
      result = result.next
    }
  }
  if (node2 != null) {
    while (node2 != null) {
      let r = node2.val + add
      add = r > 9 ? 1 : 0
      r = r > 9 ? r.toString()[1] : r
      result.next = new ListNode(Number(r))
      node2 = node2.next
      result = result.next
    }
  }
  if (add == 1) {
    result.next = new ListNode(1)
  }
  return head
}
let list1 = new ListNode(1)
// list1.next = new ListNode(8)
// list1.next.next = new ListNode(3)

let list2 = new ListNode(9)
list2.next = new ListNode(9)
// list2.next.next = new ListNode(4)

console.log(addTwoNumbers(list1, list2))

