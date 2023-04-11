class Game {
  lettersEnabled: boolean;
  incorrectGuesses: number;
  currentScore: number;
  SHOW_WORD: HTMLElement | null;
  RANDOM_WORD: string | null;
  ALPHABET: string[];
  

  constructor() {
    this.ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
    this.RANDOM_WORD = null;
    this.SHOW_WORD = document.querySelector("#word-output");
    this.currentScore = 0;
    this.incorrectGuesses = 0;
    this.lettersEnabled = false;
    this.checkForWinner();
  }

  
  async fetchRandomWord(): Promise<string> {
    try {
      const RESPONSE = await fetch("https://random-word-api.herokuapp.com/word");
      const WORD_ARRAY: string[] = await RESPONSE.json();
      return WORD_ARRAY[0];
    }
    catch (error) {
    console.error("Error fetching random word:", error);
    return "";
    }
  }

  async selectRandomWord(): Promise<void> {
    this.lettersEnabled = true;
    this.RANDOM_WORD = await this.fetchRandomWord();
    const HIDDEN_ARRAY: string[] = new Array(this.RANDOM_WORD.length).fill("❓ ");
    const HIDDEN_WORD: string = HIDDEN_ARRAY.join("");
    if(this.SHOW_WORD) {
      this.SHOW_WORD.textContent = HIDDEN_WORD;
      this.SHOW_WORD.classList.add("opacity-0"); 
      setTimeout(() => {
        this.SHOW_WORD.style.opacity = "1";
      }, 50);
    }
  }

  //important method for game; defines most of the game logic
  handleLetterClick(clickedElement: HTMLElement, LETTER_POSITION: number[]): void {
    if (LETTER_POSITION.length > 0) {
      const HIDDEN_ARRAY: string[] = this.SHOW_WORD ? (this.SHOW_WORD.textContent || "").split(" ") : [];
        LETTER_POSITION.forEach((position) => {
        HIDDEN_ARRAY[position] = clickedElement.textContent || "";
        });
    if (this.SHOW_WORD) {
        this.SHOW_WORD.textContent = HIDDEN_ARRAY.join(" ");
    }
        clickedElement.style.display = "none";
    if (this.checkForWinner()) {
      if (ui.SHOW_GUESSES) {
         ui.SHOW_GUESSES.textContent = "";
      }
      if (ui.GUESS_CHECKER && this.RANDOM_WORD) {
          ui.GUESS_CHECKER.textContent = `WINNER! You guessed the word "${this.RANDOM_WORD}"!`;
      }
      if (ui.PLAY_BUTTON) {
        ui.PLAY_BUTTON.removeAttribute("hidden");
      }
      if (ui.RESET_BUTTON) {
          ui.RESET_BUTTON.removeAttribute("hidden");
      if (this.SHOW_WORD) {
        this.SHOW_WORD.textContent = "";
      }
      if (ui.ALPHABET_CONTAINER) {
          ui.ALPHABET_CONTAINER.style.display = "none";
      }
    }
    ui.displayFireworks();
    //update WORD_SCORE table
    if (this.RANDOM_WORD) {
      scores.updateScoreTable(this.RANDOM_WORD);
    }
  }
    } else {
      this.incorrectGuesses++;
      const MAX_INCORRECT_GUESSES: number = 10 - this.incorrectGuesses;
      let message: string = `❌ ${MAX_INCORRECT_GUESSES} guesses left.`;
      if (ui.SHOW_GUESSES) {
      ui.SHOW_GUESSES.textContent = message;
    }
    clickedElement.style.display = "none";
    if (MAX_INCORRECT_GUESSES === 0) {
      this.incorrectGuesses--;
      if (ui.GUESS_CHECKER && this.RANDOM_WORD) {
        ui.GUESS_CHECKER.textContent = `Game over! Word was "${this.RANDOM_WORD}"`;
      }
      if (ui.RESET_BUTTON) {
        ui.RESET_BUTTON.removeAttribute("hidden");
      }
      if (this.SHOW_WORD) {
        this.SHOW_WORD.textContent = "";
      }
      if (ui.SHOW_GUESSES) {
        ui.SHOW_GUESSES.textContent = "";
      }
      if (ui.ALPHABET_CONTAINER) {
        ui.ALPHABET_CONTAINER.style.display = "none";
      }
    }
  }
  }

  checkForWinner(): boolean {
    if (this.SHOW_WORD) {
      const WINNER_CHECKER: string = (this.SHOW_WORD.textContent || "").replace(/\s+/g, "");
      return WINNER_CHECKER === this.RANDOM_WORD;
    }
    return false
  }

  resetGame(): void {
    this.lettersEnabled = false;
    this.RANDOM_WORD = null;
    this.incorrectGuesses = 0;

    if (this.SHOW_WORD) {
      this.SHOW_WORD.textContent = "";
    }
    if (ui.SHOW_GUESSES) {
      ui.SHOW_GUESSES.textContent = "";
    }
    if (ui.RESET_BUTTON) {
     ui.RESET_BUTTON.setAttribute("hidden", "true");
    }
    if (ui.PLAY_BUTTON) {
      ui.PLAY_BUTTON.setAttribute("hidden", "true");
    } 
    if (ui.WORD_SCORE_TABLE) {
      ui.WORD_SCORE_TABLE.classList.add("hidden");
    }
    if (ui.FETCH_WORD_BUTTON) {
      ui.FETCH_WORD_BUTTON.style.display = "";
    }
    if (ui.FIREWORKS_CONTAINER) 
      ui.FIREWORKS_CONTAINER.innerHTML = "";
    const ALPHABET_LETTERS: NodeListOf<HTMLLIElement> = document.querySelectorAll("#alphabet li");
      ALPHABET_LETTERS.forEach((letter) => {
        letter.style.display = "";
      });
    if (ui.ALPHABET_CONTAINER) {
      ui.ALPHABET_CONTAINER.style.display = "none";
    }
    
  }
}
const game = new Game;

