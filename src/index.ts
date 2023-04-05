


// game variables
const ALPHABET: string[] = "abcdefghijklmnopqrstuvwxyz".split("");
let incorrectGuesses: number = 0;
let RANDOM_WORD: string | null = null;
let lettersEnabled: boolean = false;
let currentScore: number = 0;

// DOM elements
const RESET_BUTTON = document.querySelector("#reset") as HTMLButtonElement;
const PLAY_BUTTON = document.querySelector("#continue") as HTMLButtonElement;
const FETCH_WORD_BUTTON = document.querySelector("#word-button") as HTMLButtonElement;
const SHOW_WORD = document.querySelector("#word-output") as HTMLElement;
const SHOW_GUESSES = document.querySelector("#attemptsOutput") as HTMLElement;
const GUESS_CHECKER = document.querySelector("#win-lose-check") as HTMLElement;
const ALPHABET_CONTAINER = document.querySelector("#alphabet") as HTMLDivElement;
const FIREWORKS_CONTAINER = document.querySelector("#fireworks-container") as HTMLElement;
const WORD_SCORE_TABLE = document.querySelector("#word-score-table") as HTMLTableElement;

async function fetchRandomWord(): Promise<string> {
  try {
    const RESPONSE = await fetch("https://random-word-api.herokuapp.com/word");
    const WORD_ARRAY: string[] = await RESPONSE.json();
    return WORD_ARRAY[0];
  } catch (error) {
    console.error("Error fetching random word:", error);
    return "";
  }
}

//removed unnecessary variable "ul", was not needed; only acted as redundant container.
function createAlphabetButtons(): void {
  for (const letter of ALPHABET) {
    //makes each letter in the alphabet into li element
    const ALPHABET_LETTER: HTMLLIElement = document.createElement('li');
    ALPHABET_LETTER.textContent = letter;
    ALPHABET_CONTAINER.appendChild(ALPHABET_LETTER);
  }
  storeLetterClick(ALPHABET_CONTAINER);
}
createAlphabetButtons();

function handleFetchButtonClick(): void {
  if (FETCH_WORD_BUTTON) {
    FETCH_WORD_BUTTON.addEventListener("click", function () {
      if (FETCH_WORD_BUTTON) {
        FETCH_WORD_BUTTON.style.display = "none";
      }
      if (ALPHABET_CONTAINER) {
        ALPHABET_CONTAINER.style.display = "flex";
      }
      selectRandomWord();
    });
  }
}
handleFetchButtonClick();

//event listener to iterate thru random word to find clicked letter; stores position in LETTER_POSITION
function storeLetterClick(ALPHABET_LETTER: HTMLElement): void {
 ALPHABET_LETTER.addEventListener("click", (event: MouseEvent) => {
    if (RANDOM_WORD && lettersEnabled) {
      const target = event.target as HTMLElement;
      if (target.tagName.toLowerCase() === "li" && target instanceof HTMLElement) {
        const CLICKED_LETTERS: string = target.textContent || "";
        const LETTER_POSITION: number[] = [];
        for (let i = 0; i < RANDOM_WORD.length; i++) {
          if (RANDOM_WORD[i] === CLICKED_LETTERS) {
            LETTER_POSITION.push(i);
          }
        }
        handleLetterClick(target, LETTER_POSITION);
      }
    }
  });
  
}

//processes click on stored letter.
function handleLetterClick(clickedElement: HTMLElement, LETTER_POSITION: number[]): void {
    if (LETTER_POSITION.length > 0) {
      const HIDDEN_ARRAY: string[] = SHOW_WORD ? (SHOW_WORD.textContent || "").split(" ") : [];
        LETTER_POSITION.forEach((position) => {
        HIDDEN_ARRAY[position] = clickedElement.textContent || "";
        });
    if (SHOW_WORD) {
        SHOW_WORD.textContent = HIDDEN_ARRAY.join(" ");
    }
        clickedElement.style.display = "none";
    if (checkForWinner()) {
      if (SHOW_GUESSES) {
          SHOW_GUESSES.textContent = "";
      }
      if (GUESS_CHECKER && RANDOM_WORD) {
          GUESS_CHECKER.textContent = `${RANDOM_WORD}!`;
      }
      if (PLAY_BUTTON) {
        PLAY_BUTTON.removeAttribute("hidden");
      }
      if (RESET_BUTTON) {
          RESET_BUTTON.removeAttribute("hidden");
      if (SHOW_WORD) {
         SHOW_WORD.textContent = "";
      }
      if (ALPHABET_CONTAINER) {
          ALPHABET_CONTAINER.style.display = "none";
      }
    }
    displayFireworks();
    //update WORD_SCORE table
    if (RANDOM_WORD) {
      score.updateScore(RANDOM_WORD);
    }
  }
    } else {
      incorrectGuesses++;
      const MAX_INCORRECT_GUESSES: number = 10 - incorrectGuesses;
      let message: string = `❌ ${MAX_INCORRECT_GUESSES} guesses left.`;
      if (SHOW_GUESSES) {
      SHOW_GUESSES.textContent = message;
    }
    clickedElement.style.display = "none";
    if (MAX_INCORRECT_GUESSES === 0) {
      incorrectGuesses--;
      if (GUESS_CHECKER && RANDOM_WORD) {
        GUESS_CHECKER.textContent = `Game over! Word was "${RANDOM_WORD}"`;
      }
      if (RESET_BUTTON) {
        RESET_BUTTON.removeAttribute("hidden");
      }
      if (SHOW_WORD) {
        SHOW_WORD.textContent = "";
      }
      if (SHOW_GUESSES) {
        SHOW_GUESSES.textContent = "";
      }
      if (ALPHABET_CONTAINER) {
        ALPHABET_CONTAINER.style.display = "none";
      }
    }
  }
}

