// 148. 排序链表
// 在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序。
// 示例1
// 输入: 4->2->1->3
// 输出: 1->2->3->4
// 示例2
// 输入: -1->5->3->4->0
// 输出: -1->0->3->4->5

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 先使用归并的排序方法
 * 时间复杂度 O(nlogn)
 * 空间复杂度 O(n)
 * 执行用时：116ms
 * 内存消耗：40.4MB
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
  if (head == null) {
    return null
  }
  return cut(head)
};
function cut(head) {
  if (head.next == null) {
    return head
  }
  let left = head
  let slow = head
  let fast = head.next
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
  }
  let mid = slow.next
  let right = mid
  slow.next = null
  console.log('cute left ', left, 'right ', right)
  return merge(cut(left), cut(right))
}
function merge(left, right) {
  // 新建合并链表
  let head = {
    val: 'head',
    next: null
  }
  let res = head
  while (left && right) {
    if (left.val < right.val) {
      head.next = left
      left = left.next
    } else {
      head.next = right
      right = right.next
    }
    head = head.next
  }
  head.next = left ? left : right
  console.log('merge', res.next)
  return res.next
}

let result = sortList({
  val: 1,
  next: {
    val: 3,
    next: {
      val: 2,
      next: {
        val: 5,
        next: {
          val: 9,
          next: {
            val: 6,
            next: null
          }
        }
      }
    }
  }
})
console.log('result', JSON.stringify(result))

// 由底向上的归并排序
function sortList(head) {
}

