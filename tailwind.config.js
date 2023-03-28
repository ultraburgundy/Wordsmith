/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./public/index.html"],
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
  plugins: [],
}
