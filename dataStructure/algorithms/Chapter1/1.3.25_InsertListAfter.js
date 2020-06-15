// 接受两个链表结点作为参数，将第二个结点插入链表并使之成为第一个节点的后续节点（如果两个参数为空则什么也不做）
function Node(val) {
  this.val = val
  this.next = null
}
function insertListAfter(list1, list2) {
  if(list1 == undefined) return list2
  if(list2 == undefined) return list1
  let cur = list1
  while (cur != null && cur.next != null) {
    cur = cur.next
  }
  cur.next = list2
  return list1
}
function main() {
  let arr1 = [1, 2, 3, 4, 5]
  let list1 = new Node(0)
  arr1.reduce((pre, cur, index, arr) => {
    return pre.next = new Node(cur)
  }, list1)
  let arr2 = [7, 8, 9, 10]
  let list2 = new Node(6)
  arr2.reduce((pre, cur, index, arr) => {
    return pre.next = new Node(cur)
  }, list2)
  console.log(JSON.stringify(list1), JSON.stringify(list2))
  console.log(JSON.stringify(insertListAfter(list1, list2)))
}
main()