class Score {

  clearTotalScore(): void {
    for (let i = 1, row; (row = WORD_SCORE_TABLE.rows[i]); i++) {
      row.cells[2].textContent = "";
    }
  }
  
  updateScore(word: string): void {
    const WORD_SCORE: number = word.length * 10;
    const TOTAL_SCORE: number = currentScore += WORD_SCORE;
  
    const ROW: HTMLTableRowElement = WORD_SCORE_TABLE.insertRow();
    const WORD_CELL: HTMLTableCellElement = ROW.insertCell(0);
    const SCORE_CELL: HTMLTableCellElement = ROW.insertCell(1);
    const TOTAL_SCORE_CELL: HTMLTableCellElement = ROW.insertCell(2);

    WORD_CELL.textContent = word;
    SCORE_CELL.textContent = WORD_SCORE.toString(); 
    
    this.clearTotalScore();

   if (PLAY_BUTTON) {
    TOTAL_SCORE_CELL.textContent = TOTAL_SCORE.toString();
   }
  }

}
const score = new Score;

function checkForWinner(): boolean {
  if (SHOW_WORD) {
    const WINNER_CHECKER: string = (SHOW_WORD.textContent || "").replace(/\s+/g, '');
    return WINNER_CHECKER === RANDOM_WORD;
  }
  return false;
}

function displayFireworks(): void {
  if (GUESS_CHECKER) {
    GUESS_CHECKER.classList.add("z-20");
  }
  if (RESET_BUTTON) {
    RESET_BUTTON.classList.add("z-20");
  }  
  if (WORD_SCORE_TABLE) {
    WORD_SCORE_TABLE.classList.remove("hidden");
  }
  if (FIREWORKS_CONTAINER) {
    const FIREWORKS = document.createElement("img");
    FIREWORKS.src = "./assets/images/fireworks.gif";
    FIREWORKS.classList.add("fireworks");
  FIREWORKS_CONTAINER.innerHTML = "";
  FIREWORKS_CONTAINER.appendChild(FIREWORKS);
  }
}

async function selectRandomWord(): Promise<void> {
  lettersEnabled = true;
  RANDOM_WORD = await fetchRandomWord();

  // Hides word, displays random word hidden
  const HIDDEN_ARRAY: string[] = new Array(RANDOM_WORD.length).fill("❓ ");
  const HIDDEN_WORD: string = HIDDEN_ARRAY.join("");
  if (SHOW_WORD) {
    SHOW_WORD.textContent = HIDDEN_WORD;
    SHOW_WORD.classList.add("opacity-0"); // Set initial opacity to 0

    setTimeout(() => {
      SHOW_WORD.style.opacity = "1";
    }, 50);
  }
}

function resetGame(): void {
  lettersEnabled = false;
  RANDOM_WORD = null;
  incorrectGuesses = 0;
  
  if (SHOW_GUESSES) {
    SHOW_GUESSES.textContent = "";
  }
  if (GUESS_CHECKER) {
    GUESS_CHECKER.textContent = "";
  }
  if (RESET_BUTTON) {
    RESET_BUTTON.setAttribute("hidden", "true");
  }
  if (PLAY_BUTTON) {
    PLAY_BUTTON.setAttribute("hidden", "true");
  }
  if (WORD_SCORE_TABLE) {
    WORD_SCORE_TABLE.classList.add("hidden");
  }
  if (FETCH_WORD_BUTTON) {
    FETCH_WORD_BUTTON.style.display = "";
  }
  if (FIREWORKS_CONTAINER) FIREWORKS_CONTAINER.innerHTML = "";
  const ALPHABET_LETTERS: NodeListOf<HTMLLIElement> = document.querySelectorAll("#alphabet li");
  ALPHABET_LETTERS.forEach((letter) => {
    letter.style.display = "";
  });
  if (ALPHABET_CONTAINER) {
    ALPHABET_CONTAINER.style.display = "none";
  }
}

// Listener for play button to reset
if (RESET_BUTTON || PLAY_BUTTON) {
  RESET_BUTTON.addEventListener("click", function () {
    resetGame();
  });
  PLAY_BUTTON.addEventListener("click", function (){
    resetGame();
  })
}
