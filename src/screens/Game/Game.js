import React, { useState, useEffect } from "react";

import "./Game.css";

import {
  Grid,
  ChoiceBoard,
  Button,
  InformationModal,
} from "../../components/index.js";

import {
  animateElement,
  arrayDeepCopy,
  checkBoard,
  createSudokuGrid,
  solveSudoku,
} from "../../utility";

import useLocalStorage from "../../hooks/useLocalStorage";

const Game = () => {
  const [grid, setGrid] = useLocalStorage("currentGrid", null);
  const [startingGrid, setStartingGrid] = useLocalStorage("startingGrid", null);
  const [clickValue, setClickValue] = useLocalStorage("clickValue", 1);

  // Game Score logic
  const [movesTaken, setMovesTaken] = useLocalStorage("movesTaken", 0);
  const [hintsTaken, setHintsTaken] = useLocalStorage("hintsTaken", 0);
  const [startTime, setStartTime] = useLocalStorage("startTime", () =>
    Date().toLocaleString()
  );

  // Logic for modal
  const [showInformationModal, setShowInformationModal] = useState(false);

  useEffect(() => {
    if (grid == null && startingGrid == null) {
      let newSudokuGrid = createSudokuGrid();
      setStartingGrid(arrayDeepCopy(newSudokuGrid));
      setGrid(arrayDeepCopy(newSudokuGrid));
    }
  }, [grid, startingGrid, setStartingGrid, setGrid]);

  const handleSolve = () => {
    let solvedBoard = arrayDeepCopy(grid);
    let solvedStatus = solveSudoku(solvedBoard);
    if (solvedStatus === false) {
      alert("Cannot be solved!");
      return;
    }

    let newHints = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j].value === 0) {
          newHints++;
          solvedBoard[i][j].isHinted = true;
          solvedBoard[i][j].isModifiable = false;
        }
      }
    }

    setHintsTaken((hints) => hints + newHints);
    setGrid(solvedBoard);
  };

  const handleHint = () => {
    let solvedBoard = arrayDeepCopy(grid);
    let solvedStatus = solveSudoku(solvedBoard);
    if (solvedStatus === false) {
      alert("Cannot be solved!");
      return;
    }

    // Adding hint count
    setHintsTaken((hints) => hints + 1);

    // Finding all the empty nodes
    let emptyNodePositionList = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j].value === 0) {
          emptyNodePositionList.push([i, j]);
        }
      }
    }

    if (emptyNodePositionList.length === 0) {
      return;
    }

    // Making new node and replacing the empty value with the hint
    let newBoard = arrayDeepCopy(grid);
    const hintNode =
      emptyNodePositionList[
        Math.floor(Math.random() * emptyNodePositionList.length)
      ];
    let hint_row = hintNode[0];
    let hint_column = hintNode[1];

    newBoard[hint_row][hint_column].value =
      solvedBoard[hint_row][hint_column].value;
    newBoard[hint_row][hint_column].isHinted = true;
    newBoard[hint_row][hint_column].isModifiable = false;

    setGrid(newBoard);
  };

  const handleNewGame = () => {
    // Making new grid
    let newSudokuGrid = createSudokuGrid();
    setStartingGrid(arrayDeepCopy(newSudokuGrid));
    setGrid(arrayDeepCopy(newSudokuGrid));

    // Reseting the values
    setMovesTaken(0);
    setHintsTaken(0);
    setStartTime(() => Date().toLocaleString());
  };

  const handleCellClick = (row, column, isModifiable) => {
    if (!isModifiable) {
      animateElement(".grid-table", "headShake");
      return;
    }

    // moves registered when the value is not 0
    if (clickValue !== 0) setMovesTaken((moves) => moves + 1);

    let newGrid = arrayDeepCopy(grid);
    newGrid[row][column].value = clickValue;

    checkBoard(newGrid);
    // setting the value to the grid and also to the local storage
    setGrid(newGrid);
  };

  return (
    <div className="Game">
      <h1
        onClick={() => setShowInformationModal((show) => !show)}
        className="main-title"
      >
        Sudoku Game
      </h1>
      {showInformationModal && (
        <InformationModal
          closeModal={() => setShowInformationModal((show) => !show)}
        />
      )}

      {/* TODO:Make a Game won modal */}

      <Grid handleCellClick={handleCellClick} grid={grid} />

      <ChoiceBoard setClickValue={setClickValue} selected={clickValue} />

      <div className="action-container">
        <Button
          onClick={() => setGrid(arrayDeepCopy(startingGrid))}
          buttonStyle="btn--primary--solid"
          text="Clear"
        />
        <Button
          onClick={handleSolve}
          buttonStyle="btn--success--solid"
          text="Solve"
        />
        <Button
          onClick={handleHint}
          buttonStyle="btn--warning--solid"
          text="Hint"
        />
        <Button
          onClick={handleNewGame}
          buttonStyle="btn--danger--solid"
          text="New Game"
        />
      </div>
    </div>
  );
};

export default Game;
