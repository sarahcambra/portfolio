// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@flowbite-pro/react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: { extend: {} },
  plugins: [require("@flowbite-pro/react/tailwind")],
};