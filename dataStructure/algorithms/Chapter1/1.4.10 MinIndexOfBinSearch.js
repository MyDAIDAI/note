// 修改二分查找，返回和被查找的键匹配的索引的最小元素
function MinIndexOfBinSearch(arr, value) {
  if(!arr || arr.length === 0) return
  if(value == undefined) return -1
  let l = 0
  let r = arr.length
  while (l <= r) {
    let mid = l + ((r - l) >> 1)
    if(arr[mid] < value) {
      l = mid + 1
    } else if(arr[mid] > value) {
      r = mid - 1
    } else {
      if(mid === 0 || arr[mid - 1] != value) {
        return mid
      } else {
        r = mid - 1
      }
    }
  }
  return -1
}
console.log(MinIndexOfBinSearch([1, 3, 3, 3, 4], 3))