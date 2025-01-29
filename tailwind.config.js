/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./client/src/**/*.{js,jsx,ts,tsx}", "./client/index.html"],
  theme: {
    extend: {
      fontFamily: {
        jersey: ["Jersey 15", "serif"],
    },
  },
  },
  plugins: [],
};
