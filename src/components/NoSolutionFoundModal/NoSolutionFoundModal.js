import React from "react";
import "./NoSolutionFoundModal.css";

import Button from "./../Button/Button.js";

const NoSolutionFoundModal = ({ closeModal }) => {
  return (
    <div className="NoSolutionFoundModal">
      <div className="modal-container">
        <div className="modal-close-btn-container">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="modal-title">
          <h1>No Solution Found</h1>
        </div>
        <div className="modal-body">
          <p>
            The Current Grid Doesnot have any solution, please change some cell values.
          </p>
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

export default NoSolutionFoundModal;
