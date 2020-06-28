/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
  if(matrix == null || matrix.length === 0 || target == null) return false
  let i = 0
  let j = matrix[0].length - 1
  debugger
  while(i < matrix.length && j >= 0) {
    if(matrix[i][j] < target) {
      i++
    }else if(matrix[i][j] > target) {
      j--
    } else {
      return true
    }
  }
  return false
};
let arr = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]
console.log(findNumberIn2DArray(arr, 20))