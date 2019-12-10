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