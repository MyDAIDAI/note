// 判断链表是否是回文结构
// const {ArrayQueue, ArrayStack} = require('./Code_01_ArrayToStackQueue')
let id = 0
function Node(data) {
  this.value = data
  this.next = null
  this.id = id++
}
class ArrayStack {
  constructor() {
    this.index = 0
    this.arr = []
  }
  push(val) {
    this.arr[this.index++] = val
  }
  peek() {
    return this.arr[this.index - 1]
  }
  pop() {
    if(this.index <= 0) {
      return
    }
    let data = this.arr[this.index - 1]
    this.arr.length = this.arr.length - 1
    this.index--
    return data
  }
  isEmpty() {
    return this.arr.length === 0
  }
}
// 使用栈作为辅助空间
function isPalindrome1(list) {
  let head = list
  if(!head) {
    return true
  }
  let stack = new ArrayStack()
  while (head != null) {
    stack.push(head)
    head = head.next
  }
  head = list
  while (head != null) {
    if(head.value !== stack.pop().value) {
      return false
    }
    head = head.next
  }
  return true
}


// 使用快慢指针以及一半的辅助空间
function isPalindrome2(list) {
  if(list == null || list.next == null) {
    return true
  }
  let stack = new ArrayStack()
  let fast = list
  let slow = list
  while (fast.next != null && fast.next.next != null) {
    fast = fast.next.next
    slow = slow.next
  }
  // 从中间节点开始划分，将后面的节点依次方式栈中
  let middle = slow.next
  while (middle != null) {
    stack.push(middle)
    middle = middle.next
  }
  let node = list
  while (!stack.isEmpty()) { // 判断到后面栈可能用空，通过栈的内容进行判断
    if(node.value !== stack.pop().value) {
      return false
    }
    node = node.next
  }
  return true
}
function isPalindrome3(list) {
  if(list == null || list.next == null) {
    return true
  }
  let fast = list
  let slow = list
  while (fast.next != null && fast.next.next != null) {
    fast = fast.next.next
    slow = slow.next
  }
  // 将右部分保存，并将中点的下一个指向null
  let node = slow.next
  slow.next = null
  let n1 = slow
  let end = null
  while (node != null) {
    let tmp = node.next
    if(tmp == null) {
      end = node
    }
    node.next = n1
    n1 = node
    node = tmp
  }
  let first = list
  let last = end
  let res = true
  while (first != null && last != null) {
    if(first.value !== last.value) {
      res = false
      break
    }
    first = first.next
    last = last.next
  }
  // 将链表的修改部分反转
  let node1 = end
  let node2 = end.next
  end.next = null
  while (node2 != null) {
    let tmp = node2.next
    node2.next = node1
    node1 = node2
    node2 = tmp
  }
  return res
}
function printLinkedList(list) {
  console.log('linked list')
  let node = list
  while (node != null) {
    console.log(node.value + ' ')
    node = node.next
  }
}
function main() {
  let head = null;
  printLinkedList(head);
  console.log(isPalindrome1(head) + " | ");
  console.log(isPalindrome2(head) + " | ");
  console.log(isPalindrome3(head) + " | ");
  printLinkedList(head);
  console.log("=========================");

  head = new Node(1);
  printLinkedList(head);
  console.log(isPalindrome1(head) + " | ");
  console.log(isPalindrome2(head) + " | ");
  console.log(isPalindrome3(head) + " | ");
  printLinkedList(head);
  console.log("=========================");

  head = new Node(1);
  head.next = new Node(2);
  printLinkedList(head);
  console.log(isPalindrome1(head) + " | ");
  console.log(isPalindrome2(head) + " | ");
  console.log(isPalindrome3(head) + " | ");
  printLinkedList(head);
  console.log("=========================");

  head = new Node(1);
  head.next = new Node(1);
  printLinkedList(head);
  console.log(isPalindrome1(head) + " | ");
  console.log(isPalindrome2(head) + " | ");
  console.log(isPalindrome3(head) + " | ");
  printLinkedList(head);
  console.log("=========================");

  head = new Node(1);
  head.next = new Node(2);
  head.next.next = new Node(3);
  printLinkedList(head);
  console.log(isPalindrome1(head) + " | ");
  console.log(isPalindrome2(head) + " | ");
  console.log(isPalindrome3(head) + " | ");
  printLinkedList(head);
  console.log("=========================");

  head = new Node(1);
  head.next = new Node(2);
  head.next.next = new Node(1);
  printLinkedList(head);
  console.log(isPalindrome1(head) + " | ");
  console.log(isPalindrome2(head) + " | ");
  console.log(isPalindrome3(head) + " | ");
  printLinkedList(head);
  console.log("=========================");

  head = new Node(1);
  head.next = new Node(2);
  head.next.next = new Node(3);
  head.next.next.next = new Node(1);
  printLinkedList(head);
  console.log(isPalindrome1(head) + " | ");
  console.log(isPalindrome2(head) + " | ");
  console.log(isPalindrome3(head) + " | ");
  printLinkedList(head);
  console.log("=========================");

  head = new Node(1);
  head.next = new Node(2);
  head.next.next = new Node(2);
  head.next.next.next = new Node(1);
  printLinkedList(head);
  console.log(isPalindrome1(head) + " | ");
  console.log(isPalindrome2(head) + " | ");
  console.log(isPalindrome3(head) + " | ");
  printLinkedList(head);
  console.log("=========================");

  head = new Node(1);
  head.next = new Node(2);
  head.next.next = new Node(3);
  head.next.next.next = new Node(2);
  head.next.next.next.next = new Node(1);
  printLinkedList(head);
  console.log(isPalindrome1(head) + " | ");
  console.log(isPalindrome2(head) + " | ");
  console.log(isPalindrome3(head) + " | ");
  printLinkedList(head);
  console.log("=========================");
}
main()
