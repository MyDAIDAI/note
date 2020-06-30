
// reduce: 收敛，复合，把多个结果收敛成一个
// 数组扁平化，求和

Array.prototype.reduce = function (callback, pre) {
  let index = 0
  let arr = this
  if(typeof pre === 'undefined') {
    index = 1
    pre = arr[0]
  }
  while (index < arr.length) {
    pre = callback(pre, arr[index], index++, arr)
  }
  return pre
}

// 求和
let arr = [1, 2, 3, 4, 5]
let sum = arr.reduce((pre, cur, index) => {
  return pre + cur
}, 100)
console.log(sum)

// let multipleArr = [[1, 2, 3], [4, 5, 6], [7, 8]]
// let flattenArr = multipleArr.reduce((pre, cur, index) => {
//   return [...pre, ...cur]
// })
// console.log('flattenArr', flattenArr)
//
// function flatten(arr) {
//   if(!Array.isArray(arr)) return arr
//   return arr.reduce((pre, cur, index) => {
//     return pre.concat(flatten(cur))
//   }, [])
// }
//
// console.log(flatten([[[1], [2, [3, 4]], [5, 6, [7]]]]))
//
//
// function sum(a, b) {
//   return a + b
// }
// function len(str) {
//   return str.length
// }
// function add$(str) {
//   return '$' + str
// }
//
// function compose(...fn) {
//   return fn.reduce(function (a, b) {
//     return function (...args) {
//       return a(b(...args))
//     }
//   })
// }
//
// function compose(...fns) {
//   return function (...args) {
//     return fns.reduceRight((pre, cur, index) => {
//       if(!Array.isArray(pre)) {
//         pre = [pre]
//       }
//       return cur(...pre)
//     }, args)
//   }
// }
// let r = compose(add$, len, sum)('a', 'b')
// // let r = compose(sum, len, add$)('a', 'b')
// console.log('r', r)