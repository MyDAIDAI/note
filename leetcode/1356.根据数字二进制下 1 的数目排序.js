/**
 * @param {number[]} arr
 * @return {number[]}
 */
var sortByBits = function(arr) {
  if(!arr || arr.length === 0) return []
  if(arr.length === 1) return arr
  merge(arr, 0, arr.length - 1)
  return arr
};
function merge(arr, l, r) {
  if(l >= r) return
  let mid = Math.floor((l + r) / 2)
  merge(arr, l, mid)
  merge(arr, mid + 1, r)
  mergeSort(arr, l, mid, r)
}
function mergeSort(arr, l, mid, r) {
  let help = []
  let index = 0
  let p1 = l
  let p2 = mid + 1
  while(p1 <= mid && p2 <= r) {
    let c1 = getOneCount(arr[p1])
    let c2 = getOneCount(arr[p2])
    if(c1 === c2) {
      help[index++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++]
    } else {
      help[index++] = c1 < c2 ? arr[p1++] : arr[p2++]
    }
  }
  while(p1 <= mid) {
    help[index++] = arr[p1++]
  }
  while(p2 <= r) {
    help[index++] = arr[p2++]
  }
  for(let index = 0, len = help.length; index < len; index++) {
    arr[l + index] = help[index]
  }
}
function getOneCount(num) {
  if(!num) return 0
  debugger
  let data = num.toString(2)
  let count = 0
  for(let index = 0, len = data.length; index < len; index++) {
    if(data[index] === '1') {
      count++
    }
  }
  return count
}
let arr = [0,1,2,3,4,5,6,7,8]
console.log(sortByBits(arr))
