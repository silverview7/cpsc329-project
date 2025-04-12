import gameManager from "./GameManager";

let instance;

class Player {
  #name;
  #score;
  #difficulty;
  #lives;

  constructor() {
    if (instance) {
      throw new Error("An player has already been initialized");
    }
    instance = this;

    this.#score = 0;
    this.#lives = 5;
  }

  getInstance() {
    return this;
  }

  setName(name) {
    this.#name = name;
  }

  setScore(score) {
    this.#score = score;
  }

  resetLives() {
    this.#lives = 5;
  }

  reduceLives() {
    if (this.#lives - 1 === 0) {
      return gameManager.end();
    }

    this.#lives -= 1;
  }

  setDifficulty(difficulty) {
    this.#difficulty = difficulty;
  }

  getName() {
    return this.#name;
  }

  getScore() {
    return this.#score;
  }

  getLives() {
    return this.#lives;
  }

  getDifficulty() {
    return this.#difficulty;
  }
}

const player = new Player();
export default player;
