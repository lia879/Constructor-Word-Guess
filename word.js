/*
* **Word.js**: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the 
user is attempting to guess. That means the constructor should define:
  * An array of `new` Letter objects representing the letters of the underlying word
  * A function that returns a string representing the word. This should call the function on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together.
  * A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in `Letter.js`)
  * */

var Letter = require('./letter.js')
function Word(word) {
    var splitword = word.split('');
    var wordArray = [];
    splitword.forEach(function (element) {
        var letter = new Letter(element);
        wordArray.push(letter);
    })
    this.stringWord = word;
    this.word = wordArray;
    this.wordDisplay = function () {
        var display = [];
        this.word.forEach(function (element) {
            display.push(element.display());
        })
        return display;
    }
    this.guess = function (letter) {
        var found = false;
        this.word.forEach(function (element) {
            if (element.check(letter)) {
                found = true;
            }
        })
        return found;
    }
}
module.exports = Word;