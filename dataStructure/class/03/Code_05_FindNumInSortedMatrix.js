//在行列都排好序的矩阵中找数
function findNumInSortedMatrix(matrix, num) {
  let row = 0
  let col = matrix[0].length - 1
  let endRow = matrix.length - 1
  let endCol = matrix.length - 1
  while (row <= endRow && col >= 0) {
    let data = matrix[row][col]
    if(data < num) {
      row++
    } else if(data > num) {
      col--
    } else if(data === num){
      return true
    }
  }
  return false
}
console.log(findNumInSortedMatrix([[0, 1, 2, 5], [2, 3, 4, 7], [4, 4, 4, 8], [5, 7, 7, 9]], 7))
