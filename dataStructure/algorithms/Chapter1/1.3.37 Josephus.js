// 约瑟夫问题
function josephus(n, m) {
  if(n == undefined || m == undefined) return
  let queue = []
  for (let i = 0; i < n; i++) {
    queue.push(i)
  }
  let result = ''
  while (queue.length > 0) {
    for (let i = 0; i < m - 1; i++) {
      queue.push(queue.shift())
    }
    result += queue.shift()
  }
  return result
}

console.log(josephus(7, 2))
