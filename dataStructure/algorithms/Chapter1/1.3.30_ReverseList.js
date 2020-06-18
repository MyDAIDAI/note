// 编写一个函数，接受一条链表的首结点作为参数，（破坏性地）将链表反转并返回结果链表的首结点
function Node(val) {
  this.val = val
  this.next = null
}
// 遍历写法
function reverseList(list) {
  if(list == null) return
  let first = list
  let reverse = null
  while (first != null) {
    let second = first.next
    first.next = reverse
    reverse = first
    first = second
  }
  return reverse
}
function reverseListByRecur(first) {
  if(first == null) return null
  if(first.next == null) return first
  let second = first.next
  let rest = reverseListByRecur(second)
  second.next = first
  first.next = null
  return rest
}
function main() {
  let arr = [1, 2, 3, 4]
  let list = new Node(0)
  arr.reduce((pre, cur, index, arr) => {
    return pre.next = new Node(cur)
  }, list)
  console.log(JSON.stringify(list), JSON.stringify(reverseListByRecur(list)))
}
main()