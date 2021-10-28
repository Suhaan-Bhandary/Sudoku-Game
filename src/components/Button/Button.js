import React from "react";
import "./Button.css";

const STYLES = [
  "btn--primary--solid",
  "btn--warning--solid",
  "btn--danger--solid",
  "btn--success--solid",
  "btn--primary--outline",
  "btn--warning--outline",
  "btn--danger--outline",
  "btn--success--outline",
];

const Button = ({ text, type, onClick, buttonStyle }) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  return (
    <button className={`btn ${checkButtonStyle}`} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default Button;
