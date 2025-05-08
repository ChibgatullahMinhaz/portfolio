/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: ["light", "dark"], // or just "light" if you want only light
      // defaultTheme: "light", // optional, use this to force light mode
    },
  };
  