import React from "react";
import Key from "./Key";
import "./Keyboard.css";

function Keyboard({ entries, handleClick }) {
  return (
    <div className="keyboard">
      <div>
        <Key
          letter={"Q"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"W"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"E"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"R"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"T"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"Y"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"U"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"I"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"O"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"P"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
      </div>
      <div>
        <Key
          letter={"A"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"S"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"D"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"F"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"G"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"H"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"J"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"K"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"L"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
      </div>
      <div>
        <Key
          letter={"Z"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"X"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"C"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"V"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"B"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"N"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
        <Key
          letter={"M"}
          handleClick={(value) => handleClick(value)}
          entries={entries}
        />
      </div>
    </div>
  );
}

export default Keyboard;
