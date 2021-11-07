const isValidNode = (row, col, value, board) => {
  const cellValue = value;

  // Check horizontal
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === cellValue) return false;
  }

  // Check Vertucal
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === cellValue) return false;
  }

  // check box: we have to only check the diagonal of the box
  let x0 = Math.floor(row / 3) * 3;
  let y0 = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[x0 + i][y0 + j] === cellValue) return false;
    }
  }

  return true;
};

const countSudokuSolution = (board) => {
  //   console.log(board);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        let count = 0;
        for (let k = 1; k <= 9; k++) {
          if (isValidNode(i, j, k, board)) {
            board[i][j] = k;
            count += countSudokuSolution(board);
            board[i][j] = 0;
          }
        }
        return count;
      }
    }
  }
  return 1;
};

const solveRandomSudoku = (board) => {
  //   console.log(board);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        for (let k = 1; k <= 9; k++) {
          let num = Math.floor(Math.random() * 9) + 1;
          if (isValidNode(i, j, num, board)) {
            board[i][j] = num;
            if (solveRandomSudoku(board)) return true;
            board[i][j] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const getSudokuGrid = (maxEmptyCellsCount) => {
  let sudokuGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  solveRandomSudoku(sudokuGrid);

  // The method was not having
  // let emptyPositions = 81;
  // for (let i = 0; i <emptyPositions; i++) {
  //   let row = Math.floor(Math.random() * 9);
  //   let col = Math.floor(Math.random() * 9);
  //   sudokuGrid[row][col] = 0;
  // }

  // The min number of filled cell, so that unique solution exists is 17
  let emptyCells = 0;
  let suffledCells = [];
  for (let i = 0; i < 81; i++) {
    suffledCells.push(i);
  }

  // We are suffling the array to get random ordering of the elements
  suffledCells.sort(() => Math.random() - 0.5);

  let index = 0;
  while ((emptyCells <= maxEmptyCellsCount) & (index < 81)) {
    if (suffledCells.length === 0) break;

    let cell = suffledCells[index];
    index++;

    let i = Math.floor(cell / 9);
    let j = cell % 9;

    let value = sudokuGrid[i][j];
    sudokuGrid[i][j] = 0;

    let count = countSudokuSolution(sudokuGrid);

    if (count === 1) emptyCells++;
    else sudokuGrid[i][j] = value;
  }

  return sudokuGrid;
};

// const getSudokuGrid = () => {
//   let sudokuGrid = [
//     [5, 3, 0, 0, 7, 0, 0, 0, 0],
//     [6, 0, 0, 1, 9, 5, 0, 0, 0],
//     [0, 9, 8, 0, 0, 0, 0, 6, 0],

//     [8, 0, 0, 0, 6, 0, 0, 0, 3],
//     [4, 0, 0, 8, 0, 3, 0, 0, 1],
//     [7, 0, 0, 0, 2, 0, 0, 0, 6],

//     [0, 6, 0, 0, 0, 0, 2, 8, 0],
//     [0, 0, 0, 4, 1, 9, 0, 0, 5],
//     [0, 0, 0, 0, 8, 0, 0, 7, 9],
//   ];
//   return sudokuGrid;
// };

const getNode = (row, column, value, isModifiable) => {
  return {
    row: row,
    column: column,
    value: value,
    isValid: true,
    isModifiable: isModifiable,
    isHinted: false,
  };
};

const createSudokuGrid = (maxEmptyCellsCount) => {
  const numberGrid = getSudokuGrid(maxEmptyCellsCount);
  let sudokuGrid = [];

  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      let isModifiable = numberGrid[i][j] === 0;
      let node = getNode(i, j, numberGrid[i][j], isModifiable);
      row.push(node);
    }
    sudokuGrid.push(row);
  }

  return sudokuGrid;
};

export default createSudokuGrid;
