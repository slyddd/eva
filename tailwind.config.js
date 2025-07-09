/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      background: "rgb(var(--background) / <alpha-value>)",
      foreground: "rgb(var(--foreground) / <alpha-value>)",
      primary: "rgb(var(--primary) / <alpha-value>)",
      surface: "rgb(var(--surface) / <alpha-value>)",
      error: "rgb(var(--error) / <alpha-value>)",
      success: "rgb(var(--success) / <alpha-value>)",
      errorText: "rgb(var(--errorText) / <alpha-value>)",
      successText: "rgb(var(--successText) / <alpha-value>)",
    },
  },
  plugins: [
    ({ addBase }) =>
      addBase({
        ":root": {
          "--background": "255, 255, 255",
          "--foreground": "0, 0, 0",
          "--primary": "0, 122, 255",
          "--surface": "240, 240, 240",
          "--error": "255, 59, 48",
          "--success": "52, 199, 89",
          "--errorText": "255, 69, 58",
          "--successText": "76, 217, 100",
        },
      }),
  ],
};
