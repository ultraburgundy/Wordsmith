
import { Dark } from "./utils/utils";
import "flowbite";

const dark = new Dark();

class Game {
  lettersEnabled: boolean;
  incorrectGuesses: number;
  currentScore: number;
  keydownListener: boolean;
  SHOW_WORD: HTMLElement | null;
  SHOW_DEFINITION: HTMLElement | null;
  WORD_DEFINITION: string | null;
  RANDOM_WORD: string | null;
  ALPHABET: string[];

  constructor() {
    this.ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
    this.RANDOM_WORD = null;
    this.SHOW_WORD = document.querySelector("#word-output");
    this.SHOW_DEFINITION = document.querySelector("#word-definition");
    this.WORD_DEFINITION = null;
    this.currentScore = 0;
    this.incorrectGuesses = 0;
    this.lettersEnabled = false;
    this.keydownListener = true;
    this.checkForWinner();
  }

  async fetchRandomWord(): Promise<string> {
    try {
      const response = await fetch("https://api.datamuse.com/words?sp=*");
      const words = await response.json();
      const randomWord = words[Math.floor(Math.random() * words.length)].word;
      return randomWord;
    } catch (error) {
      console.error("Error fetching random word:", error);
      return "";
    }
  }

  async fetchWordDefinition(): Promise<void> {
    try {
      const response = await fetch(
        `https://api.datamuse.com/words?sp=${this.RANDOM_WORD}&md=d`
      );
      const data = await response.json();
      console.log("Word definition API response:", data);
      this.WORD_DEFINITION = data[0].defs[0];
    } catch (error) {
      console.error("Error fetching associated definition:", error);
    }
  }

  async selectRandomWord(): Promise<void> {
    this.lettersEnabled = true;
    this.RANDOM_WORD = await this.fetchRandomWord();
    const HIDDEN_ARRAY: string[] = new Array(this.RANDOM_WORD.length).fill(
      "🟦 "
    );
    const HIDDEN_WORD: string = HIDDEN_ARRAY.join("");
    if (this.SHOW_WORD) {
      this.SHOW_WORD.textContent = HIDDEN_WORD;
      this.SHOW_WORD.classList.add("opacity-0");
      setTimeout(() => {
        this.SHOW_WORD.style.opacity = "1";
      }, 50);
    }
    await this.fetchWordDefinition();
  }

  checkForWinner(): boolean {
    if (this.SHOW_WORD) {
      const WINNER_CHECKER: string = (this.SHOW_WORD.textContent || "").replace(
        /\s+/g,
        ""
      );
      return WINNER_CHECKER === this.RANDOM_WORD;
    }
    return false;
  }

