// TODO
// 33. 搜索旋转排序数组
// 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
//
// ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
//
// 搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。
//
// 你可以假设数组中不存在重复的元素。
//
// 你的算法时间复杂度必须是 O(log n) 级别。
//
// 示例1
// 输入: nums = [4,5,6,7,0,1,2], target = 0
// 输出: 4
// 示例2
// 输入: nums = [4,5,6,7,0,1,2], target = 3
// 输出: -1
/**
 * 执行时间：68ms
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  let low = 0
  let high = nums.length - 1
  while (low <= high) {
    let mid = parseInt((low + high) / 2)
    if (nums[mid] === target) return mid
    if (nums[low] <= nums[mid]) { // 左边部分为有序数组
      if (target >= nums[low] && target < nums[mid]) {
        high = mid - 1
      } else {
        low = mid + 1
      }
    } else {
      if (target > nums[mid] && target <= nums[high]) {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }
  }
  return -1
};
console.log('search', search([4,5,6,7,0,1,2], 0))


