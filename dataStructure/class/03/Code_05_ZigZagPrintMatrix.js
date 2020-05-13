function printZigZagMatrix(matrix) {
  let row1 = 0;
  let col1 = 0;
  let row2 = 0;
  let col2 = 0;
  let endRow = matrix.length - 1;
  let endCol = matrix[0].length - 1;
  let fromUp = false
  while (row1 != endRow + 1) {
    printLevel(matrix, row1, col1, row2, col2, fromUp)
    fromUp = !fromUp
    row1 = col1 === endCol ? row1 + 1 : row1
    col1 = col1 === endCol ? col1 : col1 + 1
    col2 = row2 === endRow ? col2 + 1 : col2
    row2 = row2 === endRow ? row2 : row2 + 1
  }
}
function printLevel(matrix, row1, col1, row2, col2, fromUp) {
  debugger
  if(fromUp) {
    while (row1 != row2 + 1) {
      console.log(matrix[row1++][col1--])
    }
  } else {
    while (row2 != row1 - 1) {
      console.log(matrix[row2--][col2++])
    }
  }
}
printZigZagMatrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])
