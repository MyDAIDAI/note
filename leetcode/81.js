// TODO
// 81. 搜索旋转排序数组 II
// 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
//
// ( 例如，数组 [0,0,1,2,2,5,6] 可能变为 [2,5,6,0,0,1,2] )。
//
// 编写一个函数来判断给定的目标值是否存在于数组中。若存在返回 true，否则返回 false。
//
// 示例1
// 输入: nums = [2,5,6,0,0,1,2], target = 0
// 输出: true
//
// 示例2
// 输入: nums = [2,5,6,0,0,1,2], target = 3
// 输出: false

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function(nums, target) {
  let low = 0
  let high = nums.length - 1
  while (low <= high) {
    let mid = parseInt((low + high) / 2)
    if (nums[mid] === target) {
      return true
    }
    // 对于重复值的判断
    if (nums[low] === nums[mid]) {
      low++
      continue
    }
    if (nums[mid] === nums[high]) {
      high--
      continue
    }
    if (nums[low] < nums[mid]) {
      if (target >= nums[low] && target < nums[mid]) {
        high = mid - 1
      } else {
        low = mid + 1
      }
    } else if (nums[mid] < nums[high]) {
      if (target > nums[mid] && target <= nums[high]) {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }
  }
  return false
};
console.log(search([1, 3, 1, 1, 1], 3))
console.log(search([3, 1], 1))
