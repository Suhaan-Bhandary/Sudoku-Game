import React, { useEffect } from "react";
import lottie from "lottie-web";

import "./GameDetails.css";

import Button from "../Button/Button.js";

const GameDetails = ({
  closeModal,
  movesTaken,
  hintsTaken,
  startTime,
  isPlayerWon,
  pressedSolve,
  gameMode,
  mediumMaxEmptyCells,
  hardMaxEmptyCells,
}) => {

  let gameModeName = "Easy";
  if(gameMode === mediumMaxEmptyCells) gameModeName = "Medium";
  else if(gameMode === hardMaxEmptyCells) gameModeName = "Hard";

  useEffect(() => {
    let animationData;
    if (isPlayerWon && hintsTaken === 0) {
      animationData = require("../../assets/animations/ChampionWinnerAnimation/ChampionWinnerAnimation.json");
    } else if (isPlayerWon && pressedSolve) {
      animationData = require("../../assets/animations/LoserAnimation/LoserAnimation.json");
    } else if (isPlayerWon) {
      animationData = require("../../assets/animations/GameWonAnimation/GameWonAnimation.json");
    } else {
      animationData = require("../../assets/animations/KeepTryingAnimation/KeepTryingAnimation.json");
    }

    let container = document.getElementById("lottieAnimation");
    const lottieAnimation = lottie.loadAnimation({
      container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => lottieAnimation.destroy(); // Clean up function
  }, [isPlayerWon, hintsTaken, pressedSolve]);

  return (
    <div className="GameDetails">
      <div className="modal-container">
        <div className="modal-close-btn-container">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="modal-title">
          <h1>Game Details</h1>
        </div>
        <div className="modal-body">
          <div className="animation-container" id="lottieAnimation"></div>
          {isPlayerWon && <p>You Won !</p>}
          {!isPlayerWon && <p>Keep Playing you will surely complete it!</p>}
          <p>Game mode: {gameModeName}</p>
          <p>Moves Played: {movesTaken}</p>
          <p>Hints Taken: {hintsTaken}</p>
          <small>Started at: {startTime.split("GMT")[0]}</small>
        </div>
        <div className="modal-footer">
          <Button
            onClick={closeModal}
            buttonStyle="btn--primary--solid"
            text="Continue"
          />
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
