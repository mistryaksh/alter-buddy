/** @type {import('tailwindcss').Config} */
module.exports = {
     content: ["./src/**/*.{js,jsx,ts,tsx}"],
     theme: {
          extend: {
               darkMode: "class",
               colors: {
                    primary: {
                         50: "#fdf3f3",
                         100: "#fbe8e9",
                         200: "#f6d5d6",
                         300: "#eeb3b5",
                         400: "#e4888e",
                         500: "#c2274b",
                         600: "#c13d50",
                         700: "#a22e42",
                         800: "#88293c",
                         900: "#752638",
                         950: "#40111a",
                    },
               },
               fontFamily: {
                    sans: ["'avnir', sans-serif"],
                    sans2: ["'avnir_bold', sans-serif"],
               },
          },
     },
};
