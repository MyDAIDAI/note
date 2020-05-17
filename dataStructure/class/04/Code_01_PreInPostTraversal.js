// 二叉树的前中后序遍历，递归与非递归
class Node{
  constructor(val) {
    this.value = val
    this.left = null
    this.right = null
  }
}
function preOrderRecur(head) {
  if(head == null) return
  console.log('pre order', head.value)
  preOrderRecur(head.left)
  preOrderRecur(head.right)
}
function inOrderRecur(head) {
  if(head == null) return
  inOrderRecur(head.left)
  console.log('in order', head.value)
  inOrderRecur(head.right)
}
function postOrderRecur(head) {
  if(head == null) return
  postOrderRecur(head.left)
  postOrderRecur(head.right)
  console.log('post order', head.value)
}
function preOrderUnRecur(head) {
  if(head != null) {
    let stack = []
    stack.push(head)
    while (stack.length != 0) {
      let node = stack.pop()
      console.log('pre order un recur', node.value)
      if(node.right != null) {
        stack.push(node.right)
      }
      if(node.left != null) {
        stack.push(node.left)
      }
    }
  }
}
function inOrderUnRecur(head) {
  if(head != null) {
    let stack = []
    while (stack.length != 0 || head != null) {
      if(head != null) {
        stack.push(head)
        head = head.left
      } else {
        head = stack.pop()
        console.log('in order un recur', head.value)
        head = head.right
      }
    }
  }
}
function postOrderUnRecur(head) {
  if(head != null) {
    let stack1 = []
    let stack2 = []
    stack1.push(head)
    while (stack1.length != 0) {
      let node = stack1.pop()
      stack2.push(node)
      if(node.left != null) {
        stack1.push(node.left)
      }
      if(node.right != null) {
        stack1.push(node.right)
      }
    }
    while (stack2.length != 0) {
      console.log('post order un recur', stack2.pop().value)
    }
  }
}

function main() {
  let head = new Node(5);
  head.left = new Node(3);
  head.right = new Node(8);
  head.left.left = new Node(2);
  head.left.right = new Node(4);
  head.left.left.left = new Node(1);
  head.right.left = new Node(7);
  head.right.left.left = new Node(6);
  head.right.right = new Node(10);
  head.right.right.left = new Node(9);
  head.right.right.right = new Node(11);

  // recursive
  console.log("==============recursive==============");
  console.log("pre-order: ");
  preOrderRecur(head)
  console.log("in-order: ");
  inOrderRecur(head);
  console.log("pos-order: ");
  postOrderRecur(head);

  // unrecursive
  console.log("============unrecursive=============");
  preOrderUnRecur(head);
  inOrderUnRecur(head);
  postOrderUnRecur(head);
//   posOrderUnRecur2(head);
// head
}
main()