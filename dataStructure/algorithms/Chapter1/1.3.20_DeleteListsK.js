// 删除第k个节点
const Util = require('./Util')
function deleteListK(list, k) {
  if(list == undefined || !k) return
  let cur = list
  if(k === 1) {
    cur = cur.next
    return cur
  } else {
    let size = 0
    while (cur && ++size < k - 1) {
      cur = cur.next
    }
    if(cur) {
      cur.next = cur.next.next
    } else {
      cur.next = null
    }
  }
  return list
}
Util.testList(deleteListK, 6)
