/**
 * @param {number[]} height
 * @return {number}
 */
 var trap = function(height) {
  let preMax = [];
  let postMax = [];
  let sum = 0;
  calPreMax(preMax, height);
  calPostMax(postMax, height);
  for(let i = 0; i < height.length; i++) {
    const count = Math.min(preMax[i], postMax[i]) - height[i];
    if(count > 0) sum += count
  }
  return sum
};

function calPreMax(dp, height) {
  dp[0] = height[0]
  for(let i = 1; i < height.length; i++) {
    const item = height[i];
    dp[i] = Math.max(dp[i - 1], item)
  }
}

function calPostMax(dp, height) {
  const len =  height.lenth - 1;
  dp[len] = height[len];
  for(let i = len - 2; i >= 0; i--) {
    dp[i] = Math.max(dp[i+1], height[i])
  }
}
trap([0,1,0,2,1,0,1,3,2,1,2,1])