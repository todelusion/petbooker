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
        second: "#6E7D00",
        accent: "#B9C850",
        neutral: "#F5F5F5",
      },
    },
    fontFamily: {
      sans: ["Noto Sans TC", "Roboto"],
      serif: ["Noto Serif TC", "Times"],
      dela: ["Dela Gothic One"],
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
