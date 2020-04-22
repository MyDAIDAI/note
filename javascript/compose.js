function sum(a, b) {
  return a + b
}

function len(str){
  return str.length
}
function add$(str) {
  return '$' + str
}
function compose1(...fns) {
  return function (...args) {
    let fn = fns.pop()
    let r1 = fn(...args)
    return fns.reduceRight((previousResult, currentFn, currentIndex) => {
      return currentFn(previousResult)
    }, r1) 
  }
}
function compose(...fns) {
  return fns.reduce(function (a, b) {
    return function (...args) {
      return a(b(...args)) 
    }
  })
}
let r = compose(add$, len, sum)('A', 'B')
console.log(r)
