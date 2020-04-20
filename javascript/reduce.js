let r = [1, 2, 3, 4, 5].reduce((a, b) => a + b, 100)
console.log(r)

function reduce(arr, callback, initial) {
  let len = arr.length;
  let index = 1;
  let previousVal = arr[0];
  if (typeof  initial !== 'undefined') {
    index = 0;
    previousVal = initial
  }
  
  while (index < len) {
    previousVal = callback(previousVal, arr[index], index, arr)
    index++;
  }
  return previousVal
}
let value = reduce([1, 2, 3, 4, 5], (a, b) => {
  return a + b
}, 100)
let keys = ['name', 'age'] 
let values = ['dengpan', '18']
let map = reduce(keys, function (previous, current, index) {
  previous[current] = values[index]
  return previous
}, {})
console.log('map', map)
