// 179. 最大数
// 给定一组非负整数，重新排列它们的顺序使之组成一个最大的整数。

// 示例 1:
// 输入: [10,2]
// 输出: 210
// 示例 2:
// 输入: [3,30,34,5,9]
// 输出: 9534330
// 说明: 输出结果可能非常大，所以你需要返回一个字符串而不是整数

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/largest-number
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// 思路： S1+ S2 > S2 + S1
// 特殊处理：'000' -> '0'

/**
 * 执行用时：80 ms
 * 内存消耗：37.4 MB
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function(nums) {
  let arr = qucikSort(nums)
  return arr.join('').replace(/^0+/, "") || "0";
};

function qucikSort(arr)  {
  if (arr.length <= 1) {
    return arr
  }
  let provitIndex = Math.floor(arr.length / 2)
  let provit = String(arr.splice(provitIndex, 1)[0])
  let left = []
  let right = []
  for (let i = 0; i < arr.length; i++) {
    let value = String(arr[i])
    if (provit + value > value + provit) {
      right.push(value)
    } else {
      left.push(value)
    }
  }
  return qucikSort(left).concat(provit, qucikSort(right))
}
console.log(largestNumber([0, 0])) // '0'
console.log(largestNumber([1, 1])) // '11'