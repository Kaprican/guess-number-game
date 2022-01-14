class Game {
    constructor() {
        this.answers = {
            "0": "Да, вы угадали!",
            "1": "Больше",
            "-1" : "Меньше"
        }
        this.difficultyLevels = {
            "easy": 15,
            "medium": 10,
            "hard" : 8,
            "impossible": 8
        }
        // this.level = "easy";
        this.startNewGame();
    }

    startNewGame() {
        this.guessingNumber = getRandomIntInclusive(1, 100);
        this.chooseGameLevel();
    }

    chooseGameLevel() {
        this.attemptCount = this.difficultyLevels[this.level];
        renderNewGameAttempts(this.attemptCount, this.guessingNumber);
    }

    decreaseAttemptCount() {
        this.attemptCount--;
    }

    compareNumberWithGuessingNumber(trialNumber) {
        return {
            isGuessed: compareNumbers(trialNumber, this.guessingNumber) === 0,
            str: this.answers[compareNumbers(trialNumber, this.guessingNumber)]
        }
    }
}

const guessNumberGame = new Game();

document.querySelector(".begin-game").addEventListener("click", (e) => {
    let hideElements = document.querySelector(".begin-game__container");
    let displayElements = document.querySelector(".choose-level__container");

    hideElements.style.display = "none";
    displayElements.style.display = "flex";
})


document.querySelector(".controls__check-number").addEventListener("click", (e) => {
    checkNumber(guessNumberGame);
})

document.querySelector(".controls__start-new-game").addEventListener("click", (e) => {
    guessNumberGame.startNewGame();
    document.querySelector(".game-field__history__list").innerHTML = "";
    document.querySelector(".game-field__result").innerHTML = "";
})

document.getElementById("easy-lvl").addEventListener("click", () => {
    guessNumberGame.level = "easy";
    guessNumberGame.chooseGameLevel();
    hideAndDisplayElements(
        ".choose-level__container",
        ".game-field"
    );
})
document.getElementById("medium-lvl").addEventListener("click", () => {
    guessNumberGame.level = "medium";
    guessNumberGame.chooseGameLevel();
    hideAndDisplayElements(
        ".choose-level__container",
        ".game-field"
    );
})

document.getElementById("hard-lvl").addEventListener("click", () => {
    guessNumberGame.level = "hard";
    guessNumberGame.chooseGameLevel();
    hideAndDisplayElements(
        ".choose-level__container",
        ".game-field"
    );
})

// document.getElementById("impossible-lvl").addEventListener("click", () => {
//     guessNumberGame.level = "impossible";
//     guessNumberGame.chooseGameLevel();
//     hideAndDisplayElements(
//         ".choose-level__container",
//         ".game-field"
//     );
// })


function renderNewGameAttempts(attemptCount, guessingNumber){
    document.querySelector(".game-field__attempt-count").innerHTML = attemptCount;
    console.log(guessingNumber);
}

function hideAndDisplayElements(queryToHide, queryToDisplay){
    let hideElements = Array.from(document.querySelectorAll(queryToHide));
    let displayElements = Array.from(document.querySelectorAll(queryToDisplay));

    hideElements.forEach(el => el.style.display = "none");
    displayElements.forEach(el => el.style.display = "block");
}

function checkNumber(game){
    let inputNumber = document.querySelector(".controls__number-input");
    if (!inputNumber?.value) {
        return;
    }
    let trialNumber = parseInt(inputNumber.value, 10);
    result = game.compareNumberWithGuessingNumber(trialNumber);

    addResultToThePage(result.str);
    addActionToHistory(trialNumber, result.str);
    inputNumber.value = "";
    if (result.isGuessed) {
        renderResultPopUp("Поздравляем!", "Вы выиграли", "Ура!");
        return;
    }
    decreaseAttemptCountOnPage(game);
}

function renderResultPopUp(header, description, closeButtonText) {
   const popup = `
   <div class="end-game">
       <h1>${header}</h1>
       <p>${description}</p>
       <button class="close-button">${closeButtonText}</button>
   </div>
   `;

   let resultContainer = document.querySelector(".game-result");
    resultContainer.style.display = "grid";
    resultContainer.innerHTML = popup;

    document.querySelector(".close-button").addEventListener("click", () => {
        resultContainer.style.display = "none";
    })
}


function decreaseAttemptCountOnPage(game) {
    game.decreaseAttemptCount();
    if (game.attemptCount < 1) {
        showLostGameDisplay();
    }
    document.querySelector(".game-field__attempt-count").innerHTML = game.attemptCount;
}

function showLostGameDisplay() {
    renderResultPopUp(
        "Попытки закончились",
        "Вы не успели угадать число за нужное количество попыток",
        "Понятно"
    );
}

function addResultToThePage(result) {
    let resultDiv = document.querySelector(".game-field__result");
    resultDiv.innerHTML = result;
}

function addActionToHistory(trialNumber, result){
    let historyList = document.querySelector(".game-field__history__list");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(`${trialNumber} => ${result}`));
    historyList.appendChild(li);
}

function guessNumberWithPrompt(){

    const guessingNumber = getRandomIntInclusive(1, 100);
    let result;
    console.log(guessingNumber);
    const answers = {
        "0": "Да, вы угадали!",
        "1": "Больше",
        "-1" : "Меньше"
    }

    do {
        let trialNumber = parseInt(prompt("Пробуем угадать?"), 10);
        result = answers[compareNumbers(trialNumber, guessingNumber)];
        alert(result);
    } while (result !== "Да, вы угадали!");

    alert("Поздравляем! Вы выиграли");
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function compareNumbers(trialNumber, guessingNumber) {
    if (trialNumber === guessingNumber) {
        return 0
    } else if (trialNumber < guessingNumber) {
        return 1
    } else {
        return -1
    }
}
