// 编写一个方法`remove()`, 接受一个链表和一个字符串`key`作为参数，删除链表中所有`item`域为`key`的结点
function Node(val) {
  this.val = val
  this.next = null
  // this.id = Math.floor(Math.random() * 100)
}
function removeListByKey(list, key) {
  if(list == undefined) return
  if(key == undefined) return list
  let pre = list
  let cur = list.next
  // 第一个节点处理
  if(pre.val === key) {
    list = list.next
  }
  let next = cur.next
  // 第二个节点处理
  if(cur.val === key && next == null) {
    pre = next
  }
  while (cur != null && cur.next != null) {
    if(cur.val === key) {
      pre.next = next
    } else {
      pre = cur
    }
    cur = next
    next = next.next
  }
  // 最后一个节点处理
  if(cur.val === key) {
    pre.next = null
  }
  return list
}

function main() {
  let arr = [1, 2, 3, 2, 4]
  let list = new Node(0)
  arr.reduce((pre, cur, index, arr) => {
    return pre.next = new Node(cur)
  }, list)
  console.log(JSON.stringify(list))
  console.log(JSON.stringify(removeListByKey(JSON.parse(JSON.stringify(list)), 2)))
  console.log(JSON.stringify(removeListByKey((JSON.parse(JSON.stringify(list))), 0)))
  console.log(JSON.stringify(removeListByKey(JSON.parse(JSON.stringify(list)), 4)))
}
main()