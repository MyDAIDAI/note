// 在一个长度为n的数字里的所有数字都在 0 ~ n - 1的范围内。数组中的某些数字时重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。例如输入长度为7的数组`[2, 3, 1, 0, 2, 5, 3]`，那么对应的重复数字是2或者3

// 先写测试用例

// 正常输入
// input: [2, 3, 1, 0, 2, 5, 3] 7, 0 ~ 6
// 正常输入，但数组中的内容超过n
// input: [2, 3, 8, 4, 2] 5, 0 ~ 8
// 错误输入：undefined 或者不是数组类型

function DuplicationInArray(arr) {
  if(arr === undefined || !Array.isArray(arr) || arr.length === 0) {
    throw new Error('input must be a array')
  }
  let len = arr.length
  for (let i = 0; i < len; i++) {
    let item = arr[0]
    if(item >= len) {
      throw new Error('数组中的最大值超过数组长度值')
    }
    if(item < i) {
      return item
    }
    while (item !== i) {
      if(item >= len) {
        throw new Error('数组中的最大值超过数组长度值')
      }
      exchange(arr, i, item)
      item = arr[item]
    }
  }
  return
}

// 正常输入
// input [2, 3, 1, 0, 2, 5, 3], 0, 1
// 正常输入，但范围超过
// input: [2, 3, 1, 0, 2, 5, 3] -1, 8
// 错入输入
// input: undefined
// input: [2, 3, 1, 0, 2, 5, 3], undefined, undefined
// input: [2, 3, 1, 0, 2, 5, 3], '123', 'we123'
function exchange(arr, i, j) {
  if(arr == undefined || !Array.isArray(arr) || arr.length === 0) {
    throw new Error('input arr must be a array')
  }
  if(i == undefined || j == undefined) {
    throw new Error('i and j cant be undefined')
  }
  if(Number.isNaN(+i) || Number.isNaN(+j)) {
    throw new Error('i and j must be a number type')
  }
  let len = arr.length
  if(i < 0 || i >= len) {
    throw new Error()
  }
  if(j < 0 || j >= len) {
    throw new Error()
  }
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
  return arr
}
let arr = [2, 3, 1, 0, 2, 5, 3]
// console.log(exchange(JSON.parse(JSON.stringify(arr)), 0, 1))
// console.log(exchange(JSON.parse(JSON.stringify(arr)), -1, 8))
// console.log(exchange())
// console.log(exchange(arr))
// console.log(exchange(arr, '123', '0'))
// console.log(exchange(arr, 'e23'))

console.log(DuplicationInArray(JSON.parse(JSON.stringify(arr))))
// console.log(DuplicationInArray(JSON.parse(JSON.stringify([2, 3, 8, 4, 2]))))
// console.log(DuplicationInArray())
// console.log(DuplicationInArray('sdfsdf'))
