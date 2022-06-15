// 给你一个包含 n 个整数的数组nums，判断nums中是否存在三个元素 a，b，c ，使得a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

// 解题思路
// 已排序的数组可以使用双指针的方式，那么三数之和可以先将数组排序，然后再使用双指针的方式
// 1. 将数组进行排序
// 2. 使用j, k两个指针指向

var threeSum = function (nums) {
  // 从小到大排序
  nums = nums.sort((a, b) => a - b);
  const retData = [];
  for (let i = 0; i < nums.length; i++) {
    let j = i + 1;
    let  k = nums.length - 1;
    while (j <= k) {
      const sum = nums[i] + nums[j] + nums[k]
      if(sum > 0) {
        k = k - 1;
      } else if(sum < 0) {
        j = j + 1;
      } else {
        retData.push([nums[i], nums[j],  nums[k]])
      }
    }
  }
  console.log('nums', retData)
  return retData
}

const nums = [-1,0,1,2,-1,-4]
threeSum(nums)