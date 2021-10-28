import React from "react";
import "./InformationModal.css";

import Button from "./../Button/Button.js";

const InformationModal = ({ closeModal }) => {
  return (
    <div className="InformationModal">
      <div className="modal-container">
        <div className="modal-close-btn-container">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="modal-title">
          <h1>Sudoku Game</h1>
        </div>
        <div className="modal-body">
          <p>
            Welcome to the sudoku game, this game is developed as a Case Study
            of DM, it includes the sudoku generation and sudoku solver!
          </p>
          <div className="links">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/suhaan-bhandary"
            >
              LinkedIn
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/channel/UCHfmmdKuRDmZ5EUzGdqI7-Q"
            >
              YouTube
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Suhaan-Bhandary"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="modal-footer">
          <Button
            onClick={() =>
              window.open("https://github.com/Suhaan-Bhandary/Sudoku-Game")
            }
            buttonStyle="btn--primary--solid"
            text="GitHub"
          />
          <Button
            onClick={closeModal}
            buttonStyle="btn--success--solid"
            text="Continue"
          />
        </div>
      </div>
    </div>
  );
};

export default InformationModal;
