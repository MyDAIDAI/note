/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  if(!nums || nums.length === 0) return 0
  let dp = []
  dp[0] = nums[0]
  let max = Number.MIN_SAFE_INTEGER
  let len = nums.length
  for(let i = 1; i < len; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
  }
  for(let i = 0; i < dp.length; i++) {
    let item = dp[i]
    if(item > max) max = item
  }
  return max
};
let arr = [-2,-1]
console.log(maxSubArray(arr))
