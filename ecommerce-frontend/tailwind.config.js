/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/**/*.css"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1126EA",
          secondary: "#340D6E",
          accent: "#AB4CEE",
          neutral: "#EEF6FD",
          "base-100": "#ffffff",
          info: "#60a5fa",
          success: "#00ff00",
          warning: "#FF5555",
          error: "#ff0000",
          textcolor: "#01060C",
        },
      },
    ],
  },
};
