class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}
function reverseBetween (head, m, n) {
  let count = 0
  let node1 = head
  let node2 = null
  let startNode = null
  let startNextNode = null
  let endNode = null
  let endNextNode = null
  while (node1 != null) {
    count++
    let tmp = node1.next
    if(count === m - 1) {
      startNode = node1
      startNextNode = node1.next
      startNode.next = null
    } else if(count === n) {
      endNode = node1
      endNextNode = node1.next
    } else if(count >= m && count <= n) {
      debugger
      node1.next = node2
    }
    node2 = node1
    node1 = tmp
  }
  startNextNode.next = endNextNode
  startNode.next = endNode
}
function printLinkedList(list) {
  let node = list
  while (node != null) {
    console.log(node.val)
    node = node.next
  }
}
function main() {
  let head = new Node(1);
  head.next = new Node(2);
  head.next.next = new Node(3);
  head.next.next.next = new Node(4);
  head.next.next.next.next = new Node(5);
  printLinkedList(head);
  reverseBetween(head, 2, 4)
  printLinkedList(head);
  console.log("=========================");
}
main()
