// 将中序表达式转换为后序表达式
const LEFT_PAREN = '('
const RIGHT_PAREN = ')'
const OPERATION = ['+', '-', '*', '/']
function InfixToPostfix(s) {
  let dataQueue = []
  let operationStack = []
  let result = ''
  for (let i = 0, len = s.length; i < len; i++) {
    let item = s[i]
    if(item === LEFT_PAREN) {}
    else if(item === RIGHT_PAREN) {
      while (dataQueue.length > 0) {
        result += dataQueue.shift()
      }
      result += operationStack.pop()
    } else if(OPERATION.indexOf(item) > -1) {
      operationStack.push(item)
    } else {
      dataQueue.push(item)
    }
  }
  return result
}

console.log(InfixToPostfix('( 2 + ( ( 3 + 4 ) * ( 5 * 6 ) ) )'))
console.log(InfixToPostfix('( ( ( 5 + ( 7 * ( 1 + 1 ) ) ) * 3 ) + ( 2 * ( 1 + 1 ) ) )'))
console.log(InfixToPostfix('( 2 + ( ( 3 + 4 ) * ( 5 * 6 ) ) )'))
