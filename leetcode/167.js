// 给你一个下标从 1 开始的整数数组 numbers ，该数组已按 非递减顺序排列  ，请你从数组中找出满足相加之和等于目标数 target 的两个数。如果设这两个数分别是 numbers[index1] 和 numbers[index2] ，则 1 <= index1 < index2 <= numbers.length 。
//
// 以长度为 2 的整数数组 [index1, index2] 的形式返回这两个整数的下标 index1 和 index2。
//
// 你可以假设每个输入 只对应唯一的答案 ，而且你 不可以 重复使用相同的元素。
//
// 你所设计的解决方案必须只使用常量级的额外空间

// 示例 1：
//
// 输入：numbers = [2,7,11,15], target = 9
// 输出：[1,2]
// 解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。
// 示例 2：
//
// 输入：numbers = [2,3,4], target = 6
// 输出：[1,3]
// 解释：2 与 4 之和等于目标数 6 。因此 index1 = 1, index2 = 3 。返回 [1, 3] 。
// 示例 3：
//
// 输入：numbers = [-1,0], target = -1
// 输出：[1,2]
// 解释：-1 与 0 之和等于目标数 -1 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。

// 解题思路：
// 由于数组是有序的，那么可以遍历数组元素，在i+1到length - 1范围内使用二分法查找其差值，空间复杂度O(1)，时间复杂度O(nlogn)

// 二分法查找
var twoSum = function (numbers, target) {
  let len = numbers.length
  for(let i = 0; i < len; i++) {
    let left = i + 1;
    let right = numbers.length;
    while (left < right) {
      let mid = (left + right) / 2
      const count = (numbers[mid] + numbers[i]) - target
      if(count > 0) {
        right = mid
      } else if(count < 0) {
        left = mid + 1
      } else {
        return [i + 1, mid + 1]
      }
    }
  }
  return [-1, -1];
}
twoSum([2,3,4], 6);

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted
//   著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。