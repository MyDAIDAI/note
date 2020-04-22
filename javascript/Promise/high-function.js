// 高阶函数
// 1. 将函数作为参数传递给一个函数
// 2. 返回一个函数

// isType('sdfsdf', 'String')
// 这种调用方式的缺点：
// 1. 对于同一种数据类型的判断，每次都要传入 type 参数
// 2. 如果 type 参数传入错误，会造成对比错误
// function isType(string, type) {
//   return Object.prototype.toString.call(string) === `[object ${type}]`
// }

// 使用高阶函数返回一个函数
// 将固定的参数保存在闭包中
function isType(type) {
  return function (content) {
    return Object.prototype.toString.call(content) === `[object ${type}]`
  }
}
const isString = isType('String')
const isNumber = isType('Number')
console.log(isString('sdfd'), isNumber(234))