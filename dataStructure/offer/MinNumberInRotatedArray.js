

/**
 * 旋转数组中查找最小值
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function(numbers) {
  if(numbers == undefined || !Array.isArray(numbers)) return
  if(numbers.length === 0) return
  if(numbers.length === 1) return numbers[0]
  let l = 0
  let r = numbers.length - 1
  while(l < r) {
    let mid = l + ((r - l) >> 1)
    if(numbers[mid] > numbers[r]) {
      l = mid + 1
    } else if(numbers[mid] < numbers[r]) {
      r = mid
    } else {
      r = r - 1
    }
  }
  return numbers[l]
};