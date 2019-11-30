/*
* **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:
  * Randomly selects a word and uses the `Word` constructor to store it
  * Prompts the user for each guess and keeps track of the user's remaining guesses
*/
var inquirer = require('inquirer');
var Word = require('./word.js');
var randomWords = require('./list.js');

// Text colors
var FgBlue = "\x1b[34m";
var FgWhite = "\x1b[0m";
var FgCyan = "\x1b[36m";
var FgGreen = "\x1b[32m";
var FgMagenta = "\x1b[35m";

var question = [{
    type: 'input',
    name: 'guessedLetter',
    message: 'Guess a letter!',
    validate: function (input) {
        if ((input.length === 1) && !(Number(input))) {
            return true;
        } else {
            console.log('\n')
            return false;
        }
    }
}]
// Need an array to store the guessed letters from the user
var guessedLetters = [];
debugger
var word = randomWord();
var guesses = 7;
function guessLetter() {
    inquirer.prompt(question).then(function (response) {
        if (guessedLetters.includes(response.guessedLetter)) {
            console.log('---------------------------------------------------')
            console.log('You already guessed ' + FgMagenta + response.guessedLetter + FgWhite + '!');
            console.log('---------------------------------------------------')
            console.log(word.wordDisplay().join(' '));
            console.log('You have: ' + FgCyan + guesses + FgWhite + ' guesses remaining. \n');
            guessLetter();
        } else {
            guessedLetters.push(response.guessedLetter);
            var guess = response.guessedLetter;
            var found = word.guess(guess);
            var output = word.wordDisplay();
            console.log(output.join(' '));
            if (!found) {
                guesses--
            }
            if ((guesses === 0) && (output.includes('_'))) {
                console.log('-----------------------------------');
                console.log(FgCyan + 'YOU LOSE!' + FgWhite);
                console.log('The answer was: ' + word.stringWord);
                console.log('-----------------------------------');
                playAgain()
            } else if (output.includes('_')) {
                console.log('You have: ' + guesses + ' guesses remaining. \n');
                guessLetter();
            } else {
                console.log('-------');
                console.log(FgCyan + 'YOU WIN' + FgWhite);
                console.log('-------');
                playAgain();
            }
        }
    })
}

console.log(FgGreen + "\nWelcome to CLI-Hangman!" + FgWhite);
console.log(word.wordDisplay().join(' '));
console.log('You have: ' + FgCyan + guesses + FgWhite + ' guesses remaining. \n');
guessLetter();


function randomWord() {
    var indexOfWord = Math.floor(Math.random() * randomWords.length);
    return new Word(randomWords[indexOfWord])
}
function playAgain() {
    inquirer.prompt([{
        type: 'confirm',
        name: 'gameStatus',
        message: 'Play again?'
    }]).then(function (response) {
        if (response.gameStatus === true) {
            word = randomWord();
            guesses = 7;
            guessedLetters = [];
            console.log(word.wordDisplay().join(' '));
            console.log('You have: ' + guesses + ' guesses remaining. \n');
            guessLetter();
        } else {
            console.log('-------------------');
            console.log(FgGreen + 'Thanks for playing!' + FgWhite);
            console.log('-------------------');
        }
    })
}