const getSudokuGrid = () => {
  let sudokuGrid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],

    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],

    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];
  return sudokuGrid;
};

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

const createSudokuGrid = () => {
  const numberGrid = getSudokuGrid();
  let sudokuGrid = [];

  for (let i = 0; i <9;i++){
    let row = [];
    for(let j = 0; j < 9; j++){
      let isModifiable = (numberGrid[i][j] === 0);
      let node = getNode(i, j, numberGrid[i][j], isModifiable);
      row.push(node);
    }
    sudokuGrid.push(row);
  }

  return sudokuGrid;
}

export default createSudokuGrid;