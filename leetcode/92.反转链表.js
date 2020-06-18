class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}
/**
 * @param {Node} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function(head, m, n) {
  if(head == null) return null
  if(m == undefined || n == undefined) return head
  let first = head
  let reverse = null
  let start = null
  let end = null
  let endPre = null
  let count = 1
  let startNext = null
  while(first != null) {
    if(count === m - 1) {
      start = first
      startNext = start.next
    }
    if(count === n + 1) {
      end = first
    }
    if(count === n) {
      endPre = first
    }
    let second = first.next
    if(count >= m && count <= n) {
      // 交换位置
      first.next = reverse
    }
    reverse = first
    first = second
    count++
  }
  if(start) {
    start.next = endPre
  }
  if(end) {
    startNext.next = end
  }
  return head
};
function printLinkedList(list) {
  let node = list
  while (node != null) {
    console.log(node.val)
    node = node.next
  }
}
function main() {
  let head = new Node(3);
  head.next = new Node(5);
  // head.next.next = new Node(3);
  // head.next.next.next = new Node(4);
  // head.next.next.next.next = new Node(5);
  console.log(JSON.stringify(head), JSON.stringify(reverseBetween(head, 1)))
}
main()
