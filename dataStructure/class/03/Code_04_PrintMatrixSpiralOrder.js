// 转圈打印矩阵

function spiralOrderPrint(matrix) {
  let row1 = 0
  let col1 = 0
  let row2 = matrix.length - 1
  let col2 = matrix[0].length - 1
  while (row1 <= row2 && col1 <= col2) {
    printEdge(matrix, row1++, col1++, row2--, col2--)
  }
}
function printEdge(matrix, row1, col1, row2, col2) {
  let curRow = row1
  let curCol = col1
  if(row1 === row2) {
    while (curCol <= col2) {
      console.log('row:', curRow, 'col: ', curCol, 'num: ', matrix[curRow][curCol])
      curCol++
    }
  } else if(col1 === col2) {
    while (curRow <= row2) {
      console.log('row:', curRow, 'col: ', curCol, 'num: ', matrix[curRow][curCol])
      curRow++
    }
  } else {
    while (curCol < col2) {
      console.log('row:', curRow, 'col: ', curCol, 'num: ', matrix[curRow][curCol])
      curCol++
    }
    while (curRow < row2) {
      console.log('row:', curRow, 'col: ', curCol, 'num: ', matrix[curRow][curCol])
      curRow++
    }
    while (curCol > col1) {
      console.log('row:', curRow, 'col: ', curCol, 'num: ', matrix[curRow][curCol])
      curCol--
    }
    while (curRow > row1) {
      console.log('row:', curRow, 'col: ', curCol, 'num: ', matrix[curRow][curCol])
      curRow--
    }
  }
}
spiralOrderPrint([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]])
