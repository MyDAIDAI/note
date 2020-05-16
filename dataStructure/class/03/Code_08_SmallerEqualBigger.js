// 将单向链表按某值划分成左边小，中间相等，右边大的形式
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}
// 方法1： 将链表中的数据存储在数组中，对数组进行划分，然后将划分好的数组转化为链表
// 空间复杂度：O(n)
function listPartition1(head, pivot) {
  let node = head
  let arr = []
  while (node != null) {
    arr.push(node)
    node = node.next
  }
  arrPartition(arr, pivot)
  let first = null
  node = null
  for (let index = 0, len = arr.length; index < len; index++) {
    let item = arr[index]
    if(node == null) {
      node = item
      first = node
    } else {
      node.next = item
      node = node.next
    }
    if(index === len - 1) {
      node.next = null
    }
  }
  return first
}
// 方法2：使用三个节点变量less, equal, more,遍历链表，分别把值挂载在相应变量上，最后将变量按照 less, equal, more串联起来
function listPartition2(head, pivot) {
  let less = null
  let lessHead = null
  let equal = null
  let equalHead = null
  let more = null
  let moreHead = null
  let node = head
  while (node != null) {
    if(node.value < pivot) {
      if(less == null) {
        less = node
        lessHead = node
      } else {
        less.next = node
        less = less.next
      }
    } else if(node.value > pivot) {
      if(more == null) {
        more = node
        moreHead = node
      } else {
        more.next = node
        more = more.next
      }
    } else {
      if(equal == null) {
        equal = node
        equalHead = node
      } else {
        equal.next = node
        equal = equal.next
      }
    }
    node = node.next
  }
  if(equal && equalHead) {
    less.next = equalHead
    equal.next = moreHead
  } else {
    less.next = moreHead
  }
  more.next = null
  return lessHead
}

function swap(arr, i, j) {
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}
function arrPartition(arr, pivot) {
  let less = 0
  let more = arr.length
  let index = 0
  while (index < more) {
    if(arr[index].value < pivot) {
      swap(arr, less++, index++)
    } else if(arr[index].value > pivot) {
      swap(arr, --more, index)
    } else {
      index++
    }
  }
}
function printLinkedList(head) {
  console.log('Linked list: ')
  while (head != null) {
    console.log(head.value)
    head = head.next
  }
}
// let arr = [1, 6, 7, 3, 5, 4, 2, 8, 0]
// arrPartition(arr, 5)
// console.log('arr', arr)
function main() {
  let head1 = new Node(7);
  head1.next = new Node(9);
  head1.next.next = new Node(1);
  head1.next.next.next = new Node(8);
  head1.next.next.next.next = new Node(5);
  head1.next.next.next.next.next = new Node(2);
  head1.next.next.next.next.next.next = new Node(5);
  printLinkedList(head1);
  // head1 = listPartition1(head1, 8);
  head1 = listPartition2(head1, 3);
  printLinkedList(head1);
}
main()
