/*
 * @lc app=leetcode.cn id=56 lang=javascript
 *
 * [56] 合并区间
 *
 * https://leetcode-cn.com/problems/merge-intervals/description/
 *
 * algorithms
 * Medium (40.53%)
 * Likes:    324
 * Dislikes: 0
 * Total Accepted:    64K
 * Total Submissions: 157K
 * Testcase Example:  '[[1,3],[2,6],[8,10],[15,18]]'
 *
 * 给出一个区间的集合，请合并所有重叠的区间。
 * 
 * 示例 1:
 * 
 * 输入: [[1,3],[2,6],[8,10],[15,18]]
 * 输出: [[1,6],[8,10],[15,18]]
 * 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 * 
 * 
 * 示例 2:
 * 
 * 输入: [[1,4],[4,5]]
 * 输出: [[1,5]]
 * 解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
 * 
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

var merge = function(intervals) {
  if (!intervals || intervals.length === 0) {
    return []
  }
  let sortedArr = shellSort(intervals)
  let stack = [intervals[0]]
  let len = sortedArr.length
  for (let index = 1; index < len; index++) {
    let mergeArr = stack.pop()
    while (mergeArr) {
      let item = sortedArr[index]
      let data = [...mergeArr, ...item].sort((a, b) => a - b)
      if (data.indexOf(item[0]) === 2 && data.indexOf(item[1]) === 3) {
        stack.push(mergeArr)
        stack.push(item)
      } else {
        stack.push([data[0], data[3]])
      }
    }
  }
  return stack
};
// 
function shellSort(arr) {
  if (!arr || arr.length === 0) {
    return
  }
  let len = arr.length
  let h = 1
  while (h < len / 3) {
    h = 3 * h + 1
  }
  while (h >= 1) {
    for(let i = h; i < len; i++) {
      for(let j = i; j >= h; j -= h) {
        if (arr[j][1] - arr[j - h][1] < 0) {
          let tmp = arr[j - h]
          arr[j - h] = arr[j]
          arr[j] = tmp
        }
      }
    }
    h = Math.floor(h / 3)
  }
  return arr
}
// console.log('merge', merge([[2,3],[4,5],[6,7],[8,9],[1,10]]))
// @lc code=end

