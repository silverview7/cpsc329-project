import player from "./Player";
import { questions } from "../data/questions";
let instance;

class GameManager {
  #isActive;
  #topics;
  #questions;
  #currentTopic;
  #level;
  #stage;
  #entries;

  constructor() {
    if (instance) {
      throw new Error("An GameManager has already been initialized");
    }
    instance = this;

    this.#isActive = true; // is game running when game ends isActive is false
    this.#entries = new Set();
  }

  getInstance() {
    return this;
  }
  isActive() {
    return this.#isActive;
  }

  start() {
    this.#isActive = true;
    this.#level = 1;
    this.#stage = 0;
    this.#setTopics();

    // Set current topic
    this.#currentTopic = this.#getRandomTopic(this.#topics);
    this.#topics.delete(this.#currentTopic);

    // Set current questions
    this.#setQuestions(this.#currentTopic);
  }

  getNextQuestion() {
    if (this.#level === 2 && this.#stage === 2) {
      return this.end();
    }

    if (this.#stage === 2) {
      this.#level += 1;
      this.#stage = 1;

      // Get new topic
      this.#currentTopic = this.#getRandomTopic(this.#topics);
      this.#topics.delete(this.#currentTopic);

      // Get new questions on topic
      this.#setQuestions(this.#currentTopic);
    } else {
      this.#stage += 1;
    }

    player.resetLives();

    this.#entries = new Set(); // Clear entries

    const questIndex = this.#getRandomQuestion(this.#questions);
    this.#questions.delete(questIndex);

    return questions[this.#currentTopic].questions[questIndex];
  }

  attempt(letter, answer) {
    let sanitizedAnswer = new Set(answer.toUpperCase());
    sanitizedAnswer.delete(" ");

    this.#entries.add(letter);

    if (!sanitizedAnswer.has(letter)) {
      player.reduceLives();
      player.setScore(player.getScore() - 10);
    } else {
      player.setScore(player.getScore() + 20);
    }
  }

  correctAnswer(answer) {
    let sanitizedAnswer = new Set(answer.toUpperCase());
    sanitizedAnswer.delete(" ");

    return sanitizedAnswer.difference(this.#entries).size === 0;
  }

  end() {
    this.#saveScore();
    this.#isActive = false;
  }

  getEntries() {
    return this.#entries;
  }

  getLevel() {
    return this.#level;
  }

  getCurrentTopic() {
    return questions[this.#currentTopic].topic;
  }

  #setTopics() {
    let topics = new Set();

    for (let i = 0; i < questions.length; i++) {
      topics.add(i);
    }

    this.#topics = topics;
  }

  #setQuestions(topicIndex) {
    let q = new Set();

    for (let i = 0; i < questions[topicIndex].questions.length; i++) {
      q.add(i);
    }

    this.#questions = q;
  }

  #getRandomTopic(topics) {
    let topicsArray = Array.from(topics);
    const topicIndex = Math.floor(Math.random() * topicsArray.length);

    return topicsArray[topicIndex];
  }

  #getRandomQuestion(quests) {
    let questsArray = Array.from(quests);
    const questIndex = Math.floor(Math.random() * questsArray.length);

    return questIndex;
  }

  #saveScore() {
    let scores = JSON.parse(localStorage.getItem("scores") || "[]");
    let newScore;

    newScore = {
      name: player.getName(),
      score: player.getScore(),
      difficulty: player.getDifficulty(),
    };

    scores.push(newScore);

    localStorage.setItem("scores", JSON.stringify(scores));
  }
}

const gameManager = new GameManager();
export default gameManager;
