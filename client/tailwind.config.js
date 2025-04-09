/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        instagram: "#E1306C",
        youtube: "#FF0000",
        twitter: "#1DA1F2",
        whatsapp: "#25D366",
        shipping: "#ccc",
      },
      translate: {
        "30p": "30%",
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease-in-out 0.1s",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
