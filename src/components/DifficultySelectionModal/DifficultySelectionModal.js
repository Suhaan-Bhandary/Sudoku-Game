import React, { useEffect, useRef } from "react";

import lottie from "lottie-web";
import easyDifficultyAnimationData from "../../assets/animations/DifficultyAnimations/EasyDifficultyAnimation/EasyDifficultyAnimation.json";
import mediumDifficultyAnimationData from "../../assets/animations/DifficultyAnimations/MediumDifficultyAnimation/MediumDifficultyAnimation.json";
import hardDifficultyAnimationData from "../../assets/animations/DifficultyAnimations/HardDifficultyAnimation/HardDifficultyAnimation.json";

import "./DifficultySelectionModal.css";

import Button from "../Button/Button.js";

const DifficultySelectionModal = ({
  closeModal,
  handleNewGame,
  easyMaxEmptyCells,
  mediumMaxEmptyCells,
  hardMaxEmptyCells
}) => {
  
  console.log("rendering....");
  const bodyContainer = useRef(null);

  // Use Effect for the animation
  useEffect(() => {
    let defaultOptions = { renderer: "svg", loop: true, autoplay: true };

    // Easy Difficulty Animation
    let easyDifficultyAnimationContainer = document.getElementById(
      "easyDifficultyAnimation"
    );
    const easyDifficultyAnimation = lottie.loadAnimation({
      container: easyDifficultyAnimationContainer,
      animationData: easyDifficultyAnimationData,
      ...defaultOptions,
    });

    // Medium Difficulty Animation
    let mediumDifficultyAnimationContainer = document.getElementById(
      "mediumDifficultyAnimation"
    );
    const mediumDifficultyAnimation = lottie.loadAnimation({
      container: mediumDifficultyAnimationContainer,
      animationData: mediumDifficultyAnimationData,
      ...defaultOptions,
    });

    // Hard Difficulty Animation
    let hardDifficultyAnimationContainer = document.getElementById(
      "hardDifficultyAnimation"
    );
    const hardDifficultyAnimation = lottie.loadAnimation({
      container: hardDifficultyAnimationContainer,
      animationData: hardDifficultyAnimationData,
      ...defaultOptions,
    });

    bodyContainer.current.style.visibility = 'visible';

    return () => {
      easyDifficultyAnimation.destroy();
      mediumDifficultyAnimation.destroy();
      hardDifficultyAnimation.destroy();
    }; // Clean up function
  }, []);


  return (
    <div className="DifficultySelectionModal">
      <div className="modal-container">
        <div className="modal-close-btn-container">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="modal-title">
          <h1>Difficulty Mode</h1>
        </div>
        <div className="difficulty-modal-body" ref={bodyContainer}>
          <div className="difficulty-selection-container">
            <div className="difficulty easy" onClick={() => handleNewGame(easyMaxEmptyCells)}>
              <div
                className="animation-container-difficulty"
                id="easyDifficultyAnimation"
              ></div>
              <p>Easy</p>
            </div>

            <div
              className="difficulty medium"
              onClick={() => handleNewGame(mediumMaxEmptyCells)}
            >
              <div
                className="animation-container-difficulty"
                id="mediumDifficultyAnimation"
              ></div>
              <p>Medium</p>
            </div>

            <div className="difficulty hard" onClick={() => handleNewGame(hardMaxEmptyCells)}>
              <div
                className="animation-container-difficulty"
                id="hardDifficultyAnimation"
              ></div>
              <p>Hard</p>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <Button
            onClick={closeModal}
            buttonStyle="btn--primary--solid"
            text="Back"
          />
        </div>
      </div>
    </div>
  );
};

export default DifficultySelectionModal;
