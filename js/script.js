const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];
let remainingGuessesLeft = 8;

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    const goodGuess = validatePlayerInput(guess);

    if (goodGuess) {
    makeGuess(guess);
    }
    letterInput.value = "";
});

const validatePlayerInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter";
    } else if (input.length > 1) {
        message.innerText = "Please type one letter only";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A-Z";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You've used that letter.  Please try again";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        acceptedGuesses(guess);
        guessedLettersDisplay();
        updateWordInProgress(guessedLetters);
    }
};

const guessedLettersDisplay = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    //console.log(revealWord);
    wordInProgress.innerText = revealWord.join("")
    successfulWordGuess();
};

const acceptedGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
      message.innerText = `Sorry, the word doesn't contain a ${guess}`;
      remainingGuesses -= 1;
    } else {
      message.innerText = `Excellent! The word has the letter ${guess}`;
    }
  
    if (remainingGuesses === 0) {
      message.innerHTML = `Game over!  The guessed word is <span class="highlight">${word}</span>`;
    } else if (remainingGuesses === 1) {
      remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
      remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
  };

  const successfulWordGuess= function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
      message.classList.add("win");
      message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
  };


