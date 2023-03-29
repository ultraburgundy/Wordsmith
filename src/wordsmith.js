//game variables
const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
let incorrectGuesses = 0;
let RANDOM_WORD = null;
let lettersEnabled = false;  
//DOM elements
const PLAY_BUTTON = document.querySelector("#reset");
const CATEGORY_BUTTON = document.querySelector(".category-button");
const SHOW_CATEGORY = document.querySelector("#categoryOutput");
const SHOW_GUESSES = document.querySelector("#attemptsOutput");
const GUESS_CHECKER = document.querySelector(".win-prompt") 
const ALPHABET_BUTTONS = document.querySelector("#alpha-buttons");


async function fetchRandomWord() {
  try {
    const response = await fetch("https://random-word-api.herokuapp.com/word");
    const wordArray = await response.json();
    return wordArray[0];
  } catch (error) {
    console.error("Error fetching random word:", error);
  }
}

createAlphabetButtons();

function createAlphabetButtons() {
  const LETTER_LIST = document.createElement('ul');
  LETTER_LIST.id = 'alphabet';
  for (const letter of ALPHABET) {
    const ALPHABET_LETTER = document.createElement('li');
    ALPHABET_LETTER.textContent = letter;
    LETTER_LIST.appendChild(ALPHABET_LETTER);
  }
  ALPHABET_BUTTONS.appendChild(LETTER_LIST);
  handleLetterListClick(LETTER_LIST);
}

function handleCategoryButtonClick() {
  CATEGORY_BUTTON.addEventListener("click", function() {
  CATEGORY_BUTTON.style.display = "none";
  document.querySelector("#alphabet").style.display ="flex";
  selectRandomWord();
  });
}
handleCategoryButtonClick();

function handleLetterListClick(LETTER_LIST) {
  LETTER_LIST.addEventListener("click", (event) => {
    if (RANDOM_WORD && lettersEnabled) {
      if (event.target.tagName.toLowerCase() === "li") {
        const CLICKED_LETTERS = event.target.textContent;
        const LETTER_POSITION = [];
        for (let i = 0; i < RANDOM_WORD.length; i++) {
          if (RANDOM_WORD[i] === CLICKED_LETTERS) {
            LETTER_POSITION.push(i);
          }
        }
        handleLetterClick(event, LETTER_POSITION);
      }
    }
  });
}

function handleLetterClick(event, LETTER_POSITION) {
  if (LETTER_POSITION.length > 0) {
    const HIDDEN_ARRAY = SHOW_CATEGORY.textContent.split(" ");
    LETTER_POSITION.forEach((position) => {
      HIDDEN_ARRAY[position] = event.target.textContent;
    });

    SHOW_CATEGORY.textContent = HIDDEN_ARRAY.join(" ");
    event.target.style.display = "none";
    if (checkForWinner()) {
      SHOW_GUESSES.textContent = "";
      GUESS_CHECKER.textContent = `WINNER! You guessed the word "${RANDOM_WORD}"!`;
      PLAY_BUTTON.removeAttribute("hidden");
      SHOW_CATEGORY.textContent = "";
      document.querySelector("#alphabet").style.display ="none";

    }
  }    
  
  else {
    incorrectGuesses++;
    const MAX_INCORRECT_GUESSES = 10 - incorrectGuesses;
    let message = `Incorrect guess! You have ${MAX_INCORRECT_GUESSES} guesses left.`;
    SHOW_GUESSES.textContent = message;
    event.target.style.display = "none"; 
    if (MAX_INCORRECT_GUESSES === 0) {
      incorrectGuesses--;
      GUESS_CHECKER.textContent = `Game over! Word was "${RANDOM_WORD}"`;
      PLAY_BUTTON.removeAttribute("hidden");
      SHOW_CATEGORY.textContent = "";
      SHOW_GUESSES.textContent = "";
      document.querySelector("#alphabet").style.display ="none";
    }
  }
}

function checkForWinner() {
  const WINNER_CHECKER = SHOW_CATEGORY.textContent.replace(/\s+/g, '');
  return WINNER_CHECKER === RANDOM_WORD;
}

async function selectRandomWord() {
  lettersEnabled = true;
  RANDOM_WORD = await fetchRandomWord();

  // Hides word, displays random word hidden
  const HIDDEN_ARRAY = new Array(RANDOM_WORD.length).fill("❓ ");
  const HIDDEN_WORD = HIDDEN_ARRAY.join("");
  SHOW_CATEGORY.textContent = HIDDEN_WORD;
  SHOW_CATEGORY.classList.add("opacity-0"); // Set initial opacity to 0

  setTimeout(() => {
    SHOW_CATEGORY.style.opacity = "1";
  }, 50);

}

function resetGame() {
  lettersEnabled = false;
  SHOW_CATEGORY.textContent = "";
  SHOW_GUESSES.textContent = "";
  GUESS_CHECKER.textContent = "";
  RANDOM_INDEX = null; 
  incorrectGuesses = 0;
  PLAY_BUTTON.setAttribute("hidden", true);
  CATEGORY_BUTTON.style.display = "";
  const ALPHABET_LETTERS = document.querySelectorAll("#alphabet li");
  ALPHABET_LETTERS.forEach((letter) => {
  letter.style.display = "";
});
  document.querySelector("#alphabet").style.display ="none";
}
  
//listener for play button to reset
PLAY_BUTTON.addEventListener("click", function () {
  resetGame();
});



