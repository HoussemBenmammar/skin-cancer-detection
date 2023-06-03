/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      popins: ["poppins", "system-ui"],
      opensens: ["Open Sans"],
    },
    colors: {
      primary: "#2776EA",
      primarygray: "#A0AEC0",
      secondGray: "#70819D",
      white: "#fff",
      primaryblack: "#2D3748",
      secondaryblack: "#455570",
      errorColor: "#ef4444",
      alertColor: "#FFC350",
      successColor: "#077E8C",
      titleColor: "#2F2E41",
      subColor: "#3F3D56",
      lightGray: "#E4E4E4",
      badgeSuccess: "#65C13A",
      removeBtn: "#FF4E4E",
      cancelBtn: "#D9D9D9",
      backgroundModal: "rgba(0, 0, 0, 0.75)",
    },
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      boxShadow: {
        shadowActive: "inset 0 0px 5px 0px rgba(45, 55, 72, 0.75)",
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("@tailwindcss/forms")],
};
