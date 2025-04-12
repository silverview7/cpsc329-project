import React, { useEffect, useState } from "react";
import { RiHeart3Fill } from "@remixicon/react";
import "./Scene.css";

function Scene({ level, lives, time, hasExited }) {
  const [sceneWidth, setSceneWidth] = useState(null);
  const PLAYER_WIDTH = 110;

  useEffect(() => {
    const getSceneComponentSize = () => {
      const scene = document.querySelector(".scene");
      setSceneWidth(scene.offsetWidth);
    };

    getSceneComponentSize();

    window.addEventListener("resize", getSceneComponentSize);
    return () => window.removeEventListener("resize", getSceneComponentSize);
  }, []);

  const calculateCharacterPositions = () => {
    const spaceFromEdge = 20;
    const playerLeft = sceneWidth - spaceFromEdge - PLAYER_WIDTH;

    const monsterPositions = {
      5: spaceFromEdge,
      4: sceneWidth * 0.2,
      3: sceneWidth * 0.5,
      2: sceneWidth * 0.7,
      1: sceneWidth * 0.83,
    };

    const monsterLeft = monsterPositions[lives];

    return { playerLeft, monsterLeft };
  };

  const hearts = [];
  for (let i = 0; i < lives; i++) {
    hearts.push(<RiHeart3Fill key={i} color="red" />);
  }

  return (
    <div className="scene">
      <img
        src={"/assets/happy-monster.gif"}
        id="monster"
        className={`characters`}
        width={PLAYER_WIDTH}
        style={{ left: `${calculateCharacterPositions().monsterLeft}px` }}
        alt=""
      />
      <img
        src={"/assets/kid.gif"}
        id="player"
        className={`characters ${hasExited ? "player-success" : ""}`}
        width={PLAYER_WIDTH}
        style={{ left: calculateCharacterPositions().playerLeft }}
        alt=""
      />
      <div className="game-header">
        <div className="game-info">
          <span>Level: {level}</span>
        </div>
        <div className="game-info">
          <span>
            Time:{" "}
            <span className={`score ${hasExited ? "change" : ""}`}>{time}</span>
          </span>
        </div>
        <div className="game-info">{hearts}</div>
      </div>
    </div>
  );
}

export default Scene;
