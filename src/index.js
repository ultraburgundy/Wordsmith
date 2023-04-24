"use strict";
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
exports.__esModule = true;
var utils_1 = require("./utils/utils");
require("flowbite");
var dark = new utils_1.Dark();
var Game = /** @class */ (function () {
    function Game() {
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
    Game.prototype.fetchRandomWord = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, words, randomWord, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("https://api.datamuse.com/words?sp=*")];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        words = _a.sent();
                        randomWord = words[Math.floor(Math.random() * words.length)].word;
                        return [2 /*return*/, randomWord];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error fetching random word:", error_1);
                        return [2 /*return*/, ""];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.fetchWordDefinition = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("https://api.datamuse.com/words?sp=".concat(this.RANDOM_WORD, "&md=d"))];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        console.log("Word definition API response:", data);
                        this.WORD_DEFINITION = data[0].defs[0];
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Error fetching associated definition:", error_2);
                        return [3 /*break*/, 4];
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
                        HIDDEN_ARRAY = new Array(this.RANDOM_WORD.length).fill("🟦 ");
                        HIDDEN_WORD = HIDDEN_ARRAY.join("");
                        if (this.SHOW_WORD) {
                            this.SHOW_WORD.textContent = HIDDEN_WORD;
                            this.SHOW_WORD.classList.add("opacity-0");
                            setTimeout(function () {
                                _this.SHOW_WORD.style.opacity = "1";
                            }, 50);
                        }
                        return [4 /*yield*/, this.fetchWordDefinition()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.checkForWinner = function () {
        if (this.SHOW_WORD) {
            var WINNER_CHECKER = (this.SHOW_WORD.textContent || "").replace(/\s+/g, "");
            return WINNER_CHECKER === this.RANDOM_WORD;
        }
        return false;
    };
    //important method for game; defines most of the game logic
    Game.prototype.handleLetterClick = function (clickedElement, LETTER_POSITION) {
        if (LETTER_POSITION.length > 0) {
            var HIDDEN_ARRAY_1 = this.SHOW_WORD
                ? (this.SHOW_WORD.textContent || "").split(" ")
                : [];
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
                this.keydownListener = false;
                if (ui.SHOW_RANDOM_WORD && this.RANDOM_WORD) {
                    ui.RANDOM_WORD_RESULT.innerHTML = "Winner!";
                    ui.SHOW_RANDOM_WORD.textContent = "".concat(this.RANDOM_WORD);
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
                if (ui.SHOW_RANDOM_WORD && this.RANDOM_WORD) {
                    ui.RANDOM_WORD_RESULT.innerHTML = "Loser!";
                    ui.SHOW_RANDOM_WORD.innerHTML = "".concat(this.RANDOM_WORD);
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
    };
    Game.prototype.newGame = function () {
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
        if (ui.FIREWORKS_CONTAINER)
            ui.FIREWORKS_CONTAINER.innerHTML = "";
        var ALPHABET_LETTERS = document.querySelectorAll("#alphabet li");
        ALPHABET_LETTERS.forEach(function (letter) {
            letter.style.display = "";
            //ensures used letters from previous game are listened to again
            letter.classList.remove("used");
        });
        if (ui.ALPHABET_CONTAINER) {
            ui.ALPHABET_CONTAINER.style.display = "none";
        }
    };
    return Game;
}());
var game = new Game();
var Ui = /** @class */ (function () {
    function Ui(game) {
        var _this = this;
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
            this.RESET_BUTTON.addEventListener("click", function () {
                _this.game.newGame();
            });
        }
    }
    Ui.prototype.createAlphabetButtons = function () {
        for (var _i = 0, _a = game.ALPHABET; _i < _a.length; _i++) {
            var letter = _a[_i];
            //makes each letter into li element
            var ALPHABET_LETTER = document.createElement("li");
            ALPHABET_LETTER.textContent = letter;
            //select based on the letter value
            ALPHABET_LETTER.setAttribute("data-letter", letter);
            this.ALPHABET_CONTAINER.appendChild(ALPHABET_LETTER);
            this.storeLetterClick(ALPHABET_LETTER);
        }
    };
    //event listener for play button
    Ui.prototype.handleFetchWordButtonClick = function () {
        var _this = this;
        if (this.PLAY_BUTTON) {
            this.PLAY_BUTTON.addEventListener("click", function () {
                if (_this.PLAY_BUTTON) {
                    _this.PLAY_BUTTON.style.display = "none";
                }
                if (game.WORD_DEFINITION) {
                    game.WORD_DEFINITION = null;
                }
                if (_this.ALPHABET_CONTAINER) {
                    _this.ALPHABET_CONTAINER.style.display = "grid";
                }
                if (_this.HOW_TO_PLAY_BUTTON) {
                    _this.HOW_TO_PLAY_BUTTON.style.display = "none";
                }
                if (_this.QUESTION_MARK_IMAGE) {
                    _this.QUESTION_MARK_IMAGE.style.display = "none";
                }
                game.keydownListener = true;
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
    //keyboard event listener
    Ui.prototype.handleKeyDown = function () {
        window.addEventListener("keyup", function (event) {
            if (!game.keydownListener)
                return;
            var key = event.key.toLowerCase();
            if (game.RANDOM_WORD &&
                game.lettersEnabled &&
                game.ALPHABET.includes(key)) {
                var target = document.querySelector("li[data-letter=\"".concat(key, "\"]:not(.used)"));
                if (target) {
                    var LETTER_POSITION = [];
                    for (var i = 0; i < game.RANDOM_WORD.length; i++) {
                        if (game.RANDOM_WORD[i] === key) {
                            LETTER_POSITION.push(i);
                        }
                    }
                    target.classList.add("used");
                    game.handleLetterClick(target, LETTER_POSITION);
                }
            }
        });
    };
    Ui.prototype.displayFireworks = function () {
        if (this.SHOW_RANDOM_WORD) {
            this.SHOW_RANDOM_WORD.classList.add("z-20");
        }
        if (this.RESET_BUTTON) {
            this.RESET_BUTTON.classList.add("z-20");
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
