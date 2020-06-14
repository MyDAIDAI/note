// 删除链表的尾节点
const Util = require('./Util')
function deleteListTail(first) {
  if(first == null) return
  let cur = first

  while (cur.next && cur.next.next) {
    cur = cur.next
  }
  cur.next = cur.next.next
  return first
}
Util.testList(deleteListTail)
