/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
  let i = 0
  let j = nums.length - 1
  let res = [-1, -1]
  while (i <= j) {
    let mid = Math.floor((i + j) / 2)
    if(nums[mid] < target) {
      i = mid + 1
    } else if(nums[mid] > target) {
      j = mid - 1
    } else if(nums[mid] === target) {
      i = mid
      j = mid
       // 寻找右边界
       while (j < nums.length && nums[j] === target) {
         j++
       }
       while (i >= 0 && nums[i] === target) {
         i--
       }
       res = [i, j]
    }
  }
  return res
};

function searchFirst(nums, target) {
  let l = 0
  let r = nums.length - 1
  while (l <= r) {
    let mid = l + ((r - l) >> 1)
    if(nums[mid] < target) {
      l = mid + 1
    } else if(nums[mid] > target) {
      r = mid - 1
    } else {
      if(mid === 0 || nums[mid - 1] != target) return mid
      else r = mid - 1
    }
  }
  return -1
}
function searchLast(nums, target) {
  let l = 0
  let r = nums.length - 1
  while (l <= r) {
    let mid = l + ((r - l) >> 1)
    if(nums[mid] < target) {
      l = mid + 1
    } else if(nums[mid] > target) {
      r = mid - 1
    } else {
      if(mid === nums.length - 1 || nums[mid + 1] != target) return mid
      else l = mid + 1
    }
  }
  return -1
}
console.log(searchLast([5,7,7,8,8,10], 8))
