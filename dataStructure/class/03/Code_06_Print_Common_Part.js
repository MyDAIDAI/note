// 给定两个有序链表的头指针head1和head2，打印两个链表的公共部分
function Node(data) {
  this.value = data
  this.next = null
}
function printCommonPart(head1, head2) {
  let index1 = head1
  let index2 = head2
  while (index1 && index2) {
    if(index1.value < index2.value) {
      index1 = index1.next
    } else if(index1.value > index2.value) {
      index2 = index2.next
    } else {
      console.log('index1: ', index1, index1.value)
      console.log('index2: ', index2, index2.value)
      index1 = index1.next
      index2 = index2.next
    }
  }
}
function printLinkedList(node) {
  while (node != null) {
    console.log('node', node.value)
    node = node.next
  }
}
function main() {
  let node1 = new Node(2);
  node1.next = new Node(3);
  node1.next.next = new Node(5);
  node1.next.next.next = new Node(6);

  let node2 = new Node(1);
  node2.next = new Node(2);
  node2.next.next = new Node(5);
  node2.next.next.next = new Node(7);
  node2.next.next.next.next = new Node(8);

  printLinkedList(node1);
  printLinkedList(node2);
  printCommonPart(node1, node2);
}
main()
