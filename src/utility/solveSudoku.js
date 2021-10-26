const isValidNode = (row, col, value, board) => {
  const cellValue = value;

  // Check horizontal
  for (let i = 0; i < 9; i++) {
    if (board[row][i].value === cellValue) return false;
  }

  // Check Vertucal
  for (let i = 0; i < 9; i++) {
    if (board[i][col].value === cellValue) return false;
  }

  // check box: we have to only check the diagonal of the box
  let x0 = Math.floor(row / 3) * 3;
  let y0 = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[x0 + i][y0 + j].value === cellValue) return false;
    }
  }

  return true;
};

const solveSudoku = (board) => {
  //   console.log(board);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j].value === 0) {
        for (let k = 1; k <= 9; k++) {
          if (isValidNode(i, j, k, board)) {
            board[i][j].value = k;
            if(solveSudoku(board))return true;
            board[i][j].value = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

export default solveSudoku;
