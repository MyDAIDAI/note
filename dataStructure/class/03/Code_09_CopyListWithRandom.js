class Node {
  constructor(value) {
    this.value = value
    this.next = null
    this.random = null
  }
}
function copyListWithRand1(head) {
  let hashMap = new Map()
  let node = head
  while (node != null) {
    let copyNode = new Node(node.value)
    hashMap.set(node, copyNode)
    node = node.next
  }
  node = head
  while (node != null) {
    let nextNode = node.next
    let randomNode = node.random
    let copyNode = hashMap.get(node)
    copyNode.next = hashMap.get(nextNode)
    copyNode.random = hashMap.get(randomNode)
    node = node.next
  }
  return hashMap.get(head)
}
function copyListWithRand2(head) {
  if(head == null) {
    return null
  }
  let node = head
  // 拷贝节点并将拷贝节点插入后面
  while (node != null) {
    let copyNode = new Node(node.value)
    let next = node.next
    node.next = copyNode
    copyNode.next = next
    node = next
  }
  node = head
  while (node != null) {
    let copyNode = node.next
    let randomNode = node.random
    let randomCopyNode = randomNode == null ? null : randomNode.next
    copyNode.random = randomCopyNode
    node = node.next.next
  }
  node = head
  let copyList = head.next
  while (node != null) {
    let next = node.next.next
    let copyNode = node.next
    node.next = next
    copyNode.next = next == null ? null : next.next
    node = next
  }
  return copyList
}
function printRandLinkedList(head) {
  let cur = head;
  console.log("order: ");
  while (cur != null) {
    console.log(cur.value + " ");
    cur = cur.next;
  }
  console.log('\n')
  cur = head;
  console.log("rand:  ");
  while (cur != null) {
    console.log(cur.random == null ? "- " : cur.random.value + " ");
    cur = cur.next;
  }
  console.log('\n')
}

function main() {
  let head = null;
  let res1 = null;
  let res2 = null;
  // printRandLinkedList(head);
  // res1 = copyListWithRand1(head);
  // printRandLinkedList(res1);
  // res2 = copyListWithRand2(head);
  // printRandLinkedList(res2);
  // printRandLinkedList(head);
  // System.out.println("=========================");

  head = new Node(1);
  head.next = new Node(2);
  head.next.next = new Node(3);
  head.next.next.next = new Node(4);
  head.next.next.next.next = new Node(5);
  head.next.next.next.next.next = new Node(6);

  head.random = head.next.next.next.next.next; // 1 -> 6
  head.next.random = head.next.next.next.next.next; // 2 -> 6
  head.next.next.random = head.next.next.next.next; // 3 -> 5
  head.next.next.next.random = head.next.next; // 4 -> 3
  head.next.next.next.next.random = null; // 5 -> null
  head.next.next.next.next.next.random = head.next.next.next; // 6 -> 4

  printRandLinkedList(head);
  res1 = copyListWithRand1(head);
  debugger
  printRandLinkedList(res1);
  // debugger
  printRandLinkedList(head);
  res2 = copyListWithRand2(head);
  printRandLinkedList(res2);
  // System.out.println("=========================");
}
main()
