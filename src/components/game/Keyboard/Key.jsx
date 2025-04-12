import React from "react";
import "./Keyboard.css";

function Key({ letter, handleClick, entries }) {
  const disabled = entries.has(letter);

  return (
    <button
      className={`keyboard-key ${disabled ? "disabled" : ""}`}
      disabled={disabled}
      onClick={() => handleClick(letter)}
    >
      <b>{letter.toUpperCase()}</b>
    </button>
  );
}

export default Key;
