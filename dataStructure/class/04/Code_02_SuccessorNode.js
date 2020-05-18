class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
    this.parent = null
  }
}
function getSuccessorNode(node) {
  if(node == null) {
    return null
  }
  if(node.right != null) {
    return getLeftNode(node.right)
  } else {
    let parent = node.parent
    while (parent != null && parent.left != node) {
      node = parent
      parent = parent.parent
    }
    return parent
  }
}
function getLeftNode(node) {
  if(node == null) return null
  while (node.left != null) {
    node = node.left
  }
  return node
}

function main() {
  let head = new Node(6);
  head.parent = null;
  head.left = new Node(3);
  head.left.parent = head;
  head.left.left = new Node(1);
  head.left.left.parent = head.left;
  head.left.left.right = new Node(2);
  head.left.left.right.parent = head.left.left;
  head.left.right = new Node(4);
  head.left.right.parent = head.left;
  head.left.right.right = new Node(5);
  head.left.right.right.parent = head.left.right;
  head.right = new Node(9);
  head.right.parent = head;
  head.right.left = new Node(8);
  head.right.left.parent = head.right;
  head.right.left.left = new Node(7);
  head.right.left.left.parent = head.right.left;
  head.right.right = new Node(10);
  head.right.right.parent = head.right;

  let test = head.left.left;
  console.log(test.value + " next: " + getSuccessorNode(test).value);
  test = head.left.left.right;
  console.log(test.value + " next: " + getSuccessorNode(test).value);
  test = head.left;
  console.log(test.value + " next: " + getSuccessorNode(test).value);
  test = head.left.right;
  console.log(test.value + " next: " + getSuccessorNode(test).value);
  test = head.left.right.right;
  console.log(test.value + " next: " + getSuccessorNode(test).value);
  test = head;
  console.log(test.value + " next: " + getSuccessorNode(test).value);
  test = head.right.left.left;
  console.log(test.value + " next: " + getSuccessorNode(test).value);
  test = head.right.left;
  console.log(test.value + " next: " + getSuccessorNode(test).value);
  test = head.right;
  console.log(test.value + " next: " + getSuccessorNode(test).value);
  test = head.right.right; // 10's next is null
  console.log(test.value + " next: " + getSuccessorNode(test));
}
main()