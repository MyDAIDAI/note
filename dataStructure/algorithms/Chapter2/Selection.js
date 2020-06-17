const Util = require("./Util")
// 选择排序
// 时间复杂度：O(n ^ 2)
function selectSort(arr) {
  if(!Array.isArray(arr)) return
  let len = arr.length
  for (let i = 0; i < len; i++) {
    let minIndex = i
    for (let j = i; j < len; j++) {
      if(arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    Util.swap(arr, i, minIndex)
  }
}
let arr = [3, 4, 1, 7, 0, 10, 2]
selectSort(arr)
console.log(arr, Util.isSorted(arr))