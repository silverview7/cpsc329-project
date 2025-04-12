import React from "react";
import "./Answer.css";

function Answer({ phrase = "", guesses = new Set() }) {
  phrase = phrase.toUpperCase();

  const words = phrase.split(" ");

  return (
    <div className="answer">
      {words.map((word, index) => {
        return (
          <div key={index} className="word">
            {[...word].map((char, index) => {
              const displayCharacter = guesses.has(char);

              return (
                <div key={index} className="slot">
                  {displayCharacter ? char : ""}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Answer;
