// 1137. 第 N 个泰波那契数
// 题目描述
// 泰波那契序列 Tn 定义如下： 
//
// T0 = 0, T1 = 1, T2 = 1, 且在 n >= 0 的条件下 Tn+3 = Tn + Tn+1 + Tn+2
//
// 给你整数 n，请返回第 n 个泰波那契数 Tn 的值
//
// 示例1
// 输入：n = 4
// 输出：4
// 解释：
// T_3 = 0 + 1 + 1 = 2
// T_4 = 1 + 1 + 2 = 4
//
// 示例2
// 输入：n = 25
// 输出：1389537

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/n-th-tribonacci-number
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// 解析：该题目主要考察递归函数的使用，由题目可以抽取出如下等式
// T(0） = 0
// T(1) = 1
// T(2) = 1
// T(n) = T(n - 1) + T(n - 2) + T(n - 3)
// 方法1：递归
// 方法2：循环

/**
 * 状态：超时
 * @param {number} n
 * @return {number}
 */
var tribonacci = function(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (n === 2) return 1;
  return tribonacci(n - 3) + tribonacci(n - 2) +  tribonacci(n - 1)
};
// 按照题目写出如上递归函数，但提交之后显示超时，
// 仔细分析之后发现 tribonacci 函数的值会出现重复，
// 因此可以使用一个对象将计算过的值保存起来，避免重复计算
/**
 * 执行用时：52 ms
 * 状态：通过
 * @param {number} n
 * @return {number}
 */
let mapResult = {}
var tribonacci = function(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (n === 2) return 1;
  if (mapResult[n]) {
    return mapResult[n]
  }
  let result = tribonacci(n - 3) + tribonacci(n - 2) +  tribonacci(n - 1)
  mapResult[n] = result
  return result
};
