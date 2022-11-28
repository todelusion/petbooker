module.exports = {
  content: ["./index.html", "./src/**/*.{ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "384px",
      },
      fontSize: {
        "5.5xl": "3.5rem",
      },
      colors: {
        primary: "#FFB423",
        primary_A11y: "#332200",
        primary_Dark: "#B27600",
        second: "#6E7D00",
        accent: "#B9C850",
        neutral: "#F5F5F5",
      },
      padding: {
        3.5: "0.875rem",
      },
      spacing: {
        70: "17.5rem",
        100: "25rem",
        120: "30rem",
        160: "40rem",
      },
    },
    fontFamily: {
      sans: ["Noto Sans TC", "Roboto"],
      serif: ["Noto Serif TC", "Times"],
      dela: ["Dela Gothic One"],
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("@tailwindcss/line-clamp"),
  ],
};
