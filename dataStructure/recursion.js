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
