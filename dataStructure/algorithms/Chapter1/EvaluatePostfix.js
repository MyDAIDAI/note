// 计算后缀表达式的值
const OPERATION = ['+', '-', '*', '/']
function evaluatePostfix(s) {
  let dataStack = []
  for (let i = 0, len = s.length; i < len; i++) {
    let item = s[i]
    if(OPERATION.indexOf(item) > -1) {
      let operation = item
      let val = dataStack.pop()
      let result
      if(operation === '+') {
        result = Number(dataStack.pop()) + Number(val)
      } else if(operation === '-') {
        result = Number(dataStack.pop()) - Number(val)
      } else if(operation === '*') {
        result = Number(dataStack.pop())  * Number(val)
      } else {
        result = Number(dataStack.pop()) / Number(val)
      }
      dataStack.push(result)
    } else {
      dataStack.push(item)
    }
  }
  return dataStack.pop()
}

console.log(evaluatePostfix('234+56**+'))