  //important method for game; defines most of the game logic
  handleLetterClick(
    clickedElement: HTMLElement,
    LETTER_POSITION: number[]
  ): void {
    if (LETTER_POSITION.length > 0) {
      const HIDDEN_ARRAY: string[] = this.SHOW_WORD
        ? (this.SHOW_WORD.textContent || "").split(" ")
        : [];
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
        this.keydownListener = false;
        if (ui.SHOW_RANDOM_WORD && this.RANDOM_WORD) {
          ui.RANDOM_WORD_RESULT.innerHTML = `Winner!`;
          ui.SHOW_RANDOM_WORD.textContent = `${this.RANDOM_WORD}`;
        }
        if (ui.WORD_DEFINITION) {
          ui.WORD_DEFINITION.classList.remove("hidden");
          ui.WORD_DEFINITION.classList.add("flex");
        }
        if (this.SHOW_DEFINITION) {
          this.SHOW_DEFINITION.classList.remove("hidden");
          this.SHOW_DEFINITION.textContent =
            this.WORD_DEFINITION || "Definition not available";
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
        if (ui.SHOW_RANDOM_WORD && this.RANDOM_WORD) {
          ui.RANDOM_WORD_RESULT.innerHTML = `Loser!`;
          ui.SHOW_RANDOM_WORD.innerHTML = `${this.RANDOM_WORD}`;
        }
        this.keydownListener = false;
        if (ui.WORD_DEFINITION) {
          ui.WORD_DEFINITION.classList.remove("hidden");
          ui.WORD_DEFINITION.classList.add("flex");
        }
        if (this.SHOW_DEFINITION) {
          this.SHOW_DEFINITION.classList.remove("hidden");
          this.SHOW_DEFINITION.textContent =
            this.WORD_DEFINITION || "Definition not available";
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

  newGame(): void {
    this.lettersEnabled = false;
    this.RANDOM_WORD = null;
    this.incorrectGuesses = 0;
    this.WORD_DEFINITION = null;

    if (this.SHOW_WORD) {
      this.SHOW_WORD.textContent = "";
    }
    if (ui.SHOW_GUESSES) {
      ui.SHOW_GUESSES.textContent = "";
    }
    if (ui.RANDOM_WORD_RESULT) {
      ui.RANDOM_WORD_RESULT.innerHTML = "";
    }
    if (ui.WORD_DEFINITION) {
      ui.WORD_DEFINITION.classList.remove("flex");
      ui.WORD_DEFINITION.classList.add("hidden");
    }
    if (this.SHOW_DEFINITION) {
      this.SHOW_DEFINITION.classList.add("hidden");
      this.SHOW_DEFINITION.textContent = "";
    }
    if (ui.SHOW_RANDOM_WORD) {
      ui.SHOW_RANDOM_WORD.textContent = "";
    }
    if (ui.RESET_BUTTON) {
      ui.RESET_BUTTON.setAttribute("hidden", "true");
    }
    if (ui.QUESTION_MARK_IMAGE) {
      ui.QUESTION_MARK_IMAGE.style.display = "";
    }

    if (ui.HOW_TO_PLAY_BUTTON) {
      ui.HOW_TO_PLAY_BUTTON.style.display = "";
    }
    if (ui.PLAY_BUTTON) {
      ui.PLAY_BUTTON.style.display = "";
    }
    if (ui.FIREWORKS_CONTAINER) ui.FIREWORKS_CONTAINER.innerHTML = "";
    const ALPHABET_LETTERS: NodeListOf<HTMLLIElement> =
      document.querySelectorAll("#alphabet li");
    ALPHABET_LETTERS.forEach((letter) => {
      letter.style.display = "";
      //ensures used letters from previous game are listened to again
      letter.classList.remove("used");
    });
    if (ui.ALPHABET_CONTAINER) {
      ui.ALPHABET_CONTAINER.style.display = "none";
    }
  }
}
const game = new Game();

class Ui {
  game: Game;
  RESET_BUTTON: HTMLButtonElement | null;
  PLAY_BUTTON: HTMLButtonElement | null;
  SHOW_GUESSES: HTMLElement | null;
  RANDOM_WORD_RESULT: HTMLElement | null;
  SHOW_RANDOM_WORD: HTMLElement | null;
  ALPHABET_CONTAINER: HTMLDivElement | null;
  FIREWORKS_CONTAINER: HTMLElement | null;
  WORD_SCORE_TABLE: HTMLTableElement | null;
  HOW_TO_PLAY_BUTTON: HTMLButtonElement | null;
  QUESTION_MARK_IMAGE: HTMLImageElement | null;
  WORD_DEFINITION: HTMLElement | null;

  constructor(game: Game) {
    this.game = game;
    this.RESET_BUTTON = document.querySelector("#reset");
    this.PLAY_BUTTON = document.querySelector("#play-button");
    this.SHOW_GUESSES = document.querySelector("#attemptsOutput");
    this.SHOW_RANDOM_WORD = document.querySelector("#show-random-word");
    this.RANDOM_WORD_RESULT = document.querySelector("#win-lose-checker");
    this.ALPHABET_CONTAINER = document.querySelector("#alphabet");
    this.FIREWORKS_CONTAINER = document.querySelector("#fireworks-container");
    this.HOW_TO_PLAY_BUTTON = document.querySelector("#how-to-play-button");
    this.QUESTION_MARK_IMAGE = document.querySelector("#question-mark");
    this.WORD_DEFINITION = document.querySelector(".popover-definition");
    this.createAlphabetButtons();
    this.handleFetchWordButtonClick();
    this.handleKeyDown();
    // Listener for reset/continue
    if (this.RESET_BUTTON) {
      this.RESET_BUTTON.addEventListener("click", () => {
        this.game.newGame();
      });
    }
  }

  createAlphabetButtons(): void {
    for (const letter of game.ALPHABET) {
      //makes each letter into li element
      const ALPHABET_LETTER: HTMLLIElement = document.createElement("li");
      ALPHABET_LETTER.textContent = letter;
      //select based on the letter value
      ALPHABET_LETTER.setAttribute("data-letter", letter);
      this.ALPHABET_CONTAINER.appendChild(ALPHABET_LETTER);
      this.storeLetterClick(ALPHABET_LETTER);
    }
  }

  //event listener for play button
  handleFetchWordButtonClick(): void {
    if (this.PLAY_BUTTON) {
      this.PLAY_BUTTON.addEventListener("click", () => {
        if (this.PLAY_BUTTON) {
          this.PLAY_BUTTON.style.display = "none";
        }
        if (game.WORD_DEFINITION) {
          game.WORD_DEFINITION = null;
        }
        if (this.ALPHABET_CONTAINER) {
          this.ALPHABET_CONTAINER.style.display = "grid";
        }
        if (this.HOW_TO_PLAY_BUTTON) {
          this.HOW_TO_PLAY_BUTTON.style.display = "none";
        }
        if (this.QUESTION_MARK_IMAGE) {
          this.QUESTION_MARK_IMAGE.style.display = "none";
        }
        game.keydownListener = true;
        game.selectRandomWord();
      });
    }
  }

  //event listener to iterate thru random word to find clicked letter; stores position in LETTER_POSITION
  storeLetterClick(ALPHABET_LETTER: HTMLElement): void {
    ALPHABET_LETTER.addEventListener("click", (event: MouseEvent) => {
      if (game.RANDOM_WORD && game.lettersEnabled) {
        let target = event.target as HTMLElement;
        if (target.tagName.toLowerCase() === "li" && (target as HTMLElement)) {
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

  //keyboard event listener
  handleKeyDown(): void {
    window.addEventListener("keyup", (event: KeyboardEvent) => {
      if (!game.keydownListener) return;
      const key = event.key.toLowerCase();
      if (
        game.RANDOM_WORD &&
        game.lettersEnabled &&
        game.ALPHABET.includes(key)
      ) {
        let target = document.querySelector(
          `li[data-letter="${key}"]:not(.used)`
        ) as HTMLElement;
        if (target) {
          const LETTER_POSITION: number[] = [];
          for (let i = 0; i < game.RANDOM_WORD.length; i++) {
            if (game.RANDOM_WORD[i] === key) {
              LETTER_POSITION.push(i);
            }
          }
          target.classList.add("used");
          game.handleLetterClick(target, LETTER_POSITION);
        }
      }
    });
  }

  displayFireworks(): void {
    if (this.SHOW_RANDOM_WORD) {
      this.SHOW_RANDOM_WORD.classList.add("z-20");
    }
    if (this.RESET_BUTTON) {
      this.RESET_BUTTON.classList.add("z-20");
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