class Ui {
  game: Game;
  RESET_BUTTON: HTMLButtonElement | null;
  PLAY_BUTTON: HTMLButtonElement | null;
  FETCH_WORD_BUTTON: HTMLButtonElement | null;
  SHOW_GUESSES: HTMLElement | null;
  GUESS_CHECKER: HTMLElement | null;
  ALPHABET_CONTAINER: HTMLDivElement | null;
  FIREWORKS_CONTAINER: HTMLElement | null;
  WORD_SCORE_TABLE: HTMLTableElement | null;



  constructor(game: Game) {
    this.game = game;
    this.RESET_BUTTON = document.querySelector("#reset");
    this.PLAY_BUTTON = document.querySelector("#continue");
    this.FETCH_WORD_BUTTON = document.querySelector("#word-button");
    this.SHOW_GUESSES = document.querySelector("#attemptsOutput");
    this.GUESS_CHECKER = document.querySelector("#win-lose-check");
    this.ALPHABET_CONTAINER = document.querySelector("#alphabet");
    this.FIREWORKS_CONTAINER = document.querySelector("#fireworks-container")
    this.WORD_SCORE_TABLE = document.querySelector("#word-score-table");
    this.createAlphabetButtons();
    this.handleFetchWordButtonClick();
    
  }

//++
 createAlphabetButtons(): void {
  for (const letter of game.ALPHABET) {
    //makes each letter into li element
    const ALPHABET_LETTER: HTMLLIElement = document.createElement('li');
    ALPHABET_LETTER.textContent = letter;
    this.ALPHABET_CONTAINER.appendChild(ALPHABET_LETTER);
    this.storeLetterClick(ALPHABET_LETTER);
  }
  
}

//event listener for ? mark button
  handleFetchWordButtonClick(): void {
  if (this.FETCH_WORD_BUTTON) {
    this.FETCH_WORD_BUTTON.addEventListener("click", () => {
      if (this.FETCH_WORD_BUTTON) {
        this.FETCH_WORD_BUTTON.style.display = "none";
      }
      if (this.ALPHABET_CONTAINER) {
        this.ALPHABET_CONTAINER.style.display = "flex";
      }
      game.selectRandomWord();
    });
  }
}
//event listener to iterate thru random word to find clicked letter; stores position in LETTER_POSITION
storeLetterClick(ALPHABET_LETTER: HTMLElement): void {
  ALPHABET_LETTER.addEventListener("click", (event: MouseEvent) => {
     if (game.RANDOM_WORD && game.lettersEnabled) {
       const target = event.target as HTMLElement;
       if (target.tagName.toLowerCase() === "li" && target as HTMLElement) {
         const CLICKED_LETTERS: string = target.textContent || "";
         const LETTER_POSITION: number[] = [];
         for (let i = 0; i < game.RANDOM_WORD.length; i++) {
           if (game.RANDOM_WORD[i] === CLICKED_LETTERS) {
             LETTER_POSITION.push(i);
           }
         }
         game.handleLetterClick(target, LETTER_POSITION);
       }
     }
   });
 }

  displayFireworks(): void {
  if (this.GUESS_CHECKER) {
    this.GUESS_CHECKER.classList.add("z-20");
  }
  if (this.RESET_BUTTON) {
    this.RESET_BUTTON.classList.add("z-20");
  }  
  if (this.WORD_SCORE_TABLE) {
    this.WORD_SCORE_TABLE.classList.remove("hidden");
  }
  if (this.FIREWORKS_CONTAINER) {
    const FIREWORKS = document.createElement("img");
    FIREWORKS.src = "./assets/images/fireworks.gif";
    FIREWORKS.classList.add("fireworks");
    this.FIREWORKS_CONTAINER.innerHTML = "";
    this.FIREWORKS_CONTAINER.appendChild(FIREWORKS);
  }
}
}
const ui = new Ui(game);

class Scores {
  game: Game;

  constructor(game: Game) {
    this.game = game;
    
  
  }
  updateScoreTable(word: string): void {
    const WORD_SCORE: number = word.length * 10;
    const TOTAL_SCORE: number = game.currentScore += WORD_SCORE;
  
    const ROW: HTMLTableRowElement = ui.WORD_SCORE_TABLE.insertRow();
    const WORD_CELL: HTMLTableCellElement = ROW.insertCell(0);
    const SCORE_CELL: HTMLTableCellElement = ROW.insertCell(1);

    WORD_CELL.textContent = word;
    SCORE_CELL.textContent = WORD_SCORE.toString(); 
    
   if (ui.PLAY_BUTTON) {
    const TOTAL_SCORE_CELL: HTMLTableCellElement = ROW.insertCell(2);
    TOTAL_SCORE_CELL.textContent = TOTAL_SCORE.toString();
   }

  }

}

const scores = new Scores(game);