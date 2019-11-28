// 349. 两个数组的交集
// 给定两个数组，编写一个函数来计算它们的交集。
//
// 示例1
// 输入: nums1 = [1,2,2,1], nums2 = [2,2]
// 输出: [2]
// 示例2
// 输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出: [9,4]
// 说明:
// 输出结果中的每个元素一定是唯一的。
// 我们可以不考虑输出结果的顺序。


/**
 * 使用计数排序
 * 执行用时：68ms
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  let nums1CountArr = []
  for (let i = 0; i < nums1.length; i++) {
    if (nums1CountArr[nums1[i]] == undefined) {
      nums1CountArr[nums1[i]] = 1
    } else {
      nums1CountArr[nums1[i]]++
    }
  }
  let retArr = []
  for (let j = 0; j < nums2.length; j++) {
    if (nums1CountArr[nums2[j]] >= 1 && retArr.indexOf(nums2[j]) === -1) {
      retArr.push(nums2[j])
    }
  }
  return retArr
};
console.log(intersection([1,2,2,1], [2, 2]))
console.log(intersection([4,9,5], [9,4,9,8,4]))
