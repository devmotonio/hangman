export default class Game {
  constructor() {
    this.answer = "";
    this.displayWord = "";
    this.chances = 0;
    this.mistakes = 0;
    this.corrects = 0;
    this.words = [];
    this.rightLetters = [];
    this.step = 0;
    this.currentStep = 0;

    document.getElementById("resetButton").addEventListener("click", (event) => {
      this.reset();
    });
  }

  checkGameOver() {
    console.log(this.mistakes, this.chances);
    if (this.answer.length == this.corrects) {
      this.setButtons(true);
      document.getElementById("result").style = "color:#00FF88;";
      document.getElementById("result").innerHTML = "Você Venceu!!!";
      setTimeout(() => {
        let newWord = prompt("Adicione uma nova palavra:");
        if (newWord != null && newWord != "") {
          this.words.push(newWord.toUpperCase());
          localStorage.setItem("words", this.words.join(","));
        }
      }, 500);
    } else if (this.mistakes == this.chances) {
      this.setButtons(true);
      document.getElementById("result").style = "color:#FF0000;";
      document.getElementById("result").innerHTML = "Você Perdeu!!!";
    }
  }

  clickLetter(btn) {
    btn.disabled = true;
    if (this.answer.indexOf(btn.value) > -1) {
      this.rightLetter.push(btn.value);
      this.printWord();
    } else {
      this.mistakes++;
      this.currentStep += this.step;
      document.getElementById("mistakes").innerText = this.mistakes;
      this.updateFigure(this.currentStep);
    }
    this.checkGameOver();
  }

  getKeyboard() {
    let start = "A";
    let end = "Z";

    for (let i = start.charCodeAt(); i <= end.charCodeAt(); i++) {
      let button = document.createElement("input");
      button.type = "button";
      button.id = "btn_" + i;
      button.value = String.fromCharCode(i);
      button.className = "guess-letter";
      button.addEventListener("click", (event) => {
        this.clickLetter(event.target);
      });
      document.getElementById("keyboard").appendChild(button);
    }
  }

  getWord() {
    this.answer = this.words[Math.floor(Math.random() * this.words.length)];
    this.chances = Math.floor(this.answer.length * 1.5);
    this.step = 150 / this.chances;
    document.getElementById("chances").innerText = this.chances;
    document.getElementById("mistakes").innerText = this.mistakes;
  }

  init() {
    this.answer = "";
    this.chances = 0;
    this.mistakes = 0;
    this.corrects = 0;
    this.rightLetter = [];
    this.currentStep = 0;

    document.getElementById("result").innerHTML = "";
    let storageWords = localStorage.getItem("words");

    if (storageWords == null || storageWords == "") {
      this.words = ["PYTHON", "PHP", "JAVA", "SCALA", "JAVASCRIPT", "ABACATE", "BANANA"];
    } else {
      this.words = storageWords.split(",");
    }

    this.getWord();
    this.printWord("");
    this.updateFigure(0);
  }

  reset() {
    this.init();
    this.setButtons(false);
  }

  start() {
    this.getKeyboard();
    this.init();
  }

  setButtons(status) {
    let letters = document.querySelectorAll(".guess-letter");
    letters.forEach((btn) => {
      btn.disabled = status;
    });
  }

  printWord() {
    this.displayWord = "";
    this.corrects = 0;
    for (let i = 0; i < this.answer.length; i++) {
      if (this.rightLetter.indexOf(this.answer[i]) > -1) {
        this.displayWord += this.answer[i] + " ";
        this.corrects++;
      } else {
        this.displayWord += "_ ";
      }
    }
    document.getElementById("word").innerText = this.displayWord;
  }

  updateFigure(newHeight) {
    let figureContainer = document.getElementById("figure-container");
    figureContainer.style.height = `${newHeight}px`;
  }
}
