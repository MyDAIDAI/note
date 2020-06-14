// 将十进制数转换为二进制
function integerToBinary(n) {
  let stack = []
  while (n > 0) {
    stack.push(n % 2)
    n = Math.floor(n / 2)
  }
  let s = ''
  while (stack.length > 0) {
    s += stack.pop()
  }
  return s
}

console.log('50', integerToBinary(50))
console.log('32', integerToBinary(32))
