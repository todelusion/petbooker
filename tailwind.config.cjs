module.exports = {
  content: ["./index.html", "./src/**/*.{ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "384px",
      },
      colors: {
        primary: "#3F20FF",
        second: "#F5F5F5",
        third: "#F498D1",
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
