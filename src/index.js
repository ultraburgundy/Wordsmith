import _ from 'lodash';

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// game variables
var ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
var incorrectGuesses = 0;
var RANDOM_WORD = null;
var lettersEnabled = false;
var currentScore = 0;
// DOM elements
var RESET_BUTTON = document.querySelector("#reset");
var PLAY_BUTTON = document.querySelector("#continue");
var FETCH_WORD_BUTTON = document.querySelector("#word-button");
var SHOW_WORD = document.querySelector("#word-output");
var SHOW_GUESSES = document.querySelector("#attemptsOutput");
var GUESS_CHECKER = document.querySelector("#win-lose-check");
var ALPHABET_CONTAINER = document.querySelector("#alphabet");
var FIREWORKS_CONTAINER = document.querySelector("#fireworks-container");
var WORD_SCORE_TABLE = document.querySelector("#word-score-table");
function fetchRandomWord() {
    return __awaiter(this, void 0, void 0, function () {
        var RESPONSE, WORD_ARRAY, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://random-word-api.herokuapp.com/word")];
                case 1:
                    RESPONSE = _a.sent();
                    return [4 /*yield*/, RESPONSE.json()];
                case 2:
                    WORD_ARRAY = _a.sent();
                    return [2 /*return*/, WORD_ARRAY[0]];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching random word:", error_1);
                    return [2 /*return*/, ""];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//removed unnecessary variable "ul", was not needed; only acted as redundant container.
function createAlphabetButtons() {
    for (var _i = 0, ALPHABET_1 = ALPHABET; _i < ALPHABET_1.length; _i++) {
        var letter = ALPHABET_1[_i];
        //makes each letter in the alphabet into li element
        var ALPHABET_LETTER = document.createElement('li');
        ALPHABET_LETTER.textContent = letter;
        ALPHABET_CONTAINER.appendChild(ALPHABET_LETTER);
    }
    storeLetterClick(ALPHABET_CONTAINER);
}
createAlphabetButtons();
function handleFetchButtonClick() {
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
function storeLetterClick(ALPHABET_LETTER) {
    ALPHABET_LETTER.addEventListener("click", function (event) {
        if (RANDOM_WORD && lettersEnabled) {
            var target = event.target;
            if (target.tagName.toLowerCase() === "li" && target instanceof HTMLElement) {
                var CLICKED_LETTERS = target.textContent || "";
                var LETTER_POSITION = [];
                for (var i = 0; i < RANDOM_WORD.length; i++) {
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
function handleLetterClick(clickedElement, LETTER_POSITION) {
    if (LETTER_POSITION.length > 0) {
        var HIDDEN_ARRAY_1 = SHOW_WORD ? (SHOW_WORD.textContent || "").split(" ") : [];
        LETTER_POSITION.forEach(function (position) {
            HIDDEN_ARRAY_1[position] = clickedElement.textContent || "";
        });
        if (SHOW_WORD) {
            SHOW_WORD.textContent = HIDDEN_ARRAY_1.join(" ");
        }
        clickedElement.style.display = "none";
        if (checkForWinner()) {
            if (SHOW_GUESSES) {
                SHOW_GUESSES.textContent = "";
            }
            if (GUESS_CHECKER && RANDOM_WORD) {
                GUESS_CHECKER.textContent = "".concat(RANDOM_WORD, "!");
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
    }
    else {
        incorrectGuesses++;
        var MAX_INCORRECT_GUESSES = 10 - incorrectGuesses;
        var message = "\u274C ".concat(MAX_INCORRECT_GUESSES, " guesses left.");
        if (SHOW_GUESSES) {
            SHOW_GUESSES.textContent = message;
        }
        clickedElement.style.display = "none";
        if (MAX_INCORRECT_GUESSES === 0) {
            incorrectGuesses--;
            if (GUESS_CHECKER && RANDOM_WORD) {
                GUESS_CHECKER.textContent = "Game over! Word was \"".concat(RANDOM_WORD, "\"");
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
var Score = /** @class */ (function () {
    function Score() {
    }
    Score.prototype.clearTotalScore = function () {
        for (var i = 1, row = void 0; (row = WORD_SCORE_TABLE.rows[i]); i++) {
            row.cells[2].textContent = "";
        }
    };
    Score.prototype.updateScore = function (word) {
        var WORD_SCORE = word.length * 10;
        var TOTAL_SCORE = currentScore += WORD_SCORE;
        var ROW = WORD_SCORE_TABLE.insertRow();
        var WORD_CELL = ROW.insertCell(0);
        var SCORE_CELL = ROW.insertCell(1);
        var TOTAL_SCORE_CELL = ROW.insertCell(2);
        WORD_CELL.textContent = word;
        SCORE_CELL.textContent = WORD_SCORE.toString();
        this.clearTotalScore();
        if (PLAY_BUTTON) {
            TOTAL_SCORE_CELL.textContent = TOTAL_SCORE.toString();
        }
    };
    return Score;
}());
var score = new Score;
function checkForWinner() {
    if (SHOW_WORD) {
        var WINNER_CHECKER = (SHOW_WORD.textContent || "").replace(/\s+/g, '');
        return WINNER_CHECKER === RANDOM_WORD;
    }
    return false;
}
function displayFireworks() {
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
        var FIREWORKS = document.createElement("img");
        FIREWORKS.src = "./assets/images/fireworks.gif";
        FIREWORKS.classList.add("fireworks");
        FIREWORKS_CONTAINER.innerHTML = "";
        FIREWORKS_CONTAINER.appendChild(FIREWORKS);
    }
}
function selectRandomWord() {
    return __awaiter(this, void 0, void 0, function () {
        var HIDDEN_ARRAY, HIDDEN_WORD;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lettersEnabled = true;
                    return [4 /*yield*/, fetchRandomWord()];
                case 1:
                    RANDOM_WORD = _a.sent();
                    HIDDEN_ARRAY = new Array(RANDOM_WORD.length).fill("❓ ");
                    HIDDEN_WORD = HIDDEN_ARRAY.join("");
                    if (SHOW_WORD) {
                        SHOW_WORD.textContent = HIDDEN_WORD;
                        SHOW_WORD.classList.add("opacity-0"); // Set initial opacity to 0
                        setTimeout(function () {
                            SHOW_WORD.style.opacity = "1";
                        }, 50);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function resetGame() {
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
    if (FIREWORKS_CONTAINER)
        FIREWORKS_CONTAINER.innerHTML = "";
    var ALPHABET_LETTERS = document.querySelectorAll("#alphabet li");
    ALPHABET_LETTERS.forEach(function (letter) {
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
    PLAY_BUTTON.addEventListener("click", function () {
        resetGame();
    });
}
