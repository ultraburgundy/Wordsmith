"use strict";
exports.__esModule = true;
exports.Dark = void 0;
var Dark = /** @class */ (function () {
    function Dark() {
        this.html = document.querySelector("html");
        this.DARK_MODE_BUTTON = document.querySelector("#dark");
        this.toggleDarkModeButton();
        this.LIGHT_MODE_SVG = document.querySelector("#light-mode");
        this.DARK_MODE_SVG = document.querySelector("#dark-mode");
        this.DARK_MODE = true;
    }
    Dark.prototype.toggleDarkModeButton = function () {
        var _this = this;
        if (this.DARK_MODE_BUTTON) {
            this.DARK_MODE_BUTTON.addEventListener("click", function () {
                _this.html.classList.toggle("dark");
                // toggle current mode
                _this.DARK_MODE = !_this.DARK_MODE;
                if (_this.DARK_MODE) {
                    _this.DARK_MODE_SVG.classList.remove('hidden');
                    _this.LIGHT_MODE_SVG.classList.add('hidden');
                }
                else {
                    _this.DARK_MODE_SVG.classList.add('hidden');
                    _this.LIGHT_MODE_SVG.classList.remove('hidden');
                }
            });
        }
    };
    return Dark;
}());
exports.Dark = Dark;
