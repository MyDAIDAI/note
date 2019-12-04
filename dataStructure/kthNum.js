// 求解一个数组中的第K大元素
// 思路：
// 1. 排序，取第 K - 1 位置的数据
// 2. 利用分治思想，每次取一个最后一个值为基准值
// 将小于基准值的值放在左边
// 最后将基准值放在中间
// 则基准值就会第 index + 1 大元素
// 依次计算比较其基准值的 index 大小

function kthNum(nums, k) {
  let len = nums.length
  if (k > len) {
    return -1
  }
  let p = partition(nums, 0, nums.length - 1)
  while (p + 1 !== k) {
    if (p + 1 > k) {
      p = partition(nums, 0, p - 1)
    } else {
      p = partition(nums, p + 1, len - 1)
    }
  }
  return nums[p]
}
function partition(arr, left, right) {
  let startIndex = left
  let pivot = arr[right] // 将最后位置的值作为基准值
  for (let i = left; i < right; i++) {
    if (arr[i] < pivot) {
      // 交换位置放在左边
      swap(arr, i, startIndex)
      // 将小于的位置后移
      startIndex++
    }
  }
  // 将基准值放在中间
  swap(arr, startIndex, right)
  return startIndex
}
function swap(arr, i, j) {
  if (i === j) return
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}
console.log(kthNum([7, 8, 3, 1, 6, 4, 2], 3))
