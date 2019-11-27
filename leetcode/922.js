// 922. 按奇偶排序数组 II
// 给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。
//
// 对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。
//
// 你可以返回任何满足上述条件的数组作为答案。
//
// 示例
// 输入：[4,2,5,7]
// 输出：[4,5,2,7]
// 解释：[4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受。
// 提示
// 1. 2 <= A.length <= 20000
// 2. A.length % 2 == 0
// 3. 0 <= A[i] <= 1000

/**
 * 使用桶排序
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParityII = function(A) {
  const oddArr = []
  const evenArr = []
  let len = A.length
  const resultArr = []
  for (let i = 0; i < len; i++) {
    if (A[i] % 2 === 0) {
      evenArr.push(A[i])
    } else {
      oddArr.push(A[i])
    }
  }
  for (let j = 0; j < len; j++) {
    if (j % 2 === 0) {
      resultArr[j] = evenArr.pop()
    } else {
      resultArr[j] = oddArr.pop()
    }
  }
  return resultArr
};

console.log(sortArrayByParityII([4,2,5,7]))
