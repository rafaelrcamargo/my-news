const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: { "fade-in": "fadeIn 1s ease-in forwards 2s" },
      keyframes: { fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } } },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        serif: ["var(--font-serif)", ...fontFamily.serif]
      }
    }
  },
  experimental: ["optimizeUniversalDefaults"],
  future: ["hoverOnlyWhenSupported", "respectDefaultRingColorOpacity"],
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")]
}
