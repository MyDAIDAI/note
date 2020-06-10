/**
 * 求不重复的整数数组中的局部最小值
 * 局部最小值满足条件：
 * arr[i] < arr[i - 1]
 * arr[i] > arr[i + 1]
 * @param arr
 * @constructor
 */
function LocalMinOfArray(arr) {
  if(!arr || arr.length === 0) return
  let left = 0
  let right = arr.length - 1
  while (left < right) {
    let mid = left + (right - left) >> 1
    if(arr[mid] > arr[mid - 1]) {
      right = mid - 1
    } else if(arr[mid] > arr[mid + 1]) {
      left = mid + 1
    }
  }
}
