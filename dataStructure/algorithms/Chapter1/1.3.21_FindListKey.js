const Util = require('./Util')
function Node(val) {
  this.val = val
  this.next = null
}
function findListKey(list, key) {
  if(list == undefined || key == undefined) {
    return false
  }
  let cur = list
  while (cur && cur.val != key) {
    cur = cur.next
  }
  if(cur && cur.val === key) {
    return true
  }
  return false
}
Util.testList(findListKey, 8)
