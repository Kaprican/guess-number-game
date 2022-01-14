export class Game {
    constructor(renderNewGameAttemptsFunc) {
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
        this.startNewGame(renderNewGameAttemptsFunc);
    }

    startNewGame(renderNewGameAttemptsFunc) {
        this.guessingNumber = getRandomIntInclusive(1, 100);
        this.chooseGameLevel(renderNewGameAttemptsFunc);
    }

    chooseGameLevel(renderNewGameAttemptsFunc) {
        this.attemptCount = this.difficultyLevels[this.level];
        renderNewGameAttemptsFunc(this.attemptCount, this.guessingNumber);
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