// 斐波那契数列
// 斐波那契数列的是这样一个数列：1、1、2、3、5、8、13、21、34....，
// 即第一项 f(1) = 1,第二项 f(2) = 1.....,第 n 项目为 f(n) = f(n-1) + f(n-2)。
// 求第 n 项的值是多少。
function fab(n) {
  if (n <= 2) {
    return 1
  }
  return fab(n-1) + fab(n - 2)
}
console.log('fab', fab(3))

// 小青蛙跳台阶
// 一只青蛙一次可以跳上1级台阶，也可以跳上2级。
// 求该青蛙跳上一个n级的台阶总共有多少种跳法。
// f(1) = 1, f(n) = f(n - 1) + f(n - 2)

// lian

// 字符串反转
function reverse(str) {
  if (str.length <= 0) {
    return str
  }
  return reverse(str.slice(1)) + str[0]
}
console.log('reverse', reverse('abcde'))

let arr = [1, 2, [3, 4, [5, 6], [7, 8]]]
function flatArr(arr) {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] instanceof Array) {
      result.push(...flatArr(arr[i]))
      // result.concat(flatArr[arr[i]])
    } else {
      result.push(arr[i])
    }
  }
  return result
}
console.log('flatArr', flatArr(arr))

// 递归爆栈
// 执行数值 100, 进程卡死
// function sum(n) {
//   if (n <= 2) {
//     return 1
//   } else {
//     return sum(n - 1) + sum(n - 2)
//   }
// }
// console.time('sum')
// console.log(sum(100))
// console.timeEnd('sum')

// 进行尾递归优化后的代码
// 执行时间: 0.730ms
function optimizeSum(n, a = 1, b = 1) {
  if (n <= 2) {
    return b
  } else {
    return optimizeSum(n - 1, b, a + b)
  }
}
console.time('optimizeSum')
console.log(optimizeSum(100))
console.timeEnd('optimizeSum')

// TODO: what is 尾递归优化？