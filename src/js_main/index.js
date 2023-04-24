let words = [
  "python",
  "php",
  "java",
  "scala",
  "javascript",
  "abacate",
  "banana",
];

let answer = "";
let chances = 0;
let mistakes = 0;
let corrects = 0;
let rightLetter = [];
let displayWord = "";
let step = 0;
let currentStep = 0;

function checkGameOver() {
  console.log(corrects, answer.length);
  if (answer.length == corrects) {
    setButtons(true);
    console.log("VENCEU");
  } else if (mistakes == chances) {
    setButtons(true);
    console.log("PERDEU");
  }
}

function clickLetter(btn) {
  btn.disabled = true;
  if (answer.indexOf(btn.value) > -1) {
    rightLetter.push(btn.value);
    printWord();
  } else {
    mistakes++;
    currentStep += step;
    document.getElementById("mistakes").innerText = mistakes;
    updateFigure(currentStep);
  }
  checkGameOver();
}

function getKeyboard() {
  let start = "a";
  let end = "z";

  for (let i = start.charCodeAt(); i <= end.charCodeAt(); i++) {
    let button = document.createElement("input");
    button.type = "button";
    button.value = String.fromCharCode(i);
    button.className = "guess-letter";
    button.addEventListener("click", function () {
      clickLetter(this);
    });
    document.getElementById("keyboard").appendChild(button);
  }
}

function getWord() {
  answer = words[Math.floor(Math.random() * words.length)];
  chances = Math.floor(answer.length * 1.5);
  step = 150/chances;
  document.getElementById("chances").innerText = chances;
  document.getElementById("mistakes").innerText = mistakes;
}

function init() {
  answer = "";
  chances = 0;
  mistakes = 0;
  corrects = 0;
  rightLetter = [];
  currentStep = 0;

  getWord();
  printWord("");
  updateFigure(0);
}

function reset() {
  init();
  setButtons(false);
}

function start() {
  getKeyboard();
  init();
}

function setButtons(status) {
  let letters = document.querySelectorAll(".guess-letter");
  letters.forEach((btn) => {
    btn.disabled = status;
  });
}

function printWord() {
  displayWord = "";
  corrects = 0;
  for (let i = 0; i < answer.length; i++) {
    if (rightLetter.indexOf(answer[i]) > -1) {
      displayWord += answer[i] + " ";
      corrects++;
    } else {
      displayWord += "_ ";
    }
  }
  document.getElementById("word").innerText = displayWord;
}

function updateFigure(newHeight)
{
  console.log(newHeight);
  let figureContainer = document.getElementById('figure-container');
  figureContainer.style.height = `${newHeight}px`;
}

start();
