import React from "react";
import "./Scene.css";

function Scene({ life = 5 }) {
  const monsterLeftPosition = {
    1: 10,
    2: 30,
    3: 50,
    4: 65,
    5: 85,
  };
  return (
    <div className="scene">
      <img
        src={"/assets/happy-monster.gif"}
        id="monster"
        className="characters"
        width={110}
        style={{ left: `${monsterLeftPosition[life]}%` }}
        alt=""
      />
      <img
        src={"/assets/kid.gif"}
        id="player"
        className="characters"
        width={110}
        style={{ left: "94%" }}
        alt=""
      />
    </div>
  );
}

export default Scene;
