const getWrongLines = (board, type) => {
  let wrongLines = new Set();

  for (let i = 0; i < 9; i++) {
    let dict = {};

    for (let j = 0; j < 9; j++) {
      let key;
      if (type === "horizontal") key = board[i][j].value;
      else key = board[j][i].value;

      if (key === 0) continue;

      if (Object.hasOwnProperty.call(dict, key)) {
        dict[key] += 1;
        if (dict[key] > 1) {
          wrongLines.add(i);
          break;
        }
      } else dict[key] = 1;
    }
  }
  return wrongLines;
};

const isBoxValid = (board,x0,y0) => {
  let dict = {};

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let key = board[x0 + i][y0 + j].value;
      if (key === 0) continue;

      if (Object.hasOwnProperty.call(dict, key)) {
        dict[key] += 1;
        if (dict[key] > 1) {
          console.log(x0,y0);
          return false;
        }
      } else dict[key] = 1;
    }
  }
  return true;
}

const getWrongBoxes = (board) => {
  let wrongBoxes = new Set();
  let boxValues = {
    0: { x: 0,y: 0 },
    1: { x: 0,y: 3 },
    2: { x: 0,y: 6 },
    3: { x: 3,y: 0 },
    4: { x: 3,y: 3 },
    5: { x: 3,y: 6 },
    6: { x: 6,y: 0 },
    7: { x: 6,y: 3 },
    8: { x: 6,y: 6 },
  };

  // We check for every boxes
  for (let box = 0; box < 9; box++) {
    // Now check all cells of the selected box
    let x0 = boxValues[box].x;
    let y0 = boxValues[box].y;

    if(!isBoxValid(board,x0,y0)) {
      wrongBoxes.add(box);
    }
  }

  return wrongBoxes;
};

const getBoxNumber = (x, y) => {
  let x0 = Math.floor(x / 3);
  let y0 = Math.floor(y / 3);
  let BoxNumber = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ][x0][y0];
  return BoxNumber;
};

const checkBoard = (board) => {
  // Check for the Horizontal
  // we will check all the board

  let wrongHorizontal = getWrongLines(board, "horizontal");
  let wrongVertical = getWrongLines(board, "vertical");
  let wrongBoxes = getWrongBoxes(board);

  console.log(getBoxNumber(1,5));
  console.log(wrongBoxes);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (
        wrongHorizontal.has(i) ||
        wrongVertical.has(j) ||
        wrongBoxes.has(getBoxNumber(i,j))
      ) {
        board[i][j].isValid = false;
      } else {
        board[i][j].isValid = true;
      }
    }
  }
};

export default checkBoard;
