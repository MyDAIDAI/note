// 153. 寻找旋转排序数组中的最小值
// 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
//
// ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
//
// 请找出其中最小的元素。
//
// 你可以假设数组中不存在重复元素。
//
// 示例1
// 输入: [3,4,5,1,2]
// 输出: 1
// 示例2
// 输入: [4,5,6,7,0,1,2]
// 输出: 0
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
  let low = 0
  let high = nums.length - 1
  let min = nums[0]
  while (low <= high) {
    let mid = parseInt((low + high) / 2)
    if (nums[low] <= nums[mid]) { // 左边有序，则取左边最小值
      min = nums[low] < min ? nums[low] : min
      low = mid + 1
    } else {
      min = nums[mid] < min ? nums[mid] : min
      high = mid - 1
    }
  }
  return min
};
console.log(findMin([3,4,5,1,2]))
console.log(findMin([4,5,6,7,0,1,2]))
console.log(findMin([2, 1]))
