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
var Game = /** @class */ (function () {
    function Game() {
        this.ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
        this.RANDOM_WORD = null;
        this.SHOW_WORD = document.querySelector("#word-output");
        this.currentScore = 0;
        this.incorrectGuesses = 0;
        this.lettersEnabled = false;
        this.checkForWinner();
    }
    Game.prototype.fetchRandomWord = function () {
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
    };
    Game.prototype.selectRandomWord = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, HIDDEN_ARRAY, HIDDEN_WORD;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.lettersEnabled = true;
                        _a = this;
                        return [4 /*yield*/, this.fetchRandomWord()];
                    case 1:
                        _a.RANDOM_WORD = _b.sent();
                        HIDDEN_ARRAY = new Array(this.RANDOM_WORD.length).fill("❓ ");
                        HIDDEN_WORD = HIDDEN_ARRAY.join("");
                        if (this.SHOW_WORD) {
                            this.SHOW_WORD.textContent = HIDDEN_WORD;
                            this.SHOW_WORD.classList.add("opacity-0");
                            setTimeout(function () {
                                _this.SHOW_WORD.style.opacity = "1";
                            }, 50);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //important method for game; defines most of the game logic
    Game.prototype.handleLetterClick = function (clickedElement, LETTER_POSITION) {
        if (LETTER_POSITION.length > 0) {
            var HIDDEN_ARRAY_1 = this.SHOW_WORD ? (this.SHOW_WORD.textContent || "").split(" ") : [];
            LETTER_POSITION.forEach(function (position) {
                HIDDEN_ARRAY_1[position] = clickedElement.textContent || "";
            });
            if (this.SHOW_WORD) {
                this.SHOW_WORD.textContent = HIDDEN_ARRAY_1.join(" ");
            }
            clickedElement.style.display = "none";
            if (this.checkForWinner()) {
                if (ui.SHOW_GUESSES) {
                    ui.SHOW_GUESSES.textContent = "";
                }
                if (ui.GUESS_CHECKER && this.RANDOM_WORD) {
                    ui.GUESS_CHECKER.textContent = "WINNER! You guessed the word \"".concat(this.RANDOM_WORD, "\"!");
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
        }
        else {
            this.incorrectGuesses++;
            var MAX_INCORRECT_GUESSES = 10 - this.incorrectGuesses;
            var message = "\u274C ".concat(MAX_INCORRECT_GUESSES, " guesses left.");
            if (ui.SHOW_GUESSES) {
                ui.SHOW_GUESSES.textContent = message;
            }
            clickedElement.style.display = "none";
            if (MAX_INCORRECT_GUESSES === 0) {
                this.incorrectGuesses--;
                if (ui.GUESS_CHECKER && this.RANDOM_WORD) {
                    ui.GUESS_CHECKER.textContent = "Game over! Word was \"".concat(this.RANDOM_WORD, "\"");
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
    };
    Game.prototype.checkForWinner = function () {
        if (this.SHOW_WORD) {
            var WINNER_CHECKER = (this.SHOW_WORD.textContent || "").replace(/\s+/g, "");
            return WINNER_CHECKER === this.RANDOM_WORD;
        }
        return false;
    };
    Game.prototype.resetGame = function () {
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
        var ALPHABET_LETTERS = document.querySelectorAll("#alphabet li");
        ALPHABET_LETTERS.forEach(function (letter) {
            letter.style.display = "";
        });
        if (ui.ALPHABET_CONTAINER) {
            ui.ALPHABET_CONTAINER.style.display = "none";
        }
    };
    return Game;
}());
var game = new Game;
var Ui = /** @class */ (function () {
    function Ui(game) {
        this.game = game;
        this.RESET_BUTTON = document.querySelector("#reset");
        this.PLAY_BUTTON = document.querySelector("#continue");
        this.FETCH_WORD_BUTTON = document.querySelector("#word-button");
        this.SHOW_GUESSES = document.querySelector("#attemptsOutput");
        this.GUESS_CHECKER = document.querySelector("#win-lose-check");
        this.ALPHABET_CONTAINER = document.querySelector("#alphabet");
        this.FIREWORKS_CONTAINER = document.querySelector("#fireworks-container");
        this.WORD_SCORE_TABLE = document.querySelector("#word-score-table");
        this.createAlphabetButtons();
        this.handleFetchWordButtonClick();
    }
    //++
    Ui.prototype.createAlphabetButtons = function () {
        for (var _i = 0, _a = game.ALPHABET; _i < _a.length; _i++) {
            var letter = _a[_i];
            //makes each letter into li element
            var ALPHABET_LETTER = document.createElement('li');
            ALPHABET_LETTER.textContent = letter;
            this.ALPHABET_CONTAINER.appendChild(ALPHABET_LETTER);
            this.storeLetterClick(ALPHABET_LETTER);
        }
    };
    //event listener for ? mark button
    Ui.prototype.handleFetchWordButtonClick = function () {
        var _this = this;
        if (this.FETCH_WORD_BUTTON) {
            this.FETCH_WORD_BUTTON.addEventListener("click", function () {
                if (_this.FETCH_WORD_BUTTON) {
                    _this.FETCH_WORD_BUTTON.style.display = "none";
                }
                if (_this.ALPHABET_CONTAINER) {
                    _this.ALPHABET_CONTAINER.style.display = "flex";
                }
                game.selectRandomWord();
            });
        }
    };
    //event listener to iterate thru random word to find clicked letter; stores position in LETTER_POSITION
    Ui.prototype.storeLetterClick = function (ALPHABET_LETTER) {
        ALPHABET_LETTER.addEventListener("click", function (event) {
            if (game.RANDOM_WORD && game.lettersEnabled) {
                var target = event.target;
                if (target.tagName.toLowerCase() === "li" && target) {
                    var CLICKED_LETTERS = target.textContent || "";
                    var LETTER_POSITION = [];
                    for (var i = 0; i < game.RANDOM_WORD.length; i++) {
                        if (game.RANDOM_WORD[i] === CLICKED_LETTERS) {
                            LETTER_POSITION.push(i);
                        }
                    }
                    game.handleLetterClick(target, LETTER_POSITION);
                }
            }
        });
    };
    Ui.prototype.displayFireworks = function () {
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
            var FIREWORKS = document.createElement("img");
            FIREWORKS.src = "./assets/images/fireworks.gif";
            FIREWORKS.classList.add("fireworks");
            this.FIREWORKS_CONTAINER.innerHTML = "";
            this.FIREWORKS_CONTAINER.appendChild(FIREWORKS);
        }
    };
    return Ui;
}());
var ui = new Ui(game);
var Scores = /** @class */ (function () {
    function Scores(game) {
        this.game = game;
    }
    Scores.prototype.updateScoreTable = function (word) {
        var WORD_SCORE = word.length * 10;
        var TOTAL_SCORE = game.currentScore += WORD_SCORE;
        var ROW = ui.WORD_SCORE_TABLE.insertRow();
        var WORD_CELL = ROW.insertCell(0);
        var SCORE_CELL = ROW.insertCell(1);
        WORD_CELL.textContent = word;
        SCORE_CELL.textContent = WORD_SCORE.toString();
        if (ui.PLAY_BUTTON) {
            var TOTAL_SCORE_CELL = ROW.insertCell(2);
            TOTAL_SCORE_CELL.textContent = TOTAL_SCORE.toString();
        }
    };
    return Scores;
}());
var scores = new Scores(game);
