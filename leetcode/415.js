/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
  if(!num1) return num2
  if(!num2) return num1
  if(!num1 && !num2) return '0'
  let i1 = num1.length - 1
  let i2 = num2.length - 1
  let add = 0
  let sum = []
  let index = 0
  while(i1 >= 0 && i2 >= 0) {
    let item = Number(num1[i1--]) + Number(num2[i2--]) + add
    if(item >= 10) {
      add = 1
      item = item - 10
    }
    sum[index++] = item
  }
  while(i1 >= 0) {
    let item = Number(num1[i1--]) + add
    if(item >= 10) {
      item = item - 10
      add = 1
    }
    sum[index++] = item
  }
  while(i2 >= 0) {
    let item = Number(num1[i2--]) + add
    if(item >= 10) {
      item = item - 10
      add = 1
    }
    sum[index++] = item
  }
  if(add === 1) {
    sum.push(add)
  }
  return sum.reverse().join()
};

console.log(addStrings("408", "5"))
