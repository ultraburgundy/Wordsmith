/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./docs/**/*.html",
 "./node_modules/flowbite/**/*.js"

],
  //important: true,
  theme: {
    fontFamily: {
      "cutive": ["Cutive Mono"],
    },
    screens: {
      "2sm": "375px",
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px",
    }
  },
  darkMode: "class",
  plugins: [
  require("flowbite/plugin")
  ],
}
