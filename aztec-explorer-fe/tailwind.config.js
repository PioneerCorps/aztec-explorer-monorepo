/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Lexend", "sans-serif"],
      monospace: ["Monaco", "monospace"],
    },
    extend: {
      colors: {
        pastelPurple: "#8C7EFF",
        pastelPink: "#EDA1FF",
        pastelBlue: "#466CF7",
        pastelOrange: "#FF7764",
        pastelGreen: "#31A67B",
        pastelYellow: "#FFE471",

        bgDark1: "#22103A",
        bgDark2: "#321E4C",
        bgDark3: "#514167",
        bgLight1: "#706383",
        bgLight2: "#AFA8BA",

        white1: "#CECBD5",
        white2: "#EEEDF1",

        borderOP: "#70638347",

        textDark1: "#706383",
        textDark2: "#321E4C",

        purpleOp15: "#8C7EFF29",
        purpleOp50: "#8C7EFF29",
        pinkOp: "#EDA1FF47",
        greenOp: "#31A67B80",
        orangeOp: "#FF776469",
        blackOp: "#00000057",
        bgLight1OP: "#70638347",
      },
      boxShadow: {
        "box-shadow-md": "1px 2px 2px  rgba(0, 0, 0, 0.5)",
        "box-shadow-sm": "1px 3px 5px rgba(0, 0, 0, 0.15)",
      },

      screens: {
        "below-lg": { max: "1210px" },
        "below-mobile": { max: "715px" },
        "above-mobile": { min: "714px" },
        "above-2k": { min: "2561px" },
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-none": {
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.0)",
        },
        ".text-shadow-sm": {
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.55)",
        },
        ".text-shadow-md": {
          textShadow: "1px 1px 1px rgba(0, 0, 0, 0.75)",
        },
        ".text-shadow-lg": {
          textShadow: "3px 3px 6px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow-xl": {
          textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
