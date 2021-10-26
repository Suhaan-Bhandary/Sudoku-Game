import React, { useState, useEffect } from "react";

import Node from "../Node/Node";
import {
  animateElement,
  arrayDeepCopy,
  checkBoard,
  createSudokoGrid,
  solveSudoko,
} from "../../utility";

import "./Grid.css";
import "animate.css";

const Grid = () => {
  const [grid, setGrid] = useState(null);
  const [startingGrid, setStartingGrid] = useState(null);

  useEffect(() => {
    // Creating a grid for the sudoko
    if (
      localStorage.getItem("startingGrid") == null ||
      localStorage.getItem("currentGrid") == null
    ) {
      let newSudokoGrid = createSudokoGrid();
      setStartingGrid(arrayDeepCopy(newSudokoGrid));
      setGrid(arrayDeepCopy(newSudokoGrid));

      localStorage.setItem("startingGrid", JSON.stringify(newSudokoGrid));
      localStorage.setItem("currentGrid", JSON.stringify(newSudokoGrid));
    } else {
      setStartingGrid(JSON.parse(localStorage.getItem("startingGrid")));
      setGrid(JSON.parse(localStorage.getItem("currentGrid")));
    }
  }, []);

  const setCurrentGrid = (grid) => {
    // setting the value to the grid and also to the local storage
    setGrid(grid);
    localStorage.setItem("currentGrid", JSON.stringify(grid));
  };

  const handleReset = () => {
    setGrid(startingGrid);
  };

  const handleSolve = () => {
    let solvedBoard = JSON.parse(JSON.stringify(grid));
    let solvedStatus = solveSudoko(solvedBoard);
    if (solvedStatus === false) {
      alert("Cannot be solved!");
      return;
    }

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j].value === 0) {
          solvedBoard[i][j].isHinted = true;
        }
      }
    }
    setCurrentGrid(solvedBoard);
  };

  const handleHint = () => {
    let solvedBoard = JSON.parse(JSON.stringify(grid));
    let solvedStatus = solveSudoko(solvedBoard);
    if (solvedStatus === false) {
      alert("Cannot be solved!");
      return;
    }

    // Finding all the empty nodes
    let emptyNodePositionList = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j].value === 0) {
          emptyNodePositionList.push([i, j]);
        }
      }
    }

    if(emptyNodePositionList.length  == 0){
      return;
    }

    // Making new node and replacing the empty value with the hint
    let newBoard = JSON.parse(JSON.stringify(grid));
    const hintNode =
      emptyNodePositionList[
        Math.floor(Math.random() * emptyNodePositionList.length)
      ];
    let hint_row = hintNode[0];
    let hint_column = hintNode[1];

    newBoard[hint_row][hint_column].value =
      solvedBoard[hint_row][hint_column].value;
    newBoard[hint_row][hint_column].isHinted = true;

    setCurrentGrid(newBoard);
  };

  const handleCellClick = (row, column, isModifiable) => {
    if (!isModifiable) {
      animateElement(".grid-table", "headShake");
      return;
    }

    let newGrid = [...grid];

    newGrid[row][column].value = newGrid[row][column].value + 1;
    if (newGrid[row][column].value > 9) newGrid[row][column].value = 0;

    checkBoard(newGrid);

    // setting the value to the grid and also to the local storage
    setCurrentGrid(newGrid);
  };

  return (
    <div className="Grid">
      <h1 onClick={() => handleReset()}>Reset</h1>
      <h1 onClick={() => handleSolve()}>Solve</h1>
      <h1 onClick={() => handleHint()}>Hint</h1>

      <table className="grid-table">
        <tbody>
          {grid &&
            grid.map((row, rowIndex) => {
              return (
                <tr className="row" key={rowIndex}>
                  {row.map((cell, columnIndex) => {
                    return (
                      <Node
                        key={rowIndex + "-" + columnIndex}
                        cell={cell}
                        handleClickCallback={handleCellClick}
                      />
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
