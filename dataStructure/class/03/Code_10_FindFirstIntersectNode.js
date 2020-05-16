class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

function getIntersectNode(head1, head2) {
  if(head1 == null || head2 == null) {
    return null
  }
  // 判断是否有环, 有环则拿到节点
  let loop1 = getLoopNode2(head1)
  let loop2 = getLoopNode2(head2)
  // 两个都没有环的情况
  if(loop1 == null && loop2 == null) {
    return noLoop(head1, head2)
  }
  // 两个节点都有环的情况
  if(loop1 && loop2) {
    return bothLoop(head1, loop1, head2, loop2)
  }
  return null
}
function noLoop(head1, head2) {
  let end1 = head1
  let end2 = head2
  let count1 = 0
  let count2 = 0
  while (end1 != null) {
    count1++
    end1 = end1.next
  }
  while (end2 != null) {
    count2++
    end2 = end2.next
  }
  if (end1 != end2) {
    return null
  }
  let cur1 = count2 > count1 ? head2 : head1
  let cur2 = cur1 === head1 ? head2 : head1
  let count = Math.abs(count2 - count1)
  while (count != 0) {
    cur1 = cur1.next
    count--
  }
  while (cur1 != cur2) {
    cur1 = cur1.next
    cur2 = cur2.next
  }
  return cur1
}
function bothLoop(head1, loop1, head2, loop2) {
  let cur1 = null
  let cur2 = null
  if(loop1 === loop2) {
    let count = 0
    cur1 = head1
    cur2 = head2
    while (cur1 != loop1) {
      cur1 = cur1.next
      count++
    }
    while (cur2 != loop1) {
      cur2 = cur2.next
      count--
    }
    cur1 = count > 0 ? head1 : head2
    cur2 = cur1 === head1 ? head2 : head1
    count = Math.abs(count)
    while (count != 0) {
      cur1 = cur1.next
      count--
    }
    while (cur1 != cur2) {
      cur1 = cur1.next
      cur2 = cur2.next
    }
    return cur2
  } else {
    cur1 = loop1.next
    while (cur1 != loop1) {
      if(cur1 == loop2) {
        return loop2
      }
      cur1 = cur1.next
    }
    return null
  }
}
// 使用快慢指针判断是否有环，并取出入环节点
function getLoopNode2(head) {
  if(head == null || head.next == null || head.next.next == null) return null
  let fast = head.next.next
  let slow = head.next
  while (slow != fast) {
    if(fast.next == null || fast.next.next == null) return null // 无环，返回null
    slow = slow.next
    fast = fast.next.next
  }
  fast = head         // 有环，将fast置为头节点，与slow同时向前移动，相等时则为入环
  while (fast != slow) {
    fast = fast.next
    slow = slow.next
  }
  return fast
}
// 使用hashSet方法判断是否有环并取出入环节点
function getLoopNode1(head) {
  if(head == null) return null
  let set = new Set()
  let node = head
  while (node != null) {
    if(set.has(node)) {
      return node
    }
    set.add(node)
    node = node.next
  }
  return null
}
function main() {
  // 1->2->3->4->5->6->7->null
  let head1 = new Node(1);
  head1.next = new Node(2);
  head1.next.next = new Node(3);
  head1.next.next.next = new Node(4);
  head1.next.next.next.next = new Node(5);
  head1.next.next.next.next.next = new Node(6);
  head1.next.next.next.next.next.next = new Node(7);

  // 0->9->8->6->7->null
  let head2 = new Node(0);
  head2.next = new Node(9);
  head2.next.next = new Node(8);
  head2.next.next.next = head1.next.next.next.next.next; // 8->6
  console.log(getIntersectNode(head1, head2));

  // 1->2->3->4->5->6->7->4...
  head1 = new Node(1);
  head1.next = new Node(2);
  head1.next.next = new Node(3);
  head1.next.next.next = new Node(4);
  head1.next.next.next.next = new Node(5);
  head1.next.next.next.next.next = new Node(6);
  head1.next.next.next.next.next.next = new Node(7);
  head1.next.next.next.next.next.next = head1.next.next.next; // 7->4

  // 0->9->8->2...
  head2 = new Node(0);
  head2.next = new Node(9);
  head2.next.next = new Node(8);
  head2.next.next.next = head1.next; // 8->2
  console.log(getIntersectNode(head1, head2));

  // 0->9->8->6->4->5->6..
  head2 = new Node(0);
  head2.next = new Node(9);
  head2.next.next = new Node(8);
  head2.next.next.next = head1.next.next.next.next.next; // 8->6
  console.log(getIntersectNode(head1, head2));
}
main()
