
function CommonItemOfTwoArray(arr1, arr2) {
  if(!arr1 || arr1.length === 0) return []
  if(!arr2 || arr2.length === 0) return []
  let result = []
  let index1 = 0
  let index2 = 0
  while (index1 < arr1.length && index2 < arr2.length) {
    if(arr1[index1] === arr2[index2]) {
      result.push(arr1[index1])
      index1++
      index2++
    } else if(arr1[index1] < arr2[index2]) {
      index1++
    } else {
      index2++
    }
  }
  return result
}
console.log(CommonItemOfTwoArray([1, 2, 3, 4, 5, 7], [1, 2, 4, 5]))