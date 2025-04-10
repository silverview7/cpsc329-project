let instance;

class Player {
  #name;
  #score;
  #difficulty;

  constructor() {
    if (instance) {
      throw new Error("An player has already been initialized");
    }
    instance = this;

    this.#score = 0;
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

  setDifficulty(difficulty) {
    this.#difficulty = difficulty;
  }

  saveScore() {
    let scores = localStorage.getItem("scores") || [];
    let newScore;

    newScore = {
      name: this.#name,
      score: this.#score,
      difficulty: this.#difficulty,
    };

    scores.push(newScore);

    localStorage.setItem("scores", JSON.stringify(scores));
  }
}

const player = new Player();
export default player;
