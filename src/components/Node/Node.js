import React from "react";
import "./Node.css";

const Node = (props) => {
  let { cell, handleClickCallback } = props;

  const getCellClassName = (cell) => {
    let { row, column } = cell;
    let className = `cell 
    ${row === 2 || row === 5 ? "bottom-border" : ""}
    ${column === 2 || column === 5 ? "right-border" : ""}
    ${cell.isValid ? "" : "cell-invalid"}
    ${cell.isModifiable ? "cell-modifiable" : ""}
    ${cell.isHinted ? "cell-hinted" : ""}
    `;
    return className;
  };

  return (
    <td
      className={getCellClassName(cell)}
      onClick={() =>
        handleClickCallback(cell.row, cell.column, cell.isModifiable)
      }
    >
      {cell.value !== 0 ? cell.value : ""}
    </td>
  );
};

export default Node;
