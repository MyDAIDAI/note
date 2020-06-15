//编写一个方法`max()`，接受一条链表的首节点作为参数，返回链表中键最大的节点的值。假设所有键均为正数，如果链表为空则返回0
function Node(val) {
  this.val = val
  this.next = null
}
function getListMax(list) {
  if(list == undefined) return 0
  let max = 0
  let cur = list
  while (cur != null) {
    if(cur.val > max) {
      max = cur.val
    }
    cur = cur.next
  }
  return max
}
function getListMaxByRecur(list, max) {
  if(list == undefined) return max // 递归到最后，将值返回
  if(list.val > max) {
    max = list.val
  }
  return getListMaxByRecur(list.next, max)
}
function getListSumByRecur(list, sum) {
  if(list == null) return sum
  sum += list.val
  return getListSumByRecur(list.next, sum)
}
function getArrSumByRecur(arr, index, sum) {
  if(arr == undefined) return 0
  if(index === arr.length) return sum
  sum += arr[index++]
  return getArrSumByRecur(arr, index, sum)
}
function main() {
  let arr = [0, 2, 5, 1, 8, 9, 101, 10, 3]
  let list = new Node(6)
  arr.reduce((pre, cur, index, arr) => {
    return pre.next = new Node(cur)
  }, list)
  console.log(getListMax(list))
  console.log(getListMaxByRecur(list, 0))
  console.log(getListSumByRecur(list, 0))
  console.log(getArrSumByRecur(arr, 0, 0))
}
main()