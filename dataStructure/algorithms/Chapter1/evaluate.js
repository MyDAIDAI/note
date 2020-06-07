// 计算字符串表达式的值 (1 + ((2 + 3) * (4 * 5)))
const operation = [
  '+',
  '-',
  '*',
  '/'
]
function evaluate(expression) {
  if(typeof expression !== 'string') {
    throw new Error('expression muse be string')
  }
  const dataStack = []
  const opsStack = []
  for (let i = 0, len = expression.length; i < len; i++) {
    let item = expression[i]
    if(item === '(') {} // 左侧(则直接忽略
    else if (operation.indexOf(item) > -1) { // 操作符压入操作符栈
      opsStack.push(item)
    } else if(item === ')') { // 右侧)则弹出相应数据进行计算
      let opt = opsStack.pop()
      let val = Number(dataStack.pop())
      let result
      if(opt === '+') {
        result = Number(dataStack.pop()) + val
      } else if(opt === '-') {
        result = Number(dataStack.pop()) - val
      } else if(opt === '*') {
        result = Number(dataStack.pop()) * val
      } else {
        result = Number(dataStack.pop()) / val
      }
      dataStack.push(result)
    } else { // 最后是数据，直接压入数据栈
      dataStack.push(item)
    }
  }
  return dataStack.pop()
}

console.log(evaluate('(1+((2+3)*(4*5)))'))
