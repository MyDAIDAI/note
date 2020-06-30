// 将字符串转换为数字
// '123' -> 123
// 'asf' -> NaN
// '123.123' -> 123.123

function toNumber(str) {
  if(typeof str !== 'string' || str === '') return NaN
  let flag
  if(str[0] === '-') {
    flag = -1
  } else {
    flag = 1
  }
  let strData = str.split('.')
  let zheng = strData[0]
  let xiao = strData[1]
  let result = 0
  let count = 1/10
  if(xiao !== undefined) {
    for (let i = 0; i < xiao.length; i++) {
      let item = getNumber(xiao[i])
      if(!item) {
        return NaN
      }
      let val = item * count
      count = count / 10
      result += val
    }
  }
  count = 1
  for (let j = zheng.length - 1;j >= 0; j--) {
    if(zheng[j] === '-') break
    let item = getNumber(zheng[j])
    if(!item) return NaN
    let val = item * count
    count = count * 10
    result += val
  }
  result = flag * result
  if(result > Number.MAX_VALUE) return Number.MAX_VALUE
  if(result < Number.MIN_VALUE) return Number.MIN_VALUE
  return result
}

console.log(toNumber('123123123.456'))
function getNumber(str) {
  if(typeof str !== "string") return false
  switch (str) {
    case '0':
      return 0
    case '1':
      return 1
    case '2':
      return 2
    case '3':
      return 3
    case '4':
      return 4
    case '5':
      return 5
    case '6':
      return 6
    case '7':
      return 7
    case '8':
      return 8
    case '9':
      return 9
    default:
      return false
  }
}