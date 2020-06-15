// 删除某个节点之后的全部节点
function Node(val) {
  this.val = val
  this.next = null
}
function findNode(list, val) {
  if(list == undefined) return
  if(val == undefined) return
  let cur = list
  while (cur != null && cur.val !== val) {
    cur = cur.next
  }
  if(cur) {
    return cur
  }
  return
}
function removeAfter(list, node) {
  if(list == undefined) return
  if(node == undefined) return list
  let cur = list
  while (cur != null && cur !== node) {
    cur = cur.next
  }
  if(cur) {
    cur.next = null
  }
  return list
}
function main() {
  let arr = [1, 2, 3, 4, 5]
  let list = new Node(0)
  arr.reduce((pre, cur, index, arr) => {
    return pre.next = new Node(cur)
  }, list)
  console.log('before', JSON.stringify(list))
  let node = findNode(list, 3)
  removeAfter(list, node)
  console.log('after', JSON.stringify(list))
}
main()